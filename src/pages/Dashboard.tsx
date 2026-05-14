import MapView from "../components/MapView";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
 return(
  <div className = "flex h-screen w-full">
    <Sidebar />
    
    <div className = "flex-1 relative">
      <MapView/>
      <Outlet />
    </div>
  </div>  
 );
};

export default Dashboard;