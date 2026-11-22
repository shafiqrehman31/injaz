export interface BilingualText {
  en: string;
  ar: string;
}

export interface ServiceDivision {
  id: string;
  number: string;
  title: BilingualText;
  shortDesc: BilingualText;
  fullDesc: BilingualText;
  highlights: { en: string[]; ar: string[] };
  standards?: BilingualText;
  image: string;
  gallery: string[];
}

export interface ProjectItem {
  id: string;
  title: BilingualText;
  client: BilingualText;
  location: BilingualText;
  category: 'fencing' | 'civil' | 'mechanical' | 'security' | 'earthwork';
  categoryLabel: BilingualText;
  status: BilingualText;
  summary: BilingualText;
  scope: { en: string[]; ar: string[] };
  image: string;
  gallery: string[];
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: BilingualText;
  category: 'fencing' | 'civil' | 'mechanical' | 'security' | 'earthwork' | 'asphalt';
  categoryLabel: BilingualText;
  caption: BilingualText;
}

export interface ClientLogo {
  id: string;
  name: BilingualText;
  sector: 'energy' | 'vision2030' | 'industrial';
  logo: string;
}

export interface ManpowerCategory {
  id: string;
  number: string;
  title: BilingualText;
  roles: { en: string[]; ar: string[] };
}

export interface JobOpening {
  id: string;
  title: BilingualText;
  department: BilingualText;
  location: BilingualText;
  type: BilingualText;
  requirements: BilingualText;
}

