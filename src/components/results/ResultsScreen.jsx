import { FiDownload, FiExternalLink, FiRefreshCw, FiShare2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import useZakatStore from '../../store/zakatStore';
import { formatCurrency } from '../../utils/currency';
import { getNisabExplanation } from '../../utils/nisab';
import AdNative from '../ads/AdNative';

const ZAKAT_ORGS = [
  { name: 'Zakat Foundation of India', url: 'https://zakatindia.org' },
  { name: 'Human Welfare Foundation', url: 'https://hwfindia.org' },
  { name: 'Islamic Relief India', url: 'https://islamicrelief.in' },
];

export default function ResultsScreen() {
  const navigate = useNavigate();
  const { result, currency, madhab, nisabStandard, language, resetCalculation, goldWeights, goldPrice } = useZakatStore();
  const isHindi = language === 'hi';
  const nisabInfo = getNisabExplanation(nisabStandard);
  const goldKaratBreakdown = getGoldKaratBreakdown(goldWeights || {}, goldPrice || 0);

  useSEO({ title: 'Your Zakat Results — Zakat Calculator', noIndex: true });

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {isHindi ? 'कोई गणना उपलब्ध नहीं' : 'No calculation available'}
        </p>
        <button onClick={() => navigate('/calculator')} className="btn-primary">
          {isHindi ? 'ज़कात की गणना करें' : 'Calculate Zakat'}
        </button>
      </div>
    );
  }

  const handleRecalculate = () => {
    resetCalculation();
    navigate('/calculator');
  };

  const handleShare = async () => {
    const shareText = result.isLiable
      ? `My Zakat due this year: ${formatCurrency(result.zakatDue, currency)}. Calculate yours at Zakat Calculator!`
      : `I checked my Zakat status using Zakat Calculator. Check yours too!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Zakat Calculator', text: shareText, url: window.location.origin });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert(isHindi ? 'क्लिपबोर्ड पर कॉपी हो गया' : 'Copied to clipboard!');
    }
  };

  const handleDownloadPDF = async () => {
    const { exportZakatSummary } = await import('../../utils/pdfExport');
    exportZakatSummary(result, currency, madhab, nisabStandard, goldKaratBreakdown);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
      {/* Hero Section */}
      <section className="text-center mb-8 animate-fade-in">
        {result.isLiable ? (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 
              text-primary-600 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
              ✅ {isHindi ? 'ज़कात देय है' : 'Zakat is Due'}
            </div>
            <h1 className="text-lg text-gray-500 dark:text-gray-400 mb-2">
              {isHindi ? 'आपकी ज़कात राशि' : 'Your Zakat Due'}
            </h1>
            <p className="text-5xl sm:text-6xl font-extrabold text-primary-500 mb-2">
              {formatCurrency(result.zakatDue, currency)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isHindi ? 'शुद्ध ज़कात योग्य संपत्ति का 2.5%' : '2.5% of net Zakatable wealth'}
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 
              text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium mb-4">
              🤲 {isHindi ? 'ज़कात देय नहीं' : 'Zakat Not Due'}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {isHindi ? 'इस वर्ष ज़कात देय नहीं है' : 'Zakat is not due this year'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {result.message}
            </p>
          </>
        )}
      </section>

      {/* Nisab Comparison Bar */}
      <section className="card mb-6 animate-slide-up">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          {isHindi ? 'निसाब तुलना' : 'Nisab Comparison'}
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">{isHindi ? 'आपकी शुद्ध संपत्ति' : 'Your Net Wealth'}</span>
            <span className="font-medium">{formatCurrency(result.netZakatable, currency)}</span>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                result.isLiable ? 'bg-gradient-to-r from-primary-500 to-primary-400' : 'bg-gray-400'
              }`}
              style={{ width: `${Math.min(100, (result.netZakatable / (result.nisabValue || 1)) * 100)}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500"
              style={{ left: `${Math.min(100, (result.nisabValue / Math.max(result.netZakatable, result.nisabValue)) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0</span>
            <span className="text-red-500">Nisab: {formatCurrency(result.nisabValue, 'INR')}</span>
          </div>
        </div>
      </section>

      {/* Breakdown Table */}
      {result.breakdown.length > 0 && (
        <section className="card mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            {isHindi ? 'संपत्ति विवरण' : 'Asset Breakdown'}
          </h3>
          <div className="space-y-3">
            {result.breakdown
              .filter((b) => b.amount > 0)
              .map((item) => (
                <div key={item.categoryId} className="py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.categoryLabel}</p>
                      {item.note && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.note}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(item.amount, currency)}
                      </p>
                      <p className="text-xs text-primary-500">
                        Zakat: {formatCurrency(item.zakatAmount, currency)}
                      </p>
                    </div>
                  </div>
                  {/* Per-karat sub-breakdown for gold */}
                  {item.categoryId === 'gold' && goldKaratBreakdown.length > 0 && (
                    <div className="mt-2 ml-2 space-y-1">
                      {goldKaratBreakdown.map(({ karat, grams, pricePerGram, value }) => (
                        <div key={karat} className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
                          <span>{karat} · {grams}g @ {formatCurrency(pricePerGram, 'INR')}/g</span>
                          <span>{formatCurrency(value, currency)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-600 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">{isHindi ? 'कुल संपत्ति' : 'Total Assets'}</span>
              <span className="font-medium">{formatCurrency(result.totalAssets, currency)}</span>
            </div>
            {result.totalDeductions > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">{isHindi ? 'कुल कटौतियाँ' : 'Total Deductions'}</span>
                <span className="font-medium text-red-500">- {formatCurrency(result.totalDeductions, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-900 dark:text-white">{isHindi ? 'शुद्ध ज़कात योग्य' : 'Net Zakatable'}</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(result.netZakatable, currency)}</span>
            </div>
          </div>
        </section>
      )}

      {/* Calculation details */}
      <section className="card mb-6 animate-slide-up" style={{ animationDelay: '0.15s' }}>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          {isHindi ? 'गणना विवरण' : 'Calculation Details'}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Madhab</span>
            <span className="font-medium text-gray-900 dark:text-white capitalize">{madhab}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Nisab Standard</span>
            <span className="font-medium text-gray-900 dark:text-white capitalize">{nisabStandard} ({nisabInfo.weight})</span>
          </div>
        </div>
      </section>

      {/* Action buttons */}
      <section className="grid grid-cols-3 gap-3 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <button onClick={handleDownloadPDF} className="btn-primary text-sm py-3 flex flex-col items-center gap-1">
          <FiDownload className="w-5 h-5" />
          <span>PDF</span>
        </button>
        <button onClick={handleShare} className="btn-secondary text-sm py-3 flex flex-col items-center gap-1">
          <FiShare2 className="w-5 h-5" />
          <span>{isHindi ? 'शेयर' : 'Share'}</span>
        </button>
        <button onClick={handleRecalculate} className="btn-secondary text-sm py-3 flex flex-col items-center gap-1">
          <FiRefreshCw className="w-5 h-5" />
          <span>{isHindi ? 'फिर से' : 'Redo'}</span>
        </button>
      </section>

      <AdNative />

      {/* Community Support — first */}
      <section className="card mb-6 animate-slide-up border-2 border-primary-200 dark:border-primary-800" style={{ animationDelay: '0.3s' }}>
        <div className="text-center">
          <span className="text-3xl mb-3 block">💚</span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            {isHindi ? 'हमारी कम्युनिटी को सपोर्ट करें' : 'Support Our Community'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed max-w-md mx-auto">
            {isHindi
              ? 'यह ज़कात कैलकुलेटर किसी संगठन द्वारा फंड नहीं किया जाता — यह पूरी तरह से हमारी कम्युनिटी के भाइयों और बहनों के सहयोग से चलता है। आपका छोटा सा योगदान इस सेवा को ज़िंदा रखता है, ताकि लाखों मुसलमान मुफ़्त में अपनी ज़कात की गणना कर सकें। जज़ाकल्लाहु खैरन।'
              : 'This Zakat Calculator is not funded by any organization — it is built and maintained entirely by our community. Your small contribution keeps this service alive, so that millions of Muslims can calculate their Zakat for free. Every rupee counts. JazakAllahu Khairan.'}
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 inline-block mb-3 shadow-sm">
            <img
              src={new URL('../../assets/qr-code.png', import.meta.url).href}
              alt="Scan to support"
              className="w-48 h-48 mx-auto object-contain"
            />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {isHindi ? 'स्कैन करके सीधे भुगतान करें' : 'Scan to pay directly via UPI'}
          </p>
        </div>
      </section>

      {/* Voluntary Charity */}
      <section className="card mb-6 animate-slide-up" style={{ animationDelay: '0.35s' }}>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          🤲 {isHindi ? 'स्वैच्छिक दान (सदक़ा)' : 'Voluntary Charity (Sadaqah)'}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {isHindi
            ? 'आपकी ज़कात या सदक़ा कई ज़रूरतमंदों की ज़िंदगी बदल सकती है। यहाँ कुछ विश्वसनीय भारतीय ज़कात संगठन हैं:'
            : 'Your Zakat or Sadaqah can transform lives. Here are some trusted Indian Zakat organizations:'}
        </p>
        <div className="space-y-2 mb-4">
          {ZAKAT_ORGS.map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 
                hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{org.name}</span>
              <FiExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          ))}
        </div>
      </section>

      <footer className="text-center text-xs text-gray-400 dark:text-gray-500 pt-4">
        <p>{isHindi
          ? 'यह कैलकुलेटर केवल संदर्भ के लिए है। धार्मिक फ़तवों के लिए किसी आलिम से परामर्श करें।'
          : 'This calculator is for reference only. Consult a scholar for religious rulings.'}</p>
      </footer>
    </div>
  );
}

