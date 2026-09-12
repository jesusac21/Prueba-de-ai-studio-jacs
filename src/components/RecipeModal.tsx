import React from 'react';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a241e]/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-[#c1c8c2]/30 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#c1c8c2]/20 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Nutrient Protocol</div>
            <h3 className="font-serif text-2xl text-[#032517] font-medium">Bio-Nutrient Recipe Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#424843] flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Formula 1: N-P-K 3:1:2 */}
          <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#c1c8c2]/20 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#032517] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#52634d] text-lg">science</span>
                N-P-K 3:1:2 Growth Surge Solution
              </h4>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#c7ebd4] text-[#002113] font-semibold">
                High Nitrogen
              </span>
            </div>
            <p className="text-xs text-[#424843] leading-relaxed">
              Dilute 5ml (1 tsp) of organic liquid kelp/fish emulsion per 1 liter of distilled or rested tap water.
              Apply every second watering cycle during foliar expansion months (March through August).
            </p>
          </div>

          {/* Formula 2: Compost Tea */}
          <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#c1c8c2]/20 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#032517] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#52634d] text-lg">compost</span>
                Aerated Worm Casting Compost Tea
              </h4>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#d2e5ca] text-[#566751] font-semibold">
                Active Microbes
              </span>
            </div>
            <p className="text-xs text-[#424843] leading-relaxed">
              Steep 1 cup of pure vermicompost in 4 liters of dechlorinated water with 1 tbsp unsulfured blackstrap
              molasses for 24 hours with an aquarium air stone. Drench soil immediately to innoculate beneficial rhizosphere mycorrhizae.
            </p>
          </div>

          {/* Formula 3: Substrate pH */}
          <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#c1c8c2]/20 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#032517] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#52634d] text-lg">water_ph</span>
                Substrate pH Calibration (6.2 – 6.8)
              </h4>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#ebe8e2] text-[#424843] font-semibold">
                Optimal Uptake
              </span>
            </div>
            <p className="text-xs text-[#424843] leading-relaxed">
              Calathea and tropical Aroids absorb micro-nutrients (iron, manganese, zinc) best within slightly acidic substrate.
              If runoff pH tests above 7.0, add 2 drops of raw apple cider vinegar per liter of irrigation water to gently acidify.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-[#c1c8c2]/20 flex justify-end bg-[#fcf9f3]">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-xl bg-[#032517] hover:bg-[#1b3b2b] text-white text-xs font-semibold cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
