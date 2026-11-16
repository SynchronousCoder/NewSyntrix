"use client";

import Link from "next/link";
import { useState } from "react";

const LEFT_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#work" },
];

const RIGHT_LINKS = [
  { label: "FAQ", href: "/#faq" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Main navigation">
        <ul className="navbar-links navbar-links--left">
          {LEFT_LINKS.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="navbar-logo" onClick={close}>
          Syntrix
        </Link>

        <ul className="navbar-links navbar-links--right">
          {RIGHT_LINKS.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

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
          {[...LEFT_LINKS, ...RIGHT_LINKS].map((link) => (
            <li key={link.label}>
              <Link href={link.href} onClick={close}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}