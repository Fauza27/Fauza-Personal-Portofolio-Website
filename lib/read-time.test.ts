import { describe, expect, it } from 'vitest';
import { estimateReadTime } from './read-time';

describe('estimateReadTime', () => {
  it('uses a minimum of one minute for short articles', () => {
    expect(estimateReadTime('A short note.')).toBe('1 min read');
  });

  it('counts prose and gives code blocks extra reading time', () => {
    const prose = Array(440).fill('word').join(' ');
    expect(estimateReadTime(prose)).toBe('2 min read');
    expect(estimateReadTime(`${prose}\n\`\`\`ts\nconst x = 1;\n\`\`\``)).toBe('3 min read');
  });
});
