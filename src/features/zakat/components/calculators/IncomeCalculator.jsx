'use client'

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Minus, Info, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { calculateIncomeZakat } from '@/features/zakat/utils/zakatCalculations';
import { useTranslation } from '@/context/TranslationContext';

const IncomeCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [additionalIncome, setAdditionalIncome] = useState('');
  const [calculationMethod, setCalculationMethod] = useState('traditional');
  const [hawlStartDate, setHawlStartDate] = useState('');
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    if (monthlyIncome && goldPrice) {
      const result = calculateIncomeZakat(
        parseFloat(monthlyIncome) || 0,
        parseFloat(monthlyExpenses) || 0,
        parseFloat(additionalIncome) || 0,
        calculationMethod,
        madhab,
        goldPrice,
        currency,
        hawlStartDate || null
      );
      onCalculation(result);
    }
  }, [
    monthlyIncome,
    monthlyExpenses,
    additionalIncome,
    calculationMethod,
    hawlStartDate,
    madhab,
    goldPrice,
    currency,
    onCalculation
  ]);

  const calculationMethods = [
    { 
      id: 'traditional', 
      name: t('calculators.income.calculationMethod.traditional', 'الطريقة التقليدية (الأصح)'), 
      description: t('calculators.income.calculationMethod.traditionalDesc', 'تجميع الدخل لمدة سنة هجرية كاملة ثم إخراج الزكاة'),
      icon: '📅'
    },
    { 
      id: 'monthly', 
      name: t('calculators.income.calculationMethod.monthly', 'الطريقة الشهرية (رأي معاصر)'), 
      description: t('calculators.income.calculationMethod.monthlyDesc', 'إخراج زكاة الدخل شهرياً - رأي بعض العلماء المعاصرين'),
      icon: '📊'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Calculator className={`icon-blue ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-blue-800 arabic-text">
          {t('calculators.income.title', 'حاسبة زكاة الدخل والراتب')}
        </h3>
      </div>

      <div className="space-y-6 font-body">
        {/* طريقة الحساب */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.income.fields.calculationMethod.label', 'طريقة حساب الزكاة:')}
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
                <div className="text-2xl mb-2">{method.icon}</div>
                <div className="font-semibold arabic-text">{method.name}</div>
                <div className="text-xs text-gray-600 mt-1 arabic-text">{method.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* الدخل الشهري الأساسي */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <DollarSign className={`inline icon-green ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.income.fields.monthlyIncome.label', 'الدخل الشهري الأساسي')} ({currency})
          </label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.income.fields.monthlyIncome.placeholder', `الراتب الشهري بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* الدخل الإضافي */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <DollarSign className={`inline icon-green ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.income.fields.additionalIncome.label', 'الدخل الإضافي')} ({currency}) - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="number"
            value={additionalIncome}
            onChange={(e) => setAdditionalIncome(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.income.fields.additionalIncome.placeholder', `مكافآت، عمولات، دخل إضافي بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* المصروفات الشهرية */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Minus className={`inline icon-red ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.income.fields.monthlyExpenses.label', 'المصروفات الشهرية')} ({currency})
          </label>
          <input
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.income.fields.monthlyExpenses.placeholder', `المصروفات الضرورية بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* تاريخ بداية الحول (للطريقة التقليدية) */}
        {calculationMethod === 'traditional' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
              <Calendar className={`inline icon-blue ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
              {t('calculators.income.fields.hawlStartDate.label', 'تاريخ بداية الحول الهجري')}
          </label>
          <input
              type="date"
              value={hawlStartDate}
              onChange={(e) => setHawlStartDate(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left text-lg font-medium transition-all duration-200"
              placeholder={t('calculators.income.fields.hawlStartDate.placeholder', 'تاريخ بداية المدخرات')}
            />
            <p className="text-xs text-gray-600 mt-2 arabic-text">
              {t('calculators.income.fields.hawlStartDate.help', 'تاريخ بداية تجميع المدخرات من الدخل')}
            </p>
        </div>
        )}

        {/* تنبيه إسلامي مهم */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 mb-3 flex items-center arabic-text">
            <AlertTriangle className="icon-amber ml-2" size={18} />
            {t('calculators.income.islamicNote.title', 'تنبيه إسلامي مهم')}
          </h4>
          <div className="text-sm text-amber-700 space-y-2 arabic-text">
            <p>
              {calculationMethod === 'monthly' 
                ? t('calculators.income.islamicNote.monthly', '⚠️ الطريقة الشهرية هي رأي معاصر لبعض العلماء المعاصرين. الأصل في الزكاة أن تُخرج بعد مرور الحول الهجري على المال المدخر. استشر أهل العلم في بلدك.')
                : t('calculators.income.islamicNote.traditional', '✅ الطريقة التقليدية هي الأصل في الفقه الإسلامي. الزكاة تُخرج بعد مرور الحول الهجري (354 يوماً) على المال المدخر من الدخل.')
              }
            </p>
            <p className="font-semibold">
              {t('calculators.income.islamicNote.recommendation', 'نوصي بالطريقة التقليدية إلا إذا كان لديك فتوى من عالم موثوق في بلدك.')}
          </p>
          </div>
        </div>

        {/* شروط زكاة الدخل */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center arabic-text">
            <Info className="icon-blue ml-2" size={18} />
            {t('calculators.income.conditions.title', 'شروط زكاة الدخل')}
          </h4>
          <ul className="text-sm text-blue-700 space-y-2 arabic-text">
            {t('calculators.income.conditions.items', [
              'أن يبلغ الدخل المدخر النصاب المقرر شرعاً',
              'أن يمر عليه الحول الهجري كاملاً (354 يوماً)',
              'أن يكون الدخل فائضاً عن الحاجات الأساسية',
              'تُطرح المصروفات الضرورية من الدخل',
              'معدل الزكاة: 2.5% من الدخل الصافي المدخر'
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 ml-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ملاحظة المذهب */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
          <h4 className="font-bold text-green-800 mb-3 arabic-text">
            {t('common.madhabNote.title', 'حسب المذهب المختار:')}
          </h4>
          <p className="text-sm text-green-700 leading-relaxed arabic-text">
            {madhab === 'hanafi' 
              ? t('calculators.income.madhabNote.hanafi', 'المذهب الحنفي يعتمد نصاب الفضة (595 {gram}) في زكاة الدخل المدخر. بعض علماء الحنفية المعاصرين يجيزون الطريقة الشهرية تيسيراً.').replace('{gram}', t('calculators.goldSilver.units.gram', 'جرام'))
              : (() => {
                  const madhabNames = {
                    maliki: t('madhabs.maliki', 'المالكي'),
                    shafii: t('madhabs.shafii', 'الشافعي'),
                    hanbali: t('madhabs.hanbali', 'الحنبلي')
                  };
                  const madhabName = madhabNames[madhab] || madhab;
                  return t('calculators.income.madhabNote.others', `المذهب {madhab} يعتمد نصاب الذهب (85 {gram}) في زكاة الدخل المدخر. الأصل في المذاهب الثلاثة أن الزكاة تُخرج بعد مرور الحول.`).replace('{madhab}', madhabName).replace('{gram}', t('calculators.goldSilver.units.gram', 'جرام'));
                })()
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncomeCalculator;
