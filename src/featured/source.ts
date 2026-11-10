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
  context?: { custom?: { caption?: string; alt?: string } };
}

const THUMB_WIDTH = 900;
const FULL_WIDTH = 2400;
const DEFAULT_ALT = 'Artwork by Russel Diaz';

function deliveryUrl(cloudName: string, res: CloudinaryResource, width: number): string {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_limit,w_${width}/v${res.version}/${res.public_id}.${res.format}`;
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
      thumbUrl: deliveryUrl(cloudName, res, THUMB_WIDTH),
      fullUrl: deliveryUrl(cloudName, res, FULL_WIDTH),
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
