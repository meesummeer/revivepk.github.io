import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Droplets, Zap, Syringe, Heart, Sun } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Aesthetic Treatments",
    description: "Premium anti-aging and facial rejuvenation treatments tailored to your unique features and goals.",
  },
  {
    icon: Droplets,
    title: "Skin Rejuvenation",
    description: "Advanced hydration therapies, chemical peels, and laser treatments for radiant, healthy skin.",
  },
  {
    icon: Zap,
    title: "Advanced Procedures",
    description: "Cutting-edge body contouring and non-surgical procedures using the latest technology.",
  },
  {
    icon: Syringe,
    title: "Dermal Fillers",
    description: "Natural-looking volume restoration and facial sculpting by expert practitioners.",
  },
  {
    icon: Heart,
    title: "Wellness Programmes",
    description: "Holistic wellness and vitality programmes designed for long-term health and beauty.",
  },
  {
    icon: Sun,
    title: "Skin Analysis",
    description: "Comprehensive diagnostic skin analysis with personalised treatment planning.",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-20 lg:py-28 bg-cream">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="text-sm font-sans font-semibold tracking-widest uppercase text-primary mb-3">
          Our Expertise
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          Treatments & Services
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group bg-card rounded-xl p-7 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
              <service.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
              {service.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {service.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-200">
              Learn More <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
