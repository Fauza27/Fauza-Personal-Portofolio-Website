"use client";

import { motion } from "framer-motion";
import { Home, FolderKanban, FileText, User, Mail, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

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
      className="relative flex flex-col items-center gap-1.5 p-0 transition-all group"
      whileHover={{ scale: 1.15, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label={`Navigate to ${label}`}
      aria-current={isActive ? "page" : undefined}
    >
      <div
        className={`w-10 h-10 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
          isActive
            ? "bg-primary/20 text-primary shadow-lg"
            : "bg-foreground/5 text-foreground/60 group-hover:bg-foreground/10 group-hover:text-foreground/80"
        }`}
      >
        {icon}
      </div>
      <span
        className={`hidden sm:block text-xs font-medium transition-colors whitespace-nowrap ${
          isActive ? "text-primary" : "text-foreground/50"
        }`}
      >
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

  const handleNavClick = (path: string) => {
    if (pathname === "/" && path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(path);
    }
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <User size={20} />, label: "About", path: "/about" },
    { icon: <FolderKanban size={20} />, label: "Projects", path: "/projects" },
    { icon: <FileText size={20} />, label: "Blog", path: "/blog" },
    { icon: <Mail size={20} />, label: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-0.5rem)] sm:sticky sm:top-0 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:mx-auto sm:flex sm:w-fit sm:justify-center sm:pt-3"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center gap-1 sm:gap-3 px-2 sm:px-4 py-2 glass-strong rounded-2xl shadow-xl border border-foreground/15">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(`${item.path}/`));

          return (
            <DockItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive}
              onClick={() => handleNavClick(item.path)}
            />
          );
        })}

        <div className="hidden sm:block w-px h-10 bg-foreground/10 mx-1" />

        <motion.button
          onClick={onOpenSearch}
          className="relative hidden sm:flex flex-col items-center gap-1.5 p-0 group"
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label="Open search (⌘K)"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-foreground/5 text-foreground/60 group-hover:bg-foreground/10 group-hover:text-foreground/80 transition-all">
            <Search size={20} />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-foreground/50 whitespace-nowrap">
            Search
          </span>
        </motion.button>

        <ThemeToggle />
      </div>

    </motion.nav>
  );
};
