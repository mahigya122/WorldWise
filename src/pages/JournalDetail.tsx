import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { setSelectedEntry } from "../redux/selectedEntrySlice";
import { deleteEntry } from "../redux/entriesSlice";

const JournalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const entry = useAppSelector((state) =>
    state.journal.entries.find((e) => String(e.id) === id)
  );

  useEffect(() => {
    if (entry) {
      dispatch(setSelectedEntry({ lat: entry.lat, lng: entry.lng }));
    }
  }, [entry, dispatch]);

  if (!entry) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-4xl mb-4">🏜️</div>
        <h2 className="text-xl font-black uppercase tracking-tighter text-white">Story Lost</h2>
        <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">This chapter doesn't exist anymore</p>
        <button
          onClick={() => navigate("/dashboard/journals")}
          className="mt-8 px-6 py-2 glass rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all"
        >
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col min-h-0 h-full relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full -z-10" />

      <div className="sticky top-0 bg-[#09090b]/80 backdrop-blur-md pb-6 z-10 flex justify-between items-center shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </button>
        <button
          onClick={() => {
            if (confirm("Erase this memory forever?")) {
              dispatch(deleteEntry(entry.id));
              navigate("/dashboard/journals");
            }
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-500 hover:bg-red-500/20 hover:text-red-400 transition-all border border-white/5 hover:border-red-500/30"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8 pb-10">
        <header className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-[2px] w-4 md:w-6 bg-purple-500/50" />
             <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-purple-400">
               {entry.date}
             </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">
            {entry.city}
          </h1>
          <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">
            {entry.country}
          </p>
        </header>

        <section className="space-y-6 md:space-y-8">
          <div className="glass-dark p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30" />
            
            <h2 className="text-lg md:text-2xl lg:text-3xl font-black tracking-tighter uppercase mb-6 md:mb-8 aurora-text">
              {entry.title}
            </h2>
            
            <p className="text-sm md:text-base text-gray-200 md:text-gray-300 leading-relaxed md:leading-relaxed font-medium whitespace-pre-wrap break-words">
              {entry.story}
            </p>

            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/5 flex flex-wrap gap-2 md:gap-3">
              {entry.highlights?.map((h, i) => (
                <span key={i} className="px-3 md:px-4 py-1 md:py-1.5 bg-white/5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-gray-400 border border-white/5 group-hover:border-white/10 transition-colors hover:bg-white/10">
                  ✨ {h}
                </span>
              ))}
              <span className="px-3 md:px-4 py-1 md:py-1.5 bg-yellow-500/10 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-yellow-500/70 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors">
                💭 {entry.feeling}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
             <div className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-3">😊 Vibe Check</p>
                <p className="text-lg md:text-2xl font-black text-white">{entry.mood}</p>
             </div>
             <div className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-3">📝 Summary</p>
                <p className="text-[9px] md:text-sm font-medium text-gray-300 leading-tight md:leading-relaxed tracking-wide uppercase">{entry.summary}</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JournalDetail;