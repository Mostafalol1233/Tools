import { useState } from "react";
import { Link } from "wouter";
import ToolCard from "@/components/tool-card";
import CalculatorModal from "@/components/calculator-modal";
import SEOSchema from "@/components/seo-schema";
import MetaTags from "@/components/meta-tags";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { User, ExternalLink } from "lucide-react";

interface Tool {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
  color: string;
}

const tools: Tool[] = [
  {
    id: "age-calculator",
    titleKey: "age-calculator.title",
    descKey: "age-calculator.desc",
    icon: "fas fa-birthday-cake",
    color: "blue"
  },
  {
    id: "date-converter",
    titleKey: "date-converter.title",
    descKey: "date-converter.desc",
    icon: "fas fa-calendar-alt",
    color: "emerald"
  },
  {
    id: "bmi-calculator",
    titleKey: "bmi-calculator.title",
    descKey: "bmi-calculator.desc",
    icon: "fas fa-weight",
    color: "amber"
  },
  {
    id: "percentage-calculator",
    titleKey: "percentage-calculator.title",
    descKey: "percentage-calculator.desc",
    icon: "fas fa-percentage",
    color: "purple"
  },
  {
    id: "random-generator",
    titleKey: "random-generator.title",
    descKey: "random-generator.desc",
    icon: "fas fa-dice",
    color: "red"
  },
  {
    id: "countdown-timer",
    titleKey: "countdown-timer.title",
    descKey: "countdown-timer.desc",
    icon: "fas fa-clock",
    color: "indigo"
  },
  {
    id: "date-difference",
    titleKey: "date-difference.title",
    descKey: "date-difference.desc",
    icon: "fas fa-calendar-check",
    color: "teal"
  },
  {
    id: "tax-calculator",
    titleKey: "tax-calculator.title",
    descKey: "tax-calculator.desc",
    icon: "fas fa-money-bill",
    color: "green"
  },
  {
    id: "sqrt-calculator",
    titleKey: "sqrt-calculator.title",
    descKey: "sqrt-calculator.desc",
    icon: "fas fa-square-root-alt",
    color: "orange"
  },
  {
    id: "gpa-calculator",
    titleKey: "gpa-calculator.title",
    descKey: "gpa-calculator.desc",
    icon: "fas fa-graduation-cap",
    color: "pink"
  },
  {
    id: "unit-converter",
    titleKey: "unit-converter.title",
    descKey: "unit-converter.desc",
    icon: "fas fa-exchange-alt",
    color: "cyan"
  },
  {
    id: "password-generator",
    titleKey: "password-generator.title",
    descKey: "password-generator.desc",
    icon: "fas fa-key",
    color: "gray"
  },
  {
    id: "text-encoder",
    titleKey: "text-encoder.title",
    descKey: "text-encoder.desc",
    icon: "fas fa-lock",
    color: "violet"
  },
  {
    id: "color-palette",
    titleKey: "color-palette.title",
    descKey: "color-palette.desc",
    icon: "fas fa-palette",
    color: "rose"
  }
];

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const { t, language, setLanguage } = useLanguage();

  return (
    <>
      <MetaTags />
      <SEOSchema type="website" />
      <div className="min-h-screen bg-slate-50">
        {/* Advertisement Area Top */}
      <div className="bg-gray-100 border-b border-gray-200 py-2">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-dashed border-gray-300">
            <i className="fas fa-ad text-gray-400 text-2xl mb-2"></i>
            <p className="text-gray-500 text-sm">{t('ads.text')}</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-slate-800 mb-2 animate-slide-up">
                <i className="fas fa-calculator text-blue-500 ml-3"></i>
                {t('site.title')}
              </h1>
              <p className="text-slate-600 text-lg">{t('site.description')}</p>
              <p className="text-blue-600 text-sm font-medium mt-1">{t('site.subtitle')}</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <Button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <i className="fas fa-language"></i>
                {t('lang.switch')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-32">
        
        {/* Tools Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">{t('tools.select')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => setSelectedTool(tool.id)}
              />
            ))}
          </div>
        </section>

        {/* Advertisement Area Middle */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-dashed border-gray-300 text-center">
            <i className="fas fa-ad text-gray-400 text-3xl mb-3"></i>
            <p className="text-gray-500">منطقة إعلانية وسطى - مساحة 728x90</p>
          </div>
        </div>

      </main>

      {/* About Section */}
      <section id="about" className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">{t('about.title')}</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-user text-white text-4xl"></i>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">{t('about.mostafa.name')}</h3>
              <p className="text-blue-600 font-medium mb-4">{t('about.mostafa.title')}</p>
              <p className="text-slate-600 leading-relaxed mb-6">
                {t('about.mostafa.description')}
              </p>
              <div className="flex justify-center space-x-4 space-x-reverse">
                <a href="https://mustaf.vercel.app/" target="_blank" rel="noopener noreferrer"
                   className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center">
                  <i className="fas fa-globe ml-2"></i>
                  {t('about.mostafa.website')}
                </a>
                <a href="#" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center">
                  <i className="fas fa-tree ml-2"></i>
                  Linktree
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t('contact.title')}</h2>
            <p className="text-slate-300 mb-8">{t('contact.description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors">
                <i className="fas fa-envelope text-blue-400 text-2xl mb-3"></i>
                <h3 className="font-semibold mb-2">{t('contact.email.title')}</h3>
                <p className="text-slate-300 text-sm">contact@mustaf.vercel.app</p>
              </div>
              <a href="https://bemora.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors block">
                <i className="fas fa-globe text-green-400 text-2xl mb-3"></i>
                <h3 className="font-semibold mb-2">{t('contact.website.title')}</h3>
                <p className="text-slate-300 text-sm">{t('contact.website.description')}</p>
              </a>
              <div className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors">
                <i className="fas fa-comments text-purple-400 text-2xl mb-3"></i>
                <h3 className="font-semibold mb-2">{t('contact.feedback.title')}</h3>
                <p className="text-slate-300 text-sm">{t('contact.feedback.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{t('footer.title')}</h3>
            <p className="text-slate-400">{t('footer.subtitle')}</p>
          </div>
          <div className="border-t border-slate-700 pt-4">
            <p className="text-slate-400 text-sm">
              {t('footer.copyright')} | {t('footer.developed')} 
              <a href="https://mustaf.vercel.app/" className="text-blue-400 hover:text-blue-300 mr-1">{t('about.mostafa.name')}</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Calculator Modal */}
      {selectedTool && (
        <CalculatorModal
          toolId={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
    </>
  );
}
