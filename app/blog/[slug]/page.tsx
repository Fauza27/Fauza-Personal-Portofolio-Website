import { ClientLayout } from '@/components/ClientLayout';
import { getBlogPost, getBlogPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, Share2 } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import { TableOfContents } from '@/components/TableOfContents';
import { FloatingBackButton } from '@/components/FloatingBackButton';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Muhammad Fauza`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <ClientLayout>
      {/* Floating Back Button */}
      <FloatingBackButton href="/blog" label="Back to Blog" />

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
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  {/* Excerpt */}
                  <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-white/10">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 text-sm glass rounded-lg text-primary font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Share Button */}
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-foreground/70 hover:text-foreground hover:bg-white/10 transition-colors text-sm">
                      <Share2 size={16} />
                      Share Article
                    </button>
                  </div>
                </div>
              </article>

              {/* Article Content */}
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8">
                <div className="prose-custom">
                  <MDXRemote source={post.content} components={MDXComponents} />
                </div>
              </div>

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
                    <Link href="/about">
                      <button className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                        Learn More →
                      </button>
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
                  Let's connect and discuss your next project
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
