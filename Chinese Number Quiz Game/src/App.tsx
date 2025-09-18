import { useState, useEffect } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { ModeSelection } from "./components/ModeSelection";
import { QuizScreen } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";
import { StudyMode } from "./components/StudyMode";
import { GameScreen, GameState, QuizResult } from "./types/game";
import { generateQuestions } from "./data/numbers";

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'home',
    currentQuestion: 0,
    questions: [],
    results: [],
    score: 0
  });

  // Generate questions when starting quiz
  const startQuiz = () => {
    const questions = generateQuestions(10);
    setGameState({
      currentScreen: 'quiz',
      currentQuestion: 0,
      questions,
      results: [],
      score: 0
    });
  };

  // Handle quiz answer
  const handleAnswer = (answer: string) => {
    const currentQuestion = gameState.questions[gameState.currentQuestion];
    const isCorrect = answer === currentQuestion.correctAnswer;
    const isUnknown = answer === "모른다";
    
    const newResult: QuizResult = {
      questionId: currentQuestion.id,
      question: currentQuestion.type === 'number-to-chinese' 
        ? currentQuestion.number.toString() 
        : currentQuestion.chinese,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      pinyin: currentQuestion.pinyin,
      showPinyin: isUnknown
    };

    const newResults = [...gameState.results, newResult];
    const newScore = gameState.score + (isCorrect ? 1 : 0);
    const nextQuestion = gameState.currentQuestion + 1;

    if (nextQuestion >= gameState.questions.length) {
      // Quiz completed
      setGameState(prev => ({
        ...prev,
        currentScreen: 'result',
        results: newResults,
        score: newScore
      }));
    } else {
      // Next question
      setGameState(prev => ({
        ...prev,
        currentQuestion: nextQuestion,
        results: newResults,
        score: newScore
      }));
    }
  };

  // Navigation functions
  const goToHome = () => {
    setGameState({
      currentScreen: 'home',
      currentQuestion: 0,
      questions: [],
      results: [],
      score: 0
    });
  };

  const goToModeSelection = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'mode-select'
    }));
  };

  const goToStudyMode = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'study'
    }));
  };

  const goBack = () => {
    if (gameState.currentScreen === 'mode-select') {
      goToHome();
    } else if (gameState.currentScreen === 'quiz' || gameState.currentScreen === 'study') {
      goToModeSelection();
    }
  };

  // Render current screen
  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'home':
        return <HomeScreen onStart={goToModeSelection} />;
      
      case 'mode-select':
        return (
          <ModeSelection
            onSelectQuiz={startQuiz}
            onSelectStudy={goToStudyMode}
            onBack={goBack}
          />
        );
      
      case 'quiz':
        return (
          <QuizScreen
            questions={gameState.questions}
            currentQuestionIndex={gameState.currentQuestion}
            onAnswer={handleAnswer}
            onBack={goBack}
            results={gameState.results}
          />
        );
      
      case 'result':
        return (
          <ResultScreen
            results={gameState.results}
            score={gameState.score}
            totalQuestions={gameState.questions.length}
            onRestart={startQuiz}
            onHome={goToHome}
          />
        );
      
      case 'study':
        return <StudyMode onBack={goBack} />;
      
      default:
        return <HomeScreen onStart={goToModeSelection} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
}