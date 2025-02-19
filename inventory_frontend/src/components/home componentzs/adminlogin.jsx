import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { useState } from "react";


function Admin_login() {
  const [input_val, setinput_value] = useState(null);
  const navigate = useNavigate();
  console.log(`username: ${input_val}`);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = input_val.username;
    const password = input_val.passwd;
    console.log(`username: ${username} password: ${password} `);
    try {
      const response = await fetch("http://40.40.40.110:5000/admin_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // Check for HTTP errors *before* parsing JSON
        const errorText = await response.text(); // Get error message from server (if available)
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorText || "No message"
          }`
        ); // Throw error with details
      }

      const result = await response.json();

      if (result.status === "success") {
        // Check the status from the server
        alert("Login successful!");
        console.log(result);
        navigate("/AdminPage");
      } else {
        alert("Login failed: " + (result.message || "Unknown error")); // Handle missing message
        console.error(result);
      }
    } catch (error) {
      alert("An error occurred: " + error.message); // Display the error message
      console.error("Login Error:", error); // Include more context in console
    }
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
