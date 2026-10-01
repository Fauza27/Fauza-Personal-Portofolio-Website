import { ClientLayout } from '@/components/ClientLayout';
import { getProject, getProjects, toProjectSummary } from '@/lib/mdx';
import { SITE_CONFIG } from '@/lib/config';
import { JsonLd } from '@/components/JsonLd';
import { notFound } from 'next/navigation';
import { Github, ExternalLink, Calendar, TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/MDXComponents';
import { TableOfContents } from '@/components/TableOfContents';
import { FloatingBackButton } from '@/components/FloatingBackButton';
import { ProjectNavigation } from '@/components/ProjectNavigation';
import { ReadingProgress } from '@/components/ReadingProgress';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';
import { getVideoThumbnail } from '@/lib/media';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const shareImage = project.cover || getVideoThumbnail(project) || '/me.jpg';

  return {
    title: `${project.title} - Muhammad Fauza`,
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: 'website',
      url: `/projects/${slug}`,
      title: project.title,
      description: project.description,
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [shareImage],
    },
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  // Fetch all projects for navigation
  const allProjects = (await getProjects()).map(toProjectSummary);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${SITE_CONFIG.url}/projects/${slug}`,
    dateCreated: project.year,
    keywords: project.tech.join(", "),
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <ClientLayout>
      <JsonLd data={projectJsonLd} />
      {/* Floating Back Button */}
      <FloatingBackButton href="/projects" label="Back to Projects" />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      <main id="main-content" className="pt-16 sm:pt-10 pb-32 sm:pb-48">
        {/* Container with Sidebar */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 justify-center">
            {/* Left Sidebar - Table of Contents */}
            <aside className="hidden 2xl:flex flex-col gap-6 shrink-0 sticky top-24 h-fit">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all w-fit group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Projects</span>
              </Link>
              <TableOfContents />
            </aside>

            {/* Main Content - Centered */}
            <div className="w-full min-w-0 max-w-4xl">
              {/* Project Header */}
              <div className="mb-8 sm:mb-12">
                <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-20`} />
                  
                  <div className="relative z-10">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <span className="px-3 py-1.5 text-xs sm:text-sm glass rounded-full text-primary font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={16} />
                        {project.year}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <TrendingUp size={16} />
                        <span>Case study</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                      {project.title}
                    </h1>
                    {(project.problem || project.role || project.highlight) && (
                      <dl className="grid gap-4 sm:grid-cols-3 mb-6 sm:mb-8 rounded-2xl bg-background/60 p-4 sm:p-5 border border-foreground/10">
                        {project.problem && <div><dt className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Problem</dt><dd className="text-sm leading-relaxed text-foreground/85">{project.problem}</dd></div>}
                        {project.role && <div><dt className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">My role</dt><dd className="text-sm leading-relaxed text-foreground/85">{project.role}</dd></div>}
                        {project.highlight && <div><dt className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{project.highlightLabel || 'Outcome'}</dt><dd className="text-sm leading-relaxed text-foreground/85">{project.highlight}</dd></div>}
                      </dl>
                    )}

                    <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-3">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 6).map((tech) => (
                          <span key={tech} className="px-3 py-1.5 text-sm glass rounded-lg text-foreground/80 font-medium border border-foreground/10">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 6 && <span className="px-3 py-1.5 text-sm text-muted-foreground">+{project.tech.length - 6} more technologies</span>}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 sm:px-6 py-3 glass rounded-xl text-foreground hover:bg-foreground/10 transition-colors font-medium"
                        >
                          <Github size={18} />
                          View Code
                        </a>
                      ) : (
                        <div className="relative group">
                          <button
                            disabled
                            className="flex items-center gap-2 px-5 sm:px-6 py-3 glass rounded-xl text-foreground/40 cursor-not-allowed font-medium"
                          >
                            <Github size={18} />
                            View Code
                          </button>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
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
                          className="flex items-center gap-2 px-5 sm:px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8">
                <TableOfContents compact />
                {/* Video Section - Multiple Videos */}
                {project.videos && project.videos.length > 0 && (
                  <div className="mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">
                      Project Demos
                    </h2>
                    <div className="space-y-8">
                      {project.videos.map((video) => (
                        <div key={video.url}>
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                            {video.title}
                          </h3>
                          <YouTubeEmbed url={video.url} title={video.title} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Section - Single Video (backward compatibility) */}
                {!project.videos && project.video && (
                  <div className="mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                      Project Demo
                    </h2>
                    <YouTubeEmbed url={project.video} title={`${project.title} Demo`} />
                  </div>
                )}

                <div className="prose-custom" data-article-content>
                  <MDXRemote 
                    source={project.content} 
                    components={MDXComponents} 
                    options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="glass rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Interested in This Project?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let&apos;s discuss how I can help with your next project
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Right Sidebar - Project Navigation */}
            <ProjectNavigation currentSlug={slug} projects={allProjects} />
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
