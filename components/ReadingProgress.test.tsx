import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ReadingProgress } from './ReadingProgress';

describe('ReadingProgress Component - Screen Size Tests', () => {
  let scrollEventListener: ((event: Event) => void) | null = null;

  beforeEach(() => {
    // Mock window.addEventListener to capture scroll listener
    const originalAddEventListener = window.addEventListener;
    vi.spyOn(window, 'addEventListener').mockImplementation((event, listener) => {
      if (event === 'scroll') {
        scrollEventListener = listener as (event: Event) => void;
      }
      return originalAddEventListener.call(window, event, listener);
    });

    // Reset scroll position
    window.pageYOffset = 0;
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    scrollEventListener = null;
  });

  describe('Mobile Screen (< 640px)', () => {
    beforeEach(() => {
      // Set mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // iPhone SE width
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      });
    });

    it('should render with correct positioning on mobile', () => {
      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveClass('fixed', 'top-16', 'left-0', 'right-0', 'z-40');
    });

    it('should have correct padding on mobile (px-4)', () => {
      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toHaveClass('px-4');
    });

    it('should display correctly at 0% progress on mobile', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        writable: true,
        configurable: true,
        value: 2000,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      });

      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
      expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 0%');
    });

    it('should calculate progress correctly on mobile scroll', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        writable: true,
        configurable: true,
        value: 2000,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      });
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 666.5, // ~50% scroll
      });

      render(<ReadingProgress />);
      
      // Trigger scroll event wrapped in act
      act(() => {
        if (scrollEventListener) {
          scrollEventListener(new Event('scroll'));
        }
      });

      const progressBar = screen.getByRole('progressbar');
      const progress = parseInt(progressBar.getAttribute('aria-valuenow') || '0');
      
      // Should be approximately 50%
      expect(progress).toBeGreaterThanOrEqual(49);
      expect(progress).toBeLessThanOrEqual(51);
    });
  });

  describe('Tablet Screen (640px - 1279px)', () => {
    beforeEach(() => {
      // Set tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768, // iPad width
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1024,
      });
    });

    it('should render with correct positioning on tablet', () => {
      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveClass('fixed', 'top-16', 'left-0', 'right-0', 'z-40');
    });

    it('should have correct padding on tablet (sm:px-6)', () => {
      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      // Should have sm:px-6 class
      expect(progressBar).toHaveClass('sm:px-6');
    });

    it('should display correctly at 0% progress on tablet', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        writable: true,
        configurable: true,
        value: 3000,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
      expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 0%');
    });

    it('should calculate progress correctly on tablet scroll', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        writable: true,
        configurable: true,
        value: 3000,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 1482, // ~75% scroll
      });

      render(<ReadingProgress />);
      
      // Trigger scroll event wrapped in act
      act(() => {
        if (scrollEventListener) {
          scrollEventListener(new Event('scroll'));
        }
      });

      const progressBar = screen.getByRole('progressbar');
      const progress = parseInt(progressBar.getAttribute('aria-valuenow') || '0');
      
      // Should be approximately 75%
      expect(progress).toBeGreaterThanOrEqual(74);
      expect(progress).toBeLessThanOrEqual(76);
    });
  });

  describe('Desktop Screen (≥ 1280px)', () => {
    beforeEach(() => {
      // Set desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 900,
      });
    });

    it('should render with correct positioning on desktop', () => {
      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveClass('fixed', 'top-16', 'left-0', 'right-0', 'z-40');
    });

    it('should have correct padding on desktop', () => {
      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toHaveClass('sm:px-6');
    });

    it('should respect max-width constraint on desktop', () => {
      const { container } = render(<ReadingProgress />);
      const innerContainer = container.querySelector('.max-w-\\[1600px\\]');
      
      expect(innerContainer).toBeInTheDocument();
      expect(innerContainer).toHaveClass('mx-auto');
    });

    it('should display correctly at 0% progress on desktop', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        writable: true,
        configurable: true,
        value: 4000,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 900,
      });

      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
      expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 0%');
    });

    it('should calculate progress correctly on desktop scroll', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        writable: true,
        configurable: true,
        value: 4000,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 900,
      });
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 775, // ~25% scroll
      });

      render(<ReadingProgress />);
      
      // Trigger scroll event wrapped in act
      act(() => {
        if (scrollEventListener) {
          scrollEventListener(new Event('scroll'));
        }
      });

      const progressBar = screen.getByRole('progressbar');
      const progress = parseInt(progressBar.getAttribute('aria-valuenow') || '0');
      
      // Should be approximately 25%
      expect(progress).toBeGreaterThanOrEqual(24);
      expect(progress).toBeLessThanOrEqual(26);
    });
  });

  describe('Large Screen (≥ 1600px)', () => {
    beforeEach(() => {
      // Set large desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1080,
      });
    });

    it('should render with correct positioning on large screen', () => {
      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveClass('fixed', 'top-16', 'left-0', 'right-0', 'z-40');
    });

    it('should respect max-width constraint on large screen', () => {
      const { container } = render(<ReadingProgress />);
      const innerContainer = container.querySelector('.max-w-\\[1600px\\]');
      
      expect(innerContainer).toBeInTheDocument();
      expect(innerContainer).toHaveClass('mx-auto');
    });

    it('should have correct padding on large screen', () => {
      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toHaveClass('sm:px-6');
    });

    it('should display correctly at 100% progress on large screen', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        writable: true,
        configurable: true,
        value: 5000,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1080,
      });
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 3920, // 100% scroll
      });

      render(<ReadingProgress />);
      
      // Trigger scroll event wrapped in act
      act(() => {
        if (scrollEventListener) {
          scrollEventListener(new Event('scroll'));
        }
      });

      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toHaveAttribute('aria-valuenow', '100');
      expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 100%');
    });
  });

  describe('Cross-Screen Consistency', () => {
    it('should maintain consistent z-index across all screen sizes', () => {
      const screenSizes = [375, 768, 1440, 1920];
      
      screenSizes.forEach((width) => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { unmount } = render(<ReadingProgress />);
        const progressBar = screen.getByRole('progressbar');
        
        expect(progressBar).toHaveClass('z-40');
        unmount();
      });
    });

    it('should maintain consistent top position across all screen sizes', () => {
      const screenSizes = [375, 768, 1440, 1920];
      
      screenSizes.forEach((width) => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { unmount } = render(<ReadingProgress />);
        const progressBar = screen.getByRole('progressbar');
        
        expect(progressBar).toHaveClass('top-16');
        unmount();
      });
    });

    it('should have proper accessibility attributes on all screen sizes', () => {
      const screenSizes = [375, 768, 1440, 1920];
      
      screenSizes.forEach((width) => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { unmount } = render(<ReadingProgress />);
        const progressBar = screen.getByRole('progressbar');
        
        expect(progressBar).toHaveAttribute('aria-label');
        expect(progressBar).toHaveAttribute('aria-valuenow');
        expect(progressBar).toHaveAttribute('aria-valuemin', '0');
        expect(progressBar).toHaveAttribute('aria-valuemax', '100');
        unmount();
      });
    });
  });

  describe('Responsive Padding', () => {
    it('should use px-4 on mobile screens', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toHaveClass('px-4');
    });

    it('should have sm:px-6 class for tablet and above', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(<ReadingProgress />);
      const progressBar = screen.getByRole('progressbar');
      
      expect(progressBar).toHaveClass('sm:px-6');
    });
  });

  describe('Visual Elements', () => {
    it('should have correct height (h-1) on all screen sizes', () => {
      const screenSizes = [375, 768, 1440, 1920];
      
      screenSizes.forEach((width) => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { container, unmount } = render(<ReadingProgress />);
        const progressBarTrack = container.querySelector('.h-1');
        
        expect(progressBarTrack).toBeInTheDocument();
        unmount();
      });
    });

    it('should have gradient background on all screen sizes', () => {
      const screenSizes = [375, 768, 1440, 1920];
      
      screenSizes.forEach((width) => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { container, unmount } = render(<ReadingProgress />);
        const progressBarFill = container.querySelector('.bg-linear-to-r');
        
        expect(progressBarFill).toBeInTheDocument();
        expect(progressBarFill).toHaveClass('from-primary', 'to-accent');
        unmount();
      });
    });
  });
});
