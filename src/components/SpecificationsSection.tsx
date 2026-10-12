import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { useRevealSlider } from '../hooks/useRevealSlider';
import { Flower } from './BougainvilleaFlowers';
import { MagneticButton } from './MagneticButton';
import { SliderPag } from './SliderPag';

interface SpecificationsSectionProps {
  onExploreApartments: () => void;
}

const CDN_A = 'https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/';
const CDN_B = 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/';
const GARDEN = `${CDN_A}6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2.webp`;
const TERRACE = `${CDN_A}6a15723f346e4b3a6c0af26a_era-residence-terrace.webp`;
const GALLERY = [
  { src: `${CDN_B}6a1507fddb26e71ff717c30c_img_cam_03.webp`, alt: 'Master bedroom suite opening onto a private terrace' },
  { src: `${CDN_B}6a15080748155bc8e151f5ff_img_cam_07.webp`, alt: 'Interior living space' },
  { src: `${CDN_B}6a150812aefa2e544369d4a6_img_cam_09.webp`, alt: 'Living and dining room' },
  { src: `${CDN_B}6a1575180f248400b7124a46_era-residence-kitchen.webp`, alt: 'Kitchen' },
];

/**
 * "The space to live in": a cream circle-topped section rising over the pinned amenities, then the
 * finishes spread (plum block with garden render on the left, terrace + copy on the right, both
 * drifting in opposite directions) and the interior gallery slider.
 */
export const SpecificationsSection: React.FC<SpecificationsSectionProps> = ({ onExploreApartments }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const slider = useRevealSlider(galleryRef, GALLERY.length);
  useScrollReveal(sectionRef);
  useParallax(sectionRef);

  return (
    <section ref={sectionRef} id="specifications" className="er-section theme-light er-clip er-dome interior-sec">
      <div className="er-container">
        <div className="interior-w">
          <div className="interior-s">
            <div className="interior-head" data-bg="light">
              <div className="er-grid">
                <div className="interior-s_title">
                  <h2 className="t-h1 a-center" data-reveal="h">
                    The
                    <br />
                    space
                    <br />
                    to
                  </h2>
                  <div className="interior-s_title_a">
                    <p className="t-a1 a-center" data-reveal="a">
                      Live in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ height: 'var(--u-96)' }} />

            <div className="interior-s_imgs">
              <div className="interior-s_l" data-parallax="ctn-down" data-mob="off">
                <div className="er-grid interior-grid-5">
                  <div className="interior-s_l_img-w" data-bg="dark">
                    <div className="interior-s_l_img">
                      <div className="img-w" data-reveal="slide">
                        <img src={GARDEN} alt="Private garden terrace with lounge seating" loading="lazy" />
                      </div>
                    </div>
                    <Flower n={6} className="flower-interior" parallax="ctn-up" />
                  </div>
                  <div className="interior-s_l_desc" data-bg="light">
                    <div style={{ height: 'var(--u-32)' }} />
                    <h4 className="t-l1" data-reveal="p">
                      Optional upgrades are available:
                      <br />• Private jacuzzi
                      <br />• EV charging point installation
                      <br />• Photovoltaic panels
                    </h4>
                  </div>
                </div>
              </div>

              <div className="interior-s_r" data-parallax="ctn-up" data-mob="off" data-bg="light">
                <div className="er-grid interior-grid-5">
                  <div className="interior-s_r_img">
                    <div className="img-w" data-reveal="slide">
                      <img src={TERRACE} alt="Sunlit terrace with sea views" loading="lazy" />
                    </div>
                  </div>
                  <div className="interior-s_r_lead">
                    <div style={{ height: 'var(--u-48)' }} />
                    <div className="red-line" />
                    <h4 className="t-h5" data-reveal="p">
                      Every detail was selected to create homes that feel elegant, intuitive and effortless to live in
                    </h4>
                  </div>
                  <div className="interior-s_r_desc">
                    <div style={{ height: 'var(--u-48)' }} />
                    <p className="t-p1" data-reveal="p">
                      Underfloor heating throughout the property. Climate automation systems. Smart lock access systems. Electrically
                      adjustable aluminium shutters. Schneider Electric D-Life switches and mechanisms.
                    </p>
                  </div>
                  <div className="interior-s_r_btn" data-reveal="ctn">
                    <div style={{ height: 'var(--u-48)' }} />
                    <MagneticButton onClick={onExploreApartments} ariaLabel="View available apartments">
                      View available apartments
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ height: 'var(--u-160)' }} data-bg="light" />

            <div className="er-grid" data-bg="light">
              <div ref={galleryRef} className="interior-s_gallery">
                <div className="gallery-list">
                  {GALLERY.map((g, i) => (
                    <div key={g.src} data-slide className="gallery-slide">
                      <div className="img-w" data-slider="img" data-reveal={i === 0 ? 'slide' : undefined}>
                        <img src={g.src} alt={g.alt} loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ height: 'var(--u-16)' }} />
                <div className="interior-s_gallery_pag" data-reveal="ctn">
                  <SliderPag
                    current={slider.current}
                    count={GALLERY.length}
                    onPrev={slider.prev}
                    onNext={slider.next}
                    progressRef={slider.progressRef}
                  />
                </div>
              </div>
            </div>
            <div style={{ height: 'var(--u-160)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};
