import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import useZakatStore from '../../store/zakatStore';

const sections = [
  {
    title: 'What is Zakat?',
    titleHi: 'ज़कात क्या है?',
    content: `Zakat (زكاة) is one of the Five Pillars of Islam. It is an obligatory form of charity that every Muslim who meets the minimum wealth threshold (Nisab) must pay annually. The word "Zakat" means "purification" — it purifies your wealth and soul.`,
    contentHi: 'ज़कात (زكاة) इस्लाम के पाँच स्तंभों में से एक है। यह एक अनिवार्य दान है जो हर उस मुसलमान को देना होता है जिसकी संपत्ति न्यूनतम सीमा (निसाब) से अधिक हो। "ज़कात" का अर्थ है "शुद्धिकरण" — यह आपकी संपत्ति और आत्मा को शुद्ध करता है।',
  },
  {
    title: 'Who Must Pay Zakat?',
    titleHi: 'ज़कात कौन देता है?',
    content: `You must pay Zakat if you are a Muslim who:
• Owns wealth above the Nisab threshold
• Has held that wealth for one full lunar year (Hawl — approximately 354 days)
• Is of sound mind and has reached puberty

Children and those with mental health conditions are generally exempt.`,
    contentHi: `आपको ज़कात देनी होगी यदि आप एक मुसलमान हैं जो:
• निसाब सीमा से अधिक संपत्ति रखते हैं
• एक पूर्ण चंद्र वर्ष (हौल — लगभग 354 दिन) से वह संपत्ति रखते हैं
• समझदार हैं और बालिग़ हैं

बच्चे और मानसिक रोगी आमतौर पर इससे मुक्त हैं।`,
  },
  {
    title: 'What is the Nisab?',
    titleHi: 'निसाब क्या है?',
    content: `Nisab (نصاب) is the minimum amount of wealth you must have before Zakat becomes obligatory. There are two standards:

🪙 Gold Standard: 87.48 grams of gold (≈ 7.5 tola)
🥈 Silver Standard: 612.36 grams of silver (≈ 52.5 tola)

Most scholars recommend the Silver Standard because it sets a lower threshold, meaning more people contribute to Zakat — which benefits more recipients. The value changes daily with market prices.`,
    contentHi: `निसाब (نصاب) वह न्यूनतम संपत्ति है जो आपके पास होनी चाहिए ज़कात अनिवार्य होने से पहले। दो मानक हैं:

🪙 सोने का मानक: 87.48 ग्राम सोना (≈ 7.5 तोला)
🥈 चाँदी का मानक: 612.36 ग्राम चाँदी (≈ 52.5 तोला)

अधिकांश विद्वान चाँदी का मानक सुझाते हैं क्योंकि यह कम सीमा निर्धारित करता है।`,
  },
  {
    title: 'How is Zakat Calculated?',
    titleHi: 'ज़कात की गणना कैसे होती है?',
    content: `The basic formula is simple:

1. Add up all your Zakatable assets (cash, gold, silver, investments, etc.)
2. Subtract eligible deductions (debts, immediate liabilities)
3. Compare with Nisab threshold
4. If your net wealth ≥ Nisab → Pay 2.5% as Zakat

Example: If you have ₹5,00,000 in total assets and ₹50,000 in debts:
• Net Zakatable wealth = ₹4,50,000
• Zakat due = ₹4,50,000 × 2.5% = ₹11,250`,
    contentHi: `मूल सूत्र सरल है:

1. अपनी सभी ज़कात योग्य संपत्ति जोड़ें (नकद, सोना, चाँदी, निवेश आदि)
2. पात्र कटौतियाँ घटाएं (कर्ज़, तत्काल देनदारियाँ)
3. निसाब सीमा से तुलना करें
4. यदि शुद्ध संपत्ति ≥ निसाब → 2.5% ज़कात दें

उदाहरण: यदि आपकी कुल संपत्ति ₹5,00,000 और कर्ज़ ₹50,000:
• शुद्ध ज़कात योग्य = ₹4,50,000
• ज़कात = ₹4,50,000 × 2.5% = ₹11,250`,
  },
  {
    title: 'Which Assets are Zakatable?',
    titleHi: 'कौन सी संपत्ति पर ज़कात लागू होती है?',
    content: `The following types of wealth are subject to Zakat:

💰 Cash & Savings — Bank accounts, FDs, cash in hand
🪙 Gold — Jewelry, coins, bars (Hanafi: ALL gold; Shafi: personal use exempt)
🥈 Silver — All silver items
📦 Business Inventory — Goods held for trade at market value
📄 Receivables — Loans given that are expected to be repaid
📈 Stocks & Shares — At current market value
📊 Mutual Funds — At current NAV
🏦 Provident Fund — Withdrawable amount only
🏠 Property for Trade — Only if bought to resell (NOT your home)
🌾 Agricultural Produce — 5% (irrigated) or 10% (rain-fed), due at harvest

NOT Zakatable: Your personal home, personal vehicle, personal clothing, household items.`,
    contentHi: `इन प्रकार की संपत्ति पर ज़कात लागू होती है:

💰 नकद और बचत — बैंक खाते, FD, हाथ में नकद
🪙 सोना — गहने, सिक्के, बार
🥈 चाँदी — सभी चाँदी की चीज़ें
📦 व्यापार सामग्री — बाज़ार मूल्य पर
📈 शेयर — वर्तमान बाज़ार मूल्य पर
📊 म्यूचुअल फंड — वर्तमान NAV पर
🏦 भविष्य निधि — केवल निकालने योग्य राशि
🏠 व्यापार के लिए संपत्ति — केवल बेचने के उद्देश्य से खरीदी गई

ज़कात लागू नहीं: व्यक्तिगत घर, वाहन, कपड़े, घरेलू सामान।`,
  },
  {
    title: 'Hanafi vs Shafi Differences',
    titleHi: 'हनफ़ी बनाम शाफ़ई अंतर',
    content: `The two most relevant schools for Indian Muslims:

Hanafi (most common in India & Pakistan):
• ALL gold is Zakatable, including personal jewelry
• PF/EPF: Zakat on accessible/received amount
• Most conservative approach (more people pay)

Shafi'i (common in Kerala, Southeast Asia):
• Personal-use gold jewelry is EXEMPT
• Generally a slightly different calculation approach

When in doubt, consult your local scholar or Imam for guidance specific to your situation.`,
    contentHi: `भारतीय मुसलमानों के लिए दो सबसे प्रासंगिक विचारधाराएँ:

हनफ़ी (भारत और पाकिस्तान में सबसे आम):
• सभी सोना ज़कात योग्य है, व्यक्तिगत गहनों सहित
• PF/EPF: सुलभ/प्राप्त राशि पर ज़कात

शाफ़ई (केरल, दक्षिण पूर्व एशिया में आम):
• व्यक्तिगत उपयोग के सोने के गहने मुक्त हैं

संदेह होने पर अपने स्थानीय आलिम या इमाम से परामर्श करें।`,
  },
];

export default function HowToCalculateScreen() {
  const language = useZakatStore((s) => s.language);
  const isHindi = language === 'hi';

  useSEO({
    title: 'How to Calculate Zakat — Step-by-Step Guide | Zakat Calculator',
    description: 'Learn how to calculate Zakat step by step. Understand Nisab, Hawl, Zakatable assets, Hanafi vs Shafi differences, and the 2.5% formula.',
  });

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 mb-6">
        <FiArrowLeft className="w-4 h-4" /> {isHindi ? 'होम पेज' : 'Back to Home'}
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {isHindi ? 'ज़कात की गणना कैसे करें' : 'How to Calculate Zakat'}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {isHindi
          ? 'एक संपूर्ण चरणबद्ध मार्गदर्शिका'
          : 'A complete step-by-step guide to understanding and calculating your Zakat'}
      </p>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <article key={i} className="card animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {isHindi ? section.titleHi : section.title}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {isHindi ? section.contentHi : section.content}
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/calculator" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
          {isHindi ? 'अभी गणना करें' : 'Calculate Now'}
          <FiArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
