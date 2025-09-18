import { Button } from "./ui/button";
import { QuizResult } from "../types/game";

interface ResultScreenProps {
  results: QuizResult[];
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onHome: () => void;
}

export function ResultScreen({ 
  results, 
  score, 
  totalQuestions, 
  onRestart, 
  onHome 
}: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const correctAnswers = results.filter(r => r.isCorrect);
  const wrongAnswers = results.filter(r => !r.isCorrect);
  const unknownAnswers = results.filter(r => r.userAnswer === "모른다");

  const getScoreEmoji = (percentage: number) => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🥇';
    if (percentage >= 70) return '🥈';
    if (percentage >= 60) return '🥉';
    return '📚';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return '완벽해요!';
    if (percentage >= 80) return '훌륭해요!';
    if (percentage >= 70) return '잘했어요!';
    if (percentage >= 60) return '괜찮아요!';
    return '더 연습해보세요!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex flex-col p-6">
      {/* Header */}
      <div className="text-center text-white mb-8">
        <h1 className="text-2xl font-bold">퀴즈 완료!</h1>
      </div>

      {/* Score Display */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
        <div className="text-center">
          <div className="text-8xl mb-4">
            {getScoreEmoji(percentage)}
          </div>
          <div className="text-4xl font-bold text-[#FF6B6B] mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-xl text-gray-600 mb-4">
            {getScoreMessage(percentage)}
          </div>
          <div className="text-6xl font-bold text-[#4ECDC4]">
            {percentage}%
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className={`grid gap-4 mb-6 ${unknownAnswers.length > 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        <div className="bg-green-100 rounded-2xl p-4 text-center border-2 border-green-200">
          <div className="text-2xl mb-1">✅</div>
          <div className="text-xl font-bold text-green-800">
            {correctAnswers.length}
          </div>
          <div className="text-sm text-green-600">정답</div>
        </div>
        <div className="bg-red-100 rounded-2xl p-4 text-center border-2 border-red-200">
          <div className="text-2xl mb-1">❌</div>
          <div className="text-xl font-bold text-red-800">
            {wrongAnswers.filter(r => r.userAnswer !== "모른다").length}
          </div>
          <div className="text-sm text-red-600">오답</div>
        </div>
        {unknownAnswers.length > 0 && (
          <div className="bg-blue-100 rounded-2xl p-4 text-center border-2 border-blue-200">
            <div className="text-2xl mb-1">📚</div>
            <div className="text-xl font-bold text-blue-800">
              {unknownAnswers.length}
            </div>
            <div className="text-sm text-blue-600">학습</div>
          </div>
        )}
      </div>

      {/* Wrong Answers Review */}
      {wrongAnswers.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
            복습이 필요한 문제
          </h3>
          <div className="space-y-3">
            {wrongAnswers.map((result, index) => (
              <div key={index} className={`rounded-xl p-4 border ${
                result.userAnswer === "모른다" 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">
                    {result.userAnswer === "모른다" ? '📚' : '❌'}
                  </span>
                  <div className="text-sm text-gray-600">문제</div>
                </div>
                <div className="font-bold text-gray-800 mb-3">
                  {result.question}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className={result.userAnswer === "모른다" ? "text-blue-600" : "text-red-600"}>
                      내 답안:
                    </span>
                    <div className="font-medium">{result.userAnswer}</div>
                  </div>
                  <div>
                    <span className="text-green-600">정답:</span>
                    <div className="font-medium">{result.correctAnswer}</div>
                  </div>
                </div>
                {result.pinyin && result.showPinyin && (
                  <div className="bg-blue-100 rounded-lg p-2 text-center">
                    <div className="text-xs text-blue-600 mb-1">병음 (Pinyin)</div>
                    <div className="text-sm font-bold text-blue-800">{result.pinyin}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-4 mt-auto">
        <Button
          onClick={onRestart}
          className="w-full h-14 text-lg bg-white text-[#FF6B6B] hover:bg-white/90 rounded-2xl shadow-xl"
        >
          🔄 다시 도전하기
        </Button>
        <Button
          onClick={onHome}
          variant="outline"
          className="w-full h-14 text-lg bg-transparent text-white border-white hover:bg-white/20 rounded-2xl"
        >
          🏠 홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}