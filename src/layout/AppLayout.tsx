import { Outlet, useNavigation, useLocation } from "react-router-dom";
import Loader from "./Loader";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const isLoading = navigation.state === "loading";
  const isDashboard = location.pathname.startsWith("/dashboard");
  
  return (
    <div>
      {isLoading && <Loader />}
      {!isDashboard && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
