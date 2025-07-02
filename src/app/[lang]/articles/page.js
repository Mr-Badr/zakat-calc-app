'use client';
import { useState, useMemo, useEffect, use } from 'react';
import { Search, Filter, Calendar, Clock, User } from 'lucide-react';

export default function ArticlesPage({ params }) {
  const { lang } = use(params);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  // Load articles on component mount
  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetch(`/api/articles?lang=${lang}`);
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error loading articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [lang]);

  // Get unique categories and tags
  const categories = ['all', ...new Set(articles.map(article => article.category))];
  const allTags = articles.flatMap(article => article.tags || []);
  const tags = ['all', ...new Set(allTags)];

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || (article.tags && article.tags.includes(selectedTag));
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [articles, searchTerm, selectedCategory, selectedTag]);

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-4xl font-bold mb-8 text-center arabic-title">
        {lang === 'ar' ? 'مقالات الزكاة الإسلامية' : 
         lang === 'fr' ? 'Articles sur la Zakat Islamique' : 
         'Islamic Zakat Articles'}
      </h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={lang === 'ar' ? 'البحث في المقالات...' : 
                        lang === 'fr' ? 'Rechercher des articles...' : 
                        'Search articles...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Category and Tag Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {lang === 'ar' ? 'الفئة:' : 
               lang === 'fr' ? 'Catégorie:' : 
               'Category:'}
            </span>
          </div>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 
                (lang === 'ar' ? 'الكل' : lang === 'fr' ? 'Tout' : 'All') : 
                category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">
            {lang === 'ar' ? 'العلامات:' : 
             lang === 'fr' ? 'Tags:' : 
             'Tags:'}
          </span>
          {tags.slice(0, 10).map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag === 'all' ? 
                (lang === 'ar' ? 'الكل' : lang === 'fr' ? 'Tout' : 'All') : 
                `#${tag}`}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-emerald-700 arabic-title">
            {lang === 'ar' ? 'مقالات مميزة' : 
             lang === 'fr' ? 'Articles en Vedette' : 
             'Featured Articles'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredArticles.map(article => (
              <FeaturedArticleCard key={article.id} article={article} lang={lang} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 arabic-title">
          {searchTerm || selectedCategory !== 'all' || selectedTag !== 'all' ? 
            (lang === 'ar' ? 'المقالات المفلترة' : 
             lang === 'fr' ? 'Articles Filtrés' : 
             'Filtered Articles') : 
            (lang === 'ar' ? 'جميع المقالات' : 
             lang === 'fr' ? 'Tous les Articles' : 
             'All Articles')}
          <span className="text-gray-500 text-lg font-normal ml-2">({filteredArticles.length})</span>
        </h2>
        
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg arabic-text">
              {lang === 'ar' ? 'لم يتم العثور على مقالات تطابق معاييرك.' : 
               lang === 'fr' ? 'Aucun article trouvé correspondant à vos critères.' : 
               'No articles found matching your criteria.'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTag('all');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {lang === 'ar' ? 'مسح الفلاتر' : 
               lang === 'fr' ? 'Effacer les Filtres' : 
               'Clear Filters'}
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map(article => (
              <ArticleCard key={article.id} article={article} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Featured Article Card Component
function FeaturedArticleCard({ article, lang }) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          {lang === 'ar' ? 'مميز' : lang === 'fr' ? 'EN VEDETTE' : 'FEATURED'}
        </span>
        <span className="text-emerald-600 text-sm font-medium">{article.category}</span>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-gray-800 arabic-title">
        <a href={`/${lang}/articles/${article.id}`} className="hover:text-emerald-600 transition-colors">
          {article.title}
        </a>
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3 arabic-text">{article.summary}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{new Date(article.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{article.readTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <User size={14} />
          <span>{article.author}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags && article.tags.slice(0, 3).map(tag => (
          <span key={tag} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>
      
      <a
        href={`/${lang}/articles/${article.id}`}
        className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
      >
        {lang === 'ar' ? 'اقرأ المقال ←' : 
         lang === 'fr' ? 'Lire l\'Article →' : 
         'Read Article →'}
      </a>
    </div>
  );
}

// Regular Article Card Component
function ArticleCard({ article, lang }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
          {article.category}
        </span>
      </div>
      
      <h3 className="text-lg font-bold mb-3 text-gray-800 line-clamp-2 arabic-title">
        <a href={`/${lang}/articles/${article.id}`} className="hover:text-emerald-600 transition-colors">
          {article.title}
        </a>
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3 text-sm arabic-text">{article.summary}</p>
      
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>{new Date(article.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>{article.readTime}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {article.tags && article.tags.slice(0, 2).map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>
      
      <a
        href={`/${lang}/articles/${article.id}`}
        className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
      >
        {lang === 'ar' ? 'اقرأ المزيد ←' : 
         lang === 'fr' ? 'Lire plus →' : 
         'Read more →'}
      </a>
    </div>
  );
} 