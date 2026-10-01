'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Calendar, FolderKanban } from 'lucide-react';
import Link from 'next/link';
import type { ProjectSummary } from '@/lib/mdx';
import { getVideoThumbnail } from '@/lib/media';

interface ProjectsClientProps {
  projects: ProjectSummary[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectsClient({ projects }: ProjectsClientProps) {
  return (
    <main id="main-content" className="pt-14 sm:pt-10 pb-24 sm:pb-32">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">AI Projects</span> Built
            <br />
            <span className="text-foreground">End to End</span>
          </h1>
          
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the problems, my contributions, and the working demos behind each AI and machine learning project.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => {
            const isFeatured = index === 0 && projects.length % 2 === 1;
            const preview = project.cover || getVideoThumbnail(project);

            return (
            <motion.div
              key={project.slug}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative ${isFeatured ? 'md:col-span-2' : ''}`}
            >
              <div className={`glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 h-full relative overflow-hidden group flex flex-col ${isFeatured ? 'lg:flex-row lg:gap-7' : ''}`}>
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <Link href={`/projects/${project.slug}`} className={`relative z-10 block mb-4 overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-primary ${isFeatured ? 'lg:mb-0 lg:w-[42%] lg:shrink-0' : ''}`} aria-label={`View ${project.title} case study`}>
                  {preview ? (
                    <div
                      className={`h-32 sm:h-40 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02] ${isFeatured ? 'lg:h-full lg:min-h-72' : ''}`}
                      style={{ backgroundImage: `linear-gradient(to top, rgba(17, 10, 34, .4), transparent), url("${preview}")` }}
                    />
                  ) : (
                    <div className={`h-32 sm:h-40 flex items-center justify-center gap-3 bg-linear-to-br ${project.gradient} border border-foreground/10 ${isFeatured ? 'lg:h-full lg:min-h-72' : ''}`}>
                      <FolderKanban size={28} aria-hidden="true" className="text-primary/75" />
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/65">Project case study</span>
                    </div>
                  )}
                </Link>
                <div className="relative z-10 flex min-w-0 flex-1 flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 text-[11px] glass rounded-full text-primary font-medium uppercase tracking-wider">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar size={14} />
                          {project.year}
                        </div>
                      </div>
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                    </div>
                    <Link href={`/projects/${project.slug}`}>
                      <motion.div
                        className="p-2.5 glass rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1, rotate: 45 }}
                      >
                        <ArrowRight size={20} className="text-primary" />
                      </motion.div>
                    </Link>
                  </div>

                  {/* Description */}
                  <Link href={`/projects/${project.slug}`}>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </Link>

                  {project.role && <p className="mb-2 text-sm text-foreground/85"><span className="font-semibold">My role:</span> {project.role}</p>}
                  {project.highlight && <p className="mb-4 rounded-lg bg-primary/8 px-3 py-2 text-sm font-medium text-foreground">{project.highlight}</p>}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-foreground/10">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-3 py-1.5 text-xs glass rounded-lg text-foreground/70 font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1.5 text-xs glass rounded-lg text-muted-foreground">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto flex items-center gap-3">
                    <Link href={`/projects/${project.slug}`}>
                      <motion.div
                        className="flex items-center gap-2 text-sm font-medium text-primary"
                        whileHover={{ x: 5 }}
                      >
                        View Case Study <ArrowRight size={16} />
                      </motion.div>
                    </Link>
                    <div className="flex gap-2 ml-auto">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View source code for ${project.title}`}
                          className="p-2 glass rounded-lg text-foreground/70 hover:text-foreground transition-colors relative z-20"
                        >
                          <Github size={16} />
                        </a>
                      ) : (
                        <div className="relative group/tooltip">
                          <div className="p-2 glass rounded-lg text-foreground/30 cursor-not-allowed">
                            <Github size={16} />
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            Closed Source
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/90" />
                          </div>
                        </div>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live demo for ${project.title}`}
                          className="p-2 glass rounded-lg text-foreground/70 hover:text-foreground transition-colors relative z-20"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Interested in Working Together?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Let&apos;s Talk
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
