import React from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./Results.module.css";

function Results() {
  const location = useLocation();
  const savedAnswers = location.state?.savedAnswers || [];

  const totalQuestions = savedAnswers.length;
  const correctAnswers = savedAnswers.filter((answer) => answer.isCorrect).length;

  return (
    <section className={styles.results_section}>
      <h1 className={styles.title}>Results</h1>
      <div className={styles.score}>
        <p>
          Your Score: {correctAnswers} / {totalQuestions}
        </p>
      </div>
      <ul className={styles.answers_list}>
        {savedAnswers.map((answer, index) => (
          <li key={index} className={styles.answer_item}>
            <p className={styles.question_text}>
              Q{index + 1}: {answer.questionText}
            </p>
            <p>
              <strong>Your Answer:</strong> {answer.chosenAnswer}
            </p>
            <p
              className={
                answer.isCorrect
                  ? styles.correct
                  : styles.wrong
              }
            >
              <strong>Correct Answer:</strong> {answer.correctAnswer}
            </p>
          </li>
        ))}
      </ul>
      <Link to="/assignments" className={styles.back_button}>
        Go Back to Assignments
      </Link>
    </section>
  );
}

export default Results;
