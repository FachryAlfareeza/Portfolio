"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { useLanguage } from "./LanguageProvider";
import { playPop, playSuccess, playTick } from "@/lib/feedback";

const LOGOMARK_SRC = "/brand/logomark.svg";
const BRAND_PDF_PATH = "/assets/Fachry-Alfareeza-Brand-Guidelines.pdf";

const EJA_RAW_SVG = `<svg width="164" height="132" viewBox="0 0 164 132" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.4115 2.51168C26.4532 0.0140898 33.1016 -0.639126 39.5153 0.634167C45.9291 1.90751 51.8206 5.05027 56.4448 9.66532C61.0689 14.2804 64.2178 20.1604 65.4936 26.5617C66.7692 32.963 66.1149 39.5984 63.6124 45.6283C61.1099 51.6582 56.8715 56.8122 51.434 60.4383C46.1666 63.951 40.0028 65.8771 33.6774 65.9941L33.0645 65.9999L32.792 65.9929C29.9969 65.8513 27.7742 63.5447 27.7742 60.7199C27.7742 57.8039 30.1427 55.4399 33.0645 55.4399L33.4811 55.4361C37.7824 55.3566 41.9742 54.0466 45.556 51.6578C49.2534 49.1921 52.1353 45.6873 53.837 41.587C55.5387 37.4868 55.9839 32.9751 55.1164 28.6223C54.2488 24.2694 52.1077 20.2705 48.9633 17.1322C45.8188 13.9939 41.8122 11.857 37.4507 10.9911C33.0893 10.1253 28.5683 10.5695 24.46 12.268C20.3518 13.9663 16.8407 16.8427 14.3702 20.5328C11.8996 24.223 10.5806 28.5617 10.5806 32.9999V64.5169L10.5813 64.5175C10.5434 69.7527 12.3407 74.8373 15.6624 78.8891C18.9842 82.9415 23.6214 85.7069 28.7706 86.7068C33.92 87.7067 39.2578 86.8777 43.8596 84.3638C48.4548 81.8538 52.027 77.8212 53.9604 72.9623L53.9494 72.9583C54.2041 72.3135 54.5834 71.7248 55.066 71.2258C55.5485 70.7269 56.1248 70.3282 56.7619 70.0517C57.399 69.7751 58.0846 69.6266 58.7793 69.6148C59.4739 69.6022 60.1639 69.727 60.8103 69.9811C61.4567 70.2352 62.0471 70.614 62.5468 71.0958C63.0465 71.5769 63.4465 72.1525 63.7235 72.788C64.0005 73.4243 64.1492 74.1087 64.1613 74.8017C64.1734 75.494 64.0483 76.1811 63.7945 76.8253L63.8061 76.8299C60.9658 83.9889 55.7066 89.9309 48.9394 93.6275C42.1723 97.3242 34.323 98.5432 26.7506 97.0727C19.1781 95.6023 12.3588 91.5353 7.47377 85.5762C2.63926 79.6784 0.00126 72.295 0.00129158 64.6799H0V32.9999C-7.79833e-08 26.4732 1.93938 20.0931 5.57254 14.6663C9.20569 9.23942 14.3698 5.00938 20.4115 2.51168Z" fill="#89CFF0"/>
  <path d="M87.2903 99C87.2903 107.752 83.8067 116.146 77.6057 122.334C71.502 128.427 63.2573 131.89 54.6365 131.997L54.2257 132C51.304 132 48.9354 129.636 48.9354 126.72C48.9354 123.804 51.304 121.44 54.2257 121.44L54.7837 121.433C60.5446 121.29 66.0396 118.945 70.1246 114.868C74.3409 110.66 76.7097 104.951 76.7097 99V33C76.7097 24.2479 80.1934 15.8541 86.3936 9.66537C92.498 3.57337 100.743 0.109329 109.364 0.00257813L109.774 0C112.696 0 115.065 2.36394 115.065 5.28C115.065 8.19608 112.696 10.56 109.774 10.56L109.216 10.5671C103.456 10.7097 97.9603 13.0554 93.8755 17.1323C89.6591 21.3406 87.2903 27.0485 87.2903 33V99Z" fill="#89CFF0"/>
  <path d="M143.589 129.488C137.547 131.986 130.898 132.638 124.485 131.365C118.071 130.092 112.179 126.949 107.555 122.334C102.931 117.719 99.7821 111.839 98.5065 105.438C97.2308 99.0365 97.8849 92.4008 100.388 86.3711C102.89 80.3413 107.128 75.1874 112.566 71.5613C117.833 68.0481 123.997 66.1223 130.322 66.0054L130.935 65.9995L131.208 66.0068C134.003 66.148 136.226 68.4547 136.226 71.2795C136.226 74.1954 133.857 76.5595 130.935 76.5595L130.519 76.5635C126.218 76.6427 122.026 143.953 118.444 80.3413C114.746 82.8071 111.865 86.3123 110.163 90.4122C108.462 94.5128 108.016 99.0246 108.883 103.377C109.751 107.73 111.892 111.729 115.037 114.867C118.181 118.006 122.188 120.143 126.549 121.009C130.91 121.874 135.432 121.43 139.54 119.731C143.648 118.033 147.16 115.157 149.63 111.467C152.1 107.776 153.419 103.438 153.419 98.9995V67.4825L153.419 67.4819C153.456 62.2465 151.659 57.1624 148.337 53.1102C145.016 49.0579 140.379 46.2925 135.229 45.2926C130.08 44.2928 124.742 45.1217 120.141 47.6355C115.545 50.1458 111.973 54.1785 110.039 59.0373L110.051 59.0411C109.796 59.6862 109.416 60.2749 108.934 60.7736C108.452 61.2724 107.875 61.6715 107.238 61.9479C106.601 62.2244 105.916 62.3729 105.221 62.3849C104.526 62.3971 103.836 62.2723 103.19 62.0182C102.543 61.7641 101.953 61.3855 101.453 60.9038C100.953 60.4222 100.554 59.8471 100.277 59.2113C99.9997 58.5754 99.8509 57.8911 99.839 57.1978C99.8264 56.5057 99.9514 55.8181 100.205 55.174L100.194 55.1694C103.034 48.0108 108.294 42.0684 115.061 38.3716C121.828 34.6751 129.677 33.4564 137.249 34.9266C144.822 36.397 151.641 40.464 156.526 46.4232C161.361 52.3207 163.999 59.7045 163.999 67.3195H164V98.9995C164 105.526 162.06 111.906 158.427 117.333C154.794 122.76 149.63 126.99 143.589 129.488Z" fill="#89CFF0"/>
</svg>`;

