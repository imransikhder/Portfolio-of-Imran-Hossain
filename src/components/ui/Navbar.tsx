"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for navbar background intensity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect(id), {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop + Mobile Top Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
      >
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-full border transition-all duration-300 ${
            scrolled ? "shadow-lg shadow-[#38BDF8]/5" : ""
          }`}
          style={{
            background: "rgba(5, 8, 22, 0.8)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderColor: "rgba(56, 189, 248, 0.1)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="text-xl font-bold tracking-tight font-[family-name:var(--font-outfit)] select-none"
          >
            <span className="text-[#38BDF8]">I</span>
            <span className="text-white">mran</span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 group"
                  >
                    <span
                      className={`transition-colors duration-200 ${
                        isActive ? "text-[#38BDF8]" : "text-[#94A3B8] group-hover:text-white"
                      }`}
                    >
                      {link.label}
                    </span>
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#38BDF8] rounded-full transition-all duration-300 ${
                        isActive ? "w-4/5" : "w-0 group-hover:w-3/5"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] group"
            aria-label="Toggle mobile menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[2px] bg-[#94A3B8] group-hover:bg-white transition-colors rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[2px] bg-[#94A3B8] group-hover:bg-white transition-colors rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[2px] bg-[#94A3B8] group-hover:bg-white transition-colors rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-40 h-full w-72 md:hidden flex flex-col pt-24 px-6 border-l"
              style={{
                background: "rgba(5, 8, 22, 0.95)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderColor: "rgba(56, 189, 248, 0.1)",
              }}
            >
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      <button
                        onClick={() => scrollTo(link.href)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? "text-[#38BDF8] bg-[#38BDF8]/10"
                            : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Decorative accent line */}
              <div className="mt-auto mb-8">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent" />
                <p className="text-xs text-[#94A3B8]/50 text-center mt-4">
                  © 2026 Imran
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
