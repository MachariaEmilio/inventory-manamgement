import React, { useState } from "react";
import Header from "../../components/header";
import Details from "../../components/admin component/register_employee";;
import ViewEmployees from "../../components/admin component/view_employees";

import "./AdminMainPage.css";

function Admin_Main_Page() {
   const [activeForm, setActiveForm] = useState("view"); 
  return (
    <>
      <Header />
      <div className="admin_main__body Admin_div_style">
        <div className="Worker_services">
        <ul>
        <li>
            <button
              onClick={() => setActiveForm("view")}
              className={activeForm === "view" ? "active" : ""}
            >
             Show Worker
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveForm("Add")}
              className={activeForm === "Add" ? "active" : ""}
            >
             Add Worker
            </button>
          </li>
        
         
        </ul>

       
        </div>
        <div Admin_div_style> 
        {activeForm === "Add" && <Details />}
         
          {activeForm === "view" && <ViewEmployees/>}
        </div>
      </div>
    </>
  );
}

export default Admin_Main_Page;
