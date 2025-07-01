'use client'
import React from 'react';
import { BookOpen, Heart, Shield, AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

const Footer = () => {
  const { t } = useTranslation();

  // Use translations from context
  const footerTitle = t('footer.title', 'حاسبة الزكاة المتقدمة');
  const footerDescription = t('footer.description', 'أداة إسلامية متقدمة لحساب الزكاة بدقة وفق المذاهب الأربعة');
  const footerCopyright = t('footer.copyright', `جميع الحقوق محفوظة © ${new Date().getFullYear()} حاسبة الزكاة المتقدمة`);
  const footerMadeWith = t('footer.madeWith', 'صنع بـ');
  const footerForMuslims = t('footer.forMuslims', 'للمسلمين في جميع أنحاء العالم');

  return (
    <footer className="bg-gray-800 text-white py-8 px-4 mt-12 font-body">
      <div className="max-w-6xl mx-auto">
        {/* إخلاء المسؤولية الرئيسي */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6 text-gray-800">
          <div className="flex items-start">
            <Shield className="text-amber-600 ml-3 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-amber-800 mb-3 text-lg font-title arabic-text">
                {t('footer.disclaimer.title', 'إخلاء المسؤولية الشرعية')}
              </h3>
              <div className="space-y-2 text-sm leading-relaxed arabic-text">
                <p>
                  <strong>{t('footer.disclaimer.main', 'هذه الحاسبة مبنية على القواعد الفقهية الإسلامية العامة من مصادر معتبرة وتستخدم سعر الذهب لتحديد النصاب.')}</strong>{' '}
                  {t('footer.disclaimer.calculations', 'الحسابات مقدمة لأغراض تعليمية وإرشادية فقط. قد تؤثر الاختلافات بين المذاهب الفقهية على أحكام معينة.')}
                </p>
                <p>
                  <strong>{t('footer.disclaimer.consultation', 'ننصح بشدة باستشارة عالم شرعي مختص أو السلطة المحلية المختصة في الحالات المعقدة أو الفردية.')}</strong>{' '}
                  {t('footer.disclaimer.tool', 'هذه الأداة لا تغني عن الاستشارة الشرعية المتخصصة.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* إخلاء مسؤولية أسعار الذهب */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-gray-800">
          <div className="flex items-start">
            <AlertTriangle className="text-blue-600 ml-2 mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2 font-title arabic-text">
                {t('footer.goldPriceWarning.title', 'تنبيه حول أسعار الذهب')}
              </h4>
              <p className="text-sm arabic-text">
                <strong>{t('footer.goldPriceWarning.main', 'أسعار الذهب يتم جلبها من مصادر عامة، ولكننا لا نضمن دقتها بنسبة 100%.')}</strong>{' '}
                {t('footer.goldPriceWarning.verify', 'يُرجى التحقق من الأسعار محلياً عند الحاجة. الأسعار قد تتأخر أو تختلف عن الأسعار الفعلية في السوق المحلي.')}
              </p>
            </div>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex items-center mb-3">
              <BookOpen className="text-emerald-400 ml-2" size={20} />
              <h3 className="font-semibold font-title arabic-text">
                {t('footer.references.title', 'المراجع الشرعية')}
              </h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-1 font-body arabic-text">
              {t('footer.references.items', [
                'القرآن الكريم والسنة النبوية الصحيحة',
                'كتب الفقه المعتمدة في المذاهب الأربعة',
                'قرارات المجامع الفقهية المعاصرة',
                'فتاوى العلماء المعتبرين والمؤسسات الشرعية',
                'الموسوعة الفقهية الكويتية'
              ]).map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center mb-3">
              <Heart className="text-red-400 ml-2" size={20} />
              <h3 className="font-semibold font-title arabic-text">
                {t('footer.objectives.title', 'أهداف المشروع')}
              </h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-1 font-body arabic-text">
              {t('footer.objectives.items', [
                'تسهيل حساب الزكاة على المسلمين في العالم',
                'نشر الوعي بأحكام الزكاة وأهميتها',
                'دعم الشفافية في العبادات المالية',
                'توفير أداة مجانية وموثوقة ومحدثة',
                'خدمة الإسلام والمسلمين بلا مقابل'
              ]).map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* آية قرآنية */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 text-gray-800">
          <h3 className="text-lg font-semibold text-emerald-800 mb-3 text-center font-title arabic-text">
            {t('footer.quranVerse.title', 'آية الزكاة من القرآن الكريم')}
          </h3>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm font-body">
            <p className="text-lg text-gray-800 leading-relaxed mb-2 arabic-text">
              {t('footer.quranVerse.text', '"إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ فَرِيضَةً مِّنَ اللَّهِ وَاللَّهُ عَلِيمٌ حَكِيمٌ"')}
            </p>
            <p className="text-sm text-gray-600 arabic-text">
              {t('footer.quranVerse.reference', 'سورة التوبة - الآية 60')}
            </p>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-gray-700 pt-4 text-center font-body">
          <p className="text-sm text-gray-400 arabic-text">
            {footerCopyright}
          </p>
          <p className="text-xs text-gray-500 mt-1 arabic-text">
            {footerMadeWith} ❤️ {footerForMuslims} | وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
