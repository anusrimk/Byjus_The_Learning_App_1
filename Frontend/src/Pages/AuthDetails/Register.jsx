import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/BG_Byju.jpg";
import styles from "./Auth.module.css";

function Register() {
  const nav = useNavigate();
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

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    // Clear form and redirect
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
    });

    nav("/course");
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
