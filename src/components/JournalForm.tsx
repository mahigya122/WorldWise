import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import { addEntry } from "../redux/entriesSlice";

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

  const handleSave = () => {
    
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
         mood: "",

      })
    );
      
    navigate("/dashboard/cities");
  };

  return (
    <div className="p-4 bg-zinc-800 text-white rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-4"> Travel Journal</h2>

       <label className="block text-sm font-semibold mb-1">
          Selected Location
        </label>

      <div className="bg-zinc-700 p-3 rounded mb-4 text-sm">   

        <p className="mb-1">
          <span className="text-gray-400">City:</span> <span className="text-white">{cityData.city || "Unknown"}</span>
        </p>
        <p className="mb-1">
          <span className="text-gray-400">Country:</span> <span className="text-white">{cityData.country || "Unknown"}</span>
        </p>
        <p className="mb-1">
          <span className="text-gray-400">Latitude:</span> <span className="text-white">{lat || "N/A"}</span>
        </p>
        <p className="mb-1">
          <span className="text-gray-400">Longitude:</span> <span className="text-white">{lng || "N/A"}</span>
        </p>
        <p>
          <span className="text-gray-400">Date:</span> <span className="text-white">{new Date().toLocaleDateString()}</span>
        </p>
      </div>


      <div className="mb-3">
      <label className="block text-sm font-semibold mb-1">
       Title
      </label>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Trip title (e.g. Summer in Nepal)"
        className="w-full p-2 mb-2 bg-zinc-700 rounded"
      />
      </div>

      <div className="mb-3">
      <label className="block text-sm font-semibold mb-1">
        Journal
      </label>

      <textarea
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Tell your travel story..."
        className="w-full p-2 mb-2 bg-zinc-700 rounded"
        rows={4}
      />
      </div>

      <div className="mb-3">
      <label className="block text-sm font-semibold mb-1">
       Highlights
      </label>

      <input
        value={highlightText}
        onChange={(e) => setHighlightText(e.target.value)}
        placeholder="Highlights (comma separated)"
        className="w-full p-2 mb-2 bg-zinc-700 rounded"
      />
      </div>

      <div className="mb-3">
      <label className="block text-sm font-semibold mb-1">
       Feeling
      </label>

      <input
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        placeholder="How did you feel?"
        className="w-full p-2 mb-4 bg-zinc-700 rounded"
      />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-500 p-2 rounded"
      >
        Save Journal
      </button>
    </div>
  );
};

export default JournalForm;