import React from "react";
import styles from "./Homepage.module.css";
import {Link} from 'react-router-dom'

function Homepage() {
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
            <p>Physics, Chemistry, Mathematics</p>
          </div>
        </div>
        <div className={styles.pendingLectures}>
          <h3>Pending Video Lectures</h3>
          <ul>
            <li>Physics: Optics (1 hour)</li>
            <li>Chemistry: Organic Chemistry (1.5 hours)</li>
            <li>Mathematics: Calculus (2 hours)</li>
          </ul>
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