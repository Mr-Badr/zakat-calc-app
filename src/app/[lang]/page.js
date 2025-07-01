import ZakatCalculatorPage from '@/features/zakat/components/ZakatCalculatorPage';
import Header from '@/common/components/Header';
import { getLocale } from '@/lib/getLocale';

export async function generateMetadata({ params }) {
  // params يمكن أن يكون Promise لذا ننتظر تحصيله
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'ar';
  const locale = await getLocale(lang);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    title: locale.metadata?.title || locale.header?.title || 'Zakat Calculator',
    description: locale.metadata?.description || locale.header?.subtitle || 'Calculate your zakat easily',
    keywords: 'zakat, zakat calculator, islam, gold, silver, money, zakat calculation',
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
      title: locale.metadata?.title || locale.header?.title || 'Zakat Calculator',
      description: locale.metadata?.description || locale.header?.subtitle || 'Calculate your zakat easily',
      url: `${baseUrl}/${lang}`,
      siteName: 'Advanced Zakat Calculator',
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: locale.metadata?.title || locale.header?.title || 'Zakat Calculator',
      description: locale.metadata?.description || locale.header?.subtitle || 'Calculate your zakat easily',
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

export default async function LangHomePage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'ar';
  const locale = await getLocale(lang);

  return (
    <>
      <Header />
    <ZakatCalculatorPage 
      lang={lang}
      />
    </>
  );
}
