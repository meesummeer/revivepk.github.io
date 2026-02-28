import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "I got PRP treatment for my acne at Revive Tariq Road branch, and I had a very good experience. I followed the treatments recommended by Dr. Husnain, and my PRP sessions were done by Dr. Fatima.\nAfter the treatment, I noticed a visible improvement in my skin. My skin feels smoother and has a nice healthy glow now. I am satisfied with the results and overall service.\nHighly recommended for anyone looking for effective acne and skin treatments.",
    name: "Romana",
    rating: 5,
  },
  {
    quote: "I had never considered doing any skin treatments before, but when I had visited Revive Dermatology for a while and I was honestly quite impressed by how some of the results looked.",
    name: "Umer Saeed",
    rating: 5,
  },
  {
    quote: "I have been visiting Revive – The House of Dermatology since 2022, and I am extremely satisfied with the quality of services provided. Dr. Husnain Shah and his entire team demonstrate exceptional professionalism, always treating patients with genuine care.\n\nI have also recently undergone a few procedures at the clinic, and I am highly satisfied with the results. Dr. Husnain is highly skilled and experienced in dermatological and aesthetic treatments, and he ensures complete patient satisfaction before concluding any procedure. His attention to detail and commitment to achieving the best possible outcomes truly stand out.\n\nThe pricing is reasonable, and the overall experience has consistently been excellent. I highly recommend this clinic to anyone seeking safe, reliable, and professional dermatology and aesthetic services.",
    name: "Shahnaz Nasir",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-sans font-semibold tracking-widest uppercase text-primary mb-3">
              Testimonials 💬
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Patients Say 💬
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Real experiences from real patients. Your trust is the foundation of everything we do. ❤️
            </p>
          </motion.div>

          {/* Testimonial card - fixed height so section doesn't resize when switching testimonials */}
          <div className="relative lg:sticky lg:top-32">
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border h-[420px] flex flex-col">
              <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col flex-1 min-h-0"
                  >
                    <div className="flex gap-1 mb-5 shrink-0">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <div className="h-[240px] overflow-y-auto pr-2 shrink-0">
                      <blockquote className="font-serif text-lg md:text-xl text-foreground leading-relaxed italic whitespace-pre-line">
                        "{t.quote}"
                      </blockquote>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="font-sans text-base font-semibold text-foreground pt-4 pb-3 border-t border-border shrink-0">
                {t.name}
              </p>
              <div className="flex items-center justify-end gap-3 shrink-0">
                <button
                  onClick={prev}
                  className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                </button>
                <span className="text-xs text-muted-foreground font-sans">
                  {current + 1} / {testimonials.length}
                </span>
                <button
                  onClick={next}
                  className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
