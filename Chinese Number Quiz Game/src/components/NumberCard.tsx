import { useState } from "react";
import { motion } from "motion/react";
import { ChineseNumber } from "../types/game";

interface NumberCardProps {
  number: ChineseNumber;
}

export function NumberCard({ number }: NumberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-80 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side - Number */}
        <div 
          className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center border-4 border-[#FF6B6B]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-8xl font-bold text-[#FF6B6B] mb-4">
            {number.number}
          </div>
          <div className="text-lg text-gray-500 mb-8">
            이 숫자를 중국어로?
          </div>
          <div className="text-sm text-gray-400 text-center px-6">
            카드를 탭해서 답을 확인하세요
          </div>
          <div className="absolute bottom-4 right-4 text-2xl">
            🔄
          </div>
        </div>

        {/* Back Side - Chinese */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4] to-[#4ECDC4]/80 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white border-4 border-[#4ECDC4]"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="text-8xl font-bold mb-4 font-['Noto_Sans_SC']">
            {number.chinese}
          </div>
          <div className="text-2xl mb-2 opacity-90">
            {number.pinyin}
          </div>
          <div className="text-lg opacity-80 mb-8">
            {number.number}
          </div>
          <div className="text-sm opacity-70 text-center px-6">
            다시 탭해서 숫자 보기
          </div>
          <div className="absolute bottom-4 right-4 text-2xl">
            🔄
          </div>
        </div>
      </motion.div>

      {/* Flip Indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
        {isFlipped ? "한자 면" : "숫자 면"}
      </div>
    </div>
  );
}