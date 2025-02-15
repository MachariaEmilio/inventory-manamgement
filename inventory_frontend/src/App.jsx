import "./App.css";
import Home from "./pages/home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin_login from "./pages/home/home_main_content";
import Customer_page from "./pages/home/customer_page";
import Supplier_page from "./pages/home/supplier_page";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Admin_login/>} />
          <Route path="Customer" element={<Customer_page />} />
          <Route path="Admin" element={<Admin_login/>} />
          <Route path="supplier" element={<Supplier_page/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
