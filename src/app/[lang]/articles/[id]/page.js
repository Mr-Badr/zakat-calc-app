'use client';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, Share2, BookOpen, ArrowUp } from 'lucide-react';

export default function ArticleDetailPage({ params }) {
  const { id, lang } = params;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load article on component mount
  useEffect(() => {
    async function loadArticle() {
      try {
        const response = await fetch(`/api/articles/${id}?lang=${lang}`);
        if (!response.ok) {
          throw new Error('Article not found');
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error loading article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [id, lang]);

  // Reading progress effect
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'ar' ? 'تم نسخ الرابط!' : 
            lang === 'fr' ? 'Lien copié!' : 
            'Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {lang === 'ar' ? 'جاري تحميل المقال...' : 
             lang === 'fr' ? 'Chargement de l\'article...' : 
             'Loading article...'}
          </p>
        </div>
      </div>
    );
  }

  if (!article) {
    return notFound();
  }

  // FAQ Schema for SEO
  const faqSchema = article.faq && article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': article.faq.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
    }))
  } : null;

  // HowTo Schema for SEO
  const howToSchema = article.howTo ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': article.howTo.name,
    'step': article.howTo.steps.map((s, i) => ({ '@type': 'HowToStep', 'position': i + 1, 'name': s.name, 'text': s.text })),
    'totalTime': article.howTo.totalTime,
    'estimatedCost': article.howTo.estimatedCost,
    'tool': article.howTo.tool,
    'supply': article.howTo.supply
  } : null;

  return (
    <div className="min-h-screen bg-gray-50" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 z-40"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Article Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
            {article.featured && (
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {lang === 'ar' ? 'مميز' : lang === 'fr' ? 'EN VEDETTE' : 'FEATURED'}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4 text-gray-800 leading-tight arabic-title">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed arabic-text">
            {article.summary}
          </p>

          <div className="flex items-center gap-6 text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(article.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>{article.readTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {article.tags && article.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={shareArticle}
              className="ml-auto flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Share2 size={16} />
              {lang === 'ar' ? 'مشاركة' : lang === 'fr' ? 'Partager' : 'Share'}
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div 
            className="prose prose-emerald max-w-none prose-lg arabic-text"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
        </div>

        {/* Related Links */}
        {article.internalLinks && article.internalLinks.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 arabic-title">
              {lang === 'ar' ? 'مقالات ذات صلة' : 
               lang === 'fr' ? 'Articles Connexes' : 
               'Related Articles'}
            </h2>
            <div className="grid gap-4">
              {article.internalLinks.map(link => (
                <a 
                  key={link} 
                  href={link} 
                  className="block p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                >
                  <span className="text-emerald-600 font-medium">{link}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 arabic-title">
              {lang === 'ar' ? 'المصادر والقراءة الإضافية' : 
               lang === 'fr' ? 'Sources et Lectures Supplémentaires' : 
               'Sources & Further Reading'}
            </h2>
            <div className="space-y-3">
              {article.sources.map((src, index) => (
                <a 
                  key={src.url} 
                  href={src.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-medium">{src.name}</span>
                    <span className="text-gray-400 text-sm">↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {article.faq && article.faq.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 arabic-title">
              {lang === 'ar' ? 'الأسئلة الشائعة' : 
               lang === 'fr' ? 'Questions Fréquemment Posées' : 
               'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {article.faq.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6 hover:border-emerald-300 transition-colors">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg arabic-title">{item.q}</h3>
                  <p className="text-gray-600 leading-relaxed arabic-text">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Schema */}
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
        {howToSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
        )}
      </div>
    </div>
  );
} 