import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin_Main_Page from "./pages/admin/admin_page";
import Customer_main_page from "./pages/customer/Customer_main_page";
import Add_products from "./pages/suppliers/suppliers";
import Home from "./pages/home/Home.jsx";
import ErrorPage from "./pages/error/errorpage.jsx";
import App_success from "./components/Feedback message/feedback.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/AdminPage", element: <Admin_Main_Page /> },
  { path: "/CustomerMainPage", element: <Customer_main_page /> },
  { path: "/NewProduct", element: <Add_products /> },
  { path: "/success", element: <App_success/> },
  { path: "*", element: <ErrorPage /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;