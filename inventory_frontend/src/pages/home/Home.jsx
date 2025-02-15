import React from "react";
import Button from "../../components/button";
import Admin_login from "./adminlogin";
import { Link, Outlet } from "react-router-dom";
import Header from "../../components/header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="side_and_content ">
        <ul>
          <li>
            <Link to="/Admin">Admin</Link>
          </li>
          <li>
            <Link to="/Customer">Customer</Link>
          </li>
          <li>
            <Link to="/supplier">Supplier</Link>
          </li>
        </ul>
        <div className="side_content">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Home;
