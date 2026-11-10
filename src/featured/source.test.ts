import { describe, expect, it } from 'vitest';
import { loadFeatured, parseCloudinaryList, type FeaturedArtwork } from './source';

const CLOUD = 'demo-cloud';

function resource(overrides: Record<string, unknown> = {}) {
  return {
    public_id: 'portfolio/dragon',
    version: 1700000000,
    format: 'jpg',
    width: 2000,
    height: 3000,
    created_at: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('parseCloudinaryList', () => {
  it('builds optimized thumbnail and full-size URLs for each resource', () => {
    const [art] = parseCloudinaryList({ resources: [resource()] }, CLOUD);

    expect(art.thumbUrl).toBe(
      'https://res.cloudinary.com/demo-cloud/image/upload/f_auto,q_auto,c_limit,w_900/v1700000000/portfolio/dragon.jpg',
    );
    expect(art.fullUrl).toBe(
      'https://res.cloudinary.com/demo-cloud/image/upload/f_auto,q_auto,c_limit,w_2400/v1700000000/portfolio/dragon.jpg',
    );
    expect(art.width).toBe(2000);
    expect(art.height).toBe(3000);
  });

  it('orders artworks newest first', () => {
    const list = parseCloudinaryList(
      {
        resources: [
          resource({ public_id: 'old', created_at: '2025-01-01T00:00:00Z' }),
          resource({ public_id: 'new', created_at: '2026-06-01T00:00:00Z' }),
        ],
      },
      CLOUD,
    );

    expect(list.map((a) => a.id)).toEqual(['new', 'old']);
  });

  it('uses caption and alt from custom context when present', () => {
    const [art] = parseCloudinaryList(
      {
        resources: [resource({ context: { custom: { caption: 'Sky Warden', alt: 'A knight' } } })],
      },
      CLOUD,
    );

    expect(art.title).toBe('Sky Warden');
    expect(art.alt).toBe('A knight');
  });

  it('falls back to a generic title and alt when no context is set', () => {
    const [art] = parseCloudinaryList({ resources: [resource()] }, CLOUD);

    expect(art.title).toBe('');
    expect(art.alt).toBe('Artwork by Russel Diaz');
  });

  it('returns an empty list for malformed input', () => {
    expect(parseCloudinaryList({ nope: true }, CLOUD)).toEqual([]);
    expect(parseCloudinaryList(null, CLOUD)).toEqual([]);
  });
});

describe('loadFeatured', () => {
  const fallback: FeaturedArtwork[] = [
    { id: 'f1', title: 'Fallback', alt: 'x', thumbUrl: 'a', fullUrl: 'b', width: 1, height: 1 },
  ];

  function jsonResponse(body: unknown, ok = true): Response {
    return { ok, json: async () => body } as Response;
  }

  it('requests the tag list from Cloudinary and returns parsed artworks', async () => {
    const requested: string[] = [];
    const fetchFn = async (url: string) => {
      requested.push(url);
      return jsonResponse({ resources: [resource()] });
    };

    const list = await loadFeatured({ cloudName: CLOUD, tag: 'featured', fallback, fetchFn });

    expect(requested[0]).toMatch(
      /^https:\/\/res\.cloudinary\.com\/demo-cloud\/image\/list\/featured\.json/,
    );
    expect(list).toHaveLength(1);
    expect(list[0].id).toBe('portfolio/dragon');
  });

  it('returns the fallback when the request fails', async () => {
    const fetchFn = async () => {
      throw new Error('offline');
    };

    expect(await loadFeatured({ cloudName: CLOUD, tag: 'featured', fallback, fetchFn })).toBe(
      fallback,
    );
  });

  it('returns the fallback on a non-OK response', async () => {
    const fetchFn = async () => jsonResponse({}, false);

    expect(await loadFeatured({ cloudName: CLOUD, tag: 'featured', fallback, fetchFn })).toBe(
      fallback,
    );
  });

  it('returns the fallback when the tag has no images', async () => {
    const fetchFn = async () => jsonResponse({ resources: [] });

    expect(await loadFeatured({ cloudName: CLOUD, tag: 'featured', fallback, fetchFn })).toBe(
      fallback,
    );
  });

  it('returns the fallback without fetching when no cloud name is configured', async () => {
    let called = false;
    const fetchFn = async () => {
      called = true;
      return jsonResponse({});
    };

    expect(await loadFeatured({ cloudName: '', tag: 'featured', fallback, fetchFn })).toBe(
      fallback,
    );
    expect(called).toBe(false);
  });
});
