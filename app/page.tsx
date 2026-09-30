import { BentoGrid } from "@/components/BentoGrid";
import { ProjectGallery } from "@/components/ProjectGallery";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { FeaturedAbout } from "@/components/FeaturedAbout";
import { FeaturedContact } from "@/components/FeaturedContact";
import { ClientLayout } from "@/components/ClientLayout";
import { JsonLd } from "@/components/JsonLd";
import type { SearchableItem } from "@/components/CommandPalette";
import {
  ArrowRight,
  Box,
  Edit3,
} from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { getProjects, getBlogPosts, toBlogSummary, toProjectSummary } from "@/lib/mdx";

export default async function Home() {
  const projects = await getProjects();
  const posts = await getBlogPosts();

  // Build searchable items for the command palette
  const searchItems: SearchableItem[] = [
    ...posts.map((p) => ({
      id: `blog-${p.slug}`,
      label: p.title,
      description: p.excerpt,
      path: `/blog/${p.slug}`,
      category: 'Blog' as const,
    })),
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      label: p.title,
      description: p.description,
      path: `/projects/${p.slug}`,
      category: 'Projects' as const,
    })),
  ];

  // Curate the strongest evidence for the target AI engineering role.
  const featuredSlugs = ['sentinel', 'my-jarvis-gua', 'voiceinvoice'];
  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project))
    .map(toProjectSummary);
  const featuredPosts = posts.slice(0, 3).map(toBlogSummary);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    jobTitle: "AI Software Engineer",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    email: `mailto:${SITE_CONFIG.email}`,
    sameAs: [SITE_CONFIG.social.github, SITE_CONFIG.social.linkedin],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "Computer Vision",
      "Full-Stack Development",
    ],
  };

  return (
    <ClientLayout searchItems={searchItems}>
      <JsonLd data={personJsonLd} />
      <main id="main-content" className="pt-12 sm:pt-6 pb-24 sm:pb-32 overflow-hidden">
        {/* --- Hero Section --- */}
        <section id="home" className="mb-12 sm:mb-20 scroll-mt-24">
          <BentoGrid projectCount={projects.length} />
        </section>

        {/* --- Featured Projects Section --- */}
        <section id="projects" className="mb-12 sm:mb-20 scroll-mt-24 w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 flex justify-between items-end">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl hidden sm:block">
                <Box size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <Box size={28} className="text-primary sm:hidden" />
                  Featured <span className="text-primary">Projects</span>
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  AI-powered applications that solve real-world problems.
                </p>
              </div>
            </div>
            <Link
              href="/projects"
              className="text-primary hover:text-primary/80 hidden sm:flex items-center gap-2 text-sm font-medium shrink-0"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
             <ProjectGallery projects={featuredProjects} />
          </div>
        </section>

        {/* --- About Section --- */}
        <section
          id="about"
          className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24 scroll-mt-24"
        >
          <FeaturedAbout />
        </section>

        {/* --- Featured Blog Section --- */}
        <section
          id="blog"
          className="w-full mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 flex justify-between items-end">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl hidden sm:block">
                <Edit3 size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <Edit3 size={28} className="text-primary sm:hidden" />
                  Latest <span className="text-primary">Articles</span>
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Engineering decisions and lessons from building AI products.
                </p>
              </div>
            </div>
            <Link
              href="/blog"
              className="text-primary hover:text-primary/80 hidden sm:flex items-center gap-2 text-sm font-medium"
            >
              View all posts <ArrowRight size={16} />
            </Link>
          </div>

          <FeaturedBlog posts={featuredPosts} />
          <div className="mt-8 sm:hidden flex justify-center">
            <Link
              href="/blog"
              className="text-primary hover:text-primary/80 flex items-center gap-2 text-sm font-medium"
            >
              View All Posts <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section
          id="contact"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 scroll-mt-24"
        >
          <FeaturedContact />
        </section>

      </main>
    </ClientLayout>
  );
}
