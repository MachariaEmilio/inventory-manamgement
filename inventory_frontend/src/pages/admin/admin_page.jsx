import React, { useState } from "react";
import Header from "../../components/header";
import Details from "../../components/admin component/register_employee";
import ViewEmployees from "../../components/admin component/view_employees";
import "./AdminMainPage.css";

function Admin_Main_Page() {
   const [activeForm, setActiveForm] = useState("view"); 
   
  return (
    <div className="admin-container">
      <Header className="admin-header" />
      <div className="admin-main-body">
        <div className="worker-services">
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
        <div className="form-container"> 
          {activeForm === "Add" && <Details />}
          {activeForm === "view" && <ViewEmployees />}
        </div>
      </div>
    </div>
  );
}

export default Admin_Main_Page;
