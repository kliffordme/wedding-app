import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="space-y-6 order-2 md:order-1">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans">
            Our Story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest font-light leading-tight">
            Photography That
            <br />
            Feels Like Memory
          </h2>
          <div className="w-12 h-px bg-gold" />
          <p className="font-sans text-forest/70 leading-relaxed">
            CARLOGAID is a Queensland-based wedding photography studio with a
            passion for honest, documentary storytelling. We believe the most
            beautiful images are the ones that happen — not the ones that are
            posed.
          </p>
          <p className="font-sans text-forest/70 leading-relaxed">
            From the quiet nerves of getting ready to the last song of the
            night, we move through your day as a quiet witness — camera in hand,
            always watching for the moments that matter most.
          </p>
          <p className="font-sans text-forest/70 leading-relaxed">
            Available for weddings across Australia and worldwide. Every couple,
            every story, treated with the same care and artistry.
          </p>
          <Link
            href="/gallery"
            className="inline-block mt-2 text-sm tracking-[0.2em] uppercase font-sans text-gold border-b border-gold pb-1 hover:text-forest hover:border-forest transition-colors duration-200"
          >
            View the Portfolio
          </Link>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2 relative">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/wedding-memory.jpg"
              alt="Photographer capturing a wedding moment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Gold accent box */}
          <div className="absolute -bottom-6 -left-6 w-2/3 h-24 border border-gold -z-10" />
        </div>
      </div>
    </section>
  );
}
