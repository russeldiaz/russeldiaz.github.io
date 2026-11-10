/** Minimum horizontal travel (px) before a drag counts as a swipe rather than a tap. */
export const SWIPE_THRESHOLD = 50;

export function wrapIndex(index: number, count: number): number {
  if (count === 0) return 0;
  return ((index % count) + count) % count;
}

export function stepForKey(key: string): -1 | 0 | 1 {
  if (key === 'ArrowLeft') return -1;
  if (key === 'ArrowRight') return 1;
  return 0;
}

/** Positive step = next. A swipe to the left (start > end) advances. */
export function swipeStep(startX: number, endX: number): -1 | 0 | 1 {
  const delta = startX - endX;
  if (Math.abs(delta) < SWIPE_THRESHOLD) return 0;
  return delta > 0 ? 1 : -1;
}
