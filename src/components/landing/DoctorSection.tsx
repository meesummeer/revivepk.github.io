import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Award, Globe, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const badges = [
  { icon: Globe, label: "International Speaker" },
  { icon: Award, label: "Board Director" },
  { icon: GraduationCap, label: "Aesthetic Specialist" },
];

const STEP_RANGES: [number, number][] = [
  [0, 0.18],      // 1 – Identity
  [0.18, 0.36],   // 2 – Credentials
  [0.36, 0.54],   // 3 – Philosophy
  [0.54, 0.72],   // 4 – Specializations
  [0.72, 0.88],   // 5 – Trust
  [0.88, 1],      // 6 – CTA
];

function getStepOpacity(progress: number, start: number, end: number): number {
  const range = end - start;
  const fadeInEnd = start + range * 0.2;
  const fadeOutStart = end - range * 0.2;
  if (progress <= start || progress >= end) return 0;
  if (progress <= fadeInEnd) return (progress - start) / (fadeInEnd - start);
  if (progress >= fadeOutStart) return (end - progress) / (end - fadeOutStart);
  return 1;
}

function getStepY(progress: number, start: number, end: number): number {
  const range = end - start;
  const fadeInEnd = start + range * 0.2;
  const fadeOutStart = end - range * 0.2;
  if (progress < fadeInEnd) return 12 * (1 - (progress - start) / (fadeInEnd - start));
  if (progress > fadeOutStart) return 12 * (progress - fadeOutStart) / (end - fadeOutStart);
  return 0;
}

