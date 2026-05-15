import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full z-[100] bg-zinc-950/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative z-[110]">
          <div className="relative flex items-center justify-center w-10 h-10">
            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full group-hover:bg-blue-500/40 transition-all duration-500" />
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 text-blue-400 relative z-10 group-hover:rotate-[30deg] transition-transform duration-700"
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
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              World<span className="aurora-text">Wise</span>
            </span>
            <span className="text-[8px] font-bold tracking-[0.4em] text-gray-500 uppercase">
              Adventures
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `text-[10px] font-black tracking-widest uppercase transition-all ${
                isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
              }`
            }
          >
            Product
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `text-[10px] font-black tracking-widest uppercase transition-all ${
                isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
              }`
            }
          >
            Pricing
          </NavLink>
          <Link
            to="/login"
            className="ml-4 px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
