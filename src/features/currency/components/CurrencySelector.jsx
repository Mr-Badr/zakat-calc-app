'use client';

import { useEffect, useState } from 'react';
import { Globe, MapPin, RefreshCw, CheckCircle, AlertCircle, Navigation, Search } from 'lucide-react';
import CurrencyService from '@/features/currency/services/currencyService';
import GoldPriceService from '@/features/gold/services/goldPriceService';
import { useTranslation } from '@/context/TranslationContext';

const CurrencySelector = ({ selectedCurrency, onCurrencyChange, onLocationDetected }) => {
  const { t } = useTranslation();
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState('idle');
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [isUpdatingRates, setIsUpdatingRates] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [isLoadingGoldPrice, setIsLoadingGoldPrice] = useState(false); // جديد: حالة تحميل سعر الذهب

  const currencyService = CurrencyService.getInstance();
  const goldPriceService = GoldPriceService.getInstance(); // جديد: instance من GoldPriceService

  const currencies = currencyService.getAllCurrencies();
  const selectedCurrencyInfo = currencyService.getCurrencyInfo(selectedCurrency);

  const filteredCountries = currencies.filter(currency =>
    currency.nameAr.includes(searchTerm) ||
    currency.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    currencyService.init(); // ✅ تحميل بيانات أسعار الصرف من localStorage بعد التأكد من وجود window
    goldPriceService.loadFromStorage(); // ✅ تحميل بيانات أسعار الذهب من localStorage
    updateExchangeRates();
    detectLocation();
    
    // تحسين: تحميل مسبق للعملات الشائعة
    const preloadCommonCurrencies = async () => {
      try {
        const exchangeRates = currencyService.getExchangeRates();
        await goldPriceService.preloadCommonCurrencies(exchangeRates);
      } catch (error) {
        console.warn('Failed to preload common currencies:', error);
      }
    };
    
    preloadCommonCurrencies();
  }, []);

  // تحديث سعر الذهب عند تغيير العملة المختارة
  useEffect(() => {
    if (!selectedCurrency) return;

    // تحسين: عرض السعر المخزن فوراً إذا كان متوفراً
    const cachedPrice = goldPriceService.getGoldPriceFast(selectedCurrency);
    if (cachedPrice) {
      // لا نحتاج لتحميل إذا كان السعر متوفر ومحدث
      setIsLoadingGoldPrice(false);
      return;
    }

    setIsLoadingGoldPrice(true);
    (async () => {
      try {
        await goldPriceService.getGoldPriceWithUpdate(selectedCurrency, currencyService.getExchangeRates());
      } catch (error) {
        console.warn('Failed to update gold price:', error);
      } finally {
        setIsLoadingGoldPrice(false);
      }
    })();
  }, [selectedCurrency]);

  const updateExchangeRates = async () => {
    setIsUpdatingRates(true);
    try {
      await currencyService.updateExchangeRates();
    } catch (error) {
      console.warn('فشل في تحديث أسعار الصرف:', error);
    } finally {
      setIsUpdatingRates(false);
    }
  };

  const detectLocation = async () => {
    setIsDetecting(true);
    setDetectionStatus('idle');

    try {
      const location = await currencyService.detectUserLocation();
      setDetectedLocation(location);
      setDetectionStatus('success');

      if (location.detected && location.currency !== selectedCurrency) {
        onCurrencyChange(location.currency);
      }

      if (onLocationDetected) {
        onLocationDetected(location);
      }
    } catch (error) {
      console.error('فشل في كشف الموقع:', error);
      setDetectionStatus('error');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleCountrySelect = (currency) => {
    onCurrencyChange(currency.code);
    setShowCountrySelector(false);
    setSearchTerm('');
  };

  const getStatusIcon = () => {
    if (isDetecting) return <RefreshCw className="animate-spin icon-blue" size={16} />;

    switch (detectionStatus) {
      case 'success':
        return <CheckCircle className="icon-green" size={16} />;
      case 'error':
        return <AlertCircle className="icon-red" size={16} />;
      default:
        return <MapPin className="text-gray-500" size={16} />;
    }
  };

  const getStatusText = () => {
    if (isDetecting) return t('common.status.detecting', 'جاري الكشف...');

    if (detectedLocation) {
      if (detectedLocation.detected) {
        return `${t('common.currency.locationDetected', 'تم كشف موقعك')}: ${detectedLocation.city ? `${detectedLocation.city}, ` : ''}${detectedLocation.country}`;
      } else {
        return t('common.currency.browserSettings', 'تم تحديد العملة من إعدادات المتصفح');
      }
    }

    return detectionStatus === 'error'
      ? t('common.currency.locationFailed', 'فشل في كشف الموقع')
      : t('common.currency.locationFailed', 'فشل في كشف الموقع');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 card-hover fade-in">
      <div className="flex items-center justify-center mb-6">
        <Globe className="icon-blue ml-2" size={24} />
        <h2 className="text-xl font-semibold text-blue-800 arabic-text font-title">
          {t('common.currency.title', 'اختر بلدك وعملتك المحلية')}
        </h2>
      </div>

      {/* معلومات كشف الموقع */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            {getStatusIcon()}
            <div>
              <div className="text-sm font-medium text-blue-800 arabic-text font-title">
                {t('common.currency.autoDetection', 'كشف الموقع التلقائي')}
              </div>
              <div className="text-xs text-blue-600 arabic-text font-body">
                {getStatusText()}
              </div>
              {detectedLocation?.latitude && detectedLocation?.longitude && (
                <div className="text-xs text-gray-500 english-numbers font-body">
                  📍 {detectedLocation.latitude.toFixed(4)}, {detectedLocation.longitude.toFixed(4)}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={detectLocation}
            disabled={isDetecting}
            className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isDetecting
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'btn-gradient text-white hover:shadow-lg'
            }`}
          >
            <Navigation size={16} />
            <span className="arabic-text font-body">
              {isDetecting ? t('common.status.detecting', 'جاري الكشف...') : t('common.currency.detectLocation', 'كشف موقعي')}
            </span>
          </button>
        </div>
      </div>

      {/* البلد والعملة الحالية */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 arabic-text font-title">
          {t('common.currency.currentSelection', 'البلد والعملة المحددة حالياً')}
        </label>
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="text-3xl font-title">{selectedCurrencyInfo?.flag}</div>
              <div>
                <div className="font-semibold text-gray-800 arabic-text font-title">
                  {selectedCurrencyInfo?.nameAr}
                </div>
                <div className="text-sm text-gray-600 arabic-text font-body">
                  {selectedCurrencyInfo?.country} ({selectedCurrencyInfo?.code})
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCountrySelector(true)}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-300"
            >
              <Search size={16} />
              <span className="arabic-text font-body">
                {t('common.currency.changeCountry', 'تغيير البلد')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* تحديث أسعار الصرف */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <RefreshCw className={`text-green-600 ${isUpdatingRates ? 'animate-spin' : ''}`} size={20} />
            <div>
              <div className="text-sm font-medium text-green-800 arabic-text font-title">
                {t('common.currency.updateRates', 'تحديث الأسعار')}
              </div>
              <div className="text-xs text-green-600 arabic-text font-body">
                {isUpdatingRates 
                  ? t('common.status.updating', 'جاري التحديث...')
                  : t('common.currency.ratesUpdated', 'أسعار الصرف محدثة')
                }
              </div>
            </div>
          </div>

          <button
            onClick={updateExchangeRates}
            disabled={isUpdatingRates}
            className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isUpdatingRates
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <RefreshCw className={`${isUpdatingRates ? 'animate-spin' : ''}`} size={16} />
            <span className="arabic-text font-body">
              {isUpdatingRates ? t('common.status.updating', 'جاري التحديث...') : t('common.currency.updateRates', 'تحديث الأسعار')}
            </span>
          </button>
        </div>
      </div>

      {/* قائمة اختيار البلد */}
      {showCountrySelector && (
        <>
          {/* خلفية شفافة */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowCountrySelector(false)}
          />

          {/* القائمة المنسدلة */}
          <div className="fixed inset-4 bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 arabic-text font-title">
                  {t('common.currency.selectOther', 'اختر بلداً آخر')}
                </h3>
                <button
                  onClick={() => setShowCountrySelector(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* البحث */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('common.currency.searchPlaceholder', 'ابحث عن البلد أو العملة...')}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 arabic-text font-body"
                />
              </div>
            </div>

            {/* قائمة البلدان */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredCountries.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCountrySelect(currency)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-right ${
                      selectedCurrency === currency.code
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="text-2xl">{currency.flag}</div>
                      <div>
                        <div className="font-semibold text-gray-800 arabic-text font-title">
                          {currency.nameAr}
                        </div>
                        <div className="text-sm text-gray-600 arabic-text font-body">
                          {currency.country} ({currency.code})
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySelector;
