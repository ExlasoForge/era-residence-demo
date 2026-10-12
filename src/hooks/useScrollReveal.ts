import { createContext, useContext, useLayoutEffect, useRef, RefObject } from 'react';
import { gsap, ScrollTrigger, REVEALERS, RevealType, horizontalTweens } from '../lib/anim';

// True once the preloader has opened onto the page; scroll reveals only arm after that
export const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

const TYPES: RevealType[] = ['a', 'h', 'p', 'ctn', 'line', 'slide'];

type Group = { trigger: Element; items: Element[]; type: RevealType };

function collect(root: Element): Group[] {
  const groups: Group[] = [];
  TYPES.forEach((type) => {
    const map = new Map<Element, Element[]>();
    root.querySelectorAll(`[data-reveal="${type}"]`).forEach((el) => {
      const trigger = el.closest('[data-reveal-w]') || el;
      if (!map.has(trigger)) map.set(trigger, []);
      map.get(trigger)!.push(el);
    });
    map.forEach((items, trigger) => groups.push({ trigger, items, type }));
  });
  return groups;
}

/**
 * Mirrors the reference `initScrollElementsReveal`: every `[data-reveal=type]` inside the scope is
 * put into its hidden state, then revealed once when its wrapper (`[data-reveal-w]` or itself)
 * scrolls into view. Elements inside a horizontal track use that track as containerAnimation.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const ready = useIntroReady();
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    let cancelled = false;
    const ctx = gsap.context(() => {}, root);
    ctxRef.current = ctx;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        const groups = collect(root);
        groups.forEach(({ items, type }) => {
          gsap.set(items, { visibility: 'visible' });
          REVEALERS[type](items, 'initial');
        });
        if (!ready) return;
        groups.forEach(({ trigger, items, type }) => {
          const area = trigger.closest('[data-horizontal]');
          const containerAnimation = area ? horizontalTweens.get(area) : undefined;
          ScrollTrigger.create({
            trigger,
            containerAnimation,
            start: containerAnimation ? 'left right' : 'top bottom',
            once: true,
            onEnter: () => REVEALERS[type](items, 'reveal'),
          });
        });
      });
    });

    return () => {
      cancelled = true;
      ctx.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, ...deps]);

  return ctxRef;
}
