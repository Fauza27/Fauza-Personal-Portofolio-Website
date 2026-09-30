import Link from "next/link";
import { ArrowRight, Mail, MapPin, Briefcase, Github, Linkedin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background/50 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* LEFT COLUMN: CTA */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Let&apos;s build something <br />
              <span className="text-primary">extraordinary</span> together.
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mb-8">
              I&apos;m always open to discussing ideas, collaborating on projects, or just having a tech talk!
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Get In Touch <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMNS: Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* GET IN TOUCH */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-wider text-primary uppercase mb-2">Get In Touch</h4>
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-start gap-2 break-all">
                <Mail size={14} /> {SITE_CONFIG.email}
              </a>
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin size={14} /> Samarinda, Indonesia
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Briefcase size={14} /> Open to opportunities
              </span>
            </div>

            {/* EXPLORE */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-wider text-primary uppercase mb-2">Explore</h4>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Me</Link>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
              <Link href="/about#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Experience</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Writings</Link>
              <Link href="/about#tech-stack" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tech Stack</Link>
            </div>

            {/* RESOURCES */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-wider text-primary uppercase mb-2">Resources</h4>
              <a href={SITE_CONFIG.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resume (CV)</a>
              <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
              <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
            </div>

            {/* LET'S CONNECT */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-wider text-primary uppercase mb-2">Let&apos;s Connect</h4>
              <div className="flex gap-3">
                <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-full glass border border-foreground/10 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                  <Github size={16} />
                </a>
                <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full glass border border-foreground/10 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                  <Linkedin size={16} />
                </a>
                <a href={`mailto:${SITE_CONFIG.email}`} aria-label="Email" className="p-2 rounded-full glass border border-foreground/10 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                  <Mail size={16} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="font-medium">
            Building AI that makes <span className="text-primary font-bold">life easier.</span>
          </p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> and lots of <span className="text-orange-900 dark:text-orange-300">☕</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
