'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Please add a short subject'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
  // Honeypot field - real users never see/fill this. Bots usually do.
  company: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Google Apps Script Web App URL (see google-apps-script/contact-form.gs for setup).
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export function FeaturedContact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('idle');

    // Honeypot triggered -> silently drop, pretend success so bots get no signal.
    if (data.company && data.company.trim().length > 0) {
      reset();
      setStatus('success');
      return;
    }

    if (!ENDPOINT) {
      console.error(
        'NEXT_PUBLIC_CONTACT_ENDPOINT is not set. Configure it in your .env to enable the contact form.'
      );
      setStatus('error');
      return;
    }

    try {
      // text/plain keeps this a "simple request" (no CORS preflight) for Apps Script.
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          submittedAt: new Date().toISOString(),
        }),
      });

      reset();
      setStatus('success');
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 glass rounded-xl bg-foreground/5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary';

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Left Column - Info */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Let&apos;s <span className="text-gradient">Connect</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Have a project in mind or just want to chat about tech? I&apos;d love
          to hear from you.
        </p>

        <div className="space-y-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 glass rounded-xl">
              <Mail size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Email</h3>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {SITE_CONFIG.email}
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
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-xl text-foreground/70 hover:text-foreground hover:scale-110 transition-all"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-xl text-foreground/70 hover:text-foreground hover:scale-110 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="glass rounded-3xl p-8">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              className={inputClass}
              placeholder="Your name"
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              className={inputClass}
              placeholder="your@email.com"
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className={inputClass}
              placeholder="What's this about?"
              aria-invalid={!!errors.subject}
              {...register('subject')}
            />
            {errors.subject && (
              <p className="mt-1.5 text-sm text-destructive">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className={`${inputClass} resize-none`}
              placeholder="Tell me about your project..."
              aria-invalid={!!errors.message}
              {...register('message')}
            />
            {errors.message && (
              <p className="mt-1.5 text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          {/* Honeypot - visually hidden, kept out of tab order */}
          <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
            <label htmlFor="company">Company (leave this empty)</label>
            <input
              type="text"
              id="company"
              tabIndex={-1}
              autoComplete="off"
              {...register('company')}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={18} />
              </>
            )}
          </button>

          {status === 'success' && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground"
            >
              <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
              <span>Thanks! Your message has been sent. I&apos;ll get back to you soon.</span>
            </div>
          )}

          {status === 'error' && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground"
            >
              <AlertCircle size={18} className="text-destructive shrink-0 mt-0.5" />
              <span>
                Something went wrong. Please try again, or email me directly at{' '}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary underline">
                  {SITE_CONFIG.email}
                </a>
                .
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
