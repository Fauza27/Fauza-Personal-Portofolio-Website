import { ClientLayout } from '@/components/ClientLayout';
import { MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import Image from 'next/image';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL'] },
  { category: 'AI/ML', items: ['LangChain', 'OpenAI', 'Anthropic', 'TensorFlow', 'PyTorch', 'Qdrant'] },
  { category: 'DevOps', items: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'] },
];

const experience = [
    {
        role: 'Student Mentor',
        company: 'Digital Talent Scholarship Program with KOMDIGI',
        period: 'Okt 2024 - Des 2024',
        description: 'Mentored and guided 80 students in the Google Cloud Skill Boost program, achieving a 90% completion rate by providing technical assistance and resolving blockers.'
    },
    {
        role: 'Data Scientist Facilitator',
        company: 'Indosat Ooredoo Hutchison',
        period: 'Jan 2025 - Apr 2025',
        description: 'Assisted a group of 25 participants in completing the program on time by providing technical guidance, mentorship, and progress monitoring.'
    },
    {
        role: 'Laboratory Assistant',
        company: 'STMIK Widya Cipta Dharma',
        period: 'Mar 2025 - Present',
        description: 'Supported and supervised hands-on programming labs for Informatics Engineering students, assisted lecturers during practical sessions, graded assignments, and maintained lab software and hardware environments to ensure smooth learning operations.'
    },
    {
        role: 'Google cloud Arcade Facilitator',
        company: 'Google Cloud',
        period: 'Jul 2025 - Sep 2025',
        description: 'Assisted 25+ participants in a gamified cloud education program. Facilitated learning in Google Cloud technologies and AI/ML, supported participants in completing hands-on labs and earning badges, and drove engagement through coaching, progress tracking, and community outreach initiatives.'
    },
    {
        role: 'External Code Reviewer (Dicoding Elite)',
        company: 'Dicoding Indonesia',
        period: 'Nov 2025 - Now',
        description: 'Review and analyze student submissions for the Machine Learning (ML) learning path by providing detailed feedback on code structure and usability to improve code quality.'
    },
    {
        role: 'Data Scientist Facilitator ',
        company: 'Indosat Ooredoo Hutchison',
        period: 'Jan 2026 - Mar 2026',
        description: 'Trusted to serve as a facilitator for two cohorts of a data science program, mentoring 50+ participants, providing technical guidance, and ensuring timely program completion across multiple batches.'
    },
]

export const metadata = {
  title: 'About - Muhammad Fauza',
  description: 'Learn more about Muhammad Fauza - AI Software Engineer',
};

export default function About() {
  return (
    <ClientLayout>
      <main id="main-content" className="pt-20 sm:pt-24 pb-24 sm:pb-32 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-20">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Building <br></br><span className="text-gradient">AI-Powered</span> Software 
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              I’m Muhammad Fauza, an AI Software Engineer focused on building  production-ready applications that integrate machine learning,  LLMs, and data-driven systems into real-world software. My work sits at the intersection of AI and full-stack engineering, with an emphasis on reliability, scalability, and practical impact. 
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
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">AI Software Engineer</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-2.5 sm:px-3 py-1 text-xs glass rounded-full text-foreground/70">AI/ML</span>
                <span className="px-2.5 sm:px-3 py-1 text-xs glass rounded-full text-foreground/70">Software Eng</span>
                <span className="px-2.5 sm:px-3 py-1 text-xs glass rounded-full text-foreground/70">Web Dev</span>
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
            <p className="text-primary text-sm sm:text-base mb-2">Sekolah Tinggi Manajemen Informatika dan Komputer Widya Cipta Dharma</p>
            <p className="text-muted-foreground text-xs sm:text-sm">3.73 / 4.00 GPA</p>
          </div>
        </section>
      </main>
    </ClientLayout>
  );
}
