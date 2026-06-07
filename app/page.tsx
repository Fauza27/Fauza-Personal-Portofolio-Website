import { BentoGrid } from "@/components/BentoGrid";
import { ProjectGallery } from "@/components/ProjectGallery";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { FeaturedAbout } from "@/components/FeaturedAbout";
import { FeaturedContact } from "@/components/FeaturedContact";
import { ClientLayout } from "@/components/ClientLayout";
import {
  ArrowRight,
  Github,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { getProjects, getBlogPosts } from "@/lib/mdx";

export default async function Home() {
  const projects = await getProjects();
  const posts = await getBlogPosts();

  // Ambil beberapa project & blog post terbaru untuk di-featured
  const featuredProjects = projects.slice(0, 4);
  const featuredPosts = posts.slice(0, 3);

  return (
    <ClientLayout>
      <main id="main-content" className="pt-16 sm:pt-20 pb-24 sm:pb-32">
        {/* --- Hero Section --- */}
        <section id="home" className="mb-12 sm:mb-20 scroll-mt-24">
          <BentoGrid />
        </section>

        {/* --- About Section --- */}
        <section
          id="about"
          className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 scroll-mt-24"
        >
          <FeaturedAbout />
        </section>

        {/* --- Featured Projects Section --- */}
        <section id="projects" className="mb-12 sm:mb-20 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Showcasing innovation through code
              </p>
            </div>
            <Link
              href="/projects"
              className="text-primary hover:text-primary/80 hidden sm:flex items-center gap-2 text-sm font-medium"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <ProjectGallery projects={featuredProjects} />
        </section>

        {/* --- Featured Blog Section --- */}
        <section
          id="blog"
          className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Latest <span className="text-gradient">Writings</span>
            </h2>
            <Link
              href="/blog"
              className="text-primary hover:text-primary/80 hidden sm:flex items-center gap-2 text-sm font-medium"
            >
              View All <ArrowRight size={16} />
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 scroll-mt-24">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Let&apos;s Build Something{" "}
                <span className="text-gradient">Extraordinary</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6 sm:mb-8">
                Whether you need a scalable web application, AI integration, or
                a complete digital transformation — I&apos;m here to help.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm sm:text-base hover:bg-primary/90 transition-colors"
                >
                  Start a Conversation
                  <ArrowRight size={18} />
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href={SITE_CONFIG.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 glass rounded-xl text-foreground/70 hover:text-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={18} className="sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 glass rounded-xl text-foreground/70 hover:text-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} className="sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
