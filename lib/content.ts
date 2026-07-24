export type Locale = "ar" | "en";

/* ---------------------------------------------------------------------------
 * All site copy lives here. `ar` is written in Egyptian colloquial (مصري عامي),
 * `en` mirrors it in casual English. The `ar` object defines the shape that
 * `en` must satisfy, so a missing key is a type error.
 * ------------------------------------------------------------------------- */

const ar = {
  dir: "rtl",
  langLabel: "EN",
  langAria: "التبديل إلى الإنجليزية",
  themeAria: "تبديل الوضع الليلي",
  menuAria: "القائمة",

  nav: [
    { label: "شغلنا", href: "#work" },
    { label: "خطوات الشغل", href: "#process" },
    { label: "الأسعار", href: "#pricing" },
    { label: "آراء العملاء", href: "#testimonials" },
    { label: "الأسئلة", href: "#faq" },
  ],
  navCta: "ابدأ مشروعك",

  hero: {
    eyebrow: "شركة تصميم وتطوير مواقع",
    titleA: "بنعملك موقع",
    titleHighlight: "يليق باسمك",
    titleB: "ويجيبلك عملاء",
    subtitle: "موقعك أونلاين في 48 ساعة",
    ctaPrimary: "ابدأ مشروعك دلوقتي",
    ctaSecondary: "شوف شغلنا",
    trust: "أكتر من 100 عميل مبسوط بالخدمة",
  },

  stats: [
    { value: "+100", label: "مشروع خلصناه" },
    { value: "48h", label: "مدة التسليم" },
    { value: "4.9/5", label: "تقييم العملاء" },
    { value: "0", label: "رسوم شهرية" },
  ],

  services: [
    "تصميم واجهات",
    "تطوير ويب",
    "متاجر إلكترونية",
    "هوية بصرية",
    "تحسين محركات البحث",
    "لوحات تحكم",
    "تطبيقات ويب",
    "استضافة ودعم",
  ],

  work: {
    eyebrow: "من شغلنا",
    title: "شغلنا بيتكلم عننا",
    sub: "نماذج من مشاريع عملناها لعملائنا في مجالات مختلفة.",
    filters: [
      { key: "all", label: "الكل" },
      { key: "store", label: "متاجر إلكترونية" },
      { key: "corp", label: "مواقع شركات" },
      { key: "landing", label: "صفحات هبوط" },
      { key: "dash", label: "لوحات تحكم" },
    ],
    projects: [
      {
        key: "luluah",
        title: "متجر لُؤلؤة",
        url: "luluah.store",
        category: "store",
        tag: "متجر إلكتروني",
      },
      {
        key: "nimbus",
        title: "نيمبوس للتقنية",
        url: "nimbus.tech",
        category: "corp",
        tag: "موقع شركة",
      },
      {
        key: "atlq",
        title: "حملة أطلق",
        url: "atlq.co",
        category: "landing",
        tag: "صفحة هبوط",
      },
      {
        key: "rawaj",
        title: "لوحة رواج",
        url: "rawaj.app",
        category: "dash",
        tag: "لوحة تحكم",
      },
      {
        key: "itrk",
        title: "متجر عطرك",
        url: "3itrk.com",
        category: "store",
        tag: "متجر إلكتروني",
      },
      {
        key: "thawq",
        title: "مطاعم ذوق",
        url: "thawq.sa",
        category: "corp",
        tag: "موقع شركة",
      },
    ],
  },

  process: {
    eyebrow: "بنشتغل إزاي",
    titleA: "بسيط",
    titleHighlight: "وسريع",
    sub: "٣ خطوات بس وموقعك يبقى جاهز.",
    steps: [
      {
        n: "01",
        title: "كلمنا على واتساب",
        body: "بنسمع فكرتك ونفهم هدفك، وبعدين نحطلك خطة واضحة على مقاس شغلك وميزانيتك.",
      },
      {
        n: "02",
        title: "نبدأ تصميم وتطوير",
        body: "الفريق يبدأ يصمم ويبني موقعك بأحدث التقنيات وبأعلى جودة وأداء.",
      },
      {
        n: "03",
        title: "موقعك أونلاين في 48 ساعة",
        body: "موقعك بيكون جاهز أونلاين وتقدر من خلاله تجيب عملاء من أول يوم.",
      },
    ],
  },

  pricing: {
    eyebrow: "باقاتنا",
    title: "اختار الباقة اللي تناسبك",
    sub: "أسعار واضحة من غير رسوم مخفية. كل الباقات فيها تصميم متجاوب وتحسين لمحركات البحث.",
    badge: "الأكثر طلباً",
    currency: "جنيه",
    guarantee:
      "مش عاجبك الشغل؟ — بنراجع لحد ما يعجبك · دفع بعد المعاينة · تسليم مضمون في 48 ساعة",
    plans: [
      {
        name: "الباقة الأساسية",
        price: "4,999",
        featured: false,
        features: [
          "صفحة واحدة احترافية",
          "ربط مباشر بواتساب",
          "متوافق مع الموبايل 100%",
          "جاهز في 48 ساعة",
        ],
        cta: "ابدأ دلوقتي",
      },
      {
        name: "الباقة البيزنس",
        price: "9,999",
        featured: true,
        features: [
          "صفحات متعددة (حتى 5)",
          "دومين مخصص لسنة كاملة",
          "SEO وظهور في جوجل",
          "جوجل مابس + نموذج تواصل",
        ],
        cta: "اطلب الباقة",
      },
      {
        name: "باقة المتاجر",
        price: "14,999",
        featured: false,
        features: [
          "متجر إلكتروني كامل",
          "سلة تسوق + دفع أونلاين",
          "دومين + استضافة سنة كاملة",
          "SEO كامل + تقارير",
        ],
        cta: "ابدأ دلوقتي",
      },
    ],
  },

  testimonials: {
    eyebrow: "آراء العملاء",
    title: "ناس وثقت فينا",
    sub: "آراء حقيقية من عملاء اشتغلنا معاهم.",
    prev: "السابق",
    next: "التالي",
    items: [
      {
        name: "محمد أيمن",
        role: "صاحب متجر أونلاين",
        initial: "م",
        body: "الشغل طلع أحسن ما كنت متخيل، والمتجر خلص في يومين بالظبط زي ما اتفقنا. ناس محترمة وبتفهم في شغلها.",
      },
      {
        name: "سارة خالد",
        role: "مديرة تسويق",
        initial: "س",
        body: "التصميم شيك وبسيط، وردهم على ملاحظاتي كان سريع من غير أي لف ودوران. بنصح بيهم بجد.",
      },
      {
        name: "أحمد الحمدي",
        role: "صاحب شركة ناشئة",
        initial: "أ",
        body: "الفريق فاهم في التسويق مش بس التصميم، والنتيجة موقع سريع وحلو زوّد مبيعاتنا فعلاً.",
      },
      {
        name: "منى عبد الرحمن",
        role: "صاحبة براند ملابس",
        initial: "م",
        body: "أنا مش فاهمة حاجة في التقنية خالص، وهما ظبطولي كل حاجة وشرحولي إزاي أتحكم في الموقع بنفسي.",
      },
      {
        name: "كريم فؤاد",
        role: "صاحب مطعم",
        initial: "ك",
        body: "الموقع بقى بيجيبلي أوردرات من جوجل، ودي حاجة معملتهاش قبل كده. فلوس في محلها.",
      },
      {
        name: "نورهان سمير",
        role: "مصممة جرافيك",
        initial: "ن",
        body: "تعاملت مع ناس كتير قبل كده، بس دول أول مرة حد يسلمني في الميعاد بالظبط من غير أعذار.",
      },
      {
        name: "مصطفى الجندي",
        role: "تاجر جملة",
        initial: "م",
        body: "سعرهم كويس جداً بالنسبة للشغل اللي بيطلع. والدعم بعد التسليم شغال فعلاً مش كلام.",
      },
      {
        name: "هبة ياسر",
        role: "صاحبة سنتر تعليمي",
        initial: "ه",
        body: "عملولي صفحة هبوط للحملة وجابت نتيجة من أول أسبوع. الحمد لله.",
      },
      {
        name: "عمرو شعبان",
        role: "صاحب معرض سيارات",
        initial: "ع",
        body: "التواصل معاهم سهل على الواتس وبيردوا بسرعة. حسيت إني بتعامل مع ناس بتهتم بشغلها.",
      },
      {
        name: "دينا مجدي",
        role: "صيدلانية",
        initial: "د",
        body: "طلبت تعديلات كتير وهما عدّلوا من غير ما يزعلوا أو يطلبوا زيادة. ده اللي خلاني أرشحهم لأصحابي.",
      },
      {
        name: "طارق عبد الله",
        role: "مقاول",
        initial: "ط",
        body: "موقع الشركة بقى شكله محترم قدام العملاء، وده فرق معايا في الصفقات الكبيرة.",
      },
      {
        name: "ريهام فتحي",
        role: "صاحبة محل ورد",
        initial: "ر",
        body: "المتجر شغال حلو والدفع أونلاين ظبط من أول مرة. مبسوطة جداً بصراحة.",
      },
      {
        name: "يوسف الشناوي",
        role: "مدرب أونلاين",
        initial: "ي",
        body: "ظبطولي نظام حجز للحصص، ووفّر عليا وقت كتير كنت بضيعه في الرسايل.",
      },
      {
        name: "آية منصور",
        role: "صاحبة بيزنس هاند ميد",
        initial: "آ",
        body: "بدأت بباقة بسيطة وكبرت معاهم بعدين. ناس بتمشي معاك خطوة بخطوة.",
      },
    ],
  },

  faq: {
    eyebrow: "الأسئلة الشائعة",
    title: "جاوبنا على سؤالك",
    items: [
      {
        q: "بتاخدوا وقت قد إيه عشان تخلصوا الموقع؟",
        a: "معظم المشاريع بنسلمها خلال 48 ساعة، ولو المشروع كبير أو فيه متطلبات خاصة بنبلغك بالمدة المتوقعة قبل ما نبدأ.",
      },
      {
        q: "إيه اللي محتاج أعمله قبل ما نبدأ نشتغل؟",
        a: "اسم مشروعك بس ونوع نشاطك ورقم تواصل، وسيب الباقي علينا.",
      },
      {
        q: "ممكن أعدّل على الموقع بعد التسليم؟",
        a: "أيوه. بعد ما نسلمك المشروع هيكون ليك 30 يوم تعديلات مجانية نعدّل خلالها أي حاجة محتاجها من غير أي تكلفة زيادة، لحد ما تكون راضي 100% عن النتيجة.",
      },
      {
        q: "في دعم بعد التسليم؟",
        a: "أيوه، الدعم مستمر حتى بعد تسليم المشروع. تقدر تتواصل معانا في أي وقت وهنساعدك في حل أي مشكلة أو الرد على أي استفسار بأسرع وقت.",
      },
      {
        q: "هقدر أضيف مزايا جديدة للموقع بعدين؟",
        a: "أكيد. بنعمل حلول مخصصة بالكامل — بوابات دفع، أنظمة حجز، ربط مع أنظمتك الحالية. كلمنا ونظبطلك باقة على مقاسك.",
      },
      {
        q: "طريقه الدفع؟",
        a: "الدفع بعد المعاينه, حضرتك مبتدفعش ولا جنيه غير بعد م بتعاين الشغل الاول",
      },
    ],
  },

  guarantees: [
    { title: "تسليم في 48 ساعة", sub: "التزام حقيقي بالمواعيد" },
    { title: "تحسين SEO مجاني", sub: "ظهور أحسن في جوجل" },
    { title: "تصميم متجاوب 100%", sub: "شغال على كل الأجهزة" },
    { title: "دعم بعد التسليم", sub: "معاك بعد ما ننزل الموقع" },
  ],

  cta: {
    titleA: "موقعك جاهز",
    titleHighlight: "في 48 ساعة",
    sub: "ابدأ مع فيرتكس فورج النهارده — استشارة أولى مجانية من غير أي التزام.",
    primary: "احجز استشارتك المجانية",
    secondary: "شوف الأسعار",
  },

  footer: {
    tagline: "بنصنع التميز الرقمي",
    links: [
      { label: "شغلنا", href: "#work" },
      { label: "الأسعار", href: "#pricing" },
      { label: "آراء العملاء", href: "#testimonials" },
      { label: "الأسئلة", href: "#faq" },
      { label: "كلمنا", href: "#contact" },
    ],
    rights: "© 2026 Vertex Forge — كل الحقوق محفوظة.",
    motto: "We Forge Digital Excellence.",
    dev: {
      prefix: "المطور",
      name: "Hassan Mohamed",
      role: "FULL STACK DEVELOPER",
      whatsappAria: "واتساب حسن محمد",
      websiteAria: "الموقع الشخصي لحسن محمد",
    },
  },

  whatsappAria: "كلمنا على واتساب",
};

