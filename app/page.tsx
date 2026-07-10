"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const colors = ["#ffffff", "#2A0B13", "#0F0F0F"];

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex min-h-dvh w-full items-center justify-center overflow-hidden p-6"
      style={{
        backgroundColor: colors[colorIndex],
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
              className="object-contain"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}


