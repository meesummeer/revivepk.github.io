import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      "I got PRP treatment for my acne at Revive Tariq Road branch, and I had a very good experience. I followed the treatments recommended by Dr. Husnain, and my PRP sessions were done by Dr. Fatima.\nAfter the treatment, I noticed a visible improvement in my skin. My skin feels smoother and has a nice healthy glow now. I am satisfied with the results and overall service.\nHighly recommended for anyone looking for effective acne and skin treatments.",
    name: "Romana",
    rating: 5,
  },
  {
    quote:
      "I had never considered doing any skin treatments before, but when I had visited Revive Dermatology for a while and I was honestly quite impressed by how some of the results looked.",
    name: "Umer Saeed",
    rating: 5,
  },
  {
    quote:
      "I have been visiting Revive – The House of Dermatology since 2022, and I am extremely satisfied with the quality of services provided. Dr. Husnain Shah and his entire team demonstrate exceptional professionalism, always treating patients with genuine care.\n\nI have also recently undergone a few procedures at the clinic, and I am highly satisfied with the results. Dr. Husnain is highly skilled and experienced in dermatological and aesthetic treatments, and he ensures complete patient satisfaction before concluding any procedure. His attention to detail and commitment to achieving the best possible outcomes truly stand out.\n\nThe pricing is reasonable, and the overall experience has consistently been excellent. I highly recommend this clinic to anyone seeking safe, reliable, and professional dermatology and aesthetic services.",
    name: "Shahnaz Nasir",
    rating: 5,
  },
];
const WHATSAPP_URL = "https://wa.me/923030008483";

function measureTextOverflow(quoteBox: HTMLDivElement): boolean {
  const block = quoteBox.querySelector("blockquote");
  if (!block) return false;

  const cs = getComputedStyle(quoteBox);
  const padY = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
  const padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
  const availableH = quoteBox.clientHeight - padY;
  const innerW = quoteBox.clientWidth - padX;

  const clone = block.cloneNode(true) as HTMLElement;
  clone.classList.remove("line-clamp-5");
  clone.setAttribute("style", "position:absolute;left:0;top:0;visibility:hidden;pointer-events:none;white-space:pre-line;");

  if (innerW > 0) {
    clone.style.width = `${innerW}px`;
  } else {
    clone.style.width = "100%";
  }

  quoteBox.style.position = "relative";
  quoteBox.appendChild(clone);
  const fullH = clone.getBoundingClientRect().height;
  quoteBox.removeChild(clone);

  return fullH > availableH + 1;
}

const TestimonialsSection = () => {
  const n = testimonials.length;
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const quoteBoxRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n]
  );

  useEffect(() => {
    setExpanded(false);
  }, [index]);

  const t = testimonials[index];

  useLayoutEffect(() => {
    const box = quoteBoxRef.current;
    if (!box) return;

    const run = () => {
      if (!quoteBoxRef.current) return;
      setOverflows(measureTextOverflow(quoteBoxRef.current));
    };

    run();
    const raf = requestAnimationFrame(() => {
      run();
    });

    const ro = new ResizeObserver(() => run());
    ro.observe(box);

    const onFonts = () => run();
    if (document.fonts?.ready) {
      void document.fonts.ready.then(onFonts);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [index, t.quote]);

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-20 -mt-10 py-20 lg:py-24 bg-[#0d9488] text-chrome-foreground overflow-hidden"
      style={{ scrollSnapAlign: "start", scrollMarginTop: "72px" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute bottom-0 -right-12 h-64 w-64 rounded-full bg-gold/8 blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-10"
        >
          <p className="text-sm lg:text-base font-semibold tracking-[0.2em] uppercase text-chrome-foreground/75 mb-3">
            Client experiences
          </p>
          <h2 className="font-rounded text-3xl md:text-4xl lg:text-[2.4rem] font-bold text-chrome-foreground tracking-tight leading-[1.12]">
            Real words from our patients
          </h2>
          <p className="mt-3 text-chrome-foreground/80 text-base md:text-lg font-medium">
            A quick look at what clients share after treatment and follow-up.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto relative px-2 sm:px-10">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute left-0 top-[42%] -translate-y-1/2 z-10 h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-chrome-foreground/25 bg-[#0f766e]-foreground/10 text-chrome-foreground shadow-sm hover:bg-chrome-foreground/20"
            aria-label="Previous review"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-[42%] -translate-y-1/2 z-10 h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-chrome-foreground/25 bg-chrome-foreground/10 text-chrome-foreground shadow-sm hover:bg-chrome-foreground/20"
            aria-label="Next review"
            onClick={() => go(1)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <article
                className="flex flex-col rounded-2xl border border-chrome-foreground/20 bg-chrome-foreground/[0.07] backdrop-blur-sm p-4 sm:p-5 shadow-[0_14px_40px_rgba(0,0,0,0.28)] w-full"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${n}`}
              >
                <div className="flex gap-0.5 mb-2.5 sm:mb-3 shrink-0">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold shrink-0" />
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div
                    ref={quoteBoxRef}
                    className={cn(
                      "relative w-full rounded-md border border-chrome-foreground/20 bg-black/10 px-3 py-2",
                      "h-32 sm:h-36",
                      expanded ? "overflow-y-auto" : "overflow-hidden"
                    )}
                  >
                    <blockquote
                      className={cn(
                        "font-serif text-sm sm:text-base text-chrome-foreground leading-relaxed italic whitespace-pre-line",
                        !expanded && overflows && "line-clamp-5"
                      )}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  {overflows && (
                    <button
                      type="button"
                      onClick={() => setExpanded((e) => !e)}
                      className="self-start text-sm font-sans font-semibold text-gold underline underline-offset-2 decoration-gold/70 hover:decoration-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-chrome rounded shrink-0"
                    >
                      {expanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>

                <p className="font-sans text-sm font-semibold text-chrome-foreground pt-2.5 mt-2.5 border-t border-chrome-foreground/20 shrink-0">
                  {t.name}
                </p>
              </article>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-5 sm:mt-6" role="tablist" aria-label="Testimonial slides">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                i === index ? "w-6 bg-gold" : "w-2 bg-chrome-foreground/35 hover:bg-chrome-foreground/60"
              )}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2.5">
          <Button asChild className="rounded-full bg-gold text-gold-foreground hover:bg-gold/90 px-7 py-2.5 text-sm font-semibold shadow-md">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Start your consultation on WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-9 rounded-full border-chrome-foreground/35 bg-transparent px-5 text-xs font-semibold text-chrome-foreground hover:bg-chrome-foreground/10 hover:text-chrome-foreground"
          >
            <a href="#results">See Before and After Results</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