export const SERVICE_DIVISIONS: ServiceDivision[] = [
  {
    id: 'fencing',
    number: '01',
    title: { en: 'Fencing Services', ar: 'خدمات السياج الأمني والمحيطي' },
    shortDesc: {
      en: 'Saudi Aramco Type 1–5 fencing, Sea Port Class 1 & 4 security barriers, AVB, guard houses, and temporary perimeters.',
      ar: 'سياج أرامكو السعودية (الأنواع 1 إلى 5)، سياج الموانئ البحرية الأمني، الحواجز المضادة للمركبات، وغرف الحراسة.',
    },
    fullDesc: {
      en: 'Securing your perimeters with engineering precision. Our fencing solutions blend practicality, durability, and strict compliance with Saudi Aramco and Sea Port security specifications across industrial, commercial, and sensitive sites.',
      ar: 'نؤمّن محيط مشاريعكم بدقة هندسية عالية تجمع بين المتانة والامتثال التام لمواصفات أرامكو السعودية وهيئة الموانئ في المواقع الصناعية والتجارية والحساسة.',
    },
    highlights: {
      en: [
        'Saudi Aramco Approved Fence Systems (Type 1, Type 2, Type 3, Type 4 & Type 5)',
        'Sea Port Security Fence (Class 1, Class 4, Anti-Vehicle Barriers & Guard Houses)',
        'Perimeter & boundary fencing for construction sites and industrial plants',
        'Quick-install temporary fencing for short-term works and project boundaries',
        'High-security concertina razor-wire & custom residential/commercial designs',
      ],
      ar: [
        'أنظمة سياج أرامكو السعودية المعتمدة (النوع 1، 2، 3، 4، و5)',
        'السياج الأمني للموانئ البحرية (الفئة 1، الفئة 4، مصدات المركبات، وغرف الحراسة)',
        'تسييج المحيط والحدود لمواقع البناء والمنشآت الصناعية',
        'سياج مؤقت سريع التركيب للمشاريع قصيرة الأجل والفعاليات',
        'سياج عالي الأمان مع أسلاك شائكة وحلول مخصصة للمشاريع السكنية والتجارية',
      ],
    },
    standards: {
      en: '100% compliant with Saudi Aramco & Sea Port Security Standards',
      ar: 'متوافق 100% مع معايير أرامكو السعودية وأمن الموانئ البحرية',
    },
    image: '/images/pdf_extracted/img_493_768x576.jpg',
    gallery: [
      '/images/pdf_extracted/img_493_768x576.jpg',
      '/images/pdf_extracted/img_494_468x624.jpg',
      '/images/pdf_extracted/img_495_554x640.jpg',
      '/images/pdf_extracted/img_496_480x640.jpg',
      '/images/pdf_extracted/img_497_546x728.jpg',
      '/images/pdf_extracted/img_498_468x624.jpg',
    ],
  },
  {
    id: 'security',
    number: '02',
    title: { en: 'Camera & Security Solutions', ar: 'حلول الكاميرات والأنظمة الأمنية' },
    shortDesc: {
      en: '24/7 construction site surveillance, PTZ progress monitoring, biometric access control, and cloud remote viewing.',
      ar: 'كاميرات مراقبة مواقع البناء 24/7، تتبع التقدم بتقنية الفاصل الزمني، أنظمة التحكم بالدخول، والمراقبة السحابية.',
    },
    fullDesc: {
      en: 'We deploy industrial-grade surveillance and access control systems engineered to safeguard materials, heavy equipment, and site personnel while giving stakeholders live remote visibility from any device.',
      ar: 'ننفذ أنظمة مراقبة وتحكم بالدخول عالية الاعتمادية لحماية المعدات والمواد والقوى العاملة، مع إتاحة المتابعة المباشرة عن بُعد من أي جهاز على مدار الساعة.',
    },
    highlights: {
      en: [
        '24/7 Construction Site Cameras safeguarding equipment, materials, and workforce',
        'High-definition time-lapse and live-feed progress monitoring cameras',
        'Cloud-based & mobile remote access systems accessible anywhere',
        'Smart AI motion detection, perimeter intrusion alerts, and site analytics',
        'Biometric & RFID access control gates for secure site entry management',
      ],
      ar: [
        'كاميرات مراقبة لمواقع الإنشاء على مدار 24 ساعة لحماية المواد والمعدات',
        'كاميرات توثيق تقدم الأعمال بدقة عالية والبث المباشر والفاصل الزمني',
        'أنظمة مراقبة سحابية عبر الجوال والويب من أي مكان',
        'تحليلات ذكية لكشف الحركة والتنبيهات الأمنية الفورية',
        'أنظمة التحكم بالدخول والبوابات الإلكترونية لتعزيز سلامة الموقع',
      ],
    },
    standards: {
      en: 'Hikvision TandemVu PTZ & Enterprise Biometric Access Integration',
      ar: 'تكامل كاميرات Hikvision TandemVu وأنظمة الدخول البيومترية',
    },
    image: '/images/pdf_extracted/flate_507_480x640.png',
    gallery: [
      '/images/pdf_extracted/flate_507_480x640.png',
      '/images/pdf_extracted/img_505_547x610.jpg',
      '/images/pdf_extracted/flate_503_611x719.png',
      '/images/pdf_extracted/flate_504_499x714.png',
      '/images/pdf_extracted/flate_506_480x640.png',
    ],
  },
  {
    id: 'mechanical',
    number: '03',
    title: { en: 'Mechanical, MEP & Steel Works', ar: 'الأعمال الميكانيكية والكهروميكانيكية والحديد' },
    shortDesc: {
      en: 'HVAC, plumbing & piping, firefighting networks, structural steel fabrication & erection, and scaffolding.',
      ar: 'أنظمة التكييف والسباكة والأنابيب، شبكات مكافحة الحريق، تصنيع وتركيب الهياكل الفولاذية، وأعمال السقالات.',
    },
    fullDesc: {
      en: 'Our mechanical engineering division delivers end-to-end MEP installations, custom structural steel fabrication, heavy equipment rigging, and certified scaffolding erection and dismantling across industrial and commercial developments.',
      ar: 'يقدم قسم الهندسة الميكانيكية خدمات متكاملة تشمل أنظمة التكييف والسباكة ومكافحة الحريق وتصنيع وتركيب الهياكل الفولاذية الثقيلة وتركيب وفك السقالات المعتمدة.',
    },
    highlights: {
      en: [
        'HVAC Systems installation, ducting, chillers & preventive maintenance',
        'Industrial & commercial plumbing, water supply, drainage & process piping',
        'Firefighting Systems — fire pumps, sprinkler networks & safety pipelines',
        'Structural Steel Fabrication, warehouse trusses & heavy equipment installation',
        'Certified Scaffolding Erection & Dismantling services from start to finish',
      ],
      ar: [
        'تركيب وصيانة أنظمة التكييف والتهوية والتبريد المركزي',
        'شبكات السباكة والتغذية والصرف والأنابيب للمشاريع الصناعية والتجارية',
        'أنظمة مكافحة الحريق — المضخات والرشاشات وخطوط السلامة',
        'تصنيع وتركيب الهياكل الفولاذية والمستودعات والمعدات الثقيلة',
        'خدمات تركيب وفك السقالات المعتمدة من البداية حتى التسليم',
      ],
    },
    standards: {
      en: 'International Safety & ASME / NFPA Compliance',
      ar: 'الالتزام بالمعايير الدولية للسلامة والجودة',
    },
    image: '/images/pdf_extracted/flate_397_1024x683.png',
    gallery: [
      '/images/pdf_extracted/flate_397_1024x683.png',
      '/images/pdf_extracted/flate_394_723x457.png',
      '/images/pdf_extracted/flate_395_677x506.png',
      '/images/pdf_extracted/flate_396_840x630.png',
      '/images/pdf_extracted/flate_405_1440x735.png',
      '/images/pdf_extracted/flate_407_665x800.png',
    ],
  },
  {
    id: 'trench',
    number: '04',
    title: { en: 'Trench Excavation', ar: 'أعمال حفر الخنادق والخدمات' },
    shortDesc: {
      en: 'Precision utility, foundation, stormwater drainage, and oil/gas pipeline trench excavation.',
      ar: 'حفر خنادق المرافق والمياه والكهرباء والاتصالات والأساسات وشبكات تصريف السيول وخطوط النفط والغاز.',
    },
    fullDesc: {
      en: 'With advanced excavating machinery and strict adherence to safety and environmental standards, our trenching teams execute utility, pipeline, foundation, and drainage trenches to exact engineering tolerances.',
      ar: 'بواسطة أحدث المعدات والالتزام الصارم بمعايير السلامة والبيئة، تنفذ فرقنا أعمال حفر الخنادق للخدمات وخطوط الأنابيب والأساسات وتصريف الأمطار بدقة هندسية عالية.',
    },
    highlights: {
      en: [
        'Utility Trenches for water, sewer, high-voltage power, and telecom conduits',
        'Foundation Trenches for structural footings and building substructures',
        'Drainage Trenches for stormwater and industrial wastewater management',
        'Pipeline Trenches for oil, gas, and petrochemical corridor installations',
      ],
      ar: [
        'خنادق المرافق لشبكات المياه والصرف والكهرباء والاتصالات',
        'خنادق الأساسات والقواعد الإنشائية للمباني والمنشآت',
        'خنادق تصريف مياه الأمطار وشبكات الصرف الصناعي',
        'خنادق خطوط أنابيب النفط والغاز والمشاريع البتروكيماوية',
      ],
    },
    image: '/images/pdf_extracted/img_431_480x640.jpg',
    gallery: [
      '/images/pdf_extracted/img_431_480x640.jpg',
      '/images/pdf_extracted/img_430_480x640.jpg',
      '/images/pdf_extracted/img_432_468x624.jpg',
      '/images/pdf_extracted/flate_416_1078x704.png',
    ],
  },
  {
    id: 'earthwork',
    number: '05',
    title: { en: 'Earth Work & Asphalt Paving', ar: 'الأعمال الترابية وأعمال السفلتة' },
    shortDesc: {
      en: 'Site clearing, rock cutting, grading & compaction, plus full-spectrum asphalt paving, resurfacing & road marking.',
      ar: 'تجهيز وتنظيف المواقع، قطع الصخور، التسوية والدمك، وأعمال السفلتة والرصف وإعادة التأهيل والتخطيط المروري.',
    },
    fullDesc: {
      en: 'We prepare the ground for enduring infrastructure—combining bulk earthmoving, precision grading, and soil stabilization with heavy-duty asphalt paving, resurfacing, patching, and road striping.',
      ar: 'نؤسس الأرضية المتينة لكل مشروع عبر أعمال الحفر والردم والتسوية ودمك التربة، متكاملة مع خدمات الرصف الأسفلتي وإعادة التأهيل والتخطيط المروري للطرق.',
    },
    highlights: {
      en: [
        'Land clearing, debris & unsuitable soil removal, and rock cutting',
        'Laser-accurate site grading, leveling, backfilling & soil compaction',
        'Hot-mix asphalt paving, heavy compaction, and sub-base preparation',
        'Asphalt resurfacing, overlay, structural patching & thermoplastic striping',
      ],
      ar: [
        'تنظيف المواقع وإزالة المخلفات والصخور والتربة غير الصالحة',
        'تسوية الأراضي والردم ودمك التربة لتأسيس قواعد مستقرة',
        'أعمال الرصف بالأسفلت الساخن والدمك وتجهيز الطبقات الأساسية',
        'إعادة سفلتة الطرق والترقيع والمعالجة وتخطيط المسارات المرورية',
      ],
    },
    image: '/images/pdf_extracted/img_421_840x630.jpg',
    gallery: [
      '/images/pdf_extracted/img_421_840x630.jpg',
      '/images/pdf_extracted/img_420_700x700.jpg',
      '/images/pdf_extracted/img_422_500x333.jpg',
      '/images/pdf_extracted/img_433_747x497.jpg',
    ],
  },
  {
    id: 'civil',
    number: '06',
    title: { en: 'Civil Construction Works', ar: 'الأعمال المدنية والإنشائية' },
    shortDesc: {
      en: 'Residential, commercial & RCC buildings, concrete channels, foundations, infrastructure, and turnkey renovations.',
      ar: 'تشييد المباني السكنية والتجارية والخرسانية، القنوات والمرافق، أعمال البنية التحتية، والترميم والصيانة.',
    },
    fullDesc: {
      en: 'From reinforced concrete utility corridors and industrial foundations to commercial and residential buildings, our civil division delivers structurally sound, durable construction on time and within budget.',
      ar: 'من القنوات الخرسانية والأساسات الصناعية إلى المباني التجارية والسكنية، ينفذ قسم الأعمال المدنية مشاريع متكاملة بأعلى معايير الجودة والالتزام بالجدول الزمني.',
    },
    highlights: {
      en: [
        'Residential, commercial, and mixed-use RCC building construction',
        'Infrastructure development — roads, pavements, concrete channels & utilities',
        'Structural concrete works, steel reinforcement, masonry & architectural finishing',
        'Facility renovation, structural restoration & ongoing civil maintenance',
      ],
      ar: [
        'بناء المنشآت السكنية والتجارية والمباني الخرسانية المسلحة',
        'تطوير البنية التحتية — الطرق والأرصفة والقنوات الخرسانية والمرافق',
        'أعمال الخرسانة المسلحة والحدادة والبناء والتشطيبات المعمارية',
        'تجديد المنشآت وترميم الهياكل وأعمال الصيانة المدنية الشاملة',
      ],
    },
    image: '/images/pdf_extracted/img_345_480x640.jpg',
    gallery: [
      '/images/pdf_extracted/img_345_480x640.jpg',
      '/images/pdf_extracted/img_332_576x768.jpg',
      '/images/pdf_extracted/img_333_521x694.jpg',
      '/images/pdf_extracted/img_334_694x925.jpg',
      '/images/pdf_extracted/img_344_578x434.jpg',
      '/images/pdf_extracted/img_346_640x480.jpg',
    ],
  },
  {
    id: 'manpower',
    number: '07',
    title: { en: 'Manpower, Rental & Camp Catering', ar: 'توريد القوى العاملة وتأجير المعدات والتموين' },
    shortDesc: {
      en: '500+ Aramco/TUV/SAP certified workforce, heavy equipment & vehicle fleet rental, and industrial camp catering.',
      ar: 'أكثر من 500 عامل وفني معتمد من أرامكو وTUV، تأجير المعدات والآليات الثقيلة، وخدمات التموين للمخيمات والمواقع.',
    },
    fullDesc: {
      en: 'Injaz Builders maintains a workforce of 500+ Aramco-certified, SAP, and TUV-approved professionals, backed by a comprehensive heavy machinery rental fleet and industrial catering operations for camps and project sites.',
      ar: 'نوفر أكثر من 500 كادر مؤهل ومعتمد من أرامكو السعودية وTUV وSAP، مدعومين بأسطول متكامل من المعدات الثقيلة وخدمات التموين الغذائي لمخيمات العمل والمشاريع.',
    },
    highlights: {
      en: [
        '500+ certified engineers, safety officers, civil, mechanical & 6G/3G welders',
        'Heavy Equipment Rental: Excavators, Graders, Dozers, Cranes, Loaders & Tankers',
        'Utility & Transport Fleet: Pickup trucks, dump trucks, buses & scissor lifts',
        'Corporate & Workforce Catering Service: tailored meals from hard hats to executives',
      ],
      ar: [
        'أكثر من 500 مهندس وضابط سلامة وفنيي مدني وميكانيكا ولحامين 6G/3G معتمدين',
        'تأجير المعدات الثقيلة: الحفارات، الجريدرات، البلدوزرات، الرافعات، والشيولات',
        'مركبات النقل والخدمات: شاحنات القلاب، الباصات، الرافعات المقصية، وصهاريج المياه',
        'خدمات التموين والإعاشة: وجبات متوازنة وعالية الجودة للعمال والكوادر الإدارية',
      ],
    },
    image: '/images/pdf_extracted/img_433_747x497.jpg',
    gallery: [
      '/images/pdf_extracted/img_433_747x497.jpg',
      '/images/pdf_extracted/flate_416_1078x704.png',
      '/images/pdf_extracted/img_406_1000x563.jpg',
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'crcc-rc',
    title: {
      en: 'Royal Commission Civil & Utility Corridor',
      ar: 'ممر المرافق والأعمال المدنية — الهيئة الملكية',
    },
    client: {
      en: 'China Railway Construction Company (CRCC)',
      ar: 'شركة السكك الحديدية الصينية للإنشاءات (مشروع الهيئة الملكية)',
    },
    location: { en: 'Jubail Industrial City, KSA', ar: 'مدينة الجبيل الصناعية، السعودية' },
    category: 'civil',
    categoryLabel: { en: 'Civil Works', ar: 'الأعمال المدنية' },
    status: { en: 'Completed', ar: 'مكتمل' },
    summary: {
      en: 'Executed reinforced concrete utility trenches, steel rebar formwork, concrete pouring, and road pavement restoration across the Royal Commission corridor.',
      ar: 'تنفيذ خنادق المرافق الخرسانية المسلحة، أعمال التسليح والشدات، صب الخرسانة، وإعادة تأهيل الطرق ضمن نطاق الهيئة الملكية.',
    },
    scope: {
      en: ['RCC utility trenches & concrete channels', 'Rebar tying, shuttering & precision finishing', 'Utility conduit bedding & compaction'],
      ar: ['خنادق وقنوات المرافق الخرسانية المسلحة', 'أعمال التسليح والنجارة والتشطيب الدقيق', 'تمديد الكابلات والدمك طبقاً للمواصفات'],
    },
    image: '/images/pdf_extracted/img_334_694x925.jpg',
    gallery: [
      '/images/pdf_extracted/img_334_694x925.jpg',
      '/images/pdf_extracted/img_332_576x768.jpg',
      '/images/pdf_extracted/img_345_480x640.jpg',
      '/images/pdf_extracted/img_346_640x480.jpg',
    ],
  },
  {
    id: 'seaport-aramco-fence',
    title: {
      en: 'Saudi Aramco & Sea Port High-Security Fencing',
      ar: 'سياج أرامكو السعودية والأمني للموانئ البحرية',
    },
    client: {
      en: 'Saudi Aramco & Sea Port Authorities (Via EPC Partners)',
      ar: 'أرامكو السعودية والموانئ البحرية (عبر شركاء المقاولات)',
    },
    location: { en: 'Eastern Province & Yanbu, KSA', ar: 'المنطقة الشرقية وينبع، السعودية' },
    category: 'fencing',
    categoryLabel: { en: 'High-Security Fencing', ar: 'السياج الأمني' },
    status: { en: 'Completed & Ongoing', ar: 'مكتمل ومستمر' },
    summary: {
      en: 'Turnkey supply and installation of Saudi Aramco Type 1–5 fences and Sea Port Class 1 & Class 4 security perimeters including concrete mast footings, AVBs, and guard houses.',
      ar: 'توريد وتركيب سياج أرامكو (الأنواع 1–5) وسياج الموانئ الفئة 1 و4 متضمناً القواعد الخرسانية وأعمدة الإنارة ومصدات المركبات وغرف الحراسة.',
    },
    scope: {
      en: ['Saudi Aramco Type 1, 2, 3, 4 & 5 Perimeter Fencing', 'Sea Port Security Fence Class 1 & Class 4 + AVB', 'Guard houses, concertina razor wire & mast footings'],
      ar: ['سياج أرامكو المعتمد من النوع 1 حتى النوع 5', 'سياج الموانئ الفئة 1 و4 ومصدات المركبات', 'غرف الحراسة والأسلاك الشائكة والقواعد الخرسانية'],
    },
    image: '/images/pdf_extracted/img_493_768x576.jpg',
    gallery: [
      '/images/pdf_extracted/img_493_768x576.jpg',
      '/images/pdf_extracted/img_494_468x624.jpg',
      '/images/pdf_extracted/img_497_546x728.jpg',
      '/images/pdf_extracted/img_496_480x640.jpg',
    ],
  },
  {
    id: 'eppm-marafiq',
    title: {
      en: 'Marafiq Industrial Piping & Mechanical Package',
      ar: 'أعمال الميكانيكا والأنابيب — مشروع مرافق',
    },
    client: {
      en: 'EPPM / Al Dossary (Marafiq, SABIC, YANSAB, YANPET, YASREF)',
      ar: 'EPPM / الدوسري (مشاريع مرافق، سابك، ينساب، ينبت، ياسرف)',
    },
    location: { en: 'Jubail & Yanbu, KSA', ar: 'الجبيل وينبع، السعودية' },
    category: 'mechanical',
    categoryLabel: { en: 'Mechanical & Steel', ar: 'الأعمال الميكانيكية' },
    status: { en: 'Completed', ar: 'مكتمل' },
    summary: {
      en: 'Executed structural steel fabrication and erection, industrial piping, firefighting pump networks, HVAC installations, and certified manpower deployment across major petrochemical facilities.',
      ar: 'تنفيذ تصنيع وتركيب الهياكل الفولاذية والأنابيب الصناعية وشبكات مكافحة الحريق والتكييف وتوفير الكوادر المعتمدة في كبرى المنشآت البتروكيماوية.',
    },
    scope: {
      en: ['Structural steel erection & rigging', 'Process piping, HVAC & firefighting pipelines', 'Aramco-certified 6G welders & mechanical crews'],
      ar: ['تركيب الهياكل الفولاذية والرافعات', 'تمديد الأنابيب والتكييف وشبكات الحريق', 'فنيو لحام 6G وكوادر ميكانيكية معتمدة'],
    },
    image: '/images/pdf_extracted/flate_397_1024x683.png',
    gallery: [
      '/images/pdf_extracted/flate_397_1024x683.png',
      '/images/pdf_extracted/flate_394_723x457.png',
      '/images/pdf_extracted/flate_405_1440x735.png',
      '/images/pdf_extracted/flate_407_665x800.png',
    ],
  },
  {
    id: 'farabi-yanbu',
    title: {
      en: 'Farabi Petrochemical Site Prep & Trenching',
      ar: 'تجهيز الموقع وحفر الخنادق — مشروع الفارابي للبتروكيماويات',
    },
    client: {
      en: 'Larsen & Toubro (L&T) — Farabi Petrochemical Project',
      ar: 'لارسن آند توبرو (L&T) — مشروع الفارابي للبتروكيماويات ينبع',
    },
    location: { en: 'Yanbu Industrial City, KSA', ar: 'مدينة ينبع الصناعية، السعودية' },
    category: 'earthwork',
    categoryLabel: { en: 'Earthwork & Trenching', ar: 'الأعمال الترابية والخنادق' },
    status: { en: 'Completed', ar: 'مكتمل' },
    summary: {
      en: 'Delivered bulk earthmoving, motor-grader site leveling, deep utility and power-cable trench excavation, and asphalt road surfacing for heavy industrial access.',
      ar: 'تنفيذ أعمال الحفر والردم وتسوية المواقع بالجريدرات وحفر خنادق الكابلات والأنابيب العميقة وسفلتة الطرق الصناعية.',
    },
    scope: {
      en: ['Bulk earthmoving, soil compaction & grading', 'High-voltage cable & industrial utility trenching', 'Heavy-duty asphalt paving & road marking'],
      ar: ['أعمال القطع والردم ودمك وتسوية التربة', 'حفر خنادق كابلات الجهد العالي والمرافق', 'سفلتة الطرق الثقيلة والتخطيط المروري'],
    },
    image: '/images/pdf_extracted/img_421_840x630.jpg',
    gallery: [
      '/images/pdf_extracted/img_421_840x630.jpg',
      '/images/pdf_extracted/img_433_747x497.jpg',
      '/images/pdf_extracted/img_431_480x640.jpg',
      '/images/pdf_extracted/img_420_700x700.jpg',
    ],
  },
  {
    id: 'azmeel-daylim-yasref',
    title: {
      en: 'YASREF Housing & Surveillance Infrastructure',
      ar: 'البنية التحتية السكنية والأنظمة الأمنية — ياسرف ينبع',
    },
    client: {
      en: 'Azmeel Contracting & Daylim Punj Lloyd (YASREF)',
      ar: 'أزميل للمقاولات ودايليم بونج لويد (مشروع ياسرف)',
    },
    location: { en: 'Yanbu, KSA', ar: 'ينبع، السعودية' },
    category: 'security',
    categoryLabel: { en: 'Security & Civil', ar: 'الأمن والإنشاءات' },
    status: { en: 'Completed', ar: 'مكتمل' },
    summary: {
      en: 'Integrated civil housing foundations, perimeter fencing, solar/mast PTZ surveillance camera poles, and biometric site access control terminals.',
      ar: 'تنفيذ الأساسات المدنية للمجمع السكني، السياج المحيطي، أعمدة كاميرات المراقبة PTZ، وبوابات التحكم البيومترية بالدخول.',
    },
    scope: {
      en: ['PTZ surveillance camera masts & remote cloud monitoring', 'Biometric access control & gate security integration', 'Residential civil & concrete finishing works'],
      ar: ['أعمدة كاميرات المراقبة PTZ والمراقبة السحابية', 'أنظمة التحكم البيومترية بالدخول والأمن', 'الأعمال المدنية والخرسانية للمباني السكنية'],
    },
    image: '/images/pdf_extracted/flate_507_480x640.png',
    gallery: [
      '/images/pdf_extracted/flate_507_480x640.png',
      '/images/pdf_extracted/img_505_547x610.jpg',
      '/images/pdf_extracted/flate_504_499x714.png',
      '/images/pdf_extracted/img_420_700x700.jpg',
    ],
  },
  {
    id: 'abaytona-khi',
    title: {
      en: 'KHI Heavy Industry Structural Steel & MEP',
      ar: 'الهياكل الفولاذية والأعمال الكهروميكانيكية — KHI للصناعات الثقيلة',
    },
    client: {
      en: 'Abaytona Contracting / MAMPCO / Al Fahad Contracting',
      ar: 'أبايتونا للمقاولات / مامبكو / الفهد للمقاولات',
    },
    location: { en: 'Eastern Province, KSA', ar: 'المنطقة الشرقية، السعودية' },
    category: 'mechanical',
    categoryLabel: { en: 'Industrial Steel & MEP', ar: 'الحديد والميكانيكا' },
    status: { en: 'Completed', ar: 'مكتمل' },
    summary: {
      en: 'Heavy structural steel hangar erection, crane-assisted rigging, industrial storage silos, and certified scaffolding & dismantling operations.',
      ar: 'تركيب الهناجر والهياكل الفولاذية الثقيلة، أعمال الرفع بالرافعات، الصوامع الصناعية، وخدمات السقالات المعتمدة.',
    },
    scope: {
      en: ['Multi-bay industrial steel structure erection', 'Heavy crane rigging & equipment installation', 'Certified scaffolding erection & dismantling'],
      ar: ['تركيب الهياكل الفولاذية متعددة الباكيات', 'أعمال الرافعات الثقيلة وتثبيت المعدات', 'تركيب وفك السقالات الصناعية المعتمدة'],
    },
    image: '/images/pdf_extracted/flate_395_677x506.png',
    gallery: [
      '/images/pdf_extracted/flate_395_677x506.png',
      '/images/pdf_extracted/flate_396_840x630.png',
      '/images/pdf_extracted/img_406_1000x563.jpg',
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    src: '/images/pdf_extracted/img_493_768x576.jpg',
    title: { en: 'High-Security Perimeter Fence & Concertina Wire', ar: 'سياج محيطي عالي الأمان مع أسلاك شائكة' },
    category: 'fencing',
    categoryLabel: { en: 'Fencing', ar: 'السياج الأمني' },
    caption: { en: 'Saudi Aramco & Industrial Type mesh perimeter installation with triple-coil razor wire.', ar: 'تركيب سياج شبكي عالي الأمان مطابق لمواصفات أرامكو مع أسلاك شائكة.' },
  },
  {
    id: 'g2',
    src: '/images/pdf_extracted/img_494_468x624.jpg',
    title: { en: 'Coastal Sea Port Security Fence Line', ar: 'خط السياج الأمني الساحلي للموانئ' },
    category: 'fencing',
    categoryLabel: { en: 'Fencing', ar: 'السياج الأمني' },
    caption: { en: 'Sea Port Class 1 & Class 4 coastal security boundary engineered for marine corrosion resistance.', ar: 'سياج الموانئ البحرية الفئة 1 و4 مقاوم للتآكل البحري.' },
  },
  {
    id: 'g3',
    src: '/images/pdf_extracted/img_497_546x728.jpg',
    title: { en: 'Concrete Mast Footing & Dual Security Barrier', ar: 'قواعد أعمدة الإنارة والسياج الأمني المزدوج' },
    category: 'fencing',
    categoryLabel: { en: 'Fencing', ar: 'السياج الأمني' },
    caption: { en: 'Pre-cast & poured concrete footings integrated along high-security perimeter fencing.', ar: 'قواعد خرسانية لأعمدة المراقبة والإنارة بمحاذاة السياج الأمني.' },
  },
  {
    id: 'g4',
    src: '/images/pdf_extracted/img_496_480x640.jpg',
    title: { en: 'Field Crew Aligning Security Pole Base', ar: 'فريق الموقع يثبت قاعدة عمود المراقبة' },
    category: 'fencing',
    categoryLabel: { en: 'Fencing', ar: 'السياج الأمني' },
    caption: { en: 'Precision alignment and concrete anchoring by Injaz Builders site crew.', ar: 'تثبيت ومحاذاة دقيقة للقواعد الخرسانية بواسطة فريق إنجاز.' },
  },
  {
    id: 'g5',
    src: '/images/pdf_extracted/flate_507_480x640.png',
    title: { en: 'Night-Vision PTZ Surveillance Camera Mast', ar: 'برج كاميرا مراقبة PTZ للرؤية الليلية' },
    category: 'security',
    categoryLabel: { en: 'Security Systems', ar: 'الأنظمة الأمنية' },
    caption: { en: 'Perimeter-mounted PTZ camera mast providing 24/7 live monitoring along razor-wire boundaries.', ar: 'عمود مراقبة مزود بكاميرات PTZ لتأمين المحيط على مدار الساعة.' },
  },
  {
    id: 'g6',
    src: '/images/pdf_extracted/img_505_547x610.jpg',
    title: { en: 'Hikvision TandemVu PTZ Camera Systems', ar: 'أنظمة كاميرات Hikvision TandemVu PTZ' },
    category: 'security',
    categoryLabel: { en: 'Security Systems', ar: 'الأنظمة الأمنية' },
    caption: { en: 'Dual-lens panoramic and optical zoom surveillance hardware for large-scale construction sites.', ar: 'كاميرات مراقبة ثنائية العدسة للمساحات الإنشائية الواسعة.' },
  },
  {
    id: 'g7',
    src: '/images/pdf_extracted/flate_397_1024x683.png',
    title: { en: 'Structural Steel Truss Erection', ar: 'تركيب الجملونات والهياكل الفولاذية' },
    category: 'mechanical',
    categoryLabel: { en: 'Mechanical & Steel', ar: 'الميكانيكا والحديد' },
    caption: { en: 'Certified steel erectors assembling overhead structural trusses under strict safety harness protocols.', ar: 'مهندسو وفنيو تركيب الحديد أثناء تجميع الهياكل الفولاذية وفق أعلى معايير السلامة.' },
  },
  {
    id: 'g8',
    src: '/images/pdf_extracted/flate_395_677x506.png',
    title: { en: 'Industrial Steel Warehouse Erection', ar: 'تشييد المستودعات الفولاذية الصناعية' },
    category: 'mechanical',
    categoryLabel: { en: 'Mechanical & Steel', ar: 'الميكانيكا والحديد' },
    caption: { en: 'Multi-crane structural steel portal frame erection for industrial logistics facility.', ar: 'رفع وتركيب الهياكل الحديدية للمستودعات الصناعية باستخدام الرافعات المتعددة.' },
  },
  {
    id: 'g9',
    src: '/images/pdf_extracted/flate_405_1440x735.png',
    title: { en: 'Industrial MEP & Process Piping Design', ar: 'تصميم وتمديد أنظمة الأنابيب والميكانيكا' },
    category: 'mechanical',
    categoryLabel: { en: 'Mechanical & Steel', ar: 'الميكانيكا والحديد' },
    caption: { en: 'Complex mechanical plant piping, valves, pumping skids, and HVAC integration.', ar: 'تنفيذ شبكات الأنابيب الصناعية والمضخات وأنظمة التكييف المركزي.' },
  },
  {
    id: 'g10',
    src: '/images/pdf_extracted/img_332_576x768.jpg',
    title: { en: 'Civil Engineering Rebar Trench Inspection', ar: 'فحص حديد التسليح في خنادق المرافق المدنية' },
    category: 'civil',
    categoryLabel: { en: 'Civil Works', ar: 'الأعمال المدنية' },
    caption: { en: 'Site safety engineers supervising reinforcement cage installation inside utility channel.', ar: 'مهندسو السلامة والموقع أثناء الإشراف على أعمال التسليح داخل القنوات الخرسانية.' },
  },
  {
    id: 'g11',
    src: '/images/pdf_extracted/img_334_694x925.jpg',
    title: { en: 'Concrete Utility Channel Formwork', ar: 'الشدات الخشبية والمعدنية لقنوات المرافق' },
    category: 'civil',
    categoryLabel: { en: 'Civil Works', ar: 'الأعمال المدنية' },
    caption: { en: 'Long-span linear formwork and reinforcement corridor engineered to Royal Commission standards.', ar: 'تنفيذ شدات القنوات الخرسانية الممتدة وفق مواصفات الهيئة الملكية.' },
  },
  {
    id: 'g12',
    src: '/images/pdf_extracted/img_345_480x640.jpg',
    title: { en: 'Concrete Pouring & Trowel Finishing', ar: 'صب وتشطيب القنوات الخرسانية' },
    category: 'civil',
    categoryLabel: { en: 'Civil Works', ar: 'الأعمال المدنية' },
    caption: { en: 'Dedicated civil crew executing concrete placement and smooth surface finishing.', ar: 'فريق الأعمال المدنية أثناء صب وتسوية السطح الخرساني.' },
  },
  {
    id: 'g13',
    src: '/images/pdf_extracted/img_421_840x630.jpg',
    title: { en: 'Vögele Asphalt Paver & Road Compaction', ar: 'رصف الطرق بالفرادة الأسفلتية الحديثة' },
    category: 'asphalt',
    categoryLabel: { en: 'Asphalt Work', ar: 'أعمال السفلتة' },
    caption: { en: 'Full-width hot-mix asphalt paving operation with tandem dump feed.', ar: 'تنفيذ أعمال الرصف الأسفلتي الساخن للطرق والمحاور الرئيسية.' },
  },
  {
    id: 'g14',
    src: '/images/pdf_extracted/img_420_700x700.jpg',
    title: { en: 'Completed Multi-Lane Asphalt Boulevard', ar: 'طريق أسفلتي مكتمل مع أعمدة الإنارة' },
    category: 'asphalt',
    categoryLabel: { en: 'Asphalt Work', ar: 'أعمال السفلتة' },
    caption: { en: 'Finished roadway surface ready for striping, lighting, and industrial traffic.', ar: 'طريق حديث مكتمل السفلتة وجاهز للتخطيط والإنارة.' },
  },
  {
    id: 'g15',
    src: '/images/pdf_extracted/img_433_747x497.jpg',
    title: { en: 'CAT Motor Grader Bulk Earthworks', ar: 'تسوية الأراضي بالجريدر الثقيل' },
    category: 'earthwork',
    categoryLabel: { en: 'Earth Works', ar: 'الأعمال الترابية' },
    caption: { en: 'Precision sub-grade leveling and soil compaction for stable project foundations.', ar: 'أعمال التسوية والدمك الميكانيكي لتجهيز أساسات المشاريع.' },
  },
  {
    id: 'g16',
    src: '/images/pdf_extracted/flate_416_1078x704.png',
    title: { en: 'Heavy Excavator & Wheel Loader Fleet', ar: 'أسطول الحفارات والشيولات في الموقع' },
    category: 'earthwork',
    categoryLabel: { en: 'Earth Works', ar: 'الأعمال الترابية' },
    caption: { en: 'Multi-unit earthmoving and deep trench excavation operations.', ar: 'عمليات الحفر العميق ونقل الأتربة بأسطول المعدات الثقيلة.' },
  },
  {
    id: 'g17',
    src: '/images/pdf_extracted/img_430_480x640.jpg',
    title: { en: 'Underground Utility Conduit Trenching', ar: 'حفر خنادق الكابلات والمرافق الأرضية' },
    category: 'earthwork',
    categoryLabel: { en: 'Earth Works', ar: 'الأعمال الترابية' },
    caption: { en: 'Color-coded utility power and communication ducts laid in precision-cut trenches.', ar: 'تمديد مسارات كابلات الطاقة والاتصالات في خنادق مجهزة.' },
  },
  {
    id: 'g18',
    src: '/images/pdf_extracted/img_432_468x624.jpg',
    title: { en: 'High-Voltage Cable Drum & Trench Laying', ar: 'سحب وتمديد كابلات الجهد العالي' },
    category: 'earthwork',
    categoryLabel: { en: 'Earth Works', ar: 'الأعمال الترابية' },
    caption: { en: 'Heavy cable pulling operation alongside perimeter security fence line.', ar: 'أعمال سحب وتمديد الكابلات الثقيلة بمحاذاة السياج الأمني.' },
  },
];

export const CLIENTS_DATA: ClientLogo[] = [
  { id: 'aramco', name: { en: 'Saudi Aramco', ar: 'أرامكو السعودية' }, sector: 'energy', logo: '/images/clients/aramco.png' },
  { id: 'sabic', name: { en: 'SABIC', ar: 'سابك' }, sector: 'energy', logo: '/images/clients/sabic.png' },
  { id: 'pif', name: { en: 'Public Investment Fund', ar: 'صندوق الاستثمارات العامة' }, sector: 'vision2030', logo: '/images/clients/pif.png' },
  { id: 'neom', name: { en: 'NEOM', ar: 'نيوم' }, sector: 'vision2030', logo: '/images/clients/neom.png' },
  { id: 'maaden', name: { en: 'Ma’aden', ar: 'معادن' }, sector: 'energy', logo: '/images/clients/maaden.png' },
  { id: 'kaust', name: { en: 'KAUST', ar: 'جامعة الملك عبدالله للعلوم والتقنية' }, sector: 'vision2030', logo: '/images/clients/kaust_text.png' },
  { id: 'hadeed', name: { en: 'Hadeed SABIC', ar: 'حديد سابك' }, sector: 'industrial', logo: '/images/clients/hadeed.png' },
  { id: 'kafd', name: { en: 'KAFD', ar: 'مركز الملك عبدالله المالي' }, sector: 'vision2030', logo: '/images/clients/kafd.png' },
  { id: 'amaala', name: { en: 'AMAALA', ar: 'أمالا' }, sector: 'vision2030', logo: '/images/clients/amaala.png' },
  { id: 'tahakom', name: { en: 'Tahakom', ar: 'تحكم' }, sector: 'vision2030', logo: '/images/clients/tahakom.png' },
  { id: 'matarat', name: { en: 'Matarat Holding', ar: 'مطارات القابضة' }, sector: 'vision2030', logo: '/images/clients/matarat.png' },
  { id: 'roshn', name: { en: 'ROSHN', ar: 'روشن' }, sector: 'vision2030', logo: '/images/clients/roshn.png' },
  { id: 'seven', name: { en: 'Saudi Entertainment Ventures', ar: 'مشاريع الترفيه السعودية' }, sector: 'vision2030', logo: '/images/clients/seven.png' },
  { id: 'redsea', name: { en: 'The Red Sea Development', ar: 'البحر الأحمر للتطوير' }, sector: 'vision2030', logo: '/images/clients/redsea.png' },
  { id: 'qiddiya', name: { en: 'Qiddiya', ar: 'القدية' }, sector: 'vision2030', logo: '/images/clients/qiddiya.png' },
  { id: 'nhc', name: { en: 'NHC Housing Services', ar: 'الوطنية للإسكان' }, sector: 'vision2030', logo: '/images/clients/nhc.png' },
  { id: 'chevron', name: { en: 'Saudi Arabian Chevron', ar: 'شيفرون العربية السعودية' }, sector: 'energy', logo: '/images/clients/chevron.png' },
  { id: 'sinopec', name: { en: 'SINOPEC', ar: 'سينوبك' }, sector: 'energy', logo: '/images/clients/sinopec.png' },
  { id: 'albayroni', name: { en: 'Albayroni (SABIC)', ar: 'البيروني' }, sector: 'energy', logo: '/images/clients/albayroni.png' },
  { id: 'advanced', name: { en: 'Advanced Petrochemical', ar: 'المتقدمة للبتروكيماويات' }, sector: 'energy', logo: '/images/clients/advanced.png' },
  { id: 'aldrees', name: { en: 'Aldrees', ar: 'الدريس' }, sector: 'industrial', logo: '/images/clients/aldrees.png' },
  { id: 'alargan', name: { en: 'Alargan', ar: 'الأرجان' }, sector: 'industrial', logo: '/images/clients/alargan.png' },
  { id: 'aasia', name: { en: 'Aasia Steel', ar: 'آسيا للصلب' }, sector: 'industrial', logo: '/images/clients/aasia.png' },
  { id: 'snam', name: { en: 'SNAM', ar: 'سنام' }, sector: 'industrial', logo: '/images/clients/snam.png' },
  { id: 'extra', name: { en: 'eXtra', ar: 'اكسترا' }, sector: 'industrial', logo: '/images/clients/extra.png' },
];

export const EPC_CONTRACTORS = [
  { nameEn: 'China Railway Construction Company (CRCC)', nameAr: 'شركة السكك الحديدية الصينية (CRCC)', projectEn: 'Royal Commission (RC) Project', projectAr: 'مشروع الهيئة الملكية' },
  { nameEn: 'MAMPCO Contracting', nameAr: 'شركة مامبكو للمقاولات', projectEn: 'Industrial & Civil Works', projectAr: 'أعمال صناعية ومدنية' },
  { nameEn: 'Abaytona Contracting', nameAr: 'شركة أبايتونا للمقاولات', projectEn: 'KHI Heavy Industry', projectAr: 'مشروع KHI للصناعات الثقيلة' },
  { nameEn: 'EPPM Contracting', nameAr: 'شركة EPPM للمقاولات', projectEn: 'Marafiq Project', projectAr: 'مشروع مرافق' },
  { nameEn: 'Al Fahad Contracting', nameAr: 'شركة الفهد للمقاولات', projectEn: 'Infrastructure & Fencing', projectAr: 'البنية التحتية والسياج' },
  { nameEn: 'Al Dossary Contracting', nameAr: 'شركة الدوسري للمقاولات', projectEn: 'Marafiq, SABIC, YANSAB, YANPET, YASREF', projectAr: 'مشاريع مرافق، سابك، ينساب، ينبت، ياسرف' },
  { nameEn: 'Larsen & Toubro (L&T)', nameAr: 'لارسن آند توبرو (L&T)', projectEn: 'Farabi Petrochemical Project, Yanbu', projectAr: 'مشروع الفارابي للبتروكيماويات — ينبع' },
  { nameEn: 'Azmeel Contracting', nameAr: 'شركة أزميل للمقاولات', projectEn: 'Yanbu YASREF Housing', projectAr: 'إسكان ياسرف — ينبع' },
  { nameEn: 'Daylim Punj Lloyd Construction Co.', nameAr: 'دايليم بونج لويد للإنشاءات', projectEn: 'YASREF Refinery & Infrastructure', projectAr: 'مصفاة ومشاريع ياسرف' },
];

export const MANPOWER_CATEGORIES: ManpowerCategory[] = [
  {
    id: 'engineers',
    number: '01',
    title: { en: 'Project Engineers', ar: 'مهندسو المشاريع' },
    roles: {
      en: ['Civil Project Engineers', 'Electrical Engineers', 'Mechanical Engineers'],
      ar: ['مهندسون مدنيون', 'مهندسو كهرباء', 'مهندسو ميكانيكا'],
    },
  },
  {
    id: 'safety',
    number: '02',
    title: { en: 'HSE & Safety Team', ar: 'فريق الصحة والسلامة المهنية' },
    roles: {
      en: ['Safety Engineers', 'Safety Supervisors', 'Safety Inspectors', 'Safety Officers'],
      ar: ['مهندسو سلامة', 'مشرفو سلامة', 'مفتشو سلامة', 'ضباط سلامة'],
    },
  },
  {
    id: 'admin',
    number: '03',
    title: { en: 'Site Administration', ar: 'الإدارة الميدانية' },
    roles: {
      en: ['Executive & Office Secretaries', 'Accountants & Payroll Clerks', 'Timekeepers & Camp Coordinators', 'Storekeepers, Purchasers & ID Makers'],
      ar: ['سكرتارية تنفيذية ومكتبية', 'محاسبون ومسؤولو رواتب', 'مراقبو دوام ومنسقو مخيمات', 'أمناء مستودعات ومشتريات'],
    },
  },
  {
    id: 'civil-crew',
    number: '04',
    title: { en: 'Civil & Finishing Crew', ar: 'الكوادر المدنية والتشطيب' },
    roles: {
      en: ['Coating Supervisors & Inspectors', 'Civil Supervisors, Foremen & Surveyors', 'Plastering & Block Masons, Painters', 'Sand Blasters, Shuttering & Finishing Carpenters, Steelfixers'],
      ar: ['مشرفو ومفتشو الطلاء والعزل', 'مشرفو مدني ومراقبون ومساحون', 'بناؤون ومليسّون ودهانون', 'فنيو السفع الرملي والنجارون والحدادون'],
    },
  },
  {
    id: 'mech-crew',
    number: '05',
    title: { en: 'Mechanical & Piping', ar: 'الكوادر الميكانيكية والأنابيب' },
    roles: {
      en: ['Mechanical Supervisors, Inspectors & Foremen', 'Piping, Fabrication & Instrumentation Foremen', 'Pipe Fabricators, Pipe Fitters & Instrument Techs', 'HVAC Techs, Steel Fabricators, Scaffolders, Riggers & Plumbers'],
      ar: ['مشرفو ومفتشو ومراقبو الميكانيكا', 'مراقبو الأنابيب والتصنيع والأجهزة الدقيقة', 'فنيو أنابيب وأجهزة دقيقة وتكييف', 'مركبو سقالات ورافعات وسباكون'],
    },
  },
  {
    id: 'welders',
    number: '06',
    title: { en: 'Certified Welders', ar: 'اللحامون المعتمدون' },
    roles: {
      en: ['Welding Inspectors', 'TIG Welders', 'MIG Welders', '6G Certified Welders', '3G Certified Welders'],
      ar: ['مفتشو لحام', 'لحامو TIG', 'لحامو MIG', 'لحامون معتمدون 6G', 'لحامون معتمدون 3G'],
    },
  },
  {
    id: 'operators',
    number: '07',
    title: { en: 'Heavy Operators & Drivers', ar: 'المشغلون والسائقون المعتمدون' },
    roles: {
      en: ['Grader, Roller, Dozer & Backhoe Operators', 'TUV-Certified Crane, Loader, Forklift & Side-Boom Operators', 'Dump Trailer, Boom Truck & Dump Truck Drivers', 'Water, Vacuum & Oil Tanker Drivers, Bus & Service Drivers'],
      ar: ['مشغلو جريدر ورصاصات وبلدوزر وباكهو', 'مشغلو رافعات TUV وشيولات ورافعات شوكية', 'سائقو قلابات وشاحنات بوم ومقطورات', 'سائقو صهاريج مياه ووقود وحافلات نقل'],
    },
  },
];

export const HEAVY_EQUIPMENT_FLEET = [
  { en: 'Excavators, Graders & Loaders', ar: 'الحفارات والجريدرات والشيولات' },
  { en: 'Bulldozers & Track/Compact Pavers', ar: 'البلدوزرات وفرادات الأسفلت' },
  { en: 'Backhoes, Vibratory Compactors & Telehandlers', ar: 'الحفارات الخلفية والرصاصات والرافعات التلسكوبية' },
  { en: 'Mobile, Tower & Crawler Cranes', ar: 'الرافعات المتحركة والبرجية والمجنزرة' },
  { en: 'Dump Trucks, Scissor Lifts & Man Lifts', ar: 'شاحنات القلاب والرافعات المقصية' },
  { en: 'Skid Steer Loaders, Forklifts & Lowbed Trailers', ar: 'معدات البوبكات والرافعات الشوكية واللوبد' },
  { en: 'Pickup Trucks, Service Trucks, Utility Vans & Water Tankers', ar: 'مركبات الخدمة والبيك أب وصهاريج المياه' },
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'civil-eng',
    title: { en: 'Civil Project Engineer (Aramco / RC)', ar: 'مهندس مشاريع مدنية (أرامكو / الهيئة الملكية)' },
    department: { en: 'Civil & Infrastructure', ar: 'الأعمال المدنية والبنية التحتية' },
    location: { en: 'Al Jubail / Yanbu, KSA', ar: 'الجبيل / ينبع، السعودية' },
    type: { en: 'Full-Time · Site Based', ar: 'دوام كامل · ميداني' },
    requirements: {
      en: 'B.Sc. in Civil Engineering, 5+ years KSA industrial/RC experience, SCE accreditation.',
      ar: 'بكالوريوس هندسة مدنية، خبرة +5 سنوات في مشاريع الهيئة الملكية أو أرامكو، اعتماد الهيئة السعودية للمهندسين.',
    },
  },
  {
    id: 'safety-officer',
    title: { en: 'HSE Safety Officer (NEBOSH / Aramco)', ar: 'ضابط سلامة مهنية (NEBOSH / أرامكو)' },
    department: { en: 'Health, Safety & Environment', ar: 'الصحة والسلامة والبيئة' },
    location: { en: 'Eastern Province, KSA', ar: 'المنطقة الشرقية، السعودية' },
    type: { en: 'Full-Time · Site Based', ar: 'دوام كامل · ميداني' },
    requirements: {
      en: 'NEBOSH IGC / OSHA certified, Aramco CBT approval preferred, fluent in safety permit workflows.',
      ar: 'شهادة NEBOSH IGC أو OSHA، يفضل اعتماد أرامكو السعودية وإجادة إجراءات تصاريح العمل.',
    },
  },
  {
    id: 'fencing-sup',
    title: { en: 'Security Fencing Site Supervisor', ar: 'مشرف تركيب السياج الأمني' },
    department: { en: 'Fencing & Perimeter Security', ar: 'قسم السياج الأمني' },
    location: { en: 'Al Jubail & Sea Ports, KSA', ar: 'الجبيل والموانئ البحرية' },
    type: { en: 'Full-Time · Field Operations', ar: 'دوام كامل · عمليات ميدانية' },
    requirements: {
      en: 'Hands-on experience in Saudi Aramco Type 1–5 and Sea Port Class 1–4 fence installation.',
      ar: 'خبرة عملية في تركيب سياج أرامكو (الأنواع 1–5) وسياج الموانئ البحرية.',
    },
  },
  {
    id: 'welder-6g',
    title: { en: '6G Certified Pipe Welder & Fabricator', ar: 'لحام أنابيب معتمد 6G ومصنّع هياكل' },
    department: { en: 'Mechanical & Steel Works', ar: 'الأعمال الميكانيكية والحديد' },
    location: { en: 'Jubail / Yanbu, KSA', ar: 'الجبيل / ينبع، السعودية' },
    type: { en: 'Contract / Full-Time', ar: 'عقد / دوام كامل' },
    requirements: {
      en: 'Valid Aramco/TUV 6G TIG & Arc welding certification, industrial piping & steel fabrication background.',
      ar: 'شهادة لحام 6G سارية ومعتمدة من أرامكو أو TUV مع خبرة في الأنابيب الصناعية.',
    },
  },
  {
    id: 'cctv-tech',
    title: { en: 'CCTV & Access Control Technician', ar: 'فني كاميرات مراقبة وأنظمة تحكم بالدخول' },
    department: { en: 'Camera & Security Solutions', ar: 'حلول الكاميرات والأمن' },
    location: { en: 'Al Jubail, KSA', ar: 'الجبيل، السعودية' },
    type: { en: 'Full-Time', ar: 'دوام كامل' },
    requirements: {
      en: 'Expertise in Hikvision TandemVu PTZ systems, solar masts, biometric access control & network setup.',
      ar: 'خبرة في أنظمة Hikvision TandemVu وأبراج الكاميرات الشمسية وأنظمة الدخول البيومترية.',
    },
  },
];
