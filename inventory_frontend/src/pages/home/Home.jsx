import React, { useState } from "react";
import Admin_login from "../../components/home componentzs/adminlogin";

import Header from "../../components/header";
import Customer_page from "../../components/home componentzs/customer_page";
import Supplier_page from "../../components/home componentzs/supplier_page";
import "./home.css";

const Home = () => {
  const [activeForm, setActiveForm] = useState("Admin"); 

  return (
    <>
      <Header />
      <div className="side_and_content">
        <ul>
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
        <div className="side_content">
          {activeForm === "Admin" && <Admin_login />}
          {activeForm === "customer" && <Customer_page />}
          {activeForm === "supplier" && <Supplier_page />}
        </div>
      </div>
    </>
  );
};

export default Home;
