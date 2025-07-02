import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import MoneyZakatPage from '@/features/zakat/pages/MoneyZakatPage';
import GoldZakatPage from '@/features/zakat/pages/GoldZakatPage';

export async function generateMetadata({ params }) {
  const { lang, type } = params;
  try {
    const filePath = path.join(process.cwd(), 'src/features/zakat/data/types', lang, `${type}.json`);
    const file = await fs.readFile(filePath, 'utf-8');
    const content = JSON.parse(file);
    const title = content.name || 'Zakat Type';
    const description = content.intro || '';
    // Hreflang links for SEO
    const hreflangs = [
      { href: `/ar/zakat/${type}`, lang: 'ar' },
      { href: `/en/zakat/${type}`, lang: 'en' },
      { href: `/fr/zakat/${type}`, lang: 'fr' }
    ];
    return {
      title,
      description,
      alternates: hreflangs.map(h => ({ href: h.href, hreflang: h.lang }))
    };
  } catch {
    return {};
  }
}

export default async function ZakatTypePage({ params }) {
  const { lang, type } = params;
  let content;
  try {
    const filePath = path.join(process.cwd(), 'src/features/zakat/data/types', lang, `${type}.json`);
    const file = await fs.readFile(filePath, 'utf-8');
    content = JSON.parse(file);
  } catch {
    return notFound();
  }

  // Render appropriate component based on type
  if (type === 'money') {
    return <MoneyZakatPage content={content} type={type} />;
  }
  
  if (type === 'gold') {
    return <GoldZakatPage content={content} type={type} />;
  }

  // Placeholder for other types
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        {content.icon || '💰'} {content.name || type}
      </h1>
      <p className="mb-6 text-lg text-gray-700">{content.intro}</p>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-yellow-800">
          This zakat type page is under construction. The content is loaded but the full page component is not yet implemented.
        </p>
      </div>
    </div>
  );
} 