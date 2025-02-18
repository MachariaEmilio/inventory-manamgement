import React, { useState } from "react";
import Header from "../../components/header";
import Details from "../../components/register_employee";
import Delete_details from "../../components/delete_workers";
import View_employees from "../../components/view_employees";
import "./AdminMainPage.css";

function Admin_Main_Page() {
   const [activeForm, setActiveForm] = useState("Add"); 
  return (
    <>
      <Header />
      <div className="admin_main__body Admin_div_style">
        <div className="Worker_services">
        <ul>
          <li>
            <button
              onClick={() => setActiveForm("Add")}
              className={activeForm === "Add" ? "active" : ""}
            >
             Add Worker
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveForm("delete")}
              className={activeForm === "delete" ? "active" : ""}
            >
           Delete Worker
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveForm("view")}
              className={activeForm === "view" ? "active" : ""}
            >
             Show Worker
            </button>
          </li>
        </ul>

       
        </div>
        <div Admin_div_style> 
        {activeForm === "Add" && <Details />}
          {activeForm === "delete" && <Delete_details />}
          {activeForm === "view" && <View_employees />}
        </div>
      </div>
    </>
  );
}

export default Admin_Main_Page;
