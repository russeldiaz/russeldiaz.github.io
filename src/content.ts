// Everything a visitor reads on the card lives here. Replace the placeholders with Russel's details.

export const profile = {
  name: 'Russel Diaz',
  role: '2D artist and concept artist',
  bio: [
    'I design characters, creatures and worlds, taking them from loose thumbnails to finished key art.',
    'Open to full-time and contract roles with game, animation and illustration studios.',
  ],
  email: 'hello@russeldiaz.art',
};

export interface ProfileLink {
  label: string;
  handle: string;
  url: string;
}

export const links: ProfileLink[] = [
  { label: 'ArtStation', handle: 'russeldiaz', url: 'https://www.artstation.com/' },
  { label: 'Instagram', handle: '@russeldiaz.art', url: 'https://www.instagram.com/' },
  { label: 'X / Twitter', handle: '@russeldiaz', url: 'https://x.com/' },
  { label: 'LinkedIn', handle: 'Russel Diaz', url: 'https://www.linkedin.com/' },
  { label: 'Behance', handle: 'russeldiaz', url: 'https://www.behance.net/' },
];

/** Cloudinary account that hosts the featured carousel. Empty = use the bundled fallback art. */
export const cloudinary = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? '',
  tag: 'featured',
};
