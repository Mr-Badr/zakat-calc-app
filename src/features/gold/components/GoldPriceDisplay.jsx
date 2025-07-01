'use client'

import React, { useEffect, useState } from 'react';
import { Gem, RefreshCw, CheckCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import GoldPriceService from '@/features/gold/services/goldPriceService';
import CurrencyService from '@/features/currency/services/currencyService';
import { useTranslation } from '@/context/TranslationContext';

const GoldPriceDisplay = ({ currency, onPriceUpdate }) => {
  const { t, language, SUPPORTED_LANGUAGES } = useTranslation();
  const [goldPrice, setGoldPrice] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('idle');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const goldService = GoldPriceService.getInstance();
  const currencyService = CurrencyService.getInstance();
  const currencyInfo = currencyService.getCurrencyInfo(currency);

  const isRTL = SUPPORTED_LANGUAGES[language]?.dir === 'rtl';

  useEffect(() => {
    currencyService.init?.(); // تأكد من تحميل بيانات أسعار الصرف من التخزين المحلي
    updateGoldPrice();
  }, [currency]);

  // تحسين: تحديث تلقائي في الخلفية
  useEffect(() => {
    if (!currency) return;

    const interval = setInterval(async () => {
      const exchangeRates = currencyService.getExchangeRates();
      if (goldService.needsUpdate(currency)) {
        try {
          await goldService.updateGoldPrice(currency, exchangeRates);
          const updatedPrice = goldService.getGoldPrice(currency);
          if (updatedPrice) {
            setGoldPrice(updatedPrice);
            if (onPriceUpdate) {
              onPriceUpdate(updatedPrice.price);
            }
          }
        } catch (error) {
          console.warn('Background update failed:', error);
        }
      }
    }, 5 * 60 * 1000); // تحديث كل 5 دقائق

    return () => clearInterval(interval);
  }, [currency]);

  const updateGoldPrice = async () => {
    // تحسين: عرض السعر المخزن فوراً إذا كان متوفراً
    const cachedPrice = goldService.getGoldPriceFast(currency);
    if (cachedPrice && !isInitialLoad) {
      setGoldPrice(cachedPrice);
      if (onPriceUpdate) {
        onPriceUpdate(cachedPrice.price);
      }
    }

    setIsUpdating(true);
    setUpdateStatus('idle');

    try {
      const exchangeRates = currencyService.getExchangeRates();
      const price = await goldService.getGoldPriceWithUpdate(currency, exchangeRates);
      
      setGoldPrice(price);
      setUpdateStatus('success');
      setIsInitialLoad(false);
      
      if (onPriceUpdate) {
        onPriceUpdate(price.price);
      }
    } catch (error) {
      console.error('فشل في تحديث سعر الذهب:', error);
      setUpdateStatus('error');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatLastUpdate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return t('goldPrice.now', 'الآن');
    }
    
    const now = new Date();
    const updateDate = new Date(date);
    const diffMs = now.getTime() - updateDate.getTime();
    
    if (diffMs < 0) {
      return t('goldPrice.now', 'الآن');
    }
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return t('goldPrice.now', 'الآن');
    if (diffMinutes < 60) return `${t('goldPrice.minutesAgo', 'منذ')} ${diffMinutes} ${t('goldPrice.minute', 'دقيقة')}`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${t('goldPrice.hoursAgo', 'منذ')} ${diffHours} ${t('goldPrice.hour', 'ساعة')}`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${t('goldPrice.daysAgo', 'منذ')} ${diffDays} ${t('goldPrice.day', 'يوم')}`;
  };

  const getStatusIcon = () => {
    if (isUpdating) return <RefreshCw className="animate-spin icon-blue" size={16} />;
    
    switch (updateStatus) {
      case 'success':
        return <CheckCircle className="icon-green" size={16} />;
      case 'error':
        return <AlertTriangle className="icon-red" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = () => {
    switch (goldPrice?.source) {
      case 'metals-api.com':
      case 'goldapi.io':
        return 'text-green-600';
      case 'exchangerate-api.com':
        return 'text-blue-600';
      default:
        return 'text-amber-600';
    }
  };

  const getSourceText = () => {
    switch (goldPrice?.source) {
      case 'metals-api.com':
        return t('goldPrice.metalsApi', 'Metals API (مباشر)');
      case 'goldapi.io':
        return t('goldPrice.goldApi', 'Gold API (مباشر)');
      case 'exchangerate-api.com':
        return t('goldPrice.exchangeRateApi', 'Exchange Rate API');
      default:
        return t('goldPrice.fallbackCalculation', 'حساب احتياطي');
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-6 card-hover fade-in glow-effect font-body">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Gem className={`icon-amber ${isRTL ? 'ml-3' : 'mr-3'}`} size={24} />
          <h3 className="font-bold text-amber-800 text-lg arabic-text font-title">
            {t('goldPrice.title', 'سعر الذهب المباشر')}
          </h3>
          <TrendingUp className={`icon-green ${isRTL ? 'ml-3' : 'mr-3'}`} size={20} />
        </div>
        
        <button
          onClick={updateGoldPrice}
          disabled={isUpdating}
          className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            isUpdating
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'gradient-amber text-white hover:shadow-lg transform hover:scale-105'
          }`}
        >
          <RefreshCw className={isUpdating ? 'animate-spin' : ''} size={16} />
          <span className="arabic-text">
            {isUpdating ? t('goldPrice.updating', 'جاري التحديث...') : t('goldPrice.updatePrice', 'تحديث السعر')}
          </span>
        </button>
      </div>

      {goldPrice && (
        <div className="space-y-4">
          {/* السعر الحالي */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-2 arabic-text font-body">
                  {t('goldPrice.gram24K', 'سعر جرام الذهب عيار 24 قيراط')}
                </div>
                <div className="text-3xl font-bold text-amber-700 mb-1 english-numbers font-title">
                  {formatPrice(goldPrice.price)} {currencyInfo?.symbol}
                </div>
                <div className="text-sm text-gray-500 arabic-text font-body">
                  {currencyInfo?.nameAr}
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl mb-2 pulse-animation">🥇</div>
                <div className="text-xs text-amber-600 font-medium arabic-text font-body">
                  {t('goldPrice.karat24', 'عيار 24')}
                </div>
              </div>
            </div>
          </div>

          {/* حساب النصاب */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-emerald-800 mb-1 arabic-text font-body">
                    {t('goldPrice.nisabGold', 'نصاب الذهب (85 جرام)')}
                  </div>
                  <div className="text-2xl font-bold text-emerald-700 english-numbers font-title">
                    {formatPrice(goldPrice.price * 85)} {currencyInfo?.symbol}
                  </div>
                  <div className="text-xs text-emerald-600 arabic-text font-body">
                    {t('goldPrice.nisabDescription', 'الحد الأدنى للزكاة')}
                  </div>
                </div>
                <div className="text-3xl">⚖️</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-blue-800 mb-1 arabic-text font-body">
                    {t('goldPrice.nisabSilver', 'نصاب الفضة (595 جرام)')}
                  </div>
                  <div className="text-2xl font-bold text-blue-700 english-numbers font-title">
                    {formatPrice((goldPrice.price / 70) * 595)} {currencyInfo?.symbol}
                  </div>
                  <div className="text-xs text-blue-600 arabic-text font-body">
                    {t('goldPrice.hanafiMadhab', 'حسب المذهب الحنفي')}
                  </div>
                </div>
                <div className="text-3xl">🥈</div>
              </div>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="bg-white rounded-lg p-4 border border-amber-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500 mb-1 arabic-text font-body">
                  {t('goldPrice.lastUpdate', 'آخر تحديث')}
                </div>
                <div className="text-sm font-medium text-gray-800 arabic-text font-body">
                  {formatLastUpdate(goldPrice.lastUpdate)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 arabic-text font-body">
                  {t('goldPrice.source', 'المصدر')}
                </div>
                <div className={`text-sm font-medium ${getStatusColor()} arabic-text font-body`}>
                  {getSourceText()}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 arabic-text font-body">
                  {t('goldPrice.status', 'الحالة')}
                </div>
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  {getStatusIcon()}
                  <span className="text-sm font-medium text-gray-800 arabic-text font-body">
                    {updateStatus === 'success' 
                      ? t('goldPrice.statusUpdated', 'محدث')
                      : updateStatus === 'error'
                      ? t('goldPrice.statusError', 'خطأ')
                      : t('goldPrice.statusIdle', 'في الانتظار')
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!goldPrice && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 arabic-text font-body">
            {t('goldPrice.loading', 'جاري تحميل سعر الذهب...')}
          </p>
        </div>
      )}
    </div>
  );
};

export default GoldPriceDisplay;
