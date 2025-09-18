import { ChineseNumber } from '../types/game';

// Basic Chinese digits
const basicDigits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const basicPinyin = ['líng', 'yī', 'èr', 'sān', 'sì', 'wǔ', 'liù', 'qī', 'bā', 'jiǔ'];

// Generate Chinese number representation
function generateChineseNumber(num: number): { chinese: string; pinyin: string } {
  if (num === 0) {
    return { chinese: '零', pinyin: 'líng' };
  }

  let chinese = '';
  let pinyin = '';

  // Handle hundreds (100-500)
  if (num >= 100) {
    const hundreds = Math.floor(num / 100);
    chinese += basicDigits[hundreds] + '百';
    pinyin += basicPinyin[hundreds] + ' bǎi';
    
    const remainder = num % 100;
    if (remainder === 0) {
      return { chinese, pinyin };
    } else if (remainder < 10) {
      // Add 零 for numbers like 101, 102, etc.
      chinese += '零' + basicDigits[remainder];
      pinyin += ' líng ' + basicPinyin[remainder];
      return { chinese, pinyin };
    } else {
      // Continue with tens and units
      num = remainder;
      if (pinyin) pinyin += ' ';
    }
  }

  // Handle tens (10-99)
  if (num >= 10) {
    const tens = Math.floor(num / 10);
    if (tens === 1 && num < 20 && !chinese) {
      // Special case for 10-19 when not following hundreds
      chinese += '十';
      pinyin += 'shí';
    } else {
      chinese += basicDigits[tens] + '十';
      pinyin += basicPinyin[tens] + ' shí';
    }

    const units = num % 10;
    if (units > 0) {
      chinese += basicDigits[units];
      pinyin += ' ' + basicPinyin[units];
    }
  } else if (num > 0) {
    // Handle units (1-9)
    chinese += basicDigits[num];
    pinyin += basicPinyin[num];
  }

  return { chinese, pinyin };
}

// Generate all numbers from 0 to 500
export const chineseNumbers: ChineseNumber[] = [];

for (let i = 0; i <= 500; i++) {
  const { chinese, pinyin } = generateChineseNumber(i);
  chineseNumbers.push({
    number: i,
    chinese,
    pinyin
  });
}

export function getRandomNumbers(count: number): ChineseNumber[] {
  const shuffled = [...chineseNumbers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function generateQuestions(count: number): import('../types/game').Question[] {
  const selectedNumbers = getRandomNumbers(count);
  
  return selectedNumbers.map((num, index) => {
    const isNumberToChinese = Math.random() > 0.5;
    const otherNumbers = chineseNumbers.filter(n => n.number !== num.number);
    const wrongOptions = otherNumbers.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    if (isNumberToChinese) {
      return {
        id: `q-${index}`,
        number: num.number,
        chinese: num.chinese,
        pinyin: num.pinyin,
        type: 'number-to-chinese' as const,
        options: [num.chinese, ...wrongOptions.map(n => n.chinese)].sort(() => 0.5 - Math.random()),
        correctAnswer: num.chinese
      };
    } else {
      return {
        id: `q-${index}`,
        number: num.number,
        chinese: num.chinese,
        pinyin: num.pinyin,
        type: 'chinese-to-number' as const,
        options: [num.number.toString(), ...wrongOptions.map(n => n.number.toString())].sort(() => 0.5 - Math.random()),
        correctAnswer: num.number.toString()
      };
    }
  });
}