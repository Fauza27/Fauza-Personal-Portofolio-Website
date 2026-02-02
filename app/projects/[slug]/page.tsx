import { ClientLayout } from '@/components/ClientLayout';
import { getProject, getProjects } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Github, ExternalLink, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import { TableOfContents } from '@/components/TableOfContents';
import { FloatingBackButton } from '@/components/FloatingBackButton';

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

  return {
    title: `${project.title} - Muhammad Fauza`,
    description: project.description,
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <ClientLayout>
      {/* Floating Back Button */}
      <FloatingBackButton href="/projects" label="Back to Projects" />

      <main className="pt-20 sm:pt-24 pb-24 sm:pb-32">
        {/* Container with Sidebar */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 justify-center">
            {/* Left Sidebar - Table of Contents */}
            <aside className="hidden xl:block shrink-0">
              <TableOfContents />
            </aside>

            {/* Main Content - Centered */}
            <div className="w-full max-w-4xl">
              {/* Project Header */}
              <div className="mb-8 sm:mb-12">
                <div className={`glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden`}>
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
                        <span>Featured Project</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                      {project.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-3">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 text-sm glass rounded-lg text-foreground/80 font-medium border border-white/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 sm:px-6 py-3 glass rounded-xl text-foreground hover:bg-white/10 transition-colors font-medium"
                        >
                          <Github size={18} />
                          View Code
                        </a>
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
                <div className="prose-custom">
                  <MDXRemote source={project.content} components={MDXComponents} />
                </div>
              </div>

              {/* Navigation */}
              <div className="glass rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Interested in This Project?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss how I can help with your next project
                </p>
                <Link href="/contact">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                    Get in Touch
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Spacer for Balance */}
            <div className="hidden xl:block w-64 shrink-0" />
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
