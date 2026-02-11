'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/mdx';

interface ProjectNavigationProps {
  currentSlug: string;
  projects: Project[];
}

export function ProjectNavigation({ currentSlug, projects }: ProjectNavigationProps) {
  // Filter out current project and limit to 5
  const otherProjects = projects
    .filter((project) => project.slug !== currentSlug)
    .slice(0, 5);

  // Don't render if no other projects
  if (otherProjects.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-[280px] shrink-0">
      <div className="sticky top-24">
        <nav aria-label="Other projects" className="glass rounded-2xl p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
        <h4 
          id="other-projects-heading" 
          className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4"
        >
          Other Projects
        </h4>
        
        <ul 
          aria-labelledby="other-projects-heading"
          className="space-y-3"
        >
          {otherProjects.map((project, index) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                href={`/projects/${project.slug}`}
                aria-label={`Navigate to ${project.title}`}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-xl p-4 border border-white/5 transition-all duration-200 hover:scale-102 hover:bg-white/5">
                  {/* Gradient background on hover */}
                  <div 
                    className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  
                  <div className="relative z-10 flex flex-col gap-2">
                    {/* Category badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 text-xs glass rounded-full text-primary font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ x: 3 }}
                      >
                        <ArrowRight size={14} className="text-primary" />
                      </motion.div>
                    </div>
                    
                    {/* Title */}
                    <h5 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h5>
                    
                    {/* Year */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      </div>
    </aside>
  );
}
