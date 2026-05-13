import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import AppLayout from "./layout/AppLayout";
import Error from "./layout/Error";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./pages/ProtectedRoute";

import Cities from "./pages/Cities";
import Countries from "./pages/Countries";

import JournalForm from "./components/JournalForm";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/login", element: <Login /> },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),

         children : [
        { path: "cities", element: <Cities /> },
        { path: "countries", element: <Countries /> },
        { path: "form", element: <JournalForm /> },
        ],  
       
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
