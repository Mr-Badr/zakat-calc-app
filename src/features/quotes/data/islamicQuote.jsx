// مجموعة شاملة من الآيات القرآنية والأحاديث النبوية عن الزكاة

// Utility function to get a random quote from translations
export function getRandomIslamicQuote(translations, type = null) {
  const quotes = translations?.quotes_content || [];
  const filtered = type ? quotes.filter(q => q.type === type) : quotes;
  if (!filtered.length) return null;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
