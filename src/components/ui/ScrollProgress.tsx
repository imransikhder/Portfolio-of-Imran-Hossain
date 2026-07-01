"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #38BDF8, #7DD3FC)",
        boxShadow: "0 0 10px rgba(56, 189, 248, 0.5), 0 0 30px rgba(56, 189, 248, 0.2)",
      }}
    />
  );
}
