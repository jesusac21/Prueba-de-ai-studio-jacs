import React, { useState } from 'react';
import { PlantSpecimen, RoomType } from '../types';

interface AddPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlant: (newPlant: PlantSpecimen) => void;
  defaultRoom?: RoomType;
}

export const AddPlantModal: React.FC<AddPlantModalProps> = ({
  isOpen,
  onClose,
  onAddPlant,
  defaultRoom = 'Living Room'
}) => {
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [room, setRoom] = useState<'Living Room' | 'Sunroom' | 'Bedroom' | 'Home Office' | 'Kitchen Sill'>(
    defaultRoom === 'All Rooms' ? 'Living Room' : defaultRoom
  );
  const [imageUrl, setImageUrl] = useState('');
  const [lightCategory, setLightCategory] = useState('Bright Indirect');
  const [lightDots, setLightDots] = useState<number>(4);
  const [wateringDays, setWateringDays] = useState<number>(7);
  const [fertilizerDays, setFertilizerDays] = useState<number>(21);
  const [soilMoisture, setSoilMoisture] = useState<number>(45);
  const [targetHumidity, setTargetHumidity] = useState('50-60% RH');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const presetImages = [
    {
      label: 'Monstera',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChXABzaI8Wz-OlrPUuVfRziB8_3dY0X1ZAC8R0lq5uf2rKXdx6-l0HBlaFVCng6G9P8g31w4BOxJkfWGxtZ4jHYtq2cBMHssOpByiv6pf2aUvKq6pdocE8pKJuIoBenGJKOWXSBC3XS_44AJffysh2FAffoyVeJYay_xlJfjprBkwCAcQs46Y_vbP-v0pLPVlB3JgfCx3hDUgQuRi_XnJu-bfnDYKlJcOX8glLQgiazQ2_CNdBBTm2'
    },
    {
      label: 'Fiddle Leaf',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxb0sO0gLfirEHnTkMxTRgln2PcwIQUlMkd2SamkoqaFqQCNtECalza0O9nAezVGiDploSsFNxHHs0Xk8gjhxpknf367zX-2kRogXsFTnuExUeT6YcwEmLRg8HjsET0cogodVYLSeUJa1jOvqbGczowtv9Yiecl_Vf7VO3prrN_ErCbfCcfmKPo7QH3jkjzo-8J13o4dl9dGhfXvLHQ-v4uEtvK4XSHEKm-KXJ0RkkmeJC10CIhRCf'
    },
    {
      label: 'Calathea',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgWisa4uz4pQrq7T6rqmNtd9XiL0jdqBkq9mGwZbRNKAnqrvBEjRTuh4x6G_Z4CQcsAD0zLRxO6IeQXCmZ67ENITmGGOCZ3Et_XcOWkxrIY3vfnjnHDM3Il1PEYKJFxg3qQfRKWBOrlcN5Obm4vGNvBsKn_NTpKFGf8kGXUqNGFaZmWHSIj7-oX1lwiiP-3KCKnkQDy6f-rvSden6Va3CD1KBaJsOEiciuEWmcATOjYYT1r_E669fr'
    },
    {
      label: 'ZZ Plant',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEv2D-_6bJ1OPTT4d7S3Heuja3HUForIgidaZ-CXgXJhAl60lYz_9AxsIxFDu0gEQXfOfHBoV4gleqsKMgKz0LJuUDPvZzhvAiUvhz9j5P8BiQcNMSRIW5KC2VPnvPIOk218MUBEeiNtuI3MV1sqRo3rLF8_hrZoIQ47uLhQur6WPPDrKco1WzOgI39ru9qRsOGQ24LiLY8VLFHJJBITCQ49kJ6WWXwaJR3kt_MJm0TQ32QnbtGSJv'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlant: PlantSpecimen = {
      id: `plant-${Date.now()}`,
      name: name.trim(),
      scientificName: scientificName.trim() || name.trim(),
      room,
      image: imageUrl.trim() || presetImages[0].url,
      status: soilMoisture < 25 ? 'Needs Water' : 'Hydrated',
      lightCategory,
      lightDots,
      lightDescription: `${lightDots >= 4 ? '4-6 hrs/day • High Light' : 'Low to Medium ambient exposure'}`,
      wateringSchedule: `Every ${wateringDays} days`,
      wateringIntervalDays: wateringDays,
      lastWateredDaysAgo: 1,
      fertilizerSchedule: `Every ${fertilizerDays} days`,
      fertilizerIntervalDays: fertilizerDays,
      lastFedDaysAgo: 1,
      soilMoisture,
      optimalMoistureRange: [30, 60],
      targetHumidity,
      potType: 'Porcelain Planter',
      notes: notes.trim()
    };

    onAddPlant(newPlant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a241e]/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-[#c1c8c2]/30 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#c1c8c2]/20 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#727973]">Sanctuary Registry</div>
            <h3 className="font-serif text-2xl text-[#032517] font-medium">Add New Specimen</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#424843] flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#1c1c18] block mb-1">Plant Common Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Bird of Paradise, Rubber Tree"
              className="w-full h-10 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-sm text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1c1c18] block mb-1">
              Scientific Binomial Name (Italicized)
            </label>
            <input
              type="text"
              value={scientificName}
              onChange={(e) => setScientificName(e.target.value)}
              placeholder="e.g. Strelitzia nicolai"
              className="w-full h-10 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-sm text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#1c1c18] block mb-1">Room Placement</label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value as any)}
                className="w-full h-10 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-xs text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
              >
                <option value="Living Room">Living Room</option>
                <option value="Sunroom">Sunroom</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Home Office">Home Office</option>
                <option value="Kitchen Sill">Kitchen Sill</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1c1c18] block mb-1">Light Exposure</label>
              <select
                value={lightCategory}
                onChange={(e) => setLightCategory(e.target.value)}
                className="w-full h-10 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-xs text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
              >
                <option value="Low Indirect">Low Indirect (1-2 Dots)</option>
                <option value="Bright Indirect">Bright Indirect (3-4 Dots)</option>
                <option value="Direct & Filtered">Direct &amp; Filtered (5 Dots)</option>
                <option value="Direct Morning">Direct Morning (4 Dots)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1c1c18] block mb-1">
              Image URL (Direct link or choose preset)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full h-10 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-xs text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] text-[#727973]">Presets:</span>
              {presetImages.map((p) => (
                <button
                  type="button"
                  key={p.label}
                  onClick={() => setImageUrl(p.url)}
                  className="text-[11px] px-2 py-0.5 rounded bg-[#ebe8e2] hover:bg-[#dcdad4] text-[#032517] cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#1c1c18] block mb-1">Watering (Days)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={wateringDays}
                onChange={(e) => setWateringDays(Number(e.target.value))}
                className="w-full h-10 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-xs text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1c1c18] block mb-1">Feed (Days)</label>
              <input
                type="number"
                min="7"
                max="180"
                value={fertilizerDays}
                onChange={(e) => setFertilizerDays(Number(e.target.value))}
                className="w-full h-10 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-xs text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1c1c18] block mb-1">Initial Moisture %</label>
              <input
                type="number"
                min="5"
                max="100"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(Number(e.target.value))}
                className="w-full h-10 px-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-xs text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1c1c18] block mb-1">Botanist Notes &amp; Care Details</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Sensitive to hard tap water, benefits from periodic leaf misting."
              className="w-full p-3 bg-[#f6f3ed] border border-[#c1c8c2]/40 rounded-lg text-xs text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#032517]"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#c1c8c2]/20">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl text-xs font-semibold text-[#424843] hover:bg-[#f6f3ed] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-5 rounded-xl bg-[#032517] hover:bg-[#1b3b2b] text-white text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              Add to Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
