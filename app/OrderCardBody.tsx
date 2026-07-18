import Link from "next/link";

// The text style the order card is measured and rendered with. Exported so the
// corner-icon overlay can render an invisible copy of this body at the exact
// same size, pinning the icon to the same spot on every page.
export const orderTextStyle = {
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "100%",
  letterSpacing: "-0.03em",
  color: "#000000",
} as const;

const closeStyle = {
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontWeight: 400,
  fontSize: "14px",
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
      <p className="m-0 mb-5" style={{ fontWeight: 700 }}>Right Around The Corner.</p>
      <div className="self-center text-left mb-5">
        <p className="m-0 mb-1">Find fresh Corner Bagels at:</p>
        <ul className="list-disc list-inside">
          <li>TWSS</li>
          <li>Horang Tea</li>
        </ul>
      </div>
      <p className="m-0 mb-1">Or visit our walk-up window:</p>
      <p className="m-0 mb-1">3076 W 8th St.</p>
      <p className="m-0 mb-5">Los Angeles, CA 90005</p>
      <p className="m-0 mb-1">Tuesday – Saturday</p>
      <p className="m-0 mb-8">7:00 AM – 2:00 PM</p>
      <p className="m-0 mb-1" style={{ fontWeight: 700 }}>No online ordering.</p>
      <p className="m-0 mb-5">Available only at our partner locations and walk-up window.</p>
      <p className="m-0 mb-1">
        To speak to a member of our team please email{" "}
      </p>
      <a
        href="mailto:cornerbagel@publicentity.co"
        className="hover:underline mb-8"
      >
        cornerbagel@publicentity.co
      </a>

      <Link href="/" className="cursor-pointer" style={closeStyle}>
        Close
      </Link>
    </>
  );
}
