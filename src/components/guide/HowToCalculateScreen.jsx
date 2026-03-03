import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import useSEO from "../../hooks/useSEO";
import useTranslation from "../../hooks/useTranslation";

const sectionsByLang = {
  en: [
    {
      title: "What is Zakat?",
      content: `Zakat (زكاة) is one of the Five Pillars of Islam. It is an obligatory form of charity that every Muslim who meets the minimum wealth threshold (Nisab) must pay annually. The word "Zakat" means "purification" — it purifies your wealth and soul.`,
    },
    {
      title: "Who Must Pay Zakat?",
      content: `You must pay Zakat if you are a Muslim who:
• Owns wealth above the Nisab threshold
• Has held that wealth for one full lunar year (Hawl — approximately 354 days)
• Is of sound mind and has reached puberty

Children and those with mental health conditions are generally exempt.`,
    },
    {
      title: "What is the Nisab?",
      content: `Nisab (نصاب) is the minimum amount of wealth you must have before Zakat becomes obligatory. There are two standards:

🪙 Gold Standard: 87.48 grams of gold (≈ 7.5 tola)
🥈 Silver Standard: 612.36 grams of silver (≈ 52.5 tola)

Most scholars recommend the Silver Standard because it sets a lower threshold, meaning more people contribute to Zakat — which benefits more recipients. The value changes daily with market prices.`,
    },
    {
      title: "How is Zakat Calculated?",
      content: `The basic formula is simple:

1. Add up all your Zakatable assets (cash, gold, silver, investments, etc.)
2. Subtract eligible deductions (debts, immediate liabilities)
3. Compare with Nisab threshold
4. If your net wealth ≥ Nisab → Pay 2.5% as Zakat

Example: If you have 50,000 in total assets and 5,000 in debts:
• Net Zakatable wealth = 45,000
• Zakat due = 45,000 × 2.5% = 1,125`,
    },
    {
      title: "Which Assets are Zakatable?",
      content: `The following types of wealth are subject to Zakat:

💰 Cash & Savings — Bank accounts, deposits, cash in hand
🪙 Gold — Jewelry, coins, bars (Hanafi: ALL gold; Shafi: personal use exempt)
🥈 Silver — All silver items
📦 Business Inventory — Goods held for trade at market value
📄 Receivables — Loans given that are expected to be repaid
📈 Stocks & Shares — At current market value
📊 Mutual Funds — At current NAV
🏦 Retirement / Provident Fund — Withdrawable amount only
🏠 Property for Trade — Only if bought to resell (NOT your home)
🌾 Agricultural Produce — 5% (irrigated) or 10% (rain-fed), due at harvest

NOT Zakatable: Your personal home, personal vehicle, personal clothing, household items.`,
    },
    {
      title: "Hanafi vs Shafi Differences",
      content: `Two of the most widely followed schools of thought:

Hanafi:
• ALL gold is Zakatable, including personal jewelry
• Retirement/Provident Fund: Zakat on accessible/received amount
• Most conservative approach (more people pay)

Shafi'i:
• Personal-use gold jewelry is EXEMPT
• Generally a slightly different calculation approach

When in doubt, consult your local scholar or Imam for guidance specific to your situation.`,
    },
  ],
  hi: [
    {
      title: "ज़कात क्या है?",
      content:
        'ज़कात (زكاة) इस्लाम के पाँच स्तंभों में से एक है। यह एक अनिवार्य दान है जो हर उस मुसलमान को देना होता है जिसकी संपत्ति न्यूनतम सीमा (निसाब) से अधिक हो। "ज़कात" का अर्थ है "शुद्धिकरण" — यह आपकी संपत्ति और आत्मा को शुद्ध करता है।',
    },
    {
      title: "ज़कात कौन देता है?",
      content: `आपको ज़कात देनी होगी यदि आप एक मुसलमान हैं जो:
• निसाब सीमा से अधिक संपत्ति रखते हैं
• एक पूर्ण चंद्र वर्ष (हौल — लगभग 354 दिन) से वह संपत्ति रखते हैं
• समझदार हैं और बालिग़ हैं

बच्चे और मानसिक रोगी आमतौर पर इससे मुक्त हैं।`,
    },
    {
      title: "निसाब क्या है?",
      content: `निसाब (نصاب) वह न्यूनतम संपत्ति है जो आपके पास होनी चाहिए ज़कात अनिवार्य होने से पहले। दो मानक हैं:

🪙 सोने का मानक: 87.48 ग्राम सोना (≈ 7.5 तोला)
🥈 चाँदी का मानक: 612.36 ग्राम चाँदी (≈ 52.5 तोला)

अधिकांश विद्वान चाँदी का मानक सुझाते हैं क्योंकि यह कम सीमा निर्धारित करता है।`,
    },
    {
      title: "ज़कात की गणना कैसे होती है?",
      content: `मूल सूत्र सरल है:

1. अपनी सभी ज़कात योग्य संपत्ति जोड़ें (नकद, सोना, चाँदी, निवेश आदि)
2. पात्र कटौतियाँ घटाएं (कर्ज़, तत्काल देनदारियाँ)
3. निसाब सीमा से तुलना करें
4. यदि शुद्ध संपत्ति ≥ निसाब → 2.5% ज़कात दें

उदाहरण: यदि आपकी कुल संपत्ति 50,000 और कर्ज़ 5,000:
• शुद्ध ज़कात योग्य = 45,000
• ज़कात = 45,000 × 2.5% = 1,125`,
    },
    {
      title: "कौन सी संपत्ति पर ज़कात लागू होती है?",
      content: `इन प्रकार की संपत्ति पर ज़कात लागू होती है:

💰 नकद और बचत — बैंक खाते, जमा, हाथ में नकद
🪙 सोना — गहने, सिक्के, बार
🥈 चाँदी — सभी चाँदी की चीज़ें
📦 व्यापार सामग्री — बाज़ार मूल्य पर
📈 शेयर — वर्तमान बाज़ार मूल्य पर
📊 म्यूचुअल फंड — वर्तमान NAV पर
🏦 सेवानिवृत्ति / भविष्य निधि — केवल निकालने योग्य राशि
🏠 व्यापार के लिए संपत्ति — केवल बेचने के उद्देश्य से खरीदी गई

ज़कात लागू नहीं: व्यक्तिगत घर, वाहन, कपड़े, घरेलू सामान।`,
    },
    {
      title: "हनफ़ी बनाम शाफ़ई अंतर",
      content: `दो सबसे व्यापक रूप से अनुसरण की जाने वाली विचारधाराएँ:

हनफ़ी:
• सभी सोना ज़कात योग्य है, व्यक्तिगत गहनों सहित
• सेवानिवृत्ति / भविष्य निधि: सुलभ/प्राप्त राशि पर ज़कात

शाफ़ई:
• व्यक्तिगत उपयोग के सोने के गहने मुक्त हैं

संदेह होने पर अपने स्थानीय आलिम या इमाम से परामर्श करें।`,
    },
  ],
  ur: [
    {
      title: "زکات کیا ہے؟",
      content:
        'زکات (زكاة) اسلام کے پانچ ستونوں میں سے ایک ہے۔ یہ ایک لازمی صدقہ ہے جو ہر اس مسلمان کو دینا ہوتا ہے جس کی دولت نصاب سے زیادہ ہو۔ "زکات" کا مطلب ہے "پاکیزگی" — یہ آپ کی دولت اور روح کو پاک کرتی ہے۔',
    },
    {
      title: "زکات کس پر فرض ہے؟",
      content: `آپ کو زکات دینی ہوگی اگر آپ مسلمان ہیں اور:
• نصاب سے زیادہ دولت رکھتے ہیں
• ایک مکمل قمری سال (حول — تقریباً 354 دن) سے وہ دولت رکھتے ہیں
• عاقل اور بالغ ہیں

بچے اور ذہنی معذور عموماً مستثنیٰ ہیں۔`,
    },
    {
      title: "نصاب کیا ہے؟",
      content: `نصاب (نصاب) وہ کم سے کم دولت ہے جو آپ کے پاس ہونی چاہیے زکات فرض ہونے سے پہلے۔ دو معیار ہیں:

🪙 سونے کا معیار: 87.48 گرام سونا (≈ 7.5 تولہ)
🥈 چاندی کا معیار: 612.36 گرام چاندی (≈ 52.5 تولہ)

اکثر علماء چاندی کا معیار تجویز کرتے ہیں کیونکہ اس سے زیادہ لوگ زکات دیتے ہیں۔`,
    },
    {
      title: "زکات کا حساب کیسے ہوتا ہے؟",
      content: `بنیادی فارمولا سادہ ہے:

1. اپنے تمام زکات کے قابل اثاثے جمع کریں (نقد، سونا، چاندی، سرمایہ کاری وغیرہ)
2. قابل کٹوتی رقم گھٹائیں (قرض، فوری ذمہ داریاں)
3. نصاب سے موازنہ کریں
4. اگر خالص دولت ≥ نصاب → 2.5% زکات دیں

مثال: اگر آپ کے کل اثاثے 50,000 اور قرض 5,000:
• خالص زکات کے قابل = 45,000
• زکات = 45,000 × 2.5% = 1,125`,
    },
    {
      title: "کن اثاثوں پر زکات ہے؟",
      content: `ان اقسام کی دولت پر زکات ہے:

💰 نقد اور بچت — بینک اکاؤنٹ، ڈپازٹ، ہاتھ میں نقد
🪙 سونا — زیورات، سکے، بار
🥈 چاندی — تمام چاندی کی اشیاء
📦 تجارتی سامان — بازار قیمت پر
📈 حصص — موجودہ بازار قیمت پر
📊 میوچوئل فنڈز — موجودہ NAV پر
🏦 ریٹائرمنٹ فنڈ — صرف قابل واپسی رقم
🏠 تجارتی جائیداد — صرف فروخت کے لیے خریدی گئی

زکات نہیں: ذاتی گھر، گاڑی، کپڑے، گھریلو سامان۔`,
    },
    {
      title: "حنفی بمقابلہ شافعی فرق",
      content: `دو سب سے زیادہ مانے جانے والے مکاتب فکر:

حنفی:
• تمام سونا زکات کے قابل ہے، ذاتی زیورات سمیت
• ریٹائرمنٹ فنڈ: قابل رسائی/موصول رقم پر زکات

شافعی:
• ذاتی استعمال کے سونے کے زیورات مستثنیٰ ہیں

شک ہونے پر اپنے مقامی عالم یا امام سے مشورہ کریں۔`,
    },
  ],
  ar: [
    {
      title: "ما هي الزكاة؟",
      content:
        'الزكاة (زكاة) هي أحد أركان الإسلام الخمسة. وهي صدقة واجبة على كل مسلم تبلغ ثروته الحد الأدنى (النصاب). كلمة "زكاة" تعني "التطهير" — فهي تطهر مالك ونفسك.',
    },
    {
      title: "من يجب عليه دفع الزكاة؟",
      content: `يجب عليك دفع الزكاة إذا كنت مسلماً:
• تملك مالاً فوق حد النصاب
• مر عليه حول كامل (حوالي 354 يوماً)
• عاقل وبالغ

الأطفال وذوو الإعاقات الذهنية معفون عموماً.`,
    },
    {
      title: "ما هو النصاب؟",
      content: `النصاب هو الحد الأدنى من المال الذي يجب أن تملكه قبل أن تجب عليك الزكاة. هناك معياران:

🪙 معيار الذهب: 87.48 غرام ذهب (≈ 7.5 تولة)
🥈 معيار الفضة: 612.36 غرام فضة (≈ 52.5 تولة)

يوصي معظم العلماء بمعيار الفضة لأنه يحدد عتبة أقل مما يعني مساهمة المزيد من الناس.`,
    },
    {
      title: "كيف تُحسب الزكاة؟",
      content: `الصيغة الأساسية بسيطة:

1. اجمع جميع أصولك الخاضعة للزكاة (نقد، ذهب، فضة، استثمارات، إلخ)
2. اطرح الخصومات المؤهلة (ديون، التزامات فورية)
3. قارن مع حد النصاب
4. إذا كان صافي ثروتك ≥ النصاب → ادفع 2.5% زكاة

مثال: إذا كان لديك 50,000 في الأصول و5,000 في الديون:
• صافي المال الخاضع للزكاة = 45,000
• الزكاة المستحقة = 45,000 × 2.5% = 1,125`,
    },
    {
      title: "ما هي الأصول الخاضعة للزكاة؟",
      content: `الأنواع التالية من الثروة تخضع للزكاة:

💰 النقد والمدخرات — حسابات بنكية، ودائع، نقد في اليد
🪙 الذهب — مجوهرات، عملات، سبائك
🥈 الفضة — جميع أصناف الفضة
📦 المخزون التجاري — بسعر السوق
📈 الأسهم — بالقيمة السوقية الحالية
📊 صناديق الاستثمار — بقيمة NAV الحالية
🏦 صندوق التقاعد — المبلغ القابل للسحب فقط
🏠 العقارات التجارية — فقط المشتراة لإعادة البيع

غير خاضعة للزكاة: منزلك الشخصي، سيارتك، ملابسك، أغراض المنزل.`,
    },
    {
      title: "الفرق بين الحنفي والشافعي",
      content: `من أكثر المذاهب اتباعاً:

الحنفي:
• جميع الذهب خاضع للزكاة بما فيه المجوهرات الشخصية
• صندوق التقاعد: الزكاة على المبلغ القابل للوصول/المستلم

الشافعي:
• مجوهرات الذهب للاستخدام الشخصي معفاة

عند الشك، استشر عالمك أو إمامك المحلي.`,
    },
  ],
};

export default function HowToCalculateScreen() {
  const { t, language } = useTranslation();

  useSEO({
    title: "How to Calculate Zakat — Step-by-Step Guide | Zakat Calculator",
    description:
      "Learn how to calculate Zakat step by step. Understand Nisab, Hawl, Zakatable assets, Hanafi vs Shafi differences, and the 2.5% formula.",
  });

  const sections = sectionsByLang[language] || sectionsByLang.en;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft className="w-4 h-4" /> {t("howTo.backHome")}
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {t("howTo.title")}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {t("howTo.subtitle")}
      </p>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <article
            key={i}
            className="card animate-slide-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {section.content}
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/calculator"
          className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
        >
          {t("howTo.calculateNow")}
          <FiArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
