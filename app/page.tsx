import { BentoGrid } from '@/components/BentoGrid';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ClientLayout } from '@/components/ClientLayout';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

export default function Home() {
  return (
    <ClientLayout>
      <main id="main-content" className="pt-16 sm:pt-20 pb-24 sm:pb-32">
        {/* Hero Bento Grid */}
        <section className="mb-12 sm:mb-20">
          <BentoGrid />
        </section>

        {/* Project Gallery */}
        <ProjectGallery />

        {/* Connect Section */}
        <ConnectSection />
      </main>
    </ClientLayout>
  );
}

function ConnectSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Let&apos;s Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6 sm:mb-8">
            Whether you need a scalable web application, AI integration, or a complete digital transformation — I&apos;m here to help.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm sm:text-base hover:bg-primary/90 transition-colors">
                Start a Conversation
                <ArrowRight size={18} />
              </button>
            </Link>
            
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
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 glass rounded-xl text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
