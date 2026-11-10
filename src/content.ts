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

export const links: ProfileLink[] = [
  { label: 'Email', handle: email, url: `mailto:${email}` },
  { label: 'Instagram', handle: '@grompsyndrome', url: 'https://www.instagram.com/grompsyndrome/' },
  { label: 'Gallery', handle: 'grompgallery.carrd.co', url: 'https://grompgallery.carrd.co/' },
];

/** Russel's Cloudinary account, which hosts the featured carousel (not a secret: it's in every image URL). */
export const cloudinary = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'olfmcr5o',
  tag: 'featured',
};
