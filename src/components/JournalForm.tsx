import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import { addEntry } from "../redux/entriesSlice";
import { setCity } from "../redux/citySlice";

import { analyzeJournal } from "../utils/ai";

const JournalForm = () => {

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const lat = params.get("lat");
  const lng = params.get("lng");

  const cityData = useAppSelector(
    (state) => state.city
  );
   
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [highlightText, setHighlightText] = useState("");
  const [feeling, setFeeling] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLocating, setIsLocating] = useState(!cityData.city && !!lat && !!lng);

  useEffect(() => {
    async function fetchLocation() {
      if (!lat || !lng || cityData.city) return;
      
      setIsLocating(true);
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        dispatch(setCity({
          city: data.city || data.town || data.village || "Unknown",
          country: data.countryName || "Unknown",
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }));
      } catch (err) {
        console.error("Location fetch failed:", err);
      } finally {
        setIsLocating(false);
      }
    }
    fetchLocation();
  }, [lat, lng, cityData.city, dispatch]);

  const handleSave = async () => {
    if (!story) return alert("Please share your story first!");
    
    setIsAnalyzing(true);
    try {
      // 1. Call AI
      const aiResponse = await analyzeJournal(story);
      
      // 2. Extract Mood + Summary from text
      const moodMatch = aiResponse.match(/Mood:\s*(.*)/);
      const summaryMatch = aiResponse.match(/Summary:\s*(.*)/);

      const mood = moodMatch?.[1]?.trim() || "Unknown";
      const summary = summaryMatch?.[1]?.trim() || "No summary";

      dispatch(
        addEntry({
          id: crypto.randomUUID(),
          city: cityData.city || "Unknown",
          country: cityData.country || "Unknown",
          lat: lat ? parseFloat(lat) : 0,
          lng: lng ? parseFloat(lng) : 0,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),

          title: title || `Trip to ${cityData.city}`,
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
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-8 glass-dark text-white rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-white/10 max-w-3xl mx-auto relative overflow-auto">
      {/* Background Aurora Effect */}
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-500/10 blur-[100px] rounded-full" />
      
      <div className="relative space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase aurora-text"> 
          ✍️ New Chapter
        </h2>

        <div className="bg-white/5 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/5 space-y-4">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300 pb-3 border-b border-white/10">📍 Journey Details</h3>   
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex justify-between sm:flex-col gap-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400">Location</span>
              <span className={`text-xs sm:text-sm font-bold tracking-wider ${isLocating ? "animate-pulse text-blue-300" : "text-blue-400"}`}>
                {isLocating ? "📡 Locating..." : (cityData.city || "🔍 Searching...")}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col gap-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400">Country</span>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-purple-400">{cityData.country || "N/A"}</span>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                📅 {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 group-focus-within:text-blue-400 transition-colors">
              ✏️ Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Summer in Kathmandu..."
              className="w-full p-3 sm:p-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-500 text-white font-medium"
            />
          </div>

          <div className="group">
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 group-focus-within:text-purple-400 transition-colors">
              📖 Your Story
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Share the moments that made this journey unforgettable..."
              className="w-full p-3 sm:p-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-gray-500 text-white font-medium h-40 sm:h-48 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="group">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 group-focus-within:text-pink-400 transition-colors">
                ⭐ Highlights
              </label>
              <input
                value={highlightText}
                onChange={(e) => setHighlightText(e.target.value)}
                placeholder="e.g., Food, Views, People..."
                className="w-full p-3 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all placeholder:text-gray-500 text-white font-medium"
              />
            </div>
            <div className="group">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 group-focus-within:text-yellow-400 transition-colors">
                💭 Feeling
              </label>
              <input
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="e.g., Inspired, Peaceful..."
                className="w-full p-3 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all placeholder:text-gray-500 text-white font-medium"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isAnalyzing}
            className={`w-full py-3 sm:py-4 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-2xl transition-all shadow-xl shadow-purple-500/20 flex items-center justify-center gap-3 ${isAnalyzing ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl"}`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden sm:inline">Consulting AI...</span>
                <span className="sm:hidden">Processing...</span>
              </>
            ) : "💾 Save Memory"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalForm;