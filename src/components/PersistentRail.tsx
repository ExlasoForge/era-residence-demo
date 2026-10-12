import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, getLenis, prefersReducedMotion } from '../lib/anim';
import { useIntroReady } from '../hooks/useScrollReveal';
import { Emblem, RollText } from './Emblem';

interface PersistentRailProps {
  onOpenBookCall: () => void;
  onOpenContact: () => void;
  onSelectApartment: () => void;
  onOpenMenu: () => void;
  onGoHome: () => void;
  activeView: 'home' | 'apartments' | 'contact';
}

const THEMES = ['is-light', 'is-color', 'is-dark'];

export const PersistentRail: React.FC<PersistentRailProps> = ({
  onOpenBookCall,
  onOpenContact,
  onSelectApartment,
  onOpenMenu,
  onGoHome,
  activeView,
}) => {
  const ready = useIntroReady();
  const ringRef = useRef<HTMLDivElement>(null);
  const sbarRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const sdownRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Logo ring: constant 30°/s spin, boosted and reversed by scroll velocity
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const state = { speed: 30 };
    let rotation = 0;
    let dir = 1;
    let interacted = false;
    let settleTimer: number | undefined;
    let subscribed: ReturnType<typeof getLenis> = null;

    const onScroll = ({ velocity }: { velocity: number }) => {
      if (!interacted) return;
      if (velocity !== 0) dir = velocity > 0 ? 1 : -1;
      gsap.to(state, { speed: dir * (30 + 10 * Math.abs(velocity)), duration: 0.3, ease: 'Out', overwrite: true });
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => gsap.to(state, { speed: 30 * dir, duration: 1.2, ease: 'Out' }), 100);
    };
    const markInteracted = () => {
      interacted = true;
    };
    window.addEventListener('wheel', markInteracted, { once: true });
    window.addEventListener('touchmove', markInteracted, { once: true });

    const tick = (_t: number, delta: number) => {
      if (!subscribed) {
        subscribed = getLenis();
        subscribed?.on('scroll', onScroll);
      }
      if (prefersReducedMotion()) return;
      rotation += state.speed * (Math.min(delta, 100) / 1000);
      gsap.set(ring, { rotation, transformOrigin: 'center center' });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      subscribed?.off('scroll', onScroll);
      window.clearTimeout(settleTimer);
      window.removeEventListener('wheel', markInteracted);
      window.removeEventListener('touchmove', markInteracted);
    };
  }, []);

  // Scroll progress bar with a moving percentage thumb
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        sbarRef.current?.style.setProperty('--progress', `${self.progress * 100}%`);
        if (labelRef.current) labelRef.current.textContent = String(Math.round(self.progress * 100)).padStart(2, '0');
      },
    });
    return () => trigger.kill();
  }, []);

  // Colour theme per section: each fixed item takes the data-bg of whatever passes under its centre
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const items = Array.from(rail.querySelectorAll<HTMLElement>('[data-rail-item]'));
    const setTheme = (el: HTMLElement, cls: string) => {
      el.classList.remove(...THEMES);
      el.classList.add(cls);
    };
    items.forEach((el) => setTheme(el, activeView === 'home' ? 'is-color' : 'is-light'));

    const triggers: ScrollTrigger[] = [];
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>('main [data-bg]').forEach((bgEl) => {
        const cls = `is-${bgEl.dataset.bg}`;
        const b = bgEl.getBoundingClientRect();
        items.forEach((item) => {
          const r = item.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          if (getComputedStyle(item).display === 'none' || cx < b.left || cx > b.right) return;
          const cy = r.top + r.height / 2;
          triggers.push(
            ScrollTrigger.create({
              trigger: bgEl,
              start: () => `top top+=${cy}`,
              end: () => `bottom top+=${cy}`,
              onEnter: () => setTheme(item, cls),
              onEnterBack: () => setTheme(item, cls),
            })
          );
        });
      });

      const footer = document.getElementById('site-footer');
      if (footer && sdownRef.current) {
        triggers.push(
          ScrollTrigger.create({
            trigger: footer,
            start: 'top bottom',
            end: 'center bottom',
            scrub: true,
            animation: gsap.fromTo(sdownRef.current, { opacity: 1 }, { opacity: 0, ease: 'InOut' }),
          })
        );
      }
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((t) => {
        t.animation?.kill();
        t.kill();
      });
    };
  }, [activeView, ready]);

  return (
    <div ref={railRef} className="select-none">
      {/* Top left: rotating ring + mark */}
      <button type="button" onClick={onGoHome} className="er-logo rail-item" data-rail-item aria-label="ERA Residence Estepona home">
        <div ref={ringRef} className="er-logo_bg">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current" aria-hidden="true">
            <defs>
              <path id="railCirclePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text fontSize="7" letterSpacing="3.2" fontWeight="600">
              <textPath href="#railCirclePath" startOffset="0%">
                RESIDENCE • ERA • ESTEPONA • ERA •
              </textPath>
            </text>
          </svg>
        </div>
        <div className="er-logo_symbol">
          <Emblem />
        </div>
      </button>

      {/* Left: scroll progress */}
      <div className="er-sbar-w rail-item" data-rail-item>
        <div ref={sbarRef} className="er-sbar">
          <div className="er-sbar_track" />
          <div className="er-sbar_fill" />
          <div className="er-sbar_thumb">
            <span ref={labelRef} className="t-l1 a-center" style={{ color: 'inherit' }}>
              00
            </span>
          </div>
        </div>
      </div>

      {/* Bottom left: rotated scroll cue */}
      <div ref={sdownRef} className="er-sdown rail-item" data-rail-item>
        <svg viewBox="0 0 48 12" fill="none" aria-hidden="true">
          <path d="M0 6H46M46 6L41 1M46 6L41 11" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="t-l2" style={{ color: 'inherit' }}>
          Scroll
        </span>
      </div>

      {/* Top right: editorial nav */}
      <nav className="er-nav rail-item" data-rail-item>
        <div className="f-desk flex flex-col items-end">
          <button type="button" onClick={onSelectApartment} className="er-nav_link t-h6 cursor-pointer" style={{ color: 'inherit' }}>
            Select
            <br />
            an Apartment
            <span className="link_line" />
          </button>
          <div style={{ height: 'var(--u-24)' }} />
          <button type="button" onClick={onOpenBookCall} className="group t-l2 cursor-pointer" style={{ color: 'inherit' }}>
            <RollText>Book a call</RollText>
          </button>
          <div style={{ height: 'var(--u-4)' }} />
          <button type="button" onClick={onOpenContact} className="group t-l2 cursor-pointer" style={{ color: 'inherit' }}>
            <RollText>Contact</RollText>
          </button>
          <div style={{ height: 'var(--u-4)' }} />
          <button type="button" onClick={onOpenMenu} className="group t-l2 cursor-pointer" style={{ color: 'inherit' }} aria-label="Open menu">
            <RollText>Menu</RollText>
          </button>
        </div>
        <button type="button" onClick={onOpenMenu} className="f-mob group items-center gap-2 t-l2 cursor-pointer" style={{ color: 'inherit' }} aria-label="Open menu">
          <RollText>Menu</RollText>
          <span className="flex flex-col gap-[3px]" aria-hidden="true">
            <span className="block w-4 h-px bg-current" />
            <span className="block w-4 h-px bg-current" />
          </span>
        </button>
      </nav>
    </div>
  );
};
