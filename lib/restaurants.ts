import type { Locale } from "@/lib/content";

/* ---------------------------------------------------------------------------
 * Restaurants section — data for the QR‑menu landing page and the six
 * display‑only e‑menu templates. Everything here is a showcase: the sample
 * restaurant is "Master Chief", rendered six different ways so a prospective
 * client can pick the design they like.
 * ------------------------------------------------------------------------- */

type L = { ar: string; en: string };

export type MenuTag = "spicy" | "veg" | "hot" | "new" | "offer";

export type MenuItem = {
  id: string;
  name: L;
  desc: L;
  price: number;
  kcal?: number;
  image?: string;
  tags?: MenuTag[];
};

export type MenuCategory = {
  id: string;
  name: L;
  image: string;
  items: MenuItem[];
};

export const RESTAURANT = {
  name: "Master Chief",
  nameAr: "ماستر شيف",
  tagline: { ar: "أكلٌ بطعم الأبطال", en: "A taste worthy of champions" } as L,
  location: { ar: "الإسكندرية — سموحة", en: "Alexandria — Smouha" } as L,
  hours: { ar: "يوميًا ٢ ظهرًا – ٢ صباحًا", en: "Daily 2 PM – 2 AM" } as L,
  phone: "01000000000",
  currency: { ar: "ج.م", en: "EGP" } as L,
};

const F = "/restaurants/food";

