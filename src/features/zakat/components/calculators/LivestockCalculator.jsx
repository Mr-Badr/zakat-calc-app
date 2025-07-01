'use client'

import React, { useState, useEffect } from 'react';
import { Cow, Sheep, Camel, Calculator, Icon } from 'lucide-react';
import { calculateLivestockZakat } from '@/features/zakat/utils/zakatCalculations';
import { useTranslation } from '@/context/TranslationContext';
import { cowHead } from '@lucide/lab';

const LivestockCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [livestockType, setLivestockType] = useState('cattle');
  const [animalCount, setAnimalCount] = useState('');
  const [calculationMethod, setCalculationMethod] = useState('count');
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    if (animalCount && goldPrice) {
      const result = calculateLivestockZakat(
        parseInt(animalCount) || 0,
        livestockType,
        calculationMethod,
        madhab,
        goldPrice,
        currency
      );
      onCalculation(result);
    }
  }, [
    animalCount,
    livestockType,
    calculationMethod,
    madhab,
    goldPrice,
    currency,
    onCalculation
  ]);

  const livestockTypes = [
    { id: 'cattle', name: t('calculators.livestock.fields.livestockType.cattle', 'البقر'), icon: '🐄', description: t('calculators.livestock.fields.livestockType.cattleDesc', 'أبقار، جاموس') },
    { id: 'sheep', name: t('calculators.livestock.fields.livestockType.sheep', 'الغنم'), icon: '🐑', description: t('calculators.livestock.fields.livestockType.sheepDesc', 'أغنام، ماعز') },
    { id: 'camel', name: t('calculators.livestock.fields.livestockType.camel', 'الإبل'), icon: '🐪', description: t('calculators.livestock.fields.livestockType.camelDesc', 'جمال، إبل') }
  ];

  const calculationMethods = [
    { id: 'count', name: t('calculators.livestock.calculationMethod.count', 'بالعدد (الأصل)'), description: t('calculators.livestock.calculationMethod.countDesc', 'زكاة بالحيوانات نفسها') },
    { id: 'value', name: t('calculators.livestock.calculationMethod.value', 'بالقيمة (تيسيراً)'), description: t('calculators.livestock.calculationMethod.valueDesc', 'زكاة بقيمة الحيوانات') }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Icon iconNode={cowHead} className={`icon-brown ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-brown-800 arabic-text">
          {t('calculators.livestock.title', 'حاسبة زكاة الأنعام')}
        </h3>
      </div>

      <div className="space-y-6">
        {/* نوع الأنعام */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.livestock.fields.livestockType.label', 'نوع الأنعام')}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {livestockTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setLivestockType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  livestockType === type.id
                    ? 'border-brown-500 bg-brown-50 text-brown-800'
                    : 'border-gray-200 hover:border-brown-300 hover:bg-brown-50'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className="font-semibold arabic-text">{type.name}</div>
                <div className="text-xs text-gray-600 mt-1 arabic-text">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* طريقة الحساب */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.livestock.calculationMethod.title', 'طريقة الحساب:')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {calculationMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setCalculationMethod(method.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  calculationMethod === method.id
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="font-semibold arabic-text">{method.name}</div>
                <div className="text-xs text-gray-600 mt-1 arabic-text">{method.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* عدد الحيوانات */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Calculator className="inline icon-brown ml-1" size={16} />
            {t('calculators.livestock.fields.animalCount.label', 'عدد الحيوانات')}
          </label>
          <input
            type="number"
            value={animalCount}
            onChange={(e) => setAnimalCount(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.livestock.fields.animalCount.placeholder', 'أدخل عدد الحيوانات')}
          />
        </div>

        {/* ملاحظة فقهية مهمة */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 mb-3 arabic-text">
            {t('calculators.livestock.fiqhNote.title', 'ملاحظة فقهية مهمة:')}
          </h4>
          <p className="text-sm text-amber-700 leading-relaxed arabic-text">
            {t('calculators.livestock.fiqhNote.description', 'زكاة الأنعام لها نصوص محددة في القرآن والسنة. البقر: نصاب 30 رأس، الغنم: نصاب 40 رأس، الإبل: نصاب 5 رؤوس. استشر أهل العلم في بلدك.')}
          </p>
        </div>

        {/* شروط زكاة الأنعام */}
        <div className="bg-gradient-to-r from-brown-50 to-amber-50 border-2 border-brown-200 rounded-xl p-5">
          <h4 className="font-bold text-brown-800 mb-3 arabic-text">
            {t('calculators.livestock.conditions.title', 'شروط زكاة الأنعام:')}
          </h4>
          <ul className="text-sm text-brown-700 space-y-2 arabic-text">
            {t('calculators.livestock.conditions.items', [
              'أن تبلغ النصاب المقرر شرعاً لكل نوع',
              'أن يمر عليها الحول الهجري كاملاً',
              'أن تكون سائمة (ترعى من الكلأ الطبيعي)',
              'أن لا تكون للعمل أو التجارة',
              'تُخرج الزكاة من نفس جنس الحيوانات'
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-brown-600 ml-2 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* نصوص الأنعام */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
          <h4 className="font-bold text-green-800 mb-3 arabic-text">
            {t('calculators.livestock.nisab.title', 'نصاب الأنعام:')}
          </h4>
          <div className="text-sm text-green-700 space-y-2 arabic-text">
            <div><strong>{t('calculators.livestock.nisab.cattle', 'البقر:')}</strong> {t('calculators.livestock.nisab.cattleDesc', '30 رأس = 1 تبيع، 40 رأس = 1 مسنة')}</div>
            <div><strong>{t('calculators.livestock.nisab.sheep', 'الغنم:')}</strong> {t('calculators.livestock.nisab.sheepDesc', '40 رأس = 1 شاة، 121 رأس = 2 شاة')}</div>
            <div><strong>{t('calculators.livestock.nisab.camel', 'الإبل:')}</strong> {t('calculators.livestock.nisab.camelDesc', '5 رؤوس = 1 شاة، 25 رأس = 1 بنت مخاض')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestockCalculator;
