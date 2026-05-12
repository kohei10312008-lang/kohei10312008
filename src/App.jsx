import useQuiz from './hooks/useQuiz';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import HistoryScreen from './components/HistoryScreen';
import './App.css';

export default function App() {
  const quiz = useQuiz();

  return (
    <div className="app-container">
      {quiz.screen === 'home' && (
        <HomeScreen onStart={quiz.startQuiz} onHistory={quiz.goHistory} />
      )}
      {quiz.screen === 'quiz' && (
        <QuizScreen
          question={quiz.currentQuestion}
          currentIndex={quiz.currentIndex}
          totalQuestions={quiz.totalQuestions}
          selectedAnswer={quiz.selectedAnswer}
          showExplanation={quiz.showExplanation}
          onAnswer={quiz.submitAnswer}
          onNext={quiz.nextQuestion}
          onHome={quiz.goHome}
        />
      )}
      {quiz.screen === 'result' && (
        <ResultScreen
          answers={quiz.answers}
          correctCount={quiz.correctCount}
          finalScore={quiz.finalScore}
          onHome={quiz.goHome}
          onRetry={quiz.goHome}
        />
      )}
      {quiz.screen === 'history' && (
        <HistoryScreen onHome={quiz.goHome} />
      )}
    </div>
  );
}
