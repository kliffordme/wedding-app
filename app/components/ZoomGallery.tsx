"use client";

import { useRef, useLayoutEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

// 7 photos fill the non-video cells; item 3 (col-2 rows 2-3) is the video
const photos = [
  { src: "/wedding-portrait.jpg",   alt: "Bride and groom portrait at golden hour" },           // item 1
  { src: "/wedding-coverage.jpg",   alt: "Couple exchanging vows at the ceremony" },            // item 2
  //  item 3 = video (inline below)
  { src: "/wedding-reception.jpg",  alt: "Guests celebrating at the reception" },               // item 4
  { src: "/wedding-details.jpg",    alt: "Wedding rings and floral details" },                  // item 5
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&auto=format&q=80", alt: "Outdoor wedding ceremony aisle" },  // item 6
  //  item 7 = video (inline below)
  { src: "/wedding-memory.jpg", alt: "An intimate wedding memory moment" },                     // item 8
];

export default function ZoomGallery() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const flipCtxRef = useRef<gsap.Context | null>(null);

  const createTween = useCallback(() => {
    const galleryEl = galleryRef.current;
    const wrapEl    = wrapRef.current;
    if (!galleryEl || !wrapEl) return;

    flipCtxRef.current?.revert();
    galleryEl.classList.remove("zoom-gallery--final");

    flipCtxRef.current = gsap.context(() => {
      // Capture where each item lands in the final (expanded) layout
      galleryEl.classList.add("zoom-gallery--final");
      const flipState = Flip.getState(galleryEl.querySelectorAll(".zoom-gallery__item"));
      galleryEl.classList.remove("zoom-gallery--final");

      const flip = Flip.to(flipState, {
        simple: true,
        ease: "expoScale(0.5, 2)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapEl,
          start: "top top",
          end: "+=350%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.add(flip);
      // Text fades in once the video cell has nearly filled the screen
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.75
      );

      return () => gsap.set(galleryEl.querySelectorAll(".zoom-gallery__item"), { clearProps: "all" });
    });
  }, []);

  useLayoutEffect(() => {
    createTween();
    window.addEventListener("resize", createTween);
    return () => {
      window.removeEventListener("resize", createTween);
      flipCtxRef.current?.revert();
    };
  }, [createTween]);

  return (
    <div ref={wrapRef} className="zoom-gallery-wrap">
      <div ref={galleryRef} className="zoom-gallery zoom-gallery--bento">

        {/* Item 1 — col 1, rows 1-2 */}
        <div className="zoom-gallery__item">
          <Image
            src={photos[0].src}
            alt={photos[0].alt} fill className="object-cover" sizes="33vw"
          />
        </div>

        {/* Item 2 — col 2, row 1 */}
        <div className="zoom-gallery__item">
          <Image
            src={photos[1].src}
            alt={photos[1].alt} fill className="object-cover" sizes="33vw"
          />
        </div>

        {/* Item 3 — VIDEO — col 2, rows 2-3 — expands to full viewport */}
        <div className="zoom-gallery__item">
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/wedding-unwrap.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        </div>

        {/* Item 4 — col 3, rows 1-2 */}
        <div className="zoom-gallery__item">
          <Image
            src={photos[2].src}
            alt={photos[2].alt} fill className="object-cover" sizes="33vw"
          />
        </div>

        {/* Item 5 — col 1, row 3 */}
        <div className="zoom-gallery__item">
          <Image
            src={photos[3].src}
            alt={photos[3].alt} fill className="object-cover" sizes="33vw"
          />
        </div>

        {/* Item 6 — col 3, rows 3-4 */}
        <div className="zoom-gallery__item">
          <Image
            src={photos[4].src}
            alt={photos[4].alt} fill className="object-cover" sizes="33vw"
          />
        </div>

        {/* Item 7 — col 1, row 4 — video */}
        <div className="zoom-gallery__item">
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/wedding-close-up.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Item 8 — col 2, row 4 */}
        <div className="zoom-gallery__item">
          <Image
            src={photos[5].src}
            alt={photos[5].alt} fill className="object-cover" sizes="33vw"
          />
        </div>

      </div>

      {/* Text overlay — appears as the video cell expands to fill the screen */}
      <div
        ref={textRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-16 text-center px-6 pointer-events-none opacity-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-3">
          Captured Forever
        </p>
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light">
          The Moments
        </h2>
        <div className="w-12 h-px bg-gold mx-auto mt-5" />
        <p className="font-sans text-white/70 text-sm mt-4 max-w-md leading-relaxed">
          Every glance, every laugh, every quiet breath between vows —
          preserved in images you will treasure for a lifetime.
        </p>
      </div>
    </div>
  );
}
