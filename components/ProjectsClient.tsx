'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Calendar } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/mdx';

interface ProjectsClientProps {
  projects: Project[];
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
    <main className="pt-20 sm:pt-24 pb-24 sm:pb-32">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Projects</span> That Make
            <br />
            <span className="text-foreground">An Impact</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovation through code. From AI-powered systems to scalable web applications, 
            each project demonstrates technical excellence and real-world impact.
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
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className={`glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full relative overflow-hidden cursor-pointer group`}>
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 text-xs glass rounded-full text-primary font-medium uppercase tracking-wider">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar size={14} />
                          {project.year}
                        </div>
                      </div>
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
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
                    <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </Link>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-white/5">
                    {project.tech.slice(0, 5).map((tech) => (
                      <span key={tech} className="px-3 py-1.5 text-xs glass rounded-lg text-foreground/70 font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="px-3 py-1.5 text-xs glass rounded-lg text-muted-foreground">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
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
          ))}
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
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Talk
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
