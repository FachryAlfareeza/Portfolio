"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
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

// Rotation: slow constant drift plus pointer-following on hover.
// - Normal mode: 2 deg/sec drift (respects prefers-reduced-motion)
const DRIFT_DEG_PER_SEC = 8;
// - Hover mode: smooth follow toward pointer angle; when leaving, persist that angle
//   and continue drift from there. 12 deg/s follow speed gives a gentle snap.
const FOLLOW_DEG_PER_SEC = 12;

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
  const [isHovered, setIsHovered] = useState(false);
  const [pointerAngleDeg, setPointerAngleDeg] = useState(0);
  const [lastAngleDeg, setLastAngleDeg] = useState(0);

  // Track mouse position relative to the root element
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleMouseMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2; // center-relative
      const y = e.clientY - rect.top - rect.height / 2; // center-relative
      const angle = Math.atan2(-y, x) * (180 / Math.PI); // invert Y for screen coords
      setPointerAngleDeg(angle);
      setIsHovered(true);
      setLastAngleDeg(angle);
    };

    root.addEventListener("pointermove", handleMouseMove as EventListener);

    return () => {
      root.removeEventListener("pointermove", handleMouseMove);
    };
  }, []);

  // Rotation: slow constant drift plus pointer-following on hover.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No animation when reduced motion is on; just keep rot at 0
      root.style.setProperty("--rot", "0deg");
      return;
    }

    let frame = 0;
    let running = false;
    let hoverAngle = isHovered ? pointerAngleDeg : lastAngleDeg;

    const tick = () => {
      // If hovering, smoothly follow the pointer angle
      if (isHovered) {
        const target = pointerAngleDeg;
        // Move toward target by up to FOLLOW_DEG_PER_SEC per frame
        const diff = (target - hoverAngle + 540) % 360 - 180; // shortest path
        hoverAngle += diff * (1 / 60) * FOLLOW_DEG_PER_SEC; // approx per-frame
        // Clamp to -180..180 range conceptually; just let it wrap naturally
      } else {
        // Not hovering: use the last hover angle as base, then drift
        const drift = (performance.now() / 1000) * DRIFT_DEG_PER_SEC;
        hoverAngle += drift;
      }
      setLastAngleDeg(hoverAngle);
      root.style.setProperty("--rot", `${hoverAngle.toFixed(2)}deg`);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
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
    };
  }, [isHovered, pointerAngleDeg, lastAngleDeg]);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        className="absolute bottom-0 isolate overflow-hidden rounded-[32%_38%_30%_40%/38%_30%_40%_32%] bg-gradient-to-br from-blue-deep to-blue dark:from-night-700 dark:to-orange/80"
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