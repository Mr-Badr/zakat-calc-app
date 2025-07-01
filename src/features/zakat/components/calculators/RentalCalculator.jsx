'use client'

import React, { useState, useEffect } from 'react';
import { Home, Wrench, DollarSign, Calculator } from 'lucide-react';
import { calculateRentalZakat } from '@/features/zakat/utils/zakatCalculations';
import { useTranslation } from '@/context/TranslationContext';

const RentalCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [monthlyRent, setMonthlyRent] = useState('');
  const [annualExpenses, setAnnualExpenses] = useState('');
  const [propertyType, setPropertyType] = useState('residential');
  const [calculationMethod, setCalculationMethod] = useState('monthly');
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    if (monthlyRent && goldPrice) {
      const result = calculateRentalZakat(
        parseFloat(monthlyRent) || 0,
        parseFloat(annualExpenses) || 0,
        propertyType,
        calculationMethod,
        madhab,
        goldPrice,
        currency
      );
      onCalculation(result);
    }
  }, [
    monthlyRent,
    annualExpenses,
    propertyType,
    calculationMethod,
    madhab,
    goldPrice,
    currency,
    onCalculation
  ]);

  const propertyTypes = [
    { id: 'residential', name: t('calculators.rental.fields.propertyType.residential', 'سكني'), icon: '🏠', description: t('calculators.rental.fields.propertyType.residentialDesc', 'شقق ومنازل سكنية') },
    { id: 'commercial', name: t('calculators.rental.fields.propertyType.commercial', 'تجاري'), icon: '🏢', description: t('calculators.rental.fields.propertyType.commercialDesc', 'محلات ومكاتب تجارية') },
    { id: 'industrial', name: t('calculators.rental.fields.propertyType.industrial', 'صناعي'), icon: '🏭', description: t('calculators.rental.fields.propertyType.industrialDesc', 'مصانع ومستودعات') },
    { id: 'agricultural', name: t('calculators.rental.fields.propertyType.agricultural', 'زراعي'), icon: '🌾', description: t('calculators.rental.fields.propertyType.agriculturalDesc', 'أراضي ومزارع') }
  ];

  const calculationMethods = [
    { id: 'monthly', name: t('calculators.rental.calculationMethod.monthly', 'شهري (تيسيراً)'), description: t('calculators.rental.calculationMethod.monthlyDesc', 'إخراج الزكاة شهرياً عند استلام الإيجار') },
    { id: 'annual', name: t('calculators.rental.calculationMethod.annual', 'سنوي (الأصل)'), description: t('calculators.rental.calculationMethod.annualDesc', 'جمع الإيرادات لمدة سنة ثم إخراج الزكاة') }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Home className={`icon-orange ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-orange-800 arabic-text">
          {t('calculators.rental.title', 'حاسبة زكاة الإيجارات')}
        </h3>
      </div>

      <div className="space-y-6">
        {/* نوع العقار */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.rental.fields.propertyType.label', 'نوع العقار المؤجر')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setPropertyType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  propertyType === type.id
                    ? 'border-orange-500 bg-orange-50 text-orange-800'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
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
            {t('calculators.rental.calculationMethod.title', 'طريقة الحساب:')}
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

        {/* الإيجار الشهري */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <DollarSign className="inline icon-green ml-1" size={16} />
            {t('calculators.rental.fields.monthlyRent.label', 'الإيجار الشهري')} ({currency})
          </label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 currency-input text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.rental.fields.monthlyRent.placeholder', `أدخل الإيجار الشهري بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* المصروفات السنوية */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Wrench className={`inline icon-red ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.rental.fields.annualExpenses.label', 'المصروفات السنوية')} ({currency}) - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="number"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 currency-input text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.rental.fields.annualExpenses.placeholder', `صيانة، تأمين، ضرائب بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* ملاحظة فقهية مهمة */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 mb-3 arabic-text">
            {t('calculators.rental.fiqhNote.title', 'ملاحظة فقهية مهمة:')}
          </h4>
          <p className="text-sm text-amber-700 leading-relaxed arabic-text">
            {t('calculators.rental.fiqhNote.description', 'اختلف العلماء في زكاة الإيجارات. البعض يرى إخراجها شهرياً عند استلام الإيجار، والبعض يرى جمعها لمدة سنة ثم إخراج زكاتها. استشر أهل العلم في بلدك.')}
          </p>
        </div>

        {/* شروط زكاة الإيجارات */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-5">
          <h4 className="font-bold text-orange-800 mb-3 arabic-text">
            {t('calculators.rental.conditions.title', 'شروط زكاة الإيجارات:')}
          </h4>
          <ul className="text-sm text-orange-700 space-y-2 arabic-text">
            {t('calculators.rental.conditions.items', [
              'أن يكون الإيجار من عقار مباح',
              'أن يبلغ النصاب المقرر شرعاً',
              'أن يكون الإيجار فائضاً عن الحاجات الأساسية',
              'يُطرح من الإيجار المصروفات الضرورية',
              'معدل الزكاة: 2.5% من صافي الإيجار'
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-600 ml-2 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RentalCalculator;
