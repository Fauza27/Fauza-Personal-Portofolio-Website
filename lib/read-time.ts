export function estimateReadTime(content: string): string {
  const codeBlocks = content.match(/```[\s\S]*?```/g) ?? [];
  const prose = content.replace(/```[\s\S]*?```/g, ' ');
  const words = prose.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(words / 220 + codeBlocks.length * 0.5));
  return `${minutes} min read`;
}
