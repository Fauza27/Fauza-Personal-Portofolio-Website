"use client";

import { motion } from "framer-motion";
import { Home, FolderKanban, FileText, User, Mail, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

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
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all ${
          isActive
            ? "bg-white/20 text-white shadow-lg"
            : "bg-white/5 text-foreground/60 group-hover:bg-white/10 group-hover:text-foreground/80"
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-[9px] sm:text-[10px] font-medium transition-colors whitespace-nowrap ${
          isActive ? "text-white" : "text-foreground/50"
        }`}
      >
        {label}
      </span>
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60"
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
  const [activeHash, setActiveHash] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const isDetailPage = pathname.startsWith('/blog/') || pathname.startsWith('/projects/');
  const shouldEnlarge = !isDetailPage || isHovered;

  useEffect(() => {
    if (pathname !== "/") return;

    // Set initial hash
    setActiveHash(window.location.hash);

    const sectionIds = ["home", "about", "projects", "blog", "contact"];
    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = `#${entry.target.id}`;
          if (entry.isIntersecting) {
            visibleSections.add(id);
          } else {
            visibleSections.delete(id);
          }
        });

        // Pick the topmost visible section
        if (visibleSections.size > 0) {
          const orderedHash = sectionIds
            .map((id) => `#${id}`)
            .find((id) => visibleSections.has(id));
          if (orderedHash) {
            const newHash = orderedHash === "#home" ? "" : orderedHash;
            setActiveHash(newHash);
            window.history.replaceState(null, "", newHash ? `/${newHash}` : "/");
          }
        }
      },
      { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (path: string) => {
    if (pathname === "/" && path.startsWith("/#")) {
      const hash = path.replace("/", "");
      setActiveHash(hash);
      window.history.pushState(null, "", path);
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (pathname === "/" && path === "/") {
      setActiveHash("");
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(path);
    }
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <User size={20} />, label: "About", path: "/#about" },
    { icon: <FolderKanban size={20} />, label: "Projects", path: "/#projects" },
    { icon: <FileText size={20} />, label: "Blog", path: "/#blog" },
    { icon: <Mail size={20} />, label: "Contact", path: "/#contact" },
  ];

  return (
    <motion.nav
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 origin-bottom"
      initial={{ y: 100, opacity: 0, scale: isDetailPage ? 0.85 : 1 }}
      animate={{ 
        y: 0, 
        opacity: shouldEnlarge ? 1 : 0.5, 
        scale: shouldEnlarge ? 1 : 0.85 
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 glass-strong rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-white/15">
        {navItems.map((item) => {
          const isActive =
            item.path.startsWith("/#")
              ? activeHash === item.path.slice(1)
              : pathname === item.path && (item.path !== "/" || !activeHash || activeHash === "#home");

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

        <div className="w-px h-12 sm:h-14 bg-white/10 mx-1 sm:mx-2" />

        <motion.button
          onClick={onOpenSearch}
          className="relative flex flex-col items-center gap-1.5 p-0 group"
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label="Open search (⌘K)"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl flex items-center justify-center bg-white/5 text-foreground/60 group-hover:bg-white/10 group-hover:text-foreground/80 transition-all">
            <Search size={20} />
          </div>
          <span className="text-[9px] sm:text-[10px] font-medium text-foreground/50 whitespace-nowrap">
            Search
          </span>
        </motion.button>
      </div>

      <div className="hidden sm:block text-center mt-2">
        <span className="text-[10px] text-muted-foreground/50">
          Press ⌘K to search
        </span>
      </div>
    </motion.nav>
  );
};
