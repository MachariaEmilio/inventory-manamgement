import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    function handleclick(){
navigate("/Home")
    }
  return (
    <header className="mainheader">
     <button onClick={handleclick}>home</button>
      <h1> WELCOME TO WAKINJO SHOP</h1>
    </header>
  );
};

export default Header;
