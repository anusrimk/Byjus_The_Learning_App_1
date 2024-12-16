import { useState } from "react";
import bg from "../assets/BG_Byju's.jpg";
import styles from "./Auth.module.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);

    // Clear form
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
    });

    // Send data to the server
    fetch("http://localhost:8000/auth/register", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message:", data);
        // Redirect to login page
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className={styles.container}>
      <div className={styles.background}>
        <img src={bg} alt="background" className={styles.bgImage} />
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            autoComplete="off"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="off"
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            autoComplete="off"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            autoComplete="off"
          />

          <button type="submit">Register</button>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
