import { useState } from "react";
import bg from "../assets/BG_Byju's.jpg";
import styles from "./Auth.module.css";

function Login() {
  const [formData, setFormData] = useState({
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
    console.log("User Logged In:", formData);

    // Clear form
    setFormData({
      username: "",
      password: "",
    });

    // Send data to the server
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message:", data);
        // Redirect to home page or wherever necessary
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

          <button type="submit">Login</button>
          <p>
            Don&apos;t have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
