import React, { useState } from 'react';
import { PlantSpecimen, RoomType } from '../types';

interface CollectionViewProps {
  plants: PlantSpecimen[];
  onSelectPlant: (plant: PlantSpecimen) => void;
  onOpenAddModal: () => void;
  onQuickWater: (plantId: string) => void;
  onQuickFeed: (plantId: string) => void;
  selectedRoom: RoomType;
  searchQuery: string;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  plants,
  onSelectPlant,
  onOpenAddModal,
  onQuickWater,
  onQuickFeed,
  selectedRoom,
  searchQuery
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'moisture-asc' | 'moisture-desc'>('name');

  const filteredPlants = plants
    .filter((p) => {
      if (selectedRoom !== 'All Rooms' && p.room !== selectedRoom) return false;
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.scientificName.toLowerCase().includes(q) ||
          p.room.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'moisture-asc') return a.soilMoisture - b.soilMoisture;
      if (sortBy === 'moisture-desc') return b.soilMoisture - a.soilMoisture;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Top Header & Collection Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#c1c8c2]/30 shadow-xs">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Sanctuary Registry</div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#032517] font-normal">
            Botanical Collection ({filteredPlants.length})
          </h2>
          <p className="text-xs text-[#424843] mt-0.5">
            Active specimens monitored by soil moisture telemetry and ambient photometrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by Status"
            className="h-9 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-xs font-medium text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
          >
            <option value="all">All Statuses</option>
            <option value="Needs Water">Needs Water</option>
            <option value="Feed Today">Feed Today</option>
            <option value="Hydrated">Hydrated</option>
            <option value="Check Moisture">Check Moisture</option>
            <option value="Reposition Needed">Reposition Needed</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort specimens by"
            className="h-9 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-xs font-medium text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
          >
            <option value="name">Sort by Name</option>
            <option value="moisture-asc">Moisture (Low to High)</option>
            <option value="moisture-desc">Moisture (High to Low)</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-[#f0eee8] p-0.5 rounded-lg border border-[#c1c8c2]/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-[#032517] shadow-xs' : 'text-[#727973]'
              }`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-lg leading-none">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-[#032517] shadow-xs' : 'text-[#727973]'
              }`}
              title="List View"
            >
              <span className="material-symbols-outlined text-lg leading-none">view_list</span>
            </button>
          </div>

          {/* Add Plant Button */}
          <button
            onClick={onOpenAddModal}
            className="h-9 px-4 bg-[#1b3b2b] hover:bg-[#032517] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Specimen
          </button>
        </div>
      </div>

