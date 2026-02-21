import { ArrowUp, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Revive</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium aesthetic medicine delivered with international expertise,
              precision, and care.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Monday – Saturday</li>
              <li>12:00 PM – 9:00 PM</li>
              <li className="text-primary-foreground/50">Sunday: Closed</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                123 Harley Street, London W1G 6AX
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                +44 20 7000 0000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                hello@reviveclinic.com
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2026 Revive Healthcare. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
