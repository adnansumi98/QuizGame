import "./index.css";
import { Container, Heading, Text } from "./styledComponents";
import Login from "../Login";
import Header from "../Header";
import QuizItem from "../QuizItem";
import Result from "../Result";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/";

const StatusConstants = {
  started: "STARTED",
  finished: "FINISHED",
  notStarted: "NOTSTARTED",
};

const QuizGame = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [statusOfGame, setStatusOfGame] = useState(StatusConstants.notStarted);

  useEffect(() => {
    //TODO: need to triger an alert if user is reloading the page
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = true;
      setTimeout(() => {
        setIsReloading(true);
      }, 100);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
  );

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
  );

  const renderLogIn = () => (
    <Container>
      <Login />
    </Container>
  );

  const renderResult = () => (
    <Container>
      <Result />
    </Container>
  );

  const renderStartQuizGame = () => (
    <div className="start-game-container">
      <img
        src="../../../static/images/start-quiz.png"
        alt="Start Quiz"
        className="start-game-image"
      />
      <Heading color="#0EA5E9" style={{ textAlign: "center" }}>
        How Many Of These Questions Do You Actually Know?
      </Heading>
      {/*manually added center alignment for mobile view */}
      <Text color="#475569">
        Test yourself with these easy quiz questions and answers
      </Text>
      <div className="start-game-button-container">
        <button
          className="primary-button"
          onClick={() => {
            setStatusOfGame(StatusConstants.started);
          }}
        >
          Start Game
        </button>
      </div>
    </div>
  );

  const renderQuizItem = () => (
    <Container>
      {statusOfGame === StatusConstants.started ? (
        <QuizItem isLogged={isLoggedIn} status={statusOfGame} />
      ) : (
        renderStartQuizGame()
      )}
    </Container>
  );

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/login" render={renderLogIn} />
        <ProtectedRoute exact path="/" render={renderQuizItem} />
        <ProtectedRoute exact path="/result" render={renderResult} />
        <Route render={renderNotFound} />
      </Switch>
    </Router>
  );
};

export default QuizGame;
