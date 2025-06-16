export function calculateAge(birthDate: string) {
  const birth = new Date(birthDate);
  const today = new Date();
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

  return { years, months, days, totalDays };
}

export function convertDate(date: string, type: string) {
  const inputDate = new Date(date);
  
  if (type === 'gregorian-to-hijri') {
    const hijriYear = Math.floor((inputDate.getFullYear() - 622) * 1.030684);
    return {
      convertedDate: `التاريخ الهجري التقريبي: ${hijriYear}/${inputDate.getMonth() + 1}/${inputDate.getDate()}`
    };
  } else {
    return {
      convertedDate: `التاريخ الميلادي: ${inputDate.toLocaleDateString('ar-SA')}`
    };
  }
}

export function calculateBMI(weight: number, height: number) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category = '';
  let colorClass = '';
  if (bmi < 18.5) {
    category = 'نقص في الوزن';
    colorClass = 'text-blue-600';
  } else if (bmi < 25) {
    category = 'وزن طبيعي';
    colorClass = 'text-green-600';
  } else if (bmi < 30) {
    category = 'زيادة في الوزن';
    colorClass = 'text-yellow-600';
  } else {
    category = 'سمنة';
    colorClass = 'text-red-600';
  }

  return {
    bmi: bmi.toFixed(1),
    category,
    colorClass
  };
}

export function calculatePercentage(number: number, total: number) {
  const percentage = (number / total) * 100;
  return {
    percentage: percentage.toFixed(2),
    calculation: `${number} من ${total} = ${percentage.toFixed(2)}%`
  };
}

export function generateRandomNumber(min: number, max: number) {
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return {
    number: randomNum,
    min,
    max
  };
}

export function calculateDateDifference(date1: string, date2: string) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const timeDifference = Math.abs(d2.getTime() - d1.getTime());
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
  const weeks = Math.floor(daysDifference / 7);
  const remainingDays = daysDifference % 7;

  return {
    days: daysDifference,
    weeks,
    remainingDays
  };
}

export function calculateTax(basePrice: number, taxRate: number) {
  const taxAmount = (basePrice * taxRate) / 100;
  const totalPrice = basePrice + taxAmount;

  return {
    basePrice: basePrice.toFixed(2),
    taxRate: taxRate.toFixed(2),
    taxAmount: taxAmount.toFixed(2),
    totalPrice: totalPrice.toFixed(2)
  };
}

export function calculateSquareRoot(number: number) {
  const result = Math.sqrt(number);
  const isExact = number === Math.pow(Math.floor(result), 2);
  
  return {
    number,
    result: result.toFixed(6),
    note: isExact ? '✓ هذا الرقم له جذر تربيعي صحيح' : 'القيمة مقربة إلى 6 منازل عشرية'
  };
}

export function calculateGPA(courses: Array<{ grade: number; hours: number }>) {
  let totalPoints = 0;
  let totalHours = 0;
  let validCourses = 0;

  courses.forEach(course => {
    if (course.grade > 0 && course.hours > 0) {
      let gpaPoints;
      if (course.grade >= 90) gpaPoints = 4.0;
      else if (course.grade >= 80) gpaPoints = 3.0;
      else if (course.grade >= 70) gpaPoints = 2.0;
      else if (course.grade >= 60) gpaPoints = 1.0;
      else gpaPoints = 0.0;
      
      totalPoints += gpaPoints * course.hours;
      totalHours += course.hours;
      validCourses++;
    }
  });

  const gpa = totalPoints / totalHours;

  return {
    gpa: gpa.toFixed(2),
    validCourses,
    totalHours
  };
}

