'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FloatingBackButtonProps {
  href: string;
  label: string;
}

const MotionLink = motion(Link);

export function FloatingBackButton({ href, label }: FloatingBackButtonProps) {
  return (
    <MotionLink
      href={href}
      className="fixed top-20 left-4 sm:left-6 z-50 flex xl:hidden items-center gap-2 px-4 py-2.5 glass rounded-xl text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all shadow-lg group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium hidden sm:inline">{label}</span>
    </MotionLink>
  );
}

