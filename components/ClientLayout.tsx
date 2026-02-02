'use client';

import { useState, useEffect } from 'react';
import { AuroraBackground } from './AuroraBackground';
import { FloatingDock } from './FloatingDock';
import { CommandPalette } from './CommandPalette';
import { AIChatWidget } from './AIChatWidget';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Skip to content link - hidden off-screen, only visible on keyboard focus */}
      <a
        href="#main-content"
        className="fixed -translate-y-full opacity-0 left-4 top-0 z-[100] px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg focus:translate-y-4 focus:opacity-100 transition-all duration-200"
      >
        Skip to content
      </a>

      <AuroraBackground />
      <FloatingDock onOpenSearch={() => setIsCommandOpen(true)} />
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      <AIChatWidget />
      {children}
    </>
  );
}
