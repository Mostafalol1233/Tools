import { useLanguage } from "@/contexts/LanguageContext";

interface Tool {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
  color: string;
}

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

const colorClasses = {
  blue: "bg-blue-100 hover:bg-blue-200 text-blue-600",
  emerald: "bg-emerald-100 hover:bg-emerald-200 text-emerald-600",
  amber: "bg-amber-100 hover:bg-amber-200 text-amber-600",
  purple: "bg-purple-100 hover:bg-purple-200 text-purple-600",
  red: "bg-red-100 hover:bg-red-200 text-red-600",
  indigo: "bg-indigo-100 hover:bg-indigo-200 text-indigo-600",
  teal: "bg-teal-100 hover:bg-teal-200 text-teal-600",
  green: "bg-green-100 hover:bg-green-200 text-green-600",
  orange: "bg-orange-100 hover:bg-orange-200 text-orange-600",
  pink: "bg-pink-100 hover:bg-pink-200 text-pink-600",
  cyan: "bg-cyan-100 hover:bg-cyan-200 text-cyan-600",
  gray: "bg-gray-100 hover:bg-gray-200 text-gray-600",
  violet: "bg-violet-100 hover:bg-violet-200 text-violet-600",
  rose: "bg-rose-100 hover:bg-rose-200 text-rose-600",
};

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const { t } = useLanguage();
  
  return (
    <div 
      className="tool-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="p-6 text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${colorClasses[tool.color as keyof typeof colorClasses]}`}>
          <i className={`${tool.icon} text-2xl`}></i>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{t(tool.titleKey)}</h3>
        <p className="text-slate-600 text-sm">{t(tool.descKey)}</p>
      </div>
    </div>
  );
}
