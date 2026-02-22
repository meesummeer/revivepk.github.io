import { MapPin, Phone, Mail, Instagram } from "lucide-react";

const Footer = () => {

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="Revive Healthcare" className="h-[7.5rem] w-auto object-contain mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium aesthetic medicine delivered with international expertise,
              precision, and care. ✨
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">Opening Hours 🕐</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Monday – Saturday</li>
              <li>12:00 PM – 9:00 PM</li>
              <li className="text-primary-foreground/50">Sunday: Closed</li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">Our Branches</h4>
            <div className="space-y-6 text-sm text-primary-foreground/70">
              <div>
                <p className="font-medium text-primary-foreground/90 mb-1.5">DHA</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    23-C, Lane 10, Bukhari Commercial, Phase 6, DHA
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" />
                    <a href="tel:03011788000" className="hover:text-primary-foreground transition-colors">0301-1788000</a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-primary-foreground/90 mb-1.5">Bahadurabad</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    Plot#102, Shop#1, Imperial Residency, Bahadurabad, Karachi, Pakistan 07482
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" />
                    <a href="tel:03030008483" className="hover:text-primary-foreground transition-colors">0303-0008483</a>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:hello@reviveclinic.com" className="hover:text-primary-foreground transition-colors">hello@reviveclinic.com</a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">Quick Links 🔗</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-primary-foreground transition-colors">
                  Home
                </a>
              </li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/revive_healthcare/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <p className="text-xs text-primary-foreground/50 text-center sm:text-left">
            © 2026 Revive Healthcare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
