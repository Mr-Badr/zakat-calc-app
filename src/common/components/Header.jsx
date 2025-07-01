'use client'
import React from 'react';
import { Calculator, Fuel as Mosque } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

const Header = () => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  // Use translations from context
  const headerTitle = t('header.title', 'حاسبة الزكاة المتقدمة');
  const headerSubtitle = t('header.subtitle', 'احسب زكاة مالك بدقة وسهولة');
  const headerFeatures = {
    goldPrices: t('header.features.goldPrices', 'أسعار ذهب مباشرة'),
    allCurrencies: t('header.features.allCurrencies', 'جميع العملات العالمية'),
    mobileCompatible: t('header.features.mobileCompatible', 'متوافق مع الجوال'),
    noRegistration: t('header.features.noRegistration', 'لا يتطلب تسجيل'),
    instantResults: t('header.features.instantResults', 'نتائج فورية')
  };

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 px-4 font-body">
      <div className="max-w-6xl mx-auto">
        {/* المحتوى الرئيسي */}
        <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Mosque className={isRTL ? 'ml-3' : 'mr-3'} size={40} />
              <Calculator className={`text-amber-300 ${isRTL ? 'ml-3' : 'mr-3'}`} size={40} />
          </div>
          
            <h1 className="text-4xl md:text-5xl font-bold mb-4 arabic-title font-title">
            {headerTitle}
          </h1>
          
            <p className="text-emerald-100 text-xl md:text-2xl mb-8 arabic-text font-body">
            {headerSubtitle}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-body">
              <span className="bg-white/20 px-4 py-2 rounded-full arabic-text">
              🥇 {headerFeatures.goldPrices}
            </span>
              <span className="bg-white/20 px-4 py-2 rounded-full arabic-text">
              🌍 {headerFeatures.allCurrencies}
            </span>
              <span className="bg-white/20 px-4 py-2 rounded-full arabic-text">
              📱 {headerFeatures.mobileCompatible}
            </span>
              <span className="bg-white/20 px-4 py-2 rounded-full arabic-text">
              🔒 {headerFeatures.noRegistration}
            </span>
              <span className="bg-white/20 px-4 py-2 rounded-full arabic-text">
              ⚡ {headerFeatures.instantResults}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
