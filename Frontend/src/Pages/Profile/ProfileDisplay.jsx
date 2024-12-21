import React, { useEffect, useState } from "react";
import styles from "./ProfileDisplay.module.css";
import { useUser } from "../../context/UserContext";

const ProfileDisplay = () => {
  const { user } = useUser();
  const [currUser, setCurrUser] = useState({});

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    if (user?.username) {
      fetch(`http://localhost:8000/auth/getuser/${user.username}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCurrUser(data);
        })
        .catch((err) => console.error(err));
    }
  }, [user.username]);

  return (
    <div className={styles.profileContainer}>
      {/* Left Section */}
      <div className={styles.profileLeft}>
        <div className={styles.profileCircle}>
          {currUser.name ? getInitials(currUser.name) : "N/A"}
        </div>
        <h2 className={styles.profileName}>
          {currUser.name || "No Name Provided"}
        </h2>
      </div>

      {/* Right Section */}
      <div className={styles.profileRight}>
        {/* Username Box */}
        <div className={styles.infoBox}>
          <h3>Username</h3>
          <p>{currUser.username || "No Username Provided"}</p>
          <svg
            className={styles.editIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>

        {/* Password Box */}
        <div className={styles.infoBox}>
          <h3>Password</h3>
          <p>********</p> {/* Password is typically hidden */}
          <svg
            className={styles.editIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>

        {/* Courses Box */}
        <div className={styles.infoBox}>
          <h3>Course</h3>
          <p>{currUser.courses}</p>
          <svg
            className={styles.editIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>  
      </div>
    </div>
  );
};

export default ProfileDisplay;
