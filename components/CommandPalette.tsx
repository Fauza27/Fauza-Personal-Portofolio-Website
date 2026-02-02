'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderKanban, FileText, User, Home, Mail, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const commands = [
  { id: 'home', label: 'Home', icon: Home, path: '/', category: 'Navigation' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/projects', category: 'Navigation' },
  { id: 'blog', label: 'Blog', icon: FileText, path: '/blog', category: 'Navigation' },
  { id: 'about', label: 'About', icon: User, path: '/about', category: 'Navigation' },
  { id: 'contact', label: 'Contact', icon: Mail, path: '/contact', category: 'Navigation' },
];

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return commands.filter(cmd =>
      cmd.label.toLowerCase().includes(lowerQuery) ||
      cmd.category.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const groupedCommands = useMemo(() => {
    return filteredCommands.reduce((acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    }, {} as Record<string, typeof commands>);
  }, [filteredCommands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        router.push(filteredCommands[selectedIndex].path);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filteredCommands, selectedIndex, router]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleFocusTrap);
    return () => window.removeEventListener('keydown', handleFocusTrap);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            ref={dialogRef}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
          >
            <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search size={20} className="text-muted-foreground" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search commands, projects..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search commands"
                  id="command-palette-title"
                />
                <kbd className="px-2 py-1 text-xs text-muted-foreground bg-white/5 rounded-md border border-white/10">
                  ESC
                </kbd>
              </div>
              
              <div className="max-h-80 overflow-y-auto py-2">
                {Object.entries(groupedCommands).map(([category, cmds]) => (
                  <div key={category}>
                    <div className="px-4 py-2 text-xs text-muted-foreground uppercase tracking-wider">
                      {category}
                    </div>
                    {cmds.map((cmd) => {
                      const globalIndex = filteredCommands.findIndex(c => c.id === cmd.id);
                      const Icon = cmd.icon;
                      return (
                        <motion.button
                          key={cmd.id}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            selectedIndex === globalIndex
                              ? 'bg-white/10 text-foreground'
                              : 'text-foreground/70 hover:bg-white/5'
                          }`}
                          onClick={() => {
                            router.push(cmd.path);
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <Icon size={18} />
                          <span className="flex-1">{cmd.label}</span>
                          <ArrowRight size={14} className="text-muted-foreground" />
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
                
                {filteredCommands.length === 0 && (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
