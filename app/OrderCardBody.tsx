import Link from "next/link";

// The text style the order card is measured and rendered with. Exported so the
// corner-icon overlay can render an invisible copy of this body at the exact
// same size, pinning the icon to the same spot on every page.
//
// The sizes scale with the viewport (clamp) instead of using breakpoint
// classes, so the card and the overlay can never drift apart.
export const orderTextStyle = {
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontWeight: 400,
  fontSize: "clamp(14px, 3.8vw, 16px)",
  lineHeight: "100%",
  letterSpacing: "-0.03em",
  color: "#000000",
} as const;

const closeStyle = {
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontWeight: 400,
  fontSize: "clamp(12px, 3.3vw, 14px)",
  lineHeight: "100%",
  letterSpacing: "-0.02em",
  textDecoration: "underline",
  textDecorationStyle: "solid" as const,
  color: "#2D2D2D",
};

// The order card's content — every child that gives the card its size — but
// NOT the corner icon. Both the real order page and the icon overlay render
// this, so they always share identical dimensions.
export default function OrderCardBody() {
  return (
    <>
      <p className="m-0 mb-4 md:mb-5" style={{ fontWeight: 700 }}>Right Around The Corner.</p>
      <p className="m-0 mb-1" style={{ fontWeight: 700 }}>No Online Ordering</p>
      <p className="m-0 mb-4 md:mb-5">Available only at our partner locations and walk-up window.</p>
      {/* Bulleted, but self-centered so the two items stay left-aligned with
          each other instead of each centering on its own. The markers are drawn
          by hand (list-none + a flex row) because the browser's own list marker
          leaves a gap that can't be tightened. */}
      <ul className="m-0 list-none self-center text-left mb-4 md:mb-5">
        <li className="flex items-baseline gap-1.5 mb-1">
          <span aria-hidden>•</span>TWSS
        </li>
        <li className="flex items-baseline gap-1.5">
          <span aria-hidden>•</span>Horang Tea
        </li>
      </ul>
      <a
        href="mailto:cornerbagel@publicentity.co"
        className="underline mb-4 md:mb-5"
      >
        cornerbagel@publicentity.co
      </a>

      <Link href="/" className="cursor-pointer" style={closeStyle}>
        Close
      </Link>
    </>
  );
}
