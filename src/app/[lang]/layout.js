// app/[lang]/layout.js

import { getLocale } from '@/lib/getLocale';
import { Amiri, Noto_Sans_Arabic, Roboto } from 'next/font/google';
import { TranslationProvider } from '@/context/TranslationContext';
import NavbarWrapper from '@/common/components/NavbarWrapper';
import Footer from '@/common/components/Footer';

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-amiri',
});

const noto = Noto_Sans_Arabic({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-noto',
});

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'ar';
  const locale = await getLocale(lang);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  return {
    title: locale.metadata?.title || 'حاسبة الزكاة',
    description: locale.metadata?.description || 'احسب زكاتك بلغات متعددة لجميع المسلمين.',
    keywords: 'زكاة, حاسبة زكاة, إسلام, ذهب, فضة, مال, حساب زكاة',
    authors: [{ name: 'Advanced Zakat Calculator' }],
    creator: 'Advanced Zakat Calculator',
    publisher: 'Advanced Zakat Calculator',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'ar': `${baseUrl}/ar`,
        'en': `${baseUrl}/en`,
        'fr': `${baseUrl}/fr`,
      },
    },
    openGraph: {
      title: locale.metadata?.title || 'حاسبة الزكاة',
      description: locale.metadata?.description || 'احسب زكاتك بلغات متعددة لجميع المسلمين.',
      url: `${baseUrl}/${lang}`,
      siteName: 'Advanced Zakat Calculator',
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: locale.metadata?.title || 'حاسبة الزكاة',
      description: locale.metadata?.description || 'احسب زكاتك بلغات متعددة لجميع المسلمين.',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LangLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'ar';
  const locale = await getLocale(lang);
  console.log('Loaded locale:', JSON.stringify(locale, null, 2));
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Debug logging
  console.log(`🔧 Layout - Language: ${lang}`);
  console.log(`🔧 Layout - Locale keys:`, Object.keys(locale));
  console.log(`🔧 Layout - zakatTypes exists:`, !!locale.zakatTypes);
  if (locale.zakatTypes) {
    console.log(`🔧 Layout - zakatTypes keys:`, Object.keys(locale.zakatTypes));
    if (locale.zakatTypes.types) {
      console.log(`🔧 Layout - zakatTypes.types keys:`, Object.keys(locale.zakatTypes.types));
      console.log(`🔧 Layout - money name:`, locale.zakatTypes.types.money?.name);
    }
  }

  // Compose font class string
  const fontClasses = `${amiri.variable} ${noto.variable} ${roboto.variable}`;

  return (
    <html lang={lang} dir={dir} className={fontClasses}>
      <body className="bg-white text-gray-900">
        <TranslationProvider locale={locale} lang={lang}>
          <NavbarWrapper lang={lang} />
          <main>{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
