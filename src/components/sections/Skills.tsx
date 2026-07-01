"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Skill {
  name: string;
  icon: string;
}

const technicalSkills: Skill[] = [
  { name: "Digital Marketing", icon: "📈" },
  { name: "Facebook Ads", icon: "📣" },
  { name: "Google Analytics", icon: "📊" },
  { name: "Power BI", icon: "⚡" },
  { name: "Excel", icon: "📗" },
  { name: "Word", icon: "📝" },
  { name: "PowerPoint", icon: "🎯" },
  { name: "Marketing Analytics", icon: "🔍" },
  { name: "Content Marketing", icon: "✍️" },
  { name: "Social Media Marketing", icon: "🌐" },
];

const professionalSkills: Skill[] = [
  { name: "Leadership", icon: "👑" },
  { name: "Communication", icon: "💬" },
  { name: "Event Management", icon: "🎪" },
  { name: "Teamwork", icon: "🤝" },
  { name: "Strategic Thinking", icon: "🧠" },
  { name: "Problem Solving", icon: "🧩" },
  { name: "Public Speaking", icon: "🎤" },
];

/* ------------------------------------------------------------------ */
/*  Skill Card                                                         */
/* ------------------------------------------------------------------ */

function SkillCard({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "800px",
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group"
    >
      <div
        className="
          relative flex items-center gap-3 px-5 py-4 rounded-xl cursor-default
          border border-[rgba(56,189,248,0.1)]
          bg-[rgba(15,23,42,0.6)] backdrop-blur-md
          transition-all duration-300 ease-out
          group-hover:border-[rgba(56,189,248,0.3)]
          group-hover:scale-[1.05]
          group-hover:shadow-[0_0_20px_rgba(56,189,248,0.08)]
        "
      >
        {/* subtle glow overlay on hover */}
        <span
          className="
            pointer-events-none absolute inset-0 rounded-xl opacity-0
            group-hover:opacity-100 transition-opacity duration-300
            bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.06),transparent_70%)]
          "
        />

        <span className="text-2xl shrink-0" aria-hidden="true">
          {skill.icon}
        </span>
        <span className="text-white font-medium text-sm leading-tight select-none">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Column header                                                      */
/* ------------------------------------------------------------------ */

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="
        text-lg md:text-xl font-semibold text-white mb-6
        font-[var(--font-outfit)]
        flex items-center gap-2
      "
    >
      <span className="inline-block w-8 h-[2px] bg-[#38BDF8] rounded-full" />
      {children}
    </motion.h3>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills Section                                                     */
/* ------------------------------------------------------------------ */

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-[#050816] overflow-hidden"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.04),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Skills" subtitle="MY EXPERTISE" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Technical Skills */}
          <div>
            <ColumnTitle>Technical Skills</ColumnTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {technicalSkills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Professional Skills */}
          <div>
            <ColumnTitle>Professional Skills</ColumnTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {professionalSkills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
