const testimonials = [
  {
    quote:
      "Lumière Estate gave us a wedding day beyond anything we could have imagined. Every corner of the property felt like a painting.",
    couple: "Isabelle & James",
    date: "Spring 2024",
  },
  {
    quote:
      "The team's attention to detail was extraordinary. Our guests are still talking about the gardens at sunset.",
    couple: "Sophie & Marc",
    date: "Autumn 2023",
  },
  {
    quote:
      "We've attended many weddings, but nothing compares to the magic of Lumière. It was pure, cinematic romance.",
    couple: "Clara & Thomas",
    date: "Summer 2024",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-ivory-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-3">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest font-light">
            Words from Our Couples
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map(({ quote, couple, date }) => (
            <div key={couple} className="flex flex-col items-center text-center space-y-6 px-4">
              {/* Large quote mark */}
              <span className="font-serif text-6xl text-gold/40 leading-none select-none">
                &ldquo;
              </span>
              <p className="font-serif text-lg md:text-xl text-forest/80 italic leading-relaxed">
                {quote}
              </p>
              <div className="w-8 h-px bg-gold" />
              <div>
                <p className="font-sans text-sm tracking-widest uppercase text-forest font-medium">
                  {couple}
                </p>
                <p className="font-sans text-xs text-forest/50 tracking-wide mt-1">
                  {date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
