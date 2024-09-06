import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import './index.css';

const Question = (props) => {
  const { quizData } = props;
  const totalQuestions = quizData.length;
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [question, setQuestion] = useState([]);
  const { score, increaseScore } = useContext(ScoreContext);

  const navigate = useNavigate();

  let intervalId;

  useEffect(() => {
    setQuestion(quizData[currentQuestionNo]);
  }, [currentQuestionNo]);

  const increaseQuestionNo = () => {
    setCurrentQuestionNo(
      currentQuestionNo < totalQuestions
        ? currentQuestionNo + 1
        : currentQuestionNo
    );
    setTimeLeft(15);
    setSelectedOption(null);
  };

  useEffect(() => {
    // clear existing interval Id to avoid overlaping intervals
    clearInterval(intervalId);
    // check if tere is still questions and time is up
    if (currentQuestionNo < totalQuestions && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1); //use functional update
      }, 1000);
    } else {
      // no more questions and time is up
      if (currentQuestionNo === totalQuestions) {
        navigate('/result');
      } else {
        increaseQuestionNo();
      }
    }
    // clean up the interval right after the timer changes and component unmounts
    return () => clearInterval(intervalId);
  }, [timeLeft, currentQuestionNo, totalQuestions, navigate]);

  useEffect(() => {
    const correctAnswer =
      question.length !== 0
        ? question.options.filter((each) => each.isCorrect === 'true')
        : 'no correct answer';

    console.log(selectedOption, correctAnswer[0].id);
    if (selectedOption !== null) {
      if (selectedOption === correctAnswer) {
        increaseScore();
        setTimeLeft(0);
        increaseQuestionNo();
      } else {
      }
    }
  }, [selectedOption]);

  const handleNextQuestion = (event) => {
    event.target.classList.remove('next-button-active');
    setCurrentQuestionNo(currentQuestionNo + 1);
    setTimeLeft(15);
  };

  return (
    <div className="question-container">
      <div className="question-header-container">
        <p className="question-number">
          Question <br />
          <span className="question-span">
            {currentQuestionNo + 1}/{totalQuestions}
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
