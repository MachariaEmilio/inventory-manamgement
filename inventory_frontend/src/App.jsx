import "./App.css";
import Home from "./pages/home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin_login from "./pages/home/adminlogin";
import Customer_page from "./pages/home/customer_page";
import Supplier_page from "./pages/home/supplier_page";
import Admin_Main_Page from "./pages/admin/admin_page";
import Details from "./components/register_employee";
import Delete_details from "./components/delete_workers";
import View_employees from "./components/view_employees";
import Customer_main_page from "./pages/customer/Customer_main_page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Admin_login />} />
          <Route path="Customer" element={<Customer_page />} />
          <Route path="Admin" element={<Admin_login />} />
          <Route path="supplier" element={<Supplier_page />} />
        </Route>
        <Route path="/AdminPage/" element={<Admin_Main_Page />}>
          <Route index element={<Details />} />
          <Route path="AddWorker" element={<Details />} />{" "}
          <Route path="DeleteWorker" element={<Delete_details />} />{" "}
          <Route path="DetailsOfWorker" element={<View_employees />} />
        </Route>
        <Route path= "/CustomerMainPage" element={<Customer_main_page/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
