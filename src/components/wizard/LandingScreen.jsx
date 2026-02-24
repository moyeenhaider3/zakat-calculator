import { FiArrowRight, FiBookOpen, FiDollarSign, FiDownload, FiHelpCircle, FiShield } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import useZakatStore from '../../store/zakatStore';
import AdInFeed from '../ads/AdInFeed';

const features = [
  {
    icon: <FiShield className="w-6 h-6" />,
    title: 'Islamically Accurate',
    titleHi: 'इस्लामी रूप से सटीक',
    desc: 'Supports Hanafi & Shafi madhab with documented rulings',
    descHi: 'हनफी और शाफी मज़हब को दस्तावेज़ी फ़तवों के साथ सपोर्ट करता है',
  },
  {
    icon: <FiDollarSign className="w-6 h-6" />,
    title: 'Live Gold & Silver Prices',
    titleHi: 'लाइव सोना और चाँदी की कीमतें',
    desc: 'Auto-fetches current prices with INR as default',
    descHi: 'INR में वर्तमान कीमतें स्वचालित रूप से प्राप्त करता है',
  },
  {
    icon: <FiDownload className="w-6 h-6" />,
    title: 'PDF Export',
    titleHi: 'PDF डाउनलोड',
    desc: 'Download your Zakat summary as a professional PDF',
    descHi: 'अपनी ज़कात का सारांश PDF के रूप में डाउनलोड करें',
  },
];

const steps = [
  { num: '1', text: 'Choose your madhab (school of thought) and Nisab standard', textHi: 'अपना मज़हब और निसाब मानक चुनें' },
  { num: '2', text: 'Enter your assets — cash, gold, silver, investments, etc.', textHi: 'अपनी संपत्ति दर्ज करें — नकद, सोना, चाँदी, निवेश आदि' },
  { num: '3', text: 'Enter any deductions — debts and liabilities', textHi: 'कटौतियाँ दर्ज करें — कर्ज़ और देनदारियाँ' },
  { num: '4', text: 'Review your results and download PDF summary', textHi: 'अपने परिणाम देखें और PDF सारांश डाउनलोड करें' },
];

export default function LandingScreen() {
  const navigate = useNavigate();
  const { language, resetCalculation } = useZakatStore();
  const isHindi = language === 'hi';

  useSEO({
    title: 'Zakat Calculator — Free & Accurate Zakat Calculation for Indian Muslims',
    description: 'Calculate your Zakat accurately with our free online calculator. Supports Hanafi & Shafi madhab, live gold/silver prices, INR & 7 other currencies, and PDF export.',
  });

  const handleStart = () => {
    resetCalculation();
    navigate('/calculator');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-16">
      {/* Hero Section */}
      <section className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 
          text-primary-600 dark:text-primary-300 rounded-full text-sm font-medium mb-6">
          🕌 {isHindi ? 'इस्लाम का तीसरा स्तंभ' : 'Third Pillar of Islam'}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          {isHindi ? 'ज़कात' : 'Zakat'}{' '}
          <span className="text-primary-500">
            {isHindi ? 'कैलकुलेटर' : 'Calculator'}
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 max-w-lg mx-auto">
          {isHindi
            ? 'अपनी ज़कात की सही गणना करें — भारतीय मुसलमानों के लिए'
            : 'Calculate your Zakat accurately — designed for Indian Muslims'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {isHindi
            ? 'ज़कात (زكاة) का अर्थ है "शुद्धिकरण"। यह इस्लाम के पाँच स्तंभों में से एक है — निसाब से ऊपर की संपत्ति पर 2.5% वार्षिक दान।'
            : 'Zakat (زكاة) means "purification" — one of the Five Pillars of Islam. An obligatory annual charity of 2.5% on wealth above the Nisab threshold.'}
        </p>

        <button
          onClick={handleStart}
          className="btn-primary text-lg px-10 py-4 shadow-lg shadow-primary-500/25 
            hover:shadow-xl hover:shadow-primary-500/30 transition-all group"
        >
          {isHindi ? 'ज़कात की गणना करें' : 'Calculate Your Zakat'}
          <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* How It Works */}
      <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {isHindi ? 'यह कैसे काम करता है' : 'How It Works'}
        </h2>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-4 card">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full 
                flex items-center justify-center font-bold text-lg">
                {step.num}
              </div>
              <p className="text-gray-700 dark:text-gray-300 pt-1.5">
                {isHindi ? step.textHi : step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad placement — below fold, before features */}
      <AdInFeed />

      {/* Features */}
      <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {isHindi ? 'विशेषताएँ' : 'Features'}
        </h2>
        <div className="grid gap-4">
          {features.map((f) => (
            <div key={f.title} className="card flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 dark:bg-primary-900/30 
                text-primary-500 rounded-xl flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {isHindi ? f.titleHi : f.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isHindi ? f.descHi : f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learn More Links */}
      <section className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {isHindi ? 'ज़कात के बारे में जानें' : 'Learn About Zakat'}
        </h2>
        <div className="grid gap-3">
          <Link
            to="/how-to-calculate"
            className="card flex items-center gap-4 hover:shadow-md hover:border-primary-200 
              dark:hover:border-primary-700 transition-all group"
          >
            <div className="w-10 h-10 bg-accent-50 dark:bg-accent-900/20 text-accent-500 
              rounded-lg flex items-center justify-center">
              <FiHelpCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {isHindi ? 'ज़कात की गणना कैसे करें' : 'How to Calculate Zakat'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isHindi ? 'चरणबद्ध मार्गदर्शिका' : 'Step-by-step guide'}
              </p>
            </div>
            <FiArrowRight className="text-gray-400 group-hover:text-primary-500 transition-colors" />
          </Link>
          <Link
            to="/glossary"
            className="card flex items-center gap-4 hover:shadow-md hover:border-primary-200 
              dark:hover:border-primary-700 transition-all group"
          >
            <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 text-primary-500 
              rounded-lg flex items-center justify-center">
              <FiBookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {isHindi ? 'इस्लामी शब्दावली' : 'Islamic Terms Glossary'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isHindi ? 'ज़कात में इस्तेमाल होने वाले शब्दों के अर्थ' : 'Understand the terms used in Zakat'}
              </p>
            </div>
            <FiArrowRight className="text-gray-400 group-hover:text-primary-500 transition-colors" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 dark:text-gray-500 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="mb-1">
          {isHindi
            ? 'यह कैलकुलेटर केवल संदर्भ के लिए है। धार्मिक फ़तवों के लिए किसी आलिम से परामर्श करें।'
            : 'This calculator is for reference only. Consult a scholar for religious rulings.'}
        </p>
        <p className="font-arabic text-sm text-primary-500/60">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      </footer>
    </div>
  );
}
