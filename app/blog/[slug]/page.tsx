import { ClientLayout } from '@/components/ClientLayout';
import { getBlogPost, getBlogPosts, getProject, toBlogSummary } from '@/lib/mdx';
import { SITE_CONFIG } from '@/lib/config';
import { JsonLd } from '@/components/JsonLd';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/MDXComponents';
import { TableOfContents } from '@/components/TableOfContents';
import { FloatingBackButton } from '@/components/FloatingBackButton';
import { ReadingProgress } from '@/components/ReadingProgress';
import { BlogNavigation } from '@/components/BlogNavigation';
import { ShareButton } from '@/components/ShareButton';
import { getVideoThumbnail } from '@/lib/media';

const projectSlugs: Record<string, string> = {
  'sentinel-predictive-maintenance': 'sentinel',
  'food-recommendation-chatbot': 'food-chatbot',
  'customer-churn-prediction': 'customer-churn',
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  const relatedProject = await getProject(projectSlugs[slug] ?? slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Muhammad Fauza`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [relatedProject?.cover || (relatedProject && getVideoThumbnail(relatedProject)) || '/me.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [relatedProject?.cover || (relatedProject && getVideoThumbnail(relatedProject)) || '/me.jpg'],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedProject = await getProject(projectSlugs[slug] ?? slug);

  // Fetch all blog posts for navigation
  const allPosts = (await getBlogPosts()).map(toBlogSummary);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: SITE_CONFIG.url,
    },
    keywords: post.tags.join(", "),
    url: `${SITE_CONFIG.url}/blog/${slug}`,
    mainEntityOfPage: `${SITE_CONFIG.url}/blog/${slug}`,
  };

  return (
    <ClientLayout>
      <JsonLd data={articleJsonLd} />
      {/* Floating Back Button */}
      <FloatingBackButton href="/blog" label="Back to Blog" />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      <main id="main-content" className="pt-16 sm:pt-10 pb-32 sm:pb-48">
        {/* Container with Sidebar */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 justify-center">
            {/* Left Sidebar - Table of Contents */}
            <aside className="hidden 2xl:flex flex-col gap-6 shrink-0 sticky top-24 h-fit">
              <Link
                href="/blog"
                className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all w-fit group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Blog</span>
              </Link>
              <TableOfContents />
            </aside>

            {/* Main Content - Centered */}
            <div className="w-full min-w-0 max-w-4xl">
              {/* Article Header */}
              <article className="mb-8 sm:mb-12">
                <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {post.author}
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
                    {post.title}
                  </h1>
                  
                  {/* Excerpt */}
                  <p className="text-base sm:text-xl text-muted-foreground mb-5 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-foreground/10">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-3 py-1.5 text-sm glass rounded-lg text-primary font-medium">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && <span className="px-3 py-1.5 text-sm text-muted-foreground">+{post.tags.length - 3} topics</span>}
                  </div>

                  {/* Share Button */}
                  <div className="flex items-center gap-3">
                    <ShareButton title={post.title} />
                    {relatedProject && <Link href={`/projects/${relatedProject.slug}`} className="text-sm font-semibold text-primary hover:underline">View project case study →</Link>}
                  </div>
                </div>
              </article>

              {/* Article Content */}
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8">
                <TableOfContents compact />
                <div className="prose-custom max-w-3xl mx-auto" data-article-content>
                  <MDXRemote 
                    source={post.content} 
                    components={MDXComponents} 
                    options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                  />
                </div>
              </div>

              {relatedProject && (
                <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">See the project behind this article</h2>
                  <p className="text-muted-foreground mb-4">Explore the architecture, evaluation, demo, and source code for {relatedProject.title}.</p>
                  <Link href={`/projects/${relatedProject.slug}`} className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">View case study</Link>
                </div>
              )}

              {/* Author Bio */}
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shrink-0">
                    MF
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                      {post.author}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Fullstack & AI Engineer passionate about building intelligent systems. 
                      Sharing insights on web development, AI, and software engineering.
                    </p>
                    <Link
                      href="/about"
                      className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Found This Helpful?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let&apos;s connect and discuss your next project
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Right Sidebar - Blog Navigation */}
            <BlogNavigation currentSlug={slug} posts={allPosts} />
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
