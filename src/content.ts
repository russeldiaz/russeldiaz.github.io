// Everything a visitor reads on the card lives here.

const email = 'diazart19111@gmail.com';

export const profile = {
  name: 'Russel Diaz',
  role: '2D Illustrator & Concept Designer',
  email,
};

export interface ProfileLink {
  label: string;
  handle: string;
  url: string;
}

// The social links below are placeholders: replace the handles and URLs with Russel's profiles.
export const links: ProfileLink[] = [
  { label: 'Email', handle: email, url: `mailto:${email}` },
  { label: 'ArtStation', handle: 'russeldiaz', url: 'https://www.artstation.com/' },
  { label: 'Instagram', handle: '@russeldiaz.art', url: 'https://www.instagram.com/' },
  { label: 'LinkedIn', handle: 'Russel Diaz', url: 'https://www.linkedin.com/' },
];

/** Russel's Cloudinary account, which hosts the featured carousel (not a secret: it's in every image URL). */
export const cloudinary = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'olfmcr5o',
  tag: 'featured',
};