export default function DoctorSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [tallHeight, setTallHeight] = useState("400vh");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const updateHeight = () => setTallHeight(window.innerWidth < 768 ? "300vh" : "400vh");
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const updateProgress = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top > 0) {
      setProgress(0);
      return;
    }
    if (rect.bottom < vh) {
      setProgress(1);
      return;
    }
    const scrollRange = rect.height - vh;
    if (scrollRange <= 0) {
      setProgress(1);
      return;
    }
    const p = -rect.top / scrollRange;
    setProgress(Math.max(0, Math.min(1, p)));
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [reduceMotion, updateProgress]);

  if (reduceMotion) {
    return (
      <section id="doctor" className="py-20 lg:py-28 bg-primary/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative flex justify-center lg:block"
            >
              <div className="aspect-[3/4] w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] max-h-[55vh] rounded-2xl bg-cream overflow-hidden flex items-end justify-center">
                <img
                  src="/dr-husnain.jpeg"
                  alt="Dr. Husnain Shah"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gold/20 blur-2xl pointer-events-none" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="font-rounded"
            >
              <p className="text-sm lg:text-base font-semibold tracking-[0.2em] uppercase text-primary mb-4 opacity-90">
                Meet the Doctor 👋
              </p>
              <h2 className="font-rounded text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 tracking-tight leading-[1.1]">
                Dr. Husnain Shah
              </h2>
              <p className="text-muted-foreground text-lg lg:text-xl font-medium tracking-wide mb-8">
                Aesthetic Medicine Specialist ✨
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {badges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 bg-primary/10 text-foreground rounded-full px-5 py-2.5 text-base font-semibold border border-primary/20"
                  >
                    <badge.icon className="h-5 w-5 text-primary" />
                    {badge.label}
                  </span>
                ))}
              </div>
              <p className="text-foreground/90 text-lg lg:text-xl leading-relaxed mb-6">
                <span className="font-semibold text-foreground">Over 15 years</span> of experience in aesthetic medicine. Director of the International Education Board of
                Aesthetics, Dr. Husnain Shah leads training programs across three continents. 🌍
              </p>
              <blockquote className="border-l-4 border-primary pl-8 pr-4 py-2 text-foreground leading-relaxed mb-8 text-xl lg:text-2xl italic">
                <span className="text-primary font-semibold not-italic">&ldquo;My philosophy is simple:</span> enhance your natural beauty with precision,
                safety, and artistry. Every treatment plan is as unique as the individual. ✨&rdquo;
              </blockquote>
              <p className="text-base font-semibold tracking-[0.15em] uppercase text-primary mb-3 opacity-90">
                Key focus 🎯
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex rounded-full bg-primary/10 text-foreground px-4 py-2 text-sm font-semibold border border-primary/20">Evidence-based practice 🔬</span>
                <span className="inline-flex rounded-full bg-primary/10 text-foreground px-4 py-2 text-sm font-semibold border border-primary/20">Bespoke plans ✨</span>
                <span className="inline-flex rounded-full bg-primary/10 text-foreground px-4 py-2 text-sm font-semibold border border-primary/20">International standards 🌍</span>
                <span className="inline-flex rounded-full bg-primary/10 text-foreground px-4 py-2 text-sm font-semibold border border-primary/20">Safety & artistry ❤️</span>
              </div>
              <p className="text-base font-semibold tracking-[0.15em] uppercase text-primary mb-3 opacity-90">
                Global footprint 🌍
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="inline-flex rounded-full bg-primary/10 text-foreground px-4 py-2 text-sm font-semibold border border-primary/20">Trusted worldwide 🌍</span>
                <span className="inline-flex rounded-full bg-primary/10 text-foreground px-4 py-2 text-sm font-semibold border border-primary/20">Three continents 🗺️</span>
                <span className="inline-flex rounded-full bg-primary/10 text-foreground px-4 py-2 text-sm font-semibold border border-primary/20">Training programs 📚</span>
              </div>
              <Button
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-6 text-lg font-semibold shadow-lg shadow-primary/20"
              >
                Book a consultation with Dr. Husnain Shah 📅
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      id="doctor"
      ref={wrapperRef}
      className="relative bg-primary/10"
      style={{ minHeight: tallHeight }}
    >
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center py-12 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Portrait + progress bar – same width */}
          <div className="shrink-0 w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] flex flex-col items-center lg:items-start">
            <motion.div
              className="relative flex justify-center lg:block w-full"
              style={{
                scale: 0.92 + progress * 0.16,
                y: progress * 12,
              }}
            >
              <div className="aspect-[3/4] w-full max-h-[55vh] rounded-2xl bg-cream overflow-hidden flex items-end justify-center">
                <img
                  src="/dr-husnain.jpeg"
                  alt="Dr. Husnain Shah"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gold/20 blur-2xl pointer-events-none" />
            </motion.div>
            {/* Progress indicator – under portrait, same width as photo */}
            <div className="w-full mt-4">
              <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full origin-left transition-transform duration-75 ease-out"
                  style={{ transform: `scaleX(${progress})`, width: "100%" }}
                />
              </div>
            </div>
          </div>

          {/* Step content – transparent, text floats freely */}
          <div className="relative flex-1 min-w-0 min-h-[280px] flex flex-col justify-center font-rounded">
            {STEP_RANGES.map(([start, end], i) => {
              const opacity = getStepOpacity(progress, start, end);
              const y = getStepY(progress, start, end);
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    opacity,
                    y,
                    pointerEvents: opacity > 0.5 ? "auto" : "none",
                    visibility: opacity < 0.01 ? "hidden" : "visible",
                  }}
                >
                  {i === 0 && (
                    <>
                      <p className="text-sm lg:text-base font-semibold tracking-[0.2em] uppercase text-primary mb-4 opacity-90">
                        Meet the Doctor 👋
                      </p>
                      <h2 className="font-rounded text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 tracking-tight leading-[1.1]">
                        Dr. Husnain Shah
                      </h2>
                      <p className="text-muted-foreground text-lg lg:text-xl font-medium tracking-wide">
                        Aesthetic Medicine Specialist ✨
                      </p>
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {badges.map((badge) => (
                          <span
                            key={badge.label}
                            className="inline-flex items-center gap-2 bg-primary/10 text-foreground rounded-full px-5 py-2.5 text-base font-semibold border border-primary/20"
                          >
                            <badge.icon className="h-5 w-5 text-primary" />
                            {badge.label}
                          </span>
                        ))}
                      </div>
                      <p className="text-foreground/90 text-lg lg:text-xl leading-relaxed max-w-xl">
                        <span className="font-semibold text-foreground">Over 15 years</span> in aesthetic medicine. Director of the International Education Board of
                        Aesthetics, leading training programs across three continents. 🌍
                      </p>
                    </>
                  )}
                  {i === 2 && (
                    <blockquote className="border-l-4 border-primary pl-8 pr-4 py-2 text-foreground leading-relaxed text-xl lg:text-2xl italic max-w-xl">
                      <span className="text-primary font-semibold not-italic">&ldquo;My philosophy is simple:</span> enhance your natural beauty with precision,
                      safety, and artistry. Every treatment plan is as unique as the individual. ✨&rdquo;
                    </blockquote>
                  )}
                  {i === 3 && (
                    <>
                      <p className="text-base font-semibold tracking-[0.15em] uppercase text-primary mb-4 opacity-90">
                        Key focus 🎯
                      </p>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-foreground px-5 py-2.5 text-base font-semibold border border-primary/20">
                          Evidence-based practice 🔬
                        </span>
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-foreground px-5 py-2.5 text-base font-semibold border border-primary/20">
                          Bespoke treatment plans ✨
                        </span>
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-foreground px-5 py-2.5 text-base font-semibold border border-primary/20">
                          International standards 🌍
                        </span>
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-foreground px-5 py-2.5 text-base font-semibold border border-primary/20">
                          Safety & artistry ❤️
                        </span>
                      </div>
                      <p className="text-foreground/90 text-lg leading-relaxed max-w-xl">
                        Every consultation is tailored with precision and care. ❤️
                      </p>
                    </>
                  )}
                  {i === 4 && (
                    <>
                      <p className="text-base font-semibold tracking-[0.15em] uppercase text-primary mb-4 opacity-90">
                        Global footprint 🌍
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-foreground px-5 py-2.5 text-base font-semibold border border-primary/20">
                          Trusted worldwide 🌍
                        </span>
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-foreground px-5 py-2.5 text-base font-semibold border border-primary/20">
                          Three continents 🗺️
                        </span>
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-foreground px-5 py-2.5 text-base font-semibold border border-primary/20">
                          Training programs 📚
                        </span>
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-foreground px-5 py-2.5 text-base font-semibold border border-primary/20">
                          Patients & professionals 👥
                        </span>
                      </div>
                    </>
                  )}
                  {i === 5 && (
                    <div className="pt-2">
                      <Button
                        onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-6 text-lg font-semibold shadow-lg shadow-primary/20"
                      >
                        Book a consultation with Dr. Husnain Shah 📅
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
