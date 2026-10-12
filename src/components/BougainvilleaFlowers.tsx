import React, { forwardRef } from 'react';

const POSTERS: Record<number, string> = {
  1: '6a4afbe9f3a19844a4b0caed_bougainvillea-flowers_01.avif',
  2: '6a4afbe941e5e917a8f84c4a_bougainvillea-flowers_02.avif',
  3: '6a4afbe988f8dc3c9bb1647a_bougainvillea-flowers_03.avif',
  4: '6a4afbe98eb07b9ca5b07e84_bougainvillea-flowers_04.avif',
  5: '6a4afbe9a4873ec6185f295d_bougainvillea-flowers_05.avif',
  6: '6a4afbe968be0cc0c1f5fef2_bougainvillea-flowers_06.avif',
  7: '6a4afbe9f3a19844a4b0caf0_bougainvillea-flowers_07.avif',
};

interface FlowerProps {
  n: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  className?: string;
  style?: React.CSSProperties;
  parallax?: 'ctn-down' | 'ctn-up';
  mob?: 'off';
}

// Looping transparent bougainvillea clip (the reference's `.flower` element)
export const Flower = forwardRef<HTMLDivElement, FlowerProps>(({ n, className = '', style, parallax, mob }, ref) => (
  <div ref={ref} className={`er-flower ${className}`} style={style} data-parallax={parallax} data-mob={mob} aria-hidden="true">
    <video
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      poster={`https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/${POSTERS[n]}`}
    >
      <source src={`https://assets.era-residence.com/flowers/bougainvillea-flowers_0${n}.webm`} type="video/webm" />
      <source src={`https://assets.era-residence.com/flowers/bougainvillea-flowers_0${n}.mov`} type="video/mp4" />
    </video>
  </div>
));
Flower.displayName = 'Flower';

