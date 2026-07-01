"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseFollowLight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -1000, y: -1000 });
  const currentRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // Lerp animation loop for smooth follow
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08);
      setPosition({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  // Hide on touch-only devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window && !window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full transition-opacity duration-500"
        style={{
          width: 800,
          height: 800,
          left: position.x - 400,
          top: position.y - 400,
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.05) 35%, transparent 70%)",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
