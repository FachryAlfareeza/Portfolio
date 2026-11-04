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
  transform: "rotate(calc(var(--rot) * -1))",
};

const outerPhotoStyle = (split: number): CSSProperties => ({
  top: `${(PHOTO_DROP / ASPECT) * 100}%`,
  clipPath: `inset(0 0 ${100 - split}% 0)`,
});

// Rotation: a slow idle spin, replaced by pointer-following while hovered.
// Speeds are in degrees per second / exponential easing rate.
const IDLE_SPIN_DEG_PER_SEC = 6;
const POINTER_FOLLOW_RATE = 10;

// Keep the angle bounded so it can be rotated indefinitely without losing
// floating-point precision.
const normalizeAngle = (value: number) => {
  let wrapped = value % 360;
  if (wrapped >= 180) wrapped -= 360;
  if (wrapped < -180) wrapped += 360;
  return wrapped;
};

// Signed shortest angular distance from `from` to `to`, in [-180, 180].
const shortestAngleDelta = (from: number, to: number) => {
  let delta = (to - from) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
};

// A cutout photo that "pops out" of a morphing, rotating blob.
//
// Three layers show the same image at the same position, so there is no seam:
//   1. the blob (rotates, morphs, clips with overflow-hidden)
//   2. the full photo inside the blob, counter-rotated so it stays upright
//   3. a copy on top, clipped to the area above the split line, so the head is
//      never cut off by the blob
//
// The blob spins slowly on its own and morphs. While hovered, its rotation
// follows the pointer's angle around the blob's center, so a still pointer
// holds it still. Without JavaScript (or with reduced motion) --rot stays at 0
// and the blob is simply still.
export function HeroPortrait({ photo }: { photo: ProfilePhoto }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No animation when reduced motion is on; just keep rot at 0
      root.style.setProperty("--rot", "0deg");
      return;
    }

    let hovering = false;
    let targetAngle = 0;
    let angle = 0;
    let lastTime = performance.now();
    let frame = 0;
    let running = false;

    const applyRotation = (value: number) => {
      angle = normalizeAngle(value);
      root.style.setProperty("--rot", `${angle.toFixed(2)}deg`);
    };

    // Pointer angle around the blob's center (not the wrapper's, since the blob
    // sits at the bottom). 0deg = pointer to the right, 90deg = below.
    const pointerAngle = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height * ((BLOB_TOP + BLOB / 2) / ASPECT);
      return (
        Math.atan2(
          event.clientY - rect.top - centerY,
          event.clientX - rect.left - centerX
        ) * (180 / Math.PI)
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      hovering = true;
      targetAngle = pointerAngle(event);
    };

    const tick = (now: number) => {
      // Clamp dt so a background tab or a long frame doesn't cause a jump.
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (hovering) {
        // Ease toward the pointer along the shortest direction. Once the
        // pointer stops moving, the target stops changing and the blob freezes.
        const delta = shortestAngleDelta(angle, targetAngle);
        if (Math.abs(delta) < 0.05) {
          applyRotation(targetAngle);
        } else {
          applyRotation(angle + delta * (1 - Math.exp(-POINTER_FOLLOW_RATE * dt)));
        }
      } else {
        applyRotation(angle + IDLE_SPIN_DEG_PER_SEC * dt);
      }

      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const setHoverState = (hovered: boolean) => {
      hovering = hovered;
      root.style.setProperty("--blob-morph-play", hovered ? "paused" : "running");
    };

    const onPointerEnter = (event: PointerEvent) => {
      targetAngle = pointerAngle(event);
      setHoverState(true);
    };
    const onPointerLeaveWithState = () => setHoverState(false);

    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeaveWithState);
    root.addEventListener("pointercancel", onPointerLeaveWithState);

    // Only animate while the portrait is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      stop();
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeaveWithState);
      root.removeEventListener("pointercancel", onPointerLeaveWithState);
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
      style={
        {
          "--rot": "0deg",
          "--blob-morph-play": "running",
          aspectRatio: `1 / ${ASPECT}`,
        } as CSSProperties
      }
      className="group relative mx-auto w-full max-w-[460px]"
    >
      {/* 1. Blob. Its bounds clip the photo below the split line. */}
      <div
        aria-hidden="true"
        style={{
          width: `${BLOB * 100}%`,
          height: `${(BLOB / ASPECT) * 100}%`,
          left: `${BLOB_LEFT * 100}%`,
          transform: "rotate(var(--rot))",
          animationPlayState: "var(--blob-morph-play, running)",
        }}
        className="absolute bottom-0 isolate animate-blob-morph overflow-hidden rounded-[32%_38%_30%_40%/38%_30%_40%_32%] bg-gradient-to-br from-blue-deep to-blue dark:from-night-700 dark:to-orange/80"
      >
        {/* Eja ambigram logomark overlaid on the blob (centered, subtle) */}
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