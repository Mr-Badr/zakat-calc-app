'use client'

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Minus, Info, Calendar, AlertTriangle } from 'lucide-react';
import { calculateMoneyZakat } from '@/features/zakat/utils/zakatCalculations';
import { useTranslation } from '@/context/TranslationContext';

const MoneyCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [amount, setAmount] = useState('');
  const [debts, setDebts] = useState('');
  const [hawlStartDate, setHawlStartDate] = useState('');
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    if (amount && goldPrice) {
      const result = calculateMoneyZakat(
        parseFloat(amount) || 0,
        currency,
        goldPrice,
        madhab,
        parseFloat(debts) || 0,
        hawlStartDate || null
      );
      onCalculation(result);
    }
  }, [amount, debts, hawlStartDate, currency, goldPrice, madhab, onCalculation]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Calculator className={`icon-green ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-green-800 arabic-text">
          {t('calculators.money.title', 'حاسبة زكاة المال النقدي')}
        </h3>
      </div>

      <div className="space-y-6 font-body">
        {/* مبلغ المال */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <DollarSign className={`inline icon-green ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.money.fields.amount.label', 'مبلغ المال المدخر')} ({currency})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.money.fields.amount.placeholder', `أدخل المبلغ بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* الديون */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Minus className={`inline icon-red ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.money.fields.debts.label', 'الديون المستحقة عليك')} ({currency})
          </label>
          <input
            type="number"
            value={debts}
            onChange={(e) => setDebts(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.money.fields.debts.placeholder', `أدخل مبلغ الديون بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* تاريخ بداية الحول */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Calendar className={`inline icon-blue ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.money.fields.hawlStartDate.label', 'تاريخ بداية الحول الهجري')} - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="date"
            value={hawlStartDate}
            onChange={(e) => setHawlStartDate(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.money.fields.hawlStartDate.placeholder', 'تاريخ بداية امتلاك المال')}
          />
          <p className="text-xs text-gray-600 mt-2 arabic-text">
            {t('calculators.money.fields.hawlStartDate.help', 'إذا لم تدخل التاريخ، سيتم افتراض أن الحول مكتمل')}
          </p>
        </div>

        {/* تنبيه إسلامي مهم */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 mb-3 flex items-center arabic-text">
            <AlertTriangle className="icon-amber ml-2" size={18} />
            {t('calculators.money.islamicNote.title', 'تنبيه إسلامي مهم')}
          </h4>
          <p className="text-sm text-amber-700 leading-relaxed arabic-text">
            {t('calculators.money.islamicNote.description', 'الأصل في الزكاة أن تُخرج بعد مرور الحول الهجري (354 يوماً) على المال المدخر. إذا لم يمر الحول بعد، فلا زكاة عليك حتى يكتمل الحول.')}
          </p>
        </div>

        {/* شروط زكاة المال النقدي */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-5">
          <h4 className="font-bold text-emerald-800 mb-3 flex items-center arabic-text">
            <Info className="icon-emerald ml-2" size={18} />
            {t('calculators.money.conditions.title', 'شروط زكاة المال النقدي')}
          </h4>
          <ul className="text-sm text-emerald-700 space-y-2 arabic-text">
            {t('calculators.money.conditions.items', [
              'أن يبلغ المال النصاب المقرر شرعاً',
              'أن يمر عليه الحول الهجري كاملاً (354 يوماً)',
              'أن يكون المال فائضاً عن الحاجات الأساسية',
              'يُطرح من المال الديون المستحقة عليك',
              'معدل الزكاة: 2.5% من المال الصافي'
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-600 ml-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ملاحظة المذهب */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
          <h4 className="font-bold text-blue-800 mb-3 arabic-text">
            {t('common.madhabNote.title', 'حسب المذهب المختار:')}
          </h4>
          <p className="text-sm text-blue-700 leading-relaxed arabic-text">
            {madhab === 'hanafi' 
              ? t('calculators.money.madhabNote.hanafi', 'المذهب الحنفي يعتمد نصاب الفضة (595 {gram}) لكونه أرفق بالفقراء وأكثر إخراجاً للزكاة. هذا يعني أن النصاب أقل، وبالتالي المزيد من الناس مطالبون بإخراج الزكاة.').replace('{gram}', t('calculators.goldSilver.units.gram', 'جرام'))
              : (() => {
                  const madhabNames = {
                    maliki: t('madhabs.maliki', 'المالكي'),
                    shafii: t('madhabs.shafii', 'الشافعي'),
                    hanbali: t('madhabs.hanbali', 'الحنبلي')
                  };
                  const madhabName = madhabNames[madhab] || madhab;
                  return t('calculators.money.madhabNote.others', `المذهب {madhab} يعتمد نصاب الذهب (85 {gram}) كأساس لحساب النصاب. هذا هو الأصل في زكاة النقود والأموال المدخرة.`).replace('{madhab}', madhabName).replace('{gram}', t('calculators.goldSilver.units.gram', 'جرام'));
                })()
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoneyCalculator;
