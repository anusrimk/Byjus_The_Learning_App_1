import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CourseDetails.module.css";

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
  
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      alert("User data is missing, please register again.");
      nav("/register");
      return;
    }
  
    const fullData = { ...userData, course: formData.course };
  
    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server Response:", data);
        nav("/homepage");
      })
      .catch((error) => {
        console.error("Fetch Error:", error.message);
      });
  };
  

  return (
    <div className={styles.container}>
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
          <option value="12th-NEET">12th NEET</option>
          <option value="12th-JEE">12th JEE</option>
          <option value="12th-HSC">12th HSC</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CourseDetails;
