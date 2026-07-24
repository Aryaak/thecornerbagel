"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import OrderCardBody, { orderTextStyle } from "./OrderCardBody";

// A single corner bagel icon for the whole app. It lives in the root layout, so
// it stays mounted while navigating between /order and /bagel — the same DOM
// element, never remounted, so it can't jump or animate on navigation.
//
// It's pinned to the order card's bottom-right corner: the overlay reproduces
// the order card's centered layout with an invisible copy of its body (only to
// give the box the exact same size), then anchors the icon to that box's
// bottom-right. Because the box is identical on every page, the icon sits at the
// same spot everywhere.
export default function CornerBagelIcon() {
  const pathname = usePathname();

  // Only the order and bagel pages carry the corner icon.
  if (pathname !== "/order" && pathname !== "/bagel") return null;
  const href = pathname === "/order" ? "/bagel" : "/order";

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center overflow-hidden p-6">
      {/* Same box as the order card; its body is invisible (kept only for
          sizing) while the last child — the icon — stays visible. */}
      <div
        className="relative flex max-w-md flex-col text-center [&>*:not(:last-child)]:invisible"
        style={orderTextStyle}
      >
        <OrderCardBody />
        <Link
          href={href}
          aria-label="Corner Bagel"
          className="pointer-events-auto absolute -bottom-18 right-0 md:-bottom-18 md:-right-22 h-3 w-3 md:h-5 md:w-5 cursor-pointer"
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
    </div>
  );
}
