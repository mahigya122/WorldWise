import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import { addEntry } from "../redux/entriesSlice";

import { analyzeJournal } from "../utils/ai";

const JournalForm = () => {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const lat = params.get("lat");
  const lng = params.get("lng");

  const cityData = useAppSelector(
    (state) => state.city
  );
   
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [highlightText, setHighlightText] = useState("");
  const [feeling, setFeeling] = useState("");

  const handleSave = async () => {
    // 1. Call AI
      const aiResponse = await analyzeJournal(story);
       console.log("AI RAW:", aiResponse);

       // 2. Extract Mood + Summary from text
  const moodMatch = aiResponse.match(/Mood:\s*(.*)/);
  const summaryMatch = aiResponse.match(/Summary:\s*(.*)/);

  const mood = moodMatch?.[1] || "Unknown";
  const summary = summaryMatch?.[1] || "No summary";

  console.log("Mood:", mood);
  console.log("Summary:", summary);

    
    dispatch(
      addEntry({
        id: crypto.randomUUID(),
        city: cityData.city,
        country: cityData.country,
        lat: lat ? parseFloat(lat) : 0,
        lng: lng ? parseFloat(lng) : 0,
        date: new Date().toLocaleDateString(),

        title,
        story,

        highlights: highlightText
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),

        feeling,

         mood,
         summary,

      })
    );
      
    navigate("/dashboard/journals");   
  };

  return (
    <div className="p-8 glass-dark text-white rounded-[2.5rem] shadow-2xl border border-white/10 max-w-md relative overflow-hidden">
      {/* Background Aurora Effect */}
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-500/10 blur-[100px] rounded-full" />
      
      <div className="relative">
        <h2 className="text-3xl font-black mb-6 tracking-tighter uppercase aurora-text"> 
          New Chapter
        </h2>

        <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl mb-8 border border-white/5 space-y-3">   
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{cityData.city || "Searching..."}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Country</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">{cityData.country || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-white/5">
             <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
               {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
             </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">
              Title of your adventure
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summer in Kathmandu..."
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 text-white"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">
              Your Story
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Describe the moments..."
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 text-white h-32 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-pink-400 transition-colors">
                Highlights
              </label>
              <input
                value={highlightText}
                onChange={(e) => setHighlightText(e.target.value)}
                placeholder="Food, Views..."
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-all placeholder:text-gray-600 text-white"
              />
            </div>
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-yellow-400 transition-colors">
                Feeling
              </label>
              <input
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="Inspired..."
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder:text-gray-600 text-white"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-500/20"
          >
            Preserve Memory
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalForm;