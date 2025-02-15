import { useState } from "react";
import Button from "../../components/button";

function Supplier_page() {
    const [input_val, setinput_value] = useState(null);

    const handleSubmit =(event)=>{
        event.preventDefault();
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