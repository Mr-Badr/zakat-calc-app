'use client'
import React, { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation, SUPPORTED_LANGUAGES } from '@/context/TranslationContext';
import { useRouter, usePathname } from 'next/navigation';

const LanguageSwitcher = () => {
  const { language, changeLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES.ar;

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage === language) {
      setIsOpen(false);
      return;
    }

    // Change language in context
    changeLanguage(newLanguage);

    // Replace the first segment of the path with the new language
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = newLanguage;
    }
    const newPath = segments.join('/') || '/';
    router.push(newPath);

    setIsOpen(false);
  };

  const getLanguageName = (langCode) => {
    const langInfo = SUPPORTED_LANGUAGES[langCode];
    return langInfo ? langInfo.name : langCode.toUpperCase();
  };

  return (
    <div className="relative">
      {/* زر اختيار اللغة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-white border border-white/20 hover:border-white/30"
        aria-label={t('header.languageSwitcher.title', 'تغيير اللغة')}
      >
        <Globe size={18} />
        <span className="text-2xl">{currentLanguage.flag}</span>
        <span className="font-medium hidden sm:inline">{currentLanguage.name}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* قائمة اللغات المنسدلة */}
      {isOpen && (
        <>
          {/* خلفية شفافة للإغلاق عند الضغط خارح القائمة */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* القائمة المنسدلة */}
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 min-w-[200px]">
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, info]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between ${
                  language === code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-xl">{info.flag}</span>
                  <span className="font-medium">{getLanguageName(code)}</span>
                </div>

                {language === code && <Check size={16} className="text-blue-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