export const MENU: MenuCategory[] = [
  {
    id: "burgers",
    name: { ar: "البرجر", en: "Burgers" },
    image: `${F}/burger-classic.png`,
    items: [
      {
        id: "classic-burger",
        name: { ar: "برجر كلاسيك", en: "Classic Burger" },
        desc: {
          ar: "لحم بقري ١٥٠جم، خس، طماطم، بصل وصوص الشيف الخاص.",
          en: "150g beef patty, lettuce, tomato, onion and the chef's special sauce.",
        },
        price: 120,
        kcal: 620,
        image: `${F}/burger-classic.png`,
        tags: ["new"],
      },
      {
        id: "cheese-burger",
        name: { ar: "برجر بالجبنة", en: "Cheese Burger" },
        desc: {
          ar: "لحم بقري، جبنة شيدر مذابة، خس وطماطم وصوص خاص.",
          en: "Beef patty, melted cheddar, lettuce, tomato and special sauce.",
        },
        price: 140,
        kcal: 720,
        image: `${F}/burger-cheese.png`,
      },
      {
        id: "double-burger",
        name: { ar: "برجر دبل", en: "Double Burger" },
        desc: {
          ar: "طبقتان من اللحم البقري مع جبنة شيدر وصوص باربكيو.",
          en: "Double beef patties with cheddar and smoky BBQ sauce.",
        },
        price: 160,
        kcal: 940,
        image: `${F}/burger-double.png`,
        tags: ["hot"],
      },
      {
        id: "crispy-chicken-burger",
        name: { ar: "برجر دجاج كريسبي", en: "Crispy Chicken Burger" },
        desc: {
          ar: "صدر دجاج مقرمش، خس، مخلل وصوص الرانش.",
          en: "Crispy chicken fillet, lettuce, pickles and ranch sauce.",
        },
        price: 135,
        kcal: 680,
        image: `${F}/burger-crispy.png`,
      },
      {
        id: "mushroom-burger",
        name: { ar: "برجر مشروم", en: "Mushroom Burger" },
        desc: {
          ar: "لحم بقري مع مشروم سوتيه وجبنة موزاريلا وصوص كريمي.",
          en: "Beef patty with sautéed mushrooms, mozzarella and creamy sauce.",
        },
        price: 155,
        kcal: 780,
        image: `${F}/burger-chicken.png`,
      },
    ],
  },
  {
    id: "sandwiches",
    name: { ar: "السندوتشات والشاورما", en: "Sandwiches & Shawarma" },
    image: `${F}/shawarma.png`,
    items: [
      {
        id: "chicken-shawarma",
        name: { ar: "شاورما دجاج", en: "Chicken Shawarma" },
        desc: {
          ar: "دجاج متبل مع صوص الثوم والمخلل في خبز عربي.",
          en: "Marinated chicken with garlic sauce and pickles in Arabic bread.",
        },
        price: 95,
        kcal: 540,
        image: `${F}/shawarma.png`,
        tags: ["spicy"],
      },
      {
        id: "meat-shawarma",
        name: { ar: "شاورما لحم", en: "Beef Shawarma" },
        desc: {
          ar: "شرائح لحم بقري مع طحينة وطماطم في خبز دافئ.",
          en: "Beef slices with tahini and tomato in warm flatbread.",
        },
        price: 105,
        kcal: 610,
        image: `${F}/shawarma.png`,
      },
      {
        id: "cheese-manakish",
        name: { ar: "مناقيش بالجبنة والطماطم", en: "Cheese & Tomato Manakish" },
        desc: {
          ar: "عجينة طازجة بجبنة الموزاريلا والطماطم والأعشاب.",
          en: "Fresh dough with mozzarella, tomato and herbs.",
        },
        price: 70,
        kcal: 430,
        image: `${F}/manakish.png`,
        tags: ["veg"],
      },
      {
        id: "crispy-roll",
        name: { ar: "رول كريسبي", en: "Crispy Roll" },
        desc: {
          ar: "رول محشي مقرمش يُقدَّم مع صوص حار.",
          en: "Crunchy stuffed roll served with a spicy dip.",
        },
        price: 80,
        kcal: 470,
        image: `${F}/roll.webp`,
      },
    ],
  },
  {
    id: "chicken",
    name: { ar: "الدجاج المقلي", en: "Fried Chicken" },
    image: `${F}/chicken-fried.jpg`,
    items: [
      {
        id: "fried-chicken",
        name: { ar: "دجاج مقلي حار", en: "Spicy Fried Chicken" },
        desc: {
          ar: "قطع دجاج مقرمشة بخلطة التوابل الحارة وصوص الشيلي.",
          en: "Crunchy chicken pieces in a hot spice blend with chilli sauce.",
        },
        price: 130,
        kcal: 720,
        image: `${F}/chicken-fried.jpg`,
        tags: ["spicy", "hot"],
      },
      {
        id: "drumsticks",
        name: { ar: "أفخاذ دجاج", en: "Chicken Drumsticks" },
        desc: {
          ar: "أربع قطع من الأفخاذ المقرمشة مع بطاطس.",
          en: "Four crispy drumsticks served with fries.",
        },
        price: 115,
        kcal: 640,
        image: `${F}/chicken-drumstick.jpg`,
      },
      {
        id: "grilled-wings",
        name: { ar: "أجنحة مشوية", en: "Grilled Wings" },
        desc: {
          ar: "ثماني أجنحة متبلة ومشوية على الفحم.",
          en: "Eight marinated wings grilled over charcoal.",
        },
        price: 110,
        kcal: 520,
        image: `${F}/wings.png`,
      },
      {
        id: "roasted-chicken",
        name: { ar: "دجاج مشوي كامل", en: "Whole Roast Chicken" },
        desc: {
          ar: "دجاجة كاملة متبّلة بالأعشاب مع صوص خاص.",
          en: "Whole herb-marinated chicken with a house sauce.",
        },
        price: 190,
        kcal: 980,
        image: `${F}/chicken-roasted.png`,
      },
    ],
  },
  {
    id: "grilled",
    name: { ar: "المشويات والأرز", en: "Grills & Rice" },
    image: `${F}/turkey.png`,
    items: [
      {
        id: "mixed-grill",
        name: { ar: "مشويات مشكلة", en: "Mixed Grill Platter" },
        desc: {
          ar: "تشكيلة من اللحوم المشوية مع الخضار المحمّرة.",
          en: "An assortment of grilled meats with roasted vegetables.",
        },
        price: 220,
        kcal: 1100,
        image: `${F}/turkey.png`,
        tags: ["hot"],
      },
      {
        id: "chicken-rice",
        name: { ar: "دجاج مشوي مع أرز", en: "Grilled Chicken with Rice" },
        desc: {
          ar: "نصف دجاجة مشوية مع أرز بالشعرية وسلطة.",
          en: "Half grilled chicken with vermicelli rice and salad.",
        },
        price: 165,
        kcal: 860,
        image: `${F}/chicken-rice.png`,
      },
      {
        id: "sausage-rice",
        name: { ar: "أرز بالخضار والسجق", en: "Rice with Veg & Sausage" },
        desc: {
          ar: "أرز بالخضار الملوّنة مع قطع السجق المتبّلة.",
          en: "Colourful vegetable rice with seasoned sausage.",
        },
        price: 140,
        kcal: 790,
        image: `${F}/rice.png`,
      },
      {
        id: "herb-chicken",
        name: { ar: "دجاج بالأعشاب", en: "Herb Chicken" },
        desc: {
          ar: "دجاج متبّل بالأعشاب ومشوي في الفرن.",
          en: "Herb-marinated chicken roasted in the oven.",
        },
        price: 175,
        kcal: 900,
        image: `${F}/chicken-herb.png`,
      },
    ],
  },
  {
    id: "soups",
    name: { ar: "الشوربات", en: "Soups" },
    image: `${F}/soup-lentil.png`,
    items: [
      {
        id: "lentil-soup",
        name: { ar: "شوربة عدس", en: "Lentil Soup" },
        desc: {
          ar: "عدس كريمي مع الكزبرة وقطرات الليمون.",
          en: "Creamy lentils with cilantro and a squeeze of lemon.",
        },
        price: 45,
        kcal: 210,
        image: `${F}/soup-lentil.png`,
        tags: ["veg"],
      },
      {
        id: "corn-soup",
        name: { ar: "شوربة ذرة", en: "Cream of Corn" },
        desc: {
          ar: "شوربة ذرة كريمية بالبقدونس.",
          en: "Creamy corn soup with parsley.",
        },
        price: 50,
        kcal: 240,
        image: `${F}/soup-corn.png`,
        tags: ["veg"],
      },
      {
        id: "mushroom-soup",
        name: { ar: "شوربة مشروم", en: "Cream of Mushroom" },
        desc: {
          ar: "مشروم طازج مطهو في كريمة غنية.",
          en: "Fresh mushrooms simmered in a rich cream.",
        },
        price: 55,
        kcal: 260,
        image: `${F}/soup-mushroom.png`,
        tags: ["veg"],
      },
      {
        id: "harira-soup",
        name: { ar: "شوربة حريرة", en: "Harira Soup" },
        desc: {
          ar: "عدس وحمص وطماطم مع أعشاب مغربية.",
          en: "Lentils, chickpeas and tomato with Moroccan herbs.",
        },
        price: 60,
        kcal: 300,
        image: `${F}/soup-harira.png`,
      },
    ],
  },
  {
    id: "sides",
    name: { ar: "المقبلات والجانبية", en: "Starters & Sides" },
    image: `${F}/fries.jpg`,
    items: [
      {
        id: "fries",
        name: { ar: "بطاطس مقلية", en: "French Fries" },
        desc: {
          ar: "بطاطس مقرمشة تُقدَّم مع صوص الجبنة.",
          en: "Crispy fries served with cheese dip.",
        },
        price: 40,
        kcal: 380,
        image: `${F}/fries.jpg`,
        tags: ["veg"],
      },
      {
        id: "wedges",
        name: { ar: "بطاطس ودجز", en: "Potato Wedges" },
        desc: {
          ar: "أصابع بطاطس سميكة متبّلة.",
          en: "Thick seasoned potato wedges.",
        },
        price: 45,
        kcal: 420,
        image: `${F}/wedges.jpg`,
        tags: ["veg"],
      },
      {
        id: "samosa",
        name: { ar: "سمبوسة", en: "Samosa" },
        desc: {
          ar: "معجنات محشوة مقلية حتى الذهبي.",
          en: "Stuffed pastry fried to golden crisp.",
        },
        price: 35,
        kcal: 260,
        image: `${F}/samosa.png`,
      },
      {
        id: "green-salad",
        name: { ar: "سلطة خضراء", en: "Green Salad" },
        desc: {
          ar: "خضار طازجة مع صوص الليمون والزيت.",
          en: "Fresh greens with a lemon-olive dressing.",
        },
        price: 45,
        kcal: 160,
        image: `${F}/salad.png`,
        tags: ["veg"],
      },
      {
        id: "couscous",
        name: { ar: "كسكسي بالخضار", en: "Vegetable Couscous" },
        desc: {
          ar: "كسكسي مغربي بالخضار والحمص.",
          en: "Moroccan couscous with vegetables and chickpeas.",
        },
        price: 90,
        kcal: 520,
        image: `${F}/couscous.webp`,
        tags: ["veg"],
      },
      {
        id: "mixed-nuts",
        name: { ar: "مكسرات مشكلة", en: "Mixed Nuts" },
        desc: {
          ar: "تشكيلة مكسرات محمصة.",
          en: "An assortment of roasted nuts.",
        },
        price: 55,
        kcal: 340,
        image: `${F}/nuts.png`,
      },
    ],
  },
  {
    id: "seafood",
    name: { ar: "المأكولات البحرية", en: "Seafood" },
    image: `${F}/shrimp.png`,
    items: [
      {
        id: "fried-shrimp",
        name: { ar: "جمبري مقلي", en: "Fried Shrimp" },
        desc: {
          ar: "جمبري مقرمش يُقدَّم مع صوص الكوكتيل.",
          en: "Crispy shrimp served with cocktail sauce.",
        },
        price: 180,
        kcal: 560,
        image: `${F}/shrimp.png`,
        tags: ["new"],
      },
      {
        id: "shrimp-rice",
        name: { ar: "أرز بالجمبري", en: "Shrimp Rice" },
        desc: {
          ar: "أرز بحري بالجمبري والخضار.",
          en: "Seafood rice with shrimp and vegetables.",
        },
        price: 210,
        kcal: 720,
        image: `${F}/rice.png`,
      },
    ],
  },
];

