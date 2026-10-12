import { useCallback, useEffect, useLayoutEffect, useRef, useState, RefObject } from 'react';
import { gsap, ScrollTrigger, animateTextH, animateTextP, animateCtn, animateSlide, DUR_M, DUR_S } from '../lib/anim';

const AUTO_DURATION = 6;

/**
 * Port of the reference `initSlider`. Slides are `[data-slide]` children of the root; inside each,
 * `[data-slider=h|p|ctn|img]` parts are hidden on the outgoing slide and revealed on the incoming one
 * while the image wipes across. Autoplays every 6s with a progress bar while the slider is on screen.
 */
export function useRevealSlider(rootRef: RefObject<HTMLElement | null>, count: number) {
  const [current, setCurrent] = useState(0);
  const state = useRef({ current: 0, animating: false });
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | undefined>(undefined);

  const slides = () => Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[data-slide]') ?? []);

  useLayoutEffect(() => {
    const all = slides();
    all.forEach((s, i) => gsap.set(s, i === 0 ? { display: 'block', position: 'relative' } : { display: 'none', position: 'absolute' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const go = useCallback(
    (next: number) => {
      const all = slides();
      const st = state.current;
      if (st.animating || next === st.current || !all[next]) return;
      st.animating = true;
      const prev = all[st.current];
      const cur = all[next];
      const q = (el: HTMLElement, part: string) => el.querySelectorAll(`[data-slider="${part}"]`);
      st.current = next;
      setCurrent(next);

      prev.style.zIndex = '0';
      cur.style.zIndex = '1';
      gsap.killTweensOf([prev, cur]);
      gsap
        .timeline({
          onComplete: () => {
            prev.style.zIndex = 'auto';
            st.animating = false;
          },
        })
        .set(cur, { display: 'block', position: 'relative' })
        .set(prev, { display: 'block', position: 'absolute' })
        .add(() => {
          animateTextH(q(cur, 'h'), 'initial');
          animateTextP(q(cur, 'p'), 'initial');
          animateCtn(q(cur, 'ctn'), 'initial');
          animateSlide(q(cur, 'img'), 'initial');
          // reveal-once hooks may not have visited hidden slides yet
          gsap.set(cur.querySelectorAll('[data-slider]'), { visibility: 'visible' });
        })
        .add(() => ScrollTrigger.refresh())
        .add(() => {
          animateTextH(q(prev, 'h'), 'hide', 0);
          animateTextP(q(prev, 'p'), 'hide', 0);
          animateCtn(q(prev, 'ctn'), 'hide', 0);
          animateSlide(q(prev, 'img'), 'hide', 0);
          animateSlide(q(cur, 'img'), 'reveal', 0);
        })
        .to({}, { duration: DUR_M })
        .add(() => {
          animateTextH(q(cur, 'h'), 'reveal', 0);
          animateTextP(q(cur, 'p'), 'reveal', 0);
          animateCtn(q(cur, 'ctn'), 'reveal', DUR_S);
        })
        .to({}, { duration: DUR_S })
        .set(prev, { display: 'none' });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const startProgress = () => {
    if (progressRef.current) gsap.fromTo(progressRef.current, { width: '0%' }, { width: '100%', duration: AUTO_DURATION, ease: 'none' });
  };
  const stop = () => {
    window.clearInterval(timerRef.current);
    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.set(progressRef.current, { width: '0%' });
    }
  };
  const start = () => {
    stop();
    startProgress();
    timerRef.current = window.setInterval(() => {
      go((state.current.current + 1) % count);
      startProgress();
    }, AUTO_DURATION * 1000);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || count < 2) return;
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.2 }
    );
    io.observe(root);
    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const next = () => {
    if (state.current.animating) return;
    start();
    go((state.current.current + 1) % count);
  };
  const prev = () => {
    if (state.current.animating) return;
    start();
    go((state.current.current - 1 + count) % count);
  };

  return { current, next, prev, progressRef };
}
