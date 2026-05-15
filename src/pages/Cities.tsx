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
      <div className="sticky top-0 bg-zinc-900 pb-4 z-10 shrink-0">
        <h1 className="text-lg font-bold mb-3">Visited Cities</h1>
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {filteredCities.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No cities found.</p>
        ) : (
          filteredCities.map((city) => (
            <div
              key={city.city}
              onClick={() => {
                dispatch(setSelectedEntry({ lat: city.lat, lng: city.lng }));
              }}
              className="group relative bg-zinc-800 p-4 rounded-xl border border-zinc-700 hover:border-blue-500/50 hover:bg-zinc-700/50 transition-all cursor-pointer overflow-hidden"
            >
              <div className="flex justify-between items-start pr-6">
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold group-hover:text-blue-400 transition-colors truncate">
                    {city.city}
                  </h2>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 truncate">
                    {city.country}
                  </p>
                </div>
                <span className="shrink-0 bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-500/20 ml-2">
                  {city.count} {city.count === 1 ? "ENTRY" : "ENTRIES"}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete all entries for ${city.city}?`)) {
                    entries
                      .filter((e) => e.city === city.city)
                      .forEach((e) => dispatch(deleteEntry(e.id)));
                  }
                }}
                className="absolute top-2 right-2 bg-zinc-900/80 text-gray-400 w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:text-red-400 hover:bg-zinc-900 shadow-sm"
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