import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/BG_Byju.jpg";
import styles from "./Auth.module.css";

function Login() {
  const { login } = useUser();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();

        // Log in the user and store complete details
        login(userData);

        // Clear form
        setFormData({ username: "", password: "" });

        // Navigate to homepage
        nav("/homepage");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again.");
    }
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
          />
          <button type="submit">Login</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </section>
  );
}

export default Login;
