import { ClientLayout } from '@/components/ClientLayout';
import { ProjectsClient } from '@/components/ProjectsClient';
import { getProjects, toProjectSummary } from '@/lib/mdx';

export const metadata = {
  title: 'Projects - Muhammad Fauza',
  description: 'Featured projects showcasing fullstack development, AI integration, and scalable architecture',
  alternates: { canonical: '/projects' },
};

export default async function Projects() {
  const priority = ['sentinel', 'my-jarvis-gua', 'voiceinvoice'];
  const projects = (await getProjects()).slice()
    .sort((a, b) => {
      const aRank = priority.indexOf(a.slug);
      const bRank = priority.indexOf(b.slug);
      if (aRank !== -1 || bRank !== -1) return (aRank === -1 ? priority.length : aRank) - (bRank === -1 ? priority.length : bRank);
      return Number(b.year) - Number(a.year);
    })
    .map(toProjectSummary);

  return (
    <ClientLayout>
      <ProjectsClient projects={projects} />
    </ClientLayout>
  );
}
