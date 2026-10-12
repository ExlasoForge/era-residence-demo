import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { PinItem } from '../types';

interface HeroPinModalProps {
  pin: PinItem | null;
  onClose: () => void;
  onSelectApartment: () => void;
}

export const HeroPinModal: React.FC<HeroPinModalProps> = ({
  pin,
  onClose,
  onSelectApartment,
}) => {
  if (!pin) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#17233b]/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#f3f3ec] text-[#17233b] rounded-2xl border border-[#17233b]/15 shadow-2xl overflow-hidden z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={pin.image}
            alt={pin.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17233b]/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#b5cedb] font-medium">
              Architecture Feature
            </span>
            <h3 className="font-display text-2xl md:text-3xl mt-0.5">{pin.title}</h3>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <p className="text-sm text-[#17233b]/80 leading-relaxed font-normal">
            {pin.description}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-[#17233b]/10">
            <button
              onClick={() => {
                onClose();
                onSelectApartment();
              }}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#17233b] hover:text-[#340c24] transition-colors"
            >
              <span>Explore Available Residences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
