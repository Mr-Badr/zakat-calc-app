'use client'

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Minus, Info, Calendar, AlertTriangle, TrendingUp, Target } from 'lucide-react';
import { calculateInvestmentZakat } from '@/features/zakat/utils/zakatCalculations';
import { useTranslation } from '@/context/TranslationContext';

const InvestmentCalculator = ({ madhab, currency, goldPrice, onCalculation }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [totalValue, setTotalValue] = useState('');
  const [dividends, setDividends] = useState('');
  const [capitalGains, setCapitalGains] = useState('');
  const [investmentFees, setInvestmentFees] = useState('');
  const [investmentType, setInvestmentType] = useState('islamic');
  const [holdingPeriod, setHoldingPeriod] = useState('long');
  const [tradeIntention, setTradeIntention] = useState(false);
  const [hawlStartDate, setHawlStartDate] = useState('');
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    if (totalValue && goldPrice) {
      const result = calculateInvestmentZakat(
        parseFloat(totalValue) || 0,
        parseFloat(dividends) || 0,
        parseFloat(capitalGains) || 0,
        parseFloat(investmentFees) || 0,
        investmentType,
        holdingPeriod,
        madhab,
        goldPrice,
        currency,
        hawlStartDate || null,
        tradeIntention
      );
      onCalculation(result);
    }
  }, [
    totalValue,
    dividends,
    capitalGains,
    investmentFees,
    investmentType,
    holdingPeriod,
    tradeIntention,
    hawlStartDate,
    madhab,
    goldPrice,
    currency,
    onCalculation
  ]);

  const investmentTypes = [
    { 
      id: 'islamic', 
      name: t('calculators.investments.fields.investmentType.islamic', 'استثمار إسلامي'), 
      description: t('calculators.investments.fields.investmentType.islamicDesc', 'صناديق إسلامية، أسهم متوافقة'),
      icon: '🕌'
    },
    { 
      id: 'conventional', 
      name: t('calculators.investments.fields.investmentType.conventional', 'استثمار عادي'), 
      description: t('calculators.investments.fields.investmentType.conventionalDesc', 'أسهم عادية، صناديق تقليدية'),
      icon: '📈'
    }
  ];

  const holdingPeriods = [
    { 
      id: 'long', 
      name: t('calculators.investments.fields.holdingPeriod.long', 'طويل المدى'), 
      description: t('calculators.investments.fields.holdingPeriod.longDesc', 'استثمار للربح طويل المدى'),
      icon: '📅'
    },
    { 
      id: 'short', 
      name: t('calculators.investments.fields.holdingPeriod.short', 'قصير المدى'), 
      description: t('calculators.investments.fields.holdingPeriod.shortDesc', 'تداول قصير المدى'),
      icon: '⚡'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Calculator className={`icon-purple ${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        <h3 className="text-xl font-bold text-purple-800 arabic-text">
          {t('calculators.investments.title', 'حاسبة زكاة الاستثمارات')}
        </h3>
      </div>

      <div className="space-y-6 font-body">
        {/* نوع الاستثمار */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.investments.fields.investmentType.label', 'نوع الاستثمار')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {investmentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setInvestmentType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  investmentType === type.id
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className="font-semibold arabic-text">{type.name}</div>
                <div className="text-xs text-gray-600 mt-1 arabic-text">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* فترة الاحتفاظ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            {t('calculators.investments.fields.holdingPeriod.label', 'فترة الاحتفاظ')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {holdingPeriods.map((period) => (
              <button
                key={period.id}
                onClick={() => setHoldingPeriod(period.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  holdingPeriod === period.id
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-2xl mb-2">{period.icon}</div>
                <div className="font-semibold arabic-text">{period.name}</div>
                <div className="text-xs text-gray-600 mt-1 arabic-text">{period.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* نية التجارة (للاستثمار قصير المدى) */}
        {holdingPeriod === 'short' && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="tradeIntention"
                checked={tradeIntention}
                onChange={(e) => setTradeIntention(e.target.checked)}
                className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="tradeIntention" className="mr-2 text-sm font-medium text-amber-800 arabic-text">
                {t('calculators.investments.fields.tradeIntention.label', 'نية التجارة')}
              </label>
            </div>
            <p className="text-xs text-amber-700 arabic-text">
              {t('calculators.investments.fields.tradeIntention.help', 'هل هذا الاستثمار بغرض التجارة قصيرة المدى؟ إذا كانت الإجابة نعم، فستخضع القيمة الكاملة للزكاة.')}
            </p>
          </div>
        )}

        {/* القيمة الإجمالية للاستثمار */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <DollarSign className={`inline icon-green ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.investments.fields.totalValue.label', 'القيمة الإجمالية للاستثمار')} ({currency})
          </label>
          <input
            type="number"
            value={totalValue}
            onChange={(e) => setTotalValue(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.investments.fields.totalValue.placeholder', `القيمة السوقية الحالية بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* الأرباح الموزعة */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <TrendingUp className={`inline icon-green ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.investments.fields.dividends.label', 'الأرباح الموزعة السنوية')} ({currency})
          </label>
          <input
            type="number"
            value={dividends}
            onChange={(e) => setDividends(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.investments.fields.dividends.placeholder', `الأرباح الموزعة بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* الأرباح الرأسمالية */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Target className={`inline icon-green ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.investments.fields.capitalGains.label', 'الأرباح الرأسمالية المحققة')} ({currency}) - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="number"
            value={capitalGains}
            onChange={(e) => setCapitalGains(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.investments.fields.capitalGains.placeholder', `الأرباح من بيع الاستثمارات بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* رسوم الاستثمار */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Minus className={`inline icon-red ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.investments.fields.investmentFees.label', 'رسوم الاستثمار السنوية')} ({currency}) - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="number"
            value={investmentFees}
            onChange={(e) => setInvestmentFees(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-left english-numbers text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.investments.fields.investmentFees.placeholder', `رسوم الإدارة والعمولات بعملة ${currency}`).replace('{currency}', currency)}
          />
        </div>

        {/* تاريخ بداية الحول */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 arabic-text">
            <Calendar className={`inline icon-blue ${isRTL ? 'ml-1' : 'mr-1'}`} size={16} />
            {t('calculators.investments.fields.hawlStartDate.label', 'تاريخ بداية الحول الهجري')} - {t('common.status.optional', 'اختياري')}
          </label>
          <input
            type="date"
            value={hawlStartDate}
            onChange={(e) => setHawlStartDate(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left text-lg font-medium transition-all duration-200"
            placeholder={t('calculators.investments.fields.hawlStartDate.placeholder', 'تاريخ بداية الاستثمار')}
          />
          <p className="text-xs text-gray-600 mt-2 arabic-text">
            {t('calculators.investments.fields.hawlStartDate.help', 'إذا لم تدخل التاريخ، سيتم افتراض أن الحول مكتمل')}
          </p>
        </div>

        {/* تنبيه إسلامي مهم */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 mb-3 flex items-center arabic-text">
            <AlertTriangle className="icon-amber ml-2" size={18} />
            {t('calculators.investments.islamicNote.title', 'تنبيه إسلامي مهم')}
          </h4>
          <div className="text-sm text-amber-700 space-y-2 arabic-text">
            <p>
              {holdingPeriod === 'short' && tradeIntention 
                ? t('calculators.investments.islamicNote.trading', '⚠️ الاستثمار بغرض التجارة: زكاة على القيمة السوقية الكاملة بعد خصم المصروفات.')
                : t('calculators.investments.islamicNote.investment', '✅ الاستثمار طويل المدى: زكاة على الأرباح الموزعة والمحققة فقط، وليس على رأس المال.')
              }
            </p>
            <p className="font-semibold">
              {t('calculators.investments.islamicNote.recommendation', 'استشر أهل العلم في بلدك للفتوى المناسبة لحالتك الاستثمارية.')}
          </p>
          </div>
        </div>

        {/* شروط زكاة الاستثمارات */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-5">
          <h4 className="font-bold text-purple-800 mb-3 flex items-center arabic-text">
            <Info className="icon-purple ml-2" size={18} />
            {t('calculators.investments.conditions.title', 'شروط زكاة الاستثمارات')}
          </h4>
          <ul className="text-sm text-purple-700 space-y-2 arabic-text">
            {t('calculators.investments.conditions.items', [
              'أن يبلغ الاستثمار النصاب المقرر شرعاً',
              'أن يمر عليه الحول الهجري كاملاً (354 يوماً)',
              'أن يكون الاستثمار من مصدر مباح',
              'تُطرح رسوم الاستثمار من الأرباح',
              'معدل الزكاة: 2.5% من الأرباح المحققة'
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-600 ml-2">•</span>
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
              ? t('calculators.investments.madhabNote.hanafi', 'المذهب الحنفي يعتمد نصاب الفضة (595 {gram}) في زكاة الاستثمارات. يفرق بين الاستثمار والتجارة في أحكام الزكاة.').replace('{gram}', t('calculators.goldSilver.units.gram', 'جرام'))
              : (() => {
                  const madhabNames = {
                    maliki: t('madhabs.maliki', 'المالكي'),
                    shafii: t('madhabs.shafii', 'الشافعي'),
                    hanbali: t('madhabs.hanbali', 'الحنبلي')
                  };
                  const madhabName = madhabNames[madhab] || madhab;
                  return t('calculators.investments.madhabNote.others', `المذهب {madhab} يعتمد نصاب الذهب (85 {gram}) في زكاة الاستثمارات. يفرق بين الاستثمار طويل المدى والتجارة قصيرة المدى.`).replace('{madhab}', madhabName).replace('{gram}', t('calculators.goldSilver.units.gram', 'جرام'));
                })()
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
