import React, { useState } from "react";
import "./suppliers.css";
import Header from "../../components/header";

const Add_products = () => {
  const [input_values, setInputValues] = useState({
    name: "",
    type: "",
    quantity: "",
    price: "",
  });

  const [activeForm, setActiveForm] = useState("register"); // Toggle form state

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://20.20.20.109:5000/update_inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              item_name: input_values.name,
              type: "add",
              company_name: input_values.type,
              quantity: input_values.quantity,
            },
          ],
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Product updated successfully!");
        console.log(result);
        setInputValues({ name: "", type: "", quantity: "", price: "" }); // Clear form
      } else {
        alert("Failed to update product: " + (result.message || "Server error"));
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
      const response = await fetch("http://40.40.40.110:5000/item_register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          item_name: input_values.name,
          company_name: input_values.type,
          quantity: input_values.quantity,
          price_per_item: input_values.price,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        console.log(result);
        setInputValues({ name: "", type: "", quantity: "", price: "" }); // Clear form
      } else {
        alert("Failed to add product: " + (result.message || "Server error"));
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
      <div className="toggle-buttons">
        <button onClick={() => setActiveForm("register")} className={activeForm === "register" ? "active" : ""}>
          Register Product
        </button>
        <button onClick={() => setActiveForm("update")} className={activeForm === "update" ? "active" : ""}>
          Update Product
        </button>
      </div>

      {activeForm === "register" && (
        <div className="suppliers_form">
          <p>REGISTER PRODUCT</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Product Name:</label>
            <input type="text" name="name" value={input_values.name} onChange={handleChange} placeholder="sugar" required />

            <label htmlFor="type">Product Type:</label>
            <input type="text" name="type" value={input_values.type} onChange={handleChange} placeholder="eg mumias sugar" required />

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" name="quantity" value={input_values.quantity} onChange={handleQuantityChange} placeholder="0" min="0" required />

            <label htmlFor="price">Price per Item:</label>
            <input type="number" name="price" value={input_values.price} onChange={handleChange} placeholder="0" min="0" required />

            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {activeForm === "update" && (
        <div className="suppliers_form">
          <p>UPDATE PRODUCT</p>
          <form onSubmit={handleSubmit2}>
            <label htmlFor="name">Product Name:</label>
            <input type="text" name="name" value={input_values.name} onChange={handleChange} placeholder="sugar" required />

            <label htmlFor="type">Product Type:</label>
            <input type="text" name="type" value={input_values.type} onChange={handleChange} placeholder="eg mumias sugar" required />

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" name="quantity" value={input_values.quantity} onChange={handleQuantityChange} placeholder="0" min="0" required />

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Add_products;
