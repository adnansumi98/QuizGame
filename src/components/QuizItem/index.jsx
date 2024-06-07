import "./index.css";
import { useState, useEffect } from "react";

const QuizItem = (props) => {
  const { isLoggedin } = props; // Corrected to destructure props correctly
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    fetch("https://apis.ccbp.in/assess/questions")
      .then((response) => response.json())
      .then((data) =>
        setQuizData(
          data.map((each) => ({
            id: each.id,
            question: each.question_text,
            optionsType: each.options_type,
            options: () =>
              each.options.map((option) => ({
                id: option.id,
                text: option.text,
                isCorrect: option.is_correct,
              })),
          })),
        ),
      )
      .catch((error) => console.error("Error:", error));
  }, [isLoggedin]);

  return (
    <div>
      {quizData.length > 0 ? (
        <ul>
          {quizData.map((item) => (
            <li key={item.id}></li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizItem;
