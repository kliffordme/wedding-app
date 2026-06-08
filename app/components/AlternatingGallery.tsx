"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    src: "/wedding-coverage.jpg",
    alt: "Couple exchanging vows during an outdoor ceremony",
    tag: "The Big Day",
    name: "Ceremony Coverage",
    description:
      "The vows, the tears, the first kiss — every unrepeatable second of your ceremony captured with care. We work quietly and unobtrusively so your guests never notice we're there, but the images last forever.",
    features: ["Full ceremony documentation", "Candid emotional moments", "Bridal party & family formals", "Multiple angles & lighting"],
  },
  {
    src: "/wedding-portrait.jpg",
    alt: "Couple sharing a quiet moment during golden hour portraits",
    tag: "Golden Hour",
    name: "Couple Portraits",
    description:
      "We set aside time during the golden hour to create intimate portraits that are entirely yours. No stiff poses — just you, your partner, and the warmth of the fading light. These become your most treasured images.",
    features: ["Golden hour session", "Natural, unposed direction", "Scenic location scouting", "Pre-wedding engagement option"],
  },
  {
    src: "/wedding-details.jpg",
    alt: "Close-up of wedding rings, florals and table details",
    tag: "The Details",
    name: "Details & Styling",
    description:
      "The dress hanging in the window. The rings on the bouquet. The handwritten place cards. We photograph the details you spent months choosing — preserving the full picture of the day you designed.",
    features: ["Rings, florals & stationery", "Getting-ready coverage", "Venue & styling details", "Flat lay compositions"],
  },
  {
    src: "/wedding-reception.jpg",
    alt: "Guests dancing and laughing at an evening wedding reception",
    tag: "Celebration",
    name: "Reception & Dancing",
    description:
      "The speeches that made everyone cry. The first dance. The moment the dance floor ignited at midnight. We stay for the whole story — because the best candid moments often happen when the night is young.",
    features: ["Full reception coverage", "First dance & speeches", "Candid guest moments", "Low-light & dance floor photography"],
  },
];

export default function AlternatingGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          el,
          { x: isLeft ? -150 : 150, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 40%",
              scrub: 1.2,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-8 lg:px-16 bg-ivory overflow-hidden" ref={containerRef}>
      {/* Section header */}
      <div className="max-w-2xl mx-auto text-center mb-24">
        <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-3">
          What We Do
        </p>
        <h2 className="font-serif text-5xl md:text-6xl text-forest font-light">
          Every Part of Your Day
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mt-6" />
        <p className="font-sans text-base text-forest/60 mt-6 leading-relaxed">
          From the quiet first moments of the morning to the last song of the
          night — we cover it all, beautifully.
        </p>
      </div>

      {/* Alternating service rows */}
      <div className="space-y-32">
        {services.map((service, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={service.name}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className={`flex flex-col md:flex-row items-stretch gap-12 md:gap-16 ${
                isLeft ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-3/5 relative h-[60vw] md:h-[70vh] overflow-hidden group">
                <Image
                  src={service.src}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-2/5 flex flex-col justify-center space-y-6">
                <span className="inline-block text-xs tracking-[0.25em] text-gold uppercase font-sans border border-gold px-3 py-1 self-start">
                  {service.tag}
                </span>
                <h3 className="font-serif text-4xl md:text-5xl text-forest leading-snug font-light">
                  {service.name}
                </h3>
                <div className="w-10 h-px bg-gold" />
                <p className="font-sans text-base text-forest/70 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 pt-1">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 font-sans text-base text-forest/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
