import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Homepage() {
  const { user } = useUser();

  const [course, setCourse] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectDetails, setSubjectDetails] = useState([]); // Separate state for detailed subject data

  useEffect(() => {
    if (user) {
      console.log(user);

      // Fetching the user
      fetch(`http://localhost:8000/auth/getuser/${user.username}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.courses);

          // Setting the course
          setCourse(data.courses);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (course) {
      fetch(`http://localhost:8000/courses/getCourseByName/${course}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched course data:", data);
          setSubjects(data.subjects || []); // Setting subject IDs
        })
        .catch((err) => console.error("Error fetching course:", err));
    }
  }, [course]);

  useEffect(() => {
    if (subjects.length > 0) {
      Promise.all(
        subjects.map((subjectId) =>
          fetch(`http://localhost:8000/subjects/${subjectId}`)
            .then((response) => response.json())
            .catch((err) => console.error(`Error fetching subject ${subjectId}:`, err))
        )
      )
        .then((details) => {
          console.log("Fetched subject details:", details);
          setSubjectDetails(details); // Updating with fetched details
        })
        .catch((err) => console.error("Error fetching subjects:", err));
    }
  }, [subjects]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.main}>
        <div className={styles.bentoGrid}>
          <div className={styles.box}>
            <h3>Pending Assignments</h3>
            <Link to="/assignments">
              <p>Check all your assignments</p>
            </Link>
          </div>
          <div className={styles.box}>
            <h3>Upcoming Tests</h3>
            <p>Next test: Mathematics on Friday.</p>
          </div>
          <div className={styles.box}>
            <h3>Subjects</h3>
            {subjectDetails.length > 0 ? (
              <ul>
                {subjectDetails.map((subject) => (
                  <li key={subject._id}>
                    {subject.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading subjects...</p>
            )}
          </div>
        </div>
        <div className={styles.pendingLectures}>
          <h3>Pending Video Lectures</h3>
          {
            subjectDetails.length > 0 ? (
              <ul>
                {subjectDetails.map((subject) => (<li>{subject.name} 2 hours</li>))}
              </ul>
            ) : (<p>Loading subjects...</p>)
          }
          {/* <ul>
            <li>Physics: Optics (1 hour)</li>
            <li>Chemistry: Organic Chemistry (1.5 hours)</li>
            <li>Mathematics: Calculus (2 hours)</li>
          </ul> */}
        </div>
      </div>
      <aside className={styles.notifications}>
        <h3>Notifications</h3>
        <ul>
          <li>Assignment 3 deadline extended to Thursday.</li>
          <li>New video lecture on Algebra uploaded.</li>
          <li>Mock test results are out now.</li>
        </ul>
      </aside>
    </div>
  );
}

export default Homepage;
