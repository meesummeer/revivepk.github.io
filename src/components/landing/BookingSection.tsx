import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const WHATSAPP_HREF = "https://wa.me/923030008483";
const BRAND_LOGOS = [
  { src: "/logos/allergan_logo.jpg", alt: "Allergan" },
  { src: "/logos/lanluma_logo.jpeg", alt: "Lanluma" },
  { src: "/logos/maili_logo.jpeg", alt: "Maili" },
  { src: "/logos/sculptra_logo.jpeg", alt: "Sculptra" },
  { src: "/logos/xeomin_logo.jpeg", alt: "Xeomin" },
  { src: "/logos/neauvia_logo.jpeg", alt: "Neauvia" },
  { src: "/logos/pluryal_logo.jpeg", alt: "Pluryal" },
  { src: "/logos/ellanse_logo.jpeg", alt: "Ellanse" },
];

const BookingSection = () => {
  return (
    <section id="booking" className="relative scroll-mt-20 py-20 lg:py-28 bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-rounded text-3xl sm:text-4xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground tracking-tight leading-[1.2] mb-4">
              You&rsquo;ve seen the results our clients are getting.
              <span className="block mt-1">Now let&rsquo;s find what works for you.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Whether it&rsquo;s a small concern or a complete skin plan, our team will guide you honestly &mdash; with
              treatments that actually suit your skin.
              <span className="block mt-2">Message us on WhatsApp and we&rsquo;ll help you get started.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex justify-center"
          >
            <Button
              asChild
              className="h-12 min-w-[11rem] rounded-full border-2 border-[#25D366] bg-[#25D366] px-8 text-base font-semibold font-rounded text-white shadow-md hover:bg-[#20bd5a] hover:border-[#20bd5a] hover:text-white focus-visible:ring-[#25D366]"
            >
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.123 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Get in touch!
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-10 max-w-4xl mx-auto text-center"
        >
          <p className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted International Brands
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
            {BRAND_LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="w-full max-w-[11rem] rounded-2xl bg-white shadow-md p-4 flex items-center justify-center"
              >
                <img src={logo.src} alt={logo.alt} className="h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
