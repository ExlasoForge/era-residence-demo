import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { useRevealSlider } from '../hooks/useRevealSlider';
import { TYPOLOGIES } from '../data/siteData';
import { SliderPag } from './SliderPag';
import { Flower } from './BougainvilleaFlowers';
import { Emblem } from './Emblem';

interface ResidencesCarouselSectionProps {
  onSelectTypology: (typeCode: string) => void;
}

/**
 * Residence types: portrait render centred behind a large title, specs on the left, description and
 * link on the right; slides swap with the clip wipe + character reveals. Followed by the
 * "Residences range…" statement.
 */
export const ResidencesCarouselSection: React.FC<ResidencesCarouselSectionProps> = ({ onSelectTypology }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slider = useRevealSlider(sliderRef, TYPOLOGIES.length);
  useScrollReveal(sectionRef);
  useParallax(sectionRef);

  return (
    <section ref={sectionRef} id="residences" className="er-section theme-brand er-clip apart-sec" data-bg="light">
      <div className="er-container">
        <div className="apart-type-s">
          <div className="er-grid apart-type-grid">
            <div ref={sliderRef} className="apart-type-s_cms">
              <div className="apart-type-list">
                {TYPOLOGIES.map((t, i) => {
                  const r = (type: string) => (i === 0 ? type : undefined);
                  return (
                    <div key={t.id} data-slide className="apart-type-slide">
                      <div className="apart-type-slide_t" />
                      <div className="apart-type-slide_c">
                        <div className="er-grid apart-grid-8">
                          <div className="apart-type-slide_data">
                            <div className="data-item">
                              <h4 className="t-l1 reg" data-slider="p" data-reveal={r('p')}>
                                Bedrooms
                              </h4>
                              <div style={{ height: 'var(--u-8)' }} />
                              <p className="t-h5" data-slider="p" data-reveal={r('p')}>
                                {t.bedrooms.replace(/\s*Bedrooms?/i, '')}
                              </p>
                            </div>
                            <div className="data-item">
                              <h4 className="t-l1 reg" data-slider="p" data-reveal={r('p')}>
                                Area up to
                              </h4>
                              <div style={{ height: 'var(--u-8)' }} />
                              <p className="t-h5" data-slider="p" data-reveal={r('p')}>
                                {t.area.replace(/^Area up to\s*/i, '')}
                              </p>
                            </div>
                          </div>
                          <div className="apart-type-slide_desc">
                            <p className="t-p1" data-slider="p" data-reveal={r('p')}>
                              {t.description}
                            </p>
                            <div style={{ height: 'var(--u-24)' }} />
                            <div data-slider="ctn" data-reveal={r('ctn')}>
                              <button type="button" className="er-btn t-l1" onClick={() => onSelectTypology(t.id)}>
                                <span>Explore {t.name}</span>
                                <ArrowUpRight className="er-btn_ico" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="apart-type-slide_b">
                        <div style={{ height: 'var(--u-48)' }} />
                        <h3 className="t-h2 a-center" data-slider="h" data-reveal={r('h')}>
                          {t.name}
                        </h3>
                      </div>
                      <div className="apart-type-slide_img-w">
                        <div className="apart-type-slide_img">
                          <div className="img-w" data-slider="img" data-reveal={r('slide')}>
                            <img src={t.image} alt={t.name} loading="lazy" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ height: 'var(--u-16)' }} />
              <div data-reveal="ctn">
                <SliderPag
                  current={slider.current}
                  count={TYPOLOGIES.length}
                  onPrev={slider.prev}
                  onNext={slider.next}
                  progressRef={slider.progressRef}
                />
              </div>
              <div style={{ height: 'var(--u-48)' }} />
            </div>
          </div>
        </div>

        <div className="apart-info-s">
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
          <div style={{ height: 'var(--u-48)' }} />
          <div className="er-grid">
            <div className="info-s_lead">
              <h3 className="t-h4 a-center" data-reveal="p">
                Residences range from 104 to 244 sq.m., offering spacious single level and duplex layouts with generous terraces and
                rooftop solariums.
              </h3>
            </div>
          </div>
          <div style={{ height: 'var(--u-48)' }} />
          <div className="s_logo">
            <div className="ico-48" data-reveal="ctn">
              <Emblem />
            </div>
          </div>
          <div style={{ height: 'var(--u-160)' }} />
        </div>
      </div>
      <Flower n={4} className="flower-apart-info" parallax="ctn-down" />
    </section>
  );
};
