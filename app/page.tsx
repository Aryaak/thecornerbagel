"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Fade ke putih-nya sengaja pendek, dan MENDARAT di detik berhentinya roll —
// bukan baru mulai di situ. Fade panjang bikin background udah keburu terang
// padahal bagel masih jalan; fade yang mulai pas berhenti bikin masih ada
// animasi jalan padahal bagel udah diam. Sependek ini, mulainya nggak kerasa
// lebih awal, tapi ujungnya nggak nyangkut lewat garis finish.
const WHITE_FADE_MS = 200;

// Panjang pulse yang diinginkan. Yang dipakai dibulatkan supaya jumlah pulse pas
// membagi window pulse (roll - fade) tanpa sisa; kalau bersisa, pulse terakhir
// kepotong di tengah transisi dan pergantian ke putih kelihatan kasar.
const TARGET_PULSE_MS = 1000;

// Dipakai kalau animasi roll belum kebaca saat effect jalan. Harus sama dengan
// .animate-logo-roll di globals.css.
const FALLBACK_ROLL_MS = 5000;

const ROLLING_COLORS = ["#2A0B13","#0F0F0F"];
const WHITE = "#ffffff";

export default function Home() {
  const rollRef = useRef<HTMLDivElement>(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [white, setWhite] = useState(false);
  const [pulseMs, setPulseMs] = useState(TARGET_PULSE_MS);

  useEffect(() => {
    // Clock-nya diambil dari animasi roll itu sendiri, bukan timer paralel:
    // durasinya otomatis ikut media query di CSS (5s desktop, 2.8s mobile), dan
    // titik nolnya ikut kapan animasinya benar-benar mulai — bukan kapan
    // hydration selesai.
    const anim = rollRef.current?.getAnimations()[0];
    const rollMs =
      Number(anim?.effect?.getComputedTiming().activeDuration) ||
      FALLBACK_ROLL_MS;
    const elapsed = Number(anim?.currentTime) || 0;

    const pulseWindow = Math.max(0, rollMs - WHITE_FADE_MS - elapsed);
    const count = Math.max(1, Math.round(pulseWindow / TARGET_PULSE_MS));
    const period = pulseWindow / count;
    setPulseMs(period);

    let ticks = 0;
    const interval = setInterval(() => {
      ticks += 1;
      // Tick terakhir barengan dengan detik berhentinya roll — dilewati, biar
      // warnanya nggak sempat pindah sekejap tepat sebelum jadi putih.
      if (ticks >= count) {
        clearInterval(interval);
        return;
      }
      setColorIndex(ticks);
    }, period);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setWhite(true);
    }, pulseWindow);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const backgroundColor = white
    ? WHITE
    : ROLLING_COLORS[colorIndex % ROLLING_COLORS.length];

  return (
    <div
      className="flex min-h-dvh w-full items-center justify-center overflow-hidden p-6"
      style={{
        backgroundColor,
        // Tiap pulse selesai persis saat pulse berikutnya mulai; fade putih
        // pakai durasinya sendiri yang pendek, dan mendarat barengan logo.
        transition: `background-color ${
          white ? `${WHITE_FADE_MS}ms ease-out` : `${pulseMs}ms ease-in-out`
        }`,
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
          <div
            ref={rollRef}
            className="absolute bottom-[25%] right-[-16%] aspect-square w-[16%] animate-logo-roll"
          >
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
