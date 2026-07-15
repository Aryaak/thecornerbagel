"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Slide order, left -> right: stack-2 (0), expand (1), schmear (2).
const EXPAND_INDEX = 1;
const LAST_INDEX = 2;

// Images are bottom-aligned so every slide's bottom edge lands on the frame's
// bottom — that keeps the caption (just below the frame) directly under the
// image and the corner icon (at the frame's bottom-right) at the image's corner.
const slidePanel = "flex h-full w-full shrink-0 items-end justify-center";
const slideImage = "max-h-full max-w-full w-auto object-contain";

// The expand slide used to be one flattened composite (expand.png, 541x603).
// It's now the 11 bagels as separate files, each placed to land exactly where
// it sat in that composite: left/top/width/height are percentages of the
// original 541x603 box, measured off it per bagel. Keep EXPAND_BOX in sync with
// those percentages — they only hold if the box keeps the source aspect ratio.
const EXPAND_BOX = { w: 541, h: 603 };
const EXPAND_BAGELS = [
  { src: "/bagel-1.png", w: 1436, h: 940, left: 3.697, top: 0.0, width: 26.756, height: 15.713 },
  { src: "/bagel-2.png", w: 1484, h: 1081, left: 34.75, top: -0.332, width: 27.266, height: 17.819 },
  { src: "/bagel-3.png", w: 1698, h: 1067, left: 65.989, top: -0.498, width: 31.386, height: 17.695 },
  { src: "/bagel-4.png", w: 1807, h: 1302, left: 0.0, top: 30.182, width: 33.201, height: 21.462 },
  { src: "/bagel-5.png", w: 1766, h: 1313, left: 34.196, top: 30.68, width: 32.839, height: 21.905 },
  { src: "/bagel-6.png", w: 1603, h: 1149, left: 67.098, top: 27.529, width: 29.808, height: 19.169 },
  { src: "/bagel-7.png", w: 1769, h: 1381, left: 6.1, top: 58.706, width: 32.83, height: 22.994 },
  { src: "/bagel-8.png", w: 1688, h: 964, left: 62.292, top: 56.551, width: 31.201, height: 15.987 },
  { src: "/bagel-9.png", w: 1604, h: 1202, left: 0.0, top: 82.09, width: 29.53, height: 19.854 },
  { src: "/bagel-10.png", w: 1698, h: 1305, left: 34.381, top: 78.109, width: 31.198, height: 21.512 },
  { src: "/bagel-11.png", w: 1787, h: 1257, left: 66.913, top: 78.275, width: 33.031, height: 20.846 },
];

// Opening the slide spreads the bagels out from a pile at the box's bottom
// centre. Each one animates from `gatherTransform` back to identity.
const GATHER_SCALE = 0.42;
const SPREAD_MS = 240;
// Hold the pile until the carousel has faded in and the resting stack has
// shrunk away — otherwise the bagels have already flown apart by the time
// they're visible and the gather never reads. Keep this >= the carousel's
// fade (the `duration-150` on it) and the stack timings below. Only applied on
// the way out; closing re-gathers immediately, under cover of the fade.
const SPREAD_DELAY_MS = 130;

// The resting stack shrinks toward the frame's bottom centre — the same anchor
// the pile sits on — so it reads as the stack collapsing into that pile rather
// than two unrelated images crossfading. It lands on GATHER_SCALE for the same
// reason: it ends up the size of the pile it hands over to.
const STACK_SHRINK_MS = 120;
// The fade trails the shrink so the eye registers "it got smaller" before it
// goes, and finishes as SPREAD_DELAY_MS elapses — the spread starts on an
// empty frame.
const STACK_FADE_MS = 80;
const STACK_FADE_DELAY_MS = 40;

// Each bagel travels this much of the way to the pile at the box's bottom
// centre. Short of 1 on purpose: converging on the exact same point stacks all
// eleven into what looks like a single bagel, so they keep a trace of their
// final arrangement and read as a heap.
const GATHER_TIGHTNESS = 0.88;

