import Link from "next/link";

export default function PrivacyPolicyPage() {
  const textStyle = {
    fontFamily: "var(--font-geist-sans), sans-serif",
    letterSpacing: "-0.01em",
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] flex flex-col justify-between" style={textStyle}>
      {/* Header Container */}
      <header className="sticky top-0 z-40 bg-[#fafafa]/85 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-semibold text-sm tracking-tight hover:opacity-75 transition-opacity">
            Corner Bagel
          </Link>
          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-[#555] hover:text-black transition-colors font-medium border-b border-[#555] hover:border-black"
          >
            Close
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-2xl w-full mx-auto px-6 py-12 md:py-16">
        <div className="prose prose-sm max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#000] mb-2">
            Corner Bagel Privacy Policy
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#777] font-semibold mb-10">
            Effective Date: July 8, 2026
          </p>

          <p className="text-[15px] leading-relaxed text-[#333] mb-8">
            At Corner Bagel (“Corner Bagel,” “we,” “our,” or “us”), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, place an order, join our mailing list, participate in promotions, or otherwise interact with our business.
          </p>

          <p className="text-[15px] leading-relaxed text-[#333] mb-12 italic">
            By using our website or services, you agree to the practices described in this Privacy Policy.
          </p>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              1. Information We Collect
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-4">
              We may collect the following categories of information:
            </p>

            <h3 className="text-base font-semibold text-[#000] mt-6 mb-2">
              Personal Information
            </h3>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-[#333] space-y-1 mb-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing and payment information</li>
              <li>Delivery or pickup information</li>
              <li>Order history</li>
              <li>Loyalty or rewards account information (if applicable)</li>
            </ul>

            <h3 className="text-base font-semibold text-[#000] mt-6 mb-2">
              Automatically Collected Information
            </h3>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-[#333] space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time spent on our website</li>
              <li>Referring websites</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              We use your information to:
            </p>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-[#333] space-y-1">
              <li>Process and fulfill orders</li>
              <li>Communicate regarding your orders</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Personalize your experience</li>
              <li>Send newsletters, promotions, and special offers (when you opt in)</li>
              <li>Operate loyalty or rewards programs</li>
              <li>Prevent fraud and maintain security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              3. Marketing Communications
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              If you subscribe to our mailing list, we may send updates regarding:
            </p>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-[#333] space-y-1 mb-4">
              <li>New menu items</li>
              <li>Seasonal offerings</li>
              <li>Promotions</li>
              <li>Events</li>
              <li>Store announcements</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#333]">
              You may unsubscribe at any time by clicking the unsubscribe link included in our emails.
            </p>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              4. Cookies
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              Our website may use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-[#333] space-y-1 mb-4">
              <li>Remember user preferences</li>
              <li>Improve website functionality</li>
              <li>Analyze website traffic</li>
              <li>Measure marketing effectiveness</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#333]">
              Most browsers allow you to disable cookies through your browser settings, although doing so may affect certain website features.
            </p>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              5. Payment Information
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              Payments are processed through trusted third-party payment providers.
            </p>
            <p className="text-[15px] leading-relaxed text-[#333]">
              Corner Bagel does not store complete payment card numbers on our servers.
            </p>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              6. Sharing Information
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              We do not sell your personal information.
            </p>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              We may share information with trusted service providers that help us operate our business, including:
            </p>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-[#333] space-y-1 mb-4">
              <li>Payment processors</li>
              <li>Online ordering providers</li>
              <li>Delivery partners</li>
              <li>Email marketing platforms</li>
              <li>Website hosting providers</li>
              <li>Analytics providers</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              These providers are only permitted to use your information to perform services on our behalf.
            </p>
            <p className="text-[15px] leading-relaxed text-[#333]">
              We may also disclose information if required by law or to protect our legal rights.
            </p>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              7. Data Security
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              We implement commercially reasonable administrative, technical, and physical safeguards designed to protect your information.
            </p>
            <p className="text-[15px] leading-relaxed text-[#333]">
              While we strive to protect your information, no method of electronic transmission or storage is completely secure.
            </p>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              8. Data Retention
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              We retain personal information only as long as necessary to:
            </p>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-[#333] space-y-1">
              <li>Fulfill orders</li>
              <li>Provide requested services</li>
              <li>Meet legal and accounting requirements</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
            </ul>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              9. Your Privacy Rights
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              Depending on your state or country of residence, you may have rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-[#333] space-y-1 mb-4">
              <li>Access your information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of personal information</li>
              <li>Request a copy of your information</li>
              <li>Opt out of certain marketing communications</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#333]">
              To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              10. Children’s Privacy
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              Our services are not directed toward children under 13 years of age, and we do not knowingly collect personal information from children.
            </p>
            <p className="text-[15px] leading-relaxed text-[#333]">
              If we become aware that information from a child has been collected without appropriate consent, we will promptly delete it.
            </p>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 11 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              11. Third-Party Links
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              Our website may contain links to third-party websites or services.
            </p>
            <p className="text-[15px] leading-relaxed text-[#333]">
              We are not responsible for the privacy practices or content of those third parties.
            </p>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 12 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              12. Changes to This Privacy Policy
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-3">
              We may update this Privacy Policy from time to time.
            </p>
            <p className="text-[15px] leading-relaxed text-[#333]">
              When changes are made, we will revise the Effective Date above. Continued use of our services after updates constitutes acceptance of the revised policy.
            </p>
          </section>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section 13 */}
          <section className="mb-16">
            <h2 className="text-xl font-bold tracking-tight text-[#000] mb-4">
              13. Contact Us
            </h2>
            <p className="text-[15px] leading-relaxed text-[#333] mb-4">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="border border-gray-200 bg-white rounded-lg p-5">
              <p className="font-bold text-[#000] mb-1">Corner Bagel</p>
              <p className="text-[15px] text-[#555] mb-3">Email: <a href="mailto:cornerbagel@publicentity.co" className="underline hover:text-black text-[#0066cc] font-medium transition-colors">cornerbagel@publicentity.co</a></p>
              <p className="text-xs text-[#777]">We will make reasonable efforts to respond to your inquiry in a timely manner.</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Container */}
      <footer className="border-t border-gray-100 bg-[#f5f5f5] py-8 text-center">
        <Link href="/" className="text-xs uppercase tracking-wider text-[#555] hover:text-black transition-colors font-medium border-b border-[#555] hover:border-black">
          Back to Home
        </Link>
        <p className="text-[11px] text-[#777] mt-3">
          Corner Bagel &copy; 2026. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
