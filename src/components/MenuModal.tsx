import React from 'react';
import { X, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'apartments' | 'contact', sectionId?: string) => void;
  onOpenBookCall: () => void;
  onReplayIntro?: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenBookCall,
  onReplayIntro,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { label: 'Home', view: 'home' as const, sectionId: 'hero', index: '01' },
    { label: 'Residences (25 Units)', view: 'apartments' as const, index: '02' },
    { label: 'The Concept', view: 'home' as const, sectionId: 'concept', index: '03' },
    { label: 'Location & Coast', view: 'home' as const, sectionId: 'location', index: '04' },
    { label: 'Amenities & Spa', view: 'home' as const, sectionId: 'amenities', index: '05' },
    { label: 'Architecture & Team', view: 'home' as const, sectionId: 'architecture', index: '06' },
    { label: 'Contact Sales Office', view: 'contact' as const, index: '07' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#17233b]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-xl bg-[#17233b] text-[#f3f3ec] h-full shadow-2xl flex flex-col justify-between p-8 md:p-12 z-10 overflow-y-auto">
        {/* Top bar with Close */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#f3f3ec]/60">
            ERA Residence • Estepona
          </div>
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-white text-[11px] uppercase tracking-[0.2em] transition-colors"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="my-8 flex flex-col space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.view, item.sectionId);
                onClose();
              }}
              className="group flex items-center justify-between py-2 text-left border-b border-white/5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-baseline space-x-4">
                <span className="text-[11px] font-mono tracking-widest text-[#b5cedb]/70">
                  {item.index}
                </span>
                <span className="font-display text-2xl md:text-3xl tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {item.label}
                </span>
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-[#b5cedb]" />
            </button>
          ))}
        </nav>

        {/* CTA & Contact Details */}
        <div className="pt-6 border-t border-white/10 space-y-6">
          <button
            onClick={() => {
              onClose();
              onOpenBookCall();
            }}
            className="w-full py-3.5 px-6 rounded-full bg-[#f3f3ec] text-[#17233b] hover:bg-[#b5cedb] transition-colors text-[11px] uppercase tracking-[0.25em] font-medium flex items-center justify-center space-x-2"
          >
            <span>Book a Consultation Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {onReplayIntro && (
            <button
              onClick={() => {
                onClose();
                onReplayIntro();
              }}
              className="w-full py-2.5 px-6 rounded-full border border-white/20 text-[#b5cedb] hover:text-white hover:border-white/50 transition-colors text-[10px] uppercase tracking-[0.25em] font-medium flex items-center justify-center space-x-2"
            >
              <span>Replay Opening Animation</span>
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#f3f3ec]/70">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#f3f3ec]/40 mb-1 flex items-center gap-1.5">
                <Phone className="w-3 h-3" />
                <span>Sales Office</span>
              </div>
              <a href="tel:+34655408648" className="hover:text-white transition-colors">
                +34 (655) 408-648
              </a>
              <div className="text-[11px] text-[#f3f3ec]/50 mt-0.5">Mon – Sat, 10:00 – 19:00 CET</div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#f3f3ec]/40 mb-1 flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                <span>Enquiries</span>
              </div>
              <a href="mailto:info@era-residence.com" className="hover:text-white transition-colors">
                info@era-residence.com
              </a>
            </div>

            <div className="col-span-full pt-2">
              <div className="text-[10px] uppercase tracking-widest text-[#f3f3ec]/40 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span>Address</span>
              </div>
              <p className="text-xs text-[#f3f3ec]/70">
                Avenida Litoral, 29680 Estepona, Málaga, Spain
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
