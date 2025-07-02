import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Info } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

const ZAKAT_RATE = 0.025;

const DebtsCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [debtsOwed, setDebtsOwed] = useState('');
  const [debtsReceivable, setDebtsReceivable] = useState('');
  const [cash, setCash] = useState('');
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    // Only calculate if cash or receivable is entered
    if ((cash || debtsReceivable) && goldPrice) {
      // Fiqh: Only strong/likely-to-be-paid receivables are zakatable
      const netAssets = (parseFloat(cash) || 0) + (parseFloat(debtsReceivable) || 0) - (parseFloat(debtsOwed) || 0);
      const isDue = netAssets > 0;
      const zakatAmount = isDue ? netAssets * ZAKAT_RATE : 0;
      onCalculation({
        isDue,
        amount: zakatAmount,
        netAssets,
        rate: ZAKAT_RATE,
        explanation: t('calculators.debts.explanation', 'صافي الأصول = النقد + الديون المستحقة - الديون المطلوبة. الزكاة على الديون القوية فقط.'),
        madhhabNote: t('calculators.debts.madhhabNote', 'جميع المذاهب: الديون القوية (الراجحة) تُزكى، الديون الضعيفة لا تجب فيها الزكاة حتى تُقبض.'),
        islamicNote: t('calculators.debts.islamicNote', 'استشر عالماً في حال وجود ديون متعثرة أو مشكوك فيها.')
      });
    }
  }, [cash, debtsOwed, debtsReceivable, goldPrice, t, onCalculation]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Calculator className={`icon-blue ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-blue-800 arabic-text">
          {t('calculators.debts.title', 'حاسبة زكاة الديون')}
        </h3>
      </div>
      <div className="space-y-6 font-body">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <DollarSign className={`inline icon-green ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.debts.fields.cash', 'النقد المتوفر')} ({currency})
          </label>
          <input
            type="number"
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.debts.fields.cashPlaceholder', `أدخل النقد المتوفر بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.debts.fields.receivable', 'الديون المستحقة لك (الراجحة)')} ({currency})
          </label>
          <input
            type="number"
            value={debtsReceivable}
            onChange={(e) => setDebtsReceivable(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.debts.fields.receivablePlaceholder', `أدخل الديون المستحقة بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.debts.fields.owed', 'الديون المطلوبة منك')} ({currency})
          </label>
          <input
            type="number"
            value={debtsOwed}
            onChange={(e) => setDebtsOwed(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.debts.fields.owedPlaceholder', `أدخل الديون المطلوبة بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 mb-3 arabic-text">
            {t('calculators.debts.fiqhNote.title', 'ملاحظة فقهية مهمة:')}
          </h4>
          <p className="text-sm text-amber-700 leading-relaxed arabic-text">
            {t('calculators.debts.fiqhNote.description', 'الزكاة تجب في الديون القوية (الراجحة) فقط. الديون الضعيفة لا تجب فيها الزكاة حتى تُقبض. استشر عالماً في حال وجود ديون متعثرة.')}
          </p>
        </div>
      </div>
      <div className="mt-6 text-right">
        <a href={`/${language}/zakat/debts#fiqh`} className="text-blue-600 underline text-sm flex items-center">
          <Info size={16} className="mr-1" /> {t('calculators.debts.moreInfo', 'مزيد من المعلومات الفقهية')}
        </a>
      </div>
    </div>
  );
};

export default DebtsCalculator; 