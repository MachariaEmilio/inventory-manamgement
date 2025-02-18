import { useState } from "react";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

function Supplier_page() {
    const [input_val, setinput_value] = useState(null);
    const Navigate = useNavigate()
    const handleSubmit =(event)=>{
        event.preventDefault();

        // try {
        //   // Send a POST request to the Flask backend for login
        //   const response = await fetch("http://40.40.40.106:5000/login", {
        //     method: "POST",
        //     body: formData,
        //     headers: {
             
        //       Accept: "application/json",
        //     },
        //   });
    
        //   const result = await response.json();
    
        //   // Handle the response
        //   if (response.ok) {
        //     alert("Login successful!");
        //     console.log(result);
        //     navigate("/Newproduct");
        //   } else {
        //     alert("Login failed: " + result.message);
        //     console.error(result);
        //   }
        // } catch (error) {
        //   alert("An error occurred: " + error);
        //   console.error(error);
        // }

Navigate(("/Newproduct"))
      }
      
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
      <h2>Supplier panel : login page </h2>
      <form className="admin_form"onSubmit={handleSubmit}>
        <label htmlFor="name">enter your name </label>
        <input name="name" id="name" type="text" onChange={handleChange} />
        <label htmlFor="password">enter your password</label>{" "}
        <input name="password" id="password" type="password"  onChange={handleChange}  />
        <Button type="submit " name="submit" />{" "}
      </form>
    </>
  );
}

export default Supplier_page;