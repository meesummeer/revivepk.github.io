import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESULT_GALLERY, GALLERY_AUTOPLAY_MS } from "@/data/resultGallery";
const HERO_BG = "/herobg.png";
const WHATSAPP_URL = "https://wa.me/923030008483";

const HeroSection = () => {
  const navigate = useNavigate();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % RESULT_GALLERY.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + RESULT_GALLERY.length) % RESULT_GALLERY.length);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const timer = setInterval(next, GALLERY_AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, next, reduceMotion]);

  const slide = RESULT_GALLERY[current];

  return (
    <section
      className="relative min-h-[100svh] flex items-start overflow-hidden"
      style={{ scrollSnapAlign: "start", scrollMarginTop: "72px" }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden
      />
      {/* Dark overlay so white text reads clearly on the photo */}
      <div
        className="absolute inset-0 z-[1] bg-black/55 pointer-events-none"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto w-full px-4 pt-24 pb-10 sm:pt-28 sm:pb-10 lg:px-8 lg:pb-14 lg:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,minmax(360px,1fr)] gap-6 lg:gap-10 items-start">
          <div className="max-w-2xl mx-auto lg:mx-0 lg:self-center lg:pl-4 -mt-3 sm:-mt-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="tracking-tight leading-[1.2] text-white mb-5"
            >
              <span className="block font-sans font-semibold text-3xl sm:text-4xl md:text-4xl lg:text-[2.75rem]">
                Results that look natural.
              </span>
              <span className="block font-serif text-xl sm:text-2xl md:text-2xl lg:text-[2.15rem] font-light italic text-white/95">
                Precision you can trust.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-7 max-w-lg"
            >
              Pakistan's new standard in aesthetic excellence.{" "}
              <span className="whitespace-nowrap">Our results speak for themselves.</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 text-sm">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Book Your Consultation
                </a>
              </Button>
              <Button
                onClick={() => navigate("/treatments")}
                variant="outline"
                size="lg"
                className="rounded-full px-6 text-sm border-white/50 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              >
                Explore Treatments
              </Button>
            </motion.div>
          </div>
          <div
            id="results"
            className="w-full max-w-xl mx-auto lg:mx-0 lg:self-start"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border bg-card aspect-[4/3] min-h-[260px] sm:min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img src={slide.src} alt={slide.alt} className="w-full h-full object-contain" />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-md hover:bg-muted transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-md hover:bg-muted transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {RESULT_GALLERY.map((_, i) => (
                <button
                  key={RESULT_GALLERY[i].id}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
