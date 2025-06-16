import { createContext, useContext, useState } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Header
    'site.title': 'أدوات حسابية يومية',
    'site.description': 'مجموعة شاملة من الأدوات الحسابية المجانية للاستخدام اليومي',
    'tools.select': 'اختر الأداة المناسبة لك',
    
    // Tools
    'age-calculator.title': 'حاسبة العمر',
    'age-calculator.desc': 'احسب عمرك بدقة بالسنوات والشهور والأيام',
    'date-converter.title': 'تحويل التاريخ',
    'date-converter.desc': 'تحويل بين التاريخ الهجري والميلادي',
    'bmi-calculator.title': 'حاسبة BMI',
    'bmi-calculator.desc': 'احسب مؤشر كتلة الجسم والوزن المثالي',
    'percentage-calculator.title': 'حاسبة النسبة المئوية',
    'percentage-calculator.desc': 'احسب النسب المئوية بطرق مختلفة',
    'random-generator.title': 'مولد الأرقام العشوائية',
    'random-generator.desc': 'توليد أرقام عشوائية بين رقمين',
    'countdown-timer.title': 'عداد تنازلي',
    'countdown-timer.desc': 'عداد تنازلي لأي تاريخ أو وقت',
    'date-difference.title': 'الفرق بين التواريخ',
    'date-difference.desc': 'احسب الفرق بين تاريخين بالأيام',
    'tax-calculator.title': 'حاسبة الضريبة',
    'tax-calculator.desc': 'احسب السعر بعد إضافة الضريبة',
    'sqrt-calculator.title': 'حاسبة الجذر التربيعي',
    'sqrt-calculator.desc': 'احسب الجذر التربيعي لأي رقم',
    'gpa-calculator.title': 'حاسبة المعدل التراكمي',
    'gpa-calculator.desc': 'احسب معدلك التراكمي GPA',
    'unit-converter.title': 'محول الوحدات',
    'unit-converter.desc': 'تحويل بين وحدات القياس المختلفة',
    'password-generator.title': 'مولد كلمات المرور',
    'password-generator.desc': 'إنشاء كلمات مرور قوية وآمنة',
    'text-encoder.title': 'مشفر النصوص',
    'text-encoder.desc': 'تشفير وفك تشفير النصوص بطرق مختلفة',
    'color-palette.title': 'منتقي الألوان',
    'color-palette.desc': 'اختيار الألوان وتحويل بين أنظمة الألوان',
    
    // Sections
    'about.title': 'من نحن',
    'contact.title': 'اتصل بنا',
    'ads.text': 'منطقة إعلانية - يمكن وضع Google AdSense هنا',
    
    // Language toggle
    'lang.switch': 'English',
  },
  en: {
    // Header
    'site.title': 'Daily Calculator Tools',
    'site.description': 'A comprehensive collection of free calculator tools for daily use',
    'tools.select': 'Choose the right tool for you',
    
    // Tools
    'age-calculator.title': 'Age Calculator',
    'age-calculator.desc': 'Calculate your age accurately in years, months, and days',
    'date-converter.title': 'Date Converter',
    'date-converter.desc': 'Convert between Hijri and Gregorian dates',
    'bmi-calculator.title': 'BMI Calculator',
    'bmi-calculator.desc': 'Calculate body mass index and ideal weight',
    'percentage-calculator.title': 'Percentage Calculator',
    'percentage-calculator.desc': 'Calculate percentages in different ways',
    'random-generator.title': 'Random Number Generator',
    'random-generator.desc': 'Generate random numbers between two values',
    'countdown-timer.title': 'Countdown Timer',
    'countdown-timer.desc': 'Countdown timer for any date or time',
    'date-difference.title': 'Date Difference',
    'date-difference.desc': 'Calculate the difference between two dates in days',
    'tax-calculator.title': 'Tax Calculator',
    'tax-calculator.desc': 'Calculate price after adding tax',
    'sqrt-calculator.title': 'Square Root Calculator',
    'sqrt-calculator.desc': 'Calculate the square root of any number',
    'gpa-calculator.title': 'GPA Calculator',
    'gpa-calculator.desc': 'Calculate your cumulative GPA',
    'unit-converter.title': 'Unit Converter',
    'unit-converter.desc': 'Convert between different units of measurement',
    'password-generator.title': 'Password Generator',
    'password-generator.desc': 'Generate strong and secure passwords',
    'text-encoder.title': 'Text Encoder',
    'text-encoder.desc': 'Encrypt and decrypt text using various methods',
    'color-palette.title': 'Color Picker',
    'color-palette.desc': 'Pick colors and convert between color systems',
    
    // Sections
    'about.title': 'About Us',
    'contact.title': 'Contact Us',
    'ads.text': 'Advertisement Area - Google AdSense can be placed here',
    
    // Language toggle
    'lang.switch': 'العربية',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  const contextValue = {
    language,
    setLanguage: (lang: Language) => {
      setLanguage(lang);
      // Update document direction
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    },
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}