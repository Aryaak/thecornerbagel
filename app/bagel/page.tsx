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

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
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
          {/* Resting stack — shown when not active */}
          <div
            className={`absolute inset-0 flex items-end justify-center transition-opacity duration-300 ${
              active ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src="/stack.png"
              alt="A stack of assorted bagels"
              width={5624}
              height={3655}
              unoptimized
              priority
              className={slideImage}
            />
          </div>

          {/* Carousel revealed when active */}
          <div
            className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${
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

              {/* 1 — expand */}
              <div className={slidePanel}>
                <Image
                  src="/expand.png"
                  alt="Bagel selection"
                  width={560}
                  height={841}
                  unoptimized
                  className={slideImage}
                />
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
