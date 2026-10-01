'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { AuroraBackground } from './AuroraBackground';
import { FloatingDock } from './FloatingDock';
import type { SearchableItem } from './CommandPalette';
import { AIChatLauncher } from './AIChatLauncher';

const CommandPalette = dynamic(() => import('./CommandPalette').then((module) => module.CommandPalette), {
  ssr: false,
});

interface ClientLayoutProps {
  children: React.ReactNode;
  searchItems?: SearchableItem[];
  compactDock?: boolean;
}

export function ClientLayout({ children, searchItems, compactDock = false }: ClientLayoutProps) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const mainRoutes = ['/', '/projects', '/blog'];
    if (!mainRoutes.includes(pathname)) return;

    const destinations = mainRoutes.filter((route) => route !== pathname);
    const prefetch = () => destinations.forEach((route) => router.prefetch(route));

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(prefetch, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(prefetch, 300);
    return () => clearTimeout(timer);
  }, [pathname, router]);

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
      <FloatingDock onOpenSearch={() => setIsCommandOpen(true)} compact={compactDock} />
      {isCommandOpen && (
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          searchItems={searchItems}
        />
      )}
      <AIChatLauncher compact={compactDock} />
      {children}
    </>
  );
}
