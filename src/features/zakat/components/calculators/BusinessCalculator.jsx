import React, { useState, useEffect } from 'react';
import { Store, Package, CreditCard, Banknote, Info } from 'lucide-react';
import { calculateBusinessZakat } from '@/features/zakat/utils/zakatCalculations';
import { useTranslation } from '@/context/TranslationContext';

const BusinessCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [inventoryValue, setInventoryValue] = useState('');
  const [receivables, setReceivables] = useState('');
  const [payables, setPayables] = useState('');
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    if (inventoryValue && goldPrice) {
      const result = calculateBusinessZakat(
        parseFloat(inventoryValue) || 0,
        parseFloat(receivables) || 0,
        parseFloat(payables) || 0,
        currency,
        goldPrice,
        madhab
      );
      onCalculation(result);
    }
  }, [inventoryValue, receivables, payables, currency, goldPrice, madhab, onCalculation]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Store className={`icon-blue ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-blue-800 arabic-text">
          {t('calculators.business.title', 'حاسبة زكاة عروض التجارة')}
        </h3>
      </div>

      <div className="space-y-6">
        {/* قيمة البضائع */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Package className={`inline icon-blue ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.business.fields.inventory.label', 'قيمة البضائع والمخزون')} ({currency})
          </label>
          <input
            type="number"
            value={inventoryValue}
            onChange={(e) => setInventoryValue(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.business.fields.inventory.placeholder', `أدخل إجمالي قيمة البضائع بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* المدينون (لك) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <CreditCard className={`inline icon-green ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.business.fields.receivables.label', 'الأموال المستحقة لك - المدينون')} ({currency}) - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="number"
            value={receivables}
            onChange={(e) => setReceivables(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.business.fields.receivables.placeholder', `الديون المستحقة لك من العملاء بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* الديون (عليك) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Banknote className={`inline icon-red ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.business.fields.payables.label', 'الديون المستحقة عليك')} ({currency}) - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="number"
            value={payables}
            onChange={(e) => setPayables(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.business.fields.payables.placeholder', `الديون المستحقة عليك للموردين بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* معلومات مهمة */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center arabic-text">
            <Info className="icon-blue ml-2" size={18} />
            {t('calculators.business.valuation.title', 'كيفية تقدير قيمة البضائع')}
          </h4>
          <ul className="text-sm text-blue-700 space-y-2 arabic-text">
            {t('calculators.business.valuation.items', [
              'قدر البضائع بسعر البيع الحالي (وقت إخراج الزكاة)',
              'لا تحسب البضائع الراكدة أو التالفة',
              'اطرح قيمة الديون التجارية المستحقة عليك',
              'أضف الديون المؤكدة التحصيل من العملاء',
              'معدل الزكاة: 2.5% من صافي قيمة التجارة'
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 ml-2 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ملاحظة فقهية */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-5">
          <h4 className="font-bold text-indigo-800 mb-3 arabic-text">
            {t('calculators.business.fiqhNote.title', 'ملاحظة فقهية مهمة:')}
          </h4>
          <p className="text-sm text-indigo-700 leading-relaxed arabic-text">
            {t('calculators.business.fiqhNote.description', 'تُقوَّم عروض التجارة بسعر البيع في نهاية الحول الهجري، وليس بسعر الشراء. هذا يعني أن الزكاة تُحسب على القيمة السوقية الحالية للبضائع، مما يضمن العدالة في إخراج الزكاة حسب القيمة الفعلية.')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessCalculator;
