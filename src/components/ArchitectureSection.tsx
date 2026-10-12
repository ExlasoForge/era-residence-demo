import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, MQ, DUR_S, animateTextH, animateTextP } from '../lib/anim';
import { useIntroReady } from '../hooks/useScrollReveal';
import { Flower } from './BougainvilleaFlowers';
import { MagneticButton } from './MagneticButton';

interface ArchitectureSectionProps {
  onBookCall: () => void;
}

const ARCH_IMAGE = 'https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a0f8994091fd12c24e79c8a_img_cam_02.webp';

// Cream overlay halves drawn as "frame with a hole" polygons (values from the reference script)
const L_START =
  'polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 36.111%, 98.889% 36.111%, 98.889% 99.074%, 44.444% 99.074%, 1.111% 100%, 100% 100%, 100% 0%)';
const L_GROWN =
  'polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 98.889% 18.519%, 98.889% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)';
const L_MERGED =
  'polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 100% 18.519%, 100% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)';
const R_START =
  'polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 0.926%, 55.556% 0.926%, 55.556% 63.889%, 1.111% 63.889%, 1.111% 100%, 100% 100%, 100% 0%)';
const R_GROWN =
  'polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 1.111% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)';
const R_MERGED =
  'polygon(0% 0%, 0% 100%, 0% 100%, 0% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 0% 81.481%, 0% 100%, 100% 100%, 100% 0%)';

/**
 * Architecture: a pinned cream screen with two image windows (left low, right high) that grow to the
 * same height and merge into one; the screen then scales past the viewport while the image layer
 * behind settles from 0.75x, leaving the full-bleed render with a fitted "ARCHITECTURE" title,
 * the architects' quote and the call button.
 */
