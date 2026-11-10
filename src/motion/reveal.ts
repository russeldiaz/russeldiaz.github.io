import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { finePointer, reducedMotion } from './preferences';

gsap.registerPlugin(ScrollTrigger);

/** Hero: the name is sketched in blue pencil, then inked, then the role fades in. */
function introSequence() {
  const lines = gsap.utils.toArray<SVGTextElement>('.hero__line');
  const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
  timeline
    .set(lines, { strokeDasharray: 1400, strokeDashoffset: 1400, fillOpacity: 0 })
    .to(lines, { strokeDashoffset: 0, duration: 1.8, stagger: 0.25 })
    .to(lines, { fillOpacity: 1, duration: 0.8, stagger: 0.15 }, '-=0.6')
    .from('.hero__role', { y: 24, autoAlpha: 0, duration: 0.8, ease: 'expo.out' }, '-=0.4')
    .from('.hero__scroll', { autoAlpha: 0, duration: 0.6 }, '-=0.4')
    .from('.nav', { y: -20, autoAlpha: 0, duration: 0.8, ease: 'expo.out' }, 0.2);
}

/** Sections draw themselves in as they scroll into view. */
function scrollReveals() {
  gsap.from('.section-title', {
    scrollTrigger: { trigger: '.featured', start: 'top 80%' },
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.1,
    ease: 'expo.out',
  });

  gsap.from('.carousel', {
    scrollTrigger: { trigger: '.featured', start: 'top 70%' },
    y: 80,
    autoAlpha: 0,
    duration: 1.2,
    ease: 'expo.out',
  });

  const card = gsap.timeline({ scrollTrigger: { trigger: '.card', start: 'top 75%' } });
  card
    .from('.card__frame polygon', {
      strokeDasharray: 1,
      strokeDashoffset: 1,
      duration: 1.4,
      ease: 'power2.inOut',
    })
    .from('.card', { backgroundColor: 'rgba(31, 35, 44, 0)', duration: 0.8 }, 0.4)
    .from(
      '.card > :not(svg)',
      { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.7, ease: 'expo.out' },
      0.5,
    )
    .from('.card__links > *', { x: -16, autoAlpha: 0, stagger: 0.04, duration: 0.5 }, 0.9);

  // The hero name drifts and fades as it scrolls away.
  gsap.to('.hero__ink', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    yPercent: -30,
    autoAlpha: 0.15,
  });
}

/** Buttons lean toward the cursor. */
function magneticButtons() {
  if (!finePointer()) return;
  document.querySelectorAll<HTMLElement>('.button, .carousel__arrow, .nav__mark').forEach((el) => {
    const base = el.classList.contains('carousel__arrow') ? 45 : 0;
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      gsap.to(el, {
        x: (event.clientX - rect.left - rect.width / 2) * 0.3,
        y: (event.clientY - rect.top - rect.height / 2) * 0.3,
        rotation: base,
        duration: 0.4,
        ease: 'power3.out',
      });
    });
    el.addEventListener('pointerleave', () =>
      gsap.to(el, { x: 0, y: 0, rotation: base, duration: 0.6, ease: 'elastic.out(1, 0.4)' }),
    );
  });
}

export function startMotion(): void {
  if (reducedMotion()) return;
  introSequence();
  scrollReveals();
  magneticButtons();
}
