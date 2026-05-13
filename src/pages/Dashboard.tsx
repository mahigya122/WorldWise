import MapView from "../components/MapView";
import { Outlet } from "react-router-dom";
import JournalForm from "../components/JournalForm";

const Dashboard = () => {
 return(
  <div className = "flex h-screen w-full">
     
        <Outlet />

    <div className = "flex-1 relative">
      <MapView/>
      
      <div className="absolute bottom-4 right-4 max-w-md z-10">
      //logout buton rakhnus
      </div>
    </div>
  </div>  
 );
};

export default Dashboard;