import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface ModeSelectionProps {
  onSelectQuiz: () => void;
  onSelectStudy: () => void;
  onBack: () => void;
}

export function ModeSelection({ onSelectQuiz, onSelectStudy, onBack }: ModeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex flex-col p-6">
      <div className="flex items-center mb-8">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white ml-4">
          모드 선택
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6 max-w-md mx-auto w-full">
        <div 
          onClick={onSelectQuiz}
          className="bg-white rounded-3xl p-8 shadow-2xl cursor-pointer hover:scale-105 transition-all duration-200 border-4 border-transparent hover:border-white/50"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-[#FF6B6B] mb-2">
              퀴즈 모드
            </h2>
            <p className="text-gray-600 mb-4">
              10개의 문제를 풀고<br />실력을 테스트해보세요
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>⏱️ 5분</span>
              <span>📊 점수 기록</span>
              <span>🏆 순위</span>
            </div>
          </div>
        </div>

        <div 
          onClick={onSelectStudy}
          className="bg-white rounded-3xl p-8 shadow-2xl cursor-pointer hover:scale-105 transition-all duration-200 border-4 border-transparent hover:border-white/50"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-[#4ECDC4] mb-2">
              학습 모드
            </h2>
            <p className="text-gray-600 mb-4">
              카드를 넘기며<br />천천히 학습해보세요
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>🔄 플립 카드</span>
              <span>🔊 발음</span>
              <span>♾️ 무제한</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-white/70 text-sm mt-8">
        자신에게 맞는 학습 방법을 선택하세요
      </div>
    </div>
  );
}