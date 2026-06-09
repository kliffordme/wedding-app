import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest text-ivory py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <p className="font-serif text-3xl tracking-widest text-ivory">
            CARLOGAID
          </p>
          <p className="font-sans text-sm text-ivory/60 leading-relaxed max-w-xs">
            Documentary wedding photography based in the Philippines, available
            worldwide. We tell your story the way it truly happened.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-gold font-sans">Explore</p>
          <nav className="flex flex-col gap-3">
            {[
              { href: "/", label: "Home" },
              { href: "/gallery", label: "Portfolio" },
              { href: "/pricing", label: "Packages" },
              { href: "/contact", label: "Contact & Booking" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-ivory/70 hover:text-gold transition-colors duration-200 font-sans tracking-wide"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact + Social */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-gold font-sans">Contact</p>
          <address className="not-italic text-sm text-ivory/70 font-sans space-y-2">
            <p>Philippines</p>
            <a
              href="tel:+61712345678"
              className="block hover:text-gold transition-colors"
            >
              +61 7 1234 5678
            </a>
            <a
              href="mailto:hello@carlogaid.com"
              className="block hover:text-gold transition-colors"
            >
              hello@carlogaid.com
            </a>
          </address>
          {/* Instagram icon */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="inline-flex items-center gap-2 text-ivory/70 hover:text-gold transition-colors duration-200 text-sm mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            @carlogaid
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-ivory/40 font-sans tracking-wide">
          © {new Date().getFullYear()} CARLOGAID. All rights reserved.
        </p>
        <p className="text-xs text-ivory/40 font-sans">
          Crafted with care for life&apos;s finest moments.
        </p>
      </div>
    </footer>
  );
}
