import { ClientLayout } from '@/components/ClientLayout';
import { ProjectsClient } from '@/components/ProjectsClient';
import { getProjects } from '@/lib/mdx';

export const metadata = {
  title: 'Projects - Muhammad Fauza',
  description: 'Featured projects showcasing fullstack development, AI integration, and scalable architecture',
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <ClientLayout>
      <ProjectsClient projects={projects} />
    </ClientLayout>
  );
}
