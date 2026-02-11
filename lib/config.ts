export const SITE_CONFIG = {
  name: 'Muhammad Fauza',
  title: 'AI Engineer (Full-Stack Applications)',
  description:'An AI Engineer who builds production-ready full-stack applications by integrating machine learning, LLMs, and intelligent systems into real-world software.',
  url: 'https://muhammadfauza.com',
  email: 'muhammadfauza27@gmail.com',
  
  social: {
    github: 'https://github.com/Fauza27',
    linkedin: 'https://www.linkedin.com/in/muhammad-fauza',
  },

  techStack: [
    // --- AI / ML Core ---
    { name: 'Python', color: 'from-yellow-400 to-blue-500' },
    { name: 'PyTorch', color: 'from-red-400 to-orange-500' },
    { name: 'TensorFlow', color: 'from-orange-400 to-orange-600' },
    { name: 'Computer Vision', color: 'from-purple-400 to-fuchsia-500' },
    { name: 'LangChain', color: 'from-green-400 to-emerald-500' },
    { name: 'LLM / RAG Systems', color: 'from-emerald-400 to-teal-500' },

    // --- Backend / AI Infrastructure ---
    { name: 'FastAPI', color: 'from-teal-400 to-cyan-500' },
    { name: 'PostgreSQL', color: 'from-blue-400 to-indigo-500' },
    { name: 'Vector Database', color: 'from-indigo-400 to-violet-500' },
    { name: 'Docker', color: 'from-sky-400 to-blue-500' },

    // --- Frontend (Product Delivery) ---
    { name: 'Next.js', color: 'from-white to-gray-400' },
    { name: 'React', color: 'from-cyan-400 to-blue-500' },
    { name: 'TypeScript', color: 'from-blue-400 to-blue-600' },
    ],

  author: {
    name: 'Muhammad Fauza',
    role: 'AI Software Engineer',
    bio: `
AI Software Engineer with a strong focus on building AI-powered applications.
Experienced in integrating machine learning, LLMs, and computer vision into full-stack systems.
Passionate about turning AI models into scalable, real-world products.
    `.trim(),
  },
} as const;
