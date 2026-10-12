import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, DUR_L, DUR_M, animateTextP, animateCtn } from '../lib/anim';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { Flower } from './BougainvilleaFlowers';

const CARDS = [
  {
    title: 'Developer',
    description:
      'Developed by an established residential investment team with an extensive track record of delivering high-end boutique properties across the Costa del Sol.',
  },
  {
    title: 'Sales & Marketing',
    description:
      'Managed exclusively by dedicated bilingual advisors providing comprehensive guidance from initial reservation to notary completion.',
  },
  {
    title: 'License obtained',
    description:
      'Building license granted and fully verified. Construction backed by bank guarantees according to Spanish Ley 38/1999 for complete buyer security.',
  },
  {
    title: '2026',
    description:
      'Currently under construction. The first phase of construction is underway, with ongoing development of the apartments and communal areas.',
  },
];

/**
 * Developer / sales / license / 2026: large centred titles, each with a "+" that turns into a
 * cross and opens its description underneath (one open at a time).
 */
export const DeveloperSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const openRef = useRef<number | null>(null);
  useScrollReveal(sectionRef);
  useParallax(sectionRef);

  useLayoutEffect(() => {
    sectionRef.current?.querySelectorAll('.other-card_info').forEach((el) => gsap.set(el, { height: 0, overflow: 'hidden' }));
  }, []);

  const setCard = (i: number, isOpen: boolean) => {
    const card = sectionRef.current?.querySelectorAll<HTMLElement>('.other-card')[i];
    if (!card) return;
    const info = card.querySelector('.other-card_info');
    const ico = card.querySelector('.other-card_ico svg');
    const ps = card.querySelectorAll('[data-accordion="p"]');
    const ctns = card.querySelectorAll('[data-accordion="ctn"]');
    gsap.set([...ps, ...ctns], { visibility: 'visible' });
    if (isOpen) {
      gsap.to(info, { height: 'auto', duration: DUR_L, ease: 'Out', onComplete: () => ScrollTrigger.refresh() });
      gsap.fromTo(ico, { rotate: 0, transformOrigin: '50% 50%' }, { rotate: -45, duration: DUR_M, ease: 'InOut', overwrite: true });
      animateTextP(ps, 'reveal');
      animateCtn(ctns, 'reveal');
    } else {
      gsap.to(info, { height: 0, duration: DUR_L, ease: 'Out', overwrite: true, onComplete: () => ScrollTrigger.refresh() });
      gsap.to(ico, { rotate: -90, duration: DUR_M, ease: 'InOut', overwrite: true });
      animateTextP(ps, 'hide', 0);
      animateCtn(ctns, 'hide', 0);
    }
  };

  const toggle = (i: number) => {
    const prev = openRef.current;
    if (prev !== null && prev !== i) setCard(prev, false);
    const next = prev === i ? null : i;
    setCard(i, next === i);
    openRef.current = next;
    setOpen(next);
  };

  return (
    <section ref={sectionRef} id="developer" className="er-section theme-light er-clip" data-bg="light">
      <div className="er-container">
        <div className="other-w">
          <div style={{ height: 'var(--u-160)' }} />
          <div className="er-grid">
            <div className="s_title">
              <p className="t-l1 a-center" data-reveal="p">
                A place to live — to return year after year
              </p>
            </div>
          </div>
          <div style={{ height: 'var(--u-48)' }} />
          <div className="er-divider">
            <div className="line-v" data-reveal="line" />
          </div>
          <div style={{ height: 'var(--u-48)' }} />
          <div className="er-grid">
            <div className="other-s_cms">
              {CARDS.map((c, i) => (
                <div key={c.title} className="other-card">
                  <button
                    type="button"
                    className="other-card_name"
                    aria-expanded={open === i}
                    aria-controls={`other-card-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span className="other-card_name_label">
                      <span className="t-h3 a-center block" data-reveal="h">
                        {c.title}
                      </span>
                      <span className="other-card_ico" data-reveal="ctn" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="M2 8H14" stroke="currentColor" strokeWidth="1" />
                          <path d="M8 2V14" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </span>
                    </span>
                  </button>
                  <div id={`other-card-${i}`} className="other-card_info" role="region">
                    <div className="er-grid other-grid-6">
                      <div className="other-card_info_desc">
                        <div style={{ height: 'var(--u-24)' }} />
                        <p className="t-p1 a-center" data-accordion="p">
                          {c.description}
                        </p>
                        <div style={{ height: 'var(--u-24)' }} />
                        <div className="other-card_divider" data-accordion="ctn" />
                        <div style={{ height: 'var(--u-24)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 'var(--u-160)' }} />
        </div>
      </div>
      <Flower n={7} className="flower-other" parallax="ctn-down" />
    </section>
  );
};
