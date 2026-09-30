"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";
import type { BlogSummary } from "@/lib/mdx";

export function FeaturedBlog({ posts }: { posts: BlogSummary[] }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        <motion.article
          key={post.slug}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="min-w-0"
        >
          <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col rounded-2xl border border-foreground/15 bg-card/90 p-5 sm:p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary">
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CalendarDays size={14} />{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              <span className="inline-flex items-center gap-1"><Clock3 size={14} />{post.readTime}</span>
            </div>
            <h3 className="mb-3 line-clamp-3 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{post.title}</h3>
            <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-auto flex flex-wrap gap-2 border-t border-foreground/10 pt-4">
              {post.tags.slice(0, 2).map((tag) => <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{tag}</span>)}
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read article <ArrowRight size={16} /></span>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
