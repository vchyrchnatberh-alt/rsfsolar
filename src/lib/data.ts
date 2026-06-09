import {
  SunMedium,
  BatteryCharging,
  Zap,
  Wrench,
  ShieldCheck,
  Cpu,
  ClipboardCheck,
  FileSignature,
  HardHat,
  LineChart,
  Globe2,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";

export const services = [
  {
    slug: "budivnytstvo-ses",
    title: "Будівництво СЕС",
    short: "Розрахунок і будівництво сучасних високоефективних СЕС для будь-яких типів об'єктів.",
    description:
      "Проектуємо, поставляємо і монтуємо сонячні електростанції потужністю від 10 кВт до 10 МВт. Працюємо з домогосподарствами, агропромисловими підприємствами та промисловими комплексами.",
    icon: SunMedium,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
    benefits: [
      "Проектування з урахуванням географії та споживання",
      "Європейські модулі рівня Tier-1",
      "Гарантія від виробника та власна гарантія",
      "Підключення до мережі та оформлення документів",
    ],
  },
  {
    slug: "montazh-bess",
    title: "Монтаж БЕСС",
    short: "Встановлення та підключення систем накопичення електроенергії.",
    description:
      "Інтегруємо промислові акумуляторні системи зберігання енергії (BESS) на базі LFP-технологій. Балансуємо споживання, забезпечуємо резерв та мінімізуємо piк-shaving витрати.",
    icon: BatteryCharging,
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=80",
    benefits: [
      "Модульна архітектура від 30 кВт·год",
      "Інтеграція з СЕС та генератором",
      "Розумне керування та SCADA-моніторинг",
      "Сертифіковане обладнання BYD, Huawei",
    ],
  },
  {
    slug: "generatory",
    title: "Резервні генератори",
    short: "Підключення додаткових потужностей для критичних об'єктів.",
    description:
      "Підбір, монтаж та автоматизація резервних генераторних установок. Працюємо з провідними виробниками — від побутових 10 кВА до промислових 2 МВА систем.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1589276534126-adef63a95e05?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    benefits: [
      "Автоматичне введення резерву (АВР)",
      "Шумозахисні кожухи та контейнерні рішення",
      "Дистанційний моніторинг та запуск",
      "Сервісна підтримка 24/7",
    ],
  },
  {
    slug: "elektromontazh",
    title: "Електромонтажні роботи",
    short: "Електромонтажні роботи будь-якої складності, оновлення електросистем.",
    description:
      "Виконуємо повний цикл електромонтажних робіт — від проектування електричних мереж до пусконалагодження високовольтного обладнання.",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1600&q=80",
    benefits: [
      "Низьковольтні та середньовольтні мережі",
      "Кабельні лінії 0,4 / 10 / 35 кВ",
      "Збірка та монтаж шаф КТП",
      "Атестовані інженери та електрики",
    ],
  },
  {
    slug: "servis",
    title: "Сервісне обслуговування",
    short: "Обслуговування та ремонт систем альтернативної енергетики, технічна підтримка.",
    description:
      "Профілактичне та аварійне обслуговування об'єктів альтернативної енергетики. Прогнозуємо несправності та підвищуємо ефективність генерації.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1600&q=80",
    benefits: [
      "Регламентне ТО за графіком",
      "Чистка панелей та діагностика інверторів",
      "Виїзд аварійної бригади 24/7",
      "Звіти про продуктивність щомісяця",
    ],
  },
] as const;

