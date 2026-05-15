import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-zinc-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img 
            src={logo} 
            alt="WorldWise" 
            className="h-12 w-auto object-contain bg-[#f8f4eb] p-1 rounded-lg transition-transform group-hover:scale-105" 
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `text-xs font-bold tracking-widest uppercase transition-colors ${
                isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
              }`
            }
          >
            Product
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `text-xs font-bold tracking-widest uppercase transition-colors ${
                isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
              }`
            }
          >
            Pricing
          </NavLink>
          <Link
            to="/login"
            className="ml-4 px-6 py-2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
