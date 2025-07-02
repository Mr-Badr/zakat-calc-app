'use client';
import { useState, useEffect, use } from 'react';
import { BookOpen, ExternalLink, Shield, Users, GraduationCap, Building, Globe, Search, Filter } from 'lucide-react';

export default function SourcesPage({ params }) {
  const { lang } = use(params);
  const [sourcesData, setSourcesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadSources() {
      try {
        const response = await fetch(`/api/sources?lang=${lang}`);
        const data = await response.json();
        
        // Transform the flat structure to the expected sections structure
        if (data && !data.sections) {
          const transformedData = {
            title: data.title || 'Sources & References',
            subtitle: data.subtitle || 'Reliable Islamic sources and references',
            description: data.description || 'Our calculations are based on authentic Islamic sources and scholarly consensus.',
            sections: {
              primary: {
                title: lang === 'ar' ? 'المصادر الأساسية' : lang === 'fr' ? 'Sources Principales' : 'Primary Sources',
                description: lang === 'ar' ? 'القرآن الكريم والحديث النبوي' : lang === 'fr' ? 'Coran et Hadith' : 'Quran and Hadith',
                sources: [
                  {
                    name: data.quran || 'Quran (King Saud University)',
                    description: lang === 'ar' ? 'القرآن الكريم - جامعة الملك سعود' : lang === 'fr' ? 'Coran - Université du Roi Saoud' : 'Quran - King Saud University',
                    url: 'https://quran.ksu.edu.sa/',
                    type: 'primary',
                    icon: 'quran'
                  },
                  {
                    name: data.sunnah || 'Sunnah.com',
                    description: lang === 'ar' ? 'الحديث النبوي الشريف' : lang === 'fr' ? 'Hadiths authentiques' : 'Authentic Hadith Collection',
                    url: 'https://sunnah.com/',
                    type: 'primary',
                    icon: 'hadith'
                  }
                ]
              },
              scholarly: {
                title: lang === 'ar' ? 'المراجع العلمية' : lang === 'fr' ? 'Références Savantes' : 'Scholarly References',
                description: lang === 'ar' ? 'فتاوى العلماء والمجامع الفقهية' : lang === 'fr' ? 'Fatwas et conseils savants' : 'Scholarly fatwas and councils',
                sources: [
                  {
                    name: data.islamqa || 'IslamQA',
                    description: lang === 'ar' ? 'موقع الإسلام سؤال وجواب' : lang === 'fr' ? 'Islam Question et Réponse' : 'Islam Question and Answer',
                    url: 'https://islamqa.info/',
                    type: 'scholar',
                    icon: 'scholar'
                  },
                  {
                    name: data.islamweb || 'IslamWeb',
                    description: lang === 'ar' ? 'موقع إسلام ويب' : lang === 'fr' ? 'Site IslamWeb' : 'IslamWeb Portal',
                    url: 'https://www.islamweb.net/',
                    type: 'scholar',
                    icon: 'scholar'
                  },
                  {
                    name: data.daralifta || 'Dar Al-Ifta Al-Misriyyah',
                    description: lang === 'ar' ? 'دار الإفتاء المصرية' : lang === 'fr' ? 'Dar Al-Ifta d\'Égypte' : 'Egyptian Dar Al-Ifta',
                    url: 'https://www.dar-alifta.org/',
                    type: 'council',
                    icon: 'council'
                  }
                ]
              }
            }
          };
          setSourcesData(transformedData);
        } else {
          setSourcesData(data);
        }
      } catch (error) {
        console.error('Error loading sources:', error);
        setSourcesData(null);
      } finally {
        setLoading(false);
      }
    }

    loadSources();
  }, [lang]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {lang === 'ar' ? 'جاري تحميل المصادر...' : 
             lang === 'fr' ? 'Chargement des sources...' : 
             'Loading sources...'}
          </p>
        </div>
      </div>
    );
  }

  if (!sourcesData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">
            {lang === 'ar' ? 'حدث خطأ في تحميل المصادر' : 
             lang === 'fr' ? 'Erreur lors du chargement des sources' : 
             'Error loading sources'}
          </p>
        </div>
      </div>
    );
  }

  const categories = Object.keys(sourcesData.sections);
  const filteredSections = selectedCategory === 'all' 
    ? sourcesData.sections 
    : { [selectedCategory]: sourcesData.sections[selectedCategory] };

  const getIcon = (iconType) => {
    const iconMap = {
      quran: BookOpen,
      hadith: BookOpen,
      council: Users,
      academy: GraduationCap,
      scholar: Users,
      academic: GraduationCap,
      research: GraduationCap,
      university: Building,
      regulatory: Shield,
      bank: Building,
      online: Globe,
      database: Globe,
      charity: Users
    };
    return iconMap[iconType] || ExternalLink;
  };

  const getTypeColor = (type) => {
    const colorMap = {
      primary: 'bg-emerald-100 text-emerald-800',
      council: 'bg-blue-100 text-blue-800',
      scholar: 'bg-purple-100 text-purple-800',
      academic: 'bg-indigo-100 text-indigo-800',
      regulatory: 'bg-orange-100 text-orange-800',
      online: 'bg-gray-100 text-gray-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 arabic-title">
            {sourcesData.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4 arabic-text">
            {sourcesData.subtitle}
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto arabic-text">
            {sourcesData.description}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'البحث في المصادر...' : 
                          lang === 'fr' ? 'Rechercher dans les sources...' : 
                          'Search sources...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {lang === 'ar' ? 'الفئة:' : 
                 lang === 'fr' ? 'Catégorie:' : 
                 'Category:'}
              </span>
            </div>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang === 'ar' ? 'الكل' : lang === 'fr' ? 'Tout' : 'All'}
            </button>
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
                {sourcesData.sections[category].title}
              </button>
            ))}
          </div>
        </div>

        {/* Sources Sections */}
        <div className="space-y-12">
          {Object.entries(filteredSections).map(([categoryKey, section]) => {
            const filteredSources = section.sources.filter(source =>
              source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              source.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredSources.length === 0) return null;

            return (
              <div key={categoryKey} className="bg-white rounded-xl shadow-sm p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 arabic-title">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 arabic-text">
                    {section.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredSources.map((source, index) => {
                    const IconComponent = getIcon(source.icon);
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-emerald-300 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${getTypeColor(source.type)}`}>
                            <IconComponent size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-2 arabic-title">
                              {source.name}
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm arabic-text">
                              {source.description}
                            </p>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
                            >
                              {lang === 'ar' ? 'زيارة الموقع' : 
                               lang === 'fr' ? 'Visiter le site' : 
                               'Visit Website'}
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h3 className="font-bold text-emerald-800 mb-2 arabic-title">
            {sourcesData.disclaimer.title}
          </h3>
          <p className="text-emerald-700 arabic-text">
            {sourcesData.disclaimer.content}
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="arabic-text">
            {lang === 'ar' ? 'آخر تحديث:' : 
             lang === 'fr' ? 'Dernière mise à jour:' : 
             'Last updated:'} {sourcesData.last_updated}
          </p>
          <p className="arabic-text">
            {lang === 'ar' ? 'الإصدار:' : 
             lang === 'fr' ? 'Version:' : 
             'Version:'} {sourcesData.version}
          </p>
        </div>
      </div>
    </div>
  );
} 