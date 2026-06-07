"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/mdx";

interface ProjectGalleryProps {
  projects: Project[];
}

// Helper to get accent color based on category
const getAccentColor = (category: string) => {
  const colors: Record<string, string> = {
    "AI & Full-Stack": "text-purple-400",
    "AI & LLM": "text-green-400",
    "Machine Learning": "text-blue-400",
    "Data Science": "text-orange-400",
    "AI Engineering": "text-cyan-400",
  };
  return colors[category] || "text-primary";
};

export const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  return (
    <section className="py-4 relative">
      {/* Scroll Progress */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
          />
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 px-4 sm:px-6 snap-x snap-proximity scrollbar-hide scroll-smooth-x"
        style={{ touchAction: "pan-x" }}
      >
        <div className="flex-shrink-0 w-2 sm:w-[calc((100vw-1200px)/2+24px)] sm:max-w-[200px]" />

        {projects.map((project) => (
          <div
            key={project.slug}
            className="flex-shrink-0 w-[300px] sm:w-[400px] md:w-[500px] snap-center"
            style={{ willChange: "transform" }}
          >
            <Link href={`/projects/${project.slug}`}>
              <motion.div
                className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-[320px] sm:h-[400px] flex flex-col justify-between relative overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span
                      className={`text-xs font-medium ${getAccentColor(project.category)}`}
                    >
                      {project.category} • {project.year}
                    </span>
                    <motion.div
                      className="p-1.5 sm:p-2 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink
                        size={14}
                        className="sm:w-4 sm:h-4 text-foreground"
                      />
                    </motion.div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs glass rounded-full text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        ))}

        <div className="flex-shrink-0 w-2 sm:w-[calc((100vw-1200px)/2+24px)] sm:max-w-[200px]" />
      </div>
    </section>
  );
};
