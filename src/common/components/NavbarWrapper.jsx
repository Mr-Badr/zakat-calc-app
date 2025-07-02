import fs from 'fs/promises';
import path from 'path';
import Navbar from './Navbar';

async function getZakatTypes(lang) {
  try {
    const typesDir = path.join(process.cwd(), 'src/features/zakat/data/types', lang);
    const files = await fs.readdir(typesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const types = [];
    for (const file of jsonFiles) {
      try {
        const typeName = file.replace('.json', '');
        const filePath = path.join(typesDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Skip empty files
        if (!content.trim()) {
          console.warn(`Empty file: ${filePath}`);
          continue;
        }
        
        const data = JSON.parse(content);
        types.push({
          type: typeName,
          name: data.name || typeName,
          icon: data.icon || '💰'
        });
      } catch (fileError) {
        console.error(`Error processing file ${file}:`, fileError.message);
        // Continue with other files instead of failing completely
        continue;
      }
    }
    
    // If no valid files found, return fallback
    if (types.length === 0) {
      console.warn(`No valid JSON files found for language: ${lang}, using fallback`);
      return getFallbackTypes(lang);
    }
    
    return types;
  } catch (error) {
    console.error('Error loading zakat types:', error);
    return getFallbackTypes(lang);
  }
}

function getFallbackTypes(lang) {
  const fallbacks = {
    ar: [
      { type: 'money', name: 'زكاة المال', icon: '💵' },
      { type: 'gold', name: 'زكاة الذهب والفضة', icon: '🥇' },
      { type: 'business', name: 'زكاة التجارة', icon: '🏪' },
      { type: 'agriculture', name: 'زكاة الزراعة', icon: '🌾' },
      { type: 'livestock', name: 'زكاة الأنعام', icon: '🐑' },
      { type: 'stocks', name: 'زكاة الأسهم', icon: '📈' },
      { type: 'debts', name: 'زكاة الديون', icon: '💳' },
      { type: 'minerals', name: 'زكاة المعادن والركاز', icon: '⛏️' }
    ],
    en: [
      { type: 'money', name: 'Money', icon: '💵' },
      { type: 'gold', name: 'Gold & Silver', icon: '🥇' },
      { type: 'business', name: 'Business', icon: '🏪' },
      { type: 'agriculture', name: 'Agriculture', icon: '🌾' },
      { type: 'livestock', name: 'Livestock', icon: '🐑' },
      { type: 'stocks', name: 'Stocks & Investments', icon: '📈' },
      { type: 'debts', name: 'Debts', icon: '💳' },
      { type: 'minerals', name: 'Minerals & Treasure', icon: '⛏️' }
    ],
    fr: [
      { type: 'money', name: 'Argent', icon: '💵' },
      { type: 'gold', name: 'Or et Argent', icon: '🥇' },
      { type: 'business', name: 'Commerce', icon: '🏪' },
      { type: 'agriculture', name: 'Agriculture', icon: '🌾' },
      { type: 'livestock', name: 'Bétail', icon: '🐑' },
      { type: 'stocks', name: 'Actions et Investissements', icon: '📈' },
      { type: 'debts', name: 'Dettes', icon: '💳' },
      { type: 'minerals', name: 'Minerais et Trésors', icon: '⛏️' }
    ]
  };
  
  return fallbacks[lang] || fallbacks.en;
}

export default async function NavbarWrapper({ lang }) {
  const zakatTypes = await getZakatTypes(lang);
  return <Navbar zakatTypes={zakatTypes} />;
} 