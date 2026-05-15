import { useAppDispatch } from "../hooks/reduxHooks";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return(
        <div className = "w-[350px] h-full bg-zinc-900 text-white p-5 flex flex-col gap-4 overflow-hidden">
            <h1 className = "text-xl font-bold mb-4 shrink-0"> World Journal </h1>

         <div className="flex gap-4 text-xs font-bold uppercase tracking-widest mb-2 shrink-0">

        <NavLink
          to="/dashboard/cities"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-gray-400 hover:text-white transition-colors"
          }
        >
          Cities
        </NavLink>

        <NavLink
          to="/dashboard/countries"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-gray-400 hover:text-white transition-colors"
          }
        >
          Countries
        </NavLink>

        <NavLink
          to="/dashboard/journals"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-gray-400 hover:text-white transition-colors"
          }
        >
          Journals
        </NavLink>

      </div>

      <div className="flex-1 overflow-y-auto min-h-0 pr-1">
        <Outlet />
      </div>

      <button
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        className="mt-4 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all py-2 px-4 rounded w-full shrink-0"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

