import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { setSelectedEntry } from "../redux/selectedEntrySlice";
import { deleteEntry } from "../redux/entriesSlice";

const Countries = () => {

  const entries = useAppSelector(
    (state) => state.journal.entries
  );

  const dispatch = useAppDispatch();

  const uniqueCountries = [
    ...new Set(entries.map((e) => e.country))
  ];

  return (
    <div className="text-white">

      <h1 className="text-lg font-bold mb-3">
        Countries
      </h1>

      <div className="flex flex-col gap-3">

        {uniqueCountries.map((country) => {

          const journalCount = entries.filter(
            (e) => e.country === country
          ).length;

          const firstEntry = entries.find(
            (e) => e.country === country
          );

          return (
            <div
              key={country}

              onClick={() => {
                if (firstEntry) {
                  dispatch(
                    setSelectedEntry({
                      lat: firstEntry.lat,
                      lng: firstEntry.lng,
                    })
                  );
                }
              }}

              className="relative bg-zinc-800 p-3 rounded shadow cursor-pointer hover:bg-zinc-700 transition"
            >

              <h2 className="text-sm font-bold">
                {country}
              </h2>

              <p className="text-sm text-gray-400">
                {journalCount} journals
              </p>

            <button
              onClick={(e) => {
              e.stopPropagation();

              entries
             .filter((e) => e.country === country)
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

export default Countries;