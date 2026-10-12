import React, { useLayoutEffect, useRef } from 'react';
import { gsap, MQ, DUR_M } from '../lib/anim';

interface MagneticButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
}

const R = 103.5;
const CIRC = 2 * Math.PI * R;
const ARC = 0.0417 * CIRC;

/**
 * Reference "btn-circle": a thin ring with two short arcs (at -150° and 30°) around an uppercase
 * label. On desktop the button and its label follow the cursor magnetically, and the arcs grow
 * to half the circumference on hover.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({ onClick, ariaLabel, children, className = '' }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const btn = btnRef.current;
    const label = labelRef.current;
    const svg = svgRef.current;
    if (!btn || !label || !svg) return;
    const arcs = svg.querySelectorAll('[data-arc]');
    gsap.set(arcs, { strokeDasharray: `${ARC} ${CIRC}` });

    const mm = gsap.matchMedia();
    mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
      const arcTl = gsap.timeline({ paused: true }).to(arcs, {
        strokeDasharray: `${CIRC / 2} ${CIRC}`,
        duration: DUR_M,
        ease: 'InOut',
      });

      const strength = 25;
      const reset = (el: Element, instant: boolean) => {
        gsap.killTweensOf(el);
        if (instant) gsap.set(el, { x: 0, y: 0 });
        else gsap.to(el, { x: 0, y: 0, ease: 'elastic.out(1, 0.3)', duration: 1.6 });
      };
      const onEnter = () => {
        reset(btn, true);
        reset(label, true);
        arcTl.play();
      };
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const em = parseFloat(getComputedStyle(btn).fontSize) || 16;
        const dx = ((e.clientX - r.left) / btn.offsetWidth - 0.5) * (strength / 16) * em;
        const dy = ((e.clientY - r.top) / btn.offsetHeight - 0.5) * (strength / 16) * em;
        gsap.to(btn, { x: dx, y: dy, ease: 'power4.out', duration: 1.6 });
        gsap.to(label, { x: dx, y: dy, ease: 'power4.out', duration: 2 });
      };
      const onLeave = () => {
        reset(btn, false);
        reset(label, false);
        arcTl.reverse();
      };
      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      return () => {
        btn.removeEventListener('mouseenter', onEnter);
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
        arcTl.kill();
        gsap.set([btn, label], { clearProps: 'transform' });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`btn-circle t-l1 ${className}`}
    >
      <span ref={labelRef} className="btn-circle_label">
        {children}
      </span>
      <span className="btn-circle_bg" aria-hidden="true">
        <svg ref={svgRef} viewBox="0 0 208 208" width="100%" height="100%">
          <circle data-arc cx="104" cy="104" r={R} stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(-150 104 104)" />
          <circle data-arc cx="104" cy="104" r={R} stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(30 104 104)" />
          <circle cx="104" cy="104" r={R} stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" fill="none" />
        </svg>
      </span>
    </button>
  );
};
