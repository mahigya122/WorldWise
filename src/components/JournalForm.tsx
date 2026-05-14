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
    <div className="p-4 bg-zinc-800 text-white rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">Add Journal Entry</h2>

      <div className="bg-zinc-700 p-3 rounded mb-4">
        <h3 className="text-sm font-semibold mb-2">Selected Location</h3>
        
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

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Your Journal Entry</label>
        <textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border border-zinc-600 rounded bg-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your journal entry here..."
          rows={6}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
        >
          Save Entry
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default JournalForm;