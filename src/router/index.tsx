import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AnalysisReview from "../pages/AnalysisReview";
import History from "../pages/History";
import "./index.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,  
    children: [
      { index: true, element: <Home /> },
      { path: "review", element: <AnalysisReview /> },
      { path: "history", element: <History /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
