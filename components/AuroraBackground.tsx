'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const AuroraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause animations when tab is hidden to save battery
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(280,82%,5%)] via-[hsl(260,70%,8%)] to-[hsl(240,60%,8%)]" />
      
      {/* Aurora blobs - optimized for performance */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[60px] md:blur-[120px]"
        style={{
          background: 'radial-gradient(circle, hsl(270 100% 50% / 0.6) 0%, transparent 70%)',
          top: '10%',
          left: '20%',
          willChange: 'transform',
        }}
        animate={isVisible ? {
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[50px] md:blur-[100px]"
        style={{
          background: 'radial-gradient(circle, hsl(180 100% 50% / 0.5) 0%, transparent 70%)',
          top: '40%',
          right: '10%',
          willChange: 'transform',
        }}
        animate={isVisible ? {
          x: [0, -80, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.8, 1.1, 1],
        } : {}}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[40px] md:blur-[80px]"
        style={{
          background: 'radial-gradient(circle, hsl(300 100% 50% / 0.5) 0%, transparent 70%)',
          bottom: '10%',
          left: '30%',
          willChange: 'transform',
        }}
        animate={isVisible ? {
          x: [0, 60, -80, 0],
          y: [0, -40, 80, 0],
          scale: [1, 1.1, 0.85, 1],
        } : {}}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
