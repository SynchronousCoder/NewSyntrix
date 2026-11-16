import Link from "next/link";

export default function ContactUs() {
  return (
    <section id="contact" className="contact">
      <div className="site-shell contact-inner">
        <div className="contact-topline" />

        <div className="contact-layout">
          <div className="contact-visual">
            <img src="/trafficlight.png" alt="Traffic light showing green" />
          </div>

          <div className="contact-content">
            <div>
              <span className="contact-eyebrow">04 / Contact Us</span>
              <h2 className="contact-title">
                Let&apos;s Build Something Bold
              </h2>
            </div>

            <div>
              <p className="contact-copy">
                Have a bold idea? Let&apos;s turn it into something
                extraordinary. Tell us where you want to go, and we&apos;ll
                bring the design, motion, and technology to get you there.
                Ready to make your mark? Let&apos;s talk.
              </p>

              <Link href="/contact" className="contact-cta">
                <span>Start a project</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="M8.5 12h7M12.5 8.5 16 12l-3.5 3.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}