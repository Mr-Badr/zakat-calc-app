import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';
import { Tooltip } from '@/common/components/Tooltip';

const ZakatTypeSelector = ({ selectedType, onTypeSelect }) => {
  const { t, isLoading, isInitialized, translations, language, SUPPORTED_LANGUAGES } = useTranslation();
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  // Arabic fallback translations for when translations are not loaded
  const arabicFallbacks = {
    money: { name: 'زكاة المال النقدي', description: 'زكاة النقود والأموال المدخرة والودائع البنكية' },
    goldSilver: { name: 'زكاة الذهب والفضة', description: 'زكاة المعادن النفيسة والمجوهرات والحلي' },
    business: { name: 'زكاة عروض التجارة', description: 'زكاة البضائع والسلع التجارية والمخزون' },
    agriculture: { name: 'زكاة الزروع والثمار', description: 'زكاة المحاصيل الزراعية والثمار والحبوب' },
    livestock: { name: 'زكاة الأنعام', description: 'زكاة الإبل والبقر والغنم والماعز' },
    income: { name: 'زكاة الدخل والراتب', description: 'زكاة الراتب والدخل الشهري والمكافآت' },
    rental: { name: 'زكاة العقارات المؤجرة', description: 'زكاة إيرادات العقارات والأملاك المؤجرة' },
    investments: { name: 'زكاة الأسهم والاستثمارات', description: 'زكاة الأسهم والصناديق الاستثمارية والسندات الإسلامية' }
  };

  // Show loading state if translations are not ready
  if (isLoading || !isInitialized || !translations || Object.keys(translations).length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-center mb-6">
          <LucideIcons.Calculator className={`text-emerald-600 ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
          <h2 className="text-2xl font-bold text-emerald-800 arabic-title">
            اختر نوع الزكاة
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="relative group rounded-xl border-2 bg-gray-50 border-gray-200 overflow-hidden animate-pulse"
              style={{ minHeight: '160px' }}
            >
              <div className="w-full h-full p-4 flex flex-col relative" style={{ minHeight: '160px' }}>
                <div className="absolute top-4 left-4">
                  <div className="p-2.5 rounded-lg bg-gray-200 w-10 h-10"></div>
                </div>
                <div className="flex-1 flex flex-col justify-center pr-2 pl-16">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // خريطة أنواع الزكاة مع الأيقونات - استخدام نفس IDs الموجودة في ملفات الترجمة
  const zakatTypes = [
    { id: 'money', icon: 'Coins' },
    { id: 'goldSilver', icon: 'Gem' },
    { id: 'business', icon: 'Store' },
    { id: 'agriculture', icon: 'Wheat' },
    { id: 'livestock', icon: 'Cog' },
    { id: 'income', icon: 'Wallet' },
    { id: 'rental', icon: 'Building' },
    { id: 'investments', icon: 'TrendingUp' }
  ];

  // خريطة الألوان للأيقونات
  const iconColors = {
    money: 'text-emerald-600',
    goldSilver: 'text-amber-600',
    business: 'text-blue-600',
    agriculture: 'text-green-600',
    livestock: 'text-orange-600',
    income: 'text-purple-600',
    rental: 'text-indigo-600',
    investments: 'text-teal-600'
  };

  // خريطة ألوان الخلفيات
  const backgroundColors = {
    money: 'bg-emerald-50 border-emerald-200',
    goldSilver: 'bg-amber-50 border-amber-200',
    business: 'bg-blue-50 border-blue-200',
    agriculture: 'bg-green-50 border-green-200',
    livestock: 'bg-orange-50 border-orange-200',
    income: 'bg-purple-50 border-purple-200',
    rental: 'bg-indigo-50 border-indigo-200',
    investments: 'bg-teal-50 border-teal-200'
  };

  // خريطة ألوان الحدود عند التحديد
  const selectedColors = {
    money: 'border-emerald-500 bg-emerald-100 shadow-emerald-200',
    goldSilver: 'border-amber-500 bg-amber-100 shadow-amber-200',
    business: 'border-blue-500 bg-blue-100 shadow-blue-200',
    agriculture: 'border-green-500 bg-green-100 shadow-green-200',
    livestock: 'border-orange-500 bg-orange-100 shadow-orange-200',
    income: 'border-purple-500 bg-purple-100 shadow-purple-200',
    rental: 'border-indigo-500 bg-indigo-100 shadow-indigo-200',
    investments: 'border-teal-500 bg-teal-100 shadow-teal-200'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <LucideIcons.Calculator className={`text-emerald-600 ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h2 className="text-2xl font-bold text-emerald-800 arabic-title">
          {t('zakatTypes.title', 'اختر نوع الزكاة')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {zakatTypes.map((type) => {
          const IconComponent = LucideIcons[type.icon] || (() => <span>{type.emoji || '🧮'}</span>);
          const isSelected = selectedType === type.id;
          
          // الحصول على الترجمة للنوع الحالي مع fallback عربي
          const typeName = t(`zakatTypes.types.${type.id}.name`, arabicFallbacks[type.id]?.name || type.id);
          const typeDescription = t(`zakatTypes.types.${type.id}.description`, arabicFallbacks[type.id]?.description || '');

          return (
            <Tooltip key={type.id} content={typeDescription} placement={isRTL ? 'left' : 'right'}>
              <button
                onClick={() => onTypeSelect(type.id)}
                className={`rounded-xl border-2 p-5 flex flex-col items-center transition-all duration-200 shadow-sm hover:shadow-lg focus:outline-none ${isSelected ? selectedColors[type.id] : backgroundColors[type.id]}`}
                aria-label={typeName}
              >
                <span className={`text-3xl mb-2 ${iconColors[type.id]}`}>{type.emoji || <IconComponent size={32} />}</span>
                <span className="font-bold text-lg mb-1 arabic-title">{typeName}</span>
                <span className="text-xs text-gray-600 text-center arabic-text">{typeDescription}</span>
              </button>
            </Tooltip>
          );
        })}
      </div>

      {/* نصيحة */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3 space-x-reverse">
          <LucideIcons.Lightbulb className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
          <div className="text-sm text-blue-700 arabic-text leading-relaxed">
            <strong>{t('zakatTypes.tip.title', 'نصيحة')}</strong> {t('zakatTypes.tip.description', 'يمكنك حساب زكاة أكثر من نوع واحد. اختر النوع الذي تريد حساب زكاته أولاً، ثم يمكنك العودة لاختيار نوع آخر بعد الانتهاء من الحساب الأول.')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatTypeSelector;
