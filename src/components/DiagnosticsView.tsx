import React, { useState } from 'react';
import { DIAGNOSTIC_ISSUES } from '../data/initialData';
import { PlantSpecimen, DiagnosticIssue } from '../types';

interface DiagnosticsViewProps {
  plants: PlantSpecimen[];
  onUpdatePlantStatus: (plantId: string, newStatus: any, note: string) => void;
}

export const DiagnosticsView: React.FC<DiagnosticsViewProps> = ({
  plants,
  onUpdatePlantStatus
}) => {
  const [selectedPlantId, setSelectedPlantId] = useState<string>(plants[0]?.id || '');
  const [selectedIssueId, setSelectedIssueId] = useState<string>(DIAGNOSTIC_ISSUES[0].id);
  const [appliedRemedy, setAppliedRemedy] = useState<boolean>(false);

  const selectedPlant = plants.find((p) => p.id === selectedPlantId);
  const currentIssue = DIAGNOSTIC_ISSUES.find((i) => i.id === selectedIssueId) || DIAGNOSTIC_ISSUES[0];

  const handleApplyRemedy = () => {
    setAppliedRemedy(true);
    if (selectedPlant) {
      onUpdatePlantStatus(
        selectedPlant.id,
        'Hydrated',
        `Diagnostics treatment logged: ${currentIssue.title}`
      );
    }
    setTimeout(() => {
      setAppliedRemedy(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#c1c8c2]/30 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-semibold tracking-wider uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
          Botanical Pathology &amp; Clinic
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#032517] font-normal">
          Plant Diagnostics &amp; Telemetry Triage
        </h2>
        <p className="text-xs sm:text-sm text-[#424843] mt-1 max-w-2xl leading-relaxed">
          Analyze foliar abnormalities, substrate chemical imbalance, transpiration deficits, and ambient stress
          factors to apply targeted restorative protocols.
        </p>
      </div>

      {/* Main 2-Column Triage Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Specimen Selection & Observed Symptoms (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Specimen Picker */}
          <div className="bg-white p-6 rounded-2xl border border-[#c1c8c2]/30 shadow-xs space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#727973] block">
              1. Select Affected Specimen
            </label>
            <select
              value={selectedPlantId}
              onChange={(e) => setSelectedPlantId(e.target.value)}
              className="w-full h-11 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-xl text-sm font-medium text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
            >
              {plants.map((plant) => (
                <option key={plant.id} value={plant.id}>
                  {plant.name} ({plant.room} • {plant.soilMoisture}% moisture)
                </option>
              ))}
            </select>

            {selectedPlant && (
              <div className="flex items-center gap-3 p-3 bg-[#fcf9f3] rounded-xl border border-[#c1c8c2]/20 mt-2">
                <img
                  src={selectedPlant.image}
                  alt={selectedPlant.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="text-xs">
                  <div className="font-semibold text-[#1c1c18]">{selectedPlant.name}</div>
                  <div className="text-[#52634d] italic font-serif">{selectedPlant.scientificName}</div>
                  <div className="text-[#727973] mt-0.5">
                    Moisture: {selectedPlant.soilMoisture}% • {selectedPlant.lightCategory}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Observed Symptoms Selector */}
          <div className="bg-white p-6 rounded-2xl border border-[#c1c8c2]/30 shadow-xs space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#727973] block">
              2. Identify Visual Symptom
            </label>
            <div className="space-y-2">
              {DIAGNOSTIC_ISSUES.map((issue) => {
                const isSelected = selectedIssueId === issue.id;
                return (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'border-[#032517] bg-[#f6f3ed] shadow-2xs'
                        : 'border-[#c1c8c2]/30 bg-[#fcf9f3] hover:bg-[#f6f3ed]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1c1c18]">{issue.title}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                          issue.severity === 'critical'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : issue.severity === 'moderate'
                            ? 'bg-[#ffdbd0] text-[#400e00]'
                            : 'bg-[#d2e5ca] text-[#566751]'
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-xs text-[#424843] mt-1 line-clamp-2">{issue.symptom}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Expert Prescription & Protocol (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#c1c8c2]/30 shadow-xs flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">
                  Diagnostic Evaluation
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase ${
                    currentIssue.severity === 'critical'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : currentIssue.severity === 'moderate'
                      ? 'bg-[#ffdbd0] text-[#400e00]'
                      : 'bg-[#d2e5ca] text-[#566751]'
                  }`}
                >
                  Severity: {currentIssue.severity}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#032517] font-medium">{currentIssue.title}</h3>
              <p className="text-sm text-[#424843] mt-1 italic">{currentIssue.symptom}</p>
            </div>

            {/* Probable Causes */}
            <div className="space-y-2.5 p-4 rounded-xl bg-[#f6f3ed] border border-[#c1c8c2]/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#032517] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#611f06]">search_insights</span>
                Probable Root Causes
              </h4>
              <ul className="space-y-2">
                {currentIssue.probableCauses.map((cause, idx) => (
                  <li key={idx} className="text-xs text-[#424843] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#611f06] shrink-0 mt-1.5"></span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corrective Action Protocol */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#032517] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#52634d]">healing</span>
                Corrective Treatment Protocol
              </h4>
              <div className="space-y-2">
                {currentIssue.remedySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#fcf9f3] rounded-xl border border-[#c1c8c2]/20 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#032517] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-[#1c1c18] leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preventative Botanical Tip */}
            <div className="p-4 rounded-xl bg-[#d2e5ca]/40 border border-[#d2e5ca] flex items-start gap-3">
              <span className="material-symbols-outlined text-[#52634d] text-xl shrink-0 mt-0.5">
                lightbulb
              </span>
              <div>
                <span className="text-xs font-bold text-[#032517] block">Preventative Care Note</span>
                <p className="text-xs text-[#424843] mt-0.5 leading-relaxed">
                  {currentIssue.preventativeTip}
                </p>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 border-t border-[#c1c8c2]/20 flex items-center justify-between">
            <span className="text-xs text-[#727973]">
              Applying treatment will update specimen telemetry and log action.
            </span>
            <button
              onClick={handleApplyRemedy}
              className={`h-10 px-5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                appliedRemedy
                  ? 'bg-[#52634d] text-white'
                  : 'bg-[#032517] hover:bg-[#1b3b2b] text-white active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {appliedRemedy ? 'check_circle' : 'medical_services'}
              </span>
              {appliedRemedy ? 'Treatment Applied & Logged' : 'Apply Restorative Protocol'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
