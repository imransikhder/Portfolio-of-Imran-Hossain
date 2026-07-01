'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import TypeWriter from '@/components/ui/TypeWriter';
import {
  HiOutlineDownload,
  HiOutlineMail,
  HiChevronDown,
} from 'react-icons/hi';
import {
  FaFacebookF,
  FaBullhorn,
  FaChartLine,
  FaPalette,
  FaRobot,
  FaPenNib,
} from 'react-icons/fa';

/* ── Deterministic pseudo-random (SSR-safe, no hydration mismatch) ── */
function srand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/* ── Motion variants ── */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/*
 * ── Skill cards — arranged symmetrically around the portrait ──
 */
const skills = [
  { Icon: FaPenNib,    label: 'Content Creation',  angle: -90  },
  { Icon: FaFacebookF, label: 'Meta Ads',          angle: -35  },
  { Icon: FaBullhorn,  label: 'Digital Marketing', angle:  10  },
  { Icon: FaChartLine, label: 'Analytics',         angle:  50  },
  { Icon: FaPalette,   label: 'UI/UX Design',      angle: 130  },
  { Icon: FaRobot,     label: 'AI Tools',          angle: 190  },
];

/* ── Background particles (deterministic positions) ── */
const particles = Array.from({ length: 30 }, (_, i) => ({
  left: `${5 + srand(i * 7 + 1) * 90}%`,
  top: `${5 + srand(i * 13 + 3) * 90}%`,
  size: 1.5 + srand(i * 17 + 5) * 2.5,
  delay: srand(i * 23 + 7) * 8,
  dur: 5 + srand(i * 29 + 11) * 5,
  dx: (srand(i * 31 + 13) - 0.5) * 40,
  dy: (srand(i * 37 + 17) - 0.5) * 40,
  op: 0.15 + srand(i * 41 + 19) * 0.35,
}));

/*
 * ── Skill card orbit radii ──
 * Slightly larger than the photo so cards float outside it.
 */
const ORBIT_A = 280;
const ORBIT_B = 145;

