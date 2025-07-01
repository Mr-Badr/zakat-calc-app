'use client'

class GoldPriceService {
  static instance;
  goldPrices = {};
  UPDATE_INTERVAL = 30 * 60 * 1000; // 30 دقيقة
  STORAGE_KEY = 'zakatGoldPrices';

  FALLBACK_GOLD_PRICE_USD_PER_OZ = 2000;
  GRAMS_PER_OUNCE = 31.1035;

  constructor() {
    // لا تقم بالتحميل هنا
  }

  static getInstance() {
    if (!GoldPriceService.instance) {
      GoldPriceService.instance = new GoldPriceService();
    }
    return GoldPriceService.instance;
  }

  init() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        Object.keys(data).forEach(currency => {
          this.goldPrices[currency] = {
            ...data[currency],
            lastUpdated: new Date(data[currency].lastUpdated),
          };
        });
      }
    } catch (error) {
      console.warn('Failed to load gold prices from localStorage:', error);
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.goldPrices));
    } catch (error) {
      console.warn('Failed to save gold prices:', error);
    }
  }

  // تحسين: فحص سريع للcache
  hasValidCache(currency) {
    const goldPrice = this.goldPrices[currency];
    if (!goldPrice) return false;
    
    const timeDiff = Date.now() - goldPrice.lastUpdated.getTime();
    return timeDiff <= this.UPDATE_INTERVAL;
  }

  // تحسين: الحصول على السعر بسرعة (مع cache فقط)
  getGoldPriceFast(currency) {
    if (this.hasValidCache(currency)) {
      return this.goldPrices[currency];
    }
    return null;
  }

  needsUpdate(currency) {
    return !this.hasValidCache(currency);
  }

  // تحسين: استدعاء متوازي لجميع APIs
  async fetchFromAllApis(currency) {
    const promises = [
      this.fetchFromMetalsApi(currency),
      this.fetchFromGoldApi(currency),
      this.fetchFromExchangeRateApi(currency)
    ];

    try {
      // انتظار أول نتيجة صحيحة من أي API
      const results = await Promise.allSettled(promises);
      
      for (let i = 0; i < results.length; i++) {
        if (results[i].status === 'fulfilled' && results[i].value !== null) {
          const sources = ['metals-api.com', 'goldapi.io', 'exchangerate-api.com'];
          return { price: results[i].value, source: sources[i] };
        }
      }
    } catch (error) {
      console.warn('All API calls failed:', error);
    }

    return null;
  }

  async fetchFromMetalsApi(currency) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // timeout بعد 3 ثواني

      const response = await fetch(`https://api.metals.live/v1/spot/gold?currency=${currency}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      if (data && data.price) {
        return data.price / this.GRAMS_PER_OUNCE;
      }
    } catch (error) {
      console.warn('Failed to fetch from Metals API:', error);
    }
    return null;
  }

  async fetchFromGoldApi(currency) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`https://api.goldapi.io/api/XAU/${currency}`, {
        headers: { 'x-access-token': 'goldapi-demo-key' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      if (data && data.price) {
        return data.price / this.GRAMS_PER_OUNCE;
      }
    } catch (error) {
      console.warn('Failed to fetch from Gold API:', error);
    }
    return null;
  }

  async fetchFromExchangeRateApi(currency) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const goldResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const goldData = await goldResponse.json();

      if (!goldData.rates || !goldData.rates[currency]) {
        throw new Error('Currency not supported');
      }

      const exchangeRate = goldData.rates[currency];
      const goldPriceUsdPerGram = this.FALLBACK_GOLD_PRICE_USD_PER_OZ / this.GRAMS_PER_OUNCE;

      return goldPriceUsdPerGram * exchangeRate;
    } catch (error) {
      console.warn('Failed to fetch from Exchange Rate API:', error);
    }
    return null;
  }

  calculateFallbackPrice(currency, exchangeRates) {
    const goldPriceUsdPerGram = this.FALLBACK_GOLD_PRICE_USD_PER_OZ / this.GRAMS_PER_OUNCE;
    const exchangeRate = exchangeRates[currency] || 1;
    return goldPriceUsdPerGram * exchangeRate;
  }

  // تحسين: تحديث سريع مع cache
  async updateGoldPrice(currency, exchangeRates = {}) {
    // إذا كان لدينا سعر حديث، لا نحتاج للتحديث
    if (!this.needsUpdate(currency)) {
      return true;
    }

    // محاولة الحصول على سعر من APIs
    const apiResult = await this.fetchFromAllApis(currency);
    
    let price, source;
    
    if (apiResult) {
      price = apiResult.price;
      source = apiResult.source;
    } else {
      // استخدام السعر الاحتياطي
      price = this.calculateFallbackPrice(currency, exchangeRates);
      source = 'fallback calculation';
    }

    this.goldPrices[currency] = {
      price,
      currency,
      lastUpdated: new Date(),
      source,
    };

    this.saveToStorage();
    return true;
  }

  getGoldPrice(currency) {
    return this.goldPrices[currency] || null;
  }

  // تحسين: إرجاع سريع مع تحديث في الخلفية
  async getGoldPriceWithUpdate(currency, exchangeRates = {}) {
    // إرجاع السعر المخزن فوراً إذا كان متوفراً
    const cachedPrice = this.getGoldPrice(currency);
    
    if (cachedPrice && !this.needsUpdate(currency)) {
      return cachedPrice;
    }

    // إذا كان السعر المخزن قديماً، استخدمه مؤقتاً
    if (cachedPrice) {
      // تحديث في الخلفية
      this.updateGoldPrice(currency, exchangeRates).catch(console.error);
      return cachedPrice;
    }

    // إذا لم يكن هناك سعر مخزن، انتظر التحديث
    await this.updateGoldPrice(currency, exchangeRates);
    const price = this.getGoldPrice(currency);
    
    if (price) return price;

    // fallback إذا لم يتم العثور على سعر
    const fallbackPrice = this.calculateFallbackPrice(currency, exchangeRates);
    const fallbackGoldPrice = {
      price: fallbackPrice,
      currency,
      lastUpdated: new Date(),
      source: 'fallback calculation',
    };

    this.goldPrices[currency] = fallbackGoldPrice;
    this.saveToStorage();

    return fallbackGoldPrice;
  }

  // جديد: تحميل مسبق للعملات الشائعة
  async preloadCommonCurrencies(exchangeRates) {
    const commonCurrencies = ['USD', 'SAR', 'AED', 'EUR', 'GBP', 'KWD', 'BHD', 'QAR'];
    
    const promises = commonCurrencies.map(async (currency) => {
      if (this.needsUpdate(currency)) {
        try {
          await this.updateGoldPrice(currency, exchangeRates);
        } catch (error) {
          console.warn(`Failed to preload ${currency}:`, error);
        }
      }
    });

    // تشغيل في الخلفية بدون انتظار
    Promise.allSettled(promises).catch(console.error);
  }

  getAllPrices() {
    return { ...this.goldPrices };
  }

  clearCache() {
    this.goldPrices = {};
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export default GoldPriceService;
