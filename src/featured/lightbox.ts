import { gsap } from 'gsap';
import type { FeaturedArtwork } from './source';
import { reducedMotion } from '../motion/preferences';
import { lockPageScroll } from './scrollLock';

export function createLightbox(dialog: HTMLDialogElement) {
  const image = dialog.querySelector<HTMLImageElement>('.lightbox__image')!;
  const caption = dialog.querySelector<HTMLElement>('.lightbox__caption')!;
  const closeButton = dialog.querySelector<HTMLButtonElement>('.lightbox__close')!;
  let unlockPage: (() => void) | null = null;

  // Every way of closing (button, backdrop tap, Escape) ends here.
  dialog.addEventListener('close', () => {
    unlockPage?.();
    unlockPage = null;
  });

  function close() {
    if (reducedMotion()) return dialog.close();
    gsap.to(dialog, { opacity: 0, duration: 0.25, onComplete: () => dialog.close() });
  }

  closeButton.addEventListener('click', close);
  // Click on the dark area (not the image) closes the viewer.
  dialog.addEventListener('click', (event) => {
    if (event.target !== image) close();
  });
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });

  return {
    open(art: FeaturedArtwork) {
      image.src = art.fullUrl;
      image.alt = art.alt;
      caption.textContent = art.title;
      unlockPage ??= lockPageScroll();
      dialog.showModal();
      if (reducedMotion()) return;
      gsap.fromTo(dialog, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        image,
        { scale: 0.92, clipPath: 'inset(8% 8% 8% 8%)' },
        { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.out' },
      );
    },
  };
}
