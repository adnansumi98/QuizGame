import { useEffect, useState } from "react";
import { ScoreContext } from "../context/ScoreContext";

import "./index.css";
import { useContext } from "react";

const Question = (props) => {
  const { quizData } = props;
  const totalQuestions = quizData.length;
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(1);
  const [question, setQuestion] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);

  const { score, increaseScore } = useContext(ScoreContext);

  useEffect(() => {
    setQuestion(quizData[currentQuestionNo]);
    if (timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setCurrentQuestionNo(currentQuestionNo + 1);
      setTimeLeft(15);
      setSelectedOption(null);
      setCorrectAnswer(
        question.length !== 0
          ? question.options.filter((each) => each.isCorrect === "true")
          : "no correct answer",
      );
    }
  }, [timeLeft]);

  const result = useEffect(() => {
    if (selectedOption === correctAnswer) {
      increaseScore();
    } else {
      if (currentQuestionNo < totalQuestions) {
        setCurrentQuestionNo(currentQuestionNo + 1);
      } else {
      }
    }
  }, [selectedOption]);

  const handleNextQuestion = (event) => {
    event.target.classList.remove("next-button-active");
  };

  const handleOptionClick = (event) => {
    console.log(question);
  };

  return (
    <div className="question-container">
      <div className="question-header-container">
        <p className="question-number">
          Question <br />
          <span className="question-span">
            {currentQuestionNo}/{totalQuestions}
          </span>
        </p>
        <p className="question-timer">{timeLeft}</p>
      </div>
      <h3 className="question">{question.questionText}</h3>
      <ol className="option-container">
        {question.options &&
          question.options.map((option) => (
            <li
              key={option.id}
              className="option-list"
              onClick={() => setSelectedOption(option.id)}
            >
              <button type="button" className="option-button">
                {option.text}
              </button>
            </li>
          ))}
      </ol>
      <div className="next-button-container">
        <button
          className="next-button"
          onClick={handleNextQuestion}
          type="button"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default Question;
