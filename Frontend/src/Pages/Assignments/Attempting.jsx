import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./Attempting.module.css";

function Attempting() {
  const params = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({}); // Track selected options for each question
  const [savedAnswers, setSavedAnswers] = useState([]); // Store saved answers
  const [feedback, setFeedback] = useState({}); // Store feedback for correct/wrong answers

  // Fetch assignment questions
  useEffect(() => {
    fetch(`http://localhost:8000/assignments/getAssignment/${params.assignmentId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.assignment.questions || []);
      })
      .catch((err) => console.log(err));
  }, [params.assignmentId]);

  // Handle option selection
  const handleOptionChange = (index, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: option, // Update selected option for this question
    }));
  };

  // Handle save button click
  const handleSave = (index) => {
    const selectedAnswer = selectedOptions[index];
    if (!selectedAnswer) {
      alert("Please select an answer before saving.");
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[index].isCompleted = true; // Update the field locally

    // Send update to the server
    fetch(`http://localhost:8000/assignments/updateQuestion/${params.assignmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serialNum: updatedQuestions[index].serialNum,
        isCompleted: true,
        chosenAnswer: selectedAnswer, // Send the chosen answer
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isCorrect) {
          alert("Correct Answer!");
        } else {
          alert("Wrong Answer! The correct answer is highlighted.");
          setFeedback((prev) => ({
            ...prev,
            [index]: data.correctAnswer, // Store the correct answer for the question
          }));
        }

        // Save the chosen answer with feedback
        setSavedAnswers((prev) => [
          ...prev,
          {
            questionText: updatedQuestions[index].questionText,
            chosenAnswer: selectedAnswer,
            correctAnswer: data.correctAnswer,
            isCorrect: data.isCorrect,
          },
        ]);

        setQuestions(updatedQuestions);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    navigate("/results", { state: { savedAnswers } });
  };

  return (
    <section className={styles.attempting_section}>
      <Link to="/assignments">
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
      <div>
        <h1 className={styles.title}>Attempting Assignment</h1>
        {questions.length > 0 ? (
          <form className={styles.questions_form}>
            <ul className={styles.questions_list}>
              {questions.map((question, index) => (
                <li key={index} className={styles.question_item}>
                  <p className={styles.question_text}>
                    Q{index + 1}: {question.questionText}
                  </p>
                  <div className={styles.options}>
                    {question.options.map((option, i) => (
                      <div
                        key={i}
                        className={`${styles.option} ${
                          selectedOptions[index] === option
                            ? styles.selected_option
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          id={`option-${index}-${i}`}
                          value={option}
                          onChange={() => handleOptionChange(index, option)}
                          disabled={question.isCompleted} // Disable if already saved
                          checked={selectedOptions[index] === option} // Check if selected
                          className={styles.hidden_radio} // Hide the radio button
                        />
                        <label htmlFor={`option-${index}-${i}`} className={styles.option_label}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                  <button
                    className={styles.save_button}
                    onClick={() => handleSave(index)}
                    disabled={question.isCompleted} // Disable button if already saved
                  >
                    {question.isCompleted ? "Saved" : "Save"}
                  </button>
                </li>
              ))}
            </ul>
            <button className={styles.submit_button} onClick={handleSubmit}>
              Submit Assignment
            </button>
          </form>
        ) : (
          <p className={styles.no_questions}>
            No questions available for this assignment.
          </p>
        )}
      </div>
    </section>
  );
}

export default Attempting;
