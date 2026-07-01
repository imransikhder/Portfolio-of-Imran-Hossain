"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ExperienceEntry {
  organization: string;
  role: string;
  responsibilities: string[];
}

const experiences: ExperienceEntry[] = [
  {
    organization: "Government Titumir College English Language Club",
    role: "Executive Member",
    responsibilities: [
      "Organized workshops",
      "Managed communication",
      "Promotional campaigns",
      "Event coordination",
    ],
  },
  {
    organization: "Government Titumir College Debating Club",
    role: "Cultural Affairs Secretary",
    responsibilities: [
      "Event management",
      "Debate competitions",
      "Audience engagement",
      "Social media promotion",
    ],
  },
  {
    organization: "Lal Sabuj Society",
    role: "Volunteer",
    responsibilities: [
      "Community campaigns",
      "Event planning",
      "Team collaboration",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Timeline Dot                                                       */
/* ------------------------------------------------------------------ */

function TimelineDot() {
  return (
    <div className="relative z-20 flex items-center justify-center">
      {/* outer pulse ring */}
      <span className="absolute w-6 h-6 rounded-full bg-[#38BDF8]/20 animate-ping" />
      {/* inner dot */}
      <span className="relative w-4 h-4 rounded-full bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience Card                                                    */
/* ------------------------------------------------------------------ */

function ExperienceCard({
  entry,
  index,
  side,
}: {
  entry: ExperienceEntry;
  index: number;
  side: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: side === "left" ? -60 : 60,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: side === "left" ? -60 : 60 }
      }
      transition={{
        duration: 0.6,
        delay: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="
        relative rounded-xl p-6
        border border-[rgba(56,189,248,0.1)]
        bg-[rgba(15,23,42,0.6)] backdrop-blur-md
        transition-colors duration-300
        hover:border-[rgba(56,189,248,0.25)]
        hover:shadow-[0_0_24px_rgba(56,189,248,0.06)]
      "
    >
      {/* Arrow pointing toward the timeline line */}
      <span
        className={`
          hidden md:block absolute top-6 w-3 h-3 rotate-45
          border-[rgba(56,189,248,0.1)] bg-[rgba(15,23,42,0.6)]
          ${
            side === "left"
              ? "right-[-7px] border-r border-t"
              : "left-[-7px] border-l border-b"
          }
        `}
      />

      <h3 className="text-white font-semibold text-base md:text-lg font-[var(--font-outfit)] leading-snug">
        {entry.organization}
      </h3>

      <p className="mt-1 text-[#38BDF8] text-sm font-medium tracking-wide">
        {entry.role}
      </p>

      <ul className="mt-4 space-y-2">
        {entry.responsibilities.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[#94A3B8] text-sm leading-relaxed"
          >
            <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#38BDF8]/60 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience Section                                                 */
/* ------------------------------------------------------------------ */

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  /* Scroll-linked line growth */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 40%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 bg-[#050816] overflow-hidden"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.04),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Experience" subtitle="MY JOURNEY" />

        {/* Timeline wrapper */}
        <div ref={timelineRef} className="relative mt-20">
          {/* -------- center line (static track) -------- */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-[rgba(56,189,248,0.12)] rounded-full" />

          {/* -------- center line (animated fill) -------- */}
          <motion.div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] rounded-full bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.5)]"
            style={{ height: lineHeight }}
          />

          {/* -------- entries -------- */}
          <div className="relative z-10 flex flex-col gap-12 md:gap-16">
            {experiences.map((entry, i) => {
              const isEven = i % 2 === 0;
              const side = isEven ? "left" : "right";

              return (
                <div
                  key={entry.organization}
                  className="
                    relative grid
                    grid-cols-[32px_1fr]
                    md:grid-cols-[1fr_32px_1fr]
                    items-start gap-4 md:gap-6
                  "
                >
                  {/* ---- Desktop left column ---- */}
                  <div
                    className={`hidden md:block ${
                      isEven ? "" : "order-3"
                    }`}
                  >
                    {isEven ? (
                      <ExperienceCard
                        entry={entry}
                        index={i}
                        side="left"
                      />
                    ) : (
                      /* empty spacer on odd rows */
                      <div aria-hidden />
                    )}
                  </div>

                  {/* ---- Dot column (always center) ---- */}
                  <div className="flex justify-center pt-6 md:order-2">
                    <TimelineDot />
                  </div>

                  {/* ---- Desktop right column ---- */}
                  <div
                    className={`hidden md:block ${
                      isEven ? "order-3" : ""
                    }`}
                  >
                    {!isEven ? (
                      <ExperienceCard
                        entry={entry}
                        index={i}
                        side="right"
                      />
                    ) : (
                      <div aria-hidden />
                    )}
                  </div>

                  {/* ---- Mobile card (always right of dot) ---- */}
                  <div className="md:hidden">
                    <ExperienceCard
                      entry={entry}
                      index={i}
                      side="right"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
