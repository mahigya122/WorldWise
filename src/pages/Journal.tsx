import { useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { setSelectedEntry } from "../redux/selectedEntrySlice";

const Journal = () => {
  const entries = useAppSelector((state) => state.journal.entries);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "city">("date");

  const filteredAndSorted = useMemo(() => {
    let result = entries.filter(
      (e) =>
        e.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "date") {
      result.sort((a, b) => b.date.localeCompare(a.date));
    } else {
      result.sort((a, b) => a.city.localeCompare(b.city));
    }

    return result;
  }, [entries, searchTerm, sortBy]);

  return (
    <div className="text-white flex flex-col min-h-0 h-full">
      <div className="sticky top-0 bg-zinc-900 pb-4 z-10 space-y-3 shrink-0">
        <h1 className="text-lg font-bold">Your Travel Stories</h1>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 bg-zinc-800 border border-zinc-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "city")}
            className="bg-zinc-800 border border-zinc-700 rounded text-xs px-2 focus:outline-none"
          >
            <option value="date">Latest</option>
            <option value="city">City A-Z</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No stories found.</p>
            <p className="text-xs text-gray-600 mt-2 italic text-pretty px-4">
               "Click anywhere on the map to start your next adventure"
            </p>
          </div>
        ) : (
          filteredAndSorted.map((entry) => (
            <div
              key={entry.id}
              onClick={() => {
                 dispatch(setSelectedEntry({ lat: entry.lat, lng: entry.lng }));
                 navigate(`/dashboard/journals/${entry.id}`);
              }}
              className="group bg-zinc-800 p-0 rounded-xl overflow-hidden border border-zinc-700/50 hover:border-purple-500/50 transition-all cursor-pointer flex flex-col"
            >
              <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 group-hover:opacity-100 transition-opacity" />
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h2 className="font-bold text-sm group-hover:text-purple-400 transition-colors truncate flex-1">
                    {entry.city}, {entry.country}
                  </h2>
                  <span className="text-[10px] text-gray-500 font-mono ml-2 shrink-0">
                    {entry.date}
                  </span>
                </div>

                <h3 className="text-base font-medium truncate text-zinc-200">
                  {entry.title}
                </h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
