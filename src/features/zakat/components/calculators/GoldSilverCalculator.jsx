'use client'

import React, { useState, useEffect } from 'react';
import { Scale, Calculator, DollarSign } from 'lucide-react';
import { calculateGoldSilverZakat } from '@/features/zakat/utils/zakatCalculations';
import { useTranslation } from '@/context/TranslationContext';

const GoldSilverCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [goldWeight, setGoldWeight] = useState('');
  const [silverWeight, setSilverWeight] = useState('');
  const [goldKarat, setGoldKarat] = useState('24');
  const [calculationMethod, setCalculationMethod] = useState('weight');
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    if ((goldWeight || silverWeight) && goldPrice) {
      const result = calculateGoldSilverZakat(
        parseFloat(goldWeight) || 0,
        parseFloat(silverWeight) || 0,
        goldKarat,
        calculationMethod,
        madhab,
        goldPrice,
        currency
      );
      onCalculation(result);
    }
  }, [
    goldWeight,
    silverWeight,
    goldKarat,
    calculationMethod,
    madhab,
    goldPrice,
    currency,
    onCalculation
  ]);

  const goldKarats = [
    { id: '24', name: t('calculators.goldSilver.fields.goldKarat.24', '24 قيراط'), purity: t('calculators.goldSilver.fields.goldKarat.purity.24', '100%') },
    { id: '22', name: t('calculators.goldSilver.fields.goldKarat.22', '22 قيراط'), purity: t('calculators.goldSilver.fields.goldKarat.purity.22', '91.7%') },
    { id: '21', name: t('calculators.goldSilver.fields.goldKarat.21', '21 قيراط'), purity: t('calculators.goldSilver.fields.goldKarat.purity.21', '87.5%') },
    { id: '18', name: t('calculators.goldSilver.fields.goldKarat.18', '18 قيراط'), purity: t('calculators.goldSilver.fields.goldKarat.purity.18', '75%') },
    { id: '14', name: t('calculators.goldSilver.fields.goldKarat.14', '14 قيراط'), purity: t('calculators.goldSilver.fields.goldKarat.purity.14', '58.3%') },
    { id: '10', name: t('calculators.goldSilver.fields.goldKarat.10', '10 قيراط'), purity: t('calculators.goldSilver.fields.goldKarat.purity.10', '41.7%') }
  ];

  const calculationMethods = [
    { id: 'weight', name: t('calculators.goldSilver.calculationMethod.weight', 'بالوزن (الأصل)'), description: t('calculators.goldSilver.calculationMethod.weightDesc', 'زكاة على الوزن الفعلي') },
    { id: 'value', name: t('calculators.goldSilver.calculationMethod.value', 'بالقيمة (تيسيراً)'), description: t('calculators.goldSilver.calculationMethod.valueDesc', 'زكاة على القيمة السوقية') }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Scale className={`icon-yellow ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-yellow-800 arabic-text">
          {t('calculators.goldSilver.title', 'حاسبة زكاة الذهب والفضة')}
        </h3>
      </div>

      <div className="space-y-6">
        {/* طريقة الحساب */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.goldSilver.calculationMethod.title', 'طريقة الحساب:')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {calculationMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setCalculationMethod(method.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  calculationMethod === method.id
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-800'
                    : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                }`}
              >
                <div className="font-semibold arabic-text">{method.name}</div>
                <div className="text-xs text-gray-600 mt-1 arabic-text">{method.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* عيار الذهب */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.goldSilver.fields.goldKarat.label', 'عيار الذهب')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {goldKarats.map((karat) => (
              <button
                key={karat.id}
                onClick={() => setGoldKarat(karat.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                  goldKarat === karat.id
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-800'
                    : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                }`}
              >
                <div className="font-semibold arabic-text">{karat.name}</div>
                <div className="text-xs text-gray-600 mt-1">{karat.purity}</div>
              </button>
            ))}
          </div>
        </div>

        {/* وزن الذهب */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <DollarSign className={`inline icon-yellow ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.goldSilver.fields.goldWeight.label', 'وزن الذهب')} ({t('calculators.goldSilver.units.gram', 'جرام')}) - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="number"
            value={goldWeight}
            onChange={(e) => setGoldWeight(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.goldSilver.fields.goldWeight.placeholder', 'أدخل وزن الذهب بالجرام')}
          />
        </div>

        {/* وزن الفضة */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Scale className={`inline icon-gray ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.goldSilver.fields.silverWeight.label', 'وزن الفضة')} ({t('calculators.goldSilver.units.gram', 'جرام')}) - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="number"
            value={silverWeight}
            onChange={(e) => setSilverWeight(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.goldSilver.fields.silverWeight.placeholder', 'أدخل وزن الفضة بالجرام')}
          />
        </div>

        {/* ملاحظة فقهية مهمة */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 mb-3 arabic-text">
            {t('calculators.goldSilver.fiqhNote.title', 'ملاحظة فقهية مهمة:')}
          </h4>
          <p className="text-sm text-amber-700 leading-relaxed arabic-text">
            {t('calculators.goldSilver.fiqhNote.description', 'الحلي المستعملة للزينة المعتادة: اختلف العلماء في وجوب الزكاة فيها. الأحوط إخراج زكاتها، وخاصة إذا كانت كثيرة أو مدخرة للاستثمار.')}
          </p>
        </div>

        {/* شروط زكاة الذهب والفضة */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-5">
          <h4 className="font-bold text-yellow-800 mb-3 arabic-text">
            {t('calculators.goldSilver.conditions.title', 'شروط زكاة الذهب والفضة:')}
          </h4>
          <ul className="text-sm text-yellow-700 space-y-2 arabic-text">
            {t('calculators.goldSilver.conditions.items', [
              'أن يبلغ النصاب المقرر شرعاً',
              'أن يمر عليه الحول الهجري كاملاً',
              'أن يكون فائضاً عن الحاجات الأساسية',
              'تُحسب الزكاة على الوزن الصافي',
              'معدل الزكاة: 2.5% من الوزن أو القيمة'
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-600 ml-2 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* نصاب الذهب والفضة */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
          <h4 className="font-bold text-green-800 mb-3 arabic-text">
            {t('calculators.goldSilver.nisab.title', 'نصاب الذهب والفضة:')}
          </h4>
          <div className="text-sm text-green-700 space-y-2 arabic-text">
            <div><strong>{t('calculators.goldSilver.nisab.gold', 'الذهب:')}</strong> {t('calculators.goldSilver.nisab.goldDesc', '85 {gram} (20 {mithqal})').replace('{gram}', t('calculators.goldSilver.units.gram', 'جرام')).replace('{mithqal}', t('calculators.goldSilver.units.mithqal', 'مثقال'))}</div>
            <div><strong>{t('calculators.goldSilver.nisab.silver', 'الفضة:')}</strong> {t('calculators.goldSilver.nisab.silverDesc', '595 {gram} (200 {dirham})').replace('{gram}', t('calculators.goldSilver.units.gram', 'جرام')).replace('{dirham}', t('calculators.goldSilver.units.dirham', 'درهم'))}</div>
            <div><strong>{t('calculators.goldSilver.nisab.rate', 'معدل الزكاة:')}</strong> {t('calculators.goldSilver.nisab.rateDesc', '2.5% من الوزن أو القيمة')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldSilverCalculator;
