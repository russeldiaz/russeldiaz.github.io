import { siDiscord, siInstagram, siX } from 'simple-icons';

export type IconName = 'email' | 'instagram' | 'x' | 'discord' | 'gallery';

interface IconShape {
  path: string;
  /** Brand marks are filled shapes; the generic ones are drawn as outlines. */
  style: 'fill' | 'stroke';
}

const ICONS: Record<IconName, IconShape> = {
  instagram: { path: siInstagram.path, style: 'fill' },
  x: { path: siX.path, style: 'fill' },
  discord: { path: siDiscord.path, style: 'fill' },
  email: { path: 'M3 5.5h18v13H3z M3.5 6l8.5 6.5L20.5 6', style: 'stroke' },
  gallery: {
    path: 'M3 4.5h18v15H3z M3 16l5-5 4.5 4.5 3-3L21 18 M16.5 9a1.5 1.5 0 1 1-3 0a1.5 1.5 0 1 1 3 0',
    style: 'stroke',
  },
};

const SVG_NS = 'http://www.w3.org/2000/svg';

/** A decorative 24x24 icon that inherits the surrounding text colour. */
export function createIcon(name: IconName): SVGSVGElement {
  const { path, style } = ICONS[name];
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.classList.add('icon', `icon--${style}`);
  const shape = document.createElementNS(SVG_NS, 'path');
  shape.setAttribute('d', path);
  svg.append(shape);
  return svg;
}
