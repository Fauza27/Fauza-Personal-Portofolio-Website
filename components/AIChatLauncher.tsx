'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';

const AIChatWidget = dynamic(() => import('./AIChatWidget').then((module) => module.AIChatWidget), {
  ssr: false,
});

export function AIChatLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-32 sm:bottom-24 right-4 sm:right-6 z-40 w-14 h-14 glass-strong rounded-full flex items-center justify-center glow-purple transition-transform hover:scale-105"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
        aria-expanded={isOpen}
      >
        <Sparkles size={24} className="text-primary" />
      </button>
      {isOpen && <AIChatWidget onClose={() => setIsOpen(false)} />}
    </>
  );
}
