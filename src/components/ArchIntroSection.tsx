import React, { useLayoutEffect, useRef } from 'react';
import { gsap, MQ } from '../lib/anim';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { useRevealSlider } from '../hooks/useRevealSlider';
import { REASONS } from '../data/siteData';
import { SliderPag } from './SliderPag';
import { Emblem } from './Emblem';

const QUOTE_IMAGE =
  'https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a0f8c07861fe831459ff0d9_img_cam_05_alpha.webp';

/**
 * 1. Dome: a powder-blue section with a 50vw top radius rises over the pinned hero; "Three reasons
 *    to choose Era" runs along an inner circle and its word spacing opens up with scroll.
 * 2. Benefits slider (three reasons).
 * 3. The building cut-out rises out of the blue with the architecture-team quote over the pool.
 */
export const ArchIntroSection: React.FC = () => {
  const domeRef = useRef<HTMLElement>(null);
  const domeTextRef = useRef<SVGTextElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);

  const slider = useRevealSlider(sliderRef, REASONS.length);
  useScrollReveal(domeRef);
  useScrollReveal(benefitsRef);
  useScrollReveal(quoteRef);
  useParallax(quoteRef);

  useLayoutEffect(() => {
    const dome = domeRef.current;
    const text = domeTextRef.current;
    if (!dome || !text) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        text,
        { wordSpacing: '0vw' },
        { wordSpacing: '10vw', ease: 'none', scrollTrigger: { trigger: dome.firstElementChild, start: 'top bottom', end: 'bottom top', scrub: true } }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <section ref={domeRef} className="er-section theme-brand er-clip er-dome">
        <div className="er-container">
          <div className="dome-w">
            <div className="dome-s">
              <div className="dome-s_title" aria-label="Three reasons to choose Era">
                <svg viewBox="0 0 1600 1600" width="100%" height="100%" className="dome-desk" aria-hidden="true">
                  <defs>
                    <path id="dome-circle-desk" d="M 800,800 m -676,0 a 676,676 0 1,1 1352,0 a 676,676 0 1,1 -1352,0" />
                  </defs>
                  <text ref={domeTextRef} className="dome-text" textAnchor="middle" fill="currentColor">
                    <textPath href="#dome-circle-desk" startOffset="25%">
                      Three reasons to choose Era
                    </textPath>
                  </text>
                </svg>
              </div>

              <div className="s_logo dome-logo">
                <div className="info-s_logo_l">
                  <div className="t-l1 a-center" data-reveal="p">
                    Costa
                  </div>
                </div>
                <div className="ico-48" data-reveal="ctn">
                  <Emblem />
                </div>
                <div className="info-s_logo_r">
                  <div className="t-l1 a-center" data-reveal="p">
                    del Sol
                  </div>
                </div>
              </div>
              <div style={{ height: 'var(--u-48)' }} />
              <div className="er-divider">
                <div className="line-v" data-reveal="line" />
              </div>
              <div style={{ height: 'var(--u-48)' }} />
              <div className="er-grid">
                <div className="s_title">
                  <p className="t-l1 a-center" data-reveal="p">
                    A place to live — to return year after year
                  </p>
                </div>
              </div>
              <div style={{ height: 'var(--u-96)' }} />
            </div>
          </div>
        </div>
      </section>

      <section ref={benefitsRef} id="concept-reasons" className="er-section theme-brand benefits-sec" data-bg="light">
        <div className="er-container">
          <div className="benefits-s">
            <div className="er-grid benefits-grid">
              <div ref={sliderRef} className="benefits-s_cms">
                {REASONS.map((r, i) => {
                  const first = i === 0;
                  return (
                    <div key={r.title} data-slide className="benefit-slide">
                      <div className="benefit-slide_t">
                        <div style={{ height: 'var(--u-48)' }} />
                        <h3 className="t-h1 a-center benefit-slide_title" data-slider="h" data-reveal={first ? 'h' : undefined}>
                          {r.title}
                        </h3>
                        <div style={{ height: 'var(--u-48)' }} />
                      </div>
                      <div className="benefit-slide_c">
                        <div style={{ height: 'var(--u-16)' }} />
                        <div className="benefit-slide_img img-w" data-slider="img" data-reveal={first ? 'slide' : undefined}>
                          <img src={r.image} alt={r.title} loading="lazy" />
                        </div>
                        <div style={{ height: 'var(--u-16)' }} />
                      </div>
                      <div className="benefit-slide_b">
                        <div style={{ height: 'var(--u-48)' }} />
                        <div className="er-grid benefit-grid-8">
                          <p className="t-p1 a-center benefit-slide_desc" data-slider="p" data-reveal={first ? 'p' : undefined}>
                            {r.description}
                          </p>
                        </div>
                        <div style={{ height: 'var(--u-48)' }} />
                        <div className="er-grid benefit-grid-8">
                          <p className="t-l1 a-center benefit-slide_cap" data-slider="p" data-reveal={first ? 'p' : undefined}>
                            Designed as a community, not a complex
                          </p>
                        </div>
                        <div style={{ height: 'var(--u-48)' }} />
                      </div>
                    </div>
                  );
                })}
                <div className="benefits-pag" data-reveal="ctn">
                  <SliderPag
                    current={slider.current}
                    count={REASONS.length}
                    onPrev={slider.prev}
                    onNext={slider.next}
                    progressRef={slider.progressRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={quoteRef} className="er-section theme-brand quote-sec">
        <div className="er-container">
          <div className="quote-w">
            <div className="quote-s theme-color">
              <div className="er-grid">
                <div className="quote-s_c">
                  <div className="quote-s_ico" data-reveal="ctn" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="currentColor">
                      <path d="M10 34c-2.2 0-4-1.8-4-4 0-6 3-12 9-16l1.5 2c-3.4 2.6-5.2 5.6-5.5 9 3 0 5 2 5 4.5S14 34 10 34zm18 0c-2.2 0-4-1.8-4-4 0-6 3-12 9-16l1.5 2c-3.4 2.6-5.2 5.6-5.5 9 3 0 5 2 5 4.5S32 34 28 34z" />
                    </svg>
                  </div>
                  <div style={{ height: 'var(--u-32)' }} />
                  <div className="red-line" />
                  <blockquote className="t-h5" data-reveal="p">
                    Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private
                    homes than a standard.
                  </blockquote>
                  <div style={{ height: 'var(--u-64)' }} />
                  <div className="quote-s_author">
                    <div className="t-l1" data-reveal="p">
                      Architecture Team
                    </div>
                    <div className="t-l1 reg" data-reveal="p">
                      Era Residence
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ height: 'var(--u-48)' }} />
            </div>

            <div className="quote-w_bg" data-parallax-w>
              <div className="quote-w_bg_img">
                <img src={QUOTE_IMAGE} alt="Mediterranean architecture, walking paths and the central pool" data-parallax="img-out" />
                <div className="img-over-grad bot h-4x" />
                <div className="img-over-grad bot h-4x" />
              </div>
            </div>

            <div className="quote-themes" aria-hidden="true">
              <div data-bg="light" style={{ height: '35%' }} />
              <div data-bg="color" style={{ height: '65%' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
