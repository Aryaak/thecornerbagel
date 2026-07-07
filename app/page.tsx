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
      className="flex h-screen w-screen items-center justify-center overflow-hidden"
      style={{
        backgroundColor: colors[colorIndex],
        transition: "background-color 1000ms ease-in-out",
      }}
    >
      <Link href="/order" className="cursor-pointer">
        <div className="relative w-64 h-64">
          <Image
            src="/logo.webp"
            alt="The Corner Bagel Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </Link>
    </div>
  );
}


