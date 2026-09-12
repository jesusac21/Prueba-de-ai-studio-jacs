import React, { useState } from 'react';
import { CareTask, PlantSpecimen } from '../types';

interface ScheduleViewProps {
  tasks: CareTask[];
  plants: PlantSpecimen[];
  onCompleteTask: (taskId: string) => void;
  onOpenExport: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  tasks,
  plants,
  onCompleteTask,
  onOpenExport
}) => {
  const [taskFilter, setTaskFilter] = useState<'all' | 'water' | 'fertilize' | 'clean'>('all');
  const [activeDay, setActiveDay] = useState<number>(24);

  const daysInMonth = [
    { dayName: 'Mon', num: 22, tasksCount: 2, completed: 2 },
    { dayName: 'Tue', num: 23, tasksCount: 1, completed: 1 },
    { dayName: 'Wed', num: 24, tasksCount: 3, completed: 0, isToday: true },
    { dayName: 'Thu', num: 25, tasksCount: 1, completed: 0 },
    { dayName: 'Fri', num: 26, tasksCount: 2, completed: 0 },
    { dayName: 'Sat', num: 27, tasksCount: 3, completed: 0 },
    { dayName: 'Sun', num: 28, tasksCount: 0, completed: 0 },
  ];

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter !== 'all' && t.taskType !== taskFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#c1c8c2]/30 shadow-xs">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Horticultural Chrono</div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#032517] font-normal">
            Schedule &amp; Botanical Calendar
          </h2>
          <p className="text-xs text-[#424843] mt-1">
            Automated schedule calculated from potting substrate volume, ambient lux, and transpiration rates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Routine Filter */}
          <div className="flex items-center bg-[#f0eee8] p-1 rounded-xl">
            {[
              { id: 'all', label: 'All Routines' },
              { id: 'water', label: 'Watering' },
              { id: 'fertilize', label: 'Feeding' },
              { id: 'clean', label: 'Maintenance' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setTaskFilter(f.id as any)}
                className={`px-3 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                  taskFilter === f.id
                    ? 'bg-white text-[#032517] font-semibold shadow-xs'
                    : 'text-[#424843] hover:text-[#1c1c18]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenExport}
            className="h-9 px-3.5 rounded-lg bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#032517] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">ios_share</span>
            Export
          </button>
        </div>
      </div>

      {/* Week Day Navigator */}
      <div className="bg-white p-6 rounded-2xl border border-[#c1c8c2]/30 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#727973]">
            September 2026 • Equinox Transition Cycle
          </span>
          <span className="text-xs text-[#52634d] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">nest_clock_farsight_analog</span>
            Sensors sync every 15 min
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((d) => {
            const isSelected = activeDay === d.num;
            return (
              <div
                key={d.num}
                onClick={() => setActiveDay(d.num)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-between min-h-[90px] transition-all cursor-pointer ${
                  d.isToday
                    ? 'border-[#032517] bg-[#032517] text-white shadow-xs'
                    : isSelected
                    ? 'border-[#032517] bg-[#f6f3ed]'
                    : 'border-[#c1c8c2]/30 bg-[#fcf9f3] hover:bg-[#f6f3ed]'
                }`}
              >
                <span className={`text-[11px] font-semibold uppercase ${d.isToday ? 'opacity-80' : 'text-[#727973]'}`}>
                  {d.dayName}
                </span>
                <span className={`font-serif text-2xl font-medium ${d.isToday ? 'text-white' : 'text-[#1c1c18]'}`}>
                  {d.num}
                </span>
                <div className="flex items-center gap-1">
                  {d.tasksCount > 0 ? (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        d.isToday
                          ? 'bg-[#ffdbd0] text-[#400e00]'
                          : d.completed === d.tasksCount
                          ? 'bg-[#d2e5ca] text-[#566751]'
                          : 'bg-[#ebe8e2] text-[#424843]'
                      }`}
                    >
                      {d.completed === d.tasksCount ? 'Completed' : `${d.tasksCount} Due`}
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#727973]">Rest</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Queue for the Week */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#c1c8c2]/30 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#c1c8c2]/20 pb-4">
          <h3 className="font-serif text-xl text-[#032517] font-medium">Care Tasks Queue</h3>
          <span className="text-xs text-[#727973]">
            {filteredTasks.filter((t) => !t.isCompleted).length} pending actions
          </span>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => {
            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  task.isCompleted
                    ? 'bg-[#f6f3ed]/60 border-[#c1c8c2]/20 opacity-60'
                    : 'bg-[#fcf9f3] border-[#c1c8c2]/30 hover:bg-[#f6f3ed]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#e5e2dc] flex items-center justify-center shrink-0 text-[#032517]">
                    <span className="material-symbols-outlined text-xl">
                      {task.taskType === 'water'
                        ? 'water_drop'
                        : task.taskType === 'fertilize'
                        ? 'eco'
                        : 'yard'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-[#1c1c18]">{task.plantName}</h4>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#ebe8e2] text-[#424843] font-medium">
                        {task.relativeDue}
                      </span>
                    </div>
                    <p className="text-xs text-[#424843] mt-0.5">{task.details}</p>
                    <span className="text-[11px] text-[#727973] block mt-1">{task.room}</span>
                  </div>
                </div>

                <button
                  onClick={() => onCompleteTask(task.id)}
                  disabled={task.isCompleted}
                  className={`h-9 px-4 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer ${
                    task.isCompleted
                      ? 'bg-[#e5e2dc] text-[#424843] cursor-default'
                      : 'bg-[#032517] hover:bg-[#1b3b2b] text-white active:scale-95'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {task.isCompleted ? 'check_circle' : 'check'}
                  </span>
                  {task.isCompleted ? 'Completed' : 'Log Routine'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
