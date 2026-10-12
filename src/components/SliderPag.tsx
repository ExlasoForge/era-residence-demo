import React from 'react';

interface SliderPagProps {
  current: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
  progressRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

const Arrow: React.FC<{ dir: 'l' | 'r' }> = ({ dir }) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transform: dir === 'l' ? 'scaleX(-1)' : undefined }}>
    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1" />
  </svg>
);

// "‹ 1 ──── 2 ›" — current slide, autoplay progress, next slide number
export const SliderPag: React.FC<SliderPagProps> = ({ current, count, onPrev, onNext, progressRef, className = '' }) => (
  <div className={`er-pag ${className}`}>
    <button type="button" onClick={onPrev} aria-label="Previous slide">
      <Arrow dir="l" />
      <span className="t-l1" style={{ color: 'inherit' }}>
        {current + 1}
      </span>
    </button>
    <div className="er-pag_progress">
      <div ref={progressRef} className="er-pag_fill" />
    </div>
    <button type="button" onClick={onNext} aria-label="Next slide">
      <span className="t-l1" style={{ color: 'inherit' }}>
        {current === count - 1 ? 1 : current + 2}
      </span>
      <Arrow dir="r" />
    </button>
  </div>
);
