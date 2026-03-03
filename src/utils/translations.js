/**
 * Centralized Translations — 4-language support
 *
 * Languages: en (English), hi (Hindi), ur (Urdu), ar (Arabic)
 * RTL languages: ur, ar
 *
 * Usage:
 *   import { getTranslation } from '../utils/translations';
 *   const text = getTranslation('en', 'landing.title');
 *
 * Supports placeholder interpolation:
 *   getTranslation('en', 'wizard.stepOf', { current: 3, total: 13 })
 *   => "Step 3 of 13"
 */

export const LANGUAGE_OPTIONS = [
  { code: "en", label: "English", labelNative: "English", dir: "ltr" },
  { code: "hi", label: "Hindi", labelNative: "हिंदी", dir: "ltr" },
  { code: "ur", label: "Urdu", labelNative: "اردو", dir: "rtl" },
  { code: "ar", label: "Arabic", labelNative: "العربية", dir: "rtl" },
];

/**
 * Check if a language is RTL.
 */
export function isRTL(lang) {
  return lang === "ur" || lang === "ar";
}

/**
 * Get the next language in the cycle: en → hi → ur → ar → en
 */
export function getNextLanguage(current) {
  const order = ["en", "hi", "ur", "ar"];
  const idx = order.indexOf(current);
  return order[(idx + 1) % order.length];
}

/**
 * Get language display label (native).
 */
export function getLanguageLabel(code) {
  return (
    LANGUAGE_OPTIONS.find((l) => l.code === code)?.labelNative || "English"
  );
}

// ─── Translation Dictionary ──────────────────────────────────────────────────

