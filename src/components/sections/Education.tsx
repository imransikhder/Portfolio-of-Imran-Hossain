"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";

const educationData = [
  {
    degree: "BBA in Marketing",
    institution: "Government Titumir College",
    gpa: "3.09",
    gpaLabel: "CGPA",
    period: "2021 – 2024",
    icon: "🎓",
    description:
      "Bachelor of Business Administration with a specialization in Marketing, covering strategic marketing, consumer behavior, and brand management.",
  },
  {
    degree: "HSC – Business Studies",
    institution: "Higher Secondary Certificate",
    gpa: "4.17",
    gpaLabel: "GPA",
    period: "2018 – 2020",
    icon: "📚",
    description:
      "Completed Higher Secondary education with a focus on Business Studies, building a strong foundation in commerce and economics.",
  },
  {
    degree: "SSC – Business Studies",
    institution: "Secondary School Certificate",
    gpa: "4.83",
    gpaLabel: "GPA",
    period: "2016 – 2018",
    icon: "📖",
    description:
      "Achieved outstanding results in Secondary School with a concentration in Business Studies and core academic subjects.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32 bg-[#050816]">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#38BDF8]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Education" subtitle="ACADEMIC BACKGROUND" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative"
            >
              {/* Gradient border wrapper */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#38BDF8]/30 via-[#38BDF8]/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card content */}
              <div className="relative rounded-2xl bg-[#0F172A]/60 backdrop-blur-xl border border-white/[0.05] p-8 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(56,189,248,0.08)] transition-shadow duration-500">
                {/* Icon & Period */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl">{item.icon}</span>
                  <span className="text-xs font-medium tracking-wider text-[#94A3B8] uppercase">
                    {item.period}
                  </span>
                </div>

                {/* Degree */}
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-outfit)] mb-2 group-hover:text-[#38BDF8] transition-colors duration-300">
                  {item.degree}
                </h3>

                {/* Institution */}
                <p className="text-[#94A3B8] text-sm mb-4">
                  {item.institution}
                </p>

                {/* Description */}
                <p className="text-[#94A3B8]/70 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>

                {/* GPA Badge */}
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20">
                    <span className="text-[#38BDF8] text-xs font-semibold tracking-wider uppercase">
                      {item.gpaLabel}
                    </span>
                    <span className="text-white font-bold text-lg font-[family-name:var(--font-outfit)]">
                      {item.gpa}
                    </span>
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
