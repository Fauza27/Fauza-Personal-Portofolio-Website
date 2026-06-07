'use client';

interface YouTubeEmbedProps {
  url: string;
  title?: string;
}

// Moved outside component — pure function, no need to recreate on every render
const getVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
  return match?.[1] ?? null;
};

export function YouTubeEmbed({ url, title = 'YouTube video' }: YouTubeEmbedProps) {
  const videoId = getVideoId(url);

  if (!videoId) {
    return (
      <div className="glass rounded-xl p-6 text-center text-muted-foreground">
        Invalid YouTube URL
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl glass" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
