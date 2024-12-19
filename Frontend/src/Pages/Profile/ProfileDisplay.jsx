import { useState, useEffect } from "react";
import styles from "./ProfileDisplay.module.css";

function ProfileDisplay() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("testuser"); // Replace with dynamic username (e.g., from login state)
  const [newPassword, setNewPassword] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Fetch user details
  useEffect(() => {
    fetch(`http://localhost:8000/auth/getuser?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, [username]);

  // Handle password update
  const handlePasswordUpdate = () => {
    if (!newPassword) {
      alert("Password cannot be empty!");
      return;
    }

    fetch("http://localhost:8000/auth/updatePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: profile.username, password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "Password updated successfully!");
        setNewPassword("");
        setEditMode(false);
      })
      .catch((error) => console.error("Error updating password:", error));
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profilePic}>
        <img src={profile.profilePic} alt="Profile" />
      </div>
      <div className={styles.info}>
        <h2>{profile.name}</h2>
        <p>
          <strong>Username:</strong> {profile.username}
        </p>
        <p>
          <strong>Password:</strong>{" "}
          {editMode ? (
            <>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter new password"
              />
              <button onClick={handlePasswordUpdate} className={styles.saveButton}>
                Save
              </button>
            </>
          ) : (
            <>
              ********
              <button onClick={() => setEditMode(true)} className={styles.editButton}>
                Edit Password
              </button>
            </>
          )}
        </p>
        <p>
          <strong>Courses:</strong> {profile.courses.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default ProfileDisplay;
