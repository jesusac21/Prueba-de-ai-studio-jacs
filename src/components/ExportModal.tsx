import React, { useState } from 'react';
import { PlantSpecimen, CareTask } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: PlantSpecimen[];
  tasks: CareTask[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  plants,
  tasks
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate CSV data
  const csvRows = [
    ['Specimen Name', 'Scientific Name', 'Room', 'Status', 'Soil Moisture (%)', 'Light Category', 'Watering Cycle (Days)', 'Last Watered (Days Ago)'],
    ...plants.map((p) => [
      `"${p.name}"`,
      `"${p.scientificName}"`,
      `"${p.room}"`,
      `"${p.status}"`,
      p.soilMoisture,
      `"${p.lightCategory}"`,
      p.wateringIntervalDays,
      p.lastWateredDaysAgo
    ])
  ];

  const csvString = csvRows.map((row) => row.join(',')).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(csvString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `verdantcare-biological-log-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a241e]/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-[#c1c8c2]/30 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#c1c8c2]/20 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Telemetry Export</div>
            <h3 className="font-serif text-2xl text-[#032517] font-medium">Biological Sanctuary Log</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#424843] flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          <p className="text-xs text-[#424843] leading-relaxed">
            Download your active specimen database, calibrated soil sensor percentages, and photoperiod metrics
            formatted for agricultural analysis or horticultural research spreadsheets.
          </p>

          <div className="p-3 bg-[#f6f3ed] rounded-xl border border-[#c1c8c2]/30 font-mono text-[11px] text-[#1c1c18] max-h-48 overflow-x-auto overflow-y-auto whitespace-pre">
            {csvString}
          </div>

          <div className="text-xs text-[#727973] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#52634d]">check_circle</span>
            <span>Total {plants.length} active botanical specimens indexed.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-[#c1c8c2]/20 flex items-center justify-end gap-3 bg-[#fcf9f3]">
          <button
            onClick={handleCopy}
            className="h-10 px-4 rounded-xl border border-[#c1c8c2]/40 bg-white hover:bg-[#f6f3ed] text-xs font-semibold text-[#1c1c18] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">
              {copied ? 'done' : 'content_copy'}
            </span>
            {copied ? 'Copied!' : 'Copy CSV'}
          </button>
          <button
            onClick={handleDownload}
            className="h-10 px-5 rounded-xl bg-[#032517] hover:bg-[#1b3b2b] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Download CSV Log
          </button>
        </div>
      </div>
    </div>
  );
};
