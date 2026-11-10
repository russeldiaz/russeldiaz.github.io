/**
 * Freezes the page behind a modal so gestures inside it (pinch-zoom on phones)
 * can't scroll the page and trigger the page snap. Returns a function that
 * releases the page at the exact position it was frozen.
 */
export function lockPageScroll(): () => void {
  const top = window.scrollY;
  document.documentElement.classList.add('scroll-locked');
  document.body.style.top = `-${top}px`;

  return () => {
    document.documentElement.classList.remove('scroll-locked');
    document.body.style.top = '';
    window.scrollTo({ top, behavior: 'instant' });
  };
}
