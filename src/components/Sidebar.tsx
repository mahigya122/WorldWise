import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Sidebar = () => {
    const city = useAppSelector((state) => state.city);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

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
      </div>

    

       <div className="bg-zinc-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          Selected Location
        </h2>

        <p>
          <span className="text-gray-400">City:</span>{" "}
          {city.city || "click on map"}
        </p>

        <p>
          <span className="text-gray-400">Country:</span>{" "}
          {city.country || "click on map"}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

