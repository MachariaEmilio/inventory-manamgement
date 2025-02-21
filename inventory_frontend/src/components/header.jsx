import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css"
const Header = ({className}) => {
    const navigate = useNavigate()
    function handleclick(){
navigate("/Home")
    }
  return (
    <header className={className}>
     <button onClick={handleclick}>home</button>
      <h1> WELCOME TO WAKINJO SHOP</h1>
    </header>
  );
};

export default Header;
