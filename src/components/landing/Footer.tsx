import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {

  return (
    <footer className="relative -mt-10 bg-chrome text-chrome-foreground overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gold/7 blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-4 gap-8 items-start">
          {/* Brand */}
          <div className="min-w-0">
            <img src="/logo.png" alt="Revive Healthcare" className="h-[7.5rem] w-auto object-contain mb-4 brightness-0 invert" />
            <p className="text-chrome-foreground/70 text-sm leading-relaxed">
              Premium aesthetic medicine delivered with international expertise,
              precision, and care. ✨
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-chrome-foreground/70">
              <Mail className="h-4 w-4 shrink-0" />
              <a href="mailto:revivehod@gmail.com" className="hover:text-chrome-foreground transition-colors">revivehod@gmail.com</a>
            </div>
          </div>

          {/* Branches */}
          <div className="min-w-0">
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">Our Branches</h4>
            <div className="grid grid-cols-2 items-start gap-4 text-sm text-chrome-foreground/70">
              <div className="min-w-0 flex flex-col items-start">
                <p className="font-medium text-chrome-foreground/90 mb-1.5">DHA</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 min-w-0">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span className="break-words">23-C, Lane 10, Bukhari Commercial, Phase 6, DHA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" />
                    <a href="tel:03011788000" className="hover:text-chrome-foreground transition-colors">0301-1788000</a>
                  </li>
                </ul>
              </div>
              <div className="min-w-0 flex flex-col items-start">
                <p className="font-medium text-chrome-foreground/90 mb-1.5">Bahadurabad</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 min-w-0">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span className="break-words">Plot#102, Shop#1, Imperial Residency, Bahadurabad, Karachi, Pakistan 07482</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" />
                    <a href="tel:03030008483" className="hover:text-chrome-foreground transition-colors">0303-0008483</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="min-w-0">
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">Opening Hours 🕐</h4>
            <ul className="space-y-2 text-sm text-chrome-foreground/70">
              <li>Monday – Saturday</li>
              <li>12:00 PM – 9:00 PM</li>
              <li className="text-chrome-foreground/50">Sunday: Closed</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-chrome-foreground/70">
              <li><a href="/" className="hover:text-chrome-foreground transition-colors">Home</a></li>
              <li><a href="/#doctor" className="hover:text-chrome-foreground transition-colors">About</a></li>
              <li><a href="/#services" className="hover:text-chrome-foreground transition-colors">Services</a></li>
              <li><a href="/treatments" className="hover:text-chrome-foreground transition-colors">Treatments</a></li>
              <li><a href="/careers" className="hover:text-chrome-foreground transition-colors">Careers</a></li>
              <li><a href="/#booking" className="hover:text-chrome-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-chrome-foreground/10 mt-12 pt-8">
          <p className="text-xs text-chrome-foreground/50 text-center sm:text-left">
            © 2026 Revive Healthcare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
