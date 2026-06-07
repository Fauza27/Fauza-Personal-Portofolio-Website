"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/mdx";

export function FeaturedBlog({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <motion.div
          key={post.slug}
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
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
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
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs glass rounded-lg text-foreground/70"
                    >
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
    </div>
  );
}
