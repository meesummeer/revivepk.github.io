import { useState, useEffect } from "react";
import { getServicePanels, type ServicePanel, type ServiceEntry } from "@/data/servicesContent";
import { Button } from "@/components/ui/button";

/** Fixed card size used on all slides for consistency. */
const SERVICE_CARD_SIZE = "w-[12rem] sm:w-[13rem]";

/** Circular service card: gold ring, icon, title, description. Fixed size, overflow hidden. */
function ServiceCard({ service }: { service: ServiceEntry }) {
  const Icon = service.icon;
  return (
    <article className="w-full aspect-square rounded-full flex flex-col items-center justify-center text-center p-5 sm:p-6 border-2 border-gold/40 bg-white/90 shadow-md shadow-gold/10 min-w-0 overflow-hidden">
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gold/10 text-gold mb-2.5 sm:mb-3">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
      </div>
      <h4 className="font-rounded text-sm sm:text-base font-bold text-foreground mb-1 sm:mb-1.5 leading-tight line-clamp-2">{service.title}</h4>
      <p className="text-[0.75rem] sm:text-xs font-semibold text-foreground/90 leading-snug line-clamp-2">{service.description}</p>
    </article>
  );
}

/** Center-aligned panel: title, symmetric flex wrap (centered), same card size. */
function PanelContent({ panel }: { panel: ServicePanel }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-10 py-6 lg:py-10 w-full max-w-5xl mx-auto">
      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 sm:mb-8">
        {panel.title}
      </h3>
      <div className="relative flex flex-wrap justify-center gap-4 sm:gap-5 mb-8 w-full max-w-[56rem] mx-auto">
        {panel.services.map((service) => (
          <div key={service.id} className={SERVICE_CARD_SIZE}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
      <Button
        onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-5 text-base font-semibold border-2 border-gold/50 shadow-md shadow-gold/10"
      >
        Book consultation
      </Button>
    </div>
  );
}

function NavPill({
  panel,
  index,
  activeIndex,
  onNavigate,
}: {
  panel: ServicePanel;
  index: number;
  activeIndex: number;
  onNavigate: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(index)}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border-2 ${
        index === activeIndex
          ? "bg-gold text-gold-foreground border-gold shadow-md shadow-gold/20"
          : "bg-white/80 text-foreground border-gold/40 hover:bg-gold/10 hover:border-gold/60"
      }`}
      aria-label={`Go to ${panel.title}`}
      aria-current={index === activeIndex ? "step" : undefined}
    >
      {panel.title}
    </button>
  );
}

const servicePanels = getServicePanels();

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const N = servicePanels.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /** Reduced-motion: vertical stack of all panels */
  if (reduceMotion) {
    return (
      <section id="services" className="py-20 lg:py-28 bg-cream font-rounded">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Treatments & Services</h2>
          </div>
          <div className="space-y-16 lg:space-y-20">
            {servicePanels.map((panel) => (
              <div key={panel.id} className="border-b border-border pb-12 last:border-b-0 last:pb-0">
                <PanelContent panel={panel} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 lg:py-28 bg-cream font-rounded">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Treatments & Services</h2>
        </div>
        <PanelContent panel={servicePanels[activeIndex]} />
        <div className="flex justify-center items-center gap-3 flex-wrap mt-8">
          {servicePanels.map((panel, i) => (
            <NavPill key={panel.id} panel={panel} index={i} activeIndex={activeIndex} onNavigate={setActiveIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
