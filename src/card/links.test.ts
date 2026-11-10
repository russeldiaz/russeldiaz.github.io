import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderLinks } from './links';
import type { ProfileLink } from '../content';

const sample: ProfileLink[] = [
  { label: 'Email', handle: 'a@b.co', url: 'mailto:a@b.co', icon: 'email' },
  {
    label: 'Instagram',
    handle: '@someone',
    url: 'https://instagram.com/someone',
    icon: 'instagram',
  },
  { label: 'Discord', handle: 'ru1911', icon: 'discord' },
];

function render() {
  const list = document.createElement('dl');
  renderLinks(list, sample);
  return list;
}

describe('renderLinks', () => {
  afterEach(() => vi.restoreAllMocks());

  it('puts a decorative icon next to every label', () => {
    const labels = render().querySelectorAll('dt');

    expect(labels).toHaveLength(3);
    labels.forEach((dt) => {
      const icon = dt.querySelector('svg');
      expect(icon).not.toBeNull();
      expect(icon!.getAttribute('aria-hidden')).toBe('true');
    });
    expect(labels[1].textContent).toBe('Instagram');
  });

  it('opens web profiles in a new tab but keeps email links in place', () => {
    const [email, instagram] = render().querySelectorAll('a');

    expect(instagram.href).toBe('https://instagram.com/someone');
    expect(instagram.target).toBe('_blank');
    expect(instagram.rel).toBe('noopener');
    expect(email.href).toBe('mailto:a@b.co');
    expect(email.target).toBe('');
  });

  it('renders a handle without a URL as a button that copies it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    const button = render().querySelector('button')!;

    expect(button.textContent).toBe('ru1911');
    button.click();
    await Promise.resolve();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith('ru1911');
    expect(button.getAttribute('data-copied')).toBe('true');
  });
});
