import React, { useEffect, useState } from "react";
import "./ViewEmployees.css"; // Import CSS
import LoginSuccess from "../Feedback message/feedback"; 
const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]); // Employee list
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Store employee to be deleted
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  console.log(employees);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://wakinjologin.onrender.com/get_employees");
        const results = await response.json();

        if (results.data) {
          setEmployees(results.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load employees. Please try again.");
        setIsSuccess(false);
      }
    }
    fetchData();
  }, []);

  // Function to open confirmation modal
  const confirmDelete = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Function to delete employee
  const deleteEmployee = async () => {
    if (!selectedEmployee || !selectedEmployee.username) {
      setMessage("Error: Missing employee username!");
      setIsSuccess(false);
      return;
    }

    try {
      console.log("Deleting employee:", selectedEmployee.username);

      // Format data for application/x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append("username", selectedEmployee.username.trim());

      const response = await fetch("https://wakinjologin.onrender.com/delete_employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const result = await response.json();
      console.log("Delete response:", result);

      if (result.success === true || result.message?.toLowerCase().includes("deleted successfully")) {
        setEmployees(employees.filter((emp) => emp.username !== selectedEmployee.username));
        setMessage(`Employee ${selectedEmployee.username} deleted successfully.`);
        setIsSuccess(true);
      } else {
        setMessage(`Failed to delete employee: ${result.message || "Unknown error"}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      setMessage("An error occurred while deleting the employee.");
      setIsSuccess(false);
    }

    setShowModal(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      <div className="container">
        <h2>Employee List</h2>
        
        {/* Show success/error message */}
        {message && (
          <LoginSuccess 
            message={message} 
            className={isSuccess ? "login-success" : "login-failed"} 
            onClose={() => setMessage(null)} 
          />
        )}

        {employees.length > 0 ? (
          <ul>
            {employees.map((employee) => (
              <li key={employee.worker_id}>
                <span>
                  <strong>Username:</strong> {employee.username} |{" "}
                  <strong>Name:</strong> {employee.full_name} |{" "}
                  <strong>ID:</strong> {employee.worker_id} |{" "}
                  <strong>Phone:</strong> {employee.phone_number}
                </span>
                <button onClick={() => confirmDelete(employee)} className="delete-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees found.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p><strong>Username:</strong> {selectedEmployee.username}</p>
            <p><strong>Full Name:</strong> {selectedEmployee.full_name}</p>
            <p><strong>ID:</strong> {selectedEmployee.worker_id}</p>
            <p><strong>Phone:</strong> {selectedEmployee.phone_number}</p>
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-buttons">
              <button onClick={deleteEmployee} className="delete-button">Yes, Delete</button>
              <button onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewEmployees;
