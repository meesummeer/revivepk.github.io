import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#doctor" },
  { label: "Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#booking" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8" aria-label="Main navigation">
        <a href="#" className="font-serif text-2xl font-bold tracking-tight text-foreground">
          Revive
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
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

        <Button
          onClick={() => handleNav("#booking")}
          className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
        >
          Book Now
        </Button>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background w-72">
            <SheetTitle className="font-serif text-xl mb-6">Revive</SheetTitle>
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
      </nav>
    </header>
  );
};

export default Navbar;
