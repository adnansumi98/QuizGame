import { ScoreContext } from '../context/ScoreContext';
import { useContext } from 'react';
import './index.css';

const Result = (props) => {
  const { score } = useContext(ScoreContext);

  return (
    <div className="result-container">
      {score >= 5 ? (
        <img
          src="../../../static/images/trophy.png"
          className="result-image"
          alt="trophy"
          width="164px"
          height="164px"
        />
      ) : (
        <img
          src="../../../static/images/fail.png"
          className="result-image"
          alt="trophy"
          width="410px"
          height="307px"
        />
      )}
      <h1 className="result-heading">
        {score >= 5 ? 'Congrats!' : 'You Lose!'}
      </h1>
      <p className="result-heading blue">{score * 10}% Correctly Answered</p>
      {score >= 5 && (
        <p className="result-completion">Quiz Completed Succesfully</p>
      )}
      <p className="result-text">
        you attemped {score} out of 10 questions as correct
      </p>
      <div>
        <button className="report-button">Report</button>
      </div>
    </div>
  );
};

export default Result;
