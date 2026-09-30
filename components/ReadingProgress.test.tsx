import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ReadingProgress } from './ReadingProgress';

describe('ReadingProgress', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', () => {});
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 });
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('announces the initial reading progress', () => {
    render(<ReadingProgress />);
    expect(screen.getByRole('progressbar', { name: 'Reading progress' })).toHaveAttribute('aria-valuenow', '0');
  });

  it('updates its accessible value as the reader scrolls', () => {
    render(<ReadingProgress />);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 });
    fireEvent.scroll(window);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('clamps progress to the valid range', () => {
    render(<ReadingProgress />);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 1500 });
    fireEvent.scroll(window);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('handles pages too short to scroll', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 600 });
    render(<ReadingProgress />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });
});
