"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import type { ProjectSummary } from "@/lib/mdx";

interface ProjectGalleryProps {
  projects: ProjectSummary[];
}

export function getVideoThumbnail(project: ProjectSummary) {
  const videoUrl = project.videos?.[0]?.url ?? project.video;
  if (!videoUrl) return null;

  try {
    const url = new URL(videoUrl);
    const id = url.hostname === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v");
    return id && /^[\w-]{11}$/.test(id) ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

export const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
  if (projects.length === 0) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => {
        const thumbnail = project.cover ?? getVideoThumbnail(project);

        return (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="min-w-0"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/15 bg-card/90 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div
                className={`relative flex h-44 items-end overflow-hidden p-5 bg-linear-to-br ${project.gradient}`}
                style={thumbnail ? { backgroundImage: `linear-gradient(to top, rgba(17, 10, 34, .82), rgba(17, 10, 34, .08)), url("${thumbnail}")`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              >
                {!thumbnail && <div className="absolute inset-x-5 top-5 rounded-xl border border-foreground/10 bg-background/40 p-3" aria-hidden="true"><span className="block text-[10px] font-bold uppercase tracking-wider text-primary">Product snapshot</span><span className="mt-1 block text-sm font-semibold leading-snug text-foreground">{project.highlight || project.description}</span></div>}
                <span className={`relative z-10 text-xs font-bold uppercase tracking-wider ${thumbnail ? "text-white" : "text-foreground/75"}`}>
                  {project.category}
                </span>
                {thumbnail && <span className="absolute right-5 top-5 rounded-full bg-black/55 p-2 text-white" aria-label="Video project available"><Play size={15} fill="currentColor" /></span>}
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Featured project {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mb-3 text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                {project.role && <p className="mb-2 text-sm text-foreground/85"><span className="font-semibold">Role:</span> {project.role}</p>}
                {project.highlight && <p className="mb-5 rounded-lg bg-primary/8 p-3 text-sm font-medium leading-relaxed text-foreground">{project.highlight}</p>}
                <div className="mt-auto flex flex-wrap gap-1.5 border-t border-foreground/10 pt-4">
                  {project.tech.slice(0, 3).map((tag) => <span key={tag} className="rounded-md bg-foreground/5 px-2 py-1 text-xs text-foreground/75">{tag}</span>)}
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">View case study <ArrowRight size={16} /></span>
              </div>
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
};
