import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  calculateAge, 
  convertDate, 
  calculateBMI, 
  calculatePercentage, 
  generateRandomNumber, 
  calculateDateDifference, 
  calculateTax, 
  calculateSquareRoot, 
  calculateGPA 
} from "@/lib/calculations";

interface CalculatorModalProps {
  toolId: string;
  onClose: () => void;
}

interface GPACourse {
  grade: number;
  hours: number;
}

export default function CalculatorModal({ toolId, onClose }: CalculatorModalProps) {
  const [result, setResult] = useState<any>(null);
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timeout | null>(null);
  const [gpaCourses, setGpaCourses] = useState<GPACourse[]>([{ grade: 0, hours: 0 }]);

  useEffect(() => {
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [countdownInterval]);

  const handleAgeCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const birthDate = formData.get("birthDate") as string;
    
    if (!birthDate) {
      alert("يرجى إدخال تاريخ الميلاد");
      return;
    }

    const ageResult = calculateAge(birthDate);
    setResult(ageResult);
  };

  const handleDateConversion = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const date = formData.get("date") as string;
    const type = formData.get("type") as string;
    
    if (!date) {
      alert("يرجى إدخال التاريخ");
      return;
    }

    const dateResult = convertDate(date, type);
    setResult(dateResult);
  };

  const handleBMICalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const weight = parseFloat(formData.get("weight") as string);
    const height = parseFloat(formData.get("height") as string);
    
    if (!weight || !height || weight <= 0 || height <= 0) {
      alert("يرجى إدخال الوزن والطول بشكل صحيح");
      return;
    }

    const bmiResult = calculateBMI(weight, height);
    setResult(bmiResult);
  };

  const handlePercentageCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const number = parseFloat(formData.get("number") as string);
    const total = parseFloat(formData.get("total") as string);
    
    if (isNaN(number) || isNaN(total) || total === 0) {
      alert("يرجى إدخال أرقام صحيحة");
      return;
    }

    const percentResult = calculatePercentage(number, total);
    setResult(percentResult);
  };

  const handleRandomGeneration = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const min = parseInt(formData.get("min") as string);
    const max = parseInt(formData.get("max") as string);
    
    if (isNaN(min) || isNaN(max) || min >= max) {
      alert("يرجى إدخال حد أدنى وأعلى صحيحين");
      return;
    }

    const randomResult = generateRandomNumber(min, max);
    setResult(randomResult);
  };

  const handleCountdown = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const targetDateTime = formData.get("targetDateTime") as string;
    
    if (!targetDateTime) {
      alert("يرجى اختيار تاريخ ووقت");
      return;
    }

    const targetDate = new Date(targetDateTime);
    if (targetDate <= new Date()) {
      alert("يرجى اختيار تاريخ ووقت في المستقبل");
      return;
    }

    if (countdownInterval) clearInterval(countdownInterval);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setResult({ finished: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setResult({ days, hours, minutes, seconds, finished: false });
    }, 1000);

    setCountdownInterval(interval);
  };

  const handleDateDifference = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const date1 = formData.get("date1") as string;
    const date2 = formData.get("date2") as string;
    
    if (!date1 || !date2) {
      alert("يرجى إدخال التاريخين");
      return;
    }

    const diffResult = calculateDateDifference(date1, date2);
    setResult(diffResult);
  };

  const handleTaxCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const basePrice = parseFloat(formData.get("basePrice") as string);
    const taxRate = parseFloat(formData.get("taxRate") as string);
    
    if (isNaN(basePrice) || isNaN(taxRate) || basePrice < 0 || taxRate < 0) {
      alert("يرجى إدخال قيم صحيحة");
      return;
    }

    const taxResult = calculateTax(basePrice, taxRate);
    setResult(taxResult);
  };

  const handleSqrtCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const number = parseFloat(formData.get("number") as string);
    
    if (isNaN(number) || number < 0) {
      alert("يرجى إدخال رقم صحيح (غير سالب)");
      return;
    }

    const sqrtResult = calculateSquareRoot(number);
    setResult(sqrtResult);
  };

  const handleGPACalculation = () => {
    const validCourses = gpaCourses.filter(course => course.grade > 0 && course.hours > 0);
    
    if (validCourses.length === 0) {
      alert("يرجى إدخال درجات وساعات صحيحة لمادة واحدة على الأقل");
      return;
    }

    const gpaResult = calculateGPA(validCourses);
    setResult(gpaResult);
  };

  const addGPACourse = () => {
    setGpaCourses([...gpaCourses, { grade: 0, hours: 0 }]);
  };

  const updateGPACourse = (index: number, field: 'grade' | 'hours', value: number) => {
    const newCourses = [...gpaCourses];
    newCourses[index][field] = value;
    setGpaCourses(newCourses);
  };

  const removeGPACourse = (index: number) => {
    if (gpaCourses.length > 1) {
      setGpaCourses(gpaCourses.filter((_, i) => i !== index));
    }
  };

  const renderCalculator = () => {
    switch (toolId) {
      case "age-calculator":
        return (
          <div className="space-y-4">
            <form onSubmit={handleAgeCalculation} className="space-y-4">
              <div>
                <Label>تاريخ ميلادك</Label>
                <Input type="date" name="birthDate" required />
              </div>
              <Button type="submit" className="w-full">احسب العمر</Button>
            </form>
            {result && (
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-blue-800 mb-3">نتيجة حساب العمر:</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">{result.years}</div>
                      <div className="text-sm text-gray-600">سنة</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">{result.months}</div>
                      <div className="text-sm text-gray-600">شهر</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">{result.days}</div>
                      <div className="text-sm text-gray-600">يوم</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-blue-700">
                    <p><strong>إجمالي الأيام:</strong> {result.totalDays.toLocaleString()} يوم</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "date-converter":
        return (
          <div className="space-y-4">
            <form onSubmit={handleDateConversion} className="space-y-4">
              <div>
                <Label>نوع التحويل</Label>
                <Select name="type" defaultValue="gregorian-to-hijri">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gregorian-to-hijri">ميلادي إلى هجري</SelectItem>
                    <SelectItem value="hijri-to-gregorian">هجري إلى ميلادي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>التاريخ</Label>
                <Input type="date" name="date" required />
              </div>
              <Button type="submit" className="w-full">تحويل التاريخ</Button>
            </form>
            {result && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <i className="fas fa-calendar-check text-emerald-600 text-2xl mb-3"></i>
                  <h4 className="font-semibold text-emerald-800 mb-2">نتيجة التحويل:</h4>
                  <p className="text-emerald-700">{result.convertedDate}</p>
                  <p className="text-sm text-emerald-600 mt-2">* هذا تحويل تقريبي للأغراض العامة</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "bmi-calculator":
        return (
          <div className="space-y-4">
            <form onSubmit={handleBMICalculation} className="space-y-4">
              <div>
                <Label>الوزن (كيلوجرام)</Label>
                <Input type="number" name="weight" placeholder="70" required />
              </div>
              <div>
                <Label>الطول (سنتيمتر)</Label>
                <Input type="number" name="height" placeholder="170" required />
              </div>
              <Button type="submit" className="w-full">احسب BMI</Button>
            </form>
            {result && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">{result.bmi}</div>
                  <div className={`text-lg font-semibold mb-3 ${result.colorClass}`}>{result.category}</div>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                    <p><strong>المرجع:</strong></p>
                    <p>أقل من 18.5: نقص في الوزن</p>
                    <p>18.5 - 24.9: وزن طبيعي</p>
                    <p>25 - 29.9: زيادة في الوزن</p>
                    <p>30 فأكثر: سمنة</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "percentage-calculator":
        return (
          <div className="space-y-4">
            <form onSubmit={handlePercentageCalculation} className="space-y-4">
              <div>
                <Label>الرقم</Label>
                <Input type="number" name="number" placeholder="50" required />
              </div>
              <div>
                <Label>من إجمالي</Label>
                <Input type="number" name="total" placeholder="200" required />
              </div>
              <Button type="submit" className="w-full">احسب النسبة</Button>
            </form>
            {result && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{result.percentage}%</div>
                  <p className="text-purple-700">{result.calculation}</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "random-generator":
        return (
          <div className="space-y-4">
            <form onSubmit={handleRandomGeneration} className="space-y-4">
              <div>
                <Label>الرقم الأدنى</Label>
                <Input type="number" name="min" placeholder="1" required />
              </div>
              <div>
                <Label>الرقم الأعلى</Label>
                <Input type="number" name="max" placeholder="100" required />
              </div>
              <Button type="submit" className="w-full">توليد رقم عشوائي</Button>
            </form>
            {result && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">{result.number}</div>
                  <p className="text-red-700">رقم عشوائي بين {result.min} و {result.max}</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "countdown-timer":
        return (
          <div className="space-y-4">
            <form onSubmit={handleCountdown} className="space-y-4">
              <div>
                <Label>التاريخ المستهدف</Label>
                <Input type="datetime-local" name="targetDateTime" required />
              </div>
              <Button type="submit" className="w-full">بدء العداد</Button>
            </form>
            {result && (
              <Card>
                <CardContent className="pt-6">
                  {result.finished ? (
                    <div className="text-2xl font-bold text-indigo-600 text-center">انتهى الوقت! 🎉</div>
                  ) : (
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div className="bg-indigo-50 rounded-lg p-3">
                        <div className="text-xl font-bold text-indigo-600">{result.days}</div>
                        <div className="text-xs text-gray-600">يوم</div>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-3">
                        <div className="text-xl font-bold text-indigo-600">{result.hours}</div>
                        <div className="text-xs text-gray-600">ساعة</div>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-3">
                        <div className="text-xl font-bold text-indigo-600">{result.minutes}</div>
                        <div className="text-xs text-gray-600">دقيقة</div>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-3">
                        <div className="text-xl font-bold text-indigo-600">{result.seconds}</div>
                        <div className="text-xs text-gray-600">ثانية</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "date-difference":
        return (
          <div className="space-y-4">
            <form onSubmit={handleDateDifference} className="space-y-4">
              <div>
                <Label>التاريخ الأول</Label>
                <Input type="date" name="date1" required />
              </div>
              <div>
                <Label>التاريخ الثاني</Label>
                <Input type="date" name="date2" required />
              </div>
              <Button type="submit" className="w-full">احسب الفرق</Button>
            </form>
            {result && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">{result.days}</div>
                  <p className="text-teal-700 mb-3">يوم</p>
                  <div className="bg-teal-50 rounded-lg p-3 text-sm">
                    <p className="text-teal-600"><strong>أو:</strong> {result.weeks} أسبوع و {result.remainingDays} أيام</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "tax-calculator":
        return (
          <div className="space-y-4">
            <form onSubmit={handleTaxCalculation} className="space-y-4">
              <div>
                <Label>السعر الأساسي</Label>
                <Input type="number" name="basePrice" placeholder="100" step="0.01" required />
              </div>
              <div>
                <Label>نسبة الضريبة (%)</Label>
                <Input type="number" name="taxRate" placeholder="15" step="0.01" required />
              </div>
              <Button type="submit" className="w-full">احسب الضريبة</Button>
            </form>
            {result && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-gray-600">السعر الأساسي:</span>
                      <span className="font-semibold">{result.basePrice}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-gray-600">مبلغ الضريبة ({result.taxRate}%):</span>
                      <span className="font-semibold text-green-600">{result.taxAmount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-lg font-bold text-green-800">
                      <span>المجموع الكلي:</span>
                      <span>{result.totalPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "sqrt-calculator":
        return (
          <div className="space-y-4">
            <form onSubmit={handleSqrtCalculation} className="space-y-4">
              <div>
                <Label>الرقم</Label>
                <Input type="number" name="number" placeholder="16" min="0" required />
              </div>
              <Button type="submit" className="w-full">احسب الجذر التربيعي</Button>
            </form>
            {result && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{result.result}</div>
                  <p className="text-orange-700">√{result.number} = {result.result}</p>
                  <p className="text-sm text-orange-600 mt-2">{result.note}</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "gpa-calculator":
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              {gpaCourses.map((course, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>الدرجة</Label>
                      <Input 
                        type="number" 
                        placeholder="85" 
                        min="0" 
                        max="100"
                        value={course.grade || ""}
                        onChange={(e) => updateGPACourse(index, 'grade', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>الساعات</Label>
                      <Input 
                        type="number" 
                        placeholder="3" 
                        min="1"
                        value={course.hours || ""}
                        onChange={(e) => updateGPACourse(index, 'hours', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  {gpaCourses.length > 1 && (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => removeGPACourse(index)}
                    >
                      <i className="fas fa-trash ml-2"></i>
                      حذف المادة
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="secondary" onClick={addGPACourse} className="flex-1">
                إضافة مادة
              </Button>
              <Button onClick={handleGPACalculation} className="flex-1">
                احسب المعدل
              </Button>
            </div>
            {result && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">{result.gpa}</div>
                  <p className="text-pink-700 mb-3">المعدل التراكمي (من 4.0)</p>
                  <div className="bg-pink-50 rounded-lg p-3 text-sm">
                    <p className="text-gray-600"><strong>عدد المواد:</strong> {result.validCourses}</p>
                    <p className="text-gray-600"><strong>إجمالي الساعات:</strong> {result.totalHours}</p>
                    <p className="text-xs text-gray-500 mt-2">* التحويل تقريبي: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return <div className="p-6"><p>الأداة غير متوفرة حالياً</p></div>;
    }
  };

  const getToolTitle = () => {
    const titles = {
      "age-calculator": "حاسبة العمر",
      "date-converter": "تحويل التاريخ",
      "bmi-calculator": "حاسبة مؤشر كتلة الجسم",
      "percentage-calculator": "حاسبة النسبة المئوية",
      "random-generator": "مولد الأرقام العشوائية",
      "countdown-timer": "العداد التنازلي",
      "date-difference": "حاسبة الفرق بين التواريخ",
      "tax-calculator": "حاسبة الضريبة",
      "sqrt-calculator": "حاسبة الجذر التربيعي",
      "gpa-calculator": "حاسبة المعدل التراكمي"
    };
    return titles[toolId as keyof typeof titles] || "أداة حسابية";
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getToolTitle()}</DialogTitle>
        </DialogHeader>
        {renderCalculator()}
      </DialogContent>
    </Dialog>
  );
}
