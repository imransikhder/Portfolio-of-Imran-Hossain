"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center mb-16"
    >
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm md:text-base uppercase tracking-[0.25em] text-[#94A3B8] mb-3 font-medium"
      >
        {subtitle}
      </motion.p>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-outfit)] leading-tight">
        {title}
      </h2>

      {/* Animated accent underline */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="mt-4 h-1 w-16 md:w-20 rounded-full origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, #38BDF8, transparent)",
        }}
      />
    </motion.div>
  );
}
