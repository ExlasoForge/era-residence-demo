import React, { useLayoutEffect, useRef } from 'react';
import { gsap, DUR_L, DUR_S, isDesktop, lockScroll, unlockScroll, scrollToTop, prefersReducedMotion } from '../lib/anim';

interface PreloaderProps {
  onReveal?: () => void;
  onComplete: () => void;
}

/**
 * Plum curtain with an arch-shaped window. The faint "Estepona" watermark and frame fade in while
 * the arch rises from below the fold, then the arch dives past the top and widens beyond the
 * viewport, uncovering the hero (whose render settles from a smaller scale at the same time).
 */
export const Preloader: React.FC<PreloaderProps> = ({ onReveal, onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const desk = isDesktop();
    const archStart = desk ? '24vw' : '40vw';
    const archMid = desk ? '36vw' : '50vw';
    const heroScale = desk ? 0.75 : 1.15;
    const heroImg = document.querySelector<HTMLElement>('[data-hero-img]');

    scrollToTop();
    lockScroll();

    const finish = () => {
      unlockScroll();
      onComplete();
    };

    if (prefersReducedMotion()) {
      onReveal?.();
      const tween = gsap.to(root, { opacity: 0, duration: DUR_S, onComplete: finish });
      return () => {
        tween.kill();
        unlockScroll();
      };
    }

    if (heroImg) gsap.set(heroImg, { scale: heroScale, transformOrigin: 'center top' });

    const tl = gsap
      .timeline()
      .set(root, { '--arch-w': archStart, '--arch-y': '104vh' })
      .fromTo(watermarkRef.current, { opacity: 0 }, { opacity: 0.05, duration: DUR_L, ease: 'Out' })
      .fromTo(decorRef.current, { opacity: 0 }, { opacity: 1, duration: DUR_L, ease: 'Out' }, '<')
      .fromTo(
        root,
        { '--arch-w': archStart, '--arch-y': '104vh' },
        { '--arch-w': archMid, '--arch-y': '15vh', duration: 1.25 * DUR_L, ease: 'InOut' },
        '<'
      )
      .to(root, { '--arch-w': '125vw', '--arch-y': '-100vh', duration: 2 * DUR_L, ease: 'diveIn' }, '<90%')
      .add(() => {
        if (heroImg) gsap.fromTo(heroImg, { scale: heroScale }, { scale: 1, duration: 1.25 * DUR_L, ease: 'InOut' });
      }, '<')
      .add(() => onReveal?.(), '<25%')
      .add(finish);

    return () => {
      tl.kill();
      unlockScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="er-preloader theme-color" aria-hidden="true">
      <div className="er-preloader_bg" />
      <div ref={watermarkRef} className="er-preloader_watermark">
        <span>Estepona</span>
      </div>
      <div ref={decorRef} className="er-preloader_decor">
        <div className="er-preloader_frame" />
        <div className="er-preloader_arch is-2" />
        <div className="er-preloader_arch is-1" />
      </div>
    </div>
  );
};
