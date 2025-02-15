import React from "react";
import Button from "../../components/button";
import Admin_login from "./home_main_content";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header className="mainheader">
        <h1> WELCOME TO WAKINJO SHOP</h1>
      </header>
      <div className="side_and_content ">
     
        <ul >
          <li><Link to="/Admin">Admin</Link></li>
          <li><Link to="/Customer">Customer</Link></li>
          <li><Link to="/supplier" >Supplier</Link></li>
        </ul>
        <div className="side_content">
          
        <Outlet/>
        </div>
      </div>
    </>
  );
};
export default Home;
