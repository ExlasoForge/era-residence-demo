import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// Easing curves and timings taken from the reference site's animation script
CustomEase.create('InOut', '0.75,0,0.25,1');
CustomEase.create('Out', '0.25,1,0.5,1');
CustomEase.create('In', '0.5,0,0.75,0');
CustomEase.create('Ease', '0.25,0.1,0.25,1');
CustomEase.create('diveIn', '0.6,0,0,1');
CustomEase.create('horScroll', '0.25,0,0.75,1');

export const BREAKPOINT = 992;
export const DUR_S = 0.4;
export const DUR_M = 0.8;
export const DUR_L = 1.2;
export const STAGGER = 0.1;
export const DELAY_REVEAL = 0.3;

export const MQ = {
  desktop: `(min-width: ${BREAKPOINT}px)`,
  mobile: `(max-width: ${BREAKPOINT - 1}px)`,
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(MQ.reduce).matches;

export const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= BREAKPOINT;

// Shared Lenis instance so the preloader and nav can stop/start or drive it
let lenisInstance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenisInstance = l;
};
export const getLenis = () => lenisInstance;

export function lockScroll() {
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${sbw}px`);
  document.body.style.paddingRight = 'var(--scrollbar-width)';
  document.documentElement.style.overflow = 'hidden';
  lenisInstance?.stop();
}

export function unlockScroll() {
  document.documentElement.style.removeProperty('--scrollbar-width');
  document.body.style.paddingRight = '';
  document.documentElement.style.overflow = '';
  lenisInstance?.start();
}

export function scrollToTop(immediate = true) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}

export function scrollToElement(el: HTMLElement) {
  if (lenisInstance) lenisInstance.scrollTo(el, { duration: DUR_L * 1.5 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

/* -------------------------------------------------------------------------- */
/*  Text / block reveal primitives (ported 1:1 from the reference site)       */
/* -------------------------------------------------------------------------- */

export type RevealMode = 'reveal' | 'hide' | 'initial';
export type RevealType = 'a' | 'h' | 'p' | 'ctn' | 'line' | 'slide';

const splits = new WeakMap<Element, SplitText>();

const t = (d: number) => (prefersReducedMotion() ? 0 : d);

function splitChars(el: Element, withWords: boolean) {
  let s = splits.get(el);
  if (!s || !s.isSplit) {
    s = new SplitText(el, {
      type: withWords ? 'words,chars' : 'chars',
      tag: 'span',
      wordsClass: 'split-word',
      charsClass: 'split-char',
      smartWrap: true,
    });
    splits.set(el, s);
  }
  return s;
}

function splitLines(el: Element) {
  let s = splits.get(el);
  if (!s || !s.isSplit) {
    s = new SplitText(el, {
      type: 'lines,words',
      tag: 'span',
      linesClass: 'split-line',
      wordsClass: 'split-word',
      mask: 'lines',
    });
    splits.set(el, s);
  }
  return s;
}

// Line splits are reverted once revealed so text re-wraps naturally on resize
function releaseLines(el: Element) {
  const s = splits.get(el);
  if (s) {
    s.revert();
    splits.delete(el);
  }
}

const toArray = (targets: gsap.TweenTarget) =>
  (gsap.utils.toArray(targets) as Element[]).filter((el) => el.textContent?.trim());

export function animateTextA(targets: gsap.TweenTarget, mode: RevealMode, delay?: number) {
  toArray(targets).forEach((el, i) => {
    const { chars } = splitChars(el, false);
    if (mode === 'reveal') {
      gsap.fromTo(
        chars,
        { opacity: 0, rotateX: 90, x: '10vw', transformOrigin: 'center bottom' },
        {
          opacity: 1,
          rotateX: 0,
          x: 0,
          duration: t(DUR_L),
          delay: t((delay ?? DELAY_REVEAL) + i * STAGGER),
          stagger: t(STAGGER),
          ease: 'Out',
          overwrite: true,
        }
      );
    } else if (mode === 'hide') {
      gsap.to(chars, {
        opacity: 0,
        rotateX: -90,
        x: '-10vw',
        transformOrigin: 'center top',
        duration: t(DUR_S),
        delay: t(delay ?? 0),
        stagger: t(STAGGER * 0.5),
        ease: 'In',
        overwrite: true,
      });
    } else {
      gsap.set(chars, { opacity: 0, rotateX: -90, x: '-10vw', transformOrigin: 'center top' });
    }
  });
}

export function animateTextH(targets: gsap.TweenTarget, mode: RevealMode, delay?: number) {
  toArray(targets).forEach((el, i) => {
    const { chars } = splitChars(el, true);
    if (mode === 'reveal') {
      gsap.fromTo(
        chars,
        { opacity: 0, yPercent: 50, rotateY: 90 },
        {
          opacity: 1,
          yPercent: 0,
          rotateY: 0,
          duration: t(DUR_L),
          delay: t((delay ?? DELAY_REVEAL) + i * STAGGER),
          stagger: t(STAGGER * 0.5),
          ease: 'Out',
          overwrite: true,
        }
      );
    } else if (mode === 'hide') {
      gsap.to(chars, {
        opacity: 0,
        yPercent: -50,
        rotateY: -90,
        duration: t(DUR_S),
        delay: t(delay ?? 0),
        stagger: t(STAGGER * 0.25),
        ease: 'In',
        overwrite: true,
      });
    } else {
      gsap.set(chars, { opacity: 0, yPercent: 50, rotateY: 90 });
    }
  });
}

export function animateTextP(targets: gsap.TweenTarget, mode: RevealMode, delay?: number) {
  toArray(targets).forEach((el, i) => {
    const { lines } = splitLines(el);
    if (mode === 'reveal') {
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: t(DUR_L),
          delay: t((delay ?? DELAY_REVEAL) + i * STAGGER),
          stagger: t(STAGGER),
          ease: 'Out',
          overwrite: true,
          onComplete: () => releaseLines(el),
        }
      );
    } else if (mode === 'hide') {
      gsap.to(lines, {
        yPercent: -110,
        duration: t(DUR_S),
        delay: t(delay ?? 0),
        stagger: t(STAGGER * 0.5),
        ease: 'In',
        overwrite: true,
      });
    } else {
      gsap.set(lines, { yPercent: 110 });
    }
  });
}

const ctnOffset = () => (isDesktop() ? 'calc(53.33 * var(--px))' : 'calc(184.6 * var(--px))');

export function animateCtn(targets: gsap.TweenTarget, mode: RevealMode, delay?: number) {
  const els = gsap.utils.toArray(targets) as Element[];
  if (!els.length) return;
  if (mode === 'reveal') {
    gsap.fromTo(
      els,
      { opacity: 0, y: ctnOffset() },
      {
        opacity: 1,
        y: 0,
        duration: t(DUR_L),
        delay: t(delay ?? DELAY_REVEAL),
        stagger: t(STAGGER),
        ease: 'Out',
        overwrite: true,
      }
    );
  } else if (mode === 'hide') {
    gsap.to(els, {
      opacity: 0,
      y: 0,
      duration: t(DUR_S),
      delay: t(delay ?? 0),
      stagger: t(STAGGER * 0.5),
      ease: 'In',
      overwrite: true,
    });
  } else {
    gsap.set(els, { opacity: 0, y: ctnOffset() });
  }
}

export function animateLine(targets: gsap.TweenTarget, mode: RevealMode, delay?: number) {
  const els = gsap.utils.toArray(targets) as Element[];
  if (!els.length) return;
  if (mode === 'reveal') {
    gsap.fromTo(
      els,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: t(DUR_L),
        delay: t(delay ?? DELAY_REVEAL),
        stagger: t(STAGGER),
        ease: 'Out',
        overwrite: true,
      }
    );
  } else if (mode === 'hide') {
    gsap.to(els, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: t(DUR_S),
      delay: t(delay ?? 0),
      stagger: t(STAGGER * 0.5),
      ease: 'In',
      overwrite: true,
    });
  } else {
    gsap.set(els, { clipPath: 'inset(0% 0% 100% 0%)' });
  }
}

// Slanted clip-path wipe from the right edge with the inner image settling from 1.5x
export function animateSlide(targets: gsap.TweenTarget, mode: RevealMode, delay?: number) {
  const els = gsap.utils.toArray(targets) as HTMLElement[];
  if (!els.length) return;
  const inner = els.map((e) => e.firstElementChild).filter(Boolean) as Element[];
  if (mode === 'reveal') {
    gsap.fromTo(
      els,
      { clipPath: 'polygon(100% 0%, 100% 0%, 101% 100%, 125% 100%)' },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: t(DUR_L),
        delay: t(delay ?? DELAY_REVEAL),
        ease: 'InOut',
        overwrite: true,
      }
    );
    gsap.fromTo(
      inner,
      { scale: 1.5, xPercent: 25 },
      { scale: 1, xPercent: 0, duration: t(DUR_L), delay: t(delay ?? DELAY_REVEAL), ease: 'InOut', overwrite: true }
    );
  } else if (mode === 'hide') {
    gsap.fromTo(
      els,
      { clipPath: 'polygon(0% 0%, 100% 0%, 125% 100%, 0% 100%)' },
      {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        duration: t(DUR_L),
        delay: t(delay ?? 0),
        ease: 'InOut',
        overwrite: true,
      }
    );
    gsap.to(inner, { scale: 1.5, xPercent: -25, duration: t(DUR_L), delay: t(delay ?? 0), ease: 'InOut', overwrite: true });
  } else {
    gsap.set(els, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(inner, { scale: 1.5, xPercent: 25 });
  }
}

export const REVEALERS: Record<RevealType, (t: gsap.TweenTarget, m: RevealMode, d?: number) => void> = {
  a: animateTextA,
  h: animateTextH,
  p: animateTextP,
  ctn: animateCtn,
  line: animateLine,
  slide: animateSlide,
};

// Horizontal-scroll tweens, keyed by their scroll area, so reveals inside can use containerAnimation
export const horizontalTweens = new WeakMap<Element, gsap.core.Tween>();

export { gsap, ScrollTrigger, SplitText };
