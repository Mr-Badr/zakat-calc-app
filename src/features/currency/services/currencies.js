// currencies.js

// قائمة العملات
export const currencies = [
  // الشرق الأوسط وشمال أفريقيا
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', country: 'Saudi Arabia', nameAr: 'ريال سعودي', flag: '🇸🇦' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', country: 'UAE', nameAr: 'درهم إماراتي', flag: '🇦🇪' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', country: 'Qatar', nameAr: 'ريال قطري', flag: '🇶🇦' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', country: 'Kuwait', nameAr: 'دينار كويتي', flag: '🇰🇼' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'د.ب', country: 'Bahrain', nameAr: 'دينار بحريني', flag: '🇧🇭' },
  { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع', country: 'Oman', nameAr: 'ريال عماني', flag: '🇴🇲' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.أ', country: 'Jordan', nameAr: 'دينار أردني', flag: '🇯🇴' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'ج.م', country: 'Egypt', nameAr: 'جنيه مصري', flag: '🇪🇬' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م', country: 'Morocco', nameAr: 'درهم مغربي', flag: '🇲🇦' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', country: 'Tunisia', nameAr: 'دينار تونسي', flag: '🇹🇳' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', country: 'Algeria', nameAr: 'دينار جزائري', flag: '🇩🇿' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', country: 'Lebanon', nameAr: 'ليرة لبنانية', flag: '🇱🇧' },
  { code: 'SYP', name: 'Syrian Pound', symbol: 'ل.س', country: 'Syria', nameAr: 'ليرة سورية', flag: '🇸🇾' },
  { code: 'IQD', name: 'Iraqi Dinar', symbol: 'د.ع', country: 'Iraq', nameAr: 'دينار عراقي', flag: '🇮🇶' },
  { code: 'YER', name: 'Yemeni Rial', symbol: 'ر.ي', country: 'Yemen', nameAr: 'ريال يمني', flag: '🇾🇪' },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'د.ل', country: 'Libya', nameAr: 'دينار ليبي', flag: '🇱🇾' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س', country: 'Sudan', nameAr: 'جنيه سوداني', flag: '🇸🇩' },
  { code: 'SOS', name: 'Somali Shilling', symbol: 'ش.ص', country: 'Somalia', nameAr: 'شلن صومالي', flag: '🇸🇴' },
  { code: 'DJF', name: 'Djiboutian Franc', symbol: 'ف.ج', country: 'Djibouti', nameAr: 'فرنك جيبوتي', flag: '🇩🇯' },
  { code: 'KMF', name: 'Comorian Franc', symbol: 'ف.ق', country: 'Comoros', nameAr: 'فرنك قمري', flag: '🇰🇲' },
  { code: 'MRU', name: 'Mauritanian Ouguiya', symbol: 'أ.م', country: 'Mauritania', nameAr: 'أوقية موريتانية', flag: '🇲🇷' },

  // العملات الرئيسية العالمية
  { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States', nameAr: 'دولار أمريكي', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'Eurozone', nameAr: 'يورو', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom', nameAr: 'جنيه إسترليني', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan', nameAr: 'ين ياباني', flag: '🇯🇵' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', country: 'Switzerland', nameAr: 'فرنك سويسري', flag: '🇨🇭' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', country: 'Canada', nameAr: 'دولار كندي', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia', nameAr: 'دولار أسترالي', flag: '🇦🇺' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', country: 'New Zealand', nameAr: 'دولار نيوزيلندي', flag: '🇳🇿' },

  // آسيا والمحيط الهادئ
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China', nameAr: 'يوان صيني', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India', nameAr: 'روبية هندية', flag: '🇮🇳' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', country: 'Pakistan', nameAr: 'روبية باكستانية', flag: '🇵🇰' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', country: 'Bangladesh', nameAr: 'تاكا بنغلاديشية', flag: '🇧🇩' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', country: 'Sri Lanka', nameAr: 'روبية سريلانكية', flag: '🇱🇰' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'Rs', country: 'Nepal', nameAr: 'روبية نيبالية', flag: '🇳🇵' },
  { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', country: 'Afghanistan', nameAr: 'أفغاني', flag: '🇦🇫' },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', country: 'Iran', nameAr: 'ريال إيراني', flag: '🇮🇷' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', country: 'South Korea', nameAr: 'وون كوري جنوبي', flag: '🇰🇷' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore', nameAr: 'دولار سنغافوري', flag: '🇸🇬' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', country: 'Malaysia', nameAr: 'رينغت ماليزي', flag: '🇲🇾' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', country: 'Indonesia', nameAr: 'روبية إندونيسية', flag: '🇮🇩' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', country: 'Thailand', nameAr: 'بات تايلاندي', flag: '🇹🇭' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', country: 'Philippines', nameAr: 'بيسو فلبيني', flag: '🇵🇭' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', country: 'Vietnam', nameAr: 'دونغ فيتنامي', flag: '🇻🇳' },
  { code: 'BND', name: 'Brunei Dollar', symbol: 'B$', country: 'Brunei', nameAr: 'دولار بروناي', flag: '🇧🇳' },

  // أوروبا
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', country: 'Russia', nameAr: 'روبل روسي', flag: '🇷🇺' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', country: 'Turkey', nameAr: 'ليرة تركية', flag: '🇹🇷' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', country: 'Ukraine', nameAr: 'هريفنيا أوكرانية', flag: '🇺🇦' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', country: 'Poland', nameAr: 'زلوتي بولندي', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', country: 'Czech Republic', nameAr: 'كورونا تشيكية', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', country: 'Hungary', nameAr: 'فورنت هنغاري', flag: '🇭🇺' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', country: 'Romania', nameAr: 'ليو روماني', flag: '🇷🇴' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', country: 'Bulgaria', nameAr: 'ليف بلغاري', flag: '🇧🇬' },

  // أفريقيا
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', country: 'South Africa', nameAr: 'راند جنوب أفريقي', flag: '🇿🇦' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', country: 'Nigeria', nameAr: 'نايرا نيجيرية', flag: '🇳🇬' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', country: 'Ghana', nameAr: 'سيدي غاني', flag: '🇬🇭' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', country: 'Kenya', nameAr: 'شلن كيني', flag: '🇰🇪' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', country: 'Uganda', nameAr: 'شلن أوغندي', flag: '🇺🇬' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', country: 'Tanzania', nameAr: 'شلن تنزاني', flag: '🇹🇿' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', country: 'Ethiopia', nameAr: 'بير إثيوبي', flag: '🇪🇹' },
  { code: 'MGA', name: 'Malagasy Ariary', symbol: 'Ar', country: 'Madagascar', nameAr: 'أرياري مدغشقري', flag: '🇲🇬' },

  // الأمريكتان
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', country: 'Brazil', nameAr: 'ريال برازيلي', flag: '🇧🇷' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', country: 'Argentina', nameAr: 'بيسو أرجنتيني', flag: '🇦🇷' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', country: 'Chile', nameAr: 'بيسو تشيلي', flag: '🇨🇱' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', country: 'Colombia', nameAr: 'بيسو كولومبي', flag: '🇨🇴' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', country: 'Peru', nameAr: 'سول بيروفي', flag: '🇵🇪' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', country: 'Mexico', nameAr: 'بيسو مكسيكي', flag: '🇲🇽' }
];

