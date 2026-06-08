"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  // Transparent mode: only on the homepage before the user scrolls
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent ? "bg-transparent" : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-serif text-2xl tracking-widest font-semibold transition-colors duration-500 ${
            transparent ? "text-white" : "text-forest"
          }`}
        >
          CARLOGAID
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-widest uppercase font-sans transition-colors duration-300 ${
                pathname === href
                  ? transparent
                    ? "text-white"
                    : "text-gold"
                  : transparent
                  ? "text-white/75 hover:text-white"
                  : "text-forest/60 hover:text-forest"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`ml-4 px-6 py-2 border text-sm tracking-widest uppercase font-sans transition-all duration-300 ${
              transparent
                ? "border-white text-white hover:bg-white hover:text-forest"
                : "border-forest text-forest hover:bg-forest hover:text-white"
            }`}
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {[
            open ? "rotate-45 translate-y-2" : "",
            open ? "opacity-0" : "",
            open ? "-rotate-45 -translate-y-2" : "",
          ].map((extra, i) => (
            <span
              key={i}
              className={`block w-6 h-px transition-all duration-300 ${
                transparent ? "bg-white" : "bg-forest"
              } ${extra}`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          transparent ? "bg-forest" : "bg-white"
        } ${open ? "max-h-80 py-4" : "max-h-0"}`}
      >
        <nav className="flex flex-col gap-1 px-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`py-3 text-sm tracking-widest uppercase font-sans border-b transition-colors duration-300 ${
                pathname === href
                  ? "text-gold"
                  : transparent
                  ? "border-white/10 text-white/80"
                  : "border-forest/10 text-forest/70"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={`mt-4 py-3 text-center border text-sm tracking-widest uppercase transition-colors duration-300 ${
              transparent
                ? "border-gold text-gold"
                : "border-forest text-forest"
            }`}
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
