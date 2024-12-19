import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CourseDetails.module.css"

function CourseDetails() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    course: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    // Merge course selection with user data
    const fullData = {
      ...userData,
      course: formData.course,
    };

    console.log("Submitting data to server:", fullData);

    // Send data to the server
    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Response:", data);

        // Clear form and redirect to home
        setFormData({ course: "" });
        nav("/home");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div>
      <h2>Select Your Course</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="course">Course</label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">-- Select a Course --</option>
          <option value="12th NEET">12th NEET</option>
          <option value="12th JEE">12th JEE</option>
          <option value="12th HSC">12th HSC</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CourseDetails;
