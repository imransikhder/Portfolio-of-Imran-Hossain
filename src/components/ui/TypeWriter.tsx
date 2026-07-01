"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TypeWriterProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypeWriter({
  strings,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = "",
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [stringIndex, setStringIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentString = strings[stringIndex] || "";

  const tick = useCallback(() => {
    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return;
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
        return;
      }
      timeoutRef.current = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      if (displayText.length === currentString.length) {
        setIsPaused(true);
        return;
      }
      timeoutRef.current = setTimeout(() => {
        setDisplayText(currentString.slice(0, displayText.length + 1));
      }, typingSpeed);
    }
  }, [
    displayText,
    isDeleting,
    isPaused,
    currentString,
    strings.length,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  useEffect(() => {
    tick();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick]);

  return (
    <span className={`text-[#38BDF8] ${className}`}>
      {displayText}
      <span className="animate-pulse font-light text-[#38BDF8]/80">|</span>
    </span>
  );
}
