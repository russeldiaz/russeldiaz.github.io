import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { finePointer, reducedMotion } from './preferences';

gsap.registerPlugin(ScrollTrigger);

/** First screen: the top bar drops in, then the artwork rises into place. */
function introSequence() {
  gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .from('.nav', { y: -24, autoAlpha: 0, duration: 0.9 })
    .from(
      '.nav__logo',
      {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.1,
        ease: 'power3.inOut',
        clearProps: 'clipPath',
      },
      0.15,
    )
    .from('.nav__links li', { y: -12, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, 0.2)
    .from(
      '.carousel',
      { y: 60, scale: 0.94, autoAlpha: 0, duration: 1.4, clearProps: 'transform' },
      0.25,
    )
    .from('.featured__footer', { y: 16, autoAlpha: 0, duration: 0.8 }, 0.9);
}

/** The business card draws its frame, then fills in, when the second page arrives. */
function scrollReveals() {
  const card = gsap.timeline({ scrollTrigger: { trigger: '.card', start: 'top 75%' } });
  card
    .from('.card__frame polygon', {
      strokeDasharray: 1,
      strokeDashoffset: 1,
      duration: 1.4,
      ease: 'power2.inOut',
    })
    .from('.card', { backgroundColor: 'rgba(0, 0, 0, 0)', duration: 0.8 }, 0.4)
    .from(
      '.card > :not(svg)',
      { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.7, ease: 'expo.out' },
      0.5,
    )
    .from('.card__links > *', { x: -16, autoAlpha: 0, stagger: 0.04, duration: 0.5 }, 0.9);
}

/** Buttons lean toward the cursor. */
function magneticButtons() {
  if (!finePointer()) return;
  document.querySelectorAll<HTMLElement>('.button, .carousel__arrow').forEach((el) => {
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
