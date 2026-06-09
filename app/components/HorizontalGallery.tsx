"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { src: "/wedding-coverage.jpg", alt: "Wedding Coverage" },
  { src: "/wedding-portrait.jpg", alt: "Wedding Portrait" },
  { src: "/wedding-details.jpg", alt: "Wedding Details" },
  { src: "/wedding-reception.jpg", alt: "Wedding Reception" },
  { src: "/wedding-memory.jpg", alt: "Wedding Memory" },
  { src: "/wedding-promise.jpg", alt: "Wedding Promise" },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    // Skip GSAP pin on mobile — native touch scroll takes over
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${strip.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ivory overflow-hidden">
      {/* Label */}
      <div className="pt-12 pb-2 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans">Selected Works</p>
        <div className="w-8 h-px bg-gold mx-auto mt-3" />
      </div>

      {/* Strip
          Desktop: GSAP takes over (overflow-hidden, no wrap, will-change)
          Mobile:  overflow-x scroll, snap, no GSAP */}
      <div
        ref={stripRef}
        className="
          flex flex-nowrap will-change-transform
          pt-6 pb-12
          md:overflow-visible overflow-x-auto
          scroll-smooth snap-x snap-mandatory
          [-webkit-overflow-scrolling:touch]
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        "
      >
        {IMAGES.map(({ src, alt }) => (
          <div
            key={src}
            className="flex-shrink-0 snap-start w-[78vw] md:w-[38vw] lg:w-[30vw] px-3 md:px-5 box-content"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                sizes="(max-width: 768px) 78vw, (max-width: 1024px) 38vw, 30vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
