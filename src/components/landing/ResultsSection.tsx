import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RESULTS = [
  { id: "1", src: "/IMG_1167.PNG", alt: "Result 1" },
  { id: "2", src: "/IMG_1168.PNG", alt: "Result 2" },
  { id: "3", src: "/IMG_1170.PNG", alt: "Result 3" },
  { id: "4", src: "/IMG_1171.PNG", alt: "Result 4" },
  { id: "5", src: "/IMG_1172.PNG", alt: "Result 5" },
  { id: "6", src: "/IMG_1173.PNG", alt: "Result 6" },
];

const AUTOPLAY_MS = 3500;

export default function ResultsSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % RESULTS.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + RESULTS.length) % RESULTS.length), []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const slide = RESULTS[current];

  return (
    <section
      id="results"
      className="py-20 lg:py-28 bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr,1fr] gap-10 lg:gap-14 items-center">
          <div className="w-full max-w-2xl lg:max-w-none order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border bg-card aspect-[4/3] min-h-[320px] sm:min-h-[380px] max-h-[75vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-md hover:bg-muted transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-md hover:bg-muted transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {RESULTS.map((_, i) => (
              <button
                key={RESULTS[i].id}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {current + 1} / {RESULTS.length}
          </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-left order-1 lg:order-2"
          >
            <p className="text-base font-sans font-semibold tracking-widest uppercase text-primary mb-4">
              Results
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Before & After
            </h2>
            <p className="text-muted-foreground mt-4 text-lg md:text-xl max-w-md leading-relaxed">
              Real outcomes from our treatments. Swipe or use the arrows to explore.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
