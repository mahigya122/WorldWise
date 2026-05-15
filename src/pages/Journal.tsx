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
    const result = entries.filter(
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
      <div className="sticky top-0 bg-[#09090b]/80 backdrop-blur-md pb-6 z-10 space-y-4 shrink-0">
        <h1 className="text-xl font-black tracking-tighter uppercase text-white">Your Stories</h1>
        
        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <input
              type="text"
              placeholder="Filter memories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 bg-white/10 border border-white/20 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-400 text-white"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors text-lg">
              ✨
            </span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "city")}
            className="bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest px-3 focus:outline-none hover:bg-white/20 transition-colors text-white"
          >
            <option value="date" className="bg-zinc-900">Latest</option>
            <option value="city" className="bg-zinc-900">A-Z</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-6">
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 italic font-medium">No chapters written yet...</p>
            <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-[0.3em] font-black">
               Drop a pin to start
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
              className="group relative glass p-0 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-purple-500/40 hover:bg-white/15 transition-all duration-700 cursor-pointer flex flex-col dreamy-shadow-hover"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="p-6 relative">
                 {/* Decorative Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700" />

                <div className="flex justify-between items-start mb-4 relative">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-black text-sm group-hover:text-purple-300 transition-colors truncate tracking-tight uppercase text-white/80 group-hover:text-white">
                      {entry.city}
                    </h2>
                    <p className="text-[9px] text-gray-400 font-black tracking-[0.3em] uppercase mt-1">
                      {entry.country}
                    </p>
                  </div>
                  <span className="text-[9px] text-gray-400 font-black tracking-widest uppercase ml-4 border border-white/10 px-2 py-1 rounded-full">
                    {entry.date}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-white transition-colors tracking-tighter leading-tight mb-2 truncate">
                  {entry.title}
                </h3>
                
                <div className="flex items-center gap-2 mt-4">
                   <div className="h-[1px] flex-1 bg-white/10" />
                   <span className="text-[8px] text-gray-400 font-black uppercase tracking-[0.4em]">Read Story</span>
                   <div className="h-[1px] w-4 bg-white/10 group-hover:w-12 transition-all duration-700" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
