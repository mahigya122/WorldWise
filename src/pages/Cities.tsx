import {useAppSelector} from "../hooks/reduxHooks";

const Cities = () => {
    const entries = useAppSelector((state) => state.journal.entries);

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Visited Cities</h1>

      <div className = "flex flex-col gap-4">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-gray-800 p-4 rounded shadow">

            <h2 className="text-xl font-bold">{entry.city}</h2>
            <p>{entry.country}</p>

            <p className="text-gray-300 mt-2">{entry.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cities;