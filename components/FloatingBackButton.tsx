'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface FloatingBackButtonProps {
  href: string;
  label: string;
}

export function FloatingBackButton({ href, label }: FloatingBackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed top-20 left-4 sm:left-6 xl:left-[max(1.5rem,calc((100vw-1600px)/2+1.5rem))] z-50 flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all shadow-lg group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium hidden sm:inline">{label}</span>
    </motion.button>
  );
}
