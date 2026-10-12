import { useLayoutEffect, RefObject } from 'react';
import { gsap, MQ } from '../lib/anim';

/**
 * Port of the reference `initAllParallax`. Inside the scope:
 *  - `[data-parallax=img|img-out|img-in]` move relative to their closest `[data-parallax-w]`
 *  - `[data-parallax=ctn-down|ctn-up]` drift over their own passage through the viewport
 * `data-mob="off"` / `data-desk="off"` disable an effect per breakpoint.
 */
export function useParallax(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add({ desktop: MQ.desktop, motion: MQ.motion }, (ctx) => {
      const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
      if (!motion) return;
      const enabled = (el: HTMLElement | null) => !!el && !(desktop ? el.dataset.desk === 'off' : el.dataset.mob === 'off');

      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const type = el.dataset.parallax;
        const wrap = el.closest<HTMLElement>('[data-parallax-w]');
        if (type === 'img' && enabled(wrap)) {
          gsap.fromTo(el, { yPercent: -15 }, { yPercent: 15, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top bottom', scrub: 0.5 } });
        } else if (type === 'img-out' && enabled(wrap)) {
          gsap.fromTo(
            el,
            { yPercent: 0 },
            { yPercent: 20, ease: 'none', scrollTrigger: { trigger: wrap, start: 'bottom bottom', end: 'bottom top', scrub: 0.5 } }
          );
        } else if (type === 'img-in' && enabled(wrap)) {
          gsap.fromTo(
            el,
            { yPercent: -20 },
            { yPercent: 0, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom bottom', scrub: true } }
          );
        } else if ((type === 'ctn-down' || type === 'ctn-up') && enabled(el)) {
          const from = type === 'ctn-down' ? -10 : 10;
          gsap.fromTo(
            el,
            { yPercent: from },
            { yPercent: -from, ease: 'none', scrollTrigger: { trigger: el, start: 'top 125%', end: 'bottom -25%', scrub: 0.5 } }
          );
        }
      });
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
