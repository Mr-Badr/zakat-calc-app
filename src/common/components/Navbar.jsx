'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Fuel as Mosque, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/context/TranslationContext';

const Navbar = () => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  // Get current language from pathname
  const currentLang = pathname.split('/')[1] || 'ar';
  
  // Navigation items
  const navItems = [
    {
      href: `/${currentLang}`,
      label: t('common.navbar.home', 'الرئيسية'),
      isActive: pathname === `/${currentLang}` || pathname === `/${currentLang}/`
    },
    {
      href: `/${currentLang}/about`,
      label: t('common.navbar.about', 'حول'),
      isActive: pathname === `/${currentLang}/about`
    },
    {
      href: `/${currentLang}/contact`,
      label: t('common.navbar.contact', 'اتصل بنا'),
      isActive: pathname === `/${currentLang}/contact`
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${currentLang}`} className="flex items-center space-x-3 space-x-reverse hover:opacity-80 transition-opacity">
            <div className="flex items-center">
              <Mosque className={isRTL ? 'ml-2' : 'mr-2'} size={24} />
              <Calculator className={`text-amber-300 ${isRTL ? 'ml-1' : 'mr-1'}`} size={20} />
            </div>
            <span className="font-bold text-lg font-title hidden sm:block">
              {t('header.title', 'حاسبة الزكاة المتقدمة')}
            </span>
            <span className="font-bold text-lg font-title sm:hidden">
              {t('common.navbar.shortTitle', 'حاسبة الزكاة')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  item.isActive
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3 space-x-reverse">
            <LanguageSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={t('common.navbar.menu', 'القائمة')}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-emerald-500">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    item.isActive
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 