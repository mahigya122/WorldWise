import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import { addEntry, updateEntry } from "../redux/journalSlice";

const JournalForm = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const lat = params.get("lat");
  const lng = params.get("lng");

  const cityData = useAppSelector(
    (state) => state.city
  );
   
  const dispatch = useAppDispatch();

  const [note, setNote] = useState("");

  const handleSave = () => {
    console.log("calling", note);
    dispatch(
      addEntry({
        id: crypto.randomUUID(),
        city: cityData.city,
        country: cityData.country,
        lat: lat ? parseFloat(lat) : 0,
        lng: lng ? parseFloat(lng) : 0,
        note: note,
        date: new Date().toLocaleDateString(),
      })
    );
      
    navigate("/dashboard/cities");
  };

  const handleCancel = () => {
    navigate("/dashboard/cities");
  };

  return (
    <div className="p-3 bg-zinc-800 text-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-3">Add Journal Entry</h3>

      <div className="bg-zinc-700 p-2 rounded mb-3">
        <h4 className="text-xs font-semibold mb-2 text-gray-300">Selected Location</h4>
        
        <p className="mb-1 text-xs">
          <span className="text-gray-400">City:</span> <span className="text-white">{cityData.city || "Unknown"}</span>
        </p>
        <p className="mb-1 text-xs">
          <span className="text-gray-400">Country:</span> <span className="text-white">{cityData.country || "Unknown"}</span>
        </p>
        <p className="mb-1 text-xs">
          <span className="text-gray-400">Lat:</span> <span className="text-white">{lat || "N/A"}</span>
        </p>
        <p className="text-xs">
          <span className="text-gray-400">Lng:</span> <span className="text-white">{lng || "N/A"}</span>
        </p>
      </div>

      <div className="mb-3">
        <textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border border-zinc-600 rounded bg-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Write your journal entry..."
          rows={4}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded font-semibold text-sm"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded font-semibold text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default JournalForm;