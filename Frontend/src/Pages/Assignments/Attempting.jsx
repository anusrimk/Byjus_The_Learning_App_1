import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./Attempting.module.css";

function Attempting() {
  const params = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/assignments/getAssignment/${params.assignmentId}`)
      .then((response) => response.json())
      .then((data) => {setQuestions(data.assignment.questions || [])
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  return (
    <section className={styles.attempting_section}>
      <Link to={"/assignments"}><FontAwesomeIcon icon={faChevronLeft}/></Link>
      <div>
        <h1 className={styles.title}>Attempting Assignment</h1>
        {questions.length > 0 ? (
          <ul className={styles.questions_list}>
            {questions.map((question, index) => (
              <li key={index} className={styles.question_item}>
                <p className={styles.question_text}>
                  Q{index + 1}: {question.questionText}
                </p>
                <div className={styles.options}>
                  {question.options.map((option, i) => (
                    <div key={i} className={styles.option}>
                      {option}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.no_questions}>No questions available for this assignment.</p>
        )}
      </div>
    </section>
  );
}

export default Attempting;