export type Dict = typeof ar;

const en: Dict = {
  dir: "ltr",
  langLabel: "ع",
  langAria: "Switch to Arabic",
  themeAria: "Toggle dark mode",
  menuAria: "Menu",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "Reviews", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ],
  navCta: "Start your project",

  hero: {
    eyebrow: "Web design & development studio",
    titleA: "We build you a site",
    titleHighlight: "worthy of your name",
    titleB: "that brings you clients",
    subtitle: "Your website live in 48 hours",
    ctaPrimary: "Start your project now",
    ctaSecondary: "See our work",
    trust: "Over 100 happy clients",
  },

  stats: [
    { value: "100+", label: "Projects delivered" },
    { value: "48h", label: "Delivery time" },
    { value: "4.9/5", label: "Client rating" },
    { value: "0", label: "Monthly fees" },
  ],

  services: [
    "UI Design",
    "Web Development",
    "E-commerce",
    "Brand Identity",
    "SEO",
    "Dashboards",
    "Web Apps",
    "Hosting & Support",
  ],

  work: {
    eyebrow: "Our work",
    title: "Our work speaks for us",
    sub: "A selection of projects we designed and built for clients across industries.",
    filters: [
      { key: "all", label: "All" },
      { key: "store", label: "E-commerce" },
      { key: "corp", label: "Company sites" },
      { key: "landing", label: "Landing pages" },
      { key: "dash", label: "Dashboards" },
    ],
    projects: [
      {
        key: "luluah",
        title: "Luluah Store",
        url: "luluah.store",
        category: "store",
        tag: "E-commerce",
      },
      {
        key: "nimbus",
        title: "Nimbus Tech",
        url: "nimbus.tech",
        category: "corp",
        tag: "Company site",
      },
      {
        key: "atlq",
        title: "Atlaq Campaign",
        url: "atlq.co",
        category: "landing",
        tag: "Landing page",
      },
      {
        key: "rawaj",
        title: "Rawaj Dashboard",
        url: "rawaj.app",
        category: "dash",
        tag: "Dashboard",
      },
      {
        key: "itrk",
        title: "3itrk Perfumes",
        url: "3itrk.com",
        category: "store",
        tag: "E-commerce",
      },
      {
        key: "thawq",
        title: "Thawq Restaurants",
        url: "thawq.sa",
        category: "corp",
        tag: "Company site",
      },
    ],
  },

  process: {
    eyebrow: "How we work",
    titleA: "Simple",
    titleHighlight: "and fast",
    sub: "Just 3 steps and your site is ready to go.",
    steps: [
      {
        n: "01",
        title: "Message us on WhatsApp",
        body: "We listen to your idea, understand your goal, then lay out a clear plan that fits your business and budget.",
      },
      {
        n: "02",
        title: "We design and build",
        body: "Our team starts designing and building your site with the latest tech, at the highest quality and performance.",
      },
      {
        n: "03",
        title: "Live in 48 hours",
        body: "Your site goes live ready to work, so you can start bringing in clients from day one.",
      },
    ],
  },

  pricing: {
    eyebrow: "Our packages",
    title: "Pick the package that fits you",
    sub: "Clear pricing with no hidden fees. Every package includes responsive design and SEO.",
    badge: "Most popular",
    currency: "EGP",
    guarantee:
      "Not happy with the work? — We revise until you are · Pay after preview · Guaranteed delivery in 48 hours",
    plans: [
      {
        name: "Starter",
        price: "4,999",
        featured: false,
        features: [
          "One professional page",
          "Direct WhatsApp integration",
          "100% mobile friendly",
          "Ready in 48 hours",
        ],
        cta: "Start now",
      },
      {
        name: "Business",
        price: "9,999",
        featured: true,
        features: [
          "Multiple pages (up to 5)",
          "Custom domain for a full year",
          "SEO and Google visibility",
          "Google Maps + contact form",
        ],
        cta: "Get this package",
      },
      {
        name: "Store",
        price: "14,999",
        featured: false,
        features: [
          "Full e-commerce store",
          "Cart + online payments",
          "Domain + hosting for a full year",
          "Complete SEO + reports",
        ],
        cta: "Start now",
      },
    ],
  },

  testimonials: {
    eyebrow: "Client reviews",
    title: "People who trusted us",
    sub: "Real feedback from clients we've worked with.",
    prev: "Previous",
    next: "Next",
    items: [
      {
        name: "Mohamed Ayman",
        role: "Online store owner",
        initial: "M",
        body: "The work came out better than I imagined, and the store was done in exactly two days as agreed. Solid people who know their craft.",
      },
      {
        name: "Sara Khaled",
        role: "Marketing manager",
        initial: "S",
        body: "Clean, modern design and they replied to all my notes fast with no runaround. Genuinely recommend them.",
      },
      {
        name: "Ahmed El-Hamdy",
        role: "Startup founder",
        initial: "A",
        body: "The team gets marketing, not just design. The result is a fast, good-looking site that actually grew our sales.",
      },
      {
        name: "Mona Abdelrahman",
        role: "Clothing brand owner",
        initial: "M",
        body: "I don't understand tech at all, and they set everything up and showed me how to manage the site myself.",
      },
      {
        name: "Karim Fouad",
        role: "Restaurant owner",
        initial: "K",
        body: "The site now brings me orders from Google, something I'd never done before. Money well spent.",
      },
      {
        name: "Nourhan Samir",
        role: "Graphic designer",
        initial: "N",
        body: "I've dealt with a lot of people before, but this is the first time someone delivered exactly on time with no excuses.",
      },
      {
        name: "Mostafa El-Gendy",
        role: "Wholesale trader",
        initial: "M",
        body: "Their price is very fair for the quality they deliver. And post-delivery support is real, not just talk.",
      },
      {
        name: "Heba Yasser",
        role: "Learning center owner",
        initial: "H",
        body: "They built me a landing page for the campaign and it brought results in the first week. Thank God.",
      },
      {
        name: "Amr Shaaban",
        role: "Car dealership owner",
        initial: "A",
        body: "Easy to reach on WhatsApp and they reply fast. Felt like dealing with people who actually care.",
      },
      {
        name: "Dina Magdy",
        role: "Pharmacist",
        initial: "D",
        body: "I asked for a lot of revisions and they did them without complaining or charging extra. That's why I recommend them to friends.",
      },
      {
        name: "Tarek Abdallah",
        role: "Contractor",
        initial: "T",
        body: "The company site looks respectable in front of clients now, and that made a difference on bigger deals.",
      },
      {
        name: "Reham Fathy",
        role: "Flower shop owner",
        initial: "R",
        body: "The store runs nicely and online payments worked the first time. Honestly very happy.",
      },
      {
        name: "Youssef El-Shennawy",
        role: "Online coach",
        initial: "Y",
        body: "They set up a booking system for my sessions and saved me hours I used to lose in messages.",
      },
      {
        name: "Aya Mansour",
        role: "Handmade business owner",
        initial: "A",
        body: "I started with a simple package and grew with them later. People who walk with you step by step.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "We answered your question",
    items: [
      {
        q: "How long does it take to finish the site?",
        a: "Most projects are delivered within 48 hours. If the project is large or has special requirements, we'll tell you the expected timeline before we start.",
      },
      {
        q: "What do I need to prepare before we start?",
        a: "Just your project name, your line of business, and a contact number. Leave the rest to us.",
      },
      {
        q: "Can I request changes after delivery?",
        a: "Yes. After we hand over the project you get 30 days of free revisions, during which we adjust anything you need at no extra cost, until you're 100% happy with the result.",
      },
      {
        q: "Is there support after delivery?",
        a: "Yes, support continues even after the project is delivered. Reach out any time and we'll help you solve any issue or answer any question as fast as possible.",
      },
      {
        q: "Can I add new features to the site later?",
        a: "Definitely. We build fully custom solutions — payment gateways, booking systems, integrations with your existing tools. Talk to us and we'll tailor a package for you.",
      },
    ],
  },

  guarantees: [
    { title: "48-hour delivery", sub: "A real commitment to deadlines" },
    { title: "Free SEO optimization", sub: "Better visibility on Google" },
    { title: "100% responsive design", sub: "Works on every device" },
    { title: "Post-launch support", sub: "With you after the site goes live" },
  ],

  cta: {
    titleA: "Your site is ready",
    titleHighlight: "in 48 hours",
    sub: "Start with Vertex Forge today — a free first consultation with no commitment.",
    primary: "Book your free consultation",
    secondary: "See pricing",
  },

  footer: {
    tagline: "We forge digital excellence",
    links: [
      { label: "Work", href: "#work" },
      { label: "Pricing", href: "#pricing" },
      { label: "Reviews", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    rights: "© 2026 Vertex Forge — All rights reserved.",
    motto: "We Forge Digital Excellence.",
    dev: {
      prefix: "developer",
      name: "Hassan Mohamed",
      role: "FULL STACK DEVELOPER",
      whatsappAria: "Hassan Mohamed on WhatsApp",
      websiteAria: "Hassan Mohamed's portfolio",
    },
  },

  whatsappAria: "Chat with us on WhatsApp",
};

export const content: Record<Locale, Dict> = { ar, en };
