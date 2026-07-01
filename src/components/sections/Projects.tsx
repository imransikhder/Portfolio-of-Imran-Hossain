"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";

const projects = [
  {
    title: "BeyondThePitch",
    subtitle: "Football Content Platform",
    description:
      "A comprehensive football content platform delivering engaging match analysis, player insights, and community interaction.",
    gradient: "from-[#38BDF8]/20 via-[#818CF8]/20 to-[#C084FC]/20",
    accentGradient: "from-[#38BDF8] to-[#818CF8]",
    icon: "⚽",
  },
  {
    title: "Balance Buddies",
    subtitle: "Educational YouTube Channel",
    description:
      "An educational YouTube channel focused on making learning fun and accessible for young audiences.",
    gradient: "from-[#34D399]/20 via-[#38BDF8]/20 to-[#818CF8]/20",
    accentGradient: "from-[#34D399] to-[#38BDF8]",
    icon: "🎥",
  },
  {
    title: "Marketing Analytics Dashboard",
    subtitle: "Power BI + Excel",
    description:
      "Interactive marketing analytics dashboard built with Power BI and Excel for data-driven decision making.",
    gradient: "from-[#F472B6]/20 via-[#FB923C]/20 to-[#FBBF24]/20",
    accentGradient: "from-[#F472B6] to-[#FB923C]",
    icon: "📊",
  },
  {
    title: "Facebook Ads Campaign Analysis",
    subtitle: "Marketing Project",
    description:
      "Comprehensive analysis of Facebook advertising campaigns with ROI tracking and audience insights.",
    gradient: "from-[#818CF8]/20 via-[#38BDF8]/20 to-[#34D399]/20",
    accentGradient: "from-[#818CF8] to-[#38BDF8]",
    icon: "📈",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 bg-[#050816]">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#818CF8]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#38BDF8]/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Projects" subtitle="MY WORK" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative"
            >
              {/* Border glow on hover */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#38BDF8]/0 to-[#38BDF8]/0 group-hover:from-[#38BDF8]/25 group-hover:to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100" />

              {/* Card */}
              <div className="relative rounded-2xl bg-[#0F172A]/60 backdrop-blur-xl border border-white/[0.06] overflow-hidden h-full flex flex-col group-hover:border-[#38BDF8]/20 group-hover:shadow-[0_20px_60px_rgba(56,189,248,0.06)] transition-all duration-500">
                {/* Image Placeholder / Gradient Header */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                  </div>

                  <span className="text-6xl z-10 group-hover:scale-110 transition-transform duration-500">
                    {project.icon}
                  </span>

                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  {/* Subtitle tag */}
                  <span
                    className={`inline-flex w-fit text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-gradient-to-r ${project.accentGradient} bg-clip-text text-transparent border border-[#38BDF8]/20 mb-3`}
                  >
                    {project.subtitle}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-outfit)] mb-3 group-hover:text-[#38BDF8] transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#94A3B8]/80 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#38BDF8]/30 text-[#38BDF8] text-sm font-medium hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]/60 transition-all duration-300"
                    >
                      <ExternalLinkIcon />
                      Live Preview
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-[#94A3B8] text-sm font-medium hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                      <GitHubIcon />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
