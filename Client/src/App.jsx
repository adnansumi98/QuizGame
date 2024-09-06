import { ScoreProvider } from "./components/context/ScoreContext";
import QuizGame from "./components/QuizGame";

export default function App() {
  return (
    <ScoreProvider>
      <QuizGame />
    </ScoreProvider>
  );
}
