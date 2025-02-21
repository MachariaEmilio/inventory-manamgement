import React, { useState } from "react";
import Admin_login from "../../components/home componentzs/adminlogin";
import { FaBars } from 'react-icons/fa';
import Header from "../../components/header";
import Customer_page from "../../components/home componentzs/customer_page";
import Supplier_page from "../../components/home componentzs/supplier_page";
import "./Home.css";

const Home = () => {
  const [activeForm, setActiveForm] = useState("Admin"); 
  const [showSidebar, setShowSidebar] = useState(true); // State to toggle sidebar visibility


  return (
    <>
    <Header  className="mainheader"/>
    <div className="side_and_content">
  

      <ul className={`sidenav }`}> 
        {/* ... your sidebar buttons ... */}
        <li>
          <button
            onClick={() => setActiveForm("Admin")}
            className={activeForm === "Admin" ? "active" : ""}
          >


            Admin
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveForm("customer")}
            className={activeForm === "customer" ? "active" : ""}
          >
            Employee
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveForm("supplier")}
            className={activeForm === "supplier" ? "active" : ""}
          >
            Supplier
          </button>
        </li>
      </ul>
      <div className="content">
        {activeForm === "Admin" && <Admin_login className="active" />}
        {activeForm === "customer" && <Customer_page className="active" />}
        {activeForm === "supplier" && <Supplier_page className="active" />}
      </div>
    </div>
  </>
  );
};

export default Home;
