import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { lockPageScroll } from './scrollLock';

describe('lockPageScroll', () => {
  let scrollTo: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 640, configurable: true });
    scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.className = '';
    document.body.removeAttribute('style');
  });

  it('freezes the page at its current position while locked', () => {
    lockPageScroll();

    expect(document.documentElement.classList.contains('scroll-locked')).toBe(true);
    expect(document.body.style.top).toBe('-640px');
  });

  it('releases the page and returns to the same position when unlocked', () => {
    const unlock = lockPageScroll();

    unlock();

    expect(document.documentElement.classList.contains('scroll-locked')).toBe(false);
    expect(document.body.style.top).toBe('');
    expect(scrollTo).toHaveBeenCalledWith({ top: 640, behavior: 'instant' });
  });
});
