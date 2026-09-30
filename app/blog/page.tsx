import { ClientLayout } from '@/components/ClientLayout';
import { BlogClient } from '@/components/BlogClient';
import { getBlogPosts, toBlogSummary } from '@/lib/mdx';

export const metadata = {
  title: 'Blog - Muhammad Fauza',
  description: 'Insights on web development, AI, software engineering, and tech industry trends',
  alternates: { canonical: '/blog' },
};

export default async function Blog() {
  const posts = (await getBlogPosts()).map(toBlogSummary);

  return (
    <ClientLayout>
      <BlogClient posts={posts} />
    </ClientLayout>
  );
}
