# Project Guide: How This Project Works & How to Add Components

## Overview
This project is a multilingual, feature-based Next.js application. It supports Arabic (RTL), English, and French (LTR), and is organized for scalability, maintainability, and SEO. All features and shared UI are modular, and the translation system is robust and easy to extend.

---

## How the Project Works

### 1. **Project Structure**
- **src/app/**: Next.js app directory, including `[lang]` for language-based routing.
- **src/common/components/**: Shared UI components (Navbar, Footer, etc.).
- **src/features/**: Feature-based folders (zakat, gold, quotes, currency), each with its own `components`, `services`, `data`, and `utils` as needed.
- **src/context/TranslationContext.js**: Provides translation context, language switching, and directionality.
- **src/locales/**: Translation JSON files for each language, organized by feature/section.
- **src/lib/**: Utility libraries (e.g., `getLocale.js`).

### 2. **Internationalization (i18n)**
- Each language has its own folder in `src/locales/` (e.g., `ar`, `en`, `fr`).
- Translation files are loaded dynamically and provided via React context.
- The current language and direction (`rtl` or `ltr`) are set on the `<html>` element.
- URLs are language-specific (e.g., `/ar/about`, `/en/about`), which is great for SEO.

### 3. **Design Direction**
- The app automatically sets the correct text direction (`dir="rtl"` or `dir="ltr"`) based on the current language.
- Components can access the current direction via the translation context.
- Use utility classes (e.g., Tailwind) that respect direction, or conditionally apply classes based on direction.

---

## How to Add a New Component (with i18n & Direction Support)

### 1. **Create the Component**
- Place your new component in the appropriate folder:
  - If it is shared UI, use `src/common/components/`.
  - If it is feature-specific, use `src/features/<feature>/components/`.
- Use the following pattern:

```jsx
import React from 'react';
import { useTranslation } from '@/context/TranslationContext';

const MyComponent = () => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <h1>{t('myComponent.title', 'Default Title')}</h1>
      {/* ...rest of your component... */}
    </div>
  );
};

export default MyComponent;
```

### 2. **Add Translation Keys**
- Add the necessary keys to each language file in `src/locales/<lang>/` (e.g., `myComponent.json` or an existing section).
- Example for `en/myComponent.json`:
```json
{
  "title": "My New Component Title",
  "description": "This is a description."
}
```
- Repeat for `ar/` and `fr/`.

### 3. **Update Translation Loader (if new file)**
- If you add a new translation file (e.g., `myComponent.json`), update the translation loader in `TranslationContext.js` to import it for each language.

### 4. **Use the Component**
- Import and use your component in a page or another component as usual.
- The component will automatically use the current language and direction.

### 5. **Design & Direction Best Practices**
- Use `isRTL` to conditionally apply direction-sensitive classes or styles.
- For icons or layout, consider mirroring or adjusting for RTL (e.g., margin-left vs. margin-right).
- Always provide a fallback string in the `t()` function for missing translations.

---

## Best Practices
- **Namespacing**: Group translation keys by feature or component for clarity.
- **Fallbacks**: Always provide a fallback in `t(key, fallback)`.
- **Direction**: Use the `isRTL` flag for direction-aware styling.
- **SEO**: Use language-specific URLs and set `<html lang>` and `dir` attributes (already handled).
- **Extensibility**: To add a new language, just add a new folder in `src/locales/` and provide translations.

---

## Example: Adding a Feature Component
1. Create `src/features/quotes/components/QuoteBanner.jsx`.
2. Add translation keys to `src/locales/en/quotes.json`, `ar/quotes.json`, `fr/quotes.json`.
3. Use `useTranslation()` and `isRTL` in your component.
4. Import and use the component in a page.

---

## Questions?
If you have questions about adding features, translations, or direction support, check this guide or ask the maintainers! 