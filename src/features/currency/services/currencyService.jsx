import { currencies } from './currencies.js';
import ExchangeRatesService from './exchangeRates.js';
import LocationService from './locationService.js';

class CurrencyService {
  static instance;

  constructor() {
    this.exchangeRatesService = ExchangeRatesService.getInstance();
    this.locationService = LocationService.getInstance();
  }

  static getInstance() {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService();
    }
    return CurrencyService.instance;
  }

  async init() {
    if (typeof window !== 'undefined') {
      this.exchangeRatesService.init();
      // حدث الأسعار عند التهيئة إذا لزم الأمر (لا تحدث أكثر من اللازم بفضل needsUpdate)
      await this.exchangeRatesService.updateExchangeRates();
    }
  }

  async updateExchangeRates() {
    return this.exchangeRatesService.updateExchangeRates();
  }

  convertCurrency(amount, fromCurrency, toCurrency) {
    return this.exchangeRatesService.convertCurrency(amount, fromCurrency, toCurrency);
  }

  async detectUserLocation() {
    return this.locationService.detectUserLocation();
  }

  getCurrencyInfo(code) {
    return currencies.find(c => c.code === code);
  }

  getAllCurrencies() {
    return currencies;
  }

  getExchangeRates() {
    return { ...this.exchangeRatesService.exchangeRates };
  }

  getLastUpdateTime() {
    return this.exchangeRatesService.lastUpdate;
  }
}

export default CurrencyService;
