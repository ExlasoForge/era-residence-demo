import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { MagneticButton } from './MagneticButton';

interface CtaSectionProps {
  onExploreApartments: () => void;
}

const CTA_IMAGE = 'https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a0f88f3b81e88aabf6874e7_img_cta_1920.webp';

/**
 * Tall rooftop render scrolled through with parallax; "Perfect sea views" reveals over it.
 * The container is the footer's clip target: it insets as the footer rises (see Footer).
 */
export const CtaSection: React.FC<CtaSectionProps> = ({ onExploreApartments }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  useParallax(sectionRef);

  return (
    <section ref={sectionRef} className="er-section theme-color cta-sec" data-bg="color">
      <div className="er-container cta-clip" data-footer-clip>
        <div className="cta-w">
          <div className="cta-s">
            <div style={{ height: 'var(--u-96)' }} />
            <div className="er-grid">
              <div className="cta-s_desc">
                <p className="t-l1 a-center" data-reveal="p">
                  A short conversation is enough to understand which apartment fits your use case — whether it is a family second home,
                  a longer stay, or a place to return to, year after year.
                </p>
              </div>
            </div>
            <div className="cta-s_gap" />
            <div className="er-grid">
              <div className="cta-s_title">
                <h2 className="t-h1 a-center" data-reveal="h">
                  Perfect
                  <br />
                  sea views
                </h2>
                <div style={{ height: 'var(--u-32)' }} />
                <h3 className="t-c1 a-center" data-reveal="h">
                  From rooftop terraces
                </h3>
                <div style={{ height: 'var(--u-48)' }} />
                <div className="cta-s_title_btn" data-reveal="ctn">
                  <MagneticButton onClick={onExploreApartments} ariaLabel="View available apartments">
                    View available apartments
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-w_bg">
            <div className="img-w" data-parallax-w>
              <img
                src={CTA_IMAGE}
                alt="Rooftop solarium dining terrace with Mediterranean sea views"
                className="img-p"
                data-parallax="img"
                loading="eager"
                fetchPriority="low"
              />
            </div>
            <div className="img-over-grad from-top h-4x" />
            <div className="img-over-grad" />
          </div>
        </div>
      </div>
    </section>
  );
};
