"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";

const certifications = [
  {
    title: "Full Stack Digital Marketing",
    issuer: "Professional Certification",
    icon: "🚀",
    description:
      "Comprehensive certification covering SEO, SEM, social media marketing, email campaigns, content strategy, and marketing analytics.",
    color: "from-[#38BDF8] to-[#818CF8]",
  },
  {
    title: "Google Digital Garage",
    issuer: "Google",
    icon: "🏆",
    description:
      "Fundamentals of digital marketing certified by Google, including search, display advertising, analytics, and online business strategy.",
    color: "from-[#34D399] to-[#38BDF8]",
  },
  {
    title: "WHO AAR Training",
    issuer: "World Health Organization",
    icon: "🌍",
    description:
      "After Action Review training program by the World Health Organization, focusing on systematic review processes and organizational learning.",
    color: "from-[#F472B6] to-[#38BDF8]",
  },
  {
    title: "Excel Skills for Business",
    issuer: "Professional Development",
    icon: "📊",
    description:
      "Advanced Excel skills including data analysis, pivot tables, VLOOKUP, macros, and business intelligence reporting techniques.",
    color: "from-[#FBBF24] to-[#F97316]",
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
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Certifications() {
  return (
    <section id="certificates" className="relative py-24 md:py-32 bg-[#050816]">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#38BDF8]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Certifications" subtitle="ACHIEVEMENTS" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative"
            >
              {/* Hover border glow */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#38BDF8]/0 via-[#38BDF8]/0 to-[#38BDF8]/0 group-hover:from-[#38BDF8]/20 group-hover:via-[#38BDF8]/30 group-hover:to-[#38BDF8]/20 transition-all duration-500 opacity-0 group-hover:opacity-100" />

              {/* Card */}
              <div className="relative rounded-2xl bg-[rgba(15,23,42,0.5)] backdrop-blur-xl border border-[rgba(56,189,248,0.15)] p-8 h-full group-hover:border-[#38BDF8]/40 transition-all duration-500">
                {/* Top row: Icon + Issuer */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {cert.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-[family-name:var(--font-outfit)] group-hover:text-[#38BDF8] transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-[#94A3B8] text-sm mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#94A3B8]/80 text-sm leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Verified badge */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span className="text-xs text-[#34D399] font-medium tracking-wider uppercase">
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
