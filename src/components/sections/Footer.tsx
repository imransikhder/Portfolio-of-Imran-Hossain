"use client";

import { motion } from "motion/react";

export default function Footer() {
  const scrollToTop = () => {
    const el = document.getElementById("home");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#050816]">
      {/* Accent top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full border border-[#38BDF8]/20 bg-[#0F172A]/60 backdrop-blur-xl flex items-center justify-center text-[#38BDF8] hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/10 transition-all duration-300 mb-2"
            aria-label="Back to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </motion.button>

          {/* Copyright */}
          <p className="text-[#94A3B8] text-sm">
            © 2024 Mohammad Imran Hossain. All rights reserved.
          </p>

          {/* Built with */}
          <p className="text-[#94A3B8]/60 text-xs">
            Built with <span className="text-red-400">❤️</span> and{" "}
            <span className="text-[#38BDF8]">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
