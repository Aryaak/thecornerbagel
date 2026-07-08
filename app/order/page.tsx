import Link from "next/link";
import Image from "next/image";

export default function OrderPage() {
  const textStyle = {
    fontFamily: "var(--font-geist-sans), sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "-0.03em",
    color: "#000000",
  };

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

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white p-6 overflow-hidden">
      <div className="max-w-md relative text-center flex flex-col" style={textStyle}>
        <p className="m-0 mb-5" style={{ fontWeight: 700 }}>No online Ordering</p>
        <p className="m-0 mb-1">All orders taken at the walk up window</p>
        <p className="m-0 mb-5">Wednesday-Sunday:  7am - 2pm</p>
        <p className="m-0 mb-1">
          To speak to a member of our team please email{" "}
        </p>
        <a
            href="mailto:cornerbagel@publicentity.co"
            className="hover:underline mb-5"
          >
            cornerbagel@publicentity.co
          </a>
        <p className="m-0 mb-1 font-semibold" style={{ textDecoration: "underline" }}>Location:</p>
        <ul className="list-disc list-inside mb-5">
          <li>705 S Western Ave, Los Angeles, CA</li>
        </ul>

        <Link
          href="/"
          className="cursor-pointer"
          style={closeStyle}
        >
          Close
        </Link>

        {/* Floating icon */}
        <div className="absolute -bottom-5 -right-8 w-10 h-10">
          <Image
            src="/icon.png"
            alt="Corner Bagel Icon"
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