      {/* Grid or List View */}
      {filteredPlants.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#c1c8c2]/30 space-y-3">
          <span className="material-symbols-outlined text-4xl text-[#727973]">filter_vintage</span>
          <h3 className="font-serif text-xl text-[#032517]">No specimens match this criteria</h3>
          <p className="text-xs text-[#424843] max-w-md mx-auto">
            Try resetting filters or clear your search to reveal your sanctuary specimens.
          </p>
          <button
            onClick={() => {
              setStatusFilter('all');
            }}
            className="px-4 py-2 bg-[#f6f3ed] text-[#032517] text-xs font-semibold rounded-lg hover:bg-[#ebe8e2] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => {
            const isDry = plant.soilMoisture < 25;
            const isOptimal = plant.soilMoisture >= 25 && plant.soilMoisture <= 60;
            return (
              <div
                key={plant.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-[#c1c8c2]/30"
              >
                <div onClick={() => onSelectPlant(plant)} className="cursor-pointer">
                  {/* Photo with Overlay Badges */}
                  <div className="relative w-full aspect-[4/3] bg-[#ebe8e2] overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        plant.status === 'Needs Water'
                          ? 'bg-[#ffdbd0] text-[#400e00]'
                          : plant.status === 'Feed Today'
                          ? 'bg-[#c7ebd4] text-[#002113]'
                          : plant.status === 'Reposition Needed'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : 'bg-[#d2e5ca] text-[#566751]'
                      }`}
                    >
                      {plant.status}
                    </div>
                    <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-[#fcf9f3]/90 backdrop-blur-xs text-[11px] font-medium text-[#032517] flex items-center gap-1 shadow-2xs">
                      <span className="material-symbols-outlined text-[13px]">location_on</span>
                      {plant.room}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-serif text-lg text-[#032517] font-medium leading-snug">
                        {plant.name}
                      </h3>
                      <p className="text-xs text-[#52634d] italic font-serif">{plant.scientificName}</p>
                    </div>

                    <div className="bg-[#f6f3ed] p-2.5 rounded-lg border border-[#c1c8c2]/20 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[#424843]">Target Humidity:</span>
                        <span className="text-[#032517] font-semibold">{plant.targetHumidity || '50% RH'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#424843]">Water Cycle:</span>
                        <span className="text-[#52634d] font-medium">Every {plant.wateringIntervalDays} days</span>
                      </div>
                    </div>

                    {/* Moisture Bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#727973] mb-1">
                        <span>Soil Moisture</span>
                        <span className={`font-semibold ${isDry ? 'text-[#611f06]' : 'text-[#52634d]'}`}>
                          {plant.soilMoisture}% ({isDry ? 'Dry' : isOptimal ? 'Optimal' : 'Saturated'})
                        </span>
                      </div>
                      <div className="w-full bg-[#ebe8e2] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isDry ? 'bg-[#611f06]' : isOptimal ? 'bg-[#52634d]' : 'bg-[#1b3b2b]'
                          }`}
                          style={{ width: `${plant.soilMoisture}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onQuickWater(plant.id)}
                    className="flex-1 h-8 rounded-lg bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#032517] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-[#52634d]">water_drop</span>
                    Water (500ml)
                  </button>
                  <button
                    onClick={() => onQuickFeed(plant.id)}
                    className="flex-1 h-8 rounded-lg bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#032517] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-[#52634d]">eco</span>
                    Fertilize
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-[#c1c8c2]/30 shadow-xs overflow-hidden">
          <div className="divide-y divide-[#c1c8c2]/20">
            {filteredPlants.map((plant) => {
              const isDry = plant.soilMoisture < 25;
              const isOptimal = plant.soilMoisture >= 25 && plant.soilMoisture <= 60;
              return (
                <div
                  key={plant.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f6f3ed]/50 transition-colors"
                >
                  <div
                    onClick={() => onSelectPlant(plant)}
                    className="flex items-center gap-4 cursor-pointer flex-1"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#ebe8e2] overflow-hidden shrink-0">
                      <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-serif text-lg text-[#032517] font-medium">{plant.name}</h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
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
                      <p className="text-xs text-[#52634d] italic font-serif">{plant.scientificName}</p>
                      <span className="text-xs text-[#424843] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs text-[#727973]">location_on</span>
                        {plant.room} • {plant.lightCategory} ({plant.lightDots}/5 Dots)
                      </span>
                    </div>
                  </div>

                  {/* Moisture Indicator */}
                  <div className="w-48 shrink-0">
                    <div className="flex items-center justify-between text-xs mb-1 text-[#424843]">
                      <span>Moisture</span>
                      <span className={`font-semibold ${isDry ? 'text-[#611f06]' : 'text-[#52634d]'}`}>
                        {plant.soilMoisture}%
                      </span>
                    </div>
                    <div className="w-full bg-[#ebe8e2] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isDry ? 'bg-[#611f06]' : isOptimal ? 'bg-[#52634d]' : 'bg-[#1b3b2b]'
                        }`}
                        style={{ width: `${plant.soilMoisture}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onQuickWater(plant.id)}
                      className="h-8 px-3 rounded-lg bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#032517] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm text-[#52634d]">water_drop</span>
                      Water
                    </button>
                    <button
                      onClick={() => onSelectPlant(plant)}
                      className="h-8 px-3 rounded-lg bg-[#1b3b2b] text-white hover:bg-[#032517] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
