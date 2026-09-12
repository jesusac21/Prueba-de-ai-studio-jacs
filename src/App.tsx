/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CollectionView } from './components/CollectionView';
import { ScheduleView } from './components/ScheduleView';
import { DiagnosticsView } from './components/DiagnosticsView';
import { CareGuidesView } from './components/CareGuidesView';
import { AddPlantModal } from './components/AddPlantModal';
import { PlantDetailModal } from './components/PlantDetailModal';
import { ExportModal } from './components/ExportModal';
import { RecipeModal } from './components/RecipeModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { INITIAL_PLANTS, INITIAL_TASKS } from './data/initialData';
import { PlantSpecimen, CareTask, RoomType } from './types';

export default function App() {
  // Persistent or state-backed data
  const [plants, setPlants] = useState<PlantSpecimen[]>(() => {
    const saved = localStorage.getItem('verdantcare_plants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse plants from localStorage', e);
      }
    }
    return INITIAL_PLANTS;
  });

  const [tasks, setTasks] = useState<CareTask[]>(() => {
    const saved = localStorage.getItem('verdantcare_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
      }
    }
    return INITIAL_TASKS;
  });

  // UI State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('All Rooms');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [selectedPlant, setSelectedPlant] = useState<PlantSpecimen | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('verdantcare_plants', JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    localStorage.setItem('verdantcare_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Complete Single Task
  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, isCompleted: true } : t))
    );

    // Also update associated plant's telemetry
    if (task.plantId) {
      setPlants((prev) =>
        prev.map((p) => {
          if (p.id === task.plantId) {
            return {
              ...p,
              soilMoisture: task.taskType === 'water' ? 65 : p.soilMoisture,
              status: 'Hydrated',
              lastWateredDaysAgo: task.taskType === 'water' ? 0 : p.lastWateredDaysAgo,
              lastFedDaysAgo: task.taskType === 'fertilize' ? 0 : p.lastFedDaysAgo
            };
          }
          return p;
        })
      );
    }

    showToast(`Logged routine for ${task.plantName}. Sensor updated to optimal hydration.`);
  };

  // Complete All Tasks Due Today
  const handleCompleteAllToday = () => {
    setTasks((prev) =>
      prev.map((t) => (t.dueTime === 'today' ? { ...t, isCompleted: true } : t))
    );

    // Rehydrate corresponding plants
    setPlants((prev) =>
      prev.map((p) => {
        const hasDueTodayTask = tasks.some(
          (t) => t.dueTime === 'today' && t.plantId === p.id && !t.isCompleted
        );
        if (hasDueTodayTask) {
          return {
            ...p,
            soilMoisture: 65,
            status: 'Hydrated',
            lastWateredDaysAgo: 0
          };
        }
        return p;
      })
    );

    showToast('All tasks for today logged. Sanctuary ecosystem restored to optimal baseline.');
  };

  // Snooze Routine
  const handleSnooze = () => {
    showToast('Routine snoozed for 24 hours. Automated sensors will continue background logging.');
  };

  // Quick Action: Water Plant
  const handleQuickWater = (plantId: string) => {
    const plant = plants.find((p) => p.id === plantId);
    setPlants((prev) =>
      prev.map((p) =>
        p.id === plantId
          ? {
              ...p,
              soilMoisture: Math.min(85, p.soilMoisture + 45),
              status: 'Hydrated',
              lastWateredDaysAgo: 0
            }
          : p
      )
    );

    // Check if task exists and mark it
    setTasks((prev) =>
      prev.map((t) => (t.plantId === plantId && t.taskType === 'water' ? { ...t, isCompleted: true } : t))
    );

    showToast(`Hydrated ${plant?.name || 'plant'} with 500ml filtered soak.`);
  };

  // Quick Action: Feed Plant
  const handleQuickFeed = (plantId: string) => {
    const plant = plants.find((p) => p.id === plantId);
    setPlants((prev) =>
      prev.map((p) =>
        p.id === plantId
          ? {
              ...p,
              status: 'Hydrated',
              lastFedDaysAgo: 0,
              fertilizerSchedule: 'Fed today (10-10-10)'
            }
          : p
      )
    );

    setTasks((prev) =>
      prev.map((t) => (t.plantId === plantId && t.taskType === 'fertilize' ? { ...t, isCompleted: true } : t))
    );

    showToast(`Applied bio-fertilizer formula to ${plant?.name || 'plant'}.`);
  };

  // Update Moisture Slider
  const handleUpdateMoisture = (plantId: string, newMoisture: number) => {
    setPlants((prev) =>
      prev.map((p) =>
        p.id === plantId
          ? {
              ...p,
              soilMoisture: newMoisture,
              status: newMoisture < 25 ? 'Needs Water' : 'Hydrated'
            }
          : p
      )
    );
  };

  // Add Specimen
  const handleAddPlant = (newPlant: PlantSpecimen) => {
    setPlants((prev) => [newPlant, ...prev]);
    showToast(`Added ${newPlant.name} to the ${newPlant.room} botanical roster.`);
  };

  // Delete Specimen
  const handleDeletePlant = (plantId: string) => {
    const p = plants.find((item) => item.id === plantId);
    setPlants((prev) => prev.filter((item) => item.id !== plantId));
    setTasks((prev) => prev.filter((t) => t.plantId !== plantId));
    showToast(`Removed ${p?.name || 'specimen'} from collection.`);
  };

  // Diagnostics Update
  const handleUpdatePlantStatus = (plantId: string, newStatus: any, note: string) => {
    setPlants((prev) =>
      prev.map((p) =>
        p.id === plantId
          ? {
              ...p,
              status: newStatus,
              notes: p.notes ? `${p.notes} • ${note}` : note
            }
          : p
      )
    );
    showToast(`Pathology remedy applied. Diagnostic entry appended to telemetry logs.`);
  };

  const attentionCount = plants.filter(
    (p) => p.status === 'Needs Water' || p.status === 'Feed Today' || p.status === 'Reposition Needed'
  ).length;

  return (
    <div className="bg-[#fcf9f3] text-[#1c1c18] min-h-screen flex flex-col selection:bg-[#d2e5ca] selection:text-[#566751]">
      {/* Sticky Header & Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedRoom={selectedRoom}
        onRoomChange={setSelectedRoom}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onToggleNotifications={() => setIsNotificationOpen(!isNotificationOpen)}
        notificationCount={3}
        specimenCount={plants.length}
        attentionCount={attentionCount}
      />

      {/* Main Content Area */}
      <main className="w-full pt-32 sm:pt-36 max-w-7xl mx-auto px-4 sm:px-8 md:px-10 py-6 flex-1">
        {currentTab === 'dashboard' && (
          <DashboardView
            plants={plants}
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onCompleteAllToday={handleCompleteAllToday}
            onSnooze={handleSnooze}
            onOpenExport={() => setIsExportModalOpen(true)}
            onSelectPlant={setSelectedPlant}
            selectedRoom={selectedRoom}
            searchQuery={searchQuery}
            onOpenRecipeGuide={() => setIsRecipeModalOpen(true)}
          />
        )}

        {currentTab === 'collection' && (
          <CollectionView
            plants={plants}
            onSelectPlant={setSelectedPlant}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onQuickWater={handleQuickWater}
            onQuickFeed={handleQuickFeed}
            selectedRoom={selectedRoom}
            searchQuery={searchQuery}
          />
        )}

        {currentTab === 'schedule' && (
          <ScheduleView
            tasks={tasks}
            plants={plants}
            onCompleteTask={handleCompleteTask}
            onOpenExport={() => setIsExportModalOpen(true)}
          />
        )}

        {currentTab === 'diagnostics' && (
          <DiagnosticsView
            plants={plants}
            onUpdatePlantStatus={handleUpdatePlantStatus}
          />
        )}

        {currentTab === 'guides' && <CareGuidesView />}
      </main>

      {/* Modals & Overlays */}
      <AddPlantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPlant={handleAddPlant}
        defaultRoom={selectedRoom}
      />

      <PlantDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onUpdateMoisture={handleUpdateMoisture}
        onWaterPlant={handleQuickWater}
        onFeedPlant={handleQuickFeed}
        onDeletePlant={handleDeletePlant}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        plants={plants}
        tasks={tasks}
      />

      <RecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#032517] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#c7ebd4]/20 animate-fade-in">
          <span className="material-symbols-outlined text-[#c7ebd4] text-xl">spa</span>
          <span className="text-xs font-medium leading-relaxed">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white text-xs ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#f6f3ed] mt-12 py-8 border-t border-[#c1c8c2]/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[#424843] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-medium text-[#032517]">VerdantCare</span>
            <span className="text-[#727973]">— Botanical Sanctuary &amp; Ambient Vitality Monitor</span>
          </div>
          <div>© 2024 VerdantCare Systems. All biological data preserved.</div>
        </div>
      </footer>
    </div>
  );
}
