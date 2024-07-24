import { createContext, useState, useContext } from "react";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const increaseScore = () => setScore(score + 1);

  // const decreaseScore = () => setScore(score - 1);

  return (
    <ScoreContext.Provider value={{ score, increaseScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