/* --------------------------- design catalogue ---------------------------- */

export type DesignId = "1" | "2" | "3" | "4" | "5" | "6";

export type MenuDesign = {
  id: DesignId;
  /** thumbnail on the landing "choose your design" grid */
  thumb: string;
  name: L;
  /** one-line style descriptor */
  style: L;
  /** dominant accent shown as a swatch on the landing card */
  accent: string;
};

export const DESIGNS: MenuDesign[] = [
  {
    id: "1",
    thumb: "/restaurants/themes/theme-1.jpg",
    name: { ar: "التصميم الأول", en: "Design One" },
    style: { ar: "كلاسيكي بأقسام دائرية", en: "Classic with circular categories" },
    accent: "#b91c1c",
  },
  {
    id: "2",
    thumb: "/restaurants/themes/theme-2.jpg",
    name: { ar: "التصميم الثاني", en: "Design Two" },
    style: { ar: "قائمة بصور وأزرار خيارات", en: "Image list with option buttons" },
    accent: "#0f766e",
  },
  {
    id: "3",
    thumb: "/restaurants/themes/theme-3.jpg",
    name: { ar: "التصميم الثالث", en: "Design Three" },
    style: { ar: "شبكة بطاقات وشارات عروض", en: "Card grid with offer badges" },
    accent: "#c2410c",
  },
  {
    id: "4",
    thumb: "/restaurants/themes/theme-4.jpg",
    name: { ar: "التصميم الرابع", en: "Design Four" },
    style: { ar: "داكن وأنيق", en: "Dark & elegant" },
    accent: "#d4a017",
  },
  {
    id: "5",
    thumb: "/restaurants/themes/theme-5.jpg",
    name: { ar: "التصميم الخامس", en: "Design Five" },
    style: { ar: "منيو مطبوع كلاسيكي", en: "Classic printed menu" },
    accent: "#7c5e3b",
  },
  {
    id: "6",
    thumb: "/restaurants/themes/theme-6.jpg",
    name: { ar: "التصميم السادس", en: "Design Six" },
    style: { ar: "بوستر جرافيكي فاخر", en: "Premium graphic poster" },
    accent: "#e8a33d",
  },
];

