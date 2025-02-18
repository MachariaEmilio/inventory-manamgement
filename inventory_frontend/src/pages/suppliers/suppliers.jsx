import React, { useState } from "react";
import "./suppliers.css";
import Header from "../../components/header";


const Add_products = () => {
  const [input_values, setInputValues] = useState({
    name: "",
    type: "",
    quantity: 0,
    price: 0,
  });


  const handleSubmit2 = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://40.40.40.106:5000/update_inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: new URLSearchParams({
          item_name: input_values.name,
          type: "add",
          quantity: input_values.quantity,
        //   price_per_item: input_values.price,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product updated successfully!"); 
        console.log(result);
    
      } else {
        alert("Failed to add product: " + result.message || "Server error"); 
        console.error(result);
      }
    } catch (error) {
      alert("An error occurred: " + error.message); 
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://40.40.40.106:5000/item_register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: new URLSearchParams({
          item_name: input_values.name,
        //   type: input_values.type,
          quantity: input_values.quantity,
          price_per_item: input_values.price,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product added successfully!"); 
        console.log(result);
    
      } else {
        alert("Failed to add product: " + result.message || "Server error"); 
        console.error(result);
      }
    } catch (error) {
      alert("An error occurred: " + error.message); 
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(input_values)

  const handleQuantityChange = (event) => {
    const { value } = event.target;
   
    const quantity = Math.max(0, parseInt(value, 10) || 0); 
    setInputValues((prev) => ({
      ...prev,
      quantity: quantity,
    }));
  };


  return (
    <>
      <Header />
      <div className="suppliers_form" >
        <p> REGISTER  PRODUCT </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            name="name"
            value={input_values.name} 
            onChange={handleChange}
            placeholder="sugar"
            required 
          />

          <label htmlFor="type">Product Type:</label>
          <input
            type="text"
            name="type"
            value={input_values.type} 
            onChange={handleChange}
            placeholder="eg mumias sugar"
            required 
          />

          <label htmlFor="quantity">Quantity:</label>
          <div className="quantity">
            <input
              type="number"
              name="quantity"
              value={input_values.quantity} 
              onChange={handleQuantityChange} 
              placeholder="0"
              min="0"
              required
            />
          </div>

          <label htmlFor="price">Price per Item:</label>
          <input
            type="number"
            name="price"
            value={input_values.price} 
            onChange={handleChange}
            placeholder="0"
            min="0" 
            required 
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="suppliers_form" >
        <p> UPDATE  PRODUCT </p>
        <form onSubmit={handleSubmit2}>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            name="name"
            value={input_values.name} 
            onChange={handleChange}
            placeholder="sugar"
            required 
          />

          <label htmlFor="type">Product Type:</label>
          <input
            type="text"
            name="type"
            value={input_values.type} 
            onChange={handleChange}
            placeholder="eg mumias sugar"
            required 
          />

          <label htmlFor="quantity">Quantity:</label>
          <div className="quantity">
            <input
              type="number"
              name="quantity"
              value={input_values.quantity} 
              onChange={handleQuantityChange} 
              placeholder="0"
              min="0"
              required
            />
          </div>

          <label htmlFor="price">Price per Item:</label>
          <input
            type="number"
            name="price"
            value={input_values.price} 
            onChange={handleChange}
            placeholder="0"
            min="0" 
            required 
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Add_products;