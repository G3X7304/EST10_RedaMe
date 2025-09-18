export interface ChineseNumber {
  number: number;
  chinese: string;
  pinyin: string;
}

export interface Question {
  id: string;
  number: number;
  chinese: string;
  pinyin: string;
  type: 'number-to-chinese' | 'chinese-to-number';
  options?: string[];
  correctAnswer: string;
}

export interface QuizResult {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  pinyin?: string;
  showPinyin?: boolean;
}

export type GameScreen = 'home' | 'mode-select' | 'quiz' | 'result' | 'study';

export interface GameState {
  currentScreen: GameScreen;
  currentQuestion: number;
  questions: Question[];
  results: QuizResult[];
  score: number;
}