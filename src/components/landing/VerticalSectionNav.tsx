import { useState, useEffect } from "react";
import { Home, User, Sparkles, Tag, Users, MessageCircle, Calendar } from "lucide-react";

const SECTIONS = [
  { id: "hero", href: "#", icon: Home, label: "Home" },
  { id: "doctor", href: "#doctor", icon: User, label: "About" },
  { id: "services", href: "#services", icon: Sparkles, label: "Services" },
  { id: "promotions", href: "#promotions", icon: Tag, label: "Promotions" },
  { id: "team", href: "#team", icon: Users, label: "Team" },
  { id: "testimonials", href: "#testimonials", icon: MessageCircle, label: "Testimonials" },
  { id: "booking", href: "#booking", icon: Calendar, label: "Book" },
] as const;

/** Hero is min-h-[85vh]; hide nav when scroll is within this. */
const HERO_HIDE_THRESHOLD = 0.85;

export default function VerticalSectionNav() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const checkHero = () => {
      const threshold = window.innerHeight * HERO_HIDE_THRESHOLD;
      setIsInHero(window.scrollY < threshold);
    };
    checkHero();
    window.addEventListener("scroll", checkHero, { passive: true });
    return () => window.removeEventListener("scroll", checkHero);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          const id = el.getAttribute("id") ?? (el.tagName === "MAIN" ? "hero" : null);
          if (id) setActiveId(id);
          break;
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const elements: Element[] = [];
    const main = document.querySelector("main");
    if (main) {
      elements.push(main);
      observer.observe(main);
    }
    for (const s of SECTIONS) {
      if (s.id === "hero") continue;
      const el = document.getElementById(s.id);
      if (el) {
        elements.push(el);
        observer.observe(el);
      }
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleClick = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const visible = activeId !== "hero" && !isInHero;

  return (
    <nav
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-1 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm p-2 transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Section navigation"
      aria-hidden={!visible}
    >
      {SECTIONS.map(({ id, href, icon: Icon, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => handleClick(href)}
            className={`p-2.5 rounded-full transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
            aria-label={label}
            aria-current={isActive ? "location" : undefined}
          >
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </nav>
  );
}
