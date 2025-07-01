import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

const MadhabSelector = ({ selectedMadhhab, onMadhabSelect }) => {
  const { t, isLoading, isInitialized, language } = useTranslation();

  // Arabic fallback translations for madhabs
  const arabicFallbacks = {
    hanafi: { name: 'الحنفي', description: 'المذهب الحنفي - نصاب الفضة (الأرفق بالفقراء)' },
    maliki: { name: 'المالكي', description: 'المذهب المالكي - نصاب الذهب' },
    shafii: { name: 'الشافعي', description: 'المذهب الشافعي - نصاب الذهب' },
    hanbali: { name: 'الحنبلي', description: 'المذهب الحنبلي - نصاب الذهب' },
  };

  const madhabs = ['hanafi', 'maliki', 'shafii', 'hanbali'];

  // Show loading skeleton if translations are not ready
  if (isLoading || !isInitialized) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 card-hover fade-in animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {madhabs.map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-4">
        <BookOpen className="text-amber-600 ml-2" size={24} />
        <h2
          className="text-2xl font-semibold text-amber-800 arabic-title font-title"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('madhabs.title', 'اختر المذهب')}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {madhabs.map((madhhab) => {
          // Use translation, fallback to Arabic if not found
          const name = t(`madhabs.madhabs.${madhhab}.name`, arabicFallbacks[madhhab].name);
          const description = t(`madhabs.madhabs.${madhhab}.description`, arabicFallbacks[madhhab].description);
          return (
            <button
              key={madhhab}
              onClick={() => onMadhabSelect(madhhab)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                selectedMadhhab === madhhab
                  ? 'border-amber-500 bg-amber-50 shadow-md'
                  : 'border-gray-200 hover:border-amber-300 hover:shadow-sm'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <h3
                className={`font-semibold mb-1 arabic-title ${
                  selectedMadhhab === madhhab ? 'text-amber-800' : 'text-gray-800'
                } font-title`}
                style={{ fontFamily: 'var(--font-title)' }}
              >
                {name}
              </h3>
              <p className="text-xs text-gray-600 arabic-text font-body" style={{ fontFamily: 'var(--font-body)' }}>
                {description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MadhabSelector;
