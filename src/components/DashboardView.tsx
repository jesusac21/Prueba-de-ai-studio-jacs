import React, { useState } from 'react';
import { PlantSpecimen, CareTask, PhotometricZone, RoomType } from '../types';

interface DashboardViewProps {
  plants: PlantSpecimen[];
  tasks: CareTask[];
  onCompleteTask: (taskId: string) => void;
  onCompleteAllToday: () => void;
  onSnooze: () => void;
  onOpenExport: () => void;
  onSelectPlant: (plant: PlantSpecimen) => void;
  selectedRoom: RoomType;
  searchQuery: string;
  onOpenRecipeGuide: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  plants,
  tasks,
  onCompleteTask,
  onCompleteAllToday,
  onSnooze,
  onOpenExport,
  onSelectPlant,
  selectedRoom,
  searchQuery,
  onOpenRecipeGuide
}) => {
  const [plantFilter, setPlantFilter] = useState<'all' | 'water' | 'high-light' | 'low-light'>('all');
  const [selectedDay, setSelectedDay] = useState<number>(24);

  // Filter tasks based on room and completion
  const todayTasks = tasks.filter(
    (t) => t.dueTime === 'today' && (selectedRoom === 'All Rooms' || t.room.includes(selectedRoom))
  );

  const upcomingTasks = tasks.filter(
    (t) => t.dueTime === 'upcoming' && (selectedRoom === 'All Rooms' || t.room.includes(selectedRoom))
  );

  const pendingTodayCount = todayTasks.filter((t) => !t.isCompleted).length;
  const completedTodayCount = todayTasks.filter((t) => t.isCompleted).length;
  const totalTodayTasks = todayTasks.length;
  const completionPercentage =
    totalTodayTasks > 0 ? Math.round((completedTodayCount / totalTodayTasks) * 100) : 100;

  // Filter plants
  const filteredPlants = plants.filter((p) => {
    // Room filter
    if (selectedRoom !== 'All Rooms' && p.room !== selectedRoom) {
      return false;
    }
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.scientificName.toLowerCase().includes(q) ||
        p.room.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Category filter
    if (plantFilter === 'water') return p.status === 'Needs Water' || p.soilMoisture < 30;
    if (plantFilter === 'high-light') return p.lightDots >= 4;
    if (plantFilter === 'low-light') return p.lightDots <= 2;
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-8">
      {/* =========================================
          TOP HERO / WELCOME BANNER
      ========================================= */}
      <section className="relative w-full rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-[#c1c8c2]/30 overflow-hidden">
        <div className="absolute -right-16 -top-24 w-96 h-96 rounded-full bg-[#d2e5ca]/30 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#c7ebd4]/25 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d2e5ca] text-[#566751] text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#032517]"></span>
              BIOMETRIC BOTANICAL PULSE
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#032517] tracking-tight font-normal">
              Good morning, Elena <span className="text-[#52634d] font-serif italic font-normal">🌿</span>
            </h1>
            <p className="text-sm sm:text-base text-[#424843] leading-relaxed">
              Your conservatory microclimate is thriving.{' '}
              <span className="text-[#611f06] font-semibold">
                {pendingTodayCount} {pendingTodayCount === 1 ? 'plant needs' : 'plants need'} watering today
              </span>
              , and{' '}
              <span className="text-[#032517] font-semibold">2 fertilization cycles</span> are due this week across{' '}
              {selectedRoom === 'All Rooms' ? '4 zones' : selectedRoom}.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onCompleteAllToday}
              disabled={pendingTodayCount === 0}
              className="h-10 px-4 rounded-xl bg-[#032517] text-white text-sm font-semibold flex items-center gap-2 shadow-sm hover:bg-[#1b3b2b] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
              id="btnLogAll"
            >
              <span className="material-symbols-outlined text-lg">checklist</span>
              {pendingTodayCount === 0 ? 'All Logged' : 'Log All Completed'}
            </button>
            <button
              onClick={onSnooze}
              className="h-10 px-4 rounded-xl bg-[#ebe8e2] hover:bg-[#dcdad4] text-[#1c1c18] text-sm font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              id="btnSnooze"
            >
              <span className="material-symbols-outlined text-lg text-[#52634d]">snooze</span>
              Snooze 24h
            </button>
            <button
              onClick={onOpenExport}
              className="h-10 px-4 rounded-xl bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#424843] text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">ios_share</span>
              Export Log
            </button>
          </div>
        </div>

        {/* 4-Column Stat Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat 1: Hydration */}
          <div className="relative bg-[#f6f3ed] rounded-xl p-4 flex items-center justify-between shadow-xs border border-[#c1c8c2]/20">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Hydration</span>
              <div className="font-serif text-2xl sm:text-3xl text-[#032517] leading-tight">
                {pendingTodayCount}{' '}
                <span className="text-xs text-[#424843] font-sans font-normal">pending</span>
              </div>
              <span className="text-xs text-[#424843] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#032517]">water_drop</span>
                {completedTodayCount} of {totalTodayTasks} completed
              </span>
            </div>
            {/* Circular Progress Gauge */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                <circle
                  className="text-[#e5e2dc]"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <circle
                  className="text-[#1b3b2b] transition-all duration-700"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="18"
                  stroke="currentColor"
                  strokeDasharray="113"
                  strokeDashoffset={113 - (113 * completionPercentage) / 100}
                  strokeLinecap="round"
                  strokeWidth="4"
                ></circle>
              </svg>
              <span className="absolute text-xs font-bold text-[#032517]">
                {completionPercentage}%
              </span>
            </div>
          </div>

          {/* Stat 2: Nutrient Feed */}
          <div className="relative bg-[#f6f3ed] rounded-xl p-4 flex items-center justify-between shadow-xs border border-[#c1c8c2]/20">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Nutrient Feed</span>
              <div className="font-serif text-2xl sm:text-3xl text-[#032517] leading-tight">
                2 <span className="text-xs text-[#424843] font-sans font-normal">due this week</span>
              </div>
              <span className="text-xs text-[#52634d] flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-sm">compost</span>
                Spring feeding cycle
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#d2e5ca]/70 text-[#52634d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </div>
          </div>

          {/* Stat 3: Photoperiod */}
          <div className="relative bg-[#f6f3ed] rounded-xl p-4 flex items-center justify-between shadow-xs border border-[#c1c8c2]/20">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Photoperiod</span>
              <div className="font-serif text-2xl sm:text-3xl text-[#032517] leading-tight">
                94% <span className="text-xs text-[#424843] font-sans font-normal">happy</span>
              </div>
              <span className="text-xs text-[#611f06] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">wb_sunny</span>
                1 reposition needed
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ffdbd0] text-[#400e00] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">wb_sunny</span>
            </div>
          </div>

          {/* Stat 4: Sanctuary Census */}
          <div className="relative bg-[#f6f3ed] rounded-xl p-4 flex items-center justify-between shadow-xs border border-[#c1c8c2]/20">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Sanctuary Census</span>
              <div className="font-serif text-2xl sm:text-3xl text-[#032517] leading-tight">
                {plants.length}{' '}
                <span className="text-xs text-[#424843] font-sans font-normal">specimens</span>
              </div>
              <span className="text-xs text-[#424843] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#52634d]">meeting_room</span>
                Distributed in 4 rooms
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#e5e2dc] text-[#032517] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">potted_plant</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PRIORITY CARE SCHEDULE (WEEKLY TIMELINE & TASKS)
      ========================================= */}
      <section className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#c1c8c2]/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Chronological Routine</div>
            <h2 className="font-serif text-2xl text-[#032517] font-medium">Priority Care Schedule</h2>
          </div>
          <div className="inline-flex items-center gap-2 text-xs text-[#424843]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#611f06] animate-pulse"></span>
            <span>Automated Soil Sensors Online</span>
          </div>
        </div>

        {/* Horizontal Weekly Calendar Strip */}
        <div className="grid grid-cols-7 gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {[
            { day: 'Mon', num: 22, badge: '2 Done', isToday: false },
            { day: 'Tue', num: 23, badge: '1 Done', isToday: false },
            { day: 'Today', num: 24, badge: `${pendingTodayCount} Pending`, isToday: true },
            { day: 'Thu', num: 25, badge: '1 Due', isToday: false },
            { day: 'Fri', num: 26, badge: '2 Due', isToday: false },
            { day: 'Sat', num: 27, badge: '3 Due', isToday: false },
            { day: 'Sun', num: 28, badge: '0 Due', isToday: false },
          ].map((col) => {
            const isSelected = selectedDay === col.num;
            if (col.isToday) {
              return (
                <div
                  key={col.num}
                  onClick={() => setSelectedDay(col.num)}
                  className="flex flex-col items-center py-2.5 px-1.5 rounded-xl bg-[#032517] text-white shadow-sm ring-2 ring-[#032517]/20 scale-105 cursor-pointer transition-all"
                >
                  <span className="text-[11px] font-semibold tracking-wider uppercase opacity-80">Today</span>
                  <span className="font-serif text-xl sm:text-2xl text-white font-medium mt-0.5">24</span>
                  <span className="mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#400e00] leading-none whitespace-nowrap">
                    {col.badge}
                  </span>
                </div>
              );
            }
            return (
              <div
                key={col.num}
                onClick={() => setSelectedDay(col.num)}
                className={`flex flex-col items-center py-2.5 px-1.5 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ebe8e2] text-[#032517] ring-1 ring-[#032517]/30'
                    : 'bg-[#f6f3ed]/60 text-[#424843] hover:bg-[#ebe8e2]'
                }`}
              >
                <span className="text-[11px] font-semibold uppercase">{col.day}</span>
                <span className="text-base font-semibold text-[#1c1c18] mt-0.5">{col.num}</span>
                <span className="mt-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#d2e5ca]/80 text-[#566751] whitespace-nowrap">
                  {col.badge}
                </span>
              </div>
            );
          })}
        </div>

        {/* Task Cards Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Due Today Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-sm font-semibold text-[#032517] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#611f06]"></span>
                Due Today — Priority Attention
              </span>
              <span className="text-xs text-[#727973]">{todayTasks.length} items</span>
            </div>

            {todayTasks.length === 0 ? (
              <div className="p-8 text-center bg-[#f6f3ed] rounded-xl text-sm text-[#424843]">
                No tasks due today in this view. All specimens are in homeostasis.
              </div>
            ) : (
              todayTasks.map((task) => {
                const isTaskCompleted = task.isCompleted;
                return (
                  <div
                    key={task.id}
                    id={task.id}
                    className={`group rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all border border-[#c1c8c2]/20 ${
                      isTaskCompleted
                        ? 'bg-[#f6f3ed]/50 opacity-60'
                        : 'bg-[#f6f3ed] hover:bg-[#f0eee8]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      {task.image ? (
                        <div className="w-12 h-12 rounded-lg bg-[#ebe8e2] overflow-hidden shrink-0">
                          <img
                            src={task.image}
                            alt={task.plantName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-[#d2e5ca] text-[#52634d] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined">potted_plant</span>
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-semibold text-[#1c1c18]">{task.plantName}</h4>
                          {task.badgeText && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                                task.badgeColor === 'tertiary'
                                  ? 'bg-[#ffdbd0] text-[#400e00]'
                                  : task.badgeColor === 'secondary'
                                  ? 'bg-[#d2e5ca] text-[#566751]'
                                  : 'bg-[#c7ebd4] text-[#002113]'
                              }`}
                            >
                              {task.badgeText}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#424843]">{task.room}</p>
                        <div className="text-xs text-[#032517] font-medium flex items-center gap-1.5 pt-1">
                          <span className="material-symbols-outlined text-sm text-[#52634d]">
                            {task.taskType === 'water'
                              ? 'water_drop'
                              : task.taskType === 'fertilize'
                              ? 'eco'
                              : 'yard'}
                          </span>
                          {task.details}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onCompleteTask(task.id)}
                      disabled={isTaskCompleted}
                      className={`h-9 px-3.5 rounded-lg text-xs font-semibold shrink-0 flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        isTaskCompleted
                          ? 'bg-[#e5e2dc] text-[#424843] cursor-default'
                          : task.taskType === 'fertilize'
                          ? 'bg-[#1b3b2b] hover:bg-[#032517] text-white active:scale-95'
                          : 'bg-[#611f06] hover:bg-[#400e00] text-white active:scale-95'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isTaskCompleted ? 'done_all' : 'check'}
                      </span>
                      {isTaskCompleted ? 'Logged Today' : task.actionLabel}
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Upcoming Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-sm font-semibold text-[#424843] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c1c8c2]"></span>
                Upcoming (Next 48h)
              </span>
              <span className="text-xs text-[#727973]">{upcomingTasks.length} items</span>
            </div>

            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-[#f6f3ed]/70 rounded-xl p-4 flex items-start gap-3 border border-[#c1c8c2]/20"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ebe8e2] flex items-center justify-center shrink-0 text-[#52634d]">
                  <span className="material-symbols-outlined">
                    {task.taskType === 'clean' ? 'content_cut' : 'yard'}
                  </span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs sm:text-sm font-semibold text-[#1c1c18]">{task.plantName}</h5>
                    <span className="text-[11px] text-[#727973] font-medium">{task.relativeDue}</span>
                  </div>
                  <p className="text-xs text-[#424843]">{task.room}</p>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[11px] text-[#032517] font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#52634d]">
                        {task.taskType === 'clean' ? 'brush' : 'humidity_low'}
                      </span>{' '}
                      {task.details}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Pot Leaching Notice Banner */}
            <div className="mt-auto p-4 rounded-xl bg-[#f0eee8] flex items-start gap-3 border border-[#c1c8c2]/30">
              <span className="material-symbols-outlined text-[#611f06] text-xl shrink-0 mt-0.5">
                info
              </span>
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-[#1c1c18]">Pot Leaching Notice</div>
                <p className="text-xs text-[#424843] leading-relaxed">
                  Time to flush mineral salt crusts on raw terracotta pots for Calathea and Monstera during today&apos;s watering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SUNLIGHT & MICROCLIMATE ROSTER
      ========================================= */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Botanical Inventory</div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#032517] font-normal">
              Sunlight &amp; Microclimate Roster
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f0eee8] rounded-xl self-start sm:self-auto">
            {[
              { id: 'all', label: 'All Specimens' },
              { id: 'water', label: 'Needs Water' },
              { id: 'high-light', label: 'High Light' },
              { id: 'low-light', label: 'Low Light' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setPlantFilter(f.id as any)}
                className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  plantFilter === f.id
                    ? 'bg-white text-[#032517] font-semibold shadow-xs'
                    : 'text-[#424843] hover:text-[#1c1c18]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Specimens Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredPlants.map((plant) => {
            const isDry = plant.soilMoisture < 25;
            const isOptimal = plant.soilMoisture >= 25 && plant.soilMoisture <= 60;
            return (
              <div
                key={plant.id}
                onClick={() => onSelectPlant(plant)}
                className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-[#c1c8c2]/30 cursor-pointer"
              >
                <div>
                  {/* Plant Image Container */}
                  <div className="relative w-full aspect-[4/3] bg-[#ebe8e2] overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Status Badge */}
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

                    {/* Room Tag */}
                    <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-[#fcf9f3]/90 backdrop-blur-xs text-[11px] font-medium text-[#032517] flex items-center gap-1 shadow-2xs">
                      <span className="material-symbols-outlined text-[13px]">location_on</span>
                      {plant.room}
                    </div>
                  </div>

                  {/* Plant Body Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-serif text-lg text-[#032517] leading-snug font-medium">
                        {plant.name}
                      </h3>
                      <p className="text-xs text-[#52634d] italic font-serif">{plant.scientificName}</p>
                    </div>

                    {/* Sunlight Meter */}
                    <div className="space-y-1.5 bg-[#f6f3ed] p-2.5 rounded-lg border border-[#c1c8c2]/20">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#424843] flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-xs text-[#52634d]">
                            {plant.lightDots >= 4 ? 'wb_sunny' : 'cloud'}
                          </span>
                          {plant.lightCategory}
                        </span>
                        <span className="text-[#032517] font-bold">{plant.lightDots}/5 Dots</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <span
                            key={dot}
                            className={`w-3.5 h-1.5 rounded-full ${
                              dot <= plant.lightDots ? 'bg-[#52634d]' : 'bg-[#e5e2dc]'
                            }`}
                          ></span>
                        ))}
                      </div>
                      <span className="text-[10px] text-[#424843] block">{plant.lightDescription}</span>
                    </div>

                    {/* Schedule Badges */}
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between text-[#424843]">
                        <span>Watering:</span>
                        <span
                          className={`font-semibold ${
                            plant.status === 'Needs Water' ? 'text-[#611f06]' : 'text-[#52634d]'
                          }`}
                        >
                          {plant.wateringSchedule}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[#424843]">
                        <span>Fertilizer:</span>
                        <span
                          className={`font-medium ${
                            plant.status === 'Feed Today' ? 'text-[#032517] font-bold' : 'text-[#424843]'
                          }`}
                        >
                          {plant.fertilizerSchedule}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Soil Moisture Gauge Footer */}
                <div className="p-4 pt-0">
                  <div className="w-full bg-[#ebe8e2] h-1.5 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isDry ? 'bg-[#611f06]' : isOptimal ? 'bg-[#52634d]' : 'bg-[#1b3b2b]'
                      }`}
                      style={{ width: `${plant.soilMoisture}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#727973]">
                    <span>Soil Moisture</span>
                    <span
                      className={`font-semibold ${
                        isDry ? 'text-[#611f06]' : 'text-[#52634d]'
                      }`}
                    >
                      {plant.soilMoisture}% ({isDry ? 'Dry' : isOptimal ? 'Optimal' : 'Saturated'})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================
          LOWER BENTO SECTION: BIO-NUTRIENTS & PHOTOMETRICS
      ========================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Seasonal Bio-Nutrient Protocol */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#c1c8c2]/30 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Nutrient Kinetics</div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#c7ebd4] text-[#002113] text-[11px] font-semibold">
                Spring Surge
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#032517]">Seasonal Bio-Nutrient Protocol</h3>
            <p className="text-xs sm:text-sm text-[#424843] mt-1 leading-relaxed">
              Plants are experiencing accelerated foliar cell expansion due to increased equinox daylight hours.
            </p>

            {/* Growth Phase Progress Bar */}
            <div className="mt-5 p-4 rounded-xl bg-[#f6f3ed] space-y-2 border border-[#c1c8c2]/20">
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#032517] font-semibold">
                <span>Spring / Summer Growth Boost Phase</span>
                <span className="text-xs text-[#52634d]">Week 8 of 16</span>
              </div>
              <div className="w-full bg-[#e5e2dc] h-2 rounded-full overflow-hidden">
                <div className="bg-[#1b3b2b] h-full rounded-full" style={{ width: '58%' }}></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#727973]">
                <span>March Dormancy Exit</span>
                <span>June Peak Vigour</span>
                <span>Sept Dormancy Prep</span>
              </div>
            </div>

            {/* Nutrient Formula Metrics */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-3 bg-[#f6f3ed] rounded-xl border border-[#c1c8c2]/20">
                <span className="text-[10px] font-bold uppercase text-[#727973] block">N-P-K Formula</span>
                <span className="font-serif text-base sm:text-lg font-bold text-[#032517] block mt-0.5">3 : 1 : 2</span>
                <span className="text-[10px] text-[#52634d]">High Nitrogen</span>
              </div>
              <div className="p-3 bg-[#f6f3ed] rounded-xl border border-[#c1c8c2]/20">
                <span className="text-[10px] font-bold uppercase text-[#727973] block">Compost Tea</span>
                <span className="font-serif text-base sm:text-lg font-bold text-[#032517] block mt-0.5">Every 14d</span>
                <span className="text-[10px] text-[#52634d]">Active microbes</span>
              </div>
              <div className="p-3 bg-[#f6f3ed] rounded-xl border border-[#c1c8c2]/20">
                <span className="text-[10px] font-bold uppercase text-[#727973] block">Substrate pH</span>
                <span className="font-serif text-base sm:text-lg font-bold text-[#032517] block mt-0.5">6.2 - 6.8</span>
                <span className="text-[10px] text-[#52634d]">Optimal uptake</span>
              </div>
            </div>
          </div>

          {/* Quick Recipe Banner */}
          <div className="p-4 rounded-xl bg-[#d2e5ca]/40 flex items-center justify-between gap-3 mt-2 border border-[#d2e5ca]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#52634d] text-xl">science</span>
              <span className="text-xs sm:text-sm text-[#1c1c18]">
                Next bulk dilution: <strong>Sunday, 10:00 AM</strong>
              </span>
            </div>
            <button
              onClick={onOpenRecipeGuide}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#f6f3ed] text-[#032517] text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              Recipe Guide
            </button>
          </div>
        </div>

        {/* Right: Sunlight Exposure Distribution (Live Photometrics) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#c1c8c2]/30 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Ambient Photometrics</div>
              <div className="flex items-center gap-1.5 text-xs text-[#52634d] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#52634d] animate-ping"></span>
                Live Sensors
              </div>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#032517]">Sunlight Exposure Distribution</h3>
            <p className="text-xs sm:text-sm text-[#424843] mt-1 leading-relaxed">
              Calibrated light levels across active living zones measured in Foot-Candles (FC).
            </p>

            {/* Sensor Exposure Bars */}
            <div className="space-y-3.5 mt-5">
              {/* Sunroom */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#1c1c18] font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#611f06]">sunny</span>
                    Sunroom (South / West Glass)
                  </span>
                  <span className="text-[#032517] font-bold">
                    2,150 FC <span className="font-normal text-[#727973] text-[11px]">• Excellent</span>
                  </span>
                </div>
                <div className="w-full bg-[#ebe8e2] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#032517] h-full rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>

              {/* Living Room */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#1c1c18] font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#52634d]">filter_drama</span>
                    Living Room (East Window Canopy)
                  </span>
                  <span className="text-[#032517] font-bold">
                    1,050 FC <span className="font-normal text-[#727973] text-[11px]">• Optimal</span>
                  </span>
                </div>
                <div className="w-full bg-[#ebe8e2] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#52634d] h-full rounded-full" style={{ width: '52%' }}></div>
                </div>
              </div>

              {/* Bedroom */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#1c1c18] font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#727973]">curtains</span>
                    Bedroom (North Diffused)
                  </span>
                  <span className="text-[#032517] font-bold">
                    380 FC <span className="font-normal text-[#727973] text-[11px]">• Med-Low</span>
                  </span>
                </div>
                <div className="w-full bg-[#ebe8e2] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#b9ccb1] h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              {/* Home Office */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#1c1c18] font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#727973]">desk</span>
                    Home Office (Interior Ambient)
                  </span>
                  <span className="text-[#032517] font-bold">
                    210 FC <span className="font-normal text-[#727973] text-[11px]">• Low Light</span>
                  </span>
                </div>
                <div className="w-full bg-[#ebe8e2] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#c1c8c2] h-full rounded-full" style={{ width: '14%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Microclimate Adjustment Tip */}
          <div className="p-4 rounded-xl bg-[#ffdbd0]/50 flex items-start gap-3 mt-2 border border-[#ffb59d]/50">
            <span className="material-symbols-outlined text-[#400e00] shrink-0 mt-0.5">wb_incandescent</span>
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-[#400e00]">Microclimate Adjustment Tip</div>
              <p className="text-xs text-[#424843] leading-relaxed">
                Move your <strong>Peace Lily</strong> 2 feet back from the west window sill. Late afternoon intensity is exceeding 1,200 FC, which may cause foliar tip crisping.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
