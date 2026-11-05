"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { CommandIcon } from "./icons";
import { NAV_LINKS } from "./nav";
import { useLanguage } from "./LanguageProvider";
import { currentTheme, setStoredTheme } from "./ThemeToggle";
import { isSoundMuted, playPop, playSuccess, playTick, setSoundMuted } from "@/lib/feedback";

const CV_PATH = "/assets/Fachry-Alfareeza-ATS-CV.pdf";

interface Command {
  id: string;
  group: "navigate" | "actions" | "links";
  label: string;
  /** Extra words matched by the filter but not shown. */
  keywords?: string;
  /** Keep the menu open while the command runs (e.g. to show a "copied" state). */
  keepOpen?: boolean;
  run: () => void;
}

// Global command menu: Ctrl+K / Cmd+K anywhere, or the header button.
// Native <dialog> provides the focus trap, Escape and the backdrop; the list
// follows the ARIA combobox pattern (focus stays in the input, arrows move
// aria-activedescendant).
export function CommandPalette() {
  const { ui, data, toggleLocale } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  // Theme and sound state, captured on open so labels read e.g. "Switch to light".
  const [isDark, setIsDark] = useState(false);
  const [muted, setMuted] = useState(false);
  // Resolved after mount so the server and client render the same title.
  const [modKey, setModKey] = useState("Ctrl+");

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModKey("⌘");
  }, []);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery("");
    setActiveIndex(0);
    setCopied(false);
    setIsDark(currentTheme() === "dark");
    setMuted(isSoundMuted());
    dialog.showModal();
    playTick();
  };

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const goTo = (id: string) => () => {
      window.location.hash = id;
    };
    return [
      ...NAV_LINKS.map((link) => ({
        id: `nav-${link.id}`,
        group: "navigate" as const,
        label: ui.nav[link.id],
        keywords: link.label,
        run: goTo(link.id),
      })),
      {
        id: "nav-contact",
        group: "navigate",
        label: ui.palette.contact,
        keywords: `contact ${ui.nav.getInTouch}`,
        run: goTo("contact"),
      },
      {
        id: "nav-top",
        group: "navigate",
        label: ui.controls.backToTop,
        keywords: "top home hero",
        run: () => {
          window.scrollTo({ top: 0 });
          document.getElementById("top")?.focus({ preventScroll: true });
        },
      },
      {
        id: "theme",
        group: "actions",
        label: isDark ? ui.controls.switchToLight : ui.controls.switchToDark,
        keywords: "theme dark light mode tema gelap terang",
        run: () => {
          const next = currentTheme() === "dark" ? "light" : "dark";
          playPop(next === "light");
          setStoredTheme(next);
        },
      },
      {
        id: "language",
        group: "actions",
        label: ui.controls.switchLanguage,
        keywords: "language bahasa english indonesia",
        run: () => {
          playTick();
          toggleLocale();
        },
      },
      {
        id: "sound",
        group: "actions",
        label: muted ? ui.controls.unmuteSound : ui.controls.muteSound,
        keywords: "sound audio mute suara",
        run: () => {
          const next = !isSoundMuted();
          setSoundMuted(next);
          if (!next) playTick();
        },
      },
      {
        id: "copy-email",
        group: "actions",
        label: copied ? ui.palette.copiedEmail : ui.palette.copyEmail,
        keywords: `email mail ${data.profile.email}`,
        keepOpen: true,
        run: () => {
          void navigator.clipboard?.writeText(data.profile.email).then(() => {
            playSuccess();
            setCopied(true);
            window.setTimeout(close, 700);
          });
        },
      },
      {
        id: "cv",
        group: "links",
        label: ui.hero.downloadCv,
        keywords: "cv resume pdf",
        run: () => {
          window.open(CV_PATH, "_blank", "noopener");
        },
      },
      ...data.social.map((item) => ({
        id: `social-${item.icon}`,
        group: "links" as const,
        label: item.label,
        keywords: item.url,
        run: () => {
          window.open(item.url, "_blank", "noopener,noreferrer");
        },
      })),
    ];
  }, [ui, data, toggleLocale, isDark, muted, copied]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  const groups: { key: Command["group"]; label: string }[] = [
    { key: "navigate", label: ui.palette.groupNavigate },
    { key: "actions", label: ui.palette.groupActions },
    { key: "links", label: ui.palette.groupLinks },
  ];

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    // Close first: a modal dialog makes the page inert, which blocks the
    // hash scroll and focus moves that navigation commands rely on.
    if (!command.keepOpen) close();
    command.run();
  };

  const onInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((i) => (i + step + results.length) % results.length);
    } else if (event.key === "Home" && results.length) {
      setActiveIndex(0);
    } else if (event.key === "End" && results.length) {
      setActiveIndex(results.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      runCommand(results[activeIndex]);
    }
  };

  // Keep the highlighted option in view while arrowing through a long list.
  useEffect(() => {
    document
      .getElementById(`cmd-${results[activeIndex]?.id}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={ui.palette.open}
        aria-keyshortcuts="Control+K Meta+K"
        title={`${ui.palette.open} (${modKey}K)`}
        className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-sm2 border border-line text-muted transition-colors hover:border-blue-strong hover:text-blue-strong dark:border-white/15 dark:text-white/70 dark:hover:border-orange dark:hover:text-orange max-[1100px]:hidden"
      >
        <CommandIcon className="h-[16px] w-[16px]" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={ui.palette.title}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === dialogRef.current) close();
        }}
        className="mt-[14vh] w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-sm2 border border-line bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/35 backdrop:backdrop-blur-[2px] dark:border-night-line dark:bg-night-800 dark:text-[#F4EFEA] dark:backdrop:bg-black/60"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 dark:border-night-line">
          <CommandIcon className="h-4 w-4 shrink-0 text-blue-strong dark:text-orange" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-autocomplete="list"
            aria-activedescendant={
              results[activeIndex] ? `cmd-${results[activeIndex].id}` : undefined
            }
            aria-label={ui.palette.placeholder}
            placeholder={ui.palette.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKey}
            autoComplete="off"
            spellCheck={false}
            className="h-[52px] w-full bg-transparent text-[15px] outline-none focus-visible:outline-none placeholder:text-muted dark:placeholder:text-white/45"
          />
        </div>

        <ul
          id="command-list"
          role="listbox"
          aria-label={ui.palette.title}
          className="max-h-[min(380px,55vh)] overflow-y-auto p-2"
        >
          {results.length === 0 && (
            <li role="presentation" className="px-3 py-6 text-center text-[13px] text-muted dark:text-white/55">
              {ui.palette.empty}
            </li>
          )}
          {groups.map((group) => {
            const items = results.filter((c) => c.group === group.key);
            if (items.length === 0) return null;
            return (
              <li key={group.key} role="presentation">
                <p
                  aria-hidden="true"
                  className="px-3 pb-1 pt-2 font-mono text-micro uppercase text-muted dark:text-white/45"
                >
                  {group.label}
                </p>
                <ul role="group" aria-label={group.label}>
                  {items.map((command) => {
                    const index = results.indexOf(command);
                    const active = index === activeIndex;
                    return (
                      <li
                        key={command.id}
                        id={`cmd-${command.id}`}
                        role="option"
                        aria-selected={active}
                        onPointerMove={() => setActiveIndex(index)}
                        onClick={() => runCommand(command)}
                        className={`flex min-h-[40px] cursor-pointer items-center rounded-xs px-3 text-[14px] ${
                          active
                            ? "bg-panel text-blue-strong dark:bg-white/[0.07] dark:text-orange"
                            : ""
                        }`}
                      >
                        {command.label}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-end gap-1.5 border-t border-line px-4 py-2 font-mono text-[12px] text-muted dark:border-night-line dark:text-white/45">
          <kbd className="rounded-xs border border-line px-1.5 dark:border-night-line">Esc</kbd>
          {ui.palette.closeHint}
        </div>
      </dialog>
    </>
  );
}
