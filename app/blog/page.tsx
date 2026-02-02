import { ClientLayout } from '@/components/ClientLayout';
import { BlogClient } from '@/components/BlogClient';
import { getBlogPosts } from '@/lib/mdx';

export const metadata = {
  title: 'Blog - Muhammad Fauza',
  description: 'Insights on web development, AI, software engineering, and tech industry trends',
};

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <ClientLayout>
      <BlogClient posts={posts} />
    </ClientLayout>
  );
}