export const projects = [
  {
    title: "Промислова СЕС 1.2 МВт",
    type: "Комерційний об'єкт",
    location: "Київська область, Україна",
    flag: "ua",
    capacity: "1 200 кВт",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80",
    equipment: ["Jinko Tiger Neo 580W", "Huawei SUN2000-100KTL", "BYD MC-I LFP"],
  },
  {
    title: "Дахова СЕС 480 кВт",
    type: "Виробничий комплекс",
    location: "Львівська область, Україна",
    flag: "ua",
    capacity: "480 кВт",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=80",
    equipment: ["LONGi Hi-MO 6", "SMA Sunny Tripower", "Huawei LUNA2000"],
  },
  {
    title: "Гібридна СЕС + БЕСС 250 кВт",
    type: "Логістичний центр",
    location: "Polska, Warszawa",
    flag: "pl",
    capacity: "250 кВт + 600 кВт·год",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1600&q=80",
    equipment: ["JA Solar DeepBlue 4.0", "Huawei SUN2000", "BYD Battery-Box"],
  },
  {
    title: "Агро СЕС 320 кВт",
    type: "Аграрне підприємство",
    location: "Вінницька область, Україна",
    flag: "ua",
    capacity: "320 кВт",
    image:
      "https://images.unsplash.com/photo-1542336391-ae2936d8efe4?auto=format&fit=crop&w=1600&q=80",
    equipment: ["Trina Vertex S+", "Sungrow SG110CX", "AC-Coupled BESS"],
  },
  {
    title: "Енергонезалежний дім 30 кВт",
    type: "Приватний сектор",
    location: "Закарпатська область",
    flag: "ua",
    capacity: "30 кВт + 60 кВт·год",
    image:
      "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    equipment: ["Canadian Solar TOPHiKu6", "Deye Hybrid", "Pylontech US5000"],
  },
  {
    title: "Промислова СЕС 2.5 МВт",
    type: "Машинобудівне виробництво",
    location: "Deutschland, Bayern",
    flag: "de",
    capacity: "2 500 кВт",
    image:
      "https://images.unsplash.com/photo-1724994727393-1040b798a228?q=80&w=1726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    equipment: ["Jinko Tiger Pro", "Huawei SUN2000-330KTL", "Schneider PV-Box"],
  },
] as const;

export const partners = [
  { name: "Huawei", description: "Інверторне обладнання та СНЕЕ" },
  { name: "Jinko Solar", description: "Сонячні модулі Tier-1" },
  { name: "BYD", description: "Промислові акумуляторні рішення" },
  { name: "LONGi", description: "Високоефективні модулі N-type" },
  { name: "JA Solar", description: "Bifacial модулі DeepBlue" },
  { name: "Sungrow", description: "Інвертори та зберігання" },
  { name: "Trina Solar", description: "Сонячні модулі Vertex" },
  { name: "SMA", description: "Інвертори преміум-сегмента" },
  { name: "Canadian Solar", description: "Глобальний виробник модулів" },
  { name: "Deye", description: "Гібридні інвертори" },
];

export const designProcess = [
  {
    step: "01",
    title: "Аналіз об'єкта",
    description: "Виїзд на об'єкт, заміри, оцінка інсоляції та споживання",
    icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "Розрахунки",
    description: "Енерго-економічна модель, підбір обладнання, ROI прогноз",
    icon: LineChart,
  },
  {
    step: "03",
    title: "Документація",
    description: "Робоча документація, сертифікати, погодження з мережею",
    icon: FileSignature,
  },
  {
    step: "04",
    title: "Реалізація",
    description: "Монтаж, пусконалагодження, інтеграція з мережею",
    icon: HardHat,
  },
] as const;

export const stats = [
  { label: "Реалізованих проектів", value: 240, suffix: "+", icon: Award },
  { label: "Сумарна потужність", value: 38, suffix: " МВт", icon: TrendingUp },
  { label: "Років на ринку", value: 12, suffix: "", icon: ShieldCheck },
  { label: "Команда інженерів", value: 45, suffix: "", icon: Users },
  { label: "Країн присутності", value: 5, suffix: "", icon: Globe2 },
] as const;

