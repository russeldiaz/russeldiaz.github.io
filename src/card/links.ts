import type { ProfileLink } from '../content';
import { createIcon } from './icons';

const COPIED_FOR_MS = 1600;

/** A handle with no public URL (e.g. a Discord username): clicking copies it. */
function copyButton(label: string, handle: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy';
  button.textContent = handle;
  button.title = `Copy ${label} username`;
  button.addEventListener('click', () => {
    navigator.clipboard
      ?.writeText(handle)
      .then(() => {
        button.dataset.copied = 'true';
        setTimeout(() => delete button.dataset.copied, COPIED_FOR_MS);
      })
      .catch(() => {});
  });
  return button;
}

function profileLink(url: string, handle: string): HTMLAnchorElement {
  const a = document.createElement('a');
  a.href = url;
  a.textContent = handle;
  if (url.startsWith('http')) {
    a.target = '_blank';
    a.rel = 'noopener';
  }
  return a;
}

/** Fills the card's definition list: an icon and label, then the link or copyable handle. */
export function renderLinks(list: HTMLElement, links: ProfileLink[]): void {
  list.replaceChildren(
    ...links.flatMap(({ label, handle, url, icon }) => {
      const dt = document.createElement('dt');
      const name = document.createElement('span');
      name.textContent = label;
      dt.append(createIcon(icon), name);

      const dd = document.createElement('dd');
      dd.append(url ? profileLink(url, handle) : copyButton(label, handle));
      return [dt, dd];
    }),
  );
}
