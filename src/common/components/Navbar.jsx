'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Fuel as Mosque, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/context/TranslationContext';
import { Tooltip } from '@/common/components/Tooltip';

const Navbar = ({ zakatTypes = [] }) => {
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
      label: t('common.navbar.zakatGuide', 'دليل الزكاة'),
      dropdown: true,
      items: zakatTypes.map(type => ({
        href: `/${currentLang}/zakat/${type.type}`,
        icon: type.icon,
        label: type.name
      }))
    },
    {
      href: `/${currentLang}/articles`,
      label: t('common.navbar.articles', 'مقالات'),
      isActive: pathname.startsWith(`/${currentLang}/articles`)
    },
    {
      href: `/${currentLang}/faq`,
      label: t('common.navbar.faq', 'الأسئلة الشائعة'),
      isActive: pathname.startsWith(`/${currentLang}/faq`)
    },
    {
      href: `/${currentLang}/sources`,
      label: t('common.navbar.sources', 'المصادر'),
      isActive: pathname.startsWith(`/${currentLang}/sources`)
    }
  ];

  // State for Zakat Guide dropdown
  const [zakatDropdownOpen, setZakatDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Icons Only */}
          <Link href={`/${currentLang}`} className="flex items-center hover:opacity-80 transition-opacity">
            <div className="flex items-center">
              <Mosque className={isRTL ? 'ml-2' : 'mr-2'} size={28} />
              <Calculator className={`text-amber-300 ${isRTL ? 'ml-1' : 'mr-1'}`} size={24} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item, idx) =>
              item.dropdown ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setZakatDropdownOpen((open) => !open)}
                    onBlur={() => setTimeout(() => setZakatDropdownOpen(false), 150)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1 ${zakatDropdownOpen ? 'bg-white/20 text-white border border-white/30' : 'text-emerald-100 hover:bg-white/10 hover:text-white'}`}
                    aria-haspopup="true"
                    aria-expanded={zakatDropdownOpen}
                  >
                    {item.label}
                    <span className="ml-1">▼</span>
                  </button>
                  {zakatDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-lg z-50 border border-emerald-100">
                      {item.items.map((type) => (
                        <Link
                          key={type.href}
                          href={type.href}
                          className="flex items-center gap-2 px-4 py-3 hover:bg-emerald-50 transition-colors text-sm"
                        >
                          <span className="text-lg">{type.icon}</span>
                          <span>{type.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            )}
            {/* Calculator Button */}
            <Tooltip content={t('common.navbar.calculatorTooltip', 'حاسبة الزكاة الرئيسية')}> 
              <Link
                href={`/${currentLang}`}
                className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 text-emerald-900 font-bold shadow-md hover:bg-amber-300 transition-all text-base border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label={t('common.navbar.calculator', 'حاسبة الزكاة')}
              >
                <Calculator size={20} />
                <span className="hidden sm:inline">{t('common.navbar.calculator', 'حاسبة الزكاة')}</span>
              </Link>
            </Tooltip>
          </div>

          {/* Language Switcher */}
          <div className="hidden md:block ml-4">
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
              {navItems.map((item, idx) =>
                item.dropdown ? (
                  <div key={item.label} className="mb-2">
                    <button
                      onClick={() => setZakatDropdownOpen((open) => !open)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-all duration-200 text-emerald-100 hover:bg-white/10 hover:text-white"
                      aria-haspopup="true"
                      aria-expanded={zakatDropdownOpen}
                    >
                      {item.label}
                      <span>▼</span>
                    </button>
                    {zakatDropdownOpen && (
                      <div className="pl-4 mt-1">
                        {item.items.map((type) => (
                          <Link
                            key={type.href}
                            href={type.href}
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="text-lg">{type.icon}</span>
                            <span>{type.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
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
                )
              )}
              {/* Calculator Button (Mobile) */}
              <Tooltip content={t('common.navbar.calculatorTooltip', 'حاسبة الزكاة الرئيسية')}>
                <Link
                  href={`/${currentLang}`}
                  className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 text-emerald-900 font-bold shadow-md hover:bg-amber-300 transition-all text-base border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label={t('common.navbar.calculator', 'حاسبة الزكاة')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calculator size={20} />
                  <span>{t('common.navbar.calculator', 'حاسبة الزكاة')}</span>
                </Link>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 