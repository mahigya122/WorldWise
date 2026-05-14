import { useAppSelector } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";


const Journal = () => {

  const entries = useAppSelector(
    (state) => state.journal.entries
  );
  const navigate = useNavigate();

  const sorted = [...entries].sort(
    (a, b) => b.date.localeCompare(a.date)
  );

 return (

    <div className="text-white">
      <h1 className="text-lg font-bold mb-3">Your Journals</h1>

      <div className="flex flex-col gap-3">
        {sorted.map((entry) => {
          return (
            <div
              key={entry.id}
              onClick={() => {
                navigate(`/dashboard/journals/${entry.id}`);
              }}
              className="relative bg-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-700"
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
          );
        })}
      </div>
    </div>
  );
};

export default Journal;
