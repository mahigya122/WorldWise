import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { deleteEntry } from "../redux/entriesSlice";

const Journal = () => {

  const entries = useAppSelector(
    (state) => state.journal.entries
  );

  const dispatch = useAppDispatch();

  const [openID, setOpenID] = useState<string | null>(null); 

  const sorted = [...entries].sort(
    (a, b) => b.date.localeCompare(a.date)
  );

  return (
    <div className="text-white">
      <h1 className="text-lg font-bold mb-3">Your Journals</h1>

      <div className="flex flex-col gap-3">
        {sorted.map((entry) => {
          const isOpen = openID === entry.id;

          return (
            <div key={entry.id} className="relative bg-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-700">
              <div
                onClick={() => {
                  setOpenID(isOpen ? null : entry.id);
                }}
              >
                <h2 className="font-bold">
                  {entry.city}, {entry.country}
                </h2>

                <p className="text-sm text-gray-300">
                  {entry.title}
                </p>

                <p className="text-xs text-gray-500">
                  {entry.date}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteEntry(entry.id));
                }}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600"
              >
                ✕
              </button>

              {isOpen && (
                <div className="mt-2 p-3 bg-zinc-700 rounded text-sm">
                  <p>
                    <span className="text-gray-400">Story:</span>{" "}
                    {entry.story}
                  </p>

                  <p>
                    <span className="text-gray-400">Feelings:</span>{" "}
                    {entry.feeling}
                  </p>

                  <p>
                    <span className="text-gray-400">Highlights:</span>{" "}
                    {entry.highlights?.join(", ")}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Journal;