export function getDesign(id: string): MenuDesign | undefined {
  return DESIGNS.find((d) => d.id === id);
}

/* ----------------------------- landing copy ------------------------------ */

type FeatureCopy = { title: L; body: L };

export const RESTAURANTS_COPY = {
  metaTitle: {
    ar: "منيو إلكتروني للمطاعم | فيرتكس فورج",
    en: "Digital restaurant menus | Vertex Forge",
  } as L,
  hero: {
    badge: { ar: "منيو إلكتروني QR", en: "QR digital menu" } as L,
    titleA: { ar: "أنشئ منيو إلكتروني احترافي", en: "Build a professional digital menu" } as L,
    titleHighlight: { ar: "لمطعمك أو كافيهك", en: "for your restaurant or café" } as L,
    titleB: { ar: "باستخدام رمز QR", en: "powered by a QR code" } as L,
    subtitle: {
      ar: "منيو إلكتروني متكامل بتصميم عصري وأداء سريع، يعرض أصنافك وأسعارك بشكل أنيق ويحدّثها في أي وقت — دون أي رسوم سنوية أو تطبيقات إضافية.",
      en: "A complete digital menu with a modern design and fast performance — it shows your items and prices elegantly and updates any time, with no yearly fees or extra apps.",
    } as L,
    ctaPrimary: { ar: "اطلب منيو مطعمك الآن", en: "Order your menu now" } as L,
    ctaSecondary: { ar: "شاهد التصاميم", en: "Browse the designs" } as L,
  },
  features: {
    eyebrow: { ar: "المزايا", en: "Features" } as L,
    title: {
      ar: "كل ما تحتاجه لإدارة منيو إلكتروني احترافي",
      en: "Everything you need to run a professional digital menu",
    } as L,
    sub: {
      ar: "نظام متكامل يمنحك تحكمًا كاملًا في منيو مطعمك وتجربة عصرية لعملائك.",
      en: "A complete system that gives you full control over your menu and a modern experience for your guests.",
    } as L,
    items: [
      {
        title: { ar: "رابط ورمز QR مخصص", en: "Custom link & QR code" },
        body: {
          ar: "رابط خاص باسم مطعمك ورمز QR جاهز للطباعة على الطاولات ووسائل التواصل.",
          en: "A link under your restaurant's name and a QR code ready to print on tables and social media.",
        },
      },
      {
        title: { ar: "تصاميم عصرية", en: "Modern designs" },
        body: {
          ar: "اختر من بين عدة تصاميم جذّابة تناسب هوية مطعمك وتبرز أصنافك.",
          en: "Choose from several attractive designs that suit your identity and showcase your dishes.",
        },
      },
      {
        title: { ar: "تحديث المنيو بسهولة", en: "Update the menu easily" },
        body: {
          ar: "عدّل الأصناف والأسعار والصور في أي وقت دون الحاجة إلى مطوّر.",
          en: "Edit items, prices and photos any time with no developer needed.",
        },
      },
      {
        title: { ar: "إدارة كاملة للطلبات", en: "Full order management" },
        body: {
          ar: "لوحة تحكم لاستقبال الطلبات ومتابعتها بسهولة من مكان واحد.",
          en: "A dashboard to receive and track orders easily from one place.",
        },
      },
      {
        title: { ar: "لوحة إحصاءات", en: "Insights dashboard" },
        body: {
          ar: "تعرّف على الأصناف الأكثر مبيعًا وسلوك عملائك لتطوير مطعمك.",
          en: "See your best-selling items and customer behaviour to grow your business.",
        },
      },
      {
        title: { ar: "تقييمات العملاء", en: "Customer reviews" },
        body: {
          ar: "استقبل آراء عملائك وقيّم خدمتك وحسّن تجربتهم باستمرار.",
          en: "Collect guests' feedback, rate your service and keep improving their experience.",
        },
      },
    ] as FeatureCopy[],
  },
  clients: {
    eyebrow: { ar: "عملاء وثقوا بنا", en: "Trusted by" } as L,
    title: {
      ar: "مطاعم وكافيهات اختارت فيرتكس فورج",
      en: "Restaurants & cafés that chose Vertex Forge",
    } as L,
  },
  designs: {
    eyebrow: { ar: "التصاميم", en: "The designs" } as L,
    title: { ar: "اختر تصميمك", en: "Choose your design" } as L,
    sub: {
      ar: "استعرض التصاميم الجاهزة لمنيو مطعم «ماستر شيف» واختر الشكل الذي يناسبك.",
      en: "Preview the ready designs for the “Master Chief” menu and pick the look you like.",
    } as L,
    view: { ar: "شاهد المنيو", en: "View menu" } as L,
  },
  faq: {
    eyebrow: { ar: "الأسئلة الشائعة", en: "FAQ" } as L,
    title: { ar: "أسئلة عن المنيو الإلكتروني", en: "Digital menu questions" } as L,
    items: [
      {
        q: { ar: "كم يستغرق تجهيز المنيو الإلكتروني؟", en: "How long does the menu take?" },
        a: {
          ar: "نجهّز منيو مطعمك خلال ٤٨ ساعة بعد استلام الأصناف والأسعار والصور.",
          en: "We prepare your menu within 48 hours of receiving your items, prices and photos.",
        },
      },
      {
        q: { ar: "هل يمكنني تعديل المنيو بنفسي؟", en: "Can I edit the menu myself?" },
        a: {
          ar: "نعم، تحصل على لوحة تحكم بسيطة لتعديل الأصناف والأسعار والصور في أي وقت.",
          en: "Yes, you get a simple dashboard to edit items, prices and photos any time.",
        },
      },
      {
        q: { ar: "هل هناك رسوم سنوية؟", en: "Are there yearly fees?" },
        a: {
          ar: "لا رسوم سنوية إجبارية؛ تدفع مرة واحدة ويبقى منيوك يعمل، والدعم متاح دائمًا.",
          en: "No mandatory yearly fees — you pay once and your menu keeps running, with support always available.",
        },
      },
      {
        q: { ar: "كيف يصل العميل إلى المنيو؟", en: "How do guests reach the menu?" },
        a: {
          ar: "عبر مسح رمز QR على الطاولة أو من خلال رابط المطعم على وسائل التواصل.",
          en: "By scanning the QR code on the table or through your restaurant link on social media.",
        },
      },
    ],
  },
  contact: {
    eyebrow: { ar: "تواصل معنا", en: "Get in touch" } as L,
    title: { ar: "جاهز تبدأ منيو مطعمك؟", en: "Ready to start your menu?" } as L,
    sub: {
      ar: "راسلنا على واتساب وسنجهّز لك منيو إلكتروني يليق بمطعمك خلال ٤٨ ساعة.",
      en: "Message us on WhatsApp and we'll craft a digital menu worthy of your restaurant within 48 hours.",
    } as L,
    cta: { ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" } as L,
  },
  back: { ar: "المطاعم", en: "Restaurants" } as L,
};

export const BRAND_LOGOS: { src: string; name: string }[] = [
  { src: "/restaurants/brands/castello.png", name: "Castello Cafe" },
  { src: "/restaurants/brands/woods.png", name: "Woods Cafe" },
  { src: "/restaurants/brands/tareqa.png", name: "Tareqa Cafe" },
  { src: "/restaurants/brands/alfares.png", name: "El Fares" },
  { src: "/restaurants/brands/bahr-elsamak.jpg", name: "Bahr El Samak" },
  { src: "/restaurants/brands/random.jpg", name: "Random Cafe" },
  { src: "/restaurants/brands/athar.jpg", name: "Athar" },
  { src: "/restaurants/brands/shawarma-elasala.jpg", name: "Shawarma El Asala" },
  { src: "/restaurants/brands/nasamat.jpg", name: "Nasamat" },
  { src: "/restaurants/brands/nasmet-elshorouk.jpg", name: "Nasmet El Shorouk" },
];

/** helper to read a localized string given the active locale */
export function tl(v: L, locale: Locale): string {
  return v[locale];
}
