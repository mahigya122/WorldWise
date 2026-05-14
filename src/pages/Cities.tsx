import { useState } from "react";
import {useAppSelector} from "../hooks/reduxHooks";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setSelectedEntry } from "../redux/selectedEntrySlice";
import { deleteEntry } from "../redux/entriesSlice";

const Cities = () => {
    const entries = useAppSelector((state) => state.journal.entries);

    const dispatch = useAppDispatch();

    const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="text-white">
      <h1 className="text-lg font-bold mb-3">Visited Cities</h1>

      <div className = "flex flex-col gap-3">
        {entries.map((entry) => (
          
          <div key={entry.id} 

          onClick={() => {
              dispatch(
                setSelectedEntry({
                  lat: entry.lat,
                  lng: entry.lng,
                })
              );

              setOpenId( openId === entry.id ? null : entry.id);
            }
          }
          
          className="bg-zinc-800 p-3 rounded shadow cursor-pointer hover:bg-zinc-700">

            <h2 className="text-sm font-bold">{entry.city}</h2>
            {openId === entry.id && (

              <div className = "mt-2">

            <p className="text-xs text-gray-400">{entry.country}</p>

            <p className="text-gray-300 mt-1 text-xs">{entry.note || "No note available"}</p>

            <p className= "text-gray-500 mt-1 text-xs">{entry.date}</p>

            <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                deleteEntry(entry.id)
              );
            }}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
          </div>
        )}
      </div>
      ))}
    </div>
    </div>
  );
};

export default Cities;