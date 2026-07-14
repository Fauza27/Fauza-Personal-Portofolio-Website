import { ClientLayout } from '@/components/ClientLayout';
import { FeaturedContact } from '@/components/FeaturedContact';

export const metadata = {
  title: 'Contact - Muhammad Fauza',
  description:
    'Get in touch with Muhammad Fauza for projects, AI integration, collaborations, or opportunities.',
};

export default function ContactPage() {
  return (
    <ClientLayout>
      <main id="main-content" className="pt-24 sm:pt-28 pb-24 sm:pb-32">
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground inline-block">
              Get in <span className="text-gradient">Touch</span>
            </h1>
          </div>
          <FeaturedContact />
        </section>
      </main>
    </ClientLayout>
  );
}
