'use client'
import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Quote } from 'lucide-react';
import { getRandomIslamicQuote } from '@/features/quotes/data/islamicQuote';
import { useTranslation } from '@/context/TranslationContext';

const IslamicQuoteDisplay = () => {
  const { t, language, SUPPORTED_LANGUAGES, translations } = useTranslation();
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  // تحميل اقتباس عشوائي عند تحميل المكون
  useEffect(() => {
    console.log('IslamicQuoteDisplay - translations:', translations);
    console.log('IslamicQuoteDisplay - quotes_content:', translations?.quotes_content);
    setCurrentQuote(getRandomIslamicQuote(translations));
  }, [translations]);

  // دالة تغيير الاقتباس
  const refreshQuote = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setCurrentQuote(getRandomIslamicQuote(translations));
      setIsRefreshing(false);
    }, 300);
  };

  if (!currentQuote) return null;

  return (
    <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          {currentQuote.type === 'quran' ? (
            <BookOpen className={`icon-emerald ${isRTL ? 'ml-3' : 'mr-3'}`} size={24} />
          ) : (
            <Quote className={`icon-emerald ${isRTL ? 'ml-3' : 'mr-3'}`} size={24} />
          )}
          <h3 className="text-lg font-bold text-emerald-800 arabic-text">
            {currentQuote.type === 'quran' 
              ? t('quotes.quranTitle', 'آية قرآنية عن الزكاة')
              : t('quotes.hadithTitle', 'حديث شريف عن الزكاة')
            }
          </h3>
        </div>
        
        <button
          onClick={refreshQuote}
          disabled={isRefreshing}
          className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} ${isRTL ? 'ml-2' : 'mr-2'} px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            isRefreshing
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:shadow-md'
          }`}
          title={t('quotes.changeButtonTitle', 'اضغط لعرض آية أو حديث آخر')}
        >
          <RefreshCw 
            className={`${isRefreshing ? 'animate-spin' : ''} transition-transform duration-300`} 
            size={16} 
          />
          <span className="arabic-text">{t('quotes.changeButton', 'تغيير')}</span>
        </button>
      </div>
      
      <div className={`transition-all duration-300 ${isRefreshing ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="text-center bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <div className="mb-4">
            {currentQuote.type === 'quran' && (
              <div className="text-emerald-600 text-2xl mb-2">﴿</div>
            )}
            <p className="text-lg text-gray-800 leading-relaxed arabic-text font-medium">
              {currentQuote.type === 'hadith' && '"'}
              {currentQuote.text}
              {currentQuote.type === 'hadith' && '"'}
            </p>
            {currentQuote.type === 'quran' && (
              <div className="text-emerald-600 text-2xl mt-2">﴾</div>
            )}
          </div>
          
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <div className={`w-2 h-2 rounded-full ${currentQuote.type === 'quran' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
            <p className={`text-sm font-medium ${currentQuote.type === 'quran' ? 'text-emerald-600' : 'text-blue-600'} arabic-text`}>
              {currentQuote.reference}
            </p>
            <div className={`w-2 h-2 rounded-full ${currentQuote.type === 'quran' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
          </div>
        </div>
      </div>
      
      {/* مؤشر نوع الاقتباس */}
      <div className="mt-4 flex justify-center">
        <div className={`inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full text-xs font-medium ${
          currentQuote.type === 'quran' 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${currentQuote.type === 'quran' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
          <span className="arabic-text">
            {currentQuote.type === 'quran' 
              ? t('quotes.fromQuran', 'من القرآن الكريم')
              : t('quotes.fromSunnah', 'من السنة النبوية')
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default IslamicQuoteDisplay;