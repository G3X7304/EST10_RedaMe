import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Question, QuizResult } from "../types/game";

interface QuizScreenProps {
  questions: Question[];
  currentQuestionIndex: number;
  onAnswer: (answer: string) => void;
  onBack: () => void;
  results: QuizResult[];
}

export function QuizScreen({ 
  questions, 
  currentQuestionIndex, 
  onAnswer, 
  onBack,
  results 
}: QuizScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showPinyinHelp, setShowPinyinHelp] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  if (!currentQuestion) return null;

  // Text-to-speech function
  const speakChinese = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = () => {
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    const isUnknown = selectedAnswer === "모른다";
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // If user selected "모른다", show pinyin help
    if (isUnknown) {
      setShowPinyinHelp(true);
    }
    
    setTimeout(() => {
      onAnswer(selectedAnswer);
      setSelectedAnswer("");
      setShowFeedback(false);
      setShowPinyinHelp(false);
    }, isUnknown ? 3000 : 1500); // Longer delay for "모른다" to show pinyin
  };

  const lastResult = results[results.length - 1];
  const showLastFeedback = lastResult && currentQuestionIndex === results.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="text-white text-center">
          <div className="text-sm opacity-80">문제</div>
          <div className="font-bold">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
        <div className="w-10" />
      </div>

      {/* Progress */}
      <div className="mb-8">
        <Progress value={progress} className="h-3 bg-white/30" />
      </div>

      {/* Previous Result Feedback */}
      {showLastFeedback && (
        <div className={`mb-6 p-4 rounded-2xl text-center ${
          lastResult.userAnswer === "모른다" 
            ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
            : lastResult.isCorrect 
            ? 'bg-green-100 text-green-800 border-2 border-green-200' 
            : 'bg-red-100 text-red-800 border-2 border-red-200'
        }`}>
          <div className="text-2xl mb-2">
            {lastResult.userAnswer === "모른다" ? '📚' : lastResult.isCorrect ? '✅' : '❌'}
          </div>
          <div className="font-bold">
            {lastResult.userAnswer === "모른다" ? '학습했습니다' : 
             lastResult.isCorrect ? '정답입니다!' : '틀렸습니다'}
          </div>
          {(!lastResult.isCorrect || lastResult.showPinyin) && (
            <div className="text-sm mt-2 space-y-1">
              <div>정답: {lastResult.correctAnswer}</div>
              {lastResult.showPinyin && lastResult.pinyin && (
                <div className="text-xs bg-white/50 rounded px-2 py-1">
                  병음: {lastResult.pinyin}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-center mb-8">
            <div className="text-sm text-gray-500 mb-2">
              {currentQuestion.type === 'number-to-chinese' 
                ? '이 숫자를 중국어로?' 
                : '이 중국어를 숫자로?'
              }
            </div>
            <div className="text-6xl font-bold text-[#FF6B6B] mb-4">
              {currentQuestion.type === 'number-to-chinese' 
                ? currentQuestion.number 
                : currentQuestion.chinese
              }
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {currentQuestion.options?.map((option, index) => (
              <Button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                variant={selectedAnswer === option ? "default" : "outline"}
                className={`h-16 text-lg rounded-xl ${
                  selectedAnswer === option 
                    ? 'bg-[#FF6B6B] text-white border-[#FF6B6B]' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          {/* "모른다" Option */}
          <div className="mb-6">
            <Button
              onClick={() => setSelectedAnswer("모른다")}
              variant={selectedAnswer === "모른다" ? "default" : "outline"}
              className={`w-full h-14 text-lg rounded-xl ${
                selectedAnswer === "모른다" 
                  ? 'bg-gray-500 text-white border-gray-500' 
                  : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
              }`}
            >
              5. 모른다
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer || showFeedback}
            className="w-full h-14 text-lg bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white rounded-xl disabled:opacity-50"
          >
            {showFeedback ? '확인 중...' : '제출하기'}
          </Button>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50`}>
            <div className={`bg-white rounded-3xl p-8 mx-6 text-center shadow-2xl max-w-sm ${
              selectedAnswer === "모른다" ? 'border-4 border-blue-400' :
              isCorrect ? 'border-4 border-green-400' : 'border-4 border-red-400'
            }`}>
              <div className="text-6xl mb-4">
                {selectedAnswer === "모른다" ? '📚' : isCorrect ? '✅' : '❌'}
              </div>
              <div className="text-2xl font-bold mb-4">
                {selectedAnswer === "모른다" ? '학습 정보' : 
                 isCorrect ? '정답입니다!' : '틀렸습니다'}
              </div>
              
              {(selectedAnswer === "모른다" || !isCorrect) && (
                <div className="space-y-3">
                  <div className="text-lg text-gray-600">
                    정답: {currentQuestion.correctAnswer}
                  </div>
                  
                  {showPinyinHelp && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="text-sm text-blue-600 mb-2">병음 (Pinyin)</div>
                      <div className="text-lg font-bold text-blue-800 mb-3">
                        {currentQuestion.pinyin}
                      </div>
                      <Button
                        onClick={() => speakChinese(currentQuestion.chinese)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 mx-auto"
                      >
                        <Volume2 className="h-4 w-4" />
                        듣기
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}