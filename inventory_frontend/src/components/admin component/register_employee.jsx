import React, { useState, useRef } from "react";
import LoginSuccess from "../Feedback message/feedback"; // Import feedback message component

const Details = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef(null); // Reference for resetting the form

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(null);

    const data = new FormData(event.target);
    const password = data.get("passwd");
    const confirmPassword = data.get("confirm_passwd");

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setIsSuccess(false);
      return;
    }

    // Convert FormData to object
    const formObject = Object.fromEntries(data.entries());
    setFormData(formObject);
    setShowModal(true); // Show confirmation modal
  };

  const confirmSubmission = async () => {
    setShowModal(false);
    setLoading(true);

    const data = new URLSearchParams(formData);

    try {
      const response = await fetch("https://wakinjologin.onrender.com/register", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        setMessage("Registration failed. Please check your details and try again.");
        setIsSuccess(false);
      } else {
        setMessage("Registration successful! You can now log in.");
        setIsSuccess(true);
        formRef.current.reset(); // Reset form inputs
        setFormData({});
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false);
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setMessage("Registration cancelled successfully.");
    setIsSuccess(false);
    formRef.current.reset(); // Clear form after cancellation
    setFormData({});
  };

  return (
    <>
      <h2>Register Employee</h2>

      {/* Success/Error Message */}
      {message && (
        <LoginSuccess 
          message={message} 
          className={isSuccess ? "login-success" : "login-failed"} 
          onClose={() => setMessage(null)} 
        />
      )}

      <form className="register" onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="worker_id">Worker ID Number</label>
        <input name="worker_id" id="worker_id" type="number" required />

        <label htmlFor="Worker_name">Username</label>
        <input name="Worker_name" id="Worker_name" minlength="4" type="text" required />

        <label htmlFor="phone_no">Phone Number</label>
        <input name="phone_number" id="phone_number" type="number" required />

        <label htmlFor="passwd">Password</label>
        <input name="passwd" id="passwd" type="password" minlength="4" required />

        <label htmlFor="confirm_passwd">Confirm Password</label>
        <input name="confirm_passwd" id="confirm_passwd" minlength="4" type="password" required />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Details</h3>
            <p><strong>Worker ID:</strong> {formData.worker_id}</p>
            <p><strong>Username:</strong> {formData.Worker_name}</p>
            <p><strong>Phone Number:</strong> {formData.phone_number}</p>
            <p><strong>Password:</strong> ********</p>

            <div className="modal-buttons">
              <button onClick={confirmSubmission} className="confirm-button">
                Confirm
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
