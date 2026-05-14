import {useAppSelector} from "../hooks/reduxHooks";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setSelectedEntry } from "../redux/selectedEntrySlice";

const Cities = () => {
    const entries = useAppSelector((state) => state.journal.entries);

    const dispatch = useAppDispatch();


  return (
    <div className="text-white">
      <h1 className="text-lg font-bold mb-3">Visited Cities</h1>

      <div className = "flex flex-col gap-3">
        {entries.map((entry) => (
          
          <div key={entry.id} 

          onClick={() =>
              dispatch(
                setSelectedEntry({
                  lat: entry.lat,
                  lng: entry.lng,
                })
              )
            }
          
          className="bg-zinc-800 p-3 rounded shadow cursor-pointer hover:bg-zinc-700">

            <h2 className="text-sm font-bold">{entry.city}</h2>
            <p className="text-xs text-gray-400">{entry.country}</p>

            <p className="text-gray-300 mt-1 text-xs">{entry.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cities;