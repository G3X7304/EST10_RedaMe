import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { NumberCard } from "./NumberCard";
import { chineseNumbers } from "../data/numbers";

interface StudyModeProps {
  onBack: () => void;
}

export function StudyMode({ onBack }: StudyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numbers, setNumbers] = useState(chineseNumbers);

  const handlePrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : numbers.length - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < numbers.length - 1 ? prev + 1 : 0);
  };

  const handleShuffle = () => {
    const shuffled = [...numbers].sort(() => 0.5 - Math.random());
    setNumbers(shuffled);
    setCurrentIndex(0);
  };

  const currentNumber = numbers[currentIndex];

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
          <div className="text-sm opacity-80">학습 모드</div>
          <div className="font-bold">
            {currentIndex + 1} / {numbers.length}
          </div>
        </div>
        <Button
          onClick={handleShuffle}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-full"
        >
          <Shuffle className="h-6 w-6" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-1">
          {numbers.slice(Math.max(0, currentIndex - 2), Math.min(numbers.length, currentIndex + 3)).map((_, index) => {
            const actualIndex = Math.max(0, currentIndex - 2) + index;
            return (
              <div
                key={actualIndex}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  actualIndex === currentIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/40'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <NumberCard number={currentNumber} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          onClick={handlePrevious}
          variant="ghost"
          className="flex items-center space-x-2 text-white hover:bg-white/20 rounded-2xl px-6 py-3"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>이전</span>
        </Button>

        <div className="text-white/70 text-sm text-center">
          <div>카드를 탭해서 뒤집어보세요</div>
          <div className="text-xs mt-1">좌우로 스와이프하여 탐색</div>
        </div>

        <Button
          onClick={handleNext}
          variant="ghost"
          className="flex items-center space-x-2 text-white hover:bg-white/20 rounded-2xl px-6 py-3"
        >
          <span>다음</span>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Number Grid Preview */}
      <div className="mt-6 bg-white/20 rounded-2xl p-4">
        <div className="text-white text-sm text-center mb-3">빠른 탐색 (0-50)</div>
        <div className="grid grid-cols-10 gap-1">
          {numbers.slice(0, 50).map((num, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white text-[#FF6B6B]'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              {num.number}
            </button>
          ))}
        </div>
        <div className="text-center text-white/70 text-xs mt-2">
          총 {numbers.length}개 숫자 (0-500)
        </div>
      </div>
    </div>
  );
}