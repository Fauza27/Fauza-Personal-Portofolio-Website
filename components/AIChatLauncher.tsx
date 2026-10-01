'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';

const AIChatWidget = dynamic(() => import('./AIChatWidget').then((module) => module.AIChatWidget), {
  ssr: false,
});

export function AIChatLauncher({ compact = false }: { compact?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`fixed right-4 z-40 glass-strong rounded-full flex items-center justify-center glow-purple transition-transform hover:scale-105 ${compact ? 'bottom-4 h-11 w-11' : 'bottom-32 sm:bottom-24 sm:right-6 w-14 h-14'}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
        aria-expanded={isOpen}
      >
        <Sparkles size={compact ? 20 : 24} className="text-primary" />
      </button>
      {isOpen && <AIChatWidget onClose={() => setIsOpen(false)} />}
    </>
  );
}
