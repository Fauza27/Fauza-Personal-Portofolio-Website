'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const fraction = scrollable > 0 ? window.scrollY / scrollable : 0;
        setProgress(Math.round(Math.min(1, Math.max(0, fraction)) * 100));
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className="h-1 bg-linear-to-r from-primary via-accent to-primary"
        style={{ width: `${progress}%`, boxShadow: '0 -2px 10px rgba(168, 85, 247, 0.3)' }}
      />
    </div>
  );
}

