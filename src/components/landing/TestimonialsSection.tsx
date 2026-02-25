import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Dr. Husnain Shah and the team transformed not just my appearance, but my confidence. The care and attention to detail is second to none.",
    name: "Rebecca Townsend",
    rating: 5,
  },
  {
    quote: "From the moment I walked in, I felt at ease. The results exceeded all expectations — natural, elegant, and exactly what I wanted.",
    name: "James Hargreaves",
    rating: 5,
  },
  {
    quote: "A truly premium experience. The clinic is immaculate, the staff are warm and knowledgeable, and the results speak for themselves.",
    name: "Sophia Laurent",
    rating: 5,
  },
  {
    quote: "I've been to clinics across Europe, and Revive is genuinely world-class. Professional, discreet, and exceptional results every time.",
    name: "David Al-Rashid",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
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

          {/* Testimonial card */}
          <div className="relative lg:sticky lg:top-32">
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border min-h-[260px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="max-h-[40vh] overflow-y-auto pr-2 mb-6">
                    <blockquote className="font-serif text-lg md:text-xl text-foreground leading-relaxed italic whitespace-pre-line">
                      "{t.quote}"
                    </blockquote>
                  </div>
                  <p className="font-sans text-sm font-semibold text-foreground">{t.name}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3 mt-6">
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
