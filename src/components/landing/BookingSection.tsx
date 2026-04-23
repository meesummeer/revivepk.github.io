import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_HREF = "https://wa.me/923030008483";

const BookingSection = () => {
  return (
    <section id="booking" className="relative py-20 lg:py-28 bg-background overflow-hidden">
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
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              asChild
              className="h-12 min-w-[11rem] rounded-full bg-primary px-8 text-base font-semibold font-rounded text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                <Phone className="h-5 w-5 shrink-0" aria-hidden />
                Book Now
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 min-w-[11rem] rounded-full border-2 border-[#25D366] bg-[#25D366] px-8 text-base font-semibold font-rounded text-white shadow-md hover:bg-[#20bd5a] hover:text-white hover:border-[#20bd5a] focus-visible:ring-[#25D366]"
            >
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
