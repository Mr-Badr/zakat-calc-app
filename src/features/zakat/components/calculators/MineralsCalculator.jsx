import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Info } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

const MineralsCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [mineralsValue, setMineralsValue] = useState('');
  const [rikazValue, setRikazValue] = useState('');
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    // Calculate zakat for minerals (2.5%) and rikaz (20%)
    const minerals = parseFloat(mineralsValue) || 0;
    const rikaz = parseFloat(rikazValue) || 0;
    const mineralsZakat = minerals * 0.025;
    const rikazZakat = rikaz * 0.2;
    const totalZakat = mineralsZakat + rikazZakat;
    const isDue = minerals > 0 || rikaz > 0;
    onCalculation({
      isDue,
      amount: totalZakat,
      mineralsZakat,
      rikazZakat,
      explanation: t('calculators.minerals.explanation', 'زكاة المعادن: 2.5% من القيمة. زكاة الركاز: 20% من قيمة الكنز المستخرج.'),
      madhhabNote: t('calculators.minerals.madhhabNote', 'جميع المذاهب: زكاة الركاز 20% فوراً، زكاة المعادن 2.5% بعد مرور الحول.'),
      islamicNote: t('calculators.minerals.islamicNote', 'استشر عالماً في حال وجود معادن مختلطة أو حالات خاصة.')
    });
  }, [mineralsValue, rikazValue, t, onCalculation]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Calculator className={`icon-yellow ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-yellow-800 arabic-text">
          {t('calculators.minerals.title', 'حاسبة زكاة المعادن والركاز')}
        </h3>
      </div>
      <div className="space-y-6 font-body">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <DollarSign className={`inline icon-green ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.minerals.fields.minerals', 'قيمة المعادن المستخرجة')} ({currency})
          </label>
          <input
            type="number"
            value={mineralsValue}
            onChange={(e) => setMineralsValue(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.minerals.fields.mineralsPlaceholder', `أدخل قيمة المعادن بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.minerals.fields.rikaz', 'قيمة الركاز (الكنز المستخرج)')} ({currency})
          </label>
          <input
            type="number"
            value={rikazValue}
            onChange={(e) => setRikazValue(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.minerals.fields.rikazPlaceholder', `أدخل قيمة الركاز بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 mb-3 arabic-text">
            {t('calculators.minerals.fiqhNote.title', 'ملاحظة فقهية مهمة:')}
          </h4>
          <p className="text-sm text-amber-700 leading-relaxed arabic-text">
            {t('calculators.minerals.fiqhNote.description', 'زكاة الركاز 20% فوراً عند الاستخراج. زكاة المعادن 2.5% بعد مرور الحول. استشر عالماً في الحالات الخاصة.')}
          </p>
        </div>
      </div>
      <div className="mt-6 text-right">
        <a href={`/${language}/zakat/minerals#fiqh`} className="text-yellow-600 underline text-sm flex items-center">
          <Info size={16} className="mr-1" /> {t('calculators.minerals.moreInfo', 'مزيد من المعلومات الفقهية')}
        </a>
      </div>
    </div>
  );
};

export default MineralsCalculator; 