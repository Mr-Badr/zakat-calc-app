'use client'
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const TranslationContext = createContext(null);

// Supported languages configuration
export const SUPPORTED_LANGUAGES = {
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' }
};

// Translation cache
const translationCache = {};

// Load translation files dynamically
async function loadTranslationFiles(language) {
  const cacheKey = language;
  
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const [
      common,
      header,
      footer,
      zakatTypes,
      madhabs,
      calculators,
      results,
      quotes,
      quotes_content,
      goldPrice
    ] = await Promise.all([
      import(`../locales/${language}/common.json`),
      import(`../locales/${language}/header.json`),
      import(`../locales/${language}/footer.json`),
      import(`../locales/${language}/zakatTypes.json`),
      import(`../locales/${language}/madhabs.json`),
      import(`../locales/${language}/calculators.json`),
      import(`../locales/${language}/results.json`),
      import(`../locales/${language}/quotes.json`),
      import(`../locales/${language}/quotes_content.json`),
      import(`../locales/${language}/goldPrice.json`)
    ]);

    const translations = {
      common: common.default,
      header: header.default,
      footer: footer.default,
      zakatTypes: zakatTypes.default,
      madhabs: madhabs.default,
      calculators: calculators.default,
      results: results.default,
      quotes: quotes.default,
      quotes_content: quotes_content.default,
      goldPrice: goldPrice.default
    };

    // After loading the main translation files, also load quotes_content.json
    // Example for English:
    // const quotesContent = await import(`../locales/${lang}/quotes_content.json`);
    // translations.quotes_content = quotesContent.default || quotesContent;
    // Make sure this is done for all supported languages.

    translationCache[cacheKey] = translations;
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
    
    // Fallback to Arabic if not already Arabic
    if (language !== 'ar') {
      return loadTranslationFiles('ar');
    }
    
    throw new Error(`Failed to load translations for ${language}`);
  }
}

// Get nested value from object
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

export function TranslationProvider({ children, locale, lang }) {
  // Debug logging
  console.log('🔄 TranslationProvider - Initial props:', { 
    hasLocale: !!locale, 
    localeKeys: locale ? Object.keys(locale) : [], 
    lang 
  });

  // Initialize state with server-side values immediately to prevent hydration mismatch
  const [translations, setTranslations] = useState(() => {
    // If we have server-side locale, use it immediately
    if (locale && Object.keys(locale).length > 0) {
      console.log('✅ TranslationProvider - Using server-side locale');
      return locale;
    }
    console.log('⚠️ TranslationProvider - No server-side locale, starting empty');
    return {};
  });
  
  const [language, setLanguage] = useState(lang || 'ar');
  const [isLoading, setIsLoading] = useState(() => {
    // If we have server-side locale, we're not loading
    const hasServerLocale = !!(locale && Object.keys(locale).length > 0);
    console.log('🔄 TranslationProvider - Initial loading state:', !hasServerLocale);
    return !hasServerLocale;
  });
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(() => {
    // If we have server-side locale, we're initialized
    const hasServerLocale = !!(locale && Object.keys(locale).length > 0);
    console.log('🔄 TranslationProvider - Initial initialized state:', hasServerLocale);
    return hasServerLocale;
  });
  const hasUserChangedLanguage = useRef(false);

  // Initialize with server-side locale
  useEffect(() => {
    console.log('🔄 TranslationProvider useEffect - locale exists:', !!locale, 'lang:', lang, 'isInitialized:', isInitialized);
    
    if (locale && Object.keys(locale).length > 0 && !isInitialized) {
      console.log('✅ TranslationProvider - Initializing with server-side locale for language:', lang);
      setTranslations(locale);
      setLanguage(lang);
      setIsInitialized(true);
      setIsLoading(false);
      
      // Update document attributes
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
        document.documentElement.dir = SUPPORTED_LANGUAGES[lang]?.dir || 'ltr';
      }
    } else if (!locale && !isInitialized) {
      // If no server-side locale, load client-side
      console.log('⚠️ TranslationProvider - No server-side locale, loading client-side for language:', lang);
      loadTranslations(lang || 'ar');
    }
  }, [locale, lang, isInitialized]);

  // Load translations when language changes
  const loadTranslations = async (newLanguage) => {
    console.log('🔄 loadTranslations called with:', newLanguage, 'current language:', language);
    if (newLanguage === language && Object.keys(translations).length > 0 && !isLoading) {
      console.log('✅ Translations already loaded for:', newLanguage);
      return; // Already loaded
    }

    setIsLoading(true);
    setError(null);
    hasUserChangedLanguage.current = true;

    try {
      console.log('📥 Loading translation files for:', newLanguage);
      const data = await loadTranslationFiles(newLanguage);
      console.log('✅ Translation files loaded successfully for:', newLanguage);
      setTranslations(data);
      setLanguage(newLanguage);
      setIsInitialized(true);
      console.log('✅ Language state updated to:', newLanguage);
      
      // Update document attributes
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLanguage;
        document.documentElement.dir = SUPPORTED_LANGUAGES[newLanguage]?.dir || 'ltr';
        console.log('✅ Document attributes updated for:', newLanguage);
      }
      
      // Save to localStorage
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('zakatCalculatorLanguage', newLanguage);
          console.log('✅ Language saved to localStorage:', newLanguage);
        }
      } catch (e) {
        console.warn('⚠️ Failed to save language to localStorage:', e);
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Translation loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Translation function with better fallback handling
  const t = (key, fallback = key) => {
    // If still loading and no translations available, return fallback
    if (isLoading && Object.keys(translations).length === 0) {
      console.log('🔄 Translation function - Still loading, using fallback for:', key, fallback);
      return fallback;
    }

    // If translations are not loaded yet, return fallback
    if (!translations || Object.keys(translations).length === 0) {
      console.warn('⚠️ No translations available for key:', key, 'fallback:', fallback);
      return fallback;
    }

    // Handle namespaced structure (e.g., "header.title" -> translations.header.title)
    const value = getNestedValue(translations, key);

    // Debug logging for specific keys that are causing issues
    if (key.includes('calculators.') && key.includes('.title')) {
      console.log('🔍 Translation debug:', {
        key,
        value,
        language,
        fallback,
        hasTranslations: !!translations,
        translationKeys: translations ? Object.keys(translations) : []
      });
    }

    if (value === null || value === undefined) {
      console.warn('⚠️ Translation key not found:', key, 'fallback:', fallback);
      return fallback;
    }

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'object') {
      return value;
    }

    return String(value);
  };

  // Change language function
  const changeLanguage = (newLanguage) => {
    console.log('🔄 changeLanguage called with:', newLanguage, 'current language:', language);
    if (SUPPORTED_LANGUAGES[newLanguage] && newLanguage !== language) {
      console.log('📥 Loading translations for:', newLanguage);
      loadTranslations(newLanguage);
    } else {
      console.log('⏭️ Language change skipped - same language or unsupported');
    }
  };

  // Get current language info
  const getLanguageInfo = () => {
    return SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES.ar;
  };

  const contextValue = {
    t,
    language,
    changeLanguage,
    getLanguageInfo,
    translations,
    isLoading,
    error,
    isInitialized,
    SUPPORTED_LANGUAGES
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// Convenience hook for just the translation function
export function useT() {
  const { t } = useTranslation();
  return t;
}

// Hook for language info
export function useLanguageInfo() {
  const { getLanguageInfo } = useTranslation();
  return getLanguageInfo();
}
