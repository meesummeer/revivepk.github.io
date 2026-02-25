import { motion } from "framer-motion";

type TeamMember = { name: string; role: string; image?: string };

const branches: { name: string; members: TeamMember[] }[] = [
  { name: "Bahadurabad", members: [
    { name: "Bushra Waseem", role: "Floor Manager" },
    { name: "Dr. Hafsa", role: "Aesthetic Physician" },
    { name: "Dr. Fatima", role: "Aesthetic Physician" },
    { name: "Haleema", role: "Aesthetic Nurse" },
  ]},
  { name: "DHA", members: [
    { name: "Tariq", role: "Aesthetic Nurse" },
    { name: "Shumaila", role: "Aesthetic Nurse" },
  ]},
];

function getPlaceholderAvatarUrl(name: string): string {
  const seed = encodeURIComponent(name.trim() || "user");
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=1e3a3f&textColor=e5e7eb`;
}

function MemberCard({ name, role, image }: { name: string; role: string; image?: string }) {
  const src = image ?? getPlaceholderAvatarUrl(name);
  return (
    <div className="text-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-xl bg-cream mb-3 flex items-center justify-center overflow-hidden border border-border shrink-0">
        <img src={src} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-rounded text-base font-semibold text-foreground">{name}</h3>
      <p className="text-xs text-muted-foreground mt-1">{role}</p>
    </div>
  );
}

const TeamSection = () => (
  <section id="team" className="py-12 lg:py-16 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-sm font-sans font-semibold tracking-widest uppercase text-primary mb-2">
          Our People
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          Meet the Team
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6 lg:gap-8">
        {branches.map((branch, bi) => (
          <motion.div
            key={branch.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: bi * 0.1 }}
          >
            <p className="text-sm font-sans font-semibold tracking-wider uppercase text-primary mb-4">
              {branch.name}
            </p>
            {branch.name === "Bahadurabad" ? (
              <div className="flex flex-col gap-4">
                <MemberCard name={branch.members[0].name} role={branch.members[0].role} image={branch.members[0].image} />
                <div className="grid grid-cols-2 gap-4">
                  <MemberCard name={branch.members[1].name} role={branch.members[1].role} image={branch.members[1].image} />
                  <MemberCard name={branch.members[2].name} role={branch.members[2].role} image={branch.members[2].image} />
                </div>
                <MemberCard name={branch.members[3].name} role={branch.members[3].role} image={branch.members[3].image} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {branch.members.map((member) => (
                  <MemberCard key={member.name} name={member.name} role={member.role} image={member.image} />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
