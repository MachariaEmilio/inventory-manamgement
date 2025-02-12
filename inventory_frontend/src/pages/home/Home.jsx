import React from "react";
import Button from "../../components/button";

const Home = () => {
  return (
    <>
      <header className="mainheader">
        <h1> WELCOME TO WAKINJO SHOP</h1>
      </header>
      <div className="side_and_content ">
        <div className="task_services">
          <Button name="Admin" />
          <Button name="Customers " />
          <Button name="suppliers " />
        </div>
        <div className="side_content">
            <h2>admin panel : login page </h2>
            <form className="admin_form" action="">
                <label htmlFor="name ">enter your name </label>
                <input type="text" />
<label htmlFor="password">enter your password</label> <input type="password" />
<Button type="submit " name="submit"/>
            </form>
        </div>
      </div>
    </>
  );
};
export default Home;
