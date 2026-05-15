import MapView from "../components/MapView";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
 return(
  <div className = "flex h-screen w-full">
    <Sidebar />
    
    <div className = "flex-1 relative">
      <MapView/>
    </div>
  </div>  
 );
};

export default Dashboard;