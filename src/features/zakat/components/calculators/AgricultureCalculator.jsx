'use client'

import React, { useState, useEffect } from 'react';
import { Wheat, Droplets, Sun, Calculator } from 'lucide-react';
import { calculateAgricultureZakat } from '@/features/zakat/utils/zakatCalculations';
import { useTranslation } from '@/context/TranslationContext';

const AgricultureCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';
  const [cropType, setCropType] = useState('grains');
  const [irrigationType, setIrrigationType] = useState('natural');
  const [harvestValue, setHarvestValue] = useState('');
  const [productionCosts, setProductionCosts] = useState('');

  useEffect(() => {
    if (harvestValue && goldPrice) {
      const result = calculateAgricultureZakat(
        parseFloat(harvestValue) || 0,
        parseFloat(productionCosts) || 0,
        cropType,
        irrigationType,
        madhab,
        goldPrice,
        currency
      );
      onCalculation(result);
    }
  }, [
    harvestValue,
    productionCosts,
    cropType,
    irrigationType,
    madhab,
    goldPrice,
    currency,
    onCalculation
  ]);

  const cropTypes = [
    { id: 'grains', name: t('calculators.agriculture.fields.cropType.grains', 'الحبوب'), icon: '🌾', description: t('calculators.agriculture.fields.cropType.grainsDesc', 'قمح، شعير، أرز، ذرة') },
    { id: 'fruits', name: t('calculators.agriculture.fields.cropType.fruits', 'الفواكه'), icon: '🍎', description: t('calculators.agriculture.fields.cropType.fruitsDesc', 'تفاح، برتقال، موز، عنب') },
    { id: 'vegetables', name: t('calculators.agriculture.fields.cropType.vegetables', 'الخضروات'), icon: '🥕', description: t('calculators.agriculture.fields.cropType.vegetablesDesc', 'طماطم، بطاطس، بصل، جزر') },
    { id: 'dates', name: t('calculators.agriculture.fields.cropType.dates', 'التمور'), icon: '🌴', description: t('calculators.agriculture.fields.cropType.datesDesc', 'تمر، نخيل') }
  ];

  const irrigationTypes = [
    { id: 'natural', name: t('calculators.agriculture.fields.irrigationType.natural', 'طبيعي'), icon: '🌧️', description: t('calculators.agriculture.fields.irrigationType.naturalDesc', 'مطر، أنهار، عيون') },
    { id: 'artificial', name: t('calculators.agriculture.fields.irrigationType.artificial', 'صناعي'), icon: '💧', description: t('calculators.agriculture.fields.irrigationType.artificialDesc', 'ري بالآلات، مضخات') }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Wheat className={`icon-green ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-green-800 arabic-text">
          {t('calculators.agriculture.title', 'حاسبة زكاة الزراعة')}
        </h3>
      </div>

      <div className="space-y-6">
        {/* نوع المحصول */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.agriculture.fields.cropType.label', 'نوع المحصول')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {cropTypes.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setCropType(crop.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  cropType === crop.id
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <div className="text-2xl mb-2">{crop.icon}</div>
                <div className="font-semibold arabic-text">{crop.name}</div>
                <div className="text-xs text-gray-600 mt-1 arabic-text">{crop.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* نوع الري */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.agriculture.fields.irrigationType.label', 'نوع الري')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {irrigationTypes.map((irrigation) => (
              <button
                key={irrigation.id}
                onClick={() => setIrrigationType(irrigation.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  irrigationType === irrigation.id
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-2xl mb-2">{irrigation.icon}</div>
                <div className="font-semibold arabic-text">{irrigation.name}</div>
                <div className="text-xs text-gray-600 mt-1 arabic-text">{irrigation.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* قيمة المحصول */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Sun className="inline icon-yellow ml-1" size={16} />
            {t('calculators.agriculture.fields.harvestValue.label', 'قيمة المحصول')} ({currency})
          </label>
          <input
            type="number"
            value={harvestValue}
            onChange={(e) => setHarvestValue(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 currency-input text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.agriculture.fields.harvestValue.placeholder', `أدخل قيمة المحصول بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* تكاليف الإنتاج */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Calculator className={`inline icon-red ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.agriculture.fields.productionCosts.label', 'تكاليف الإنتاج')} ({currency}) - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="number"
            value={productionCosts}
            onChange={(e) => setProductionCosts(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 currency-input text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.agriculture.fields.productionCosts.placeholder', `بذور، أسمدة، عمالة بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* ملاحظة فقهية مهمة */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 mb-3 arabic-text">
            {t('calculators.agriculture.fiqhNote.title', 'ملاحظة فقهية مهمة:')}
          </h4>
          <p className="text-sm text-amber-700 leading-relaxed arabic-text">
            {t('calculators.agriculture.fiqhNote.description', 'زكاة الزراعة تختلف عن زكاة المال. الري الطبيعي: 10% من المحصول. الري الصناعي: 5% من المحصول. تُحسب عند الحصاد وليس عند البيع.')}
          </p>
        </div>

        {/* شروط زكاة الزراعة */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
          <h4 className="font-bold text-green-800 mb-3 arabic-text">
            {t('calculators.agriculture.conditions.title', 'شروط زكاة الزراعة:')}
          </h4>
          <ul className="text-sm text-green-700 space-y-2 arabic-text">
            {t('calculators.agriculture.conditions.items', [
              'أن يبلغ المحصول النصاب المقرر شرعاً',
              'أن يكون المحصول من الأصناف الزكوية',
              'تُحسب الزكاة عند الحصاد وليس البيع',
              'الري الطبيعي: 10%، الري الصناعي: 5%',
              'تُطرح تكاليف الإنتاج من قيمة المحصول'
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 ml-2 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgricultureCalculator;
