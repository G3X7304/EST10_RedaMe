import { Button } from "./ui/button";

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <div className="text-8xl mb-6">🎯</div>
        <h1 className="text-5xl font-bold text-white mb-4">
          중국어 숫자 퀴즈
        </h1>
        <p className="text-xl text-white/90 mb-2">
          한자 숫자 학습 게임
        </p>
        <p className="text-base text-white/80">
          재미있게 중국어 숫자를 배워보세요!
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <Button
          onClick={onStart}
          className="w-full h-16 text-xl bg-white text-[#FF6B6B] hover:bg-white/90 hover:scale-105 transition-all duration-200 rounded-2xl shadow-xl border-0"
        >
          🚀 시작하기
        </Button>
        
        <div className="text-center text-white/70 text-sm">
          0~500까지의 중국어 숫자 학습
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-4 text-center text-white/60 text-sm">
        <div>
          <div className="text-2xl mb-1">📚</div>
          <div>학습 모드</div>
        </div>
        <div>
          <div className="text-2xl mb-1">🎮</div>
          <div>퀴즈 게임</div>
        </div>
        <div>
          <div className="text-2xl mb-1">🏆</div>
          <div>점수 기록</div>
        </div>
      </div>
    </div>
  );
}