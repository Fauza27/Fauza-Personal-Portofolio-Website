'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Sparkles, GraduationCap, Rocket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';

const techStack = SITE_CONFIG.techStack;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export const BentoGrid = () => {
  return (
    <motion.div
      className="bento-grid max-w-6xl mx-auto px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Card - 2x2 on desktop, full width on mobile */}
      <motion.div
        className="col-span-1 sm:col-span-2 row-span-1 sm:row-span-2 glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group min-h-[280px] sm:min-h-0"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4">
            <span className="text-gradient">Building</span>
            <br />
            <span className="text-foreground">Real-World AI</span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-md">
            I’m Muhammad Fauza, an AI Engineer who builds production-ready applications by integrating machine learning, LLMs, and intelligent systems into full-stack software.
          </p>
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6">
          <Link href="/projects">
            <motion.button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm sm:text-base"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
              <ArrowUpRight size={18} />
            </motion.button>
          </Link>
          <Link href="/contact">
            <motion.button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 glass rounded-xl text-foreground/80 hover:text-foreground text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Profile Photo Card - hidden on mobile, shown on tablet+ */}
      <motion.div
        className="hidden sm:flex col-span-1 row-span-2 glass rounded-2xl sm:rounded-3xl p-6 items-center justify-center relative overflow-hidden group"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden mb-4"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/me.jpg"
              alt="Muhammad Fauza"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </motion.div>
          
          <div className="text-center">
            <p className="text-sm font-medium text-foreground mb-1">Muhammad Fauza</p>
            <p className="text-xs text-muted-foreground">AI Software Engineer</p>
          </div>
        </div>
      </motion.div>

      {/* Current what i build Card */}
      <motion.div
        className="col-span-1 row-span-1 glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-h-[120px] relative overflow-hidden group"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">What I Build</span>
          </div>
          <div>
            <p className="text-base sm:text-lg font-medium text-foreground">AI-powered full-stack applications</p>
            <p className="text-sm text-muted-foreground">LLMs, RAG & AI Systems</p>
          </div>
        </div>
      </motion.div>

      {/* Education Card */}
      <motion.div
        className="col-span-1 row-span-1 glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-h-[120px] relative overflow-hidden group"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Education</span>
          </div>
          <div>
            <p className="text-base sm:text-lg font-medium text-foreground">Computer Science</p>
            <p className="text-sm text-muted-foreground">3.73 / 4.00 GPA</p>
          </div>
        </div>
      </motion.div>

      {/* Projects Count Card */}
      <motion.div
        className="col-span-1 row-span-1 glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-center items-center text-center min-h-[120px] relative overflow-hidden group"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Rocket size={18} className="text-primary" />
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-gradient">2+</p>
          <p className="text-xs sm:text-sm text-muted-foreground">End-to-End AI Projects</p>
        </div>
      </motion.div>

      {/* Tech Stack Card - Wide */}
      <motion.div
        className="col-span-1 sm:col-span-3 row-span-1 glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 overflow-hidden relative"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Sparkles size={16} className="text-primary" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Tech Stack</p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-linear-to-r from-card to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-linear-to-l from-card to-transparent z-10" />
          
          <motion.div
            className="flex gap-3 sm:gap-4 animate-marquee"
            initial={{ x: 0 }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 glass rounded-lg sm:rounded-xl"
              >
                <span className={`text-xs sm:text-sm font-medium bg-linear-to-r ${tech.color} bg-clip-text text-transparent`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
