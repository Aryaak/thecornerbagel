"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [rolling, setRolling] = useState(true);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Roll lasts 5s on desktop, 2.8s on mobile (see .animate-logo-roll in globals.css)
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px)").matches;
    const rollDuration = isMobile ? 2800 : 5000;

    // Selagi menggelinding: background bergantian antara dua warna gelap.
    // Interval sama dengan durasi transisi supaya pergantiannya mulus terus.
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setRolling(false);
    }, rollDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Semua perubahan warna (termasuk kembali ke putih) memakai transisi yang sama
  // sehingga tidak ada lompatan warna yang kasar.
  const backgroundColor = rolling
    ? pulse
      ? "#0F0F0F"
      : "#2A0B13"
    : "#ffffff";

  return (
    <div
      className="flex min-h-dvh w-full items-center justify-center overflow-hidden p-6"
      style={{
        backgroundColor,
        transition: "background-color 1000ms ease-in-out",
      }}
    >
      <Link href="/order" className="cursor-pointer">
        <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72">
          <Image
            src="/logo.svg"
            alt="The Corner Bagel Logo"
            fill
            unoptimized
            priority
            className="object-contain"
          />
          <div className="absolute bottom-[25%] right-[-16%] aspect-square w-[16%] animate-logo-roll">
            <Image
              src="/logo-2.svg"
              alt="Corner Bagel Logo secondary"
              fill
              unoptimized
              priority
              className="object-contain"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}