export const equipment = {
  panels: [
    {
      title: "Jinko Tiger Neo 580W",
      brand: "Jinko Solar",
      type: "N-type TOPCon, Bifacial",
      specs: {
        Потужність: "580 Вт",
        ККД: "22.5%",
        Гарантія: "25 років",
        Тип: "N-type Mono",
      },
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80",
      advantages: ["Найвища щільність потужності", "Робота при температурі до +85°C", "Стійкість до мікротріщин"],
    },
    {
      title: "LONGi Hi-MO 6 555W",
      brand: "LONGi",
      type: "Mono PERC HPBC",
      specs: {
        Потужність: "555 Вт",
        ККД: "22.3%",
        Гарантія: "25 років",
        Тип: "Mono",
      },
      image:
        "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80",
      advantages: ["HPBC технологія", "Чорна задня плівка", "Естетичний дизайн для дахів"],
    },
    {
      title: "JA Solar DeepBlue 4.0",
      brand: "JA Solar",
      type: "N-type Bifacial",
      specs: {
        Потужність: "615 Вт",
        ККД: "22.8%",
        Гарантія: "30 років",
        Тип: "N-type",
      },
      image:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80",
      advantages: ["Двостороння генерація", "30 років продуктивності", "Низька деградація"],
    },
  ],
  inverters: [
    {
      title: "Huawei SUN2000-100KTL",
      brand: "Huawei",
      type: "Мережевий трифазний",
      specs: {
        Потужність: "100 кВт",
        ККД: "98.8%",
        Гарантія: "10 років",
        Захист: "IP66",
      },
      image:
        "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=900&q=80",
      advantages: ["AI-моніторинг та діагностика", "Інтеграція з акумуляторами LUNA2000", "Розширена кіберзахист"],
    },
    {
      title: "Sungrow SG110CX",
      brand: "Sungrow",
      type: "Промисловий мережевий",
      specs: {
        Потужність: "110 кВт",
        ККД: "99%",
        Гарантія: "10 років",
        Захист: "IP66",
      },
      image:
        "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=900&q=80",
      advantages: ["9 MPPT для часткового затінення", "Природне охолодження", "PID-recovery"],
    },
    {
      title: "Deye SUN-50K-SG",
      brand: "Deye",
      type: "Гібридний",
      specs: {
        Потужність: "50 кВт",
        ККД: "97.6%",
        Гарантія: "10 років",
        Тип: "Hybrid 3PH",
      },
      image:
        "https://images.unsplash.com/photo-1591033594799-33227a05780d?auto=format&fit=crop&w=900&q=80",
      advantages: ["Підтримка off-grid режиму", "Сумісність з LV/HV батареями", "Wi-Fi моніторинг"],
    },
  ],
  batteries: [
    {
      title: "BYD Battery-Box Premium HVS",
      brand: "BYD",
      type: "Промислова LFP",
      specs: {
        Ємність: "10.24 кВт·год",
        Циклів: "8 000+",
        Гарантія: "10 років",
        Хімія: "LiFePO4",
      },
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80",
      advantages: ["Кобальт-free хімія", "Масштабованість до 22.1 кВт·год", "Високовольтна архітектура"],
    },
    {
      title: "Huawei LUNA2000-15-S0",
      brand: "Huawei",
      type: "Модульна LFP",
      specs: {
        Ємність: "15 кВт·год",
        Циклів: "6 000+",
        Гарантія: "10 років",
        Хімія: "LiFePO4",
      },
      image:
        "https://images.unsplash.com/photo-1542336391-ae2936d8efe4?auto=format&fit=crop&w=900&q=80",
      advantages: ["Інтеграція з SUN2000", "Контроль на рівні пакетів", "100% DoD"],
    },
    {
      title: "Pylontech Force H2",
      brand: "Pylontech",
      type: "Високовольтна LFP",
      specs: {
        Ємність: "7.1 кВт·год",
        Циклів: "6 000+",
        Гарантія: "10 років",
        Хімія: "LiFePO4",
      },
      image:
        "https://images.unsplash.com/photo-1605338803155-8c79a2b0a05a?auto=format&fit=crop&w=900&q=80",
      advantages: ["Стекування до 30 кВт·год", "Сумісність з провідними інверторами", "BMS з IP55"],
    },
  ],
  generators: [
    {
      title: "FG Wilson P150-3",
      brand: "FG Wilson",
      type: "Дизельний",
      specs: {
        Потужність: "150 кВА",
        Двигун: "Perkins 1106A",
        Витрата: "26 л/год",
        Кожух: "Шумозахисний",
      },
      image:
        "https://images.unsplash.com/photo-1591033594799-33227a05780d?auto=format&fit=crop&w=900&q=80",
      advantages: ["Британська збірка", "Резервне джерело для бізнесу", "Автоматичний запуск"],
    },
    {
      title: "Cummins C200 D5e",
      brand: "Cummins",
      type: "Дизельний промисловий",
      specs: {
        Потужність: "200 кВА",
        Двигун: "Cummins 6BTAA5.9",
        Витрата: "32 л/год",
        Кожух: "Контейнерний",
      },
      image:
        "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=900&q=80",
      advantages: ["24/7 безперервна робота", "Двигун Cummins", "PowerCommand панель"],
    },
    {
      title: "Pramac GBL30",
      brand: "Pramac",
      type: "Газовий",
      specs: {
        Потужність: "30 кВА",
        Паливо: "Природний газ",
        Витрата: "8.5 м³/год",
        Кожух: "Преміум",
      },
      image:
        "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=900&q=80",
      advantages: ["Низькі викиди CO₂", "Тиха робота", "Економічне паливо"],
    },
  ],
};

