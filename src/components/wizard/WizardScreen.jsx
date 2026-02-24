import { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiSkipForward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import useZakatStore from '../../store/zakatStore';
import { ASSET_CATEGORIES } from '../../utils/assetTypes';
import { fetchExchangeRates } from '../../utils/currency';
import { fetchGoldPriceINR, fetchSilverPriceINR } from '../../utils/metalPrices';
import StickyFooter from '../ui/StickyFooter';
import AssetStep from './AssetStep';
import DeductionsStep from './DeductionsStep';
import ReviewStep from './ReviewStep';
import SettingsStep from './SettingsStep';

// Steps = Settings + 10 Asset Categories + Deductions + Review = 13 total
const SETTINGS_STEP = 0;
const DEDUCTIONS_STEP = ASSET_CATEGORIES.length + 1;
const REVIEW_STEP = ASSET_CATEGORIES.length + 2;
const TOTAL_STEPS = ASSET_CATEGORIES.length + 3;

export default function WizardScreen() {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, setPrices, setExchangeRates, setPriceSource } = useZakatStore();
  const [pricesLoaded, setPricesLoaded] = useState(false);

  useSEO({
    title: `Calculate Zakat — Step ${currentStep + 1} of ${TOTAL_STEPS}`,
    noIndex: true,
  });

  // Fetch live prices on mount
  useEffect(() => {
    async function loadPrices() {
      const [gold, silver, exchange] = await Promise.all([
        fetchGoldPriceINR(),
        fetchSilverPriceINR(),
        fetchExchangeRates('INR'),
      ]);
      setPrices(gold.pricePerGram, silver.pricePerGram);
      setExchangeRates(exchange.rates);
      setPriceSource(gold.source);
      setPricesLoaded(true);
    }
    loadPrices();
  }, []);

  const handleNext = () => {
    if (currentStep === REVIEW_STEP) {
      const store = useZakatStore.getState();
      store.calculateResult();
      navigate('/results');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < REVIEW_STEP) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStep = () => {
    if (currentStep === SETTINGS_STEP) return <SettingsStep />;
    if (currentStep === DEDUCTIONS_STEP) return <DeductionsStep />;
    if (currentStep === REVIEW_STEP) return <ReviewStep />;
    const categoryIndex = currentStep - 1;
    const category = ASSET_CATEGORIES[categoryIndex];
    return <AssetStep category={category} />;
  };

  const getStepLabel = () => {
    if (currentStep === SETTINGS_STEP) return 'Settings';
    if (currentStep === DEDUCTIONS_STEP) return 'Deductions';
    if (currentStep === REVIEW_STEP) return 'Review';
    return ASSET_CATEGORIES[currentStep - 1]?.label || '';
  };

  const isAssetStep = currentStep > SETTINGS_STEP && currentStep < DEDUCTIONS_STEP;
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-4 pb-32">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Step {currentStep + 1} of {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium text-primary-500">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {getStepLabel()}
        </p>
      </div>

      {/* Loading indicator for prices */}
      {!pricesLoaded && currentStep > SETTINGS_STEP && (
        <div className="mb-4 px-3 py-2 bg-accent-50 dark:bg-accent-900/20 rounded-lg text-sm text-accent-700 dark:text-accent-300 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-accent-300 border-t-accent-600 rounded-full animate-spin" />
          Fetching live gold & silver prices...
        </div>
      )}

      {/* Step content */}
      <div className="animate-fade-in" key={currentStep}>
        {renderStep()}
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <StickyFooter />
        <div className="glass border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <button
              onClick={handleBack}
              className="btn-secondary flex items-center gap-2 py-2.5 px-4 text-sm"
            >
              <FiArrowLeft className="w-4 h-4" />
              {currentStep === 0 ? 'Home' : 'Back'}
            </button>

            <div className="flex items-center gap-2">
              {isAssetStep && (
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 
                    dark:hover:text-gray-200 px-3 py-2.5 min-h-tap flex items-center gap-1 transition-colors"
                >
                  <FiSkipForward className="w-4 h-4" />
                  Skip
                </button>
              )}
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2 py-2.5 px-6 text-sm"
              >
                {currentStep === REVIEW_STEP ? 'Calculate' : 'Next'}
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
