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