export const news = [
  {
    slug: "rsf-solar-zapustyv-promyslovu-ses-1-2-mvt",
    date: "2026-04-22",
    title: "ROYALSUNFLOWER запустив промислову СЕС 1.2 МВт під Києвом",
    excerpt:
      "Найбільша наша СЕС в Київській області офіційно введена в експлуатацію. Очікувана річна генерація — 1.45 ГВт·год.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "novi-modeli-batarej-byd-2026",
    date: "2026-03-15",
    title: "Нові моделі промислових батарей BYD у 2026 році",
    excerpt:
      "Розглядаємо новинки BYD Battery-Box та чому LFP-хімія стає стандартом для бізнес-сегмента.",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "yak-obraty-inverter-dlya-ses",
    date: "2026-02-28",
    title: "Як обрати інвертор для СЕС: гайд від інженерів ROYALSUNFLOWER",
    excerpt:
      "Детальний порівняльний огляд мережевих, гібридних та автономних інверторів для приватного й комерційного сектору.",
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "bess-dlya-agro-biznesu",
    date: "2026-02-01",
    title: "BESS для агробізнесу: як зменшити витрати на енергію на 40%",
    excerpt:
      "Кейс із інтеграції 600 кВт·год системи зберігання на елеваторному комплексі у Вінницькій області.",
    image:
      "https://images.unsplash.com/photo-1542336391-ae2936d8efe4?auto=format&fit=crop&w=1600&q=80",
  },
];

export const certificates = [
  {
    title: "ISO 9001:2015",
    issuer: "Bureau Veritas",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "ISO 14001:2015",
    issuer: "Bureau Veritas",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Сертифікат Huawei FusionSolar",
    issuer: "Huawei Technologies",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1565514020179-026b92b2d70b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "BYD Authorized Installer",
    issuer: "BYD Company Ltd",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Сертифікат IEC 61215 / 61730",
    issuer: "TÜV Rheinland",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Jinko Solar Premium Partner",
    issuer: "Jinko Solar",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1559526324-c1f275fbfa32?auto=format&fit=crop&w=1200&q=80",
  },
];

export const navigation = [
  { label: "Головна", href: "/" },
  {
    label: "Послуги",
    href: "/#posluhy",
    children: services.map((s) => ({ label: s.title, href: `/posluhy/${s.slug}` })),
  },
  { label: "Проєкти", href: "/#proekty" },
  {
    label: "Про компанію",
    href: "/pro-nas",
    children: [
      { label: "Про нас", href: "/pro-nas" },
      { label: "Сертифікати", href: "/pro-nas/sertyfikaty" },
      { label: "Партнери", href: "/pro-nas/partnery" },
      { label: "Кар'єра", href: "/pro-nas/kariera" },
    ],
  },
  { label: "Каталог", href: "/obladnannya" },
  { label: "Новини", href: "/novyny" },
  { label: "Консультація", href: "/#kontakty" },
];

export const features = [
  {
    icon: Cpu,
    title: "AI-моніторинг 24/7",
    description: "Прогнозування генерації та виявлення аномалій з машинним навчанням",
  },
  {
    icon: ShieldCheck,
    title: "Сертифіковане обладнання",
    description: "Лише Tier-1 виробники з документально підтвердженою якістю",
  },
  {
    icon: Award,
    title: "Власна гарантія 5 років",
    description: "Понад заводську гарантію — повна відповідальність за об'єкт",
  },
  {
    icon: Globe2,
    title: "Міжнародний досвід",
    description: "Реалізовані проекти в Україні, Польщі, Німеччині",
  },
];
