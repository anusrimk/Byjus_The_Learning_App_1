import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/BG_Byju.jpg";
import styles from "./Auth.module.css";

function Login() {
  const { login } = useUser();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const nav = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Logged In:", formData);

    login({ username: formData.username });

    // Clear form
    setFormData({ username: "", password: "" });

    nav("/homepage")
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
        </form>
      </div>
    </section>
  );
}

export default Login;