export function Logo({ showWordmark = true }: { showWordmark?: boolean }) {
  const { ui } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    playTick();
    setMenuOpen((prev) => !prev);
  };

  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(EJA_RAW_SVG);
      playSuccess();
      setCopiedSvg(true);
      window.setTimeout(() => setCopiedSvg(false), 1600);
    } catch {
      /* ignore clipboard error */
    }
  };

  return (
    <div ref={wrapperRef} className="relative inline-flex items-center">
      <a
        href="#top"
        aria-label="Home (Right-click for brand options)"
        onContextMenu={handleContextMenu}
        className="group inline-flex items-center gap-2.5 transition-colors"
      >
        <span
          aria-hidden="true"
          className={`brand-logomark h-[27px] w-[34px] text-blue-strong transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:text-orange ${
            flipped
              ? "rotate-180 group-hover:rotate-0"
              : "rotate-0 group-hover:rotate-180"
          }`}
          style={{ "--logomark-src": `url(${LOGOMARK_SRC})` } as CSSProperties}
        />
        {showWordmark && (
          <span className="font-sans text-xl font-extrabold tracking-[-0.055em]">
            <span className="text-ink transition-colors group-hover:text-blue-strong dark:text-[#F4EFEA] dark:group-hover:text-orange">
              Fachry
            </span>
            <span className="text-blue-strong transition-colors group-hover:text-ink dark:text-orange dark:group-hover:text-[#F4EFEA]">
              Alfareeza
            </span>
            <span className="text-blue-strong transition-colors group-hover:text-ink dark:text-orange dark:group-hover:text-[#F4EFEA]">
              .
            </span>
          </span>
        )}
      </a>

      {menuOpen && (
        <div
          role="menu"
          aria-label={ui.logoMenu.ambigramTitle}
          className="absolute left-0 top-[calc(100%+10px)] z-50 w-[265px] rounded-sm2 border border-line bg-paper p-3 shadow-xl dark:border-night-line dark:bg-night-800"
        >
          <div className="mb-2 border-b border-line pb-2 dark:border-night-line">
            <div className="flex items-center justify-between">
              <p className="font-sans text-[13px] font-bold text-ink dark:text-[#F4EFEA]">
                {ui.logoMenu.ambigramTitle}
              </p>
              <span className="rounded-xs bg-panel px-1.5 py-0.5 font-mono text-[11px] text-blue-strong dark:bg-white/10 dark:text-orange">
                {flipped ? "180°" : "0°"}
              </span>
            </div>
            <p className="mt-1 text-[12px] leading-[1.45] text-muted dark:text-white/60">
              {ui.logoMenu.ambigramNote}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setFlipped((f) => !f);
                playPop(!flipped);
              }}
              className="flex min-h-[34px] w-full items-center justify-between rounded-xs px-2 text-left text-[12px] font-bold text-ink transition-colors hover:bg-panel hover:text-blue-strong dark:text-[#F4EFEA] dark:hover:bg-white/10 dark:hover:text-orange"
            >
              <span>{flipped ? ui.logoMenu.resetFlip : ui.logoMenu.flip180}</span>
              <span aria-hidden="true" className="font-mono text-[12px]">
                ↻
              </span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={handleCopySvg}
              className="flex min-h-[34px] w-full items-center justify-between rounded-xs px-2 text-left text-[12px] font-bold text-ink transition-colors hover:bg-panel hover:text-blue-strong dark:text-[#F4EFEA] dark:hover:bg-white/10 dark:hover:text-orange"
            >
              <span>
                {copiedSvg ? ui.logoMenu.copiedSvg : ui.logoMenu.copySvg}
              </span>
              <span aria-hidden="true" className="font-mono text-[11px] opacity-60">
                SVG
              </span>
            </button>

            <a
              role="menuitem"
              href={BRAND_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playTick();
                setMenuOpen(false);
              }}
              className="flex min-h-[34px] w-full items-center justify-between rounded-xs px-2 text-left text-[12px] font-bold text-ink transition-colors hover:bg-panel hover:text-blue-strong dark:text-[#F4EFEA] dark:hover:bg-white/10 dark:hover:text-orange"
            >
              <span>{ui.logoMenu.brandPdf}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