export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ onBookCall }) => {
  const ready = useIntroReady();
  const areaRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const bgLRef = useRef<HTMLDivElement>(null);
  const bgRRef = useRef<HTMLDivElement>(null);
  const flowerLRef = useRef<HTMLDivElement>(null);
  const flowerRRef = useRef<HTMLDivElement>(null);
  const archWRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Fit "ARCHITECTURE" to the full column width (reference data-fit-text)
  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const fit = () => {
      const parent = title.parentElement;
      if (!parent) return;
      title.style.fontSize = '';
      title.style.whiteSpace = 'nowrap';
      title.style.width = 'max-content';
      const size = parseFloat(getComputedStyle(title).fontSize);
      const ratio = parent.clientWidth / title.offsetWidth;
      title.style.width = '';
      title.style.fontSize = `${size * ratio}px`;
    };
    document.fonts.ready.then(fit);
    ScrollTrigger.addEventListener('refreshInit', fit);
    return () => ScrollTrigger.removeEventListener('refreshInit', fit);
  }, []);

  // Window grow → merge → zoom-through, scrubbed across the pinned intro
  useLayoutEffect(() => {
    const area = areaRef.current;
    const intro = introRef.current;
    if (!area || !intro) return;
    const mm = gsap.matchMedia();
    mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
      gsap
        .timeline({ scrollTrigger: { trigger: intro, start: 'top bottom', end: '200% top', scrub: true } })
        .fromTo(bgLRef.current, { clipPath: L_START }, { clipPath: L_GROWN, ease: 'none', duration: 0.5 })
        .fromTo(bgRRef.current, { clipPath: R_START }, { clipPath: R_GROWN, ease: 'none', duration: 0.5 }, '<')
        .to(bgLRef.current, { clipPath: L_MERGED, ease: 'none', duration: 0.1 })
        .to(bgRRef.current, { clipPath: R_MERGED, ease: 'none', duration: 0.1 }, '<')
        .fromTo(intro, { scale: 1 }, { scale: 1.84, ease: 'InOut', duration: 0.4 })
        .to(flowerLRef.current, { scale: 1.84, xPercent: -50, ease: 'InOut', duration: 0.4 }, '<')
        .to(flowerRRef.current, { scale: 1.84, xPercent: 50, ease: 'InOut', duration: 0.4 }, '<')
        .fromTo(archWRef.current, { scale: 0.75, transformOrigin: 'center top' }, { scale: 1, ease: 'InOut', duration: 0.4 }, '<');

      gsap.to(imgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: { trigger: area, start: '55% top', end: 'bottom top', scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  // Title letters and caption reveal once the image has taken over the screen
  useLayoutEffect(() => {
    const area = areaRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    if (!area || !title || !desc) return;
    let cancelled = false;
    const ctx = gsap.context(() => {});
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        gsap.set([title, desc], { visibility: 'visible' });
        animateTextH(title, 'initial');
        animateTextP(desc, 'initial');
        if (!ready) return;
        ScrollTrigger.create({
          trigger: area,
          start: () => (window.innerWidth >= 992 ? '30% top' : 'top 60%'),
          onEnter: () => {
            animateTextH(title, 'reveal', 0);
            animateTextP(desc, 'reveal', DUR_S);
          },
          onLeaveBack: () => {
            animateTextH(title, 'hide', 0);
            animateTextP(desc, 'hide', 0);
          },
        });
      });
    });
    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [ready]);

  return (
    <section id="architecture" className="er-section theme-light er-clip arch-sec">
      <div className="er-container">
        <div ref={areaRef} className="arch-area">
          <div ref={introRef} className="arch-intro-s" aria-hidden="true">
            <div className="arch-intro-s_bg">
              <div ref={bgLRef} className="arch-intro-s_bg_l" />
              <div ref={bgRRef} className="arch-intro-s_bg_r" />
              <Flower ref={flowerLRef} n={5} className="flower-arch-l" />
              <Flower ref={flowerRRef} n={7} className="flower-arch-r" />
            </div>
          </div>

          <div ref={archWRef} className="arch-w theme-color">
            <div className="arch-s">
              <div className="arch-s_t">
                <div style={{ height: 'var(--u-96)' }} />
                <div className="arch-s_title">
                  <h2 ref={titleRef} className="t-h1 a-center arch-title" data-part="h">
                    Architecture
                  </h2>
                </div>
                <div className="er-grid">
                  <div className="arch-s_desc">
                    <p ref={descRef} className="t-l1 a-center" data-part="p">
                      Architecture &amp; Form
                    </p>
                  </div>
                </div>
              </div>

              <div className="arch-s_b">
                <div className="er-grid">
                  <div className="arch-s_quote">
                    <div className="red-line" />
                    <h3 className="t-h5">
                      The architecture of Era Residences balances clean contemporary lines with Mediterranean warmth and texture
                    </h3>
                    <div style={{ height: 'var(--u-32)' }} />
                    <div className="er-grid arch-grid-4">
                      <div className="arch-s_author">
                        <div className="t-l1">By Schiemann Weyers</div>
                        <div className="t-l1 reg">Architects • OCWA Architects</div>
                      </div>
                    </div>
                  </div>
                  <div className="arch-s_btn">
                    <MagneticButton onClick={onBookCall} ariaLabel="Book a call now">
                      Book a call now
                    </MagneticButton>
                  </div>
                </div>
                <div style={{ height: 'var(--u-48)' }} />
              </div>
            </div>

            <div className="arch-w_bg">
              <div className="img-w">
                <img ref={imgRef} src={ARCH_IMAGE} alt="Contemporary Mediterranean architecture with stone and pergolas" loading="eager" fetchPriority="low" />
              </div>
              <div className="img-over-grad bot h-vh" />
              <div className="img-over-grad bot h-vh" />
            </div>
          </div>

          <div className="arch-spacer" />
          <div className="arch-spacer" />

          <div className="arch-themes" aria-hidden="true">
            <div data-bg="light" className="arch-themes_light" />
            <div data-bg="color" className="arch-themes_color" />
          </div>
        </div>
      </div>
    </section>
  );
};
