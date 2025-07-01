'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/context/TranslationContext';


import CurrencySelector from '@/features/currency/components/CurrencySelector';
import GoldPriceDisplay from '@/features/gold/components/GoldPriceDisplay';
import ZakatTypeSelector from './ZakatTypeSelector';
import MadhabSelector from '@/common/components/MadhabSelector';
import ZakatResult from './ZakatResult';
import IslamicQuoteDisplay from '@/features/quotes/components/IslamicQuoteDisplay';

import MoneyCalculator from './calculators/MoneyCalculator';
import GoldSilverCalculator from './calculators/GoldSilverCalculator';
import BusinessCalculator from './calculators/BusinessCalculator';
import AgricultureCalculator from './calculators/AgricultureCalculator';
import LivestockCalculator from './calculators/LivestockCalculator';
import IncomeCalculator from './calculators/IncomeCalculator';
import RentalCalculator from './calculators/RentalCalculator';
import InvestmentCalculator from './calculators/InvestmentCalculator';

import CurrencyService from '@/features/currency/services/currencyService';

export default function ZakatCalculatorPage({ 
  lang 
}) {
  const { t, translations, isLoading } = useTranslation();

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedZakatType, setSelectedZakatType] = useState('');
  const [selectedMadhhab, setSelectedMadhhab] = useState('maliki');
  const [goldPrice, setGoldPrice] = useState(0);
  const [calculationResult, setCalculationResult] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [currencyService, setCurrencyService] = useState(null);

  useEffect(() => {
    const service = CurrencyService.getInstance();
    setCurrencyService(service);
    service.updateExchangeRates();
  }, []);

  const handleLocationDetected = (location) => {
    setUserLocation(location);
    if (location.detected) {
      setSelectedCurrency(location.currency);
    }
  };

  const handleGoldPriceUpdate = (price) => {
    setGoldPrice(price);
  };

  const renderCalculator = () => {
    if (!selectedZakatType || !goldPrice) return null;

    const calculatorProps = {
      madhab: selectedMadhhab,
      currency: selectedCurrency,
      goldPrice,
      onCalculation: setCalculationResult,
    };

    switch (selectedZakatType) {
      case 'money':
        return <MoneyCalculator {...calculatorProps} />;
      case 'goldSilver':
        return <GoldSilverCalculator {...calculatorProps} />;
      case 'business':
        return <BusinessCalculator {...calculatorProps} />;
      case 'agriculture':
        return <AgricultureCalculator {...calculatorProps} />;
      case 'livestock':
        return <LivestockCalculator {...calculatorProps} />;
      case 'income':
        return <IncomeCalculator {...calculatorProps} />;
      case 'rental':
        return <RentalCalculator {...calculatorProps} />;
      case 'investments':
        return <InvestmentCalculator {...calculatorProps} />;
      default:
        return null;
    }
  };

  if (isLoading || !translations) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.status.loading', 'جاري التحميل...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <CurrencySelector
          selectedCurrency={selectedCurrency}
          onCurrencyChange={(currency) => {
            setSelectedCurrency(currency);
            setCalculationResult(null);
          }}
          onLocationDetected={handleLocationDetected}
        />

        <GoldPriceDisplay currency={selectedCurrency} onPriceUpdate={handleGoldPriceUpdate} />

        <ZakatTypeSelector
          selectedType={selectedZakatType}
          onTypeSelect={(typeId) => {
            setSelectedZakatType(typeId);
            setCalculationResult(null);
          }}
        />

        {selectedZakatType && (
          <MadhabSelector
            selectedMadhhab={selectedMadhhab}
            onMadhabSelect={(madhhabId) => {
              setSelectedMadhhab(madhhabId);
              setCalculationResult(null);
            }}
          />
        )}

        <div className="mb-6">{renderCalculator()}</div>

        {calculationResult && (
          <ZakatResult
            result={calculationResult}
            zakatType={selectedZakatType}
            madhab={selectedMadhhab}
            currency={selectedCurrency}
          />
        )}
      </main>

      <IslamicQuoteDisplay />
    </div>
  );
}
