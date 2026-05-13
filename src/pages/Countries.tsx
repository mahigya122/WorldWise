import  { useAppSelector } from "../hooks/reduxHooks";

const Countries = () => {
    const entries = useAppSelector((state) => state.journal.entries);

    const uniqueCountries = [
        ...new Set(entries.map((entry) => entry.country))
    ];

    return (
    <div className="text-white p-4 w-[350px]">
      <h1 className="text-2xl font-bold mb-4">
        Countries
      </h1>

      <div className="flex flex-col gap-3">
        {uniqueCountries.map((country) => (
          <div
            key={country}
            className="bg-zinc-800 p-4 rounded-lg"
          >
            {country}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;