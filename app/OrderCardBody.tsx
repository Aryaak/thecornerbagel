import Link from "next/link";

// Every line in the card is set with `whitespace-nowrap`, so the font size —
// not word wrapping — is what has to give way on a narrow screen.
//
// The card is `max-w-md` inside a `p-6` page, so the widest a line may ever be
// is `100vw - 48px` (capped at 448px by max-w-md). The longest line here,
// "Available only at our partner locations and walk-up window.", measures about
// 25.5em in Geist at this tracking; dividing the available width by 27.5 leaves
// a small safety margin on top of that and still reaches the 16px ceiling by
// the time the viewport is ~490px wide.
//
// Change PAGE_PADDING here if the page's `p-6` changes, and lower the divisor
// only if a longer line is ever added.
const PAGE_PADDING = 48; // p-6 on both sides of the page wrapper
const LONGEST_LINE_EM = 27.5;
const cardFontSize = `min(calc((100vw - ${PAGE_PADDING}px) / ${LONGEST_LINE_EM}), 16px)`;

// The text style the order card is measured and rendered with. Exported so the
// corner-icon overlay can render an invisible copy of this body at the exact
// same size, pinning the icon to the same spot on every page.
//
// The sizes scale continuously with the viewport instead of using breakpoint
// classes, so the card and the overlay can never drift apart.
export const orderTextStyle = {
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontWeight: 400,
  fontSize: cardFontSize,
  lineHeight: "100%",
  letterSpacing: "-0.03em",
  color: "#000000",
} as const;

// Kept at the same 7/8 ratio to the body text it had at desktop size (14/16),
// so it shrinks in step with the rest of the card.
const closeStyle = {
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontWeight: 400,
  fontSize: `calc(${cardFontSize} * 0.875)`,
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
      <p className="m-0 mb-[1.25em] whitespace-nowrap" style={{ fontWeight: 700 }}>Right Around The Corner.</p>
      <p className="m-0 mb-[0.3em] whitespace-nowrap" style={{ fontWeight: 700 }}>No Online Ordering</p>
      <p className="m-0 mb-[1.25em] whitespace-nowrap">Available only at our partner locations and walk-up window.</p>
      {/* Bulleted, but self-centered so the two items stay left-aligned with
          each other instead of each centering on its own. The markers are drawn
          by hand (list-none + a flex row) because the browser's own list marker
          leaves a gap that can't be tightened. */}
      <ul className="m-0 list-none self-center text-left mb-[1.25em]">
        <li className="flex items-baseline gap-[0.375em] mb-[0.3em] whitespace-nowrap">
          <span aria-hidden>•</span>TWSS
        </li>
        <li className="flex items-baseline gap-[0.375em] whitespace-nowrap">
          <span aria-hidden>•</span>Horang Tea
        </li>
      </ul>
      <a
        href="mailto:cornerbagel@publicentity.co"
        className="underline mb-[1.25em] whitespace-nowrap"
      >
        cornerbagel@publicentity.co
      </a>

      <Link href="/" className="cursor-pointer whitespace-nowrap" style={closeStyle}>
        Close
      </Link>
    </>
  );
}
