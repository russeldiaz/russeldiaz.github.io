import './styles/main.css';
import { cloudinary, links, profile } from './content';
import { startGuides } from './background/guides';
import { createCarousel } from './featured/carousel';
import { createLightbox } from './featured/lightbox';
import { loadFeatured, type FeaturedArtwork } from './featured/source';
import { startMotion } from './motion/reveal';

function fillContent() {
  document
    .querySelectorAll<HTMLElement>('[data-content="name"]')
    .forEach((el) => (el.textContent = profile.name));
  document
    .querySelectorAll<HTMLElement>('[data-content="role"]')
    .forEach((el) => (el.textContent = profile.role));
  document.querySelector('[data-content="year"]')!.textContent = String(new Date().getFullYear());

  const bio = document.querySelector('[data-content="bio"]')!;
  bio.replaceChildren(
    ...profile.bio.map((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      return p;
    }),
  );

  const list = document.querySelector('[data-content="links"]')!;
  list.replaceChildren(
    ...links.flatMap(({ label, handle, url }) => {
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = handle;
      dd.append(a);
      return [dt, dd];
    }),
  );

  document.querySelector<HTMLAnchorElement>('[data-content="email"]')!.href =
    `mailto:${profile.email}`;
}

async function loadFallback(): Promise<FeaturedArtwork[]> {
  const base = import.meta.env.BASE_URL;
  const response = await fetch(`${base}featured-fallback.json`);
  const list = (await response.json()) as FeaturedArtwork[];
  // Fallback paths are relative to the site root so they work under any base path.
  return list.map((art) => ({
    ...art,
    thumbUrl: base + art.thumbUrl,
    fullUrl: base + art.fullUrl,
  }));
}

async function startFeatured() {
  const lightbox = createLightbox(document.querySelector('.lightbox')!);
  const fallback = await loadFallback().catch(() => []);
  const artworks = await loadFeatured({ ...cloudinary, fallback });
  createCarousel({
    root: document.querySelector('[data-carousel]')!,
    status: document.querySelector('.carousel__status')!,
    artworks,
    onOpen: lightbox.open,
  });
}

fillContent();
startGuides(document.querySelector('.guides')!);
startMotion();
void startFeatured();
