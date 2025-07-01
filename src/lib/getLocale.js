import { promises as fs } from 'fs';
import path from 'path';

let cachedLocales = {};

/**
 * Merge objects deeply (not just top-level).
 */
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      if (!target[key] || typeof target[key] !== 'object') {
        // إذا الهدف ليس كائن (قد يكون نص) نستبدله بكائن جديد
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      // إذا المصدر نص والهدف كائن، نستبدل الهدف بالمصدر النصي
      target[key] = source[key];
    }
  }
  return target;
}

/**
 * Load and merge all JSON files from the given lang folder.
 * Fallback to 'ar' if not found.
 */
export async function getLocale(lang) {
  if (cachedLocales[lang]) {
    console.log(`✅ Using cached locale for ${lang}`);
    return cachedLocales[lang];
  }

  const basePath = path.join(process.cwd(), 'src', 'locales');
  const langPath = path.join(basePath, lang);

  try {
    console.log(`📁 Loading locale from: ${langPath}`);
    const files = await fs.readdir(langPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    console.log(`📄 Found JSON files:`, jsonFiles);

    let mergedData = {};

    // ترتيب الملفات لضمان دمج صحيح
    const fileOrder = [
      'common.json',
      'header.json',
      'footer.json',
      'zakatTypes.json',
      'madhabs.json',
      'calculators.json',
      'results.json',
      'quotes.json',
      'quotes_content.json',
      'goldPrice.json'
    ];

    // تحميل الملفات بالترتيب المحدد
    for (const fileName of fileOrder) {
      if (jsonFiles.includes(fileName)) {
        const filePath = path.join(langPath, fileName);
        console.log(`📖 Loading ${fileName} from ${filePath}`);
        const content = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(content);
        const namespace = fileName.replace('.json', '');
        mergedData[namespace] = parsed;
      } else {
        console.log(`⚠️  File not found: ${fileName}`);
      }
    }

    // تحميل أي ملفات إضافية غير مدرجة في القائمة
    for (const file of jsonFiles) {
      if (!fileOrder.includes(file)) {
        const content = await fs.readFile(path.join(langPath, file), 'utf8');
        const parsed = JSON.parse(content);
        const namespace = file.replace('.json', '');
        mergedData[namespace] = parsed;
    }
    }
    cachedLocales[lang] = mergedData;
    return mergedData;
  } catch (error) {
    console.warn(`❌ Failed to load locale for "${lang}", falling back to Arabic`, error);
    if (lang !== 'ar') {
      return getLocale('ar');
    }
    console.error('Arabic fallback also failed:', error);
    throw new Error('❌ No locale found and Arabic fallback also failed.');
  }
}