export function convertUnits(value: number, fromUnit: string, toUnit: string, category: string) {
  const conversions: { [key: string]: { [key: string]: number } } = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      inch: 39.3701,
      foot: 3.28084,
      yard: 1.09361,
      mile: 0.000621371,
      nauticalMile: 0.000539957
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
      stone: 0.157473
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675,
      fluidOunce: 33.814,
      tablespoon: 67.628,
      teaspoon: 202.884,
      cubicMeter: 0.001,
      cubicCentimeter: 1000
    },
    area: {
      squareMeter: 1,
      squareKilometer: 0.000001,
      squareCentimeter: 10000,
      squareMillimeter: 1000000,
      squareFoot: 10.7639,
      squareInch: 1550.0031,
      squareYard: 1.19599,
      acre: 0.000247105,
      hectare: 0.0001
    },
    numbers: {
      units: 1,
      tens: 0.1,
      hundreds: 0.01,
      thousands: 0.001,
      tenThousands: 0.0001,
      hundredThousands: 0.00001,
      millions: 0.000001
    }
  };

  if (category === 'temperature') {
    let result = value;
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      result = (value * 9/5) + 32;
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
      result = value + 273.15;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      result = (value - 32) * 5/9;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
      result = ((value - 32) * 5/9) + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
      result = value - 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
      result = ((value - 273.15) * 9/5) + 32;
    }
    
    return {
      result: result.toFixed(2),
      fromValue: value,
      fromUnit,
      toUnit
    };
  } else {
    const categoryConversions = conversions[category];
    if (categoryConversions && categoryConversions[fromUnit] && categoryConversions[toUnit]) {
      const baseValue = value / categoryConversions[fromUnit];
      const result = baseValue * categoryConversions[toUnit];
      return {
        result: result.toFixed(6),
        fromValue: value,
        fromUnit,
        toUnit
      };
    }
  }

  return { error: 'تحويل غير مدعوم' };
}

export function generatePassword(length: number, options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean; useWords: boolean }) {
  const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  const commonWords = [
    'apple', 'cloud', 'house', 'ocean', 'mountain', 'bridge', 'garden', 'forest', 
    'river', 'sunset', 'flower', 'castle', 'dragon', 'wizard', 'knight', 'tiger',
    'eagle', 'dolphin', 'thunder', 'rainbow', 'crystal', 'silver', 'golden', 'diamond'
  ];

  if (options.useWords && length >= 8) {
    const word = commonWords[Math.floor(Math.random() * commonWords.length)];
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    const numbers = Math.floor(Math.random() * 999) + 1;
    const symbols = options.symbols ? chars.symbols[Math.floor(Math.random() * chars.symbols.length)] : '';
    const password = capitalizedWord + numbers + symbols;
    
    return {
      password,
      strength: calculatePasswordStrength(password, length),
      strengthText: getStrengthText(calculatePasswordStrength(password, length)),
      length: password.length,
      type: 'word-based'
    };
  }

  let characterPool = '';
  if (options.uppercase) characterPool += chars.uppercase;
  if (options.lowercase) characterPool += chars.lowercase;
  if (options.numbers) characterPool += chars.numbers;
  if (options.symbols) characterPool += chars.symbols;

  if (!characterPool) {
    return { error: 'يجب اختيار نوع واحد على الأقل من الأحرف' };
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += characterPool.charAt(Math.floor(Math.random() * characterPool.length));
  }

  const strength = calculatePasswordStrength(password, length);

  return {
    password,
    strength,
    strengthText: getStrengthText(strength),
    length: password.length,
    type: 'random'
  };
}

function calculatePasswordStrength(password: string, minLength: number): number {
  let strength = 0;
  
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 15;
  if (password.length >= 16) strength += 10;
  
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[a-z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^A-Za-z0-9]/.test(password)) strength += 20;
  
  if (/(.)\1{2,}/.test(password)) strength -= 10;
  if (/123|abc|qwe/i.test(password)) strength -= 15;
  
  return Math.min(100, Math.max(0, strength));
}

function getStrengthText(strength: number): string {
  if (strength >= 90) return 'ممتازة';
  if (strength >= 75) return 'قوية جداً';
  if (strength >= 60) return 'قوية';
  if (strength >= 40) return 'متوسطة';
  if (strength >= 25) return 'ضعيفة';
  return 'ضعيفة جداً';
}

function generateSalt(length: number): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function encodeBMO(text: string): string {
  const timestamp = Date.now().toString();
  const salt = generateSalt(8);
  
  let stage1 = text.split('').map((char, index) => {
    const code = char.charCodeAt(0);
    const noise = (index * 7 + parseInt(salt[index % salt.length], 16)) % 256;
    return (code + noise).toString(16).padStart(4, '0');
  }).join('');
  
  let stage2 = '';
  for (let i = 0; i < stage1.length; i++) {
    const char = stage1[i];
    const keyIndex = (i + parseInt(timestamp.slice(-3))) % 16;
    const key = parseInt(timestamp[keyIndex], 10) || 1;
    const encrypted = (char.charCodeAt(0) ^ key).toString(16);
    stage2 += encrypted.padStart(2, '0');
  }
  
  const header = `${salt}${timestamp.slice(-6)}`;
  const body = stage2;
  
  let final = header + body;
  final = final.split('').map((char, i) => {
    const shift = (i % 5) + 1;
    return String.fromCharCode(char.charCodeAt(0) + shift);
  }).join('');
  
  final = btoa(final).replace(/\+/g, '_').replace(/\//g, '-').replace(/=/g, '');
  
  return `BMO${final}END`;
}

function decodeBMO(encryptedText: string): string {
  try {
    if (!encryptedText.startsWith('BMO') || !encryptedText.endsWith('END')) {
      return 'خطأ: نص غير مشفر بـ BMO';
    }
    
    let encrypted = encryptedText.slice(3, -3);
    
    encrypted = encrypted.replace(/_/g, '+').replace(/-/g, '/');
    while (encrypted.length % 4) encrypted += '=';
    encrypted = atob(encrypted);
    
    encrypted = encrypted.split('').map((char, i) => {
      const shift = (i % 5) + 1;
      return String.fromCharCode(char.charCodeAt(0) - shift);
    }).join('');
    
    const salt = encrypted.slice(0, 8);
    const timestamp = encrypted.slice(8, 14);
    const body = encrypted.slice(14);
    
    let stage2 = '';
    for (let i = 0; i < body.length; i += 2) {
      const encryptedByte = parseInt(body.slice(i, i + 2), 16);
      const keyIndex = (i / 2 + parseInt(timestamp)) % 16;
      const key = parseInt(timestamp[keyIndex % timestamp.length], 10) || 1;
      const decrypted = encryptedByte ^ key;
      stage2 += String.fromCharCode(decrypted);
    }
    
    let result = '';
    for (let i = 0; i < stage2.length; i += 4) {
      const hexCode = stage2.slice(i, i + 4);
      const code = parseInt(hexCode, 16);
      const index = i / 4;
      const noise = (index * 7 + parseInt(salt[index % salt.length], 16)) % 256;
      const originalChar = code - noise;
      result += String.fromCharCode(originalChar);
    }
    
    return result;
  } catch (error) {
    return 'خطأ في فك تشفير BMO';
  }
}

function autoDetectAndDecode(text: string): string {
  const detectionResults: Array<{method: string, result: string, confidence: number}> = [];
  
  if (text.startsWith('BMO') && text.endsWith('END')) {
    const result = decodeBMO(text);
    if (!result.startsWith('خطأ')) {
      detectionResults.push({method: 'BMO', result, confidence: 95});
    }
  }
  
  try {
    const base64Result = atob(text);
    if (base64Result.length > 0 && /^[\x20-\x7E\u0600-\u06FF\s]*$/.test(base64Result)) {
      detectionResults.push({method: 'Base64', result: base64Result, confidence: 80});
    }
  } catch {}
  
  for (let shift = 1; shift <= 25; shift++) {
    const result = text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base - shift + 26) % 26) + base);
      }
      return char;
    }).join('');
    
    const englishWords = /\b(the|and|or|in|on|at|to|for|of|with|by)\b/i;
    const arabicWords = /\b(في|من|إلى|على|مع|هذا|هذه|ذلك|تلك)\b/;
    
    if (englishWords.test(result) || arabicWords.test(result)) {
      detectionResults.push({method: `Caesar (${shift})`, result, confidence: 60});
    }
  }
  
  const atbashResult = text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const isUpper = code >= 65 && code <= 90;
      const base = isUpper ? 65 : 97;
      return String.fromCharCode((25 - (code - base)) + base);
    }
    return char;
  }).join('');
  
  if (atbashResult !== text) {
    detectionResults.push({method: 'Atbash', result: atbashResult, confidence: 50});
  }
  
  if (text.includes('-') && /^[\d-]+$/.test(text)) {
    const lolResult = text.split('-').map(part => {
      const num = parseInt(part);
      if (num >= 1 && num <= 26) {
        return String.fromCharCode(num + 96);
      }
      return part;
    }).join('');
    
    if (lolResult !== text) {
      detectionResults.push({method: 'LOL', result: lolResult, confidence: 70});
    }
  }
  
  const reverseResult = text.split('').reverse().join('');
  if (reverseResult !== text) {
    detectionResults.push({method: 'Reverse', result: reverseResult, confidence: 40});
  }
  
  detectionResults.sort((a, b) => b.confidence - a.confidence);
  
  if (detectionResults.length > 0) {
    const best = detectionResults[0];
    let output = `🔍 تم اكتشاف التشفير تلقائياً!\n\n`;
    output += `طريقة التشفير: ${best.method}\n`;
    output += `مستوى الثقة: ${best.confidence}%\n\n`;
    output += `النص المفكوك:\n${best.result}\n\n`;
    
    if (detectionResults.length > 1) {
      output += `احتمالات أخرى:\n`;
      detectionResults.slice(1, 3).forEach(result => {
        output += `• ${result.method} (${result.confidence}%): ${result.result.slice(0, 50)}${result.result.length > 50 ? '...' : ''}\n`;
      });
    }
    
    return output;
  }
  
  return 'لم يتم التعرف على نوع التشفير. قد يكون النص غير مشفر أو يستخدم طريقة تشفير غير مدعومة.';
}

export function encodeText(text: string, method: string) {
  switch (method) {
    case 'caesar':
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base + 3) % 26) + base);
        }
        return char;
      }).join('');
    
    case 'lol':
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          return char.toLowerCase().charCodeAt(0) - 96;
        }
        return char;
      }).join('-');
    
    case 'base64':
      return btoa(text);
    
    case 'reverse':
      return text.split('').reverse().join('');
    
    case 'atbash':
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpper = code >= 65 && code <= 90;
          const base = isUpper ? 65 : 97;
          const newChar = String.fromCharCode((25 - (code - base)) + base);
          return newChar;
        }
        return char;
      }).join('');
    
    case 'bmo':
      return encodeBMO(text);
    
    default:
      return text;
  }
}

export function decodeText(text: string, method: string) {
  switch (method) {
    case 'caesar':
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base - 3 + 26) % 26) + base);
        }
        return char;
      }).join('');
    
    case 'lol':
      return text.split('-').map(part => {
        const num = parseInt(part);
        if (num >= 1 && num <= 26) {
          return String.fromCharCode(num + 96);
        }
        return part;
      }).join('');
    
    case 'base64':
      try {
        return atob(text);
      } catch {
        return 'خطأ في فك التشفير';
      }
    
    case 'reverse':
      return text.split('').reverse().join('');
    
    case 'atbash':
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpper = code >= 65 && code <= 90;
          const base = isUpper ? 65 : 97;
          const newChar = String.fromCharCode((25 - (code - base)) + base);
          return newChar;
        }
        return char;
      }).join('');
    
    case 'bmo':
      return decodeBMO(text);
    
    case 'auto':
      return autoDetectAndDecode(text);
    
    default:
      return text;
  }
}

export function generateDetectorCode(): string {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 8);
  const checksum = (timestamp + randomPart.charCodeAt(0)).toString(16);
  
  return `DTC-${randomPart}-${checksum}`;
}

export function validateDetectorCode(code: string): boolean {
  if (!code.startsWith('DTC-')) return false;
  
  const parts = code.split('-');
  if (parts.length !== 3) return false;
  
  const randomPart = parts[1];
  const providedChecksum = parts[2];
  
  return randomPart.length === 6 && providedChecksum.length >= 2;
}

export function convertColor(color: string, fromFormat: string, toFormat: string) {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  if (fromFormat === 'hex' && toFormat === 'rgb') {
    const rgb = hexToRgb(color);
    return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'خطأ في التحويل';
  }

  return 'تحويل غير مدعوم حالياً';
}