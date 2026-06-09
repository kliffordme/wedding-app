"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Bride portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Couple at ceremony",
  },
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Wedding vows",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "First dance",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Bridal party",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Wedding details",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Reception",
  },
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
          flex flex-nowrap
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
                sizes="(max-width: 768px) 78vw, (max-width: 1024px) 38vw, 32vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
