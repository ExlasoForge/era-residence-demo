import React, { useState } from 'react';
import { X, Compass, CheckCircle2, ArrowRight, ShieldCheck, Maximize2, Share2 } from 'lucide-react';
import { Apartment } from '../types';

interface ApartmentDetailModalProps {
  apartment: Apartment | null;
  onClose: () => void;
  onBookCallForApartment: (id: string) => void;
}

export const ApartmentDetailModal: React.FC<ApartmentDetailModalProps> = ({
  apartment,
  onClose,
  onBookCallForApartment,
}) => {
  const [activeTab, setActiveTab] = useState<'floorplan' | 'specs'>('floorplan');
  const [copied, setCopied] = useState(false);

  if (!apartment) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#17233b]/75 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-[#f3f3ec] text-[#17233b] rounded-2xl border border-[#17233b]/20 shadow-2xl overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#17233b]/10 bg-white/40">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] tracking-[0.25em] uppercase font-mono text-[#340c24] font-semibold">
                  Unit № {apartment.number}
                </span>
                <span className="text-xs text-[#17233b]/40">•</span>
                <span className={`text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full font-medium ${
                  apartment.status === 'Reserved'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {apartment.status}
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl mt-0.5">
                {apartment.typeTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full border border-[#17233b]/20 hover:border-[#17233b] hover:bg-[#17233b] hover:text-[#f3f3ec] transition-colors"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full border border-[#17233b]/20 hover:border-[#17233b] hover:bg-[#17233b] hover:text-[#f3f3ec] transition-colors"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-1">
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-white/70 rounded-xl border border-[#17233b]/10 text-center">
            <div>
              <div className="text-[10px] tracking-widest uppercase text-[#17233b]/50">Bedrooms</div>
              <div className="font-display text-xl md:text-2xl mt-0.5 font-medium">{apartment.beds} Bed</div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest uppercase text-[#17233b]/50">Interior Area</div>
              <div className="font-display text-xl md:text-2xl mt-0.5 font-medium">{apartment.area}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest uppercase text-[#17233b]/50">Terrace / Solarium</div>
              <div className="font-display text-xl md:text-2xl mt-0.5 font-medium">{apartment.terrace}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest uppercase text-[#17233b]/50">Block & Floor</div>
              <div className="font-display text-xl md:text-2xl mt-0.5 font-medium">{apartment.block} • Floor {apartment.floor}</div>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
              <div className="text-[10px] tracking-widest uppercase text-[#17233b]/50 mb-1 flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#340c24]" />
                <span>Orientation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="w-5 h-5 rounded-full border border-[#17233b]/30 flex items-center justify-center transition-transform duration-500"
                  style={{ transform: `rotate(${apartment.compassAngle || -165}deg)` }}
                >
                  <span className="w-0.5 h-3 bg-[#340c24] rounded-full"></span>
                </div>
                <span className="text-xs font-medium text-[#17233b]/90">{apartment.orientation}</span>
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex space-x-3 border-b border-[#17233b]/15 pb-2">
            <button
              onClick={() => setActiveTab('floorplan')}
              className={`text-xs uppercase tracking-[0.2em] pb-2 font-medium transition-colors ${
                activeTab === 'floorplan'
                  ? 'border-b-2 border-[#17233b] text-[#17233b]'
                  : 'text-[#17233b]/50 hover:text-[#17233b]'
              }`}
            >
              Architectural Floor Plan
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-xs uppercase tracking-[0.2em] pb-2 font-medium transition-colors ${
                activeTab === 'specs'
                  ? 'border-b-2 border-[#17233b] text-[#17233b]'
                  : 'text-[#17233b]/50 hover:text-[#17233b]'
              }`}
            >
              Specifications & Included Finishes
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'floorplan' ? (
            <div className="space-y-4">
              <div className="relative bg-white rounded-xl p-4 md:p-8 border border-[#17233b]/10 flex items-center justify-center min-h-[380px]">
                <img
                  src={apartment.image}
                  alt={`Floor plan for apartment ${apartment.number}`}
                  className="max-h-[460px] w-auto object-contain mx-auto transition-transform duration-500 hover:scale-105 cursor-zoom-in"
                />
                <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-[#17233b]/40 bg-[#f3f3ec] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#17233b]/10">
                  <Maximize2 className="w-3 h-3" />
                  <span>Precision CAD Architectural Drawing</span>
                </div>
              </div>
              <p className="text-xs text-[#17233b]/60 leading-relaxed text-center">
                Detailed dimensions and partition walls shown for illustration purposes. Built to exact Swiss Technology S.L. structural specifications.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-[#17233b]/80 leading-relaxed">
                {apartment.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {apartment.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-lg bg-white/60 border border-[#17233b]/10">
                    <CheckCircle2 className="w-4 h-4 text-[#340c24] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#17233b]/90 leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#17233b]/5 border border-[#17233b]/10 flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#340c24]" />
                <span className="text-xs text-[#17233b]/80">
                  Construction License fully obtained. All payments protected by independent bank guarantee under Spanish building regulations.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-[#17233b]/10 bg-white/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#17233b]/70 text-center sm:text-left">
            <span className="font-semibold text-[#17233b]">Completion: {apartment.completion}</span> • Estepona, New Golden Mile
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onBookCallForApartment(apartment.id);
              }}
              className="flex-1 sm:flex-initial py-3 px-6 rounded-full bg-[#17233b] hover:bg-[#340c24] text-[#f3f3ec] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Book Consultation for Unit #{apartment.number}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
