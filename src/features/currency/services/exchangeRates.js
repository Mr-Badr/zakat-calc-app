export default class ExchangeRatesService {
  static instance;
  exchangeRates = {};
  lastUpdate = null;
  UPDATE_INTERVAL = 6 * 60 * 60 * 1000; // 6 ساعات

  constructor() {
    // لا نستخدم localStorage في constructor
  }

  static getInstance() {
    if (!ExchangeRatesService.instance) {
      ExchangeRatesService.instance = new ExchangeRatesService();
    }
    return ExchangeRatesService.instance;
  }

  init() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  loadFromStorage() {
    try {
      const rates = localStorage.getItem('zakatExchangeRates');
      const lastUpdate = localStorage.getItem('zakatExchangeLastUpdate');
      if (rates && lastUpdate) {
        this.exchangeRates = JSON.parse(rates);
        this.lastUpdate = new Date(lastUpdate);
      }
    } catch (error) {
      console.warn('فشل في تحميل أسعار الصرف:', error);
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('zakatExchangeRates', JSON.stringify(this.exchangeRates));
      localStorage.setItem('zakatExchangeLastUpdate', this.lastUpdate?.toISOString() || '');
    } catch (error) {
      console.warn('فشل في حفظ أسعار الصرف:', error);
    }
  }

  needsUpdate() {
    if (!this.lastUpdate) return true;
    const timeDiff = Date.now() - this.lastUpdate.getTime();
    return timeDiff > this.UPDATE_INTERVAL;
  }

  async updateExchangeRates() {
    if (!this.needsUpdate()) {
      // لا حاجة لتحديث الأسعار، نعيد النجاح فوراً
      return true;
    }

    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.rates) {
        this.exchangeRates = data.rates;
        this.lastUpdate = new Date();
        this.saveToStorage();
        return true;
      }
    } catch (error) {
      console.warn('فشل في تحديث أسعار الصرف:', error);
      // إذا لم يكن هناك بيانات في الذاكرة، استخدم الأسعار الاحتياطية
      if (Object.keys(this.exchangeRates).length === 0) {
        this.exchangeRates = this.getFallbackRates();
        this.lastUpdate = new Date();
        this.saveToStorage();
      }
    }

    return false;
  }

  getFallbackRates() {
    return {
      'SAR': 3.75, 'AED': 3.67, 'QAR': 3.64, 'KWD': 0.31, 'BHD': 0.38, 'OMR': 0.38,
      'JOD': 0.71, 'EGP': 30.85, 'MAD': 10.12, 'EUR': 0.92, 'USD': 1,
      'PKR': 287.5, 'INR': 83.12, 'TRY': 27.8
    };
  }

  getExchangeRate(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return 1;
    const fromRate = fromCurrency === 'USD' ? 1 : this.exchangeRates[fromCurrency];
    const toRate = toCurrency === 'USD' ? 1 : this.exchangeRates[toCurrency];
    if (!fromRate || !toRate) return 1;
    return toRate / fromRate;
  }

  convertCurrency(amount, fromCurrency, toCurrency) {
    const rate = this.getExchangeRate(fromCurrency, toCurrency);
    return amount * rate;
  }
}
