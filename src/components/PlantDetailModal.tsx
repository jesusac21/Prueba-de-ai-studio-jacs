import React, { useState } from 'react';
import { PlantSpecimen } from '../types';

interface PlantDetailModalProps {
  plant: PlantSpecimen | null;
  onClose: () => void;
  onUpdateMoisture: (plantId: string, newMoisture: number) => void;
  onWaterPlant: (plantId: string) => void;
  onFeedPlant: (plantId: string) => void;
  onDeletePlant: (plantId: string) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  onClose,
  onUpdateMoisture,
  onWaterPlant,
  onFeedPlant,
  onDeletePlant
}) => {
  if (!plant) return null;

  const [customMoisture, setCustomMoisture] = useState<number>(plant.soilMoisture);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const isDry = plant.soilMoisture < 25;
  const isOptimal = plant.soilMoisture >= 25 && plant.soilMoisture <= 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a241e]/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-[#c1c8c2]/30 max-h-[90vh] overflow-y-auto">
        {/* Header with Image banner */}
        <div className="relative w-full h-64 sm:h-72 bg-[#ebe8e2] overflow-hidden">
          <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032517]/80 via-transparent to-black/20"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1c1c18] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          >
            ✕
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-white">
                  {plant.room}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    plant.status === 'Needs Water'
                      ? 'bg-[#ffdbd0] text-[#400e00]'
                      : plant.status === 'Feed Today'
                      ? 'bg-[#c7ebd4] text-[#002113]'
                      : 'bg-[#d2e5ca] text-[#566751]'
                  }`}
                >
                  {plant.status}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
                {plant.name}
              </h2>
              <p className="text-sm font-serif italic text-white/90">{plant.scientificName}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Soil Moisture Interactive Controller */}
          <div className="p-5 rounded-2xl bg-[#f6f3ed] border border-[#c1c8c2]/20 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">
                  Real-time Substrate Telemetry
                </span>
                <h4 className="text-sm font-semibold text-[#032517]">Soil Moisture Level</h4>
              </div>
              <div className="text-right">
                <span
                  className={`text-lg font-serif font-bold ${
                    isDry ? 'text-[#611f06]' : isOptimal ? 'text-[#52634d]' : 'text-[#032517]'
                  }`}
                >
                  {plant.soilMoisture}%
                </span>
                <span className="text-xs text-[#727973] block">
                  Target: {plant.optimalMoistureRange[0]}% - {plant.optimalMoistureRange[1]}%
                </span>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="w-full bg-[#ebe8e2] h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isDry ? 'bg-[#611f06]' : isOptimal ? 'bg-[#52634d]' : 'bg-[#1b3b2b]'
                }`}
                style={{ width: `${plant.soilMoisture}%` }}
              ></div>
            </div>

            {/* Interactive Slider & Manual Water */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 flex items-center gap-3">
                <span className="text-xs text-[#727973]">Calibrate:</span>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={customMoisture}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCustomMoisture(val);
                    onUpdateMoisture(plant.id, val);
                  }}
                  className="w-full accent-[#032517]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onWaterPlant(plant.id)}
                  className="h-9 px-3.5 rounded-xl bg-[#611f06] hover:bg-[#400e00] text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">water_drop</span>
                  Water Now (500ml)
                </button>
                <button
                  onClick={() => onFeedPlant(plant.id)}
                  className="h-9 px-3.5 rounded-xl bg-[#1b3b2b] hover:bg-[#032517] text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">eco</span>
                  Feed (10-10-10)
                </button>
              </div>
            </div>
          </div>

          {/* Biological Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#fcf9f3] rounded-xl border border-[#c1c8c2]/20 space-y-1">
              <span className="text-[11px] font-bold uppercase text-[#727973] block">Lighting</span>
              <span className="text-xs font-semibold text-[#1c1c18] block">{plant.lightCategory}</span>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((d) => (
                  <span
                    key={d}
                    className={`w-3 h-1 rounded-full ${
                      d <= plant.lightDots ? 'bg-[#52634d]' : 'bg-[#e5e2dc]'
                    }`}
                  ></span>
                ))}
              </div>
              <span className="text-[10px] text-[#727973] block">{plant.lightDescription}</span>
            </div>

            <div className="p-3.5 bg-[#fcf9f3] rounded-xl border border-[#c1c8c2]/20 space-y-1">
              <span className="text-[11px] font-bold uppercase text-[#727973] block">Hydration Cycle</span>
              <span className="text-xs font-semibold text-[#1c1c18] block">
                Every {plant.wateringIntervalDays} days
              </span>
              <span className="text-[11px] text-[#52634d] block">
                Last watered: {plant.lastWateredDaysAgo} days ago
              </span>
              <span className="text-[10px] text-[#727973] block">{plant.potType || 'Ceramic Pot'}</span>
            </div>

            <div className="p-3.5 bg-[#fcf9f3] rounded-xl border border-[#c1c8c2]/20 space-y-1">
              <span className="text-[11px] font-bold uppercase text-[#727973] block">Nutrition</span>
              <span className="text-xs font-semibold text-[#1c1c18] block">
                Every {plant.fertilizerIntervalDays} days
              </span>
              <span className="text-[11px] text-[#52634d] block">
                Last fed: {plant.lastFedDaysAgo} days ago
              </span>
              <span className="text-[10px] text-[#727973] block">{plant.targetHumidity || '50% RH'}</span>
            </div>
          </div>

          {/* Notes & Curator Advice */}
          {plant.notes && (
            <div className="p-4 rounded-xl bg-[#d2e5ca]/30 border border-[#d2e5ca] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#032517] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#52634d]">sticky_note_2</span>
                Botanical Curator Notes
              </span>
              <p className="text-xs text-[#1c1c18] leading-relaxed">{plant.notes}</p>
            </div>
          )}

          {/* Delete Danger Zone */}
          <div className="pt-4 border-t border-[#c1c8c2]/20 flex items-center justify-between">
            {showConfirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#ba1a1a] font-semibold">Remove from sanctuary?</span>
                <button
                  onClick={() => {
                    onDeletePlant(plant.id);
                    onClose();
                  }}
                  className="h-8 px-3 rounded-lg bg-[#ba1a1a] text-white text-xs font-semibold cursor-pointer"
                >
                  Yes, Remove
                </button>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="h-8 px-3 rounded-lg bg-[#ebe8e2] text-[#1c1c18] text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="text-xs text-[#727973] hover:text-[#ba1a1a] transition-colors cursor-pointer"
              >
                Remove specimen...
              </button>
            )}

            <button
              onClick={onClose}
              className="h-9 px-4 rounded-xl bg-[#ebe8e2] hover:bg-[#dcdad4] text-[#1c1c18] text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
