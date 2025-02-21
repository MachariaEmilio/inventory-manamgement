import { useState } from "react";
import Button from "../button";
import { useNavigate } from "react-router-dom";

function Supplier_page() {
    const [input_val, setinput_value] = useState(null);
    const navigate = useNavigate()
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(input_val.username)
    console.log(input_val.passwd)

    const formData = new FormData();
    formData.append("username", input_val.username);
    formData.append("passwd",input_val.passwd);
    
      
    try {
      // Send a POST request to the Flask backend for login
      const response = await fetch("https://wakinjologin.onrender.com/login", {
        method: "POST",
        body: formData,
        headers: {
         
          Accept: "application/json",
        },
      });

      const result = await response.json();

      // Handle the response
      if (!response.ok) {
        alert("Login successful!");
        console.log(result);
        navigate("/Newproduct");
      } else {
        alert("Login failed: " + result.message);
        console.error(result);
      }
    } catch (error) {
      alert("An error occurred: " + error);
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setinput_value((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

console.log(input_val)

  return (
    <>
      <h2>Store panel : login page </h2>
      <form className="admin_form"onSubmit={handleSubmit}>
        <label htmlFor="name">enter your name </label>
        <input name="username" id="name" type="text" onChange={handleChange} required />
        <label htmlFor="password">enter your password</label>{" "}
        <input name="passwd" id="password" type="password"  onChange={handleChange}  required/>
        <Button type="submit " name="submit" />{" "}
      </form>
    </>
  );
}

export default Supplier_page;