import "./App.css";
import Home from "./pages/home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin_Main_Page from "./pages/admin/admin_page";

import Customer_main_page from "./pages/customer/Customer_main_page";
import Add_products from "./pages/suppliers/suppliers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/home" index element={<Home />} />
        </Route>
        <Route path="/AdminPage/" index element={<Admin_Main_Page />}></Route>
        <Route
          path="/CustomerMainPage"
          element={<Customer_main_page />}
        ></Route>
        </Routes>
    </Router>
  );
}

export default App;