const translations = {
  // ── Header ──────────────────────────────────
  "header.zakatCalc": {
    en: "Zakat Calc",
    hi: "ज़कात कैल्क",
    ur: "زکوٰۃ کیلک",
    ar: "حاسبة الزكاة",
  },

  // ── Landing Screen ──────────────────────────
  "landing.badge": {
    en: "Third Pillar of Islam",
    hi: "इस्लाम का तीसरा स्तंभ",
    ur: "اسلام کا تیسرا ستون",
    ar: "الركن الثالث من أركان الإسلام",
  },
  "landing.title": {
    en: "Zakat",
    hi: "ज़कात",
    ur: "زکوٰۃ",
    ar: "الزكاة",
  },
  "landing.titleCalc": {
    en: "Calculator",
    hi: "कैलकुलेटर",
    ur: "کیلکولیٹر",
    ar: "حاسبة",
  },
  "landing.tagline": {
    en: "Calculate your Zakat accurately — trusted by Muslims worldwide",
    hi: "अपनी ज़कात की सही गणना करें — दुनिया भर के मुसलमानों द्वारा विश्वसनीय",
    ur: "اپنی زکوٰۃ کا درست حساب لگائیں — دنیا بھر کے مسلمانوں کا بھروسہ",
    ar: "احسب زكاتك بدقة — موثوق به من المسلمين حول العالم",
  },
  "landing.zakatMeaning": {
    en: 'Zakat (زكاة) means "purification" — one of the Five Pillars of Islam. An obligatory annual charity of 2.5% on wealth above the Nisab threshold.',
    hi: 'ज़कात (زكاة) का अर्थ है "शुद्धिकरण"। यह इस्लाम के पाँच स्तंभों में से एक है — निसाब से ऊपर की संपत्ति पर 2.5% वार्षिक दान।',
    ur: 'زکوٰۃ (زكاة) کا مطلب ہے "پاکیزگی" — اسلام کے پانچ ارکان میں سے ایک۔ نصاب سے زیادہ دولت پر سالانہ 2.5% لازمی صدقہ۔',
    ar: 'الزكاة (زكاة) تعني "التطهير" — أحد أركان الإسلام الخمسة. صدقة سنوية واجبة بنسبة 2.5% على الثروة فوق نصاب الزكاة.',
  },
  "landing.startButton": {
    en: "Calculate Your Zakat",
    hi: "ज़कात की गणना करें",
    ur: "اپنی زکوٰۃ کا حساب لگائیں",
    ar: "احسب زكاتك",
  },
  "landing.howItWorks": {
    en: "How It Works",
    hi: "यह कैसे काम करता है",
    ur: "یہ کیسے کام کرتا ہے",
    ar: "كيف يعمل",
  },
  "landing.features": {
    en: "Features",
    hi: "विशेषताएँ",
    ur: "خصوصیات",
    ar: "المميزات",
  },
  "landing.learnAboutZakat": {
    en: "Learn About Zakat",
    hi: "ज़कात के बारे में जानें",
    ur: "زکوٰۃ کے بارے میں جانیں",
    ar: "تعرّف على الزكاة",
  },
  "landing.howToCalculate": {
    en: "How to Calculate Zakat",
    hi: "ज़कात की गणना कैसे करें",
    ur: "زکوٰۃ کا حساب کیسے لگائیں",
    ar: "كيف تحسب الزكاة",
  },
  "landing.stepByStep": {
    en: "Step-by-step guide",
    hi: "चरणबद्ध मार्गदर्शिका",
    ur: "مرحلہ وار رہنمائی",
    ar: "دليل خطوة بخطوة",
  },
  "landing.glossary": {
    en: "Islamic Terms Glossary",
    hi: "इस्लामी शब्दावली",
    ur: "اسلامی اصطلاحات",
    ar: "مسرد المصطلحات الإسلامية",
  },
  "landing.glossaryDesc": {
    en: "Understand the terms used in Zakat",
    hi: "ज़कात में इस्तेमाल होने वाले शब्दों के अर्थ",
    ur: "زکوٰۃ میں استعمال ہونے والی اصطلاحات سمجھیں",
    ar: "افهم المصطلحات المستخدمة في الزكاة",
  },
  "landing.disclaimer": {
    en: "This calculator is for reference only. Consult a scholar for religious rulings.",
    hi: "यह कैलकुलेटर केवल संदर्भ के लिए है। धार्मिक फ़तवों के लिए किसी आलिम से परामर्श करें।",
    ur: "یہ کیلکولیٹر صرف حوالے کے لیے ہے۔ مذہبی احکام کے لیے کسی عالم سے مشورہ کریں۔",
    ar: "هذه الحاسبة للاسترشاد فقط. استشر عالمًا للأحكام الشرعية.",
  },

  // ── Landing — Features ──────────────────────
  "feature.accurate.title": {
    en: "Islamically Accurate",
    hi: "इस्लामी रूप से सटीक",
    ur: "اسلامی طور پر درست",
    ar: "دقة إسلامية",
  },
  "feature.accurate.desc": {
    en: "Supports Hanafi & Shafi madhab with documented rulings",
    hi: "हनफी और शाफी मज़हब को दस्तावेज़ी फ़तवों के साथ सपोर्ट करता है",
    ur: "حنفی اور شافعی مذہب کی مستند احکام کے ساتھ معاونت",
    ar: "يدعم المذهب الحنفي والشافعي مع أحكام موثقة",
  },
  "feature.prices.title": {
    en: "Live Gold & Silver Prices",
    hi: "लाइव सोना और चाँदी की कीमतें",
    ur: "سونے اور چاندی کی تازہ قیمتیں",
    ar: "أسعار الذهب والفضة الحية",
  },
  "feature.prices.desc": {
    en: "Auto-fetches current prices for all supported currencies",
    hi: "सभी समर्थित मुद्राओं के लिए वर्तमान कीमतें स्वचालित रूप से प्राप्त करता है",
    ur: "تمام معاون کرنسیوں کے لیے موجودہ قیمتیں خودکار طور پر حاصل کرتا ہے",
    ar: "يجلب الأسعار الحالية تلقائيًا لجميع العملات المدعومة",
  },
  "feature.pdf.title": {
    en: "PDF Export",
    hi: "PDF डाउनलोड",
    ur: "PDF ڈاؤن لوڈ",
    ar: "تصدير PDF",
  },
  "feature.pdf.desc": {
    en: "Download your Zakat summary as a professional PDF",
    hi: "अपनी ज़कात का सारांश PDF के रूप में डाउनलोड करें",
    ur: "اپنی زکوٰۃ کا خلاصہ PDF کے طور پر ڈاؤن لوڈ کریں",
    ar: "حمّل ملخص زكاتك كملف PDF احترافي",
  },

  // ── Landing — Steps ─────────────────────────
  "step.1": {
    en: "Choose your madhab (school of thought) and Nisab standard",
    hi: "अपना मज़हब और निसाब मानक चुनें",
    ur: "اپنا مذہب (فقہی مکتبِ فکر) اور نصاب کا معیار چنیں",
    ar: "اختر مذهبك (المدرسة الفقهية) ومعيار النصاب",
  },
  "step.2": {
    en: "Enter your assets — cash, gold, silver, investments, etc.",
    hi: "अपनी संपत्ति दर्ज करें — नकद, सोना, चाँदी, निवेश आदि",
    ur: "اپنے اثاثے درج کریں — نقد، سونا، چاندی، سرمایہ کاری وغیرہ",
    ar: "أدخل أصولك — نقد، ذهب، فضة، استثمارات، إلخ",
  },
  "step.3": {
    en: "Enter any deductions — debts and liabilities",
    hi: "कटौतियाँ दर्ज करें — कर्ज़ और देनदारियाँ",
    ur: "کٹوتیاں درج کریں — قرض اور واجبات",
    ar: "أدخل أي خصومات — ديون والتزامات",
  },
  "step.4": {
    en: "Review your results and download PDF summary",
    hi: "अपने परिणाम देखें और PDF सारांश डाउनलोड करें",
    ur: "اپنے نتائج دیکھیں اور PDF خلاصہ ڈاؤن لوڈ کریں",
    ar: "راجع نتائجك وحمّل ملخص PDF",
  },

  // ── Settings Step ───────────────────────────
  "settings.title": {
    en: "Settings",
    hi: "सेटिंग्स",
    ur: "ترتیبات",
    ar: "الإعدادات",
  },
  "settings.subtitle": {
    en: "Choose your preferences — these can be changed later",
    hi: "अपनी प्राथमिकताएं चुनें — इन्हें बाद में बदला जा सकता है",
    ur: "اپنی ترجیحات منتخب کریں — یہ بعد میں تبدیل کی جا سکتی ہیں",
    ar: "اختر تفضيلاتك — يمكن تغييرها لاحقًا",
  },
  "settings.madhab": {
    en: "Madhab (School of Jurisprudence)",
    hi: "मज़हब (फ़िक़्ह)",
    ur: "مذہب (فقہی مکتبِ فکر)",
    ar: "المذهب (المدرسة الفقهية)",
  },
  "settings.hanafi": {
    en: "Hanafi",
    hi: "हनफ़ी",
    ur: "حنفی",
    ar: "حنفي",
  },
  "settings.shafi": {
    en: "Shafi'i",
    hi: "शाफ़ई",
    ur: "شافعی",
    ar: "شافعي",
  },
  "settings.hanafiDesc": {
    en: "Most common in South Asia",
    hi: "दक्षिण एशिया में सबसे आम",
    ur: "جنوبی ایشیا میں سب سے عام",
    ar: "الأكثر شيوعًا في جنوب آسيا",
  },
  "settings.shafiDesc": {
    en: "Common in Southeast Asia",
    hi: "दक्षिण पूर्व एशिया में आम",
    ur: "جنوب مشرقی ایشیا میں عام",
    ar: "شائع في جنوب شرق آسيا",
  },
  "settings.madhabInfo": {
    en: "A school of Islamic legal thought. The main difference for Zakat: Hanafi considers personal-use gold jewelry as Zakatable, while Shafi'i exempts it.",
    hi: "इस्लामी फ़िक़्ह की विचारधारा। ज़कात में मुख्य अंतर: हनफ़ी व्यक्तिगत सोने के गहनों को ज़कात योग्य मानते हैं, जबकि शाफ़ई इसे छूट देते हैं।",
    ur: "اسلامی فقہ کا مکتبِ فکر۔ زکوٰۃ میں اصل فرق: حنفی ذاتی استعمال کے سونے کے زیورات کو زکوٰۃ کے قابل سمجھتے ہیں، جبکہ شافعی اسے مستثنیٰ کرتے ہیں۔",
    ar: "مدرسة فقهية إسلامية. الفرق الرئيسي في الزكاة: الحنفي يعتبر حلي الذهب الشخصية خاضعة للزكاة، بينما الشافعي يعفيها.",
  },
  "settings.nisabStandard": {
    en: "Nisab Standard",
    hi: "निसाब मानक",
    ur: "نصاب کا معیار",
    ar: "معيار النصاب",
  },
  "settings.silver": {
    en: "Silver",
    hi: "चाँदी",
    ur: "چاندی",
    ar: "فضة",
  },
  "settings.gold": {
    en: "Gold",
    hi: "सोना",
    ur: "سونا",
    ar: "ذهب",
  },
  "settings.currency": {
    en: "Currency",
    hi: "मुद्रा",
    ur: "کرنسی",
    ar: "العملة",
  },

  // ── Asset Step ──────────────────────────────
  "asset.enterWeightByKarat": {
    en: "Enter Weight by Karat",
    hi: "वज़न दर्ज करें (कैरेट अनुसार)",
    ur: "قیراط کے مطابق وزن درج کریں",
    ar: "أدخل الوزن حسب القيراط",
  },
  "asset.karat": {
    en: "Karat",
    hi: "कैरेट",
    ur: "قیراط",
    ar: "قيراط",
  },
  "asset.grams": {
    en: "Grams",
    hi: "ग्राम",
    ur: "گرام",
    ar: "غرام",
  },
  "asset.tola": {
    en: "Tola",
    hi: "तोला",
    ur: "تولہ",
    ar: "تولة",
  },
  "asset.total": {
    en: "Total:",
    hi: "कुल मूल्य:",
    ur: "کل:",
    ar: "المجموع:",
  },
  "asset.verifyGold": {
    en: "For accurate results, verify the current 24K gold rate (e.g. goldprice.org). If it differs significantly, tap ✏️ to correct it.",
    hi: "सटीक परिणाम के लिए वर्तमान 24K सोने की क़ीमत जाँचें। अंतर ज़्यादा हो तो ✏️ से अपडेट करें।",
    ur: "درست نتائج کے لیے موجودہ 24K سونے کی قیمت جانچیں۔ فرق زیادہ ہو تو ✏️ سے درست کریں۔",
    ar: "للحصول على نتائج دقيقة، تحقق من سعر الذهب 24K الحالي. إذا كان الفرق كبيرًا، اضغط ✏️ لتصحيحه.",
  },
  "asset.verifySilver": {
    en: "For accurate results, verify the current silver rate. If it differs significantly, tap ✏️ to correct it.",
    hi: "सटीक परिणाम के लिए वर्तमान चांदी की क़ीमत जाँचें। अंतर ज़्यादा हो तो ✏️ से अपडेट करें।",
    ur: "درست نتائج کے لیے موجودہ چاندی کی قیمت جانچیں۔ فرق زیادہ ہو تو ✏️ سے درست کریں۔",
    ar: "للحصول على نتائج دقيقة، تحقق من سعر الفضة الحالي. إذا كان الفرق كبيرًا، اضغط ✏️ لتصحيحه.",
  },
  "asset.enterWeight": {
    en: "Enter Weight",
    hi: "वज़न दर्ज करें",
    ur: "وزن درج کریں",
    ar: "أدخل الوزن",
  },
  "asset.enterValue": {
    en: "Enter Value",
    hi: "मूल्य दर्ज करें",
    ur: "قیمت درج کریں",
    ar: "أدخل القيمة",
  },
  "asset.notApplicable": {
    en: "Enter 0 if not applicable",
    hi: "लागू नहीं होने पर 0 दर्ज करें",
    ur: "اگر لاگو نہیں تو 0 درج کریں",
    ar: "أدخل 0 إذا لم ينطبق",
  },

  // ── Asset Category Translations ─────────────
  "asset.cash.label": {
    en: "Cash & Bank Savings",
    hi: "नकद और बैंक बचत",
    ur: "نقد اور بینک بچت",
    ar: "النقد والمدخرات البنكية",
  },
  "asset.cash.description": {
    en: "Include cash in hand, savings accounts, fixed deposits, and current accounts.",
    hi: "हाथ में नकद, बचत खाते, सावधि जमा और चालू खाते शामिल करें।",
    ur: "ہاتھ میں نقد، بچت اکاؤنٹ، فکسڈ ڈپازٹ، اور کرنٹ اکاؤنٹ شامل کریں۔",
    ar: "يشمل النقد في اليد، حسابات التوفير، الودائع الثابتة، والحسابات الجارية.",
  },
  "asset.cash.notes": {
    en: "Include all liquid cash — at home, in wallet, savings/current accounts, and fixed deposits.",
    hi: "सभी तरल नकदी शामिल करें — घर पर, बटुए में, बचत/चालू खाते, और सावधि जमा।",
    ur: "تمام نقد رقم شامل کریں — گھر پر، بٹوے میں، بچت/کرنٹ اکاؤنٹ، اور فکسڈ ڈپازٹ۔",
    ar: "أدرج جميع النقد السائل — في المنزل، في المحفظة، حسابات التوفير/الجاري، والودائع الثابتة.",
  },
  "asset.cash.meaning": {
    en: "Wealth or property. In Zakat context, it refers to all forms of monetary wealth.",
    hi: "धन या संपत्ति। ज़कात के संदर्भ में, यह सभी प्रकार की मौद्रिक संपत्ति को संदर्भित करता है।",
    ur: "دولت یا جائیداد۔ زکوٰۃ کے تناظر میں، یہ تمام قسم کی مالی دولت کو کہتے ہیں۔",
    ar: "المال أو الملكية. في سياق الزكاة، يشير إلى جميع أشكال الثروة النقدية.",
  },
  "asset.gold.label": {
    en: "Gold",
    hi: "सोना",
    ur: "سونا",
    ar: "الذهب",
  },
  "asset.gold.description": {
    en: "Enter gold weight by karat (18K, 22K, 24K). Purity is applied automatically.",
    hi: "कैरेट (18K, 22K, 24K) के अनुसार सोने का वज़न दर्ज करें। शुद्धता स्वचालित रूप से लागू होती है।",
    ur: "قیراط (18K, 22K, 24K) کے مطابق سونے کا وزن درج کریں۔ خالصیت خودکار طور پر لاگو ہوتی ہے۔",
    ar: "أدخل وزن الذهب حسب القيراط (18K, 22K, 24K). يتم تطبيق النقاء تلقائيًا.",
  },
  "asset.gold.notes": {
    en: "Hanafi: ALL gold is Zakatable including personal jewelry. Shafi: Personal use jewelry is exempt.",
    hi: "हनफ़ी: सभी सोना ज़कात योग्य है, व्यक्तिगत गहनों सहित। शाफ़ई: व्यक्तिगत गहने छूट प्राप्त।",
    ur: "حنفی: تمام سونا زکوٰۃ کے قابل ہے، ذاتی زیورات سمیت۔ شافعی: ذاتی استعمال کے زیورات مستثنیٰ۔",
    ar: "الحنفي: جميع الذهب خاضع للزكاة بما فيه الحلي الشخصية. الشافعي: حلي الاستخدام الشخصي معفاة.",
  },
  "asset.gold.meaning": {
    en: "Gold. Zakat on gold has been obligatory since the time of the Prophet ﷺ.",
    hi: "सोना। सोने पर ज़कात नबी ﷺ के समय से अनिवार्य है।",
    ur: "سونا۔ سونے پر زکوٰۃ نبی ﷺ کے زمانے سے فرض ہے۔",
    ar: "الذهب. زكاة الذهب واجبة منذ عهد النبي ﷺ.",
  },
  "asset.silver.label": {
    en: "Silver",
    hi: "चाँदी",
    ur: "چاندی",
    ar: "الفضة",
  },
  "asset.silver.description": {
    en: "Silver jewelry, coins, utensils — enter value or weight in grams/tola.",
    hi: "चाँदी के गहने, सिक्के, बर्तन — ग्राम/तोला में मूल्य या वज़न दर्ज करें।",
    ur: "چاندی کے زیورات، سکے، برتن — گرام/تولہ میں قیمت یا وزن درج کریں۔",
    ar: "مجوهرات فضية، عملات، أواني — أدخل القيمة أو الوزن بالغرام/التولة.",
  },
  "asset.silver.notes": {
    en: "All silver items are Zakatable regardless of purpose (personal use or investment).",
    hi: "सभी चाँदी की वस्तुएँ ज़कात योग्य हैं, चाहे उपयोग कोई भी हो।",
    ur: "چاندی کی تمام اشیاء زکوٰۃ کے قابل ہیں، چاہے مقصد کوئی بھی ہو۔",
    ar: "جميع أصناف الفضة خاضعة للزكاة بغض النظر عن الغرض.",
  },
  "asset.silver.meaning": {
    en: "Silver. Along with gold, silver is one of the two metals on which Zakat was originally prescribed.",
    hi: "चाँदी। सोने के साथ, चाँदी उन दो धातुओं में से एक है जिन पर ज़कात मूल रूप से निर्धारित की गई थी।",
    ur: "چاندی۔ سونے کے ساتھ، چاندی ان دو دھاتوں میں سے ایک ہے جن پر زکوٰۃ اصل میں فرض ہوئی۔",
    ar: "الفضة. مع الذهب، الفضة هي أحد المعدنين اللذين فُرضت عليهما الزكاة أصلاً.",
  },
  "asset.businessInventory.label": {
    en: "Business Inventory",
    hi: "व्यापार का सामान",
    ur: "تجارتی سامان",
    ar: "المخزون التجاري",
  },
  "asset.businessInventory.description": {
    en: "Current market value of goods held for trade or resale.",
    hi: "व्यापार या पुनर्विक्रय के लिए रखे गए माल का वर्तमान बाज़ार मूल्य।",
    ur: "تجارت یا دوبارہ فروخت کے لیے رکھے گئے سامان کی موجودہ بازار قیمت۔",
    ar: "القيمة السوقية الحالية للبضائع المحتفظ بها للتجارة أو إعادة البيع.",
  },
  "asset.businessInventory.notes": {
    en: "Value inventory at current market price, not purchase cost.",
    hi: "सामान का मूल्य वर्तमान बाज़ार भाव पर लगाएं, खरीद मूल्य पर नहीं।",
    ur: "سامان کی قیمت موجودہ بازار قیمت پر لگائیں، خرید قیمت پر نہیں۔",
    ar: "قيّم المخزون بسعر السوق الحالي، وليس تكلفة الشراء.",
  },
  "asset.businessInventory.meaning": {
    en: "Trade goods/merchandise. Any items purchased with the intention of resale are Zakatable.",
    hi: "व्यापारिक माल। पुनर्विक्रय के उद्देश्य से खरीदी गई कोई भी वस्तु ज़कात योग्य है।",
    ur: "تجارتی سامان۔ دوبارہ فروخت کی نیت سے خریدی گئی کوئی بھی چیز زکوٰۃ کے قابل ہے۔",
    ar: "سلع تجارية. أي بضائع اشتُريت بنية إعادة البيع خاضعة للزكاة.",
  },
  "asset.receivables.label": {
    en: "Money Owed to You",
    hi: "आपको मिलने वाला पैसा",
    ur: "آپ کو واپس ملنے والی رقم",
    ar: "الأموال المستحقة لك",
  },
  "asset.receivables.description": {
    en: "Loans given, debts owed to you that are expected to be repaid.",
    hi: "दिए गए ऋण, आपको लौटाए जाने वाले कर्ज़।",
    ur: "دیے گئے قرض، آپ کو واپس ملنے والے قرض۔",
    ar: "قروض ممنوحة، ديون مستحقة لك يُتوقع سدادها.",
  },
  "asset.receivables.notes": {
    en: "Only include debts that you expect to be repaid. Write off bad debts.",
    hi: "केवल वही कर्ज़ शामिल करें जिनकी वापसी की उम्मीद हो। बुरे कर्ज़ हटा दें।",
    ur: "صرف وہ قرض شامل کریں جن کی واپسی متوقع ہو۔ ناقابل وصولی قرض نکال دیں۔",
    ar: "أدرج فقط الديون التي تتوقع سدادها. أزل الديون المعدومة.",
  },
  "asset.receivables.meaning": {
    en: "Debt. Money owed to you is considered part of your wealth for Zakat purposes.",
    hi: "कर्ज़। आपको मिलने वाला पैसा ज़कात के उद्देश्य से आपकी संपत्ति का हिस्सा माना जाता है।",
    ur: "قرض۔ آپ کو واپس ملنے والی رقم زکوٰۃ کے مقاصد کے لیے آپ کی دولت کا حصہ مانی جاتی ہے۔",
    ar: "الدَّيْن. الأموال المستحقة لك تُعتبر جزءًا من ثروتك لأغراض الزكاة.",
  },
  "asset.stocks.label": {
    en: "Stocks & Shares",
    hi: "शेयर",
    ur: "حصص اور شیئرز",
    ar: "الأسهم والحصص",
  },
  "asset.stocks.description": {
    en: "Current market value of stocks, ETFs, and listed shares.",
    hi: "शेयर, ETF और सूचीबद्ध शेयरों का वर्तमान बाज़ार मूल्य।",
    ur: "حصص، ETFs اور درج شدہ شیئرز کی موجودہ بازار قیمت۔",
    ar: "القيمة السوقية الحالية للأسهم وصناديق المؤشرات والحصص المدرجة.",
  },
  "asset.stocks.notes": {
    en: "Use current market value. For long-term holdings, some scholars allow Zakat on dividends only.",
    hi: "वर्तमान बाज़ार मूल्य का उपयोग करें। लंबी अवधि के लिए कुछ विद्वान केवल लाभांश पर ज़कात की अनुमति देते हैं।",
    ur: "موجودہ بازار قیمت استعمال کریں۔ طویل مدتی ہولڈنگز کے لیے کچھ علماء صرف منافع پر زکوٰۃ کی اجازت دیتے ہیں۔",
    ar: "استخدم القيمة السوقية الحالية. للحيازات طويلة الأجل، بعض العلماء يجيزون الزكاة على الأرباح فقط.",
  },
  "asset.stocks.meaning": {
    en: "Shares/stocks. Modern scholars agree that investments in stocks are a form of Zakatable wealth.",
    hi: "शेयर। आधुनिक विद्वान सहमत हैं कि शेयरों में निवेश ज़कात योग्य संपत्ति का एक रूप है।",
    ur: "حصص/شیئرز۔ جدید علماء متفق ہیں کہ حصص میں سرمایہ کاری زکوٰۃ کے قابل دولت کی ایک شکل ہے۔",
    ar: "الأسهم. يتفق العلماء المعاصرون على أن الاستثمار في الأسهم شكل من أشكال الثروة الخاضعة للزكاة.",
  },
  "asset.mutualFunds.label": {
    en: "Mutual Funds & SIPs",
    hi: "म्यूचुअल फंड और SIP",
    ur: "میوچوئل فنڈز اور SIPs",
    ar: "صناديق الاستثمار المشتركة",
  },
  "asset.mutualFunds.description": {
    en: "Current NAV (Net Asset Value) of all mutual fund investments.",
    hi: "सभी म्यूचुअल फंड निवेशों का वर्तमान NAV (शुद्ध संपत्ति मूल्य)।",
    ur: "تمام میوچوئل فنڈ سرمایہ کاری کی موجودہ NAV (خالص اثاثہ قیمت)۔",
    ar: "صافي قيمة الأصول الحالية (NAV) لجميع استثمارات الصناديق المشتركة.",
  },
  "asset.mutualFunds.notes": {
    en: "Use current NAV value. Include both equity and debt mutual funds.",
    hi: "वर्तमान NAV मूल्य का उपयोग करें। इक्विटी और डेट दोनों म्यूचुअल फंड शामिल करें।",
    ur: "موجودہ NAV قیمت استعمال کریں۔ ایکویٹی اور ڈیبٹ دونوں میوچوئل فنڈز شامل کریں۔",
    ar: "استخدم قيمة NAV الحالية. أدرج صناديق الأسهم والدين معًا.",
  },
  "asset.mutualFunds.meaning": {
    en: "Investment. Mutual funds are treated as a modern form of investment wealth (Maal Mustafad).",
    hi: "निवेश। म्यूचुअल फंड को निवेश संपत्ति (माल मुस्तफ़ाद) का आधुनिक रूप माना जाता है।",
    ur: "سرمایہ کاری۔ میوچوئل فنڈز کو سرمایہ کاری کی دولت (مال مستفاد) کی جدید شکل سمجھا جاتا ہے۔",
    ar: "الاستثمار. تُعامل صناديق الاستثمار كشكل حديث من الثروة الاستثمارية (المال المستفاد).",
  },
  "asset.providentFund.label": {
    en: "Retirement / Provident Fund",
    hi: "सेवानिवृत्ति / भविष्य निधि",
    ur: "ریٹائرمنٹ / پراویڈنٹ فنڈ",
    ar: "صندوق التقاعد / الادخار",
  },
  "asset.providentFund.description": {
    en: "Retirement or Provident Fund balance. Enter withdrawable amount.",
    hi: "सेवानिवृत्ति या भविष्य निधि शेष। निकालने योग्य राशि दर्ज करें।",
    ur: "ریٹائرمنٹ یا پراویڈنٹ فنڈ بیلنس۔ قابل واپسی رقم درج کریں۔",
    ar: "رصيد صندوق التقاعد أو الادخار. أدخل المبلغ القابل للسحب.",
  },
  "asset.providentFund.notes": {
    en: "Hanafi view: Zakat due on amount accessible/received. Include only the amount you can withdraw.",
    hi: "हनफ़ी दृष्टिकोण: सुलभ/प्राप्त राशि पर ज़कात देय। केवल वही राशि शामिल करें जो आप निकाल सकते हैं।",
    ur: "حنفی نقطہ نظر: قابل رسائی/موصول رقم پر زکوٰۃ واجب۔ صرف وہ رقم شامل کریں جو آپ نکال سکتے ہیں۔",
    ar: "الرأي الحنفي: الزكاة واجبة على المبلغ القابل للوصول/المستلم. أدرج فقط المبلغ الذي يمكنك سحبه.",
  },
  "asset.providentFund.meaning": {
    en: "Acquired/earned wealth. PF is a form of accumulated wealth that becomes Zakatable when accessible.",
    hi: "अर्जित धन। भविष्य निधि संचित धन का एक रूप है जो सुलभ होने पर ज़कात योग्य हो जाता है।",
    ur: "حاصل شدہ دولت۔ پراویڈنٹ فنڈ جمع شدہ دولت کی ایک شکل ہے جو قابل رسائی ہونے پر زکوٰۃ کے قابل ہو جاتی ہے۔",
    ar: "الثروة المكتسبة. صندوق الادخار شكل من الثروة المتراكمة التي تصبح خاضعة للزكاة عند إمكانية الوصول إليها.",
  },
  "asset.rentalProperty.label": {
    en: "Property for Trade",
    hi: "व्यापार के लिए संपत्ति",
    ur: "تجارت کے لیے جائیداد",
    ar: "عقارات تجارية",
  },
  "asset.rentalProperty.description": {
    en: "Properties held for resale/trade, NOT personal residence.",
    hi: "पुनर्विक्रय/व्यापार के लिए संपत्ति, व्यक्तिगत आवास नहीं।",
    ur: "دوبارہ فروخت/تجارت کے لیے جائیداد، ذاتی رہائش نہیں۔",
    ar: "عقارات محتفظ بها لإعادة البيع/التجارة، وليس السكن الشخصي.",
  },
  "asset.rentalProperty.notes": {
    en: "Personal residence is NOT Zakatable. Only properties bought with the intention to sell/trade.",
    hi: "व्यक्तिगत आवास पर ज़कात नहीं। केवल बेचने/व्यापार के उद्देश्य से खरीदी गई संपत्ति।",
    ur: "ذاتی رہائش پر زکوٰۃ نہیں۔ صرف فروخت/تجارت کی نیت سے خریدی گئی جائیداد۔",
    ar: "المسكن الشخصي غير خاضع للزكاة. فقط العقارات المشتراة بنية البيع/التجارة.",
  },
  "asset.rentalProperty.meaning": {
    en: "Real estate. Only property held for trading purposes is Zakatable — your home is exempt.",
    hi: "अचल संपत्ति। केवल व्यापार के उद्देश्य से रखी गई संपत्ति ज़कात योग्य है — आपका घर छूट प्राप्त है।",
    ur: "جائیداد۔ صرف تجارتی مقاصد کے لیے رکھی گئی جائیداد زکوٰۃ کے قابل ہے — آپ کا گھر مستثنیٰ ہے۔",
    ar: "العقارات. فقط العقار المحتفظ به للتجارة خاضع للزكاة — منزلك معفى.",
  },
  "asset.agriculturalProduce.label": {
    en: "Agricultural Produce",
    hi: "कृषि उपज",
    ur: "زرعی پیداوار",
    ar: "المنتجات الزراعية",
  },
  "asset.agriculturalProduce.description": {
    en: "Value of crops and agricultural produce at harvest time.",
    hi: "फसल के समय कृषि उपज का मूल्य।",
    ur: "فصل کے وقت زرعی پیداوار کی قیمت۔",
    ar: "قيمة المحاصيل والمنتجات الزراعية وقت الحصاد.",
  },
  "asset.agriculturalProduce.notes": {
    en: "Ushr: 10% if rain-fed, 5% if irrigated. No Hawl required — due at harvest.",
    hi: "उशर: बारिश से सिंचित होने पर 10%, कृत्रिम सिंचाई पर 5%। हौल आवश्यक नहीं — फसल के समय देय।",
    ur: "عشر: بارش سے سیراب ہو تو 10%، مصنوعی آبپاشی ہو تو 5%۔ حول ضروری نہیں — فصل کے وقت واجب۔",
    ar: "العُشر: 10% إذا سُقيت بالمطر، 5% إذا سُقيت بالري. لا يُشترط الحول — تجب عند الحصاد.",
  },
  "asset.agriculturalProduce.meaning": {
    en: "Tithe on agricultural produce. Literally means 'one-tenth'. It is due at harvest, not after a full year.",
    hi: "कृषि उपज पर दशमांश। इसका शाब्दिक अर्थ है 'दसवां भाग'। यह फसल के समय देय है, पूरे वर्ष के बाद नहीं।",
    ur: "زرعی پیداوار پر عشر۔ لغوی معنی 'دسواں حصہ'۔ یہ فصل کے وقت واجب ہے، پورے سال کے بعد نہیں۔",
    ar: "العُشر على المنتجات الزراعية. يعني حرفيًا 'العُشر'. يجب عند الحصاد، وليس بعد عام كامل.",
  },

  // ── PriceEditDialog / Asset UI ──────────────
  "asset.setPrice": {
    en: "Set {metal} Price",
    hi: "{metal} की कीमत सेट करें",
    ur: "{metal} کی قیمت سیٹ کریں",
    ar: "تعيين سعر {metal}",
  },
  "asset.pricePerGram": {
    en: "Price per gram",
    hi: "प्रति ग्राम कीमत",
    ur: "فی گرام قیمت",
    ar: "السعر لكل غرام",
  },
  "asset.savePrice": {
    en: "Save Price",
    hi: "कीमत सेव करें",
    ur: "قیمت محفوظ کریں",
    ar: "حفظ السعر",
  },
  "asset.resetPrice": {
    en: "Reset",
    hi: "रीसेट",
    ur: "ری سیٹ",
    ar: "إعادة تعيين",
  },
  "asset.currentPrice": {
    en: "Current:",
    hi: "वर्तमान:",
    ur: "موجودہ:",
    ar: "الحالي:",
  },
  "asset.manualOverride": {
    en: "Manual override",
    hi: "मैन्युअल ओवरराइड",
    ur: "دستی تبدیلی",
    ar: "تجاوز يدوي",
  },
  "asset.goldMetal": {
    en: "Gold (24K)",
    hi: "सोना (24K)",
    ur: "سونا (24K)",
    ar: "ذهب (24K)",
  },
  "asset.silverMetal": {
    en: "Silver",
    hi: "चाँदी",
    ur: "چاندی",
    ar: "فضة",
  },

  // ── Deductions Step ─────────────────────────
  "deductions.daynTitle": {
    en: "Dayn (دين) — Debt",
    hi: "दैन (دين) — कर्ज़",
    ur: "دَین (دين) — قرض",
    ar: "الدَّيْن — الدين",
  },
  "deductions.title": {
    en: "Deductions",
    hi: "कटौतियाँ",
    ur: "کٹوتیاں",
    ar: "الخصومات",
  },
  "deductions.subtitle": {
    en: "Enter your debts and liabilities — these are subtracted from your Zakatable wealth",
    hi: "अपने कर्ज़ और देनदारियाँ दर्ज करें — ये आपकी ज़कात योग्य संपत्ति से घटाई जाएँगी",
    ur: "اپنے قرض اور واجبات درج کریں — یہ آپ کی زکوٰۃ کے قابل دولت سے منہا ہوں گے",
    ar: "أدخل ديونك والتزاماتك — ستُخصم من ثروتك الخاضعة للزكاة",
  },
  "deductions.islamicContext": {
    en: "In Islam, debts are deducted before calculating Zakat. Include only debts that are immediately due or payable this year.",
    hi: "इस्लाम में, कर्ज़ आपकी ज़कात योग्य संपत्ति से पहले काटा जाता है। केवल वही कर्ज़ शामिल करें जो तुरंत देय हैं या इस साल चुकाने हैं।",
    ur: "اسلام میں، زکوٰۃ کا حساب لگانے سے پہلے قرض منہا کیے جاتے ہیں۔ صرف وہ قرض شامل کریں جو فوری طور پر واجب ہیں۔",
    ar: "في الإسلام، تُخصم الديون قبل حساب الزكاة. أدرج فقط الديون المستحقة فورًا أو القابلة للسداد هذا العام.",
  },
  "deductions.debts": {
    en: "Debts (money you owe others)",
    hi: "कर्ज़ (जो आप पर बकाया हैं)",
    ur: "قرض (جو آپ پر واجب ہے)",
    ar: "الديون (المال الذي تدينه للآخرين)",
  },
  "deductions.debtsHint": {
    en: "Personal loans, credit card balances, installments",
    hi: "व्यक्तिगत ऋण, क्रेडिट कार्ड बकाया, किस्तें",
    ur: "ذاتی قرض، کریڈٹ کارڈ بقایا، قسطیں",
    ar: "قروض شخصية، أرصدة بطاقات ائتمان، أقساط",
  },
  "deductions.liabilities": {
    en: "Immediate Liabilities",
    hi: "तत्काल देनदारियाँ",
    ur: "فوری واجبات",
    ar: "الالتزامات الفورية",
  },
  "deductions.liabilitiesHint": {
    en: "Immediate bills, rent due, wages payable",
    hi: "तत्काल बिल, किराया, वेतन देय",
    ur: "فوری بل، کرایہ، واجب الادا اجرت",
    ar: "فواتير فورية، إيجار مستحق، أجور مستحقة",
  },

  // ── Wizard / Navigation ─────────────────────
  "wizard.stepOf": {
    en: "Step {current} of {total}",
    hi: "चरण {current} / {total}",
    ur: "مرحلہ {current} از {total}",
    ar: "الخطوة {current} من {total}",
  },
  "wizard.home": {
    en: "Home",
    hi: "होम",
    ur: "ہوم",
    ar: "الرئيسية",
  },
  "wizard.back": {
    en: "Back",
    hi: "वापस",
    ur: "واپس",
    ar: "رجوع",
  },
  "wizard.skip": {
    en: "Skip",
    hi: "छोड़ें",
    ur: "چھوڑیں",
    ar: "تخطي",
  },
  "wizard.next": {
    en: "Next",
    hi: "आगे",
    ur: "اگلا",
    ar: "التالي",
  },
  "wizard.calculate": {
    en: "Calculate",
    hi: "गणना",
    ur: "حساب لگائیں",
    ar: "احسب",
  },
  "wizard.settings": {
    en: "Settings",
    hi: "सेटिंग्स",
    ur: "ترتیبات",
    ar: "الإعدادات",
  },
  "wizard.deductions": {
    en: "Deductions",
    hi: "कटौतियाँ",
    ur: "کٹوتیاں",
    ar: "الخصومات",
  },
  "wizard.review": {
    en: "Review",
    hi: "समीक्षा",
    ur: "جائزہ",
    ar: "مراجعة",
  },

  // ── Review Step ─────────────────────────────
  "review.title": {
    en: "Review Your Details",
    hi: "समीक्षा",
    ur: "اپنی تفصیلات کا جائزہ لیں",
    ar: "راجع تفاصيلك",
  },
  "review.subtitle": {
    en: "Check your information before calculating",
    hi: "गणना से पहले अपनी जानकारी की जाँच करें",
    ur: "حساب لگانے سے پہلے اپنی معلومات جانچیں",
    ar: "تحقق من معلوماتك قبل الحساب",
  },
  "review.settings": {
    en: "Settings",
    hi: "सेटिंग्स",
    ur: "ترتیبات",
    ar: "الإعدادات",
  },
  "review.assets": {
    en: "Assets",
    hi: "संपत्ति",
    ur: "اثاثے",
    ar: "الأصول",
  },
  "review.noAssets": {
    en: "No assets entered",
    hi: "कोई संपत्ति दर्ज नहीं",
    ur: "کوئی اثاثہ درج نہیں",
    ar: "لم يتم إدخال أصول",
  },
  "review.totalAssets": {
    en: "Total Assets",
    hi: "कुल संपत्ति",
    ur: "کل اثاثے",
    ar: "إجمالي الأصول",
  },
  "review.deductions": {
    en: "Deductions",
    hi: "कटौतियाँ",
    ur: "کٹوتیاں",
    ar: "الخصومات",
  },
  "review.debts": {
    en: "Debts",
    hi: "कर्ज़",
    ur: "قرض",
    ar: "الديون",
  },
  "review.liabilitiesLabel": {
    en: "Liabilities",
    hi: "देनदारियाँ",
    ur: "واجبات",
    ar: "الالتزامات",
  },
  "review.netZakatable": {
    en: "Net Zakatable Wealth",
    hi: "शुद्ध ज़कात योग्य संपत्ति",
    ur: "خالص زکوٰۃ کے قابل دولت",
    ar: "صافي الثروة الخاضعة للزكاة",
  },
  "review.aboveNisab": {
    en: "✅ Above Nisab — Zakat is due",
    hi: "✅ निसाब से ऊपर — ज़कात देय है",
    ur: "✅ نصاب سے اوپر — زکوٰۃ واجب ہے",
    ar: "✅ فوق النصاب — الزكاة واجبة",
  },
  "review.belowNisab": {
    en: "❌ Below Nisab — Zakat is not due",
    hi: "❌ निसाब से नीचे — ज़कात देय नहीं",
    ur: "❌ نصاب سے نیچے — زکوٰۃ واجب نہیں",
    ar: "❌ دون النصاب — الزكاة غير واجبة",
  },
  "review.pressCalculate": {
    en: 'Press "Calculate" to see your detailed results',
    hi: '"कैलकुलेट" दबाएं अपना विस्तृत परिणाम देखने के लिए',
    ur: 'تفصیلی نتائج دیکھنے کے لیے "حساب لگائیں" دبائیں',
    ar: 'اضغط "احسب" لعرض نتائجك التفصيلية',
  },

  // ── Results Screen ──────────────────────────
  "results.zakatDue": {
    en: "Zakat is Due",
    hi: "ज़कात देय है",
    ur: "زکوٰۃ واجب ہے",
    ar: "الزكاة واجبة",
  },
  "results.yourZakatDue": {
    en: "Your Zakat Due",
    hi: "आपकी ज़कात राशि",
    ur: "آپ کی واجب زکوٰۃ",
    ar: "زكاتك المستحقة",
  },
  "results.percentOfWealth": {
    en: "2.5% of net Zakatable wealth",
    hi: "शुद्ध ज़कात योग्य संपत्ति का 2.5%",
    ur: "خالص زکوٰۃ کے قابل دولت کا 2.5%",
    ar: "2.5% من صافي الثروة الخاضعة للزكاة",
  },
  "results.notDue": {
    en: "Zakat Not Due",
    hi: "ज़कात देय नहीं",
    ur: "زکوٰۃ واجب نہیں",
    ar: "الزكاة غير واجبة",
  },
  "results.notDueThisYear": {
    en: "Zakat is not due this year",
    hi: "इस वर्ष ज़कात देय नहीं है",
    ur: "اس سال زکوٰۃ واجب نہیں ہے",
    ar: "الزكاة غير واجبة هذا العام",
  },
  "results.noCalculation": {
    en: "No calculation available",
    hi: "कोई गणना उपलब्ध नहीं",
    ur: "کوئی حساب دستیاب نہیں",
    ar: "لا توجد حسابات متاحة",
  },
  "results.calculateZakat": {
    en: "Calculate Zakat",
    hi: "ज़कात की गणना करें",
    ur: "زکوٰۃ کا حساب لگائیں",
    ar: "احسب الزكاة",
  },
  "results.nisabComparison": {
    en: "Nisab Comparison",
    hi: "निसाब तुलना",
    ur: "نصاب کا موازنہ",
    ar: "مقارنة النصاب",
  },
  "results.yourNetWealth": {
    en: "Your Net Wealth",
    hi: "आपकी शुद्ध संपत्ति",
    ur: "آپ کی خالص دولت",
    ar: "صافي ثروتك",
  },
  "results.assetBreakdown": {
    en: "Asset Breakdown",
    hi: "संपत्ति विवरण",
    ur: "اثاثوں کی تفصیل",
    ar: "تفصيل الأصول",
  },
  "results.totalAssets": {
    en: "Total Assets",
    hi: "कुल संपत्ति",
    ur: "کل اثاثے",
    ar: "إجمالي الأصول",
  },
  "results.totalDeductions": {
    en: "Total Deductions",
    hi: "कुल कटौतियाँ",
    ur: "کل کٹوتیاں",
    ar: "إجمالي الخصومات",
  },
  "results.netZakatable": {
    en: "Net Zakatable",
    hi: "शुद्ध ज़कात योग्य",
    ur: "خالص زکوٰۃ کے قابل",
    ar: "صافي الخاضع للزكاة",
  },
  "results.calculationDetails": {
    en: "Calculation Details",
    hi: "गणना विवरण",
    ur: "حساب کی تفصیلات",
    ar: "تفاصيل الحساب",
  },
  "results.share": {
    en: "Share",
    hi: "शेयर",
    ur: "شیئر",
    ar: "مشاركة",
  },
  "results.redo": {
    en: "Redo",
    hi: "फिर से",
    ur: "دوبارہ",
    ar: "إعادة",
  },
  "results.copiedToClipboard": {
    en: "Copied to clipboard!",
    hi: "क्लिपबोर्ड पर कॉपी हो गया",
    ur: "کلپ بورڈ پر کاپی ہو گیا",
    ar: "تم النسخ إلى الحافظة!",
  },
  "results.supportCommunity": {
    en: "Support Our Community",
    hi: "हमारी कम्युनिटी को सपोर्ट करें",
    ur: "ہماری کمیونٹی کی مدد کریں",
    ar: "ادعم مجتمعنا",
  },
  "results.supportDesc": {
    en: "This Zakat Calculator is not funded by any organization — it is built and maintained entirely by our community. Your small contribution keeps this service alive, so that Muslims worldwide can calculate their Zakat for free. JazakAllahu Khairan.",
    hi: "यह ज़कात कैलकुलेटर किसी संगठन द्वारा फंड नहीं किया जाता — यह पूरी तरह से हमारी कम्युनिटी के भाइयों और बहनों के सहयोग से चलता है। आपका छोटा सा योगदान इस सेवा को ज़िंदा रखता है। जज़ाकल्लाहु खैरन।",
    ur: "یہ زکوٰۃ کیلکولیٹر کسی تنظیم کی مالی معاونت سے نہیں چلتا — یہ مکمل طور پر ہماری کمیونٹی سے چلتا ہے۔ آپ کا چھوٹا سا تعاون اس خدمت کو زندہ رکھتا ہے۔ جزاک اللہ خیراً۔",
    ar: "حاسبة الزكاة هذه لا تموّلها أي مؤسسة — بل يبنيها ويصونها مجتمعنا بالكامل. مساهمتك الصغيرة تُبقي هذه الخدمة حية. جزاكم الله خيرًا.",
  },
  "results.scanToPay": {
    en: "Scan to pay directly via UPI",
    hi: "स्कैन करके सीधे भुगतान करें",
    ur: "UPI کے ذریعے براہ راست ادائیگی کے لیے اسکین کریں",
    ar: "امسح للدفع مباشرة عبر UPI",
  },
  "results.bankDetails": {
    en: "ICICI Bank · A/C: 004601065667 · IFSC: ICIC0000046",
    hi: "ICICI Bank · A/C: 004601065667 · IFSC: ICIC0000046",
    ur: "ICICI Bank · A/C: 004601065667 · IFSC: ICIC0000046",
    ar: "ICICI Bank · A/C: 004601065667 · IFSC: ICIC0000046",
  },
  "results.voluntaryCharity": {
    en: "Voluntary Charity (Sadaqah)",
    hi: "स्वैच्छिक दान (सदक़ा)",
    ur: "رضاکارانہ صدقہ (صدقہ)",
    ar: "الصدقة التطوعية",
  },
  "results.charityDesc": {
    en: "Your Zakat or Sadaqah can transform lives. Here are some trusted Zakat organizations:",
    hi: "आपकी ज़कात या सदक़ा कई ज़रूरतमंदों की ज़िंदगी बदल सकती है। यहाँ कुछ विश्वसनीय ज़कात संगठन हैं:",
    ur: "آپ کی زکوٰۃ یا صدقہ زندگیاں بدل سکتا ہے۔ یہاں کچھ بھروسہ مند زکوٰۃ تنظیمیں ہیں:",
    ar: "يمكن لزكاتك أو صدقتك أن تغيّر حياة الآخرين. إليك بعض منظمات الزكاة الموثوقة:",
  },

  // ── Sticky Footer ───────────────────────────
  "footer.runningTotal": {
    en: "Running Total:",
    hi: "कुल जोड़:",
    ur: "کل رقم:",
    ar: "المجموع الجاري:",
  },

  // ── Glossary Screen ─────────────────────────
  "glossary.title": {
    en: "Islamic Terms Glossary",
    hi: "इस्लामी शब्दावली",
    ur: "اسلامی اصطلاحات",
    ar: "مسرد المصطلحات الإسلامية",
  },
  "glossary.subtitle": {
    en: "Meanings and explanations of Islamic terms used in Zakat calculation",
    hi: "ज़कात गणना में प्रयुक्त इस्लामी शब्दों के अर्थ और व्याख्या",
    ur: "زکوٰۃ کے حساب میں استعمال ہونے والی اسلامی اصطلاحات کے معانی اور وضاحت",
    ar: "معاني وشروحات المصطلحات الإسلامية المستخدمة في حساب الزكاة",
  },
  "glossary.backHome": {
    en: "Back to Home",
    hi: "होम पेज",
    ur: "ہوم پیج",
    ar: "العودة للرئيسية",
  },
  "glossary.coreTerms": {
    en: "Core Terms",
    hi: "मूल शब्द",
    ur: "بنیادی اصطلاحات",
    ar: "المصطلحات الأساسية",
  },
  "glossary.schoolsOfThought": {
    en: "Schools of Thought",
    hi: "मज़ाहिब (विचारधाराएं)",
    ur: "مذاہب (مکاتبِ فکر)",
    ar: "المذاهب الفقهية",
  },
  "glossary.relatedTerms": {
    en: "Related Terms",
    hi: "संबंधित शब्द",
    ur: "متعلقہ اصطلاحات",
    ar: "مصطلحات ذات صلة",
  },
  "glossary.assetTerms": {
    en: "Asset Category Terms",
    hi: "संपत्ति वर्ग शब्द",
    ur: "اثاثوں کی زمرہ بندی کی اصطلاحات",
    ar: "مصطلحات فئات الأصول",
  },

  // ── How to Calculate Screen ─────────────────
  "howTo.backHome": {
    en: "Back to Home",
    hi: "होम पेज",
    ur: "ہوم پیج",
    ar: "العودة للرئيسية",
  },
  "howTo.title": {
    en: "How to Calculate Zakat",
    hi: "ज़कात की गणना कैसे करें",
    ur: "زکوٰۃ کا حساب کیسے لگائیں",
    ar: "كيف تحسب الزكاة",
  },
  "howTo.subtitle": {
    en: "A complete step-by-step guide to understanding and calculating your Zakat",
    hi: "एक संपूर्ण चरणबद्ध मार्गदर्शिका",
    ur: "اپنی زکوٰۃ سمجھنے اور حساب لگانے کے لیے مکمل مرحلہ وار رہنمائی",
    ar: "دليل شامل خطوة بخطوة لفهم وحساب زكاتك",
  },
  "howTo.calculateNow": {
    en: "Calculate Now",
    hi: "अभी गणना करें",
    ur: "ابھی حساب لگائیں",
    ar: "احسب الآن",
  },
};

// ─── Translation Getter ──────────────────────────────────────────────────────

/**
 * Get a translated string.
 *
 * @param {string} lang  - Language code (en, hi, ur, ar)
 * @param {string} key   - Translation key (e.g. 'landing.title')
 * @param {Object} params - Optional placeholder replacements (e.g. { current: 3, total: 13 })
 * @returns {string}
 */
export function getTranslation(lang, key, params = {}) {
  const entry = translations[key];
  if (!entry) return key; // fallback to key itself

  let text = entry[lang] || entry["en"] || key;

  // Replace {placeholder} tokens
  Object.entries(params).forEach(([k, v]) => {
    text = text.replace(new RegExp(`\\{${k}\\}`, "g"), v);
  });

  return text;
}
