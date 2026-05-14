import {useAppSelector} from "../hooks/reduxHooks";
import { useAppDispatch } from "../hooks/reduxHooks";
import { deleteEntry } from "../redux/entriesSlice";
import { setSelectedEntry } from "../redux/selectedEntrySlice";

const Cities = () => {
    const entries = useAppSelector((state) => state.journal.entries);

    const dispatch = useAppDispatch();

    const uniqueCities = entries.filter 
    ((entry, index, self) =>
    index === self.findIndex(
      (e) => e.city === entry.city
    ));

  return (
    <div className="text-white">
      <h1 className="text-lg font-bold mb-3">Visited Cities</h1>

      <div className = "flex flex-col gap-3">
        { uniqueCities.map((entry) => {
          const journalCount = entries.filter(
            (e) => e.city === entry.city
          ).length;

          return(
            <div key={entry.id} 

          onClick={() => {
              dispatch(
                setSelectedEntry({
                  lat: entry.lat,
                  lng: entry.lng,
                })
              );
            }}
          
          className="relative bg-zinc-800 p-3 rounded shadow cursor-pointer hover:bg-zinc-700 transition">

            <h2 className="text-sm font-bold">
            
              {entry.city}
            </h2>

            <p className="text-sm text-gray-400">{journalCount} journals</p>

          <button
          onClick={(e) => {
          e.stopPropagation();

           entries
           .filter((e) => e.city === entry.city)
           .forEach((e) => dispatch(deleteEntry(e.id)));
           }}
          className="absolute top-2 right-2 text-red-400 hover:text-red-600"
          >
           ✕
          </button>
          

          </div>
        );
        })}
    </div>
    </div>
  );
};

export default Cities;