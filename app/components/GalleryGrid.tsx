"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: "/wedding-portrait.jpg",     alt: "Bride and groom portrait at golden hour",           tall: true  },
  { src: "/wedding-coverage.jpg",     alt: "Couple exchanging vows at the ceremony",             tall: false },
  { src: "/wedding-details.jpg",      alt: "Wedding rings and floral details",                   tall: false },
  { src: "/wedding-memory.jpg",       alt: "An intimate wedding memory moment",                  tall: true  },
  { src: "/wedding-reception.jpg",    alt: "Guests celebrating at the reception",                tall: false },
  { src: "/wedding-promise-bnw.jpg",  alt: "A quiet promise between two people",                 tall: true  },
  { src: "/wedding-coverage.jpg",     alt: "Ceremony aisle with guests in soft light",           tall: true  },
  { src: "/wedding-portrait.jpg",     alt: "Couple sharing a quiet moment together",             tall: false },
  { src: "/wedding-reception.jpg",    alt: "Candlelit reception table details",                  tall: false },
  { src: "/wedding-details.jpg",      alt: "Close-up of wedding florals and stationery",         tall: true  },
  { src: "/wedding-memory.jpg",       alt: "Golden hour portrait of the newlyweds",              tall: false },
  { src: "/wedding-promise-bnw.jpg",  alt: "First dance under soft evening light",               tall: false },
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
              key={i}
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
                  src={img.src}
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
