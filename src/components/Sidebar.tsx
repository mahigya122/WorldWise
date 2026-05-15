import { useAppDispatch } from "../hooks/reduxHooks";
import { NavLink, useNavigate, Outlet, Link } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return(
        <div className = "w-[380px] h-full bg-zinc-950/80 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col gap-8 overflow-hidden relative">
            {/* Background Aurora Effect */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full animate-pulse-soft" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full animate-pulse-soft" />

            <Link to="/" className="shrink-0 relative group cursor-pointer block">
               <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-full group-hover:bg-purple-500/40 transition-all duration-500" />
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-6 h-6 text-purple-400 relative z-10 group-hover:rotate-12 transition-transform duration-500"
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                  </div>
                  <div>
                    <h1 className = "text-xl font-black tracking-tighter uppercase text-white leading-none"> 
                      World<span className="aurora-text">Wise</span> 
                    </h1>
                    <p className="text-[8px] text-gray-400 font-bold tracking-[0.4em] uppercase mt-1">
                      Your Footprints
                    </p>
                  </div>
               </div>
            </Link>

         <div className="flex gap-6 text-[11px] font-black uppercase tracking-widest shrink-0 border-b border-white/10 pb-4">

        <NavLink
          to="/dashboard/cities"
          className={({ isActive }) =>
            `transition-all duration-300 relative ${
              isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              Cities
              {isActive && <div className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
            </>
          )}
        </NavLink>

        <NavLink
          to="/dashboard/countries"
          className={({ isActive }) =>
            `transition-all duration-300 relative ${
              isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              Countries
              {isActive && <div className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />}
            </>
          )}
        </NavLink>

        <NavLink
          to="/dashboard/journals"
          className={({ isActive }) =>
            `transition-all duration-300 relative ${
              isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              Journals
              {isActive && <div className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />}
            </>
          )}
        </NavLink>

      </div>

      <div className="flex-1 overflow-y-auto min-h-0 pr-2 custom-scrollbar relative">
        <Outlet />
      </div>

      <button
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        className="mt-4 py-3 px-6 glass rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all shrink-0 flex items-center justify-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;

