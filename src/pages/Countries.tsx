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
      <div className="sticky top-0 bg-[#09090b]/80 backdrop-blur-md pb-6 z-10 shrink-0">
        <h1 className="text-xl font-black mb-4 tracking-tighter uppercase text-white">Countries Explored</h1>
        <div className="relative group">
          <input
            type="text"
            placeholder="Search nations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-white/10 border border-white/20 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-400 text-white"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors text-lg">
            🗺️
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {filteredCountries.length === 0 ? (
          <p className="text-gray-400 text-center py-20 italic font-medium">No frontiers crossed yet...</p>
        ) : (
          filteredCountries.map((country) => (
            <div
              key={country.name}
              onClick={() => {
                dispatch(setSelectedEntry({ lat: country.lat, lng: country.lng }));
              }}
              className="group relative glass p-5 rounded-[2rem] border border-white/10 hover:border-green-500/40 hover:bg-white/15 transition-all duration-500 cursor-pointer overflow-hidden dreamy-shadow-hover"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 blur-2xl rounded-full group-hover:bg-green-500/20 transition-all duration-700" />

              <div className="flex justify-between items-center pr-6 relative">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="shrink-0 w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 font-black border border-green-500/20 group-hover:rotate-12 transition-transform duration-500">
                    {country.name.substring(0, 2).toUpperCase()}
                  </div>
                  <h2 className="text-lg font-black group-hover:text-green-300 transition-colors truncate tracking-tight text-white">
                    {country.name}
                  </h2>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-3xl font-black text-white/20 group-hover:text-green-500/30 transition-colors leading-none">
                    {String(country.count).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] text-gray-300 uppercase font-black tracking-[0.2em]">
                    Journals
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Remove all stories from ${country.name}?`)) {
                    entries
                      .filter((e) => e.country === country.name)
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

export default Countries;