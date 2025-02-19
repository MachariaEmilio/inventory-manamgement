import React, { useState } from "react";
const Details = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    //get data from the form
    const formData = new FormData(event.target);
    console.log(`formdata: ${formData}`)

    // Prepare the data to be sent to the backend API
    const data = new URLSearchParams();
    formData.forEach((value, key) => {
      data.append(key, value);
    });
    try {
      const response = await fetch("https://wakinjologin.onrender.com/register", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        alert("failed");
        throw new Error(`Error: ${response.status}`);
      } else {
        alert("success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="register_workers" onSubmit={handleSubmit}>
        <label htmlFor="worker_id">workers id number</label>
        <input name="worker_id" id="worker_id" type="number" />
        <label htmlFor="username">username</label>
        <input name="username" id="username" type="text" />
        <label htmlFor="phone_no">Phone number</label>
        <input name="phone_number" id="phone_number" type="number" />
        <label htmlFor="passwd">password</label>
        <input name="passwd" id="passwd" type="password" />
        <label htmlFor="confirm_passwd">confirm password</label>
        <input name="confirm_passwd" id="confirm_passwd" type="password" />
        <button type="submit">submit</button>
      </form>
    </>
  );
};
export default Details;
