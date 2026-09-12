import React from 'react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlertAction?: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const alerts = [
    {
      id: 'alert-1',
      title: 'Photometric Warning: Peace Lily',
      desc: 'Afternoon sun exposure exceeded 1,200 FC near west window. Leaf tip scorch risk elevated.',
      time: '12m ago',
      type: 'warning',
      icon: 'wb_sunny'
    },
    {
      id: 'alert-2',
      title: 'Pot Leaching Reminder',
      desc: 'Mineral crusts accumulating on raw terracotta saucers. Flush with distilled water during hydration.',
      time: '1h ago',
      type: 'info',
      icon: 'info'
    },
    {
      id: 'alert-3',
      title: 'Substrate Sensor Sync Complete',
      desc: 'All 8 wireless soil capacitive probes calibrated. Battery levels nominal at 92%.',
      time: '3h ago',
      type: 'success',
      icon: 'sensors'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1a241e]/40 backdrop-blur-2xs">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-[#c1c8c2]/30">
        <div className="p-5 border-b border-[#c1c8c2]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#032517] text-xl">notifications</span>
            <h3 className="font-serif text-lg text-[#032517] font-medium">Telemetry Notices</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#424843] flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          {alerts.map((a) => (
            <div
              key={a.id}
              className="p-3.5 rounded-xl bg-[#f6f3ed] border border-[#c1c8c2]/20 space-y-1 hover:bg-[#f0eee8] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold flex items-center gap-1.5 ${
                    a.type === 'warning'
                      ? 'text-[#611f06]'
                      : a.type === 'info'
                      ? 'text-[#032517]'
                      : 'text-[#52634d]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{a.icon}</span>
                  {a.title}
                </span>
                <span className="text-[10px] text-[#727973]">{a.time}</span>
              </div>
              <p className="text-xs text-[#424843] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#c1c8c2]/20 bg-[#fcf9f3] flex items-center justify-between">
          <span className="text-xs text-[#727973]">Sensors online: 8 / 8</span>
          <button
            onClick={onClose}
            className="h-8 px-3.5 bg-[#ebe8e2] hover:bg-[#dcdad4] text-[#1c1c18] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
};
