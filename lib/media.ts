import type { ProjectSummary } from './mdx';

export function getVideoThumbnail(project: Pick<ProjectSummary, 'video' | 'videos'>): string | null {
  const videoUrl = project.videos?.[0]?.url ?? project.video;
  if (!videoUrl) return null;

  try {
    const url = new URL(videoUrl);
    const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v');
    return id && /^[\w-]{11}$/.test(id) ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}
