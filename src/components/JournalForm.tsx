import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import { addEntry } from "../redux/journalSlice";

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
    console.log("calling",note);
    dispatch(
        addEntry({
        id: crypto.randomUUID(),
        city: cityData.city,
        country: cityData.country,
        lat: lat ? parseFloat(lat) : 0,
        lng: lng ? parseFloat(lng) : 0  ,
        note : note,
        date: new Date().toLocaleDateString(),
      })
    );
      
    navigate ("/dashbord/cities");

};

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Add Journal Entry</h2>

    <p className = "mb-2">
        <strong>city:</strong> {cityData.city}
    </p>

    <p className = "mb-2">
        <strong>country:</strong> {cityData.country}
    </p>

    <p className = "mb-2">
        <strong>latitude:</strong> {lat}
    </p>
    <p className = "mb-2">
        <strong>longitude:</strong> {lng}
    </p>

    <p className = "mb-2">
        <strong>date:</strong> {new Date().toLocaleDateString()}
    </p>

    < textarea 
    value = {note}
    onChange = {(e) => setNote(e.target.value)}
    className = "w-full p-2 border rounded"
    placeholder = "Write your journal entry here..."
    />

      <button
        onClick={handleSave}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default JournalForm;