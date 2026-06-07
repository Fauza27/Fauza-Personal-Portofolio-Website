'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      const shareUrl = url || window.location.href;
      if (navigator.share) {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      // User cancelled share or other error
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-foreground/70 hover:text-foreground hover:bg-white/10 transition-colors text-sm"
    >
      <Share2 size={16} />
      Share Article
    </button>
  );
}
