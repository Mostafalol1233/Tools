import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Github, Linkedin, Mail, Globe, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MetaTags from '@/components/meta-tags';
import SEOSchema from '@/components/seo-schema';

export default function About() {
  const { t, language } = useLanguage();

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AI/ML', 'Next.js', 
    'Express', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'GraphQL'
  ];

  const links = [
    {
      title: 'BMO Tools Website',
      description: 'Professional calculator tools for daily use',
      url: 'https://bemora.vercel.app',
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'GitHub Profile',
      description: 'Open source projects and contributions',
      url: 'https://github.com/Mustafa-Bemo',
      icon: <Github className="w-5 h-5" />,
      color: 'bg-gray-800 hover:bg-gray-900'
    },
    {
      title: 'LinkedIn',
      description: 'Professional networking and career updates',
      url: 'https://linkedin.com/in/mustafa-bemo',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Email Contact',
      description: 'Get in touch for projects and collaborations',
      url: 'mailto:mustafa.bemo@gmail.com',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Portfolio Website',
      description: 'Showcase of projects and achievements',
      url: 'https://mustafa-bemo.vercel.app',
      icon: <Code className="w-5 h-5" />,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <MetaTags 
        title={`${t('about.mostafa.name')} - ${t('about.mostafa.title')}`}
        description={t('about.mostafa.description')}
        keywords="Mostafa Mohamed, Full-Stack Developer, AI Specialist, BMO Tools, Web Development"
      />
      <SEOSchema type="website" />
      
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
            MB
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('about.mostafa.name')}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            {t('about.mostafa.title')}
          </p>
          
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {t('about.mostafa.description')}
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Available for freelance projects
            </span>
          </div>
        </div>

        {/* Skills */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <Card key={index} className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <CardContent className="p-0">
                <Button 
                  asChild 
                  variant="ghost" 
                  className={`w-full h-auto p-6 justify-start text-left ${link.color} text-white hover:text-white transition-colors`}
                >
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0">
                      {link.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">
                        {link.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {link.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-70" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Mostafa Mohamed. Built with React & TypeScript
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            BMO Tools - Professional Calculator Suite
          </p>
        </div>
      </div>
    </div>
  );
}