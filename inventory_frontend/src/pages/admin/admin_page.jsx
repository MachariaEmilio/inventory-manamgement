import React from "react";
import Header from "../../components/header";
import Details from "../../components/register_employee";
import Delete_details from "../../components/delete_workers";
import View_employees from "../../components/view_employees";
import { Link, Outlet } from "react-router-dom";

function Admin_Main_Page() {
  return (
    <>
      <Header />
      <div className="admin_main__body">
        <div className="Worker_services">
          <Link to="AddWorker">Add Worker</Link>
          <Link to="DeleteWorker">Delete Worker</Link>
          <Link to="DetailsOfWorker">Show Worker</Link>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Admin_Main_Page;
