import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, ArrowLeft } from "lucide-react";
import {
  getServicePanels,
  treatmentDetails,
  type ServicePanel,
  type ServiceEntry,
} from "@/data/servicesContent";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const WHATSAPP_NUMBER = "923030008483";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const panels = getServicePanels();

function ContactBar() {
  return (
    <div className="sticky top-24 z-40 bg-cream/95 backdrop-blur-sm border-b border-border/40 py-2.5 px-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="hidden sm:block text-sm text-muted-foreground">
          Ready to start? Reach out directly
        </p>
        <div className="flex items-center gap-2 ml-auto">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-xs font-semibold shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            Call DHA
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-xs font-semibold shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            Call Bahadurabad
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25d366] text-white px-4 py-1.5 text-xs font-semibold shadow-sm hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function TreatmentCard({ service }: { service: ServiceEntry }) {
  const Icon = service.icon;
  const detail = treatmentDetails[service.id];

  return (
    <div id={service.id} className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm scroll-mt-36">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gold/10 text-gold">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h3 className="font-sans text-lg font-bold text-foreground">{service.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{service.description}</p>
        </div>
      </div>

      {detail && (
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-muted/50 px-4 py-3">
            <p className="font-semibold text-foreground mb-1">Best for</p>
            <p className="text-muted-foreground">{detail.bestFor}</p>
          </div>
          <div className="rounded-lg bg-muted/50 px-4 py-3">
            <p className="font-semibold text-foreground mb-1">Sessions</p>
            <p className="text-muted-foreground">{detail.sessions}</p>
          </div>
          <div className="rounded-lg bg-muted/50 px-4 py-3">
            <p className="font-semibold text-foreground mb-1">Downtime</p>
            <p className="text-muted-foreground">{detail.downtime}</p>
          </div>
          <div className="rounded-lg bg-muted/50 px-4 py-3">
            <p className="font-semibold text-foreground mb-1">How it works</p>
            <p className="text-muted-foreground">{detail.faq}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function CategorySection({ panel, index }: { panel: ServicePanel; index: number }) {
  const even = index % 2 === 0;
  return (
    <section
      id={`cat-${panel.id}`}
      className={`py-12 lg:py-16 scroll-mt-36 ${even ? "bg-background" : "bg-cream"}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-sans text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {panel.title}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          {panel.services.length} treatments in this category. Tap any card to learn more about candidacy, sessions, and downtime.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {panel.services.map((s) => (
            <TreatmentCard key={s.id} service={s} />
          ))}
        </div>

        <div className="flex items-center gap-3 mt-8">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Phone className="h-4 w-4" />
            Call to book
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25d366] text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Treatments() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-24">
      <ContactBar />

      <section className="py-10 lg:py-14 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-3">
            Choose the right plan for your goals
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg mb-8">
            Explore our full range of aesthetic procedures. Each treatment is tailored to your individual needs
            by board-certified specialists with over 15 years of experience.
          </p>

          <div className="flex flex-wrap gap-2">
            {panels.map((panel) => (
              <a
                key={panel.id}
                href={`#cat-${panel.id}`}
                className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary hover:bg-primary/20 transition-colors"
              >
                {panel.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <main>
        {panels.map((panel, i) => (
          <CategorySection key={panel.id} panel={panel} index={i} />
        ))}
      </main>

      <Footer />
      </div>
    </>
  );
}
