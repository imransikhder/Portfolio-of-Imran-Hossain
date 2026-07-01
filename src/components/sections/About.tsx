'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineGlobe,
  HiOutlineSpeakerphone,
  HiOutlineChartBar,
  HiOutlinePencilAlt,
  HiOutlineUserGroup,
  HiOutlineLightBulb,
} from 'react-icons/hi';

/* ─────────────── data ─────────────── */

const badges = [
  { label: 'Marketing Graduate', icon: HiOutlineAcademicCap },
  { label: 'Business Development', icon: HiOutlineBriefcase },
  { label: 'Digital Marketing Enthusiast', icon: HiOutlineGlobe },
  { label: 'Facebook Ads Learner', icon: HiOutlineSpeakerphone },
  { label: 'Marketing Analytics', icon: HiOutlineChartBar },
  { label: 'Content Creator', icon: HiOutlinePencilAlt },
  { label: 'Public Speaker', icon: HiOutlineUserGroup },
  { label: 'Debate Club Leader', icon: HiOutlineLightBulb },
];

const stats = [
  { value: 4, suffix: '+', label: 'Years Learning Marketing' },
  { value: 4, suffix: '+', label: 'Certifications' },
  { value: 3, suffix: '+', label: 'Leadership Positions' },
  { value: 4, suffix: '+', label: 'Projects Completed' },
];

/* ─────────────── counter hook ─────────────── */

function useCountUp(target: number, inView: boolean, duration = 1.6) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / ((duration * 1000) / 40));
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(start);
      }
    }, 40);
    return () => clearInterval(id);
  }, [inView, target, duration]);

  return count;
}

/* ─────────────── stat card ─────────────── */

function StatCard({
  value,
  suffix,
  label,
  inView,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  index: number;
}) {
  const count = useCountUp(value, inView);

  return (
    <motion.div
      className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center backdrop-blur-md transition-colors duration-300 hover:border-[#38BDF8]/30 hover:bg-white/[0.06]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: 0.15 * index,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* subtle corner glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.12) 0%, transparent 60%)',
        }}
      />

      <span className="block text-4xl sm:text-5xl font-outfit font-bold text-[#38BDF8] mb-1">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-[#94A3B8]">{label}</span>
    </motion.div>
  );
}

/* ─────────────── main section ─────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
      style={{ background: 'rgba(15,23,42,0.85)' }}
    >
      {/* subtle top-fade transition */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-24"
        style={{
          background:
            'linear-gradient(to bottom, #050816, rgba(15,23,42,0.85))',
        }}
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About Me" subtitle="INTRODUCTION" />

        {/* ─── Two-column layout ─── */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* ── Left: story + badges ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.p
              className="text-[#94A3B8] leading-relaxed text-base sm:text-lg mb-8"
              variants={fadeUp}
            >
              I&rsquo;m a passionate{' '}
              <span className="text-white font-medium">Marketing Graduate</span>{' '}
              with a deep curiosity for how brands connect with people in the
              digital age. My journey spans across{' '}
              <span className="text-white font-medium">Business Development</span>,
              where I&rsquo;ve cultivated strategic thinking and relationship
              management, and into the dynamic world of{' '}
              <span className="text-white font-medium">Digital Marketing</span>,
              where data meets creativity.
            </motion.p>

            <motion.p
              className="text-[#94A3B8] leading-relaxed text-base sm:text-lg mb-10"
              variants={fadeUp}
            >
              From mastering Facebook Ads to leading university debate forums, I
              thrive on challenges that push me to grow. I believe the best
              marketing isn&rsquo;t about selling — it&rsquo;s about telling
              stories that resonate.
            </motion.p>

            {/* ── Skill badges ── */}
            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
            >
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <motion.span
                    key={badge.label}
                    variants={fadeUp}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs sm:text-sm text-[#94A3B8] backdrop-blur-md transition-colors duration-300 hover:border-[#38BDF8]/40 hover:text-white"
                  >
                    <Icon className="text-[#38BDF8] text-sm" />
                    {badge.label}
                  </motion.span>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Right: stat cards 2×2 ── */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-4 sm:gap-5"
          >
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inView={statsInView}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