/* ════════════════════════════════════════════════════════════════ */

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ─── Background gradient ─── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg,#050816 0%,#020510 40%,#030712 70%,#050816 100%)',
        }}
      />

      {/* ─── Radial glow behind portrait area ─── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 42%,rgba(56,189,248,0.08) 0%,rgba(30,64,175,0.04) 40%,transparent 70%)',
        }}
      />

      {/* ─── Floating particles ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={
              {
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                background: `rgba(56,189,248,${p.op})`,
                boxShadow: `0 0 ${p.size * 2}px rgba(56,189,248,${p.op * 0.5})`,
                animation: `particle-drift ${p.dur}s ease-in-out ${p.delay}s infinite`,
                '--drift-x': `${p.dx}px`,
                '--drift-y': `${p.dy}px`,
                '--p-op': p.op,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ─── Animated light beams ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { r: -25, d: 0, a: 0.04 },
          { r: 40, d: 4, a: 0.03 },
          { r: 110, d: 8, a: 0.035 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: '-20%',
              left: '40%',
              width: '20%',
              height: '140%',
              background: `linear-gradient(180deg,transparent,rgba(56,189,248,${b.a}) 30%,rgba(56,189,248,${b.a * 1.5}) 50%,rgba(56,189,248,${b.a}) 70%,transparent)`,
              transform: `rotate(${b.r}deg)`,
              animation: `light-sweep 12s ease-in-out ${b.d}s infinite`,
              transformOrigin: 'center center',
            }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT — Centered photo + name
          ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl mx-auto px-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* ─── Central Portrait Container ─── */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            width: 'min(620px, 92vw)',
            height: 'min(560px, 62vh)',
            minHeight: '380px',
          }}
          variants={fadeScale}
        >
          {/* ═══ Radial aura glow behind photo ═══ */}
          <div
            className="pointer-events-none"
            style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle at center, rgba(56,189,248,0.22) 0%, rgba(129,140,248,0.12) 25%, rgba(56,189,248,0.06) 45%, transparent 65%)',
              filter: 'blur(40px)',
              zIndex: 0,
              animation: 'aura-pulse 4s ease-in-out infinite',
            }}
          />

          {/* ═══ Secondary warm aura ═══ */}
          <div
            className="pointer-events-none"
            style={{
              position: 'absolute',
              top: '48%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle at center, rgba(129,140,248,0.15) 0%, rgba(56,189,248,0.05) 40%, transparent 60%)',
              filter: 'blur(30px)',
              zIndex: 0,
              animation: 'aura-pulse 4s ease-in-out 2s infinite',
            }}
          />

          {/* ═══ Portrait — centered with floating animation ═══ */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 2,
              width: 'min(460px, 72vw)',
              height: 'min(500px, 58vh)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: '20px',
              /* Mask: fully visible head-to-chest, smooth fade from chest down */
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.15) 82%, transparent 92%)',
              maskImage:
                'linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.15) 82%, transparent 92%)',
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/images/imran-hero.png"
              alt="Mohammad Imran Hossain"
              width={600}
              height={780}
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'top center',
                width: '100%',
                height: '115%',
                filter:
                  'contrast(1.06) brightness(1.1) saturate(1.06)',
                WebkitFilter:
                  'contrast(1.06) brightness(1.1) saturate(1.06) drop-shadow(0 0 20px rgba(56,189,248,0.4)) drop-shadow(0 0 40px rgba(129,140,248,0.25)) drop-shadow(0 -10px 35px rgba(56,189,248,0.25))',
              }}
            />
          </motion.div>

          {/* ═══ Holographic scan line ═══ */}
          <div
            className="pointer-events-none"
            style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(400px, 65vw)',
              height: 'min(440px, 52vh)',
              overflow: 'hidden',
              zIndex: 3,
              opacity: 0.3,
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 50%, transparent 85%)',
              maskImage:
                'linear-gradient(to bottom, black 0%, black 50%, transparent 85%)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '2px',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.5) 25%, rgba(56,189,248,0.8) 50%, rgba(56,189,248,0.5) 75%, transparent 100%)',
                boxShadow:
                  '0 0 12px rgba(56,189,248,0.5), 0 0 25px rgba(56,189,248,0.15)',
                animation: 'holo-scan 4s ease-in-out infinite',
              }}
            />
          </div>

          {/* ═══ Floating skill cards on orbital path ═══ */}
          {skills.map(({ Icon, label, angle }, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * ORBIT_A;
            const y = Math.sin(rad) * ORBIT_B;

            return (
              <div
                key={label}
                className="absolute hidden md:block"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 5,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1 + i * 0.15,
                    duration: 0.5,
                    ease: 'backOut',
                  }}
                >
                  <div
                    style={{
                      animation: `icon-float ${3.5 + i * 0.4}s ease-in-out ${
                        i * 0.6
                      }s infinite`,
                    }}
                  >
                    {/* Glassmorphism card */}
                    <div
                      className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl cursor-default"
                      style={{
                        background: 'rgba(56,189,248,0.06)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(56,189,248,0.20)',
                        boxShadow:
                          '0 0 20px rgba(56,189,248,0.10), 0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(56,189,248,0.08)',
                      }}
                    >
                      <Icon className="text-[#38BDF8] text-lg" />
                      <span className="text-[10px] font-medium text-[#94A3B8] whitespace-nowrap tracking-wide">
                        {label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* ─── Name heading — animated entrance ─── */}
        <motion.h1
          className="font-outfit font-bold uppercase text-white tracking-wide mb-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none"
          style={{ marginTop: '0.5rem', position: 'relative', zIndex: 2 }}
          variants={fadeUp}
        >
          <motion.span
            className="inline-block"
            animate={{
              textShadow: [
                '0 0 20px rgba(56,189,248,0.0), 0 0 40px rgba(56,189,248,0.0)',
                '0 0 20px rgba(56,189,248,0.3), 0 0 60px rgba(56,189,248,0.15)',
                '0 0 20px rgba(56,189,248,0.0), 0 0 40px rgba(56,189,248,0.0)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            MOHAMMAD IMRAN{' '}
          </motion.span>
          <motion.span
            className="inline-block"
            style={{
              background:
                'linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #38BDF8 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            HOSSAIN
          </motion.span>
        </motion.h1>

        {/* ─── Typewriter tagline ─── */}
        <motion.div
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#94A3B8] mb-10 h-9"
          variants={fadeUp}
        >
          <TypeWriter
            strings={[
              'Digital Marketer',
              'Business Development Executive',
              'UI/UX Enthusiast',
              'Content Creator',
              'Marketing Graduate',
            ]}
          />
        </motion.div>

        {/* ─── CTA Buttons ─── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          variants={fadeUp}
        >
          <a
            href="/resume.pdf"
            download="Mohammad_Imran_Hossain_Resume.pdf"
            className="group relative inline-flex items-center gap-2.5 rounded-full border-2 border-[#38BDF8]/50 px-8 py-3.5 text-sm font-semibold text-[#38BDF8] transition-all duration-300 hover:border-[#38BDF8] hover:text-white hover:bg-[#38BDF8]/10 hover:shadow-[0_0_30px_#38bdf84d,0_0_60px_#38bdf81a]"
          >
            <HiOutlineDownload className="text-lg transition-transform duration-300 group-hover:-translate-y-0.5" />
            Download Resume
          </a>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2.5 rounded-full border-2 border-white/15 px-8 py-3.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-[#38BDF8]/40 hover:text-white hover:shadow-[0_0_20px_#38bdf826]"
          >
            <HiOutlineMail className="text-lg" />
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* ─── Scroll-down indicator ─── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#94A3B8]/60 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiChevronDown className="text-2xl" />
        </motion.div>
      </motion.div>
    </section>
  );
}
