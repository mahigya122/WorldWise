import { useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { setSelectedEntry } from "../redux/selectedEntrySlice";
import { deleteEntry } from "../redux/entriesSlice";

interface CountryStat {
  name: string;
  count: number;
  lat: number;
  lng: number;
}

const Countries = () => {
  const entries = useAppSelector((state) => state.journal.entries);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const countryStats = useMemo(() => {
    const statsMap = new Map<string, CountryStat>();

    entries.forEach((entry) => {
      if (!statsMap.has(entry.country)) {
        statsMap.set(entry.country, {
          name: entry.country,
          count: 1,
          lat: entry.lat,
          lng: entry.lng,
        });
      } else {
        const existing = statsMap.get(entry.country)!;
        existing.count += 1;
      }
    });

    return Array.from(statsMap.values());
  }, [entries]);

  const filteredCountries = useMemo(() => {
    return countryStats.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countryStats, searchTerm]);

  return (
    <div className="text-white flex flex-col min-h-0 h-full">
      <div className="sticky top-0 bg-zinc-900 pb-4 z-10 shrink-0">
        <h1 className="text-lg font-bold mb-3">Countries Explored</h1>
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {filteredCountries.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No countries found.</p>
        ) : (
          filteredCountries.map((country) => (
            <div
              key={country.name}
              onClick={() => {
                dispatch(setSelectedEntry({ lat: country.lat, lng: country.lng }));
              }}
              className="group relative bg-zinc-800 p-4 rounded-xl border border-zinc-700 hover:border-green-500/50 hover:bg-zinc-700/50 transition-all cursor-pointer overflow-hidden"
            >
              <div className="flex justify-between items-center pr-6">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 font-bold border border-green-500/20">
                    {country.name.substring(0, 2).toUpperCase()}
                  </div>
                  <h2 className="text-base font-bold group-hover:text-green-400 transition-colors truncate">
                    {country.name}
                  </h2>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-lg font-black text-green-500/50 group-hover:text-green-500 transition-colors">
                    {String(country.count).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                    Journals
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete all entries for ${country.name}?`)) {
                    entries
                      .filter((e) => e.country === country.name)
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

export default Countries;