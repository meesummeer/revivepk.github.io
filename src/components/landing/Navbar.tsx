import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#doctor" },
  { label: "Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#booking" },
];

const Navbar = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  const [open, setOpen] = useState(false);
  const scrolled = scrollProgress > 0.5;

  const handleNav = (href: string) => {
    setOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="pt-4 px-4 lg:px-8 bg-foreground z-10">
      <nav className="container mx-auto flex items-center gap-4" aria-label="Main navigation">
        {/* Mobile: logo always visible */}
        <a href="#" className="flex md:hidden items-center shrink-0 pb-2 bg-transparent hover:bg-transparent focus:bg-transparent focus-visible:outline-none" aria-label="Revive Healthcare - Home">
          <img src="/logo.png" alt="Revive Healthcare" className="h-12 w-auto object-contain block" />
        </a>
        {/* Desktop left: logo – equal width so center stays fixed when logo collapses */}
        <div className="hidden md:flex flex-1 items-center justify-start min-w-0">
          <a
            href="#"
            className="flex items-center shrink-0 pb-2 bg-transparent hover:bg-transparent focus:bg-transparent focus-visible:outline-none rounded-none transition-opacity duration-300 ease-out"
            style={{ opacity: 1 - scrollProgress }}
            aria-label={scrolled ? undefined : "Revive Healthcare - Home"}
            aria-hidden={scrolled}
            tabIndex={scrolled ? -1 : 0}
          >
            <img src="/logo.png" alt="Revive Healthcare" className="h-[7.5rem] w-auto object-contain block shrink-0" />
          </a>
        </div>

        {/* Center: nav links – stays in the middle */}
        <div className="hidden md:flex items-center justify-center shrink-0 rounded-full bg-cream/90 backdrop-blur-sm border border-border/30 shadow-sm pl-6 pr-6 py-2.5">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: CTA – equal width so center stays fixed */}
        <div className="flex flex-1 items-center justify-end gap-2 min-w-0">
          <Button
            onClick={() => handleNav("#booking")}
            className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
          >
            Book Now
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          <SheetContent side="right" className="bg-background w-72">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <a href="#" className="mb-6 inline-block" aria-label="Revive Healthcare - Home">
              <img src="/logo.png" alt="Revive Healthcare" className="h-[7.5rem] w-auto object-contain" />
            </a>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => handleNav("#booking")}
                className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
              >
                Book Now
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
