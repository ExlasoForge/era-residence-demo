import React, { useLayoutEffect, useRef } from 'react';
import { gsap, MQ, isDesktop, scrollToTop, animateTextH, animateTextP, animateCtn } from '../lib/anim';
import { useIntroReady } from '../hooks/useScrollReveal';
import { Emblem, RollText } from './Emblem';

interface FooterProps {
  onNavigate: (view: 'home' | 'apartments' | 'contact', sectionId?: string) => void;
  onOpenBookCall?: () => void;
  onReplayIntro?: () => void;
  /** On the home view the footer rises over the CTA image and clips it inward. */
  overlapCta?: boolean;
}

/**
 * Plum footer. On the home page it overlaps the bottom of the CTA: as it rises the CTA image insets
 * to a centred band (inset 8% 22%), the footer content scales up from 0.75 and fades in, and the
 * phone number reveals letter by letter.
 */
export const Footer: React.FC<FooterProps> = ({ onReplayIntro, overlapCta = false }) => {
  const ready = useIntroReady();
  const wRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const w = wRef.current;
    const s = sRef.current;
    if (!w || !s) return;
    const hs = w.querySelectorAll('[data-text="h"]');
    const ps = w.querySelectorAll('[data-text="p"]');
    const ctns = w.querySelectorAll('[data-text="ctn"]');
    let cancelled = false;
    const ctx = gsap.context(() => {});
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        gsap.set([...hs, ...ps, ...ctns], { visibility: 'visible' });
        animateTextH(hs, 'initial');
        animateTextP(ps, 'initial');
        animateCtn(ctns, 'initial');
        if (!ready) return;
        const clip = overlapCta ? document.querySelector('[data-footer-clip]') : null;
        const motion = window.matchMedia(MQ.motion).matches;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: w,
            start: 'top 30%',
            end: 'bottom bottom',
            scrub: 0.5,
            onEnter: () => {
              animateTextH(hs, 'reveal', 0.1);
              animateTextP(ps, 'reveal', 0.1);
              animateCtn(ctns, 'reveal', 0.1);
            },
            onLeaveBack: () => {
              animateTextH(hs, 'hide', 0);
              animateTextP(ps, 'hide', 0);
              animateCtn(ctns, 'hide', 0);
            },
          },
        });
        if (motion) {
          if (clip) {
            tl.fromTo(
              clip,
              { clipPath: 'inset(0% 0% 0% 0%)' },
              { clipPath: isDesktop() ? 'inset(8% 22% 8% 22%)' : 'inset(4% 32% 4% 32%)', ease: 'none' },
              0
            );
          }
          tl.fromTo(s, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, ease: 'none' }, 0);
        }
      });
    });
    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [ready, overlapCta]);

  return (
    <footer id="site-footer" className={`er-section theme-dark footer-sec ${overlapCta ? 'is-overlap' : ''}`} data-bg="dark">
      <div className="er-container">
        <div ref={wRef} className="footer-w">
          <button type="button" className="footer-s_top" onClick={() => scrollToTop(false)}>
            <span className="t-l2" style={{ color: 'inherit' }}>
              To top
            </span>
            <svg viewBox="0 0 48 12" fill="none" aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
              <path d="M0 6H46M46 6L41 1M46 6L41 11" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>

          <div ref={sRef} className="footer-s">
            <div className="footer-s_t" />
            <div className="footer-s_c">
              <div className="er-grid">
                <div className="footer-s_contact">
                  <div className="s_logo">
                    <div className="ico-64" data-text="ctn">
                      <Emblem />
                    </div>
                  </div>
                  <div style={{ height: 'var(--u-32)' }} />
                  <a href="tel:+34655408648" className="footer-phone">
                    <span className="t-h2 a-center block" data-text="h">
                      +34 (655) 408-648
                    </span>
                  </a>
                </div>
                <div className="footer-s_address" data-text="ctn">
                  <div style={{ height: 'var(--u-32)' }} />
                  <h3 className="t-l1 reg a-center">Sales Office</h3>
                  <p className="t-l1 a-center">Avenida Litoral, 29680 Estepona, Málaga, Spain</p>
                </div>
              </div>
            </div>
            <div className="footer-s_b">
              <div className="er-grid">
                <div className="footer-s_info">
                  <div className="t-l1" data-text="p">
                    Era Residence.
                  </div>
                  <div className="t-l1 reg whitespace-nowrap" data-text="p">
                    © 2026 All rights reserved
                  </div>
                  <div className="t-l1" data-text="p">
                    Privacy policy, Terms of use
                  </div>
                </div>
                <div className="footer-s_credits" data-text="ctn">
                  {onReplayIntro && (
                    <button type="button" onClick={onReplayIntro} className="group t-l1 reg cursor-pointer" style={{ color: 'inherit' }}>
                      <RollText>Replay opening</RollText>
                    </button>
                  )}
                  <div style={{ height: 'var(--u-16)' }} />
                  <div className="footer-credits_logo" aria-hidden="true">
                    ∞
                  </div>
                  <div className="t-l1 reg">Made by</div>
                  <div className="t-l1">TheFirstTheLast</div>
                </div>
              </div>
              <div style={{ height: 'var(--u-48)' }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
