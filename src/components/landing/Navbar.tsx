import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavLink = {
  label: string;
  href: string;
};

const navLinkGroups: NavLink[][] = [
  [
    { label: "Home", href: "#" },
    { label: "Treatments", href: "/treatments" },
    { label: "Services", href: "#services" },
  ],
  [
    { label: "About", href: "#doctor" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  [
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "#booking" },
  ],
];

const flatNavLinks = navLinkGroups.flat();

const WHATSAPP_URL = "https://wa.me/923030008483";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isOtherPage = !isHome;
  const homeTextDark = isHome && scrolled;
  const darkMode = isOtherPage || homeTextDark;

  useEffect(() => {
    if (location.pathname !== "/") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;
    const target = location.hash;
    const scrollToTarget = () => {
      const el = document.querySelector(target);
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth" });
      return true;
    };
    if (scrollToTarget()) return;
    const raf = requestAnimationFrame(() => { scrollToTarget(); });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash]);

  const handleNav = (href: string) => {
    setOpen(false);
    if (href === "#") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: href });
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md transition-[background-color,border-color] duration-200",
        "px-3 pt-3 pb-2 sm:pt-4 lg:px-6",
        darkMode
          ? "border-b border-white/20 bg-white/20"
          : "border-b border-white/10 bg-transparent"
      )}
    >
      <nav
        className="container relative mx-auto flex min-h-10 items-center justify-between gap-2 sm:min-h-12 md:min-h-[3.25rem] lg:min-h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="relative z-20 flex shrink-0 items-center self-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Revive Healthcare - Home"
        >
          <img
            src="/logo.png"
            alt="Revive Healthcare"
            className="h-10 w-auto object-contain sm:h-11 md:h-12 lg:h-14"
          />
        </Link>

        {/* Desktop nav pill */}
        <div
          className={cn(
            "absolute left-1/2 top-1/2 z-30 hidden w-max max-w-[min(100%-10rem,calc(100%-8rem))] -translate-x-1/2 -translate-y-1/2 md:flex",
            "items-center justify-center rounded-full border px-2 py-1.5 shadow-md sm:px-2.5 sm:py-2 backdrop-blur-md",
            darkMode
              ? "border-black/10 bg-white/50"
              : "border-white/30 bg-white/15"
          )}
        >
          <ul className="flex flex-nowrap items-center justify-center">
            {flatNavLinks.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && (
                  <li
                    role="separator"
                    aria-hidden
                    className="pointer-events-none mx-1.5 shrink-0 list-none sm:mx-2"
                    style={{
                      width: 1,
                      height: 18,
                      flexShrink: 0,
                      backgroundColor: darkMode ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.6)",
                    }}
                  />
                )}
                <li className="shrink-0 list-none">
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-left text-sm font-medium transition-colors sm:px-2 sm:py-1 sm:text-base",
                      darkMode ? "text-neutral-700 hover:text-neutral-900" : "text-white hover:text-white/80"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>

        {/* CTA + mobile menu */}
        <div className="relative z-20 ml-auto flex min-w-0 flex-1 items-center justify-end gap-2">
          <Button
            asChild
            className="h-9 shrink-0 rounded-full bg-[#25D366] px-3 text-xs font-semibold text-white shadow-md hover:bg-[#20bd5a] sm:h-10 sm:px-4 sm:text-sm md:text-base"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.123 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Book a Consult
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className={cn(
                  "h-10 w-10 md:hidden",
                  darkMode ? "text-neutral-900 hover:bg-black/10" : "text-white hover:bg-white/10"
                )}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <button
                type="button"
                onClick={() => handleNav("#")}
                className="mb-6 inline-block"
                aria-label="Revive Healthcare - Home"
              >
                <img src="/logo.png" alt="Revive Healthcare" className="h-32 w-auto object-contain" />
              </button>
              <nav className="flex flex-col gap-0" aria-label="Main navigation (mobile)">
                {navLinkGroups.map((group, gIdx) => (
                  <div key={gIdx} className={cn("pb-2 pt-1", gIdx > 0 && "mt-1 border-t border-border/60 pt-3")}>
                    <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                      {gIdx === 0 && "Clinic & services"}
                      {gIdx === 1 && "About the clinic"}
                      {gIdx === 2 && "Get in touch"}
                    </p>
                    <ul className="space-y-0.5">
                      {group.map((link) => (
                        <li key={link.href}>
                          <button
                            onClick={() => handleNav(link.href)}
                            className="w-full rounded-md py-2.5 text-left text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Button asChild className="mt-4 h-11 w-full rounded-full bg-[#25D366] text-base font-semibold text-white hover:bg-[#20bd5a]">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.123 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Book a Consult
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
