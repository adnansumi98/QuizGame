import './index.css'
import { Container, Heading, Text } from './styledComponents'
import Login from '../Login'
import Header from '../Header'
import QuizItem from '../QuizItem'
import { useState, useEffect } from 'react'

const QuizGame = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isReloading, setIsReloading] = useState(false)

  useEffect(() => {
    //TODO: need to triger an alert if user is reloading the page
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = true
      setTimeout(() => {
        setIsReloading(true)
      }, 100)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, []) // Empty dependency array means this effect runs once on mount

  const renderWarningReload = () => (
    <div className="warning-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
        alt="warn"
        className="warning-icon"
      />
      <Text color="#D97706">
        All the progress will be lost, if you reload during the quiz
      </Text>
    </div>
  )

  const renderNotFound = () => (
    <Container>
      <img
        src="../../../static/images/Not Found.png"
        alt="Not Found"
        className="notfound-image"
      />
      <Heading> Page Not Found</Heading>
      <Text>We are sorry, the page you requested could not be found </Text>
    </Container>
  )

  const renderLogIn = () => (
    <Container>
      <Login />
    </Container>
  )

  const renderStartQuizGame = () => (
    <Container>
      <div className="start-game-container">
        <img
          src="../../../static/images/start-quiz.png"
          alt="Start Quiz"
          className="start-game-image"
        />
        <Heading color="#0EA5E9" style={{ textAlign: 'center' }}>
          How Many Of These Questions Do You Actually Know?
        </Heading>
        {/*manually added center alignment for mobile view */}
        <Text color="#475569">
          Test yourself with these easy quiz questions and answers
        </Text>
        <div className="start-game-button-container">
          <button
            className="primary-button"
            onClick={() => console.log('start game button clicked')}
          >
            Start Game
          </button>
        </div>
      </div>
    </Container>
  )

  // return renderNotFound();
  return renderLogIn()
  // return <Header />;
  // return (
  //   <Container>
  //     {renderStartQuizGame()}
  //     {isReloading && renderWarningReload()}
  //   </Container>
  // );
  // return QuizItem()
}

export default QuizGame
