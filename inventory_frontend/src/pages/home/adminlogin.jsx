import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { useState } from "react";
function Admin_login() {
  const [input_val, setinput_value] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

   

    
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setinput_value((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(input_val);

  return (
    <>
      <h2>admin panel : login page </h2>
      <form className="admin_form" onSubmit={handleSubmit}>
        <label htmlFor="name">enter your name </label>
        <input
          name="username"
          id="name"
          type="text"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">enter your password</label>{" "}
        <input
          name="passwd"
          id="password"
          type="password"
          onChange={handleChange}
          required
        />
        <Button type="submit " name="submit" />{" "}
      </form>
    </>
  );
}

export default Admin_login;
