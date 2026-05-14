import { useAppDispatch } from "../hooks/reduxHooks";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../redux/authSlice";
import JournalForm from "./JournalForm";
import Cities from "../pages/Cities";
import Countries from "../pages/Countries";
import Journal from "../pages/Journal";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
         dispatch(logout());
        navigate("/");
    };

    // Determine which content to show based on route
    const showCities = location.pathname === "/dashboard/cities";
    const showCountries = location.pathname === "/dashboard/countries";
    const showJournals = location.pathname === "/dashboard/journals";

    return(
        <div className = " w-[350px] h-full bg-zinc-900 text-white p-5 flex flex-col gap-4 overflow-y-auto">
            <h1 className = "text-xl font-bold mb-4"> World Journal </h1>

         <div className="flex gap-3 text-sm mb-2">

        <NavLink
          to="/dashboard/cities"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-gray-400"
          }
        >
          Cities
        </NavLink>

        <NavLink
          to="/dashboard/countries"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-gray-400"
          }
        >
          Countries
        </NavLink>

        <NavLink
          to="/dashboard/journals"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-gray-400"
          }
        >
          Journals
        </NavLink>

      </div>

      <div className="flex-1 overflow-y-auto">
        {showCities && <Cities />}
        {showCountries && <Countries />}
        {showJournals && <Journal />}
        {!showCities && !showCountries && !showJournals && <JournalForm />}
      </div>

      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

