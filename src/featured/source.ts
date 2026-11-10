export interface FeaturedArtwork {
  id: string;
  title: string;
  alt: string;
  thumbUrl: string;
  fullUrl: string;
  width: number;
  height: number;
}

interface CloudinaryResource {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  created_at: string;
  context?: { custom?: { caption?: string; alt?: string; preview?: string } };
}

/** Card preview: fills the 9:16 frame, with Cloudinary choosing the crop around the subject. */
const CARD_TRANSFORM = 'f_auto,q_auto,c_fill,g_auto,w_900,h_1600';
/** Full-size view: the whole artwork, never cropped. */
const FULL_TRANSFORM = 'f_auto,q_auto,c_limit,w_2400';
const DEFAULT_ALT = 'Artwork by Russel Diaz';

const uploadRoot = (cloudName: string) => `https://res.cloudinary.com/${cloudName}/image/upload/`;

function assetUrl(cloudName: string, transform: string, res: CloudinaryResource): string {
  return `${uploadRoot(cloudName)}${transform}/v${res.version}/${res.public_id}.${res.format}`;
}

/**
 * The owner can set a custom card image in the artwork's `preview` context field,
 * either as a public ID or as a URL copied from the Media Library.
 */
function cardUrl(cloudName: string, res: CloudinaryResource): string {
  const preview = res.context?.custom?.preview?.trim();
  if (!preview) return assetUrl(cloudName, CARD_TRANSFORM, res);

  const root = uploadRoot(cloudName);
  if (preview.startsWith(root)) return `${root}${CARD_TRANSFORM}/${preview.slice(root.length)}`;
  if (/^https?:\/\//.test(preview)) return preview;
  return `${root}${CARD_TRANSFORM}/${preview}`;
}

/** Turns Cloudinary's `/image/list/<tag>.json` payload into carousel items, newest first. */
export function parseCloudinaryList(payload: unknown, cloudName: string): FeaturedArtwork[] {
  const resources = (payload as { resources?: unknown } | null)?.resources;
  if (!Array.isArray(resources)) return [];

  return (resources as CloudinaryResource[])
    .slice()
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    .map((res) => ({
      id: res.public_id,
      title: res.context?.custom?.caption ?? '',
      alt: res.context?.custom?.alt ?? DEFAULT_ALT,
      thumbUrl: cardUrl(cloudName, res),
      fullUrl: assetUrl(cloudName, FULL_TRANSFORM, res),
      width: res.width,
      height: res.height,
    }));
}

interface LoadOptions {
  cloudName: string;
  tag: string;
  fallback: FeaturedArtwork[];
  fetchFn?: (url: string) => Promise<Response>;
}

/** Fetches the tagged artworks; any failure or an empty tag yields the bundled fallback. */
export async function loadFeatured({
  cloudName,
  tag,
  fallback,
  fetchFn = (url) => fetch(url),
}: LoadOptions): Promise<FeaturedArtwork[]> {
  if (!cloudName) return fallback;
  try {
    // Cache-buster: Cloudinary caches list responses for up to a minute on the CDN.
    const url = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json?t=${Date.now()}`;
    const response = await fetchFn(url);
    if (!response.ok) return fallback;
    const list = parseCloudinaryList(await response.json(), cloudName);
    return list.length > 0 ? list : fallback;
  } catch {
    return fallback;
  }
}
