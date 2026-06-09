import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Contact & Booking | CARLOGAID",
  description:
    "Enquire about wedding photography with CARLOGAID. We'll respond within 24 hours to start planning your perfect coverage.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Page hero */}
        <div className="bg-forest py-24 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-3">
            Contact & Booking
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-ivory font-light">
            Let&apos;s Begin Together
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
          <p className="font-sans text-ivory/60 text-sm mt-6 max-w-md mx-auto leading-relaxed">
            Reach out and we will respond within 24 hours to begin planning
            your wedding photography.
          </p>
        </div>

        {/* Form + Info */}
        <section className="py-20 px-6 bg-ivory">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form — wider */}
            <div className="lg:col-span-3">
              <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-2">
                Enquiry Form
              </p>
              <h2 className="font-serif text-3xl text-forest font-light mb-8">
                Tell Us About Your Day
              </h2>
              <ContactForm />
            </div>

            {/* Sidebar info */}
            <aside className="lg:col-span-2 space-y-10">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-4">
                  Find Us
                </p>
                <address className="not-italic font-sans text-sm text-forest/70 space-y-1 leading-relaxed">
                  <p className="font-medium text-forest">CARLOGAID</p>
                  <p>Philippines</p>
                  <p>Available worldwide</p>
                </address>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-4">
                  Contact
                </p>
                <div className="font-sans text-sm text-forest/70 space-y-2">
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
                </div>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-4">
                  Office Hours
                </p>
                <div className="font-sans text-sm text-forest/70 space-y-1">
                  <p>Monday – Friday: 9am – 5pm</p>
                  <p>Saturday: 10am – 3pm</p>
                  <p>Sunday: By appointment</p>
                </div>
              </div>

              {/* Embedded map placeholder */}
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-4">
                  Location
                </p>
                <div className="w-full aspect-[4/3] bg-forest/10 flex items-center justify-center border border-forest/10">
                  <iframe
                    title="CARLOGAID location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.0!2d151.9507!3d-27.5598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMzJzM1LjMiUyAxNTHCsDU3JzAyLjUiRQ!5e0!3m2!1sen!2sau!4v1699999999999"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale opacity-80"
                  />
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
