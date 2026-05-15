import { useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { deleteEntry } from "../redux/entriesSlice";
import { setSelectedEntry } from "../redux/selectedEntrySlice";

interface CityStat {
  id: string;
  city: string;
  country: string;
  count: number;
  lat: number;
  lng: number;
}

const Cities = () => {
  const entries = useAppSelector((state) => state.journal.entries);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const cityStats = useMemo(() => {
    const statsMap = new Map<string, CityStat>();

    entries.forEach((entry) => {
      if (!statsMap.has(entry.city)) {
        statsMap.set(entry.city, {
          id: entry.id,
          city: entry.city,
          country: entry.country,
          count: 1,
          lat: entry.lat,
          lng: entry.lng,
        });
      } else {
        const existing = statsMap.get(entry.city)!;
        existing.count += 1;
      }
    });

    return Array.from(statsMap.values());
  }, [entries]);

  const filteredCities = useMemo(() => {
    return cityStats.filter((c) =>
      c.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cityStats, searchTerm]);

  return (
    <div className="text-white flex flex-col min-h-0 h-full">
      <div className="sticky top-0 bg-[#09090b]/80 backdrop-blur-md pb-6 z-10 shrink-0">
        <h1 className="text-xl font-black mb-4 tracking-tighter uppercase text-white">Visited Cities</h1>
        <div className="relative group">
          <input
            type="text"
            placeholder="Search your travels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-white/10 border border-white/20 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-white"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors text-lg">
            🔍
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {filteredCities.length === 0 ? (
          <p className="text-gray-400 text-center py-20 italic font-medium">No footprints found here yet...</p>
        ) : (
          filteredCities.map((city) => (
            <div
              key={city.city}
              onClick={() => {
                dispatch(setSelectedEntry({ lat: city.lat, lng: city.lng }));
              }}
              className="group relative glass p-5 rounded-[2rem] border border-white/10 hover:border-blue-500/40 hover:bg-white/15 transition-all duration-500 cursor-pointer overflow-hidden dreamy-shadow-hover"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
              
              <div className="flex justify-between items-start pr-6 relative">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-black group-hover:text-blue-300 transition-colors truncate tracking-tight text-white">
                    {city.city}
                  </h2>
                  <p className="text-[10px] text-gray-300 uppercase font-black tracking-[0.2em] mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    {city.country}
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-end">
                  <span className="text-2xl font-black text-white/20 group-hover:text-blue-400 transition-colors leading-none">
                    {String(city.count).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] text-gray-300 uppercase font-black tracking-widest">
                    Stories
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Erase all memories of ${city.city}?`)) {
                    entries
                      .filter((e) => e.city === city.city)
                      .forEach((e) => dispatch(deleteEntry(e.id)));
                  }
                }}
                className="absolute top-4 right-4 bg-white/5 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:text-red-400 hover:bg-white/10"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cities;