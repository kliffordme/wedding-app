"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: "Essentials",
    tagline: "Intimate & Focused",
    price: "From $2,800",
    description:
      "Perfect for elopements and intimate celebrations. A focused half-day of coverage capturing your most important moments.",
    features: [
      "6 hours of coverage",
      "1 lead photographer",
      "Online gallery (300+ images)",
      "Ceremony & portraits",
      "14-day delivery",
      "Print release included",
    ],
    highlight: false,
  },
  {
    name: "Signature",
    tagline: "Our Signature Package",
    price: "From $5,500",
    description:
      "The complete CARLOGAID experience — full-day documentary coverage for couples who want every chapter of their story told.",
    features: [
      "Full day coverage (10+ hrs)",
      "2 photographers",
      "Online gallery (600+ images)",
      "Getting ready to last dance",
      "Premium hardcover album",
      "Engagement session included",
      "7-day priority delivery",
      "Dedicated planning support",
    ],
    highlight: true,
  },
  {
    name: "Legacy",
    tagline: "Complete & Timeless",
    price: "From $8,500",
    description:
      "Everything in CARLOGAID, plus fine-art prints, a second album, and a cinematic highlight film to relive your day forever.",
    features: [
      "Full day coverage (12+ hrs)",
      "2 photographers + videographer",
      "Online gallery (800+ images)",
      "Two premium albums",
      "Cinematic highlight film",
      "Fine-art wall print set",
      "Engagement + bridal session",
      "Worldwide travel available",
    ],
    highlight: false,
  },
];

export default function PricingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-6 bg-ivory" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className={`relative flex flex-col p-8 lg:p-10 ${
                pkg.highlight
                  ? "bg-forest text-ivory shadow-2xl scale-[1.02] md:scale-105 z-10"
                  : "bg-ivory-dark text-forest border border-forest/10"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gold text-forest text-xs font-sans tracking-[0.2em] uppercase px-4 py-1">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-2 mb-6">
                <p className="text-xs tracking-[0.3em] uppercase font-sans text-gold">
                  {pkg.tagline}
                </p>
                <h3 className="font-serif text-3xl font-light">{pkg.name}</h3>
              </div>

              <p
                className={`font-sans text-sm leading-relaxed mb-6 ${
                  pkg.highlight ? "text-ivory/70" : "text-forest/60"
                }`}
              >
                {pkg.description}
              </p>

              <div
                className={`text-2xl font-serif mb-8 ${
                  pkg.highlight ? "text-gold" : "text-forest"
                }`}
              >
                {pkg.price}
              </div>

              <ul className="space-y-3 flex-1 mb-10">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-gold"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="2,8 6,12 14,4" />
                    </svg>
                    <span
                      className={`font-sans text-sm ${
                        pkg.highlight ? "text-ivory/80" : "text-forest/70"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`text-center py-3 text-sm tracking-[0.2em] uppercase font-sans border transition-all duration-300 ${
                  pkg.highlight
                    ? "border-gold text-gold hover:bg-gold hover:text-forest"
                    : "border-forest text-forest hover:bg-forest hover:text-ivory"
                }`}
              >
                Enquire Now
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-xs text-forest/50 mt-12 tracking-wide">
          All packages are fully customisable. Travel fees may apply for
          destinations outside the Philippines.{" "}
          <Link href="/contact" className="text-gold hover:underline">
            Contact us
          </Link>{" "}
          for a personalised quote.
        </p>
      </div>
    </section>
  );
}
