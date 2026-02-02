import { ClientLayout } from '@/components/ClientLayout';
import { MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import Image from 'next/image';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'] },
  { category: 'AI/ML', items: ['LangChain', 'OpenAI', 'TensorFlow', 'PyTorch', 'Pinecone'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'Vercel', 'GitHub Actions'] },
];

const experience = [
  {
    role: 'Senior AI Engineer',
    company: 'Tech Innovation Lab',
    period: '2023 - Present',
    description: 'Leading AI integration initiatives, building RAG systems and ML pipelines for enterprise clients.',
  },
  {
    role: 'Fullstack Developer',
    company: 'SaaS Startup',
    period: '2021 - 2023',
    description: 'Built and scaled a B2B SaaS platform from MVP to 10,000+ active users.',
  },
  {
    role: 'Software Engineer',
    company: 'Digital Agency',
    period: '2019 - 2021',
    description: 'Developed high-performance web applications for Fortune 500 clients.',
  },
];

export const metadata = {
  title: 'About - Muhammad Fauza',
  description: 'Learn more about Muhammad Fauza - Fullstack & AI Engineer',
};

export default function About() {
  return (
    <ClientLayout>
      <main id="main-content" className="pt-20 sm:pt-24 pb-24 sm:pb-32 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-20">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Building the future with <span className="text-gradient">code & AI</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              I&apos;m Muhammad Fauza, a fullstack developer and AI engineer passionate about creating intelligent systems that solve real problems. With 5+ years of experience, I bridge the gap between cutting-edge AI and production-ready software.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px] text-primary" />
                <span>Based in Southeast Asia</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                <Briefcase size={16} className="sm:w-[18px] sm:h-[18px] text-primary" />
                <span>Open to opportunities</span>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4 sm:mb-6">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary to-accent p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-background">
                    <Image
                      src="/me-2.jpg"
                      alt="Muhammad Fauza"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Muhammad Fauza</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">Fullstack & AI Engineer</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-2.5 sm:px-3 py-1 text-xs glass rounded-full text-foreground/70">Web Dev</span>
                <span className="px-2.5 sm:px-3 py-1 text-xs glass rounded-full text-foreground/70">AI/ML</span>
                <span className="px-2.5 sm:px-3 py-1 text-xs glass rounded-full text-foreground/70">Software Eng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
            <Award size={20} className="sm:w-6 sm:h-6 text-primary" />
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-primary text-sm sm:text-base font-medium mb-3 sm:mb-4">{skillGroup.category}</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {skillGroup.items.map((skill) => (
                    <div
                      key={skill}
                      className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/5 rounded-lg text-xs sm:text-sm text-foreground/80"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
            <Briefcase size={20} className="sm:w-6 sm:h-6 text-primary" />
            Experience
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            {experience.map((job) => (
              <div key={job.role} className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden group hover:translate-x-2 transition-transform">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent" />
                <div className="pl-3 sm:pl-4">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-4 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{job.role}</h3>
                    <span className="text-primary text-sm">{job.company}</span>
                    <span className="text-xs text-muted-foreground sm:ml-auto">{job.period}</span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-12 sm:mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
            <GraduationCap size={20} className="sm:w-6 sm:h-6 text-primary" />
            Education
          </h2>
          
          <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Bachelor of Computer Science</h3>
            <p className="text-primary text-sm sm:text-base mb-2">State University</p>
            <p className="text-muted-foreground text-xs sm:text-sm">Specialized in Artificial Intelligence and Software Engineering</p>
          </div>
        </section>
      </main>
    </ClientLayout>
  );
}
