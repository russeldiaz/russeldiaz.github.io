// Everything a visitor reads on the card lives here.
import type { IconName } from './card/icons';

const email = 'diazart19111@gmail.com';

export const profile = {
  name: 'Russel Diaz',
  role: '2D Illustrator & Concept Designer',
  email,
};

export interface ProfileLink {
  label: string;
  handle: string;
  /** Omit for handles with no public profile URL (shown as a copy-to-clipboard button). */
  url?: string;
  icon: IconName;
}

export const links: ProfileLink[] = [
  { label: 'Email', handle: email, url: `mailto:${email}`, icon: 'email' },
  {
    label: 'Instagram',
    handle: '@grompsyndrome',
    url: 'https://www.instagram.com/grompsyndrome/',
    icon: 'instagram',
  },
  { label: 'X (Twitter)', handle: '@grompsyndrome', url: 'https://x.com/grompsyndrome', icon: 'x' },
  // Discord usernames have no public profile link, so visitors copy it instead.
  { label: 'Discord', handle: 'ru1911', icon: 'discord' },
  {
    label: 'Gallery',
    handle: 'grompgallery.carrd.co',
    url: 'https://grompgallery.carrd.co/',
    icon: 'gallery',
  },
];

/** Russel's Cloudinary account, which hosts the featured carousel (not a secret: it's in every image URL). */
export const cloudinary = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'olfmcr5o',
  tag: 'featured',
};
