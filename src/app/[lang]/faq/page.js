'use client';
import { useTranslation } from '@/context/TranslationContext';
import { use } from 'react';

export default function FAQPage({ params }) {
  const { lang } = use(params);
  const { t } = useTranslation();
  // Placeholder: In the future, load FAQs from locales/<lang>/faq.json
  const faqs = [
    { q: t('faq.q1', 'How do I calculate zakat on cash?'), a: t('faq.a1', 'Enter your total cash, subtract debts, and pay 2.5% if above nisab.') },
    { q: t('faq.q2', 'Is zakat due on gold jewelry?'), a: t('faq.a2', "Hanafi: Yes. Shafi'i/Maliki: Not if for personal use. Hanbali: Precaution is to pay.") }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{t('faq.title', 'Frequently Asked Questions')}</h1>
      <ul className="space-y-6">
        {faqs.map((faq, i) => (
          <li key={i} className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-1">{faq.q}</h2>
            <p className="text-gray-600">{faq.a}</p>
          </li>
        ))}
      </ul>
    </div>
  );
} 