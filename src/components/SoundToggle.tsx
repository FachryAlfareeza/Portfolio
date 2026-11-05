"use client";

import { useEffect, useState } from "react";
import { VolumeIcon, VolumeMuteIcon } from "./icons";
import { useLanguage } from "./LanguageProvider";
import { isSoundMuted, playTick, setSoundMuted, SOUND_CHANGE_EVENT } from "@/lib/feedback";

export function SoundToggle() {
  const [muted, setMuted] = useState(false);
  const { ui } = useLanguage();

  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    sync();
    window.addEventListener(SOUND_CHANGE_EVENT, sync);
    return () => window.removeEventListener(SOUND_CHANGE_EVENT, sync);
  }, []);

  const toggle = () => {
    const next = !muted;
    setSoundMuted(next);
    if (!next) {
      playTick();
    }
  };

  const label = muted ? ui.controls.unmuteSound : ui.controls.muteSound;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={!muted}
      className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-sm2 border border-line text-muted transition-colors hover:border-blue-strong hover:text-blue-strong dark:border-white/15 dark:text-white/70 dark:hover:border-orange dark:hover:text-orange max-[600px]:hidden"
    >
      {muted ? (
        <VolumeMuteIcon className="h-[17px] w-[17px] opacity-65" />
      ) : (
        <VolumeIcon className="h-[17px] w-[17px]" />
      )}
    </button>
  );
}
