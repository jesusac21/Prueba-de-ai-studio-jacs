import React, { useState } from 'react';
import { CARE_GUIDES } from '../data/initialData';
import { CareGuide } from '../types';

export const CareGuidesView: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<CareGuide>(CARE_GUIDES[0]);

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#c1c8c2]/30 shadow-xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Botanical Compendium</div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#032517] font-normal">
          Cultivar Knowledge &amp; Care Protocols
        </h2>
        <p className="text-xs sm:text-sm text-[#424843] mt-1 leading-relaxed max-w-3xl">
          Standardized biological parameters formulated from botanical conservatory research. Tailored for
          indoor lighting regimes, microclimate humidity buffers, and custom mineral nutrition.
        </p>
      </div>

      {/* Guide Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Guide List (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#727973] px-1">
            Plant Families &amp; Genera
          </span>
          {CARE_GUIDES.map((guide) => {
            const isSelected = selectedGuide.id === guide.id;
            return (
              <div
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  isSelected
                    ? 'border-[#032517] bg-[#f6f3ed] shadow-2xs'
                    : 'border-[#c1c8c2]/30 bg-white hover:bg-[#f6f3ed]/60'
                }`}
              >
                <img
                  src={guide.image}
                  alt={guide.commonName}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#1c1c18]">{guide.family}</h4>
                  <p className="text-xs text-[#52634d] font-serif italic">{guide.commonName}</p>
                  <span className="text-[11px] text-[#727973] mt-0.5 block">
                    Difficulty: {guide.difficulty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Guide Details (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#c1c8c2]/30 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c1c8c2]/20 pb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">
                {selectedGuide.family}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#032517] font-medium">
                {selectedGuide.commonName}
              </h3>
              <p className="text-sm text-[#52634d] italic font-serif mt-0.5">
                {selectedGuide.scientificName}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#d2e5ca] text-[#566751] text-xs font-semibold self-start sm:self-auto">
              {selectedGuide.difficulty}
            </span>
          </div>

          {/* Quick Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#c1c8c2]/20 space-y-1">
              <span className="text-xs font-bold uppercase text-[#727973] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#52634d]">wb_sunny</span>
                Light Exposure
              </span>
              <p className="text-xs text-[#1c1c18] leading-relaxed">{selectedGuide.lightProfile}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#c1c8c2]/20 space-y-1">
              <span className="text-xs font-bold uppercase text-[#727973] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#52634d]">water_drop</span>
                Hydration Dynamic
              </span>
              <p className="text-xs text-[#1c1c18] leading-relaxed">{selectedGuide.wateringFormula}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#c1c8c2]/20 space-y-1">
              <span className="text-xs font-bold uppercase text-[#727973] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#52634d]">layers</span>
                Substrate &amp; Soil Recipe
              </span>
              <p className="text-xs text-[#1c1c18] leading-relaxed">{selectedGuide.substrateMix}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#c1c8c2]/20 space-y-1">
              <span className="text-xs font-bold uppercase text-[#727973] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#52634d]">thermostat</span>
                Temperature &amp; Humidity
              </span>
              <p className="text-xs text-[#1c1c18] leading-relaxed">{selectedGuide.temperatureHumidity}</p>
            </div>
          </div>

          {/* Common Pitfalls */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#611f06] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">warning</span>
              Common Horticultural Pitfalls
            </h4>
            <div className="space-y-2">
              {selectedGuide.commonPitfalls.map((pitfall, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#ffdbd0]/30 border border-[#ffdbd0] text-xs text-[#400e00] flex items-start gap-2"
                >
                  <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">error</span>
                  <span>{pitfall}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Botanist Advice */}
          <div className="p-5 rounded-xl bg-[#d2e5ca]/30 border border-[#d2e5ca] space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#032517] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#52634d]">psychology</span>
              Elena&apos;s Botanist Note
            </span>
            <p className="text-xs sm:text-sm text-[#1c1c18] leading-relaxed italic">
              &quot;{selectedGuide.expertAdvice}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
