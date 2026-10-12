import React, { useState, useMemo } from 'react';
import { Apartment, ApartmentType } from '../types';
import { APARTMENTS } from '../data/apartments';
import { Compass, Bed, Maximize2, LayoutGrid, ListFilter, ArrowRight, Check } from 'lucide-react';

interface ApartmentsViewProps {
  initialTypeFilter?: string;
  onSelectApartment: (apt: Apartment) => void;
  onBookCallForApartment: (id: string) => void;
}

export const ApartmentsView: React.FC<ApartmentsViewProps> = ({
  initialTypeFilter,
  onSelectApartment,
  onBookCallForApartment,
}) => {
  const [selectedType, setSelectedType] = useState<string>(initialTypeFilter || 'all');
  const [selectedBeds, setSelectedBeds] = useState<string>('all');
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredApartments = useMemo(() => {
    return APARTMENTS.filter((apt) => {
      if (selectedType !== 'all' && apt.typeCode !== selectedType) return false;
      if (selectedBeds !== 'all' && apt.beds.toString() !== selectedBeds) return false;
      if (selectedBlock !== 'all' && apt.block !== selectedBlock) return false;
      return true;
    });
  }, [selectedType, selectedBeds, selectedBlock]);

  const typeCounts = useMemo(() => {
    return {
      all: APARTMENTS.length,
      'ground-floor-basement': APARTMENTS.filter((a) => a.typeCode === 'ground-floor-basement').length,
      'ground-floor': APARTMENTS.filter((a) => a.typeCode === 'ground-floor').length,
      'penthouse-duplex': APARTMENTS.filter((a) => a.typeCode === 'penthouse-duplex').length,
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f3f3ec] text-[#17233b] pt-28 pb-20">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8 space-y-12">
        {/* Page Title & Context Header */}
        <div className="border-b border-[#17233b]/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#340c24] font-semibold">
              <span>Catalog & Availability</span>
              <span>•</span>
              <span>4Q 2026 Completion</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight mt-2 text-[#17233b]">
              25 Residences
            </h1>
          </div>

          <div className="text-xs md:text-sm text-[#17233b]/70 max-w-md font-normal leading-relaxed">
            Spacious single level and duplex layouts with generous terraces and rooftop solariums, designed for year-round Mediterranean indoor-outdoor living.
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4">
          {/* Primary Typology Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                  selectedType === 'all'
                    ? 'bg-[#17233b] text-[#f3f3ec] shadow-md'
                    : 'bg-white/80 text-[#17233b]/70 hover:bg-white hover:text-[#17233b]'
                }`}
              >
                All Typologies ({typeCounts.all})
              </button>

              <button
                onClick={() => setSelectedType('ground-floor-basement')}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                  selectedType === 'ground-floor-basement'
                    ? 'bg-[#17233b] text-[#f3f3ec] shadow-md'
                    : 'bg-white/80 text-[#17233b]/70 hover:bg-white hover:text-[#17233b]'
                }`}
              >
                Ground floor + basement ({typeCounts['ground-floor-basement']})
              </button>

              <button
                onClick={() => setSelectedType('ground-floor')}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                  selectedType === 'ground-floor'
                    ? 'bg-[#17233b] text-[#f3f3ec] shadow-md'
                    : 'bg-white/80 text-[#17233b]/70 hover:bg-white hover:text-[#17233b]'
                }`}
              >
                Ground Floor ({typeCounts['ground-floor']})
              </button>

              <button
                onClick={() => setSelectedType('penthouse-duplex')}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                  selectedType === 'penthouse-duplex'
                    ? 'bg-[#17233b] text-[#f3f3ec] shadow-md'
                    : 'bg-white/80 text-[#17233b]/70 hover:bg-white hover:text-[#17233b]'
                }`}
              >
                Penthouse duplex ({typeCounts['penthouse-duplex']})
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-white/70 rounded-full border border-[#17233b]/15">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'grid' ? 'bg-[#17233b] text-white shadow-sm' : 'text-[#17233b]/60 hover:text-[#17233b]'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'table' ? 'bg-[#17233b] text-white shadow-sm' : 'text-[#17233b]/60 hover:text-[#17233b]'
                }`}
                title="Table view"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Secondary Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-[#17233b]/50 uppercase tracking-wider text-[10px]">Bedrooms:</span>
              <select
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white/80 border border-[#17233b]/15 text-xs text-[#17233b]"
              >
                <option value="all">Any Bed Count</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[#17233b]/50 uppercase tracking-wider text-[10px]">Block:</span>
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white/80 border border-[#17233b]/15 text-xs text-[#17233b]"
              >
                <option value="all">All Blocks (B1 — B5)</option>
                <option value="B1">Block B1</option>
                <option value="B2">Block B2</option>
                <option value="B3">Block B3</option>
                <option value="B4">Block B4</option>
                <option value="B5">Block B5</option>
              </select>
            </div>

            <span className="text-xs text-[#17233b]/50 ml-auto">
              Showing {filteredApartments.length} of {APARTMENTS.length} residences
            </span>
          </div>
        </div>

        {/* Apartments Results Stage */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments.map((apt) => (
              <div
                key={apt.id}
                onClick={() => onSelectApartment(apt)}
                className="group cursor-pointer rounded-2xl bg-white/80 border border-[#17233b]/15 hover:border-[#17233b]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Floor Plan Display */}
                <div className="relative aspect-[4/3] bg-white p-6 flex items-center justify-center border-b border-[#17233b]/10 overflow-hidden">
                  <img
                    src={apt.image}
                    alt={`Floor plan for apartment ${apt.number}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Status Tag */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full font-medium ${
                      apt.status === 'Reserved'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  {/* Orientation Widget */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#f3f3ec]/90 backdrop-blur-sm border border-[#17233b]/10 text-[10px] text-[#17233b]/70">
                    <Compass className="w-3 h-3 text-[#340c24]" />
                    <span>{apt.orientation?.split('/')[1] || 'South'}</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#17233b]/60 mb-1">
                      <span className="font-mono tracking-widest text-[#340c24] font-semibold">
                        Unit № {apt.number}
                      </span>
                      <span>{apt.block} • Floor {apt.floor}</span>
                    </div>

                    <h3 className="font-display text-2xl text-[#17233b] group-hover:text-[#340c24] transition-colors">
                      {apt.typeTitle}
                    </h3>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#17233b]/10 text-center">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-[#17233b]/50">Beds</div>
                      <div className="text-sm font-semibold mt-0.5">{apt.beds} Bed</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-[#17233b]/50">Interior</div>
                      <div className="text-sm font-semibold mt-0.5">{apt.area}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-[#17233b]/50">Terrace</div>
                      <div className="text-xs font-semibold mt-1 truncate">{apt.terrace}</div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[#17233b]/60 text-[11px]">
                      Completion {apt.completion}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookCallForApartment(apt.id);
                      }}
                      className="px-4 py-1.5 rounded-full border border-[#17233b]/20 hover:border-[#17233b] hover:bg-[#17233b] hover:text-[#f3f3ec] text-[11px] uppercase tracking-wider font-medium transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white/80 rounded-2xl border border-[#17233b]/15 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#17233b]/15 bg-[#17233b]/5 text-[#17233b]/70 uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-6">Unit</th>
                    <th className="py-4 px-6">Typology</th>
                    <th className="py-4 px-6">Block / Floor</th>
                    <th className="py-4 px-6">Beds</th>
                    <th className="py-4 px-6">Built Area</th>
                    <th className="py-4 px-6">Terrace</th>
                    <th className="py-4 px-6">Orientation</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#17233b]/10">
                  {filteredApartments.map((apt) => (
                    <tr
                      key={apt.id}
                      onClick={() => onSelectApartment(apt)}
                      className="hover:bg-[#17233b]/5 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6 font-mono font-semibold text-[#340c24]">
                        № {apt.number}
                      </td>
                      <td className="py-4 px-6 font-medium text-sm">
                        {apt.typeTitle}
                      </td>
                      <td className="py-4 px-6 text-[#17233b]/70">
                        {apt.block} • Floor {apt.floor}
                      </td>
                      <td className="py-4 px-6">
                        {apt.beds} Beds
                      </td>
                      <td className="py-4 px-6 font-medium">
                        {apt.area}
                      </td>
                      <td className="py-4 px-6 text-[#17233b]/80">
                        {apt.terrace}
                      </td>
                      <td className="py-4 px-6 text-[#17233b]/70">
                        {apt.orientation}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium ${
                          apt.status === 'Reserved'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookCallForApartment(apt.id);
                          }}
                          className="px-3.5 py-1 rounded-full bg-[#17233b] hover:bg-[#340c24] text-[#f3f3ec] text-[10px] uppercase tracking-wider font-semibold transition-colors"
                        >
                          Book Call
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
