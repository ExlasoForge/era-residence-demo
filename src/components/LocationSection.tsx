import React, { useLayoutEffect, useRef } from 'react';
import { gsap, MQ, ScrollTrigger, horizontalTweens, animateTextP, animateCtn, DUR_L, DUR_M } from '../lib/anim';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { Flower } from './BougainvilleaFlowers';
import { MagneticButton } from './MagneticButton';
import { Emblem } from './Emblem';

interface LocationSectionProps {
  onExploreApartments: () => void;
}

const CDN = 'https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/';
const TERRACE = `${CDN}6a15723f346e4b3a6c0af26a_era-residence-terrace.webp`;
const PATH_SVG = `${CDN}6a51975c584436cfdd9e2406_loc_path.svg`;
const PATH_LABELS_SVG = `${CDN}6a51975cc959ee1e44045b0e_loc_path_labels.svg`;
const MASTER_PLAN = `${CDN}6a15185e6803ae588479d12b_era-residence-master-plan.webp`;
const CLOUDS = [
  { cls: 'is-33', src: `${CDN}6a0fa3c60405a99c8530535e_img_clouds_33.avif` },
  { cls: 'is-47', src: `${CDN}6a0fa3c6685d7bb04792137a_img_clouds_47.avif` },
  { cls: 'is-02', src: `${CDN}6a0fa3c6c9c3c584d9d78d85_img_clouds_02.avif` },
];
const WAYPOINTS = [
  ['Gibraltar', '50 min'],
  ['Estepona', '10 min'],
  ['Kempinski', '5 min'],
  ['Puerto Banús', '20 min'],
  ['Marbella', '25 min'],
  ['Málaga Airport', '45 min'],
];

/**
 * Pinned horizontal track (desktop): The Concept → New Golden Mile → The coast you wanted.
 * Below it the aerial of the coast rises out of drifting clouds.
 */
