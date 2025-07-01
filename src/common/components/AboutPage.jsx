'use client'
import React from 'react';
import { useTranslation } from '@/context/TranslationContext';
import { Info, Users, Award, Shield, Heart, Globe } from 'lucide-react';

const AboutPage = () => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Info className={`${isRTL ? 'ml-3' : 'mr-3'} text-emerald-600`} size={32} />
            <h1 className="text-4xl font-bold text-gray-800 arabic-title">
              {t('about.title', 'حول حاسبة الزكاة المتقدمة')}
            </h1>
          </div>
          <p className="text-xl text-gray-600 arabic-text max-w-3xl mx-auto">
            {t('about.subtitle', 'أداة إسلامية متقدمة لحساب الزكاة بدقة وسهولة وفقاً للمذاهب الأربعة')}
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic-title">
            {t('about.mission.title', 'مهمتنا')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed arabic-text mb-6">
            {t('about.mission.description', 'نهدف إلى تسهيل عملية حساب الزكاة للمسلمين في جميع أنحاء العالم، من خلال توفير أداة دقيقة وسهلة الاستخدام تعتمد على الفقه الإسلامي الصحيح.')}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 space-x-reverse">
              <Shield className={`${isRTL ? 'ml-3' : 'mr-3'} text-emerald-600 mt-1`} size={24} />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 arabic-text">
                  {t('about.mission.accuracy', 'الدقة الفقهية')}
                </h3>
                <p className="text-gray-600 arabic-text">
                  {t('about.mission.accuracyDesc', 'حسابات دقيقة وفقاً للمذاهب الأربعة')}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 space-x-reverse">
              <Heart className={`${isRTL ? 'ml-3' : 'mr-3'} text-emerald-600 mt-1`} size={24} />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 arabic-text">
                  {t('about.mission.ease', 'سهولة الاستخدام')}
                </h3>
                <p className="text-gray-600 arabic-text">
                  {t('about.mission.easeDesc', 'واجهة بسيطة ومفهومة للجميع')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic-title">
            {t('about.features.title', 'المميزات الرئيسية')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-emerald-50 rounded-lg">
              <Globe className={`${isRTL ? 'ml-auto mr-auto' : 'mx-auto'} text-emerald-600 mb-4`} size={32} />
              <h3 className="font-semibold text-gray-800 mb-2 arabic-text">
                {t('about.features.multilingual', 'متعدد اللغات')}
              </h3>
              <p className="text-gray-600 text-sm arabic-text">
                {t('about.features.multilingualDesc', 'دعم العربية والإنجليزية والفرنسية')}
              </p>
            </div>
            <div className="text-center p-6 bg-emerald-50 rounded-lg">
              <Award className={`${isRTL ? 'ml-auto mr-auto' : 'mx-auto'} text-emerald-600 mb-4`} size={32} />
              <h3 className="font-semibold text-gray-800 mb-2 arabic-text">
                {t('about.features.accurate', 'حسابات دقيقة')}
              </h3>
              <p className="text-gray-600 text-sm arabic-text">
                {t('about.features.accurateDesc', 'أسعار ذهب وفضة مباشرة')}
              </p>
            </div>
            <div className="text-center p-6 bg-emerald-50 rounded-lg">
              <Users className={`${isRTL ? 'ml-auto mr-auto' : 'mx-auto'} text-emerald-600 mb-4`} size={32} />
              <h3 className="font-semibold text-gray-800 mb-2 arabic-text">
                {t('about.features.comprehensive', 'شامل')}
              </h3>
              <p className="text-gray-600 text-sm arabic-text">
                {t('about.features.comprehensiveDesc', 'جميع أنواع الزكاة المدعومة')}
              </p>
            </div>
          </div>
        </div>

        {/* Islamic Principles Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 arabic-title">
            {t('about.principles.title', 'المبادئ الإسلامية')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full mt-3"></div>
              <p className="arabic-text">
                {t('about.principles.accuracy', 'الدقة في الحسابات وفقاً للفقه الإسلامي')}
              </p>
            </div>
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full mt-3"></div>
              <p className="arabic-text">
                {t('about.principles.transparency', 'الشفافية في طريقة الحساب')}
              </p>
            </div>
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full mt-3"></div>
              <p className="arabic-text">
                {t('about.principles.ease', 'تسهيل أداء فريضة الزكاة')}
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 arabic-title">
            {t('about.cta.title', 'هل لديك أسئلة؟')}
          </h2>
          <p className="text-gray-600 mb-6 arabic-text">
            {t('about.cta.description', 'نحن هنا لمساعدتك في أي استفسارات حول الزكاة أو استخدام الحاسبة')}
          </p>
          <a
            href={`/${language}/contact`}
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors arabic-text"
          >
            {t('about.cta.button', 'اتصل بنا')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 