// A bagel's spot is a percentage of the box, but a CSS percentage translate is
// relative to the element's own size — hence dividing the gap to the pile by
// that bagel's own width/height. Paired with a bottom-centre transform-origin,
// this pulls the bagels' bottom-centres together, so they pile up rather than
// overlap at their middles.
function gatherTransform(b: (typeof EXPAND_BAGELS)[number]) {
  const dx = (((50 - (b.left + b.width / 2)) * GATHER_TIGHTNESS) / b.width) * 100;
  const dy = (((100 - (b.top + b.height)) * GATHER_TIGHTNESS) / b.height) * 100;
  return `translate(${dx.toFixed(2)}%, ${dy.toFixed(2)}%) scale(${GATHER_SCALE})`;
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" className={className}>
      <path
        d="M6.5 3.354L8.67847e-06 3.354"
        stroke="currentColor"
        strokeWidth="1.00088"
        strokeLinejoin="round"
      />
      <path
        d="M4 0.354004C5.17157 1.52558 5.82843 2.18243 7 3.354L4 6.354"
        stroke="currentColor"
        strokeWidth="1.00088"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BagelPage() {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(EXPAND_INDEX);
  // Devices with a real hover pointer (desktop) reveal on hover; touch devices
  // fall back to tap-to-open + swipe + arrow taps.
  const [canHover, setCanHover] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const open = () => setActive(true);
  const close = () => {
    setActive(false);
    setIndex(EXPAND_INDEX);
  };
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(LAST_INDEX, i + 1));

  // Touch handling: distinguish a tap (toggle open/close) from a horizontal
  // swipe (change slide) so the two don't fight each other.
  const touchX = useRef<number | null>(null);
  const swiped = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    swiped.current = false;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) {
      swiped.current = true;
      setActive(true);
      if (dx < 0) next();
      else prev();
    }
  };
  const onTap = () => {
    if (canHover) return; // desktop uses hover
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    if (active) close();
    else open();
  };

  const captionStyle = {
    fontFamily: "var(--font-geist-sans), sans-serif",
    fontWeight: 400,
    fontSize: "10px",
    lineHeight: "100%",
    letterSpacing: "-0.03em",
    textAlign: "center" as const,
    color: "#C2C2C2",
  };

  // Arrows only while active; hide each one once we hit that end.
  const showLeft = active && index > 0;
  const showRight = active && index < LAST_INDEX;

  // Caption changes on the rightmost (schmear) slide.
  const caption =
    index === LAST_INDEX
      ? "Signature Schmears: Plain, Scallion, Honey Butter"
      : "Bagels available as 1, 3, 6. Mix and match bagel flavors";

  // Arrows sit at the frame edges, centered on the frame (which is tall, so its
  // middle is roughly the viewport's middle on both mobile and desktop).
  const arrowButton =
    "absolute z-10 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-7 sm:w-7 " +
    "items-center justify-center rounded-full border-2 border-black text-black " +
    "transition-all duration-200 hover:border-black hover:bg-black hover:text-white " +
    "cursor-pointer";

  return (
    <div className="flex h-dvh w-full items-center justify-center overflow-hidden bg-white p-6 sm:items-end sm:pb-20">
      <div className="relative flex w-[min(92vw,620px)] flex-col items-center">
        {/* Frame = the image area + the interactive/hover surface. It's a tall
            in-flow box so the caption flows directly beneath it and the icon can
            anchor to its bottom-right. Mobile centers the frame; desktop pins it
            to the bottom and lets it fill the screen height. */}
        <div
          className="relative w-full select-none h-[64dvh] sm:h-[calc(100dvh-140px)]"
          onMouseEnter={canHover ? open : undefined}
          onMouseLeave={canHover ? close : undefined}
          onClick={onTap}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Resting stack — shown when not active. Opening shrinks it into the
              pile the carousel hands over to, then fades it out. */}
          <div
            className={`absolute inset-0 flex items-end justify-center ${
              active ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            style={{
              transition: reduceMotion
                ? "opacity 150ms"
                : `opacity ${STACK_FADE_MS}ms ease ${
                    active ? STACK_FADE_DELAY_MS : 0
                  }ms`,
            }}
          >
            <Image
              src="/stack.png"
              alt="A stack of assorted bagels"
              width={5624}
              height={3655}
              unoptimized
              priority
              className={slideImage}
              style={{
                transformOrigin: "50% 100%",
                transform:
                  active && !reduceMotion ? `scale(${GATHER_SCALE})` : "scale(1)",
                transition: reduceMotion
                  ? undefined
                  : `transform ${STACK_SHRINK_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
            />
          </div>

          {/* Carousel revealed when active */}
          <div
            className={`absolute inset-0 overflow-hidden transition-opacity duration-150 ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {/* 0 — stack-2 */}
              <div className={slidePanel}>
                <Image
                  src="/stack-2.png"
                  alt="Assorted bagels"
                  width={540}
                  height={360}
                  unoptimized
                  className={slideImage}
                />
              </div>

              {/* 1 — expand: the 11 bagels, each its own file */}
              <div className={`${slidePanel} [container-type:size]`}>
                {/* Sized against the panel (hence the cq units) so the whole
                    arrangement scales as one unit and always keeps the source
                    aspect ratio — width first, height only when the panel is
                    too short for it. */}
                <div
                  role="img"
                  aria-label="Bagel selection"
                  className="relative"
                  style={{
                    width: `min(100cqw, calc(100cqh * ${EXPAND_BOX.w} / ${EXPAND_BOX.h}))`,
                    aspectRatio: `${EXPAND_BOX.w} / ${EXPAND_BOX.h}`,
                  }}
                >
                  {EXPAND_BAGELS.map((b) => (
                    <Image
                      key={b.src}
                      src={b.src}
                      alt=""
                      width={b.w}
                      height={b.h}
                      unoptimized
                      className="absolute"
                      style={{
                        left: `${b.left}%`,
                        top: `${b.top}%`,
                        width: `${b.width}%`,
                        height: `${b.height}%`,
                        transformOrigin: "50% 100%",
                        transform:
                          active || reduceMotion
                            ? "translate(0%, 0%) scale(1)"
                            : gatherTransform(b),
                        transition: reduceMotion
                          ? undefined
                          : `transform ${SPREAD_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${
                              active ? SPREAD_DELAY_MS : 0
                            }ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 2 — schmear */}
              <div className={slidePanel}>
                <Image
                  src="/schmear.png"
                  alt="Bagel with schmear"
                  width={5640}
                  height={5485}
                  unoptimized
                  className={slideImage}
                />
              </div>
            </div>
          </div>

          {/* Left / back arrow */}
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className={`${arrowButton} left-0 ${
              showLeft ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180 sm:h-3 sm:w-3" />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className={`${arrowButton} right-0 ${
              showRight ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <ArrowIcon className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
          </button>

          {/* Corner bagel icon — bottom-right of the image (frame). */}
          <Link
            href="/order"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 right-0 h-5 w-5 cursor-pointer sm:bottom-16"
          >
            <Image
              src="/icon.svg"
              alt="Corner Bagel Icon"
              fill
              unoptimized
              className="object-contain"
            />
          </Link>
        </div>

        {/* Caption — always directly below the image */}
        <p className="m-0 mt-3 text-sm" style={captionStyle}>
          {caption}
        </p>
      </div>
    </div>
  );
}
