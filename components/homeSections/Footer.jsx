import Link from "next/link";
import CopyMailCard from "./CopyMailCard";

const NAVIGATION = [
  { label: "Projects", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Guides", href: "/guides" },
  { label: "Contact", href: "/#contact" },
];

/* Replace the "#" links with your real profiles */
const SOCIALS = [
  { label: "Whatsapp", href: "https://wa.me/918750570833" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
];

const LEGAL = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

function LinkList({ title, links }) {
  return (
    <div>
      <h3 className="footer-heading">{title}</h3>
      <ul className="footer-list">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="site-shell footer-inner">
        <div className="footer-cards">
          <CopyMailCard />

          <Link href="/work" className="footer-card footer-card--blue">
            <span>
              <span className="footer-card-label">/ Navigation</span>
              <span className="footer-card-title">Go to next page</span>
            </span>

            <span className="footer-card-action">
              More Work
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M8.5 12h7M12.5 8.5 16 12l-3.5 3.5" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="footer-main">
          <p className="footer-brand">Syntrix</p>

          <div className="footer-info">
            <div className="footer-columns">
              <LinkList title="Navigation" links={NAVIGATION} />
              <LinkList title="Socials" links={SOCIALS} />
              <LinkList title="Legal" links={LEGAL} />
            </div>

            <div className="footer-connect">
              <h3 className="footer-heading">Connect</h3>
              <a href="mailto:wesyntrix@gmail.com">wesyntrix@gmail.com</a>
              <a href="tel:+918750570833">+91 8750570833</a>
            </div>

            <p className="footer-copy">
              &copy;2026 Syntrix Design. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}