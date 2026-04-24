import { useState, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { getServicePanels, type ServicePanel, type ServiceEntry } from "@/data/servicesContent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const panelsById = Object.fromEntries(getServicePanels().map((panel) => [panel.id, panel]));
const servicePanels: ServicePanel[] = [
  panelsById.augmentation,
  panelsById["face-health"],
  panelsById["hair-health"],
  panelsById.miscellaneous,
].filter(Boolean) as ServicePanel[];
const WHATSAPP_URL = "https://wa.me/923030008483";

function ServiceItem({ service }: { service: ServiceEntry }) {
  const Icon = service.icon;
  return (
    <Link
      to={`/treatments#${service.id}`}
      className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-chrome"
      aria-label={`View details for ${service.title}`}
    >
      <article
        className={cn(
          "group border border-chrome-foreground/20 bg-chrome-foreground/[0.06] p-3.5 sm:p-4 transition-colors",
          "hover:border-gold/45 hover:bg-chrome-foreground/10"
        )}
      >
        <div className="flex gap-3 sm:gap-3.5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/35 bg-gold/10 text-gold"
            aria-hidden
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-rounded text-[0.95rem] sm:text-base font-semibold text-chrome-foreground leading-snug">
              {service.title}
            </h3>
            <p className="mt-1.5 text-sm text-chrome-foreground/80 leading-relaxed">{service.description}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

function CategoryTab({
  id,
  controlsId,
  label,
  isActive,
  onSelect,
}: {
  id: string;
  controlsId: string;
  label: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={isActive}
      aria-controls={controlsId}
      onClick={onSelect}
      className={cn(
        "shrink-0 rounded-none border-b-2 px-3 py-2.5 text-left text-sm sm:px-4 sm:py-3 sm:text-base font-semibold font-rounded transition-colors",
        isActive
          ? "border-gold text-chrome-foreground"
          : "border-transparent text-chrome-foreground/55 hover:text-chrome-foreground/90"
      )}
    >
      {label}
    </button>
  );
}

function ServicePanelView({ panel, showMotion }: { panel: ServicePanel; showMotion: boolean }) {
  const content = (
    <div className="w-full max-w-5xl mx-auto">
      <p className="text-xs sm:text-sm font-medium text-chrome-foreground/60 mb-4 sm:mb-5">
        {panel.services.length} treatment{panel.services.length === 1 ? "" : "s"} in this category
      </p>
      <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {panel.services.map((s) => (
          <ServiceItem key={s.id} service={s} />
        ))}
      </div>
    </div>
  );

  if (!showMotion) {
    return <div className="w-full">{content}</div>;
  }

  return (
    <motion.div
      key={panel.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full"
    >
      {content}
    </motion.div>
  );
}

function ServicesInteractive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const tablistId = `${baseId}-tabs`;
  const panelId = `${baseId}-panel`;
  const panel = servicePanels[activeIndex];

  return (
    <div>
      <nav
        className="mb-6 sm:mb-8 border-b border-chrome-foreground/15 -mx-4 px-2 sm:mx-0 sm:px-0"
        role="tablist"
        id={tablistId}
        aria-label="Service categories"
      >
        <div className="flex w-full min-w-0 flex-wrap sm:flex-nowrap sm:justify-center gap-x-0 gap-y-0 overflow-x-auto sm:overflow-visible pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:[-ms-overflow-style:auto] sm:[scrollbar-width:auto]">
          {servicePanels.map((p, i) => (
            <CategoryTab
              key={p.id}
              id={`${baseId}-tab-${p.id}`}
              controlsId={panelId}
              label={p.title}
              isActive={i === activeIndex}
              onSelect={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </nav>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${baseId}-tab-${panel.id}`}
      >
        <ServicePanelView panel={panel} showMotion={!reduceMotion} />
      </div>
    </div>
  );
}

function ServicesAllCategoriesStack() {
  return (
    <div className="space-y-12 sm:space-y-14">
      {servicePanels.map((panel) => (
        <div key={panel.id} className="pt-2 border-t border-chrome-foreground/15 first:border-0 first:pt-0 first:mt-0">
          <h3 className="font-rounded text-xl sm:text-2xl font-bold text-chrome-foreground tracking-tight mb-4 sm:mb-5">
            {panel.title}
          </h3>
          <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {panel.services.map((s) => (
              <ServiceItem key={s.id} service={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServicesSection() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const h = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <section
      id="services"
      className="relative scroll-mt-20 text-chrome-foreground font-rounded overflow-hidden"
      style={{
        backgroundImage: "url('/services-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#0f766e]/85" aria-hidden />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-20">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mb-8 sm:mb-10 max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-bold tracking-tight leading-[1.12] text-chrome-foreground">
            Explore our range of treatments.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-chrome-foreground/85 font-medium leading-relaxed">
            Designed to help you look and feel your best.
          </p>
        </motion.header>

        {reduceMotion ? <ServicesAllCategoriesStack /> : <ServicesInteractive />}

        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-chrome-foreground/85 text-sm sm:text-base font-medium mb-4">
            Not sure where to start? Message us on WhatsApp&mdash;we&rsquo;ll guide you to the perfect option.
          </p>
          <div className="flex justify-center">
          <Button
            asChild
            className="h-12 rounded-full bg-gold text-gold-foreground hover:bg-gold/90 px-8 text-base font-semibold shadow-lg"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Message us on WhatsApp
            </a>
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
