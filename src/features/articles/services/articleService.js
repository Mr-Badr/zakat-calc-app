import fs from 'fs';
import path from 'path';

// Cache for loaded articles
const articleCache = new Map();

/**
 * Load an article by ID and language
 * @param {string} id - Article ID
 * @param {string} lang - Language code (en, ar, fr)
 * @returns {Object|null} Article data or null if not found
 */
export async function getArticle(id, lang = 'en') {
  const cacheKey = `${id}-${lang}`;
  
  // Check cache first
  if (articleCache.has(cacheKey)) {
    return articleCache.get(cacheKey);
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'locales', lang, 'articles', `${id}.json`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const article = JSON.parse(fileContent);
    
    // Cache the article
    articleCache.set(cacheKey, article);
    
    return article;
  } catch (error) {
    console.error(`Error loading article ${id} for language ${lang}:`, error);
    return null;
  }
}

/**
 * Get all available articles for a language
 * @param {string} lang - Language code (en, ar, fr)
 * @returns {Array} Array of article metadata
 */
export async function getAllArticles(lang = 'en') {
  try {
    const articlesDir = path.join(process.cwd(), 'src', 'locales', lang, 'articles');
    
    if (!fs.existsSync(articlesDir)) {
      return [];
    }

    const files = fs.readdirSync(articlesDir);
    const articles = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const id = file.replace('.json', '');
        const article = await getArticle(id, lang);
        if (article) {
          articles.push(article);
        }
      }
    }

    // Sort by date (newest first)
    return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error(`Error loading articles for language ${lang}:`, error);
    return [];
  }
}

/**
 * Get article metadata without full content (for listings)
 * @param {string} lang - Language code (en, ar, fr)
 * @returns {Array} Array of article metadata
 */
export async function getArticlesMetadata(lang = 'en') {
  const articles = await getAllArticles(lang);
  return articles.map(article => ({
    id: article.id,
    title: article.title,
    summary: article.summary,
    category: article.category,
    tags: article.tags,
    author: article.author,
    date: article.date,
    readTime: article.readTime,
    featured: article.featured,
    seo: article.seo
  }));
}

/**
 * Get articles by category
 * @param {string} category - Category name
 * @param {string} lang - Language code (en, ar, fr)
 * @returns {Array} Array of articles in the category
 */
export async function getArticlesByCategory(category, lang = 'en') {
  const articles = await getAllArticles(lang);
  return articles.filter(article => article.category === category);
}

/**
 * Get featured articles
 * @param {string} lang - Language code (en, ar, fr)
 * @returns {Array} Array of featured articles
 */
export async function getFeaturedArticles(lang = 'en') {
  const articles = await getAllArticles(lang);
  return articles.filter(article => article.featured);
}

/**
 * Search articles by term
 * @param {string} searchTerm - Search term
 * @param {string} lang - Language code (en, ar, fr)
 * @returns {Array} Array of matching articles
 */
export async function searchArticles(searchTerm, lang = 'en') {
  const articles = await getAllArticles(lang);
  const term = searchTerm.toLowerCase();
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(term) ||
    article.summary.toLowerCase().includes(term) ||
    (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term)))
  );
}

/**
 * Get related articles (by tags or category)
 * @param {string} articleId - Current article ID
 * @param {string} lang - Language code (en, ar, fr)
 * @param {number} limit - Maximum number of related articles
 * @returns {Array} Array of related articles
 */
export async function getRelatedArticles(articleId, lang = 'en', limit = 3) {
  const currentArticle = await getArticle(articleId, lang);
  if (!currentArticle) return [];

  const allArticles = await getAllArticles(lang);
  const related = [];

  for (const article of allArticles) {
    if (article.id === articleId) continue;

    // Check for tag matches
    if (currentArticle.tags && article.tags) {
      const commonTags = currentArticle.tags.filter(tag => article.tags.includes(tag));
      if (commonTags.length > 0) {
        related.push({ ...article, relevance: commonTags.length });
      }
    }

    // Check for category match
    if (currentArticle.category === article.category) {
      const existing = related.find(r => r.id === article.id);
      if (existing) {
        existing.relevance += 2; // Category match is more relevant
      } else {
        related.push({ ...article, relevance: 2 });
      }
    }
  }

  // Sort by relevance and return top results
  return related
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(article => {
      const { relevance, ...articleData } = article;
      return articleData;
    });
} 