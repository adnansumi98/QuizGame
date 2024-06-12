import { useEffect, useState } from 'react'
import './index.css'

const Question = (props) => {
  const { quizData } = props
  const totalQuestions = quizData.length
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0)
  const [question, setQuestion] = useState([])

  useEffect(() => {
    setQuestion(quizData[currentQuestionNo])
    if (timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else {
      setCurrentQuestionNo(currentQuestionNo + 1)
      setTimeLeft(15)
    }
  }, [timeLeft])

  const handleNextQuestion = (event) => {
    event.target.classList.remove('next-button-active')
  }

  const handleOptionClick = (event) => {}

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
  )
}

export default Question
