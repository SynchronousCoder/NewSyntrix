"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CopyMailCard from "./CopyMailCard";
import "./Footer.css";

const NAVIGATION = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "The Void", href: null },
  { label: "Contact", href: "/contact" },
];

/* Replace the "#" links with your real profiles */
const SOCIALS = [
  { label: "Whatsapp", href: "https://wa.me/918750570833" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "X", href: "https://x.com/" },
];

const LEGAL = [
  { label: "Terms & Conditions", href: null },
  { label: "Privacy Policy", href: null },
];

function LinkList({ title, links }) {
  return (
    <div>
      <h3 className="footer-heading">{title}</h3>
      <ul className="footer-list">
        {links.map((link) => (
          <li key={link.label}>
            {link.href ? <Link href={link.href}>{link.label}</Link> : <span aria-disabled="true">{link.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

const NEXT_PAGE = {
  "/": { title: "More Work", href: "/projects", className: "footer-card--blue" },
  "/projects": { title: "Our Services", href: "/services", className: "footer-card--green" },
  "/services": { title: "About Us", href: "/about", className: "footer-card--purple" },
  "/about": { title: "Fill The Form", href: "/contact", className: "footer-card--yellow" },
  "/contact": { title: "The Void", href: null, className: "footer-card--orange" },
};

export default function Footer() {
  const pathname = usePathname();
  const nextPage = NEXT_PAGE[pathname] || NEXT_PAGE["/"];

  return (
    <footer className="footer">
      <div className="site-shell footer-inner">
        <div className="footer-cards">
          <CopyMailCard />

          {nextPage.href ? <Link href={nextPage.href} className={`footer-card ${nextPage.className}`}>
            <span>
              <span className="footer-card-label">/ Navigation</span>
              <span className="footer-card-title">Go to next page</span>
            </span>

            <span className="footer-card-action">
              {nextPage.title}
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
          </Link> : <div className={`footer-card ${nextPage.className}`} aria-label="The Void route is not available"><span><span className="footer-card-label">/ Navigation</span><span className="footer-card-title">Go to next page</span></span><span className="footer-card-action">The Void</span></div>}
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
