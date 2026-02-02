'use client';

import { motion } from 'framer-motion';
import { Home, FolderKanban, FileText, User, Mail, Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const DockItem = ({ icon, label, isActive, onClick }: DockItemProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-lg sm:rounded-xl transition-all min-w-[60px] sm:min-w-[70px]"
      whileHover={{ scale: 1.1, y: -8 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label={`Navigate to ${label}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className={`transition-colors ${isActive ? 'text-primary' : 'text-foreground/70'}`}>
        {icon}
      </div>
      <span className={`text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap ${isActive ? 'text-primary' : 'text-foreground/60'}`}>
        {label}
      </span>
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

interface FloatingDockProps {
  onOpenSearch: () => void;
}

export const FloatingDock = ({ onOpenSearch }: FloatingDockProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <FolderKanban size={20} />, label: 'Projects', path: '/projects' },
    { icon: <FileText size={20} />, label: 'Blog', path: '/blog' },
    { icon: <User size={20} />, label: 'About', path: '/about' },
    { icon: <Mail size={20} />, label: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="flex items-center gap-1 px-2 sm:px-3 py-2 glass-strong rounded-xl sm:rounded-2xl shadow-2xl border border-white/10">
        {navItems.map((item) => (
          <DockItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={pathname === item.path}
            onClick={() => router.push(item.path)}
          />
        ))}
        
        <div className="w-px h-10 sm:h-12 bg-white/10 mx-1" />
        
        <motion.button
          onClick={onOpenSearch}
          className="relative flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-lg sm:rounded-xl text-foreground/70 hover:text-foreground transition-all min-w-[60px] sm:min-w-[70px]"
          whileHover={{ scale: 1.1, y: -8 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label="Open search (⌘K)"
        >
          <Search size={20} />
          <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">Search</span>
        </motion.button>
      </div>
      
      <div className="hidden sm:block text-center mt-2">
        <span className="text-[10px] text-muted-foreground/50">Press ⌘K to search</span>
      </div>
    </motion.nav>
  );
};
