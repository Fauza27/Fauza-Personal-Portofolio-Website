import { ClientLayout } from '@/components/ClientLayout';
import { FeaturedAbout } from '@/components/FeaturedAbout';

export const metadata = {
  title: 'About - Muhammad Fauza',
  description:
    'Learn more about Muhammad Fauza, an AI Software Engineer building production-ready applications with machine learning, LLMs, and intelligent systems.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <ClientLayout>
      <main id="main-content" className="pt-16 sm:pt-10 pb-24 sm:pb-32">
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <FeaturedAbout isPage />
        </section>
      </main>
    </ClientLayout>
  );
}
