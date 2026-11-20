"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./Navbar.css";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "The Void", href: null },
];

const CONTACT = { label: "Contact Us", href: "/contact" };

function ArrowIcon() {
  return (
    <svg
      className="navbar-arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Main navigation">
        {/* Swap this text for <img src="/your-logo.svg" alt="Syntrix" /> if you have the logo file */}
        <Link href="/" className="navbar-logo" onClick={close}>
          syntrix
        </Link>

        <ul className="navbar-links">
          {LINKS.map((link) => (
            <li key={link.label}>
              {link.href ? <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link> : <span aria-disabled="true">{link.label}</span>}
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <Link href={CONTACT.href} className="navbar-cta">
            {CONTACT.label}
          </Link>
          <ArrowIcon />
        </div>

        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={open}
          aria-controls="navbar-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul id="navbar-menu" className="navbar-menu">
          {[...LINKS, CONTACT].map((link) => (
            <li key={link.label}>
              {link.href ? <Link href={link.href} onClick={close}>{link.label}</Link> : <span aria-disabled="true">{link.label}</span>}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
