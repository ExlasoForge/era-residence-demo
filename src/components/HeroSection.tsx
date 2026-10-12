import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap, MQ, DUR_L } from '../lib/anim';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { HERO_PINS } from '../data/siteData';
import { PinItem } from '../types';
import { MagneticButton } from './MagneticButton';

interface HeroSectionProps {
  onSelectPin: (pin: PinItem) => void;
  onExploreApartments: () => void;
}

const DAY_IMAGE =
  'https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a25da81dce540a251389928_era-residence_gated-community_day.webp';
const NIGHT_IMAGE =
  'https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a25da802c253b9e5e3d44f5_era-residence_gated-community_night.webp';

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectPin, onExploreApartments }) => {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);

  useLayoutEffect(() => {
    const area = areaRef.current;
    const text = textRef.current;
    const bg = bgRef.current;
    if (!area || !text || !bg) return;

    const mm = gsap.matchMedia();
    mm.add({ desktop: MQ.desktop, motion: MQ.motion }, (ctx) => {
      const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
      if (!motion) return;
      // Pan the tall render up behind the title (text travels 1.25x faster), then zoom into the pool
      const tl = gsap.timeline({
        scrollTrigger: { trigger: area, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
      });
      if (desktop) {
        tl.fromTo(text, { y: 0 }, { y: () => -(1.25 * bg.offsetHeight - window.innerHeight), ease: 'Ease', duration: 0.6 })
          .fromTo(bg, { y: 0 }, { y: () => -(bg.offsetHeight - window.innerHeight), ease: 'Ease', duration: 0.6 }, '<');
      }
      tl.fromTo(
        bg,
        { scale: 1, transformOrigin: '50% 75%' },
        { scale: 2, ease: 'In', duration: 0.6 },
        desktop ? '-=0.2' : '>'
      );

      // Hotspot pulses
      const pulses = gsap.utils.toArray<HTMLElement>('.pin_bg_pulse', area);
      area.querySelectorAll<HTMLElement>('.pin').forEach((pin) => {
        const size = pin.offsetWidth;
        const rings = pulses.filter((p) => pin.contains(p));
        gsap.fromTo(
          rings,
          { opacity: 1, width: size, height: size },
          { opacity: 0, width: size * 1.6, height: size * 1.6, duration: DUR_L, ease: 'In', stagger: 0.2, repeat: -1 }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="er-section theme-color er-clip">
      <div className="er-container">
        <div ref={areaRef} className="hero-area" data-bg="color">
          <div className="hero-w">
            <div ref={textRef} className="hero-s">
              <div style={{ height: 'var(--u-48)' }} />
              <div className="er-grid">
                <div className="hero-s_logo">
                  <h1 className="t-h1 a-center" data-reveal="h">
                    Era
                    <br />
                    Residence
                  </h1>
                  <div className="hero-s_logo_a">
                    <p className="t-a2" data-reveal="a">
                      Estepona
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ height: 'var(--u-48)' }} />
              <div className="er-grid">
                <div className="hero-s_title t-h5">
                  <span data-reveal="h">A place</span>
                  <div className="hero-s_tabs t-l2" data-reveal="ctn">
                    <button type="button" aria-pressed={timeOfDay === 'day'} onClick={() => setTimeOfDay('day')}>
                      By day
                    </button>
                    <span className="hero-s_tabs_divider" />
                    <button type="button" aria-pressed={timeOfDay === 'night'} onClick={() => setTimeOfDay('night')}>
                      By night
                    </button>
                  </div>
                  <span data-reveal="h">to return to</span>
                </div>
              </div>
            </div>

            <div ref={bgRef} className="hero-w_bg">
              <div className="hero-w_bg_master">
                <div className="hero-w_bg_master_img" data-hero-img>
                  <img
                    src={DAY_IMAGE}
                    alt="ERA Residence gated community by day"
                    className="hero-img"
                    style={{ opacity: timeOfDay === 'day' ? 1 : 0 }}
                  />
                  <img
                    src={NIGHT_IMAGE}
                    alt="ERA Residence gated community by night"
                    className="hero-img is-night"
                    style={{ opacity: timeOfDay === 'night' ? 1 : 0 }}
                  />

                  <div className="img-over-grad from-top" style={{ height: '100vh' }} />
                  <div className="img-over-grad bot h-6x" />
                  <div className="img-over-grad bot h-6x" />

                  <div className="hero-pins absolute inset-0 z-[5] pointer-events-none">
                    {HERO_PINS.map((pin) => (
                      <div
                        key={pin.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                        style={{ top: pin.top, left: pin.left }}
                        onMouseEnter={() => setHoveredPin(pin.id)}
                        onMouseLeave={() => setHoveredPin(null)}
                      >
                        <button type="button" className="pin" onClick={() => onSelectPin(pin)} aria-label={pin.title}>
                          <span className="pin_dot" />
                          <span className="pin_bg">
                            <span className="pin_bg_pulse" />
                            <span className="pin_bg_pulse" />
                          </span>
                        </button>
                        {hoveredPin === pin.id && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-[#17233b]/95 backdrop-blur-md rounded-xl text-left border border-white/20 shadow-2xl z-30 pointer-events-none">
                            <div className="text-[9px] uppercase tracking-[0.25em] text-[#b5cedb] mb-1 font-mono">
                              Architectural Detail
                            </div>
                            <div className="font-display text-sm text-white uppercase tracking-wider mb-1">{pin.title}</div>
                            <div className="text-[10px] text-[#f3f3ec]/80 leading-relaxed font-light">{pin.description}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hero-s_b">
                  <div className="hero-s_btn" data-reveal="ctn">
                    <MagneticButton onClick={onExploreApartments} ariaLabel="View available apartments">
                      View available apartments
                    </MagneticButton>
                  </div>
                  <div style={{ height: 'calc(var(--u-32) + var(--u-48))' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
