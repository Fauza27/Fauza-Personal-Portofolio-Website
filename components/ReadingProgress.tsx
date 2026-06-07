'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export function ReadingProgress() {
  const scrollProgress = useMotionValue(0);
  const width = useTransform(scrollProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.set(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [scrollProgress]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      role="progressbar"
      aria-label="Reading progress"
    >
      <motion.div
        className="h-1 bg-linear-to-r from-primary via-accent to-primary"
        style={{ width, boxShadow: '0 -2px 10px rgba(168, 85, 247, 0.3)' }}
      />
    </div>
  );
}

