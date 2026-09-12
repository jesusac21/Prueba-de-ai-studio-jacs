import React from 'react';
import { RoomType } from '../types';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  selectedRoom: RoomType;
  onRoomChange: (room: RoomType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddModal: () => void;
  onToggleNotifications: () => void;
  notificationCount: number;
  specimenCount: number;
  attentionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  selectedRoom,
  onRoomChange,
  searchQuery,
  onSearchChange,
  onOpenAddModal,
  onToggleNotifications,
  notificationCount,
  specimenCount,
  attentionCount
}) => {
  const rooms: RoomType[] = ['All Rooms', 'Living Room', 'Sunroom', 'Bedroom', 'Home Office'];

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'collection', label: 'My Collection' },
    { id: 'schedule', label: 'Schedule & Calendar' },
    { id: 'diagnostics', label: 'Plant Diagnostics' },
    { id: 'guides', label: 'Care Guides' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#fcf9f3]/95 backdrop-blur-xl border-b border-[#1b3b2b]/5 shadow-[0_1px_8px_rgba(19,36,27,0.04)]">
      {/* Top Primary Bar */}
      <div className="h-20 w-full px-4 sm:px-8 md:px-10 flex items-center justify-between gap-4 md:gap-6">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-6 lg:gap-10 shrink-0">
          <button
            onClick={() => onTabChange('dashboard')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <img
              alt="VerdantCare Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VV80woDFerVxQz7dGsaoAQzrpV5s6KH8EUVxPvtutpx4cVZUVU6MN7dxuQVweGgIgOGLqNR8554RYHayTeYqsg8joFXcRHdng-PjY2D5u3KJkWIEsrDiDxczezo6De6yJS6rFh4PYJJ8NRlMCCnhQIYvW7fzT70aVBbm2BKX3UmJOgl681Je1t07eoKFPjJAc-b6aFZScECEdcDaW2Lk_JVPUAubZHCi5i0FFkDLx279gFLUzfZIarVNM"
            />
            <span className="font-serif text-2xl md:text-[26px] font-medium text-[#032517] tracking-tight">
              VerdantCare
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onTabChange(link.id)}
                  className={`transition-colors py-2 relative cursor-pointer ${
                    isActive
                      ? 'text-[#032517] font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#032517] after:rounded-full'
                      : 'text-[#424843] hover:text-[#1c1c18]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#727973] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plants, rooms, species..."
              className="w-full h-10 pl-10 pr-4 bg-[#f6f3ed] rounded-lg text-sm text-[#1c1c18] placeholder:text-[#424843]/60 focus:outline-none focus:ring-2 focus:ring-[#032517] focus:bg-[#ffffff] transition-all border border-transparent focus:border-[#032517]/20"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727973] hover:text-[#1c1c18] text-xs font-semibold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Actions: Add Plant, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 h-10 px-3.5 sm:px-4 bg-[#1b3b2b] hover:bg-[#032517] text-white rounded-lg text-sm font-semibold shadow-[0_2px_8px_-2px_rgba(19,36,27,0.15)] transition-all cursor-pointer active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-lg leading-none">add</span>
            <span className="hidden sm:inline">Add Plant</span>
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={onToggleNotifications}
              aria-label="Notifications"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#424843] hover:text-[#1c1c18] hover:bg-[#ebe8e2] transition-colors relative cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              {notificationCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#611f06] ring-2 ring-[#fcf9f3]"></span>
              )}
            </button>
          </div>

          <div className="h-6 w-px bg-[#c1c8c2]/50 hidden sm:block"></div>

          {/* Botanist Profile */}
          <div className="flex items-center gap-2.5 pl-1">
            <img
              alt="Elena Vance Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c1c8c2]/70"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKiyK3pDv90cOWHU9X0oK2kWHI1RG8NVRfG4_-qMiUhh9Ym_JCeZyQN2Pl7HnRI_s498u07qCr_ZoLmGbg_TauZ42DS63H3Ct7I_jnerOnkmam71QP7g1qTDavPv1UDw2ShdqCyj0vK_nxhnJatjhuq3HmLNryP3MVeaDyzEBR9NcMYKkfS5lO4-lwsOBRU4aslKBg-CJOXwsu1t5fbJcMCQKs5u5jUEHlrerw8erbhU4zFXITQLar"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-[#1c1c18] leading-tight">Elena Vance</span>
              <span className="text-xs text-[#424843] leading-tight">Botanist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Strip (when screen < xl) */}
      <div className="xl:hidden flex items-center gap-3 px-4 sm:px-8 py-2 border-t border-[#1b3b2b]/5 overflow-x-auto">
        {navLinks.map((link) => {
          const isActive = currentTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onTabChange(link.id)}
              className={`px-3 py-1 text-xs whitespace-nowrap rounded-full transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#1b3b2b] text-white font-medium'
                  : 'bg-[#f6f3ed] text-[#424843] hover:text-[#1c1c18]'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>

      {/* Sub-Bar: Room Filters & Botanical Sensors Status */}
      <div className="w-full bg-[#f6f3ed]/80 backdrop-blur-md px-4 sm:px-8 md:px-10 py-2.5 flex items-center justify-between gap-4 border-t border-[#1b3b2b]/5">
        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#727973] px-1 mr-1 hidden sm:inline-block">
            Room
          </span>
          {rooms.map((room) => {
            const isSelected = selectedRoom === room;
            return (
              <button
                key={room}
                onClick={() => onRoomChange(room)}
                className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#ffffff] text-[#032517] font-semibold shadow-[0_1px_4px_rgba(19,36,27,0.08)]'
                    : 'text-[#424843] hover:text-[#1c1c18] hover:bg-[#ebe8e2]'
                }`}
              >
                {room}
              </button>
            );
          })}
        </nav>

        {/* Live Botanical Pulse Indicators */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-[#424843]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1b3b2b]"></span>
            <span className="text-[#1c1c18] font-semibold">{specimenCount}</span> Specimens
          </div>
          <div className="w-px h-3.5 bg-[#c1c8c2]/50"></div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#611f06]"></span>
            <span className="text-[#611f06] font-semibold">{attentionCount}</span> Need Attention
          </div>
          <div className="w-px h-3.5 bg-[#c1c8c2]/50"></div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#52634d]">water_drop</span>
            <span>Hydration Optimal</span>
          </div>
        </div>
      </div>
    </header>
  );
};
