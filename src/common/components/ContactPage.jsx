'use client'
import React, { useState } from 'react';
import { useTranslation } from '@/context/TranslationContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';

const ContactPage = () => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert(t('contact.form.success', 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className={`${isRTL ? 'ml-3' : 'mr-3'} text-emerald-600`} size={32} />
            <h1 className="text-4xl font-bold text-gray-800 arabic-title">
              {t('contact.title', 'اتصل بنا')}
            </h1>
          </div>
          <p className="text-xl text-gray-600 arabic-text max-w-3xl mx-auto">
            {t('contact.subtitle', 'نحن هنا لمساعدتك في أي استفسارات حول الزكاة أو استخدام الحاسبة')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic-title">
              {t('contact.info.title', 'معلومات التواصل')}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 space-x-reverse">
                <Mail className={`${isRTL ? 'ml-3' : 'mr-3'} text-emerald-600 mt-1`} size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 arabic-text">
                    {t('contact.info.email', 'البريد الإلكتروني')}
                  </h3>
                  <p className="text-gray-600 arabic-text">support@zakatcalculator.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <Globe className={`${isRTL ? 'ml-3' : 'mr-3'} text-emerald-600 mt-1`} size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 arabic-text">
                    {t('contact.info.website', 'الموقع الإلكتروني')}
                  </h3>
                  <p className="text-gray-600 arabic-text">www.zakatcalculator.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <Clock className={`${isRTL ? 'ml-3' : 'mr-3'} text-emerald-600 mt-1`} size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 arabic-text">
                    {t('contact.info.response', 'وقت الاستجابة')}
                  </h3>
                  <p className="text-gray-600 arabic-text">
                    {t('contact.info.responseTime', 'خلال 24 ساعة')}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 arabic-title">
                {t('contact.faq.title', 'الأسئلة الشائعة')}
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 arabic-text">
                    {t('contact.faq.q1', 'كيف أحسب زكاة المال؟')}
                  </h4>
                  <p className="text-gray-600 text-sm arabic-text">
                    {t('contact.faq.a1', 'اختر حاسبة زكاة المال وأدخل المبلغ المدخر، ثم اختر المذهب الفقهي')}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 arabic-text">
                    {t('contact.faq.q2', 'هل الأسعار محدثة؟')}
                  </h4>
                  <p className="text-gray-600 text-sm arabic-text">
                    {t('contact.faq.a2', 'نعم، أسعار الذهب والفضة محدثة مباشرة من مصادر موثوقة')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic-title">
              {t('contact.form.title', 'أرسل رسالة')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 arabic-text">
                  {t('contact.form.name', 'الاسم الكامل')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder={t('contact.form.namePlaceholder', 'أدخل اسمك الكامل')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 arabic-text">
                  {t('contact.form.email', 'البريد الإلكتروني')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder={t('contact.form.emailPlaceholder', 'أدخل بريدك الإلكتروني')}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 arabic-text">
                  {t('contact.form.subject', 'الموضوع')} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder={t('contact.form.subjectPlaceholder', 'أدخل موضوع الرسالة')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 arabic-text">
                  {t('contact.form.message', 'الرسالة')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
                  placeholder={t('contact.form.messagePlaceholder', 'اكتب رسالتك هنا...')}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors arabic-text"
              >
                <Send className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={20} />
                {t('contact.form.send', 'إرسال الرسالة')}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 arabic-title">
            {t('contact.support.title', 'دعم فقهي')}
          </h2>
          <p className="text-lg mb-6 arabic-text">
            {t('contact.support.description', 'نحن نتعاون مع علماء وفقهاء موثوقين لضمان دقة الحسابات وفقاً للفقه الإسلامي الصحيح')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full arabic-text">
              ✅ {t('contact.support.accurate', 'حسابات دقيقة')}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full arabic-text">
              📚 {t('contact.support.scholarly', 'مراجعة علمية')}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full arabic-text">
              🔒 {t('contact.support.secure', 'آمن وموثوق')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 