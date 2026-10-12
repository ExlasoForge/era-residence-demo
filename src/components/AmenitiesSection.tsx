import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap, MQ, DUR_M, animateTextP, animateSlide } from '../lib/anim';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { AMENITIES } from '../data/siteData';
import { MagneticButton } from './MagneticButton';

interface AmenitiesSectionProps {
  onBookCall: () => void;
}

/**
 * Pinned amenities screen. While the next section's circle rises over it, the imagery scales to 2x
 * and the whole screen fades out. The amenity list on the right switches the content.
 */
export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ onBookCall }) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const wRef = useRef<HTMLDivElement>(null);
  const cmsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const hilightRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const busyRef = useRef(false);

  useScrollReveal(sectionRef);
  useParallax(sectionRef);

  useLayoutEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap
        .timeline({ scrollTrigger: { trigger: area, start: 'top top', end: 'bottom bottom', scrub: true } })
        .fromTo(cmsRef.current, { scale: 1 }, { scale: 2, ease: 'In' })
        .fromTo(wRef.current, { opacity: 1 }, { opacity: 0, ease: 'In' }, '<');
    });
    return () => mm.revert();
  }, []);

  // Slide the highlight bar next to the active amenity
  useLayoutEffect(() => {
    const tab = tabsRef.current?.querySelectorAll<HTMLElement>('[data-tab]')[active];
    if (tab && hilightRef.current) {
      gsap.to(hilightRef.current, { y: tab.offsetTop, height: tab.offsetHeight, duration: DUR_M, ease: 'InOut' });
    }
  }, [active]);

  const selectTab = (next: number) => {
    const cms = cmsRef.current;
    if (!cms || next === activeRef.current || busyRef.current) return;
    busyRef.current = true;
    const items = cms.querySelectorAll<HTMLElement>('[data-tab-content]');
    const prev = items[activeRef.current];
    const cur = items[next];
    activeRef.current = next;
    setActive(next);
    gsap
      .timeline({ onComplete: () => void (busyRef.current = false) })
      .set(cur, { display: 'block', position: 'relative', zIndex: 1 })
      .set(prev, { display: 'block', position: 'absolute', zIndex: 0 })
      .add(() => {
        gsap.set(cur.querySelectorAll('[data-tab]'), { visibility: 'visible' });
        animateTextP(cur.querySelectorAll('[data-tab="p"]'), 'initial');
        animateSlide(cur.querySelectorAll('[data-tab="slide"]'), 'initial');
      })
      .add(() => {
        animateTextP(prev.querySelectorAll('[data-tab="p"]'), 'hide', 0);
        animateSlide(prev.querySelectorAll('[data-tab="slide"]'), 'hide', 0);
        animateSlide(cur.querySelectorAll('[data-tab="slide"]'), 'reveal', 0);
      })
      .to({}, { duration: DUR_M })
      .add(() => animateTextP(cur.querySelectorAll('[data-tab="p"]'), 'reveal', 0))
      .to({}, { duration: 0.4 })
      .set(prev, { display: 'none' });
  };

  return (
    <div ref={areaRef} className="amen-area">
      <div className="amen-screen">
        <section ref={sectionRef} id="amenities" className="er-section theme-color er-clip" data-bg="color">
          <div className="er-container">
            <div ref={wRef} className="amen-w">
              <div className="amen-s">
                <div ref={cmsRef} className="amen-cms">
                  {AMENITIES.map((a, i) => (
                    <div
                      key={a.id}
                      data-tab-content
                      className="amen-item"
                      style={{ display: i === 0 ? 'block' : 'none', position: i === 0 ? 'relative' : 'absolute' }}
                    >
                      <div className="amen-slide" data-parallax-w>
                        <div className="amen-slide_b">
                          <div className="er-grid">
                            <div className="amen-slide_title">
                              <h3 className="t-l1" data-tab="p" data-reveal={i === 0 ? 'p' : undefined}>
                                {a.title}
                              </h3>
                            </div>
                            <div className="amen-slide_desc">
                              <div className="red-line" />
                              <h4 className="t-h5" data-tab="p" data-reveal={i === 0 ? 'p' : undefined}>
                                {a.description}
                              </h4>
                            </div>
                          </div>
                          <div style={{ height: 'var(--u-48)' }} />
                        </div>
                        <div className="amen-slide_img">
                          <div className="img-w" data-tab="slide">
                            <div className="img-w">
                              <img src={a.image} alt={a.title} className="img-p" data-parallax="img-in" loading={i === 0 ? 'eager' : 'lazy'} fetchPriority="low" />
                            </div>
                            <div className="img-over-grad from-top" />
                            <div className="img-over-grad bot h-4x" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="amen-tabs-w">
                  <div className="er-grid">
                    <div ref={tabsRef} className="amen-tabs">
                      {AMENITIES.map((a, i) => (
                        <button
                          key={a.id}
                          type="button"
                          data-tab
                          className={`amen-tab t-h5 ${i === active ? 'is-active' : ''}`}
                          onClick={() => selectTab(i)}
                        >
                          <span data-reveal="p">{a.title}</span>
                        </button>
                      ))}
                      <div className="amen-tabs_line" data-reveal="line">
                        <div ref={hilightRef} className="amen-tabs_hilight" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="amen-btn-w">
                  <div className="er-grid">
                    <div className="amen-btn" data-reveal="ctn">
                      <MagneticButton onClick={onBookCall} ariaLabel="Book a call now">
                        Book a call now
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
