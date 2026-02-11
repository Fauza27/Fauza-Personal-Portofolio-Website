'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/mdx';

interface BlogClientProps {
  posts: BlogPost[];
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

export function BlogClient({ posts }: BlogClientProps) {
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
            <span className="text-foreground">Thoughts on</span>
            <br />
            <span className="text-gradient">Tech & Innovation</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring web development, AI, software engineering, and the latest tech trends. 
            Sharing knowledge and experiences from the field.
          </p>
        </motion.div>
      </section>

      {/* Posts Grid */}
      {posts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <motion.div
                key={post.slug}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="glass rounded-2xl p-6 h-full relative overflow-hidden cursor-pointer group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-white/5">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2.5 py-1 text-xs glass rounded-lg text-foreground/70">
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="px-2.5 py-1 text-xs glass rounded-lg text-muted-foreground">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>

                      <motion.div
                        className="flex items-center gap-2 text-sm text-primary font-medium"
                        whileHover={{ x: 5 }}
                      >
                        Read More <ArrowRight size={14} />
                      </motion.div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl sm:rounded-3xl p-12 sm:p-20 text-center"
          >
            <Sparkles size={48} className="mx-auto mb-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              More Content Coming Soon
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              I'm working on exciting new articles about web development, AI, and software engineering. 
              Check back soon for fresh insights!
            </p>
          </motion.div>
        </section>
      )}

      {/* Newsletter CTA */}
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
              Want to Stay Updated?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Get notified when I publish new articles about web development, AI, and software engineering.
            </p>
            
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
