import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button";
import LoginSuccess from "../Feedback message/feedback";

function Customer_page() {
  const [inputVal, setInputVal] = useState({ username: "", passwd: "" });
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsSuccess(null);

    // Check if username or password is empty
    if (!inputVal.username || !inputVal.passwd) {
      setMessage("Invalid credentials. Please fill in both fields.");
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", inputVal.username);
    formData.append("passwd", inputVal.passwd);

    try {
      const response = await fetch("https://wakinjologin.onrender.com/login", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (!response.ok || !result.status) {
        // Check message from server
        const serverMessage = result.message?.toLowerCase() || "";

        if (serverMessage.includes("invalid password") || serverMessage.includes("username not found")) {
          setMessage("Invalid credentials. Please check your username or password.");
        } else {
          setMessage("There is a technical problem. Please try again later.");
        }

        setIsSuccess(false);
        return;
      }

      // Successful login
      setMessage("Login Successful!");
      setIsSuccess(true);

      setTimeout(() => navigate("/CustomerMainPage"), 3000);
    } catch (error) {
      setMessage("There is a technical problem. Please check your connection.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Serve Customer: Login</h2>
      <form className="admin_form" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name</label>
        <input
          name="username"
          id="name"
          type="text"
          value={inputVal.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Enter your password</label>
        <input
          name="passwd"
          id="password"
          type="password"
          value={inputVal.passwd}
          onChange={handleChange}
          required
        />

        <Button type="submit" name={loading ? "Loading..." : "Submit"} disabled={loading} />
        {loading && <p className="loading-text">Loading...</p>}

        {message && (
          <LoginSuccess
            className={isSuccess ? "login-success" : "login-failed"}
            onClose={() => setMessage(null)}
            message={message}
          />
        )}
      </form>
    </>
  );
}

export default Customer_page;
