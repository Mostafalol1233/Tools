import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export default function MetaTags({
  title,
  description,
  keywords,
  image = '/generated-icon.png',
  url = '/',
  type = 'website'
}: MetaTagsProps) {
  const { language } = useLanguage();

  const baseUrl = 'https://arabic-calculator-tools.vercel.app';
  const fullUrl = `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const defaultTitle = language === 'ar' 
    ? 'أدوات الحاسبة العربية - 10 حاسبات مجانية مع تشفير BMO'
    : 'Arabic Calculator Tools - 10 Free Calculators with BMO Encryption';

  const defaultDescription = language === 'ar'
    ? 'موقع شامل للأدوات الحسابية العربية: حاسبة العمر، BMI، تحويل الوحدات، مولد كلمات المرور، نظام التشفير BMO المتقدم، وأكثر من 10 أداة مفيدة مجانية.'
    : 'Comprehensive Arabic calculation tools website: age calculator, BMI, unit converter, password generator, advanced BMO encryption system, and more than 10 useful free tools.';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || (language === 'ar' 
    ? 'حاسبة عربية, أدوات حسابية, تحويل وحدات, حساب العمر, BMI, مولد كلمات مرور, تشفير BMO, حاسبة ضريبة, جذر تربيعي, GPA'
    : 'arabic calculator, calculation tools, unit converter, age calculator, BMI, password generator, BMO encryption, tax calculator, square root, GPA');

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', language === 'ar' ? 'Arabic' : 'English');

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', fullImageUrl, true);
    updateMetaTag('og:locale', language === 'ar' ? 'ar_AR' : 'en_US', true);
    updateMetaTag('og:site_name', language === 'ar' ? 'أدوات الحاسبة العربية' : 'Arabic Calculator Tools', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', fullImageUrl);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

  }, [finalTitle, finalDescription, finalKeywords, fullUrl, fullImageUrl, type, language]);

  return null;
}