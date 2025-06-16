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
    // Basic Hijri approximation (you would use a proper library in production)
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
      // Convert percentage to 4.0 scale (basic conversion)
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
      nauticalMile: 0.000539957,
      lightyear: 1.057e-16,
      parsec: 3.24e-17,
      furlong: 0.00497097,
      rod: 0.198839,
      chain: 0.0497097,
      link: 4.97097,
      hand: 9.84252,
      span: 4.37445,
      cubit: 2.18723,
      fathom: 0.546807,
      league: 0.000207124
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
      stone: 0.157473,
      carat: 5000,
      grain: 15432.4,
      dram: 564.383,
      hundredweight: 0.0196841,
      quarter: 0.00787365,
      slug: 0.0685218,
      pennyweight: 643.015,
      troy_ounce: 32.1507,
      troy_pound: 2.67923,
      atomic_mass: 6.022e26,
      dalton: 6.022e26,
      electronvolt: 5.61e35,
      planck_mass: 4.59e7,
      solar_mass: 5.03e-31
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
    // Generate word-based password
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
  
  // Length scoring
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 15;
  if (password.length >= 16) strength += 10;
  
  // Character variety
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[a-z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^A-Za-z0-9]/.test(password)) strength += 20;
  
  // Penalty for common patterns
  if (/(.)\1{2,}/.test(password)) strength -= 10; // Repeated characters
  if (/123|abc|qwe/i.test(password)) strength -= 15; // Sequential patterns
  
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

export function encodeText(text: string, method: string) {
  switch (method) {
    case 'caesar':
      // Caesar cipher (shift by 3)
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base + 3) % 26) + base);
        }
        return char;
      }).join('');
    
    case 'lol':
      // LOL cipher (letters to numbers)
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
      // Atbash cipher (A=Z, B=Y, etc.)
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
    
    default:
      return text;
  }
}

export function decodeText(text: string, method: string) {
  switch (method) {
    case 'caesar':
      // Caesar cipher decode (shift by -3)
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base - 3 + 26) % 26) + base);
        }
        return char;
      }).join('');
    
    case 'lol':
      // LOL cipher decode
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
      // Atbash is its own inverse
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
    
    default:
      return text;
  }
}

export function convertColor(color: string, fromFormat: string, toFormat: string) {
  // Basic color conversion functions
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  if (fromFormat === 'hex' && toFormat === 'rgb') {
    const rgb = hexToRgb(color);
    return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'خطأ في التحويل';
  }

  return 'تحويل غير مدعوم حالياً';
}
