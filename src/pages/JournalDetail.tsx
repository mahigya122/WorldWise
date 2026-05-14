import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const JournalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const entry = useAppSelector((state) =>
    state.journal.entries.find((e) => String(e.id) === id)
  
  );

  if (!entry) {
    return (
      <div className="text-white p-4">
        Journal not found
      </div>
    );
  }

  return (
    <div className="text-white p-4">
     
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-400 hover:underline"
      >
        ← Back to Journals
      </button>

      <h1 className="text-2xl font-bold">
        {entry.city}, {entry.country}
      </h1>

      <p className="text-sm text-gray-400 mb-4">
        {entry.date}
      </p>

      <div className="bg-zinc-800 p-4 rounded space-y-3">
        <h2 className="text-lg font-semibold">
          {entry.title}
        </h2>

        <p>
          <span className="text-gray-400">Story:</span>{" "}
          {entry.story}
        </p>

        <p>
          <span className="text-gray-400">Feeling:</span>{" "}
          {entry.feeling}
        </p>

        <p>
          <span className="text-gray-400">Highlights:</span>{" "}
          {entry.highlights?.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default JournalDetail;