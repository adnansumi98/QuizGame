import './index.css'
import { useState, useEffect } from 'react'
import Question from '../Question'

const QuizItem = (props) => {
  //TODO: should use react context to get the logged in status
  const isLoggedIn = true
  const [quizData, setQuizData] = useState([])
  const [isloaded, setIsLoaded] = useState(false)

  const jsonifyObject = (data) => {
    const jsonifiedObject = data.questions.map((each) => ({
      id: each.id,
      questionText: each.question_text,
      optionsType: each.options_type,
      options: each.options.map((option) => ({
        id: option.id,
        text: option.text,
        isCorrect: option.is_correct,
      })),
    }))
    return jsonifiedObject
  }

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/assess/questions')
        const data = await response.json()
        setQuizData(jsonifyObject(data))
        setIsLoaded(true)
      } catch (error) {
        console.log('Error: fetching data ', error)
      }
    }
    getDataFromApi()
  }, [])

  return (
    <div>
      {isloaded ? (
        <div>
          <Question quizData={quizData} />
        </div>
      ) : (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#263868" height={50} width={50} />
        </div>
      )}
    </div>
  )
}

export default QuizItem
