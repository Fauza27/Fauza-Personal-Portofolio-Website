import { ClientLayout } from '@/components/ClientLayout';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

export const metadata = {
  title: 'Contact - Muhammad Fauza',
  description: 'Get in touch with Muhammad Fauza',
};

export default function Contact() {
  return (
    <ClientLayout>
      <main id="main-content" className="pt-24 pb-32 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Have a project in mind or just want to chat about tech? I&apos;d love to hear from you.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="p-3 glass rounded-xl">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Email</h3>
                  <a href="mailto:hello@muhammadfauza.com" className="text-muted-foreground hover:text-primary transition-colors">
                    hello@muhammadfauza.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 glass rounded-xl">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">Southeast Asia</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-4">Follow Me</h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-xl text-foreground/70 hover:text-foreground hover:scale-110 transition-all"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-xl text-foreground/70 hover:text-foreground hover:scale-110 transition-all"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-xl text-foreground/70 hover:text-foreground hover:scale-110 transition-all"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="glass rounded-3xl p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 glass rounded-xl bg-white/5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 glass rounded-xl bg-white/5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 glass rounded-xl bg-white/5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 glass rounded-xl bg-white/5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
