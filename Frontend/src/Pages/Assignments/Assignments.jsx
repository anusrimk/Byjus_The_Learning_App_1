import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import styles from "./Assignments.module.css";

function Assignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch assignments data from the API
    fetch("http://localhost:8000/assignments/getAssignments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        return response.json();
      })
      .then((data) => {
        setAssignments(data.assignments); // Set only the `assignments` array
      })
      .catch((err) => console.log("Error fetching assignments:", err));
  }, []); // Dependency array empty to fetch only once on mount

  return (
    <section className={styles.assignment_section}>
      <h1>Assignments</h1>
      <div className={styles.container}>
        <div className={styles.assignments}>
          {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <div key={index} className={styles.assignment_card}>
                <h2>{assignment.topic}</h2>
                <p><strong>Subject:</strong> {assignment.subject}</p>
                <p><strong>Total Questions:</strong> {assignment.numOfQues}</p>
                <p><strong>Completed Questions:</strong> {assignment.completedQues}</p>
                <Link to={`/assignments/${assignment._id}`}><p><strong>View Assignment</strong></p></Link>
              </div>
            ))
          ) : (
            <p>No assignments found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Assignments;
