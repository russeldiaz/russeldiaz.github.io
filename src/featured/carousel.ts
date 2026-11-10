import { gsap } from 'gsap';
import type { FeaturedArtwork } from './source';
import { relativeOffset, stepForKey, swipeStep, wrapIndex } from './navigation';
import { reducedMotion } from '../motion/preferences';

const VISIBLE_RADIUS = 2;

interface CarouselOptions {
  root: HTMLElement;
  status: HTMLElement;
  artworks: FeaturedArtwork[];
  onOpen: (art: FeaturedArtwork) => void;
}

function renderItem(art: FeaturedArtwork, index: number, total: number): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'carousel__item';
  item.setAttribute('aria-roledescription', 'slide');
  item.setAttribute('aria-label', `${index + 1} of ${total}`);

  const frame = document.createElement('button');
  frame.type = 'button';
  frame.className = 'frame';

  const img = document.createElement('img');
  img.src = art.thumbUrl;
  img.alt = art.alt;
  img.loading = index < 3 ? 'eager' : 'lazy';
  img.decoding = 'async';

  const title = document.createElement('span');
  title.className = 'frame__title';
  title.textContent = art.title;

  frame.append(img, title);
  item.append(frame);
  return item;
}

export function createCarousel({ root, status, artworks, onOpen }: CarouselOptions): void {
  const track = root.querySelector<HTMLElement>('.carousel__track')!;
  const items = artworks.map((art, i) => renderItem(art, i, artworks.length));
  track.replaceChildren(...items);
  let active = 0;

  function layout(animate: boolean) {
    const spacing = (items[0]?.offsetWidth ?? 0) * 0.78;
    items.forEach((item, i) => {
      const offset = relativeOffset(i, active, items.length);
      const distance = Math.abs(offset);
      const visible = distance <= VISIBLE_RADIUS;
      item.classList.toggle('is-active', offset === 0);
      item.querySelector('button')!.tabIndex = offset === 0 ? 0 : -1;
      item.setAttribute('aria-hidden', String(offset !== 0));
      gsap.to(item, {
        xPercent: -50,
        x: offset * spacing,
        z: -distance * 160,
        rotationY: -offset * 22,
        scale: 1 - distance * 0.12,
        filter: `brightness(${1 - distance * 0.3})`,
        zIndex: 10 - distance,
        autoAlpha: visible ? 1 - distance * 0.35 : 0,
        duration: animate && !reducedMotion() ? 0.9 : 0,
        ease: 'expo.out',
      });
    });
    status.textContent = `${String(active + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  }

  function go(step: number) {
    if (step === 0) return;
    active = wrapIndex(active + step, items.length);
    layout(true);
  }

  items.forEach((item, i) => {
    item.querySelector('button')!.addEventListener('click', () => {
      const offset = relativeOffset(i, active, items.length);
      if (offset === 0) onOpen(artworks[i]);
      else go(offset);
    });
  });

  root.querySelector('.carousel__arrow--prev')!.addEventListener('click', () => go(-1));
  root.querySelector('.carousel__arrow--next')!.addEventListener('click', () => go(1));
  root.addEventListener('keydown', (event) => go(stepForKey(event.key)));

  let pointerStartX: number | null = null;
  root.addEventListener('pointerdown', (event) => (pointerStartX = event.clientX));
  root.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const step = swipeStep(pointerStartX, event.clientX);
    pointerStartX = null;
    if (step !== 0) {
      // Swallow the click that follows a swipe so it doesn't open the lightbox.
      root.addEventListener('click', (e) => e.stopPropagation(), { capture: true, once: true });
      go(step);
    }
  });

  window.addEventListener('resize', () => layout(false));
  layout(false);
}