export const countryToCurrency = {
  'SA': 'SAR', 'AE': 'AED', 'QA': 'QAR', 'KW': 'KWD', 'BH': 'BHD', 'OM': 'OMR',
  'JO': 'JOD', 'EG': 'EGP', 'MA': 'MAD', 'TN': 'TND', 'DZ': 'DZD', 'LB': 'LBP',
  'SY': 'SYP', 'IQ': 'IQD', 'YE': 'YER', 'LY': 'LYD', 'SD': 'SDG', 'SO': 'SOS',
  'DJ': 'DJF', 'KM': 'KMF', 'MR': 'MRU', 'US': 'USD', 'GB': 'GBP', 'DE': 'EUR',
  'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR', 'NL': 'EUR', 'BE': 'EUR', 'AT': 'EUR',
  'PT': 'EUR', 'IE': 'EUR', 'FI': 'EUR', 'GR': 'EUR', 'JP': 'JPY', 'CH': 'CHF',
  'CA': 'CAD', 'AU': 'AUD', 'NZ': 'NZD', 'CN': 'CNY', 'IN': 'INR', 'PK': 'PKR',
  'BD': 'BDT', 'LK': 'LKR', 'NP': 'NPR', 'AF': 'AFN', 'IR': 'IRR', 'KR': 'KRW',
  'SG': 'SGD', 'MY': 'MYR', 'ID': 'IDR', 'TH': 'THB', 'PH': 'PHP', 'VN': 'VND',
  'BN': 'BND', 'RU': 'RUB', 'TR': 'TRY', 'UA': 'UAH', 'PL': 'PLN', 'CZ': 'CZK',
  'HU': 'HUF', 'RO': 'RON', 'BG': 'BGN', 'ZA': 'ZAR', 'NG': 'NGN', 'GH': 'GHS',
  'KE': 'KES', 'UG': 'UGX', 'TZ': 'TZS', 'ET': 'ETB', 'MG': 'MGA', 'BR': 'BRL',
  'AR': 'ARS', 'CL': 'CLP', 'CO': 'COP', 'PE': 'PEN', 'MX': 'MXN'
};
