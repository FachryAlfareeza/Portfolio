"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import type { ProfilePhoto } from "@/content";

const LOGOMARK_SRC = "/brand/logomark.svg";

// Geometry, in units of the wrapper's width. The wrapper is 4:5 (height 1.25),
// the blob is a square bottom-anchored and centered horizontally.
const ASPECT = 1.25; // wrapper height / width
const BLOB = 0.88; // blob side / wrapper width
const BLOB_LEFT = (1 - BLOB) / 2;
const BLOB_TOP = ASPECT - BLOB;
// Shift the photo down so its bottom edge stays below the blob's corners as the
// blob rotates (the rounded square's diagonal extends ~0.08 past its flat bottom).
const PHOTO_DROP = 0.09;

// The inner photo layer must cover the whole wrapper while living inside the
// blob, so it is sized and offset in the blob's own percentage coordinates.
const innerStyle: CSSProperties = {
  width: `${(1 / BLOB) * 100}%`,
  height: `${(ASPECT / BLOB) * 100}%`,
  left: `${(-BLOB_LEFT / BLOB) * 100}%`,
  top: `${((PHOTO_DROP - BLOB_TOP) / BLOB) * 100}%`,
  // Rotate about the blob's center, expressed in the inner layer's coordinates.
  transformOrigin: `50% ${((BLOB_TOP + BLOB / 2 - PHOTO_DROP) / ASPECT) * 100}%`,
  transform: "rotate(calc(0deg - var(--rot)))",
};

const outerPhotoStyle = (split: number): CSSProperties => ({
  top: `${(PHOTO_DROP / ASPECT) * 100}%`,
  clipPath: `inset(0 0 ${100 - split}% 0)`,
});

// A cutout photo that "pops out" of a morphing, rotating blob.
//
// Three layers show the same image at the same position, so there is no seam:
//   1. the blob (rotates, morphs, clips with overflow-hidden)
//   2. the full photo inside the blob, counter-rotated so it stays upright
//   3. a copy on top, clipped to the area above the split line, so the head is
//      never cut off by the blob
//
// Without JavaScript (or with reduced motion) --rot stays at 0 and the blob is
// simply still.
export function HeroPortrait({ photo }: { photo: ProfilePhoto }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Continuous rotation state. `angle` is the current rotation and is never
    // wrapped with modulo, so the pointer angle crossing ±180° can't snap.
    const state = {
      angle: 0,
      target: 0,
      pointerX: 0,
      pointerY: 0,
      hasPointer: false,
      hovered: false,
    };

    // Non-hover drift: rotate slowly, wobbling between ~2 and 8 deg/sec.
    const driftRate = (t: number) => 5 + 3 * Math.sin((t / 1000) * 0.4);

    const onEnter = () => {
      state.hovered = true;
    };
    const onLeave = () => {
      state.hovered = false;
      state.hasPointer = false;
    };
    const onMove = (e: PointerEvent) => {
      state.pointerX = e.clientX;
      state.pointerY = e.clientY;
      state.hasPointer = true;
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointermove", onMove);

    let frame = 0;
    let running = false;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (state.hovered && state.hasPointer) {
        const rect = root.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const raw =
          Math.atan2(state.pointerY - cy, state.pointerX - cx) * (180 / Math.PI);

        // Unwrap `raw` to the nearest continuous target (no `%` on the shown
        // angle) so the blob always takes the shortest path to the pointer.
        let delta = raw - state.target;
        while (delta > 180) delta -= 360;
        while (delta < -180) delta += 360;
        state.target += delta;

        // Ease toward the pointer with exponential damping.
        state.angle += (state.target - state.angle) * (1 - Math.exp(-dt * 9));
      } else {
        state.angle += driftRate(now) * dt;
        state.target = state.angle;
      }

      root.style.setProperty("--rot", `${state.angle.toFixed(2)}deg`);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // Only animate while the portrait is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      stop();
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointermove", onMove);
    };
  }, []);

  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  // One variant per theme. CSS (class-based dark mode) shows the matching one,
  // so there is no theme state, no hydration mismatch, and no flash. Without a
  // dark photo, a single variant is shown in both modes.
  const variants = photo.srcDark
    ? [
        { key: "light", src: photo.src, split: clamp(photo.split), show: "dark:hidden", priority: true },
        { key: "dark", src: photo.srcDark, split: clamp(photo.splitDark ?? photo.split), show: "hidden dark:block", priority: false },
      ]
    : [{ key: "all", src: photo.src, split: clamp(photo.split), show: "", priority: true }];

  return (
    <div
      ref={rootRef}
      style={{ "--rot": "0deg", aspectRatio: `1 / ${ASPECT}` } as CSSProperties}
      className="relative mx-auto w-full max-w-[460px]"
    >
      {/* 1. Blob. Its bounds clip the photo below the split line. */}
      <div
        aria-hidden="true"
        style={{
          width: `${BLOB * 100}%`,
          height: `${(BLOB / ASPECT) * 100}%`,
          left: `${BLOB_LEFT * 100}%`,
          transform: "rotate(var(--rot))",
        }}
        className="absolute bottom-0 isolate animate-blob-morph overflow-hidden rounded-[32%_38%_30%_40%/38%_30%_40%_32%] bg-gradient-to-br from-blue-deep to-blue dark:from-night-700 dark:to-orange/80 group"
      >
        {/* Ambiguous Eja logomark overlaid on the blob */}
        <span
          aria-hidden="true"
          className="brand-logomark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] max-w-[140px] opacity-10 transition-opacity duration-300 group-hover:opacity-15"
          style={{ "--logomark-src": `url(${LOGOMARK_SRC})` } as CSSProperties}
        />

        {/* 2. Full photo inside the blob, counter-rotated to stay upright. */}
        {variants.map((v) => (
          <div key={v.key} style={innerStyle} className={`absolute ${v.show}`}>
            <Image
              src={v.src}
              alt=""
              fill
              sizes="(max-width: 800px) 90vw, 460px"
              unoptimized={v.src.endsWith(".svg")}
              className="object-contain object-bottom"
            />
          </div>
        ))}
      </div>

      {/* 3. Top copy: unclipped by the blob, shown only above the split line. */}
      {variants.map((v) => (
        <div
          key={v.key}
          style={outerPhotoStyle(v.split)}
          className={`absolute left-0 h-full w-full ${v.show}`}
        >
          <Image
            src={v.src}
            alt={photo.alt}
            fill
            priority={v.priority}
            sizes="(max-width: 800px) 90vw, 460px"
            unoptimized={v.src.endsWith(".svg")}
            className="object-contain object-bottom"
          />
        </div>
      ))}
    </div>
  );
}
