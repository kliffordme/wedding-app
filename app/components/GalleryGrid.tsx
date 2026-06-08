"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { seed: "gal-1", alt: "Bride laughing with bridesmaids during preparations", tall: true },
  { seed: "gal-2", alt: "Groom seeing his bride for the first time", tall: false },
  { seed: "gal-3", alt: "Couple's intimate first look before the ceremony", tall: false },
  { seed: "gal-4", alt: "Aerial view of an outdoor wedding ceremony", tall: true },
  { seed: "gal-5", alt: "Exchange of vows under soft natural light", tall: false },
  { seed: "gal-6", alt: "Close-up of wedding rings on the bridal bouquet", tall: false },
  { seed: "gal-7", alt: "Guests dancing and celebrating at the reception", tall: true },
  { seed: "gal-8", alt: "Wedding cake adorned with fresh garden flowers", tall: false },
  { seed: "gal-9", alt: "Couple walking hand in hand at golden hour", tall: false },
  { seed: "gal-10", alt: "Reception table details with candles and florals", tall: false },
  { seed: "gal-11", alt: "Bride's portrait in soft window light", tall: true },
  { seed: "gal-12", alt: "Couple sharing their first dance", tall: false },
];

export default function GalleryGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 px-6 bg-ivory" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        {/* Masonry-style grid using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <div
              key={img.seed}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="break-inside-avoid overflow-hidden group cursor-pointer"
            >
              <div
                className={`relative w-full overflow-hidden ${
                  img.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={`https://picsum.photos/seed/${img.seed}/${img.tall ? "600/800" : "800/600"}`}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="font-serif text-2xl text-forest/60 italic mb-6">
            Ready to have your story told?
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 border border-gold text-gold font-sans text-sm tracking-[0.25em] uppercase hover:bg-gold hover:text-forest transition-all duration-300"
          >
            Book a Session
          </a>
        </div>
      </div>
    </section>
  );
}