export const LocationSection: React.FC<LocationSectionProps> = ({ onExploreApartments }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const infoWRef = useRef<HTMLDivElement>(null);
  const infoSRef = useRef<HTMLDivElement>(null);
  const titleLinesRef = useRef<HTMLHeadingElement>(null);
  const introFlowerRef = useRef<HTMLDivElement>(null);
  const pathFlowerRef = useRef<HTMLDivElement>(null);
  const pathImgRef = useRef<HTMLImageElement>(null);
  const aerialRef = useRef<HTMLElement>(null);
  const aerialImgRef = useRef<HTMLDivElement>(null);

  // Horizontal track must exist before reveal triggers (which use it as containerAnimation) are created
  useLayoutEffect(() => {
    const area = areaRef.current;
    const track = trackRef.current;
    if (!area || !track) return;
    const mm = gsap.matchMedia();
    mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
      const setHeight = () => {
        area.style.height = `${track.scrollWidth}px`;
      };
      setHeight();
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - area.offsetWidth),
        ease: 'horScroll',
        scrollTrigger: {
          trigger: area,
          start: '2.5% top',
          end: '97.5% bottom',
          scrub: 0.25,
          invalidateOnRefresh: true,
          onRefreshInit: setHeight,
        },
      });
      horizontalTweens.set(area, tween);

      const lines = titleLinesRef.current?.querySelectorAll('.loc-intro-s_title_line');
      if (lines) {
        gsap.fromTo(
          lines,
          { xPercent: gsap.utils.wrap([-5, 25, -15]) },
          {
            xPercent: gsap.utils.wrap([5, -25, 25]),
            ease: 'none',
            scrollTrigger: { trigger: area, start: 'top top', end: 'bottom bottom', scrub: 0.25 },
          }
        );
      }
      gsap.fromTo(
        introFlowerRef.current,
        { xPercent: 0 },
        { xPercent: -25, ease: 'none', scrollTrigger: { trigger: area, start: 'top top', end: 'bottom bottom', scrub: 0.25 } }
      );
      gsap.fromTo(
        pathFlowerRef.current,
        { yPercent: 0 },
        { yPercent: 25, ease: 'none', scrollTrigger: { trigger: area, start: 'bottom bottom', end: 'bottom top', scrub: 0.25 } }
      );
      return () => {
        horizontalTweens.delete(area);
        area.style.height = '';
      };
    });
    return () => mm.revert();
  }, []);

  useScrollReveal(sectionRef);
  useScrollReveal(aerialRef);
  useParallax(sectionRef);
  useParallax(aerialRef);

  // Concept panel: its copy reveals as the panel reaches the top, while the block scales up from 0.75
  useLayoutEffect(() => {
    const w = infoWRef.current;
    const s = infoSRef.current;
    if (!w || !s) return;
    const parts = w.querySelectorAll('[data-part="p"]');
    const ctns = w.querySelectorAll('[data-part="ctn"]');
    let cancelled = false;
    const ctx = gsap.context(() => {});
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        gsap.set([...parts, ...ctns], { visibility: 'visible' });
        animateTextP(parts, 'initial');
        animateCtn(ctns, 'initial');
        gsap
          .timeline({
            scrollTrigger: {
              trigger: w,
              start: 'top 30%',
              end: 'bottom bottom',
              scrub: 0.5,
              onEnter: () => {
                animateTextP(parts, 'reveal', 0.1);
                animateCtn(ctns, 'reveal', 0.1);
              },
              onLeaveBack: () => {
                animateTextP(parts, 'hide', 0);
                animateCtn(ctns, 'hide', 0);
              },
            },
          })
          .fromTo(s, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, ease: 'none' }, 0);
      });
    });
    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  // Coast road: wipes in left-to-right once the panel enters
  useLayoutEffect(() => {
    const img = pathImgRef.current;
    const area = areaRef.current;
    if (!img || !area) return;
    const ctx = gsap.context(() => {});
    const raf = requestAnimationFrame(() => {
      ctx.add(() => {
        const containerAnimation = horizontalTweens.get(area);
        gsap.fromTo(
          img,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 2 * DUR_L,
            ease: 'Out',
            delay: DUR_M,
            scrollTrigger: { trigger: img, containerAnimation, start: containerAnimation ? 'left right' : 'top bottom', once: true },
          }
        );
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  // Aerial: settles from 1.15x as the section scrolls in
  useLayoutEffect(() => {
    const sec = aerialRef.current;
    const img = aerialImgRef.current;
    if (!sec || !img) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(img, {
        scale: 1.15,
        transformOrigin: 'center bottom',
        ease: 'Ease',
        scrollTrigger: { trigger: sec.querySelector('.loc-w'), start: 'top bottom', end: 'bottom bottom', scrub: 0.25 },
      });
    });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(id);
      mm.revert();
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} id="concept" className="er-section theme-light er-clip loc-sec" data-bg="light">
        <div className="er-container loc-container">
          <div ref={areaRef} className="loc-area" data-horizontal>
            <div className="loc-screen">
              <div ref={trackRef} className="loc-track">
                {/* 1 — The concept */}
                <div ref={infoWRef} className="loc-info-w" data-parallax-w>
                  <div ref={infoSRef} className="loc-info-s" data-parallax="img-in">
                    <div className="loc-info-s_t">
                      <div style={{ height: 'var(--u-48)' }} />
                    </div>
                    <div className="loc-info-s_c">
                      <div className="er-grid">
                        <div className="s_title">
                          <h2 className="t-l1 a-center" data-part="p">
                            The concept
                          </h2>
                        </div>
                      </div>
                      <div style={{ height: 'var(--u-32)' }} />
                      <div className="er-grid">
                        <div className="info-s_lead">
                          <h3 className="t-h4 a-center" data-part="p">
                            Era Residences is a boutique gated community of only 25 residences, designed around privacy, wellbeing and
                            timeless Mediterranean living
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="loc-info-s_b">
                      <div className="er-grid">
                        <div className="info-s_desc">
                          <p className="t-p1 a-center" data-part="p">
                            Inspired by the atmosphere of Marbella's golden era, the project combines contemporary architecture with warm
                            materials, natural landscaping and carefully curated spaces.
                          </p>
                          <div style={{ height: 'var(--u-32)' }} />
                          <div className="s_logo">
                            <div className="ico-48" data-part="ctn">
                              <Emblem />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ height: 'var(--u-48)' }} />
                    </div>
                  </div>
                  <Flower n={1} className="flower-loc-info" parallax="ctn-down" />
                </div>

                {/* 2 — New Golden Mile */}
                <div className="loc-intro-w" id="location">
                  <div className="loc-intro-s">
                    <div style={{ height: 'var(--u-48)' }} />
                    <div className="er-grid loc-grid-13">
                      <div className="loc-intro-s_cap">
                        <h4 className="t-c1 a-center" data-reveal="h">
                          Spain
                        </h4>
                      </div>
                      <div className="loc-intro-s_title">
                        <h3 ref={titleLinesRef} className="t-h1" data-reveal="h">
                          <span className="loc-intro-s_title_line is-1">New</span>
                          <span className="loc-intro-s_title_line is-2">Golden</span>
                          <span className="loc-intro-s_title_line">Mile</span>
                        </h3>
                      </div>
                      <div className="loc-intro-s_img">
                        <div className="img-w" data-reveal="slide">
                          <img src={TERRACE} alt="Era Residence sunlit terrace overlooking the sea" loading="lazy" />
                        </div>
                      </div>
                      <div className="loc-intro-s_desc">
                        <h3 className="t-h5" data-reveal="p">
                          Between Marbella and Estepona
                        </h3>
                        <div style={{ height: 'var(--u-16)' }} />
                        <p className="t-p1" data-reveal="p">
                          Surrounded by beaches, golf courses, wellness clubs and established lifestyle destinations, the project combines
                          privacy with effortless connectivity to everything essential for Mediterranean living.
                        </p>
                      </div>
                      <div className="loc-intro-s_btn" data-reveal="ctn">
                        <MagneticButton onClick={onExploreApartments} ariaLabel="View available apartments">
                          View available apartments
                        </MagneticButton>
                      </div>
                    </div>
                    <div style={{ height: 'var(--u-48)' }} />
                  </div>
                  <Flower ref={introFlowerRef} n={2} className="flower-loc-intro" />
                </div>

                {/* 3 — The coast you wanted */}
                <div className="loc-path-w">
                  <div className="loc-path-s">
                    <div className="loc-path-s_t">
                      <div style={{ height: 'var(--u-48)' }} />
                    </div>
                    <div className="loc-path-s_c">
                      <div className="er-grid">
                        <div className="loc-path-s_title">
                          <h2 className="t-h3 a-center">
                            <span className="loc-path-s_title_line" data-reveal="h">
                              The coast you wanted
                            </span>
                            <span className="loc-path-s_title_a t-a2" data-reveal="a">
                              yours
                            </span>
                            <span className="loc-path-s_title_line" data-reveal="h">
                              this year
                            </span>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="loc-path-s_b">
                      <div className="er-grid">
                        <div className="loc-path-s_path">
                          <div className="loc-path-s_path_c">
                            <img ref={pathImgRef} src={PATH_SVG} alt="" className="loc-path-img" />
                            <img src={PATH_LABELS_SVG} alt="" className="loc-path-labels" data-reveal="ctn" />
                          </div>
                          <ul className="sr-only">
                            {WAYPOINTS.map(([place, time]) => (
                              <li key={place}>
                                {place}: {time}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div style={{ height: 'var(--u-48)' }} />
                    </div>
                  </div>
                  <div className="loc-path-w_flower">
                    <Flower ref={pathFlowerRef} n={3} className="flower-loc-path" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aerial through the clouds */}
      <section ref={aerialRef} className="er-section theme-color er-clip" data-bg="color">
        <div className="er-container">
          <div className="loc-w" data-parallax-w>
            <div className="loc-w_over-grad" />
            <div className="loc-w_over-grad" />
            {CLOUDS.map((c) => (
              <div key={c.cls} className="loc-w_clouds">
                <div className="marquee">
                  <div className="marquee_track">
                    {[0, 1].map((list) => (
                      <div key={list} className="marquee_list">
                        {[0, 1].map((item) => (
                          <div key={item} className="marquee_list_item">
                            <img src={c.src} alt="" className={`clouds ${c.cls}`} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="loc-s">
              <div className="er-grid">
                <div className="loc-s_desc">
                  <div className="loc-s_desc_line">
                    <div className="line-v" data-reveal="line" />
                  </div>
                  <h3 className="t-l1" data-reveal="p">
                    Between the Sea &amp; Sierra Bermeja
                  </h3>
                  <div style={{ height: 'var(--u-32)' }} />
                  <p className="t-p1" data-reveal="p">
                    New Golden Mile Corridor
                  </p>
                </div>
              </div>
              <div style={{ height: 'var(--u-48)' }} />
              <div className="loc-w_decor theme-brand" />
            </div>

            <div className="loc-w_bg" data-parallax="img">
              <div ref={aerialImgRef} className="loc-w_bg_img">
                <img src={MASTER_PLAN} alt="The New Golden Mile between the sea and the Sierra Bermeja mountains" loading="eager" fetchPriority="low" />
                <div className="img-over-grad bot h-vh" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
