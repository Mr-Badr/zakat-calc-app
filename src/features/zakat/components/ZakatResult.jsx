import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, Calculator, Download, BookOpen, AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';
import { getIslamicEvidence } from '@/features/zakat/utils/islamicEvidence';
import { generateZakatPDF as generatePDF } from '@/features/zakat/utils/pdfGenerator';

const ZakatResult = ({ result, zakatType, madhab, currency = 'USD' }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Dynamically import the relevant faq.json for the current language
    async function loadFaqs() {
      try {
        const faqData = await import(`@/locales/${language}/faq.json`);
        // Try to get type-specific questions, fallback to general
        const typeFaqs = faqData.default?.[zakatType] || [];
        // If not found, fallback to first 2 general questions
        const generalFaqs = [
          { q: faqData.default.q1, a: faqData.default.a1 },
          { q: faqData.default.q2, a: faqData.default.a2 }
        ];
        setFaqs(typeFaqs.length ? typeFaqs : generalFaqs);
      } catch (e) {
        setFaqs([]);
      }
    }
    loadFaqs();
  }, [language, zakatType]);

  if (!result) return null;

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(num);
  };

  const getMadhabName = (madhab) => {
    const madhabNames = {
      hanafi: t('madhabs.madhabs.hanafi.name', 'الحنفي'),
      maliki: t('madhabs.madhabs.maliki.name', 'المالكي'),
      shafii: t('madhabs.madhabs.shafii.name', 'الشافعي'),
      hanbali: t('madhabs.madhabs.hanbali.name', 'الحنبلي')
    };
    return madhabNames[madhab] || madhab;
  };

  const getZakatTypeName = (type) => {
    const typeNames = {
      money: t('zakatTypes.types.money.name', 'زكاة المال النقدي'),
      goldSilver: t('zakatTypes.types.goldSilver.name', 'زكاة الذهب والفضة'),
      business: t('zakatTypes.types.business.name', 'زكاة عروض التجارة'),
      agriculture: t('zakatTypes.types.agriculture.name', 'زكاة الزروع والثمار'),
      livestock: t('zakatTypes.types.livestock.name', 'زكاة الأنعام'),
      income: t('zakatTypes.types.income.name', 'زكاة الدخل والراتب'),
      rental: t('zakatTypes.types.rental.name', 'زكاة العقارات المؤجرة'),
      investments: t('zakatTypes.types.investments.name', 'زكاة الأسهم والاستثمارات')
    };
    return typeNames[type] || type;
  };

  const handleDownloadPDF = async () => {
    try {
      await generatePDF({
        result,
        zakatType: getZakatTypeName(zakatType),
        madhab: getMadhabName(madhab),
        currency,
        evidence: getIslamicEvidence(zakatType, madhab),
        language
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const evidence = getIslamicEvidence(zakatType, madhab);

  return (
    <div className="space-y-6">
      {/* البطاقة الرئيسية للنتيجة */}
      <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-purple-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Calculator className={`text-purple-600 ${isRTL ? 'ml-3' : 'mr-3'}`} size={24} />
            <h3 className="text-xl font-bold text-purple-800 arabic-text">
              {t('results.title', 'نتيجة حساب الزكاة')}
            </h3>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <Download size={18} />
            <span className="arabic-text">{t('common.buttons.download', 'تحميل PDF')}</span>
          </button>
        </div>

        {/* حالة وجوب الزكاة */}
        <div className={`p-4 rounded-lg mb-6 flex items-center ${
          result.isDue 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="ml-4">
            {result.isDue ? (
              <CheckCircle className="text-green-600" size={32} />
            ) : (
              <XCircle className="text-red-600" size={32} />
            )}
          </div>

          <div className="flex-1">
            <h4 className={`font-bold text-lg mb-2 arabic-text ${result.isDue ? 'text-green-800' : 'text-red-800'}`}>
              {result.isDue 
                ? t('common.status.due', 'تجب عليك الزكاة')
                : t('common.status.notDue', 'لا تجب عليك الزكاة')
              }
            </h4>
            <p className="text-sm text-gray-600 arabic-text">
              {result.isDue 
                ? t('common.status.dueDescription', 'المال يبلغ النصاب المقرر شرعاً ووجبت عليك الزكاة')
                : t('common.status.notDueDescription', 'المال لا يبلغ النصاب المقرر شرعاً فلا زكاة عليك حالياً')
              }
            </p>
          </div>
        </div>

        {/* تفاصيل الحساب */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {result.isDue && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2 arabic-text">
                {t('results.zakatAmount.title', 'مبلغ الزكاة الواجب إخراجه')}
              </h4>
              <div className="text-2xl font-bold text-green-700 english-numbers">
                {zakatType.includes('livestock') || zakatType.includes('agriculture') 
                  ? `${formatNumber(result.amount)} ${zakatType.includes('livestock') ? t('results.livestock.unit', 'رأس') : t('results.agriculture.unit', 'كيلوجرام')}`
                  : `${formatNumber(result.amount)} ${currency}`
                }
              </div>
              {result.rate > 0 && (
                <p className="text-xs text-green-600 arabic-text mt-1">
                  {t('results.zakatAmount.rate', 'معدل الزكاة: {rate}%').replace('{rate}', (result.rate * 100).toFixed(1))}
                </p>
              )}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2 arabic-text">
              {t('results.nisab.title', 'النصاب المقرر شرعاً')}
            </h4>
            <div className="text-xl font-bold text-blue-700 english-numbers">
              {zakatType.includes('livestock') || zakatType.includes('agriculture')
                ? `${formatNumber(result.nisab)} ${zakatType.includes('livestock') ? t('results.livestock.unit', 'رأس') : t('results.agriculture.unit', 'كيلوجرام')}`
                : `${formatNumber(result.nisab)} ${currency}`
              }
            </div>
            <p className="text-xs text-blue-600 arabic-text mt-1">
              {t('results.nisab.description', 'الحد الأدنى لوجوب الزكاة')}
            </p>
          </div>
        </div>

        {/* الشرح التفصيلي */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <Info className={`text-gray-600 ${isRTL ? 'ml-3' : 'mr-3'} mt-1 flex-shrink-0`} size={18} />
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 arabic-text">
                {t('results.explanation.title', 'شرح تفصيلي للحساب:')}
              </h4>
              {result.explanationKey && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-2 arabic-text">
                    {t('results.explanation', 'شرح النتيجة')}
                  </h4>
                  <p className="text-gray-600 arabic-text">
                    {t(`results.explanations.${result.explanationKey}`)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ملاحظة المذهب */}
        {result.madhhabNote && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2 arabic-text">
              {t('results.madhabNote.title', 'ملاحظة فقهية - المذهب {madhab}:').replace('{madhab}', getMadhabName(madhab))}
            </h4>
            <p className="text-sm text-amber-700 arabic-text leading-relaxed">
              {result.madhhabNote}
            </p>
          </div>
        )}

        {/* More Info Button */}
        <div className="mt-6 text-right">
          <a
            href={`/${language}/zakat/${zakatType}#fiqh`}
            className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-all duration-200 text-sm font-medium shadow-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen size={16} className="mr-2" />
            {t('results.moreInfo', 'مزيد من المعلومات الفقهية')}
          </a>
        </div>
      </div>

      {/* الأدلة الشرعية */}
      <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-emerald-500">
        <div className="flex items-center mb-4">
          <BookOpen className={`text-emerald-600 ${isRTL ? 'ml-3' : 'mr-3'}`} size={24} />
          <h3 className="text-xl font-bold text-emerald-800 arabic-text">
            {t('results.evidence.title', 'الأدلة الشرعية')}
          </h3>
        </div>

        <div className="space-y-4">
          {/* الآية القرآنية */}
          {evidence && evidence.quranVerse && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-2 arabic-text">
                {t('results.quranEvidence', 'الدليل من القرآن')}
              </h4>
              <p className="text-gray-600 arabic-text">
                {t(`results.quranVerses.${evidence.quranVerse.key}.text`)}
              </p>
              <p className="text-gray-500 text-sm arabic-text">
                {t(`results.quranVerses.${evidence.quranVerse.key}.reference`)}
              </p>
            </div>
          )}

          {/* الحديث الشريف */}
          {evidence.hadith && (
            <div className="border-r-4 border-blue-400 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 arabic-text">
                {t('results.evidence.hadith', 'من السنة النبوية:')}
              </h4>
              <div className="bg-white p-3 rounded border mb-2">
                <p className="text-gray-800 arabic-text leading-relaxed">
                  "{evidence.hadith.text}"
                </p>
              </div>
              <p className="text-xs text-blue-700 arabic-text">
                {evidence.hadith.reference}
              </p>
            </div>
          )}

          {/* الإجماع الفقهي */}
          {evidence.consensus && (
            <div className="border-r-4 border-purple-400 bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2 arabic-text">
                {t('results.evidence.consensus', 'الإجماع الفقهي:')}
              </h4>
              <p className="text-sm text-purple-700 arabic-text leading-relaxed">
                {evidence.consensus}
              </p>
            </div>
          )}

          {/* رأي المذهب */}
          {evidence.madhabOpinion && (
            <div className="border-r-4 border-amber-400 bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2 arabic-text">
                {t('results.evidence.madhabOpinion', 'رأي المذهب {madhab}:').replace('{madhab}', getMadhabName(madhab))}
              </h4>
              <p className="text-sm text-amber-700 arabic-text leading-relaxed">
                {evidence.madhabOpinion}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* تذكير مهم */}
      {result.isDue && (
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-orange-500">
          <div className="flex items-start">
            <AlertTriangle className={`text-orange-600 ${isRTL ? 'ml-3' : 'mr-3'} mt-1 flex-shrink-0`} size={24} />
            <div>
              <h4 className="font-bold text-orange-800 mb-3 arabic-text">
                {t('results.reminder.title', 'تذكير مهم قبل إخراج الزكاة:')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <ul className="text-sm text-orange-700 space-y-2 arabic-text">
                  {t('results.reminder.items', [
                    'تأكد من مرور الحول الهجري الكامل (354 يوماً) على المال',
                    'أخرج الزكاة للمستحقين الثمانية المذكورين في القرآن الكريم',
                    'يُستحب إخراج الزكاة في شهر رمضان أو الأشهر الحرم',
                    'احسب الزكاة بالتاريخ الهجري وليس الميلادي',
                    'تأكد من صحة الحسابات واستشر أهل العلم عند الشك',
                    'النية مهمة في إخراج الزكاة'
                  ]).slice(0, 3).map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
                <ul className="text-sm text-orange-700 space-y-2 arabic-text">
                  {t('results.reminder.items', [
                    'تأكد من مرور الحول الهجري الكامل (354 يوماً) على المال',
                    'أخرج الزكاة للمستحقين الثمانية المذكورين في القرآن الكريم',
                    'يُستحب إخراج الزكاة في شهر رمضان أو الأشهر الحرم',
                    'احسب الزكاة بالتاريخ الهجري وليس الميلادي',
                    'تأكد من صحة الحسابات واستشر أهل العلم عند الشك',
                    'النية مهمة في إخراج الزكاة'
                  ]).slice(3).map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Small FAQ Section */}
      {faqs.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 mt-2">
          <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
            <Info size={18} className="mr-2" />
            {t('faq.title', 'الأسئلة الشائعة')}
          </h4>
          <ul className="space-y-4">
            {faqs.slice(0, 3).map((faq, i) => (
              <li key={i} className="bg-white rounded-lg border border-blue-100 p-4 shadow-sm">
                <div className="font-semibold text-gray-800 mb-1">{faq.q}</div>
                <div className="text-gray-600 text-sm">{faq.a}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ZakatResult;
