import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin_Main_Page from "./pages/admin/admin_page";
import Customer_main_page from "./pages/customer/Customer_main_page";
import Add_products from "./pages/suppliers/suppliers";
import Home from "./pages/home/home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AdminPage" element={<Admin_Main_Page />} />
        <Route path="/CustomerMainPage" element={<Customer_main_page />} />
      </Routes>
    </Router>
  );
}

export default App;
