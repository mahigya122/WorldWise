import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
        <div className="flex gap-2.5 items-center">
          <Link to="/"> <img src={logo} height={50} width={50} className="bg-[#f8f4eb]"/></Link>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-500">Pricing</Link>
          <Link to="/product" className="text-gray-700 hover:text-blue-500">Product</Link>
        </div>
        <Link 
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
