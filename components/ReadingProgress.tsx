'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40"
      role="progressbar"
      aria-label={`Reading progress: ${Math.round(progress)}%`}
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Progress bar - simple dan tidak mengganggu */}
      <motion.div
        className="h-1 bg-linear-to-r from-primary via-accent to-primary"
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 -2px 10px rgba(168, 85, 247, 0.3)'
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          duration: 0.15,
          ease: 'easeOut'
        }}
      />
    </div>
  );
}
