import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoggedIn && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
