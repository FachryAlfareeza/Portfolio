"use client";

// Subtle, zero-dependency Web Audio synthesizer + mobile haptics.
// Automatically silenced when the user prefers reduced motion or mutes UI sound.

const SOUND_STORAGE_KEY = "sound-muted";

let audioCtx: AudioContext | null = null;

function shouldPlay(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    if (localStorage.getItem(SOUND_STORAGE_KEY) === "1") return false;
  } catch {
    /* ignore storage errors */
  }
  return true;
}

function getContext(): AudioContext | null {
  if (!shouldPlay()) return null;
  try {
    if (!audioCtx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === "suspended") {
      void audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function isSoundMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(SOUND_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

// Fired on window so every sound control (header toggle, command menu) stays in sync.
export const SOUND_CHANGE_EVENT = "sound-muted-change";

export function setSoundMuted(muted: boolean): void {
  try {
    if (muted) localStorage.setItem(SOUND_STORAGE_KEY, "1");
    else localStorage.removeItem(SOUND_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(SOUND_CHANGE_EVENT));
}

export function vibrate(pattern: number | number[] = 5): void {
  if (!shouldPlay()) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* ignore unsupported environments */
  }
}

/** Short, tactile mechanical tick for pills, tabs, and menu items. */
export function playTick(): void {
  vibrate(4);
  const ctx = getContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(680, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.016);

    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.018);
  } catch {
    /* ignore audio errors */
  }
}

/** Soft pitch-swept pop for theme switches, language toggles, and ambigram spin. */
export function playPop(rising = true): void {
  vibrate(7);
  const ctx = getContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(rising ? 320 : 480, now);
    osc.frequency.exponentialRampToValueAtTime(rising ? 560 : 280, now + 0.038);

    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.042);
  } catch {
    /* ignore */
  }
}

/** Gentle two-tone confirmation chime for clipboard copy actions. */
export function playSuccess(): void {
  vibrate([5, 25, 7]);
  const ctx = getContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25]; // C5 -> E5
    notes.forEach((freq, i) => {
      const start = now + i * 0.045;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.035, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.065);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.07);
    });
  } catch {
    /* ignore */
  }
}
