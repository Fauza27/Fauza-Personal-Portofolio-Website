"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Award } from "lucide-react";
import Image from "next/image";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL"],
  },
  {
    category: "AI/ML",
    items: [
      "LangChain",
      "OpenAI",
      "Anthropic",
      "TensorFlow",
      "PyTorch",
      "Qdrant",
    ],
  },
  { category: "DevOps", items: ["Docker", "AWS", "Vercel", "GitHub Actions"] },
];

const experience = [
  {
    role: "Student Mentor",
    company: "Digital Talent Scholarship Program with KOMDIGI",
    period: "Okt 2024 - Des 2024",
    description:
      "Mentored and guided 80 students in the Google Cloud Skill Boost program, achieving a 90% completion rate by providing technical assistance and resolving blockers.",
  },
  {
    role: "Data Scientist Facilitator",
    company: "Indosat Ooredoo Hutchison",
    period: "Jan 2025 - Apr 2025",
    description:
      "Assisted a group of 25 participants in completing the program on time by providing technical guidance, mentorship, and progress monitoring.",
  },
  {
    role: "Laboratory Assistant",
    company: "STMIK Widya Cipta Dharma",
    period: "Mar 2025 - Present",
    description:
      "Supported and supervised hands-on programming labs for Informatics Engineering students, assisted lecturers during practical sessions, graded assignments, and maintained lab software and hardware environments to ensure smooth learning operations.",
  },
  {
    role: "Google cloud Arcade Facilitator",
    company: "Google Cloud",
    period: "Jul 2025 - Sep 2025",
    description:
      "Assisted 25+ participants in a gamified cloud education program.",
  },
  {
    role: "External Code Reviewer (Dicoding Elite)",
    company: "Dicoding Indonesia",
    period: "Nov 2025 - Now",
    description:
      "Review and analyze student submissions for the Machine Learning (ML) learning path.",
  },
  {
    role: "Data Scientist Facilitator ",
    company: "Indosat Ooredoo Hutchison",
    period: "Jan 2026 - Mar 2026",
    description:
      "Trusted to serve as a facilitator for two cohorts of a data science program, mentoring 50+ participants.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export function FeaturedAbout() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-foreground inline-block"
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-20">
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">
            Building <br className="hidden sm:block" />
            <span className="text-gradient">AI-Powered</span> Software
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
            I’m Muhammad Fauza, an AI Software Engineer focused on building
            production-ready applications that integrate machine learning, LLMs,
            and data-driven systems into real-world software. My work sits at
            the intersection of AI and full-stack engineering, with an emphasis
            on reliability, scalability, and practical impact.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
              <MapPin
                size={16}
                className="sm:w-[18px] sm:h-[18px] text-primary"
              />
              <span>Based in Southeast Asia</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
              <Briefcase
                size={16}
                className="sm:w-[18px] sm:h-[18px] text-primary"
              />
              <span>Open to opportunities</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4 sm:mb-6"
            >
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
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Muhammad Fauza
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              AI Software Engineer
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-2.5 sm:px-3 py-1 text-xs glass rounded-full text-foreground/70">
                AI/ML
              </span>
              <span className="px-2.5 sm:px-3 py-1 text-xs glass rounded-full text-foreground/70">
                Software Eng
              </span>
              <span className="px-2.5 sm:px-3 py-1 text-xs glass rounded-full text-foreground/70">
                Web Dev
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mb-12 sm:mb-20">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
          <Award size={20} className="sm:w-6 sm:h-6 text-primary" />
          Technical Skills
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {skills.map((skillGroup) => (
            <motion.div
              key={skillGroup.category}
              variants={itemVariants}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:-translate-y-1 transition-transform"
            >
              <h4 className="text-primary text-sm sm:text-base font-medium mb-3 sm:mb-4">
                {skillGroup.category}
              </h4>
              <div className="space-y-1.5 sm:space-y-2">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill}
                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/5 rounded-lg text-xs sm:text-sm text-foreground/80 hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
          <Briefcase size={20} className="sm:w-6 sm:h-6 text-primary" />
          Experience
        </h3>

        <div className="space-y-4 sm:space-y-6">
          {experience.map((job) => (
            <motion.div
              variants={itemVariants}
              key={job.role}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden group hover:translate-x-2 transition-transform"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent" />
              <div className="pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-4 mb-2">
                  <h4 className="text-lg sm:text-xl font-bold text-foreground">
                    {job.role}
                  </h4>
                  <span className="text-primary text-sm">{job.company}</span>
                  <span className="text-xs text-muted-foreground sm:ml-auto">
                    {job.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
