import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Question from '../Question';
import './index.css';

const QuizItem = (props) => {
  const { isLoggedIn, status } = { props };
  const [quizData, setQuizData] = useState([]);
  const [isloaded, setIsLoaded] = useState(false);

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
    }));
    return jsonifiedObject;
  };

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/assess/questions');
        const data = await response.json();
        setQuizData(jsonifyObject(data));
        setIsLoaded(true);
      } catch (error) {
        console.log('Error: fetching data ', error);
      }
    };
    getDataFromApi();
  }, []);

  return (
    <div>
      {isloaded ? (
        <div>
          <Question quizData={quizData} />
        </div>
      ) : (
        <div className="loader-container" data-testid="loader">
          <ThreeDots
            visible={true}
            height="50"
            width="50"
            color="#263868"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
};

export default QuizItem;
