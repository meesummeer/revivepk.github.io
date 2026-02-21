import { motion } from "framer-motion";
import { Award, Globe, GraduationCap } from "lucide-react";

const badges = [
  { icon: Globe, label: "International Speaker" },
  { icon: Award, label: "Board Director" },
  { icon: GraduationCap, label: "Aesthetic Specialist" },
];

const DoctorSection = () => (
  <section id="doctor" className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[3/4] rounded-2xl bg-cream overflow-hidden flex items-end justify-center">
            <div className="w-full h-full bg-gradient-to-t from-primary/10 to-cream flex items-center justify-center">
              <span className="text-muted-foreground font-sans text-sm">Doctor Portrait</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gold/20 blur-2xl pointer-events-none" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-sans font-semibold tracking-widest uppercase text-primary mb-3">
            Meet the Doctor
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Dr. Sarah Mitchell
          </h2>

          <div className="flex flex-wrap gap-3 mb-8">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 bg-primary/8 text-foreground rounded-full px-4 py-2 text-sm font-medium"
              >
                <badge.icon className="h-4 w-4 text-primary" />
                {badge.label}
              </span>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4 text-base">
            With over 15 years of experience in aesthetic medicine and a commitment to
            evidence-based practice, Dr. Mitchell brings international expertise to
            every consultation. As Director of the International Education Board of
            Aesthetics, she leads training programs across three continents.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base italic">
            "My philosophy is simple: enhance your natural beauty with precision,
            safety, and artistry. Every treatment plan is as unique as the individual."
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default DoctorSection;
