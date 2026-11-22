export interface LegalPageItem {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  effectiveDate: string;
  order: number;
}

export const DEFAULT_LEGAL_PAGES: LegalPageItem[] = [
  {
    id: 'privacy-policy',
    slug: 'privacy-policy',
    titleEn: 'Privacy Policy',
    titleAr: 'سياسة الخصوصية',
    effectiveDate: '2026-01-01',
    order: 1,
    contentEn: `1. Overview & Regulatory Alignment
Achievement of Excellence Foundation for General Contracting ("Injaz Builders", CR: 2031111153) respects your privacy and handles personal information in compliance with the Kingdom of Saudi Arabia Personal Data Protection Law (PDPL).

2. Information We Collect
When you submit a Request for Proposal (RFP), contact inquiry, or career application through injazbuilders.com, we collect only the details you voluntarily provide: your full name, company name, business email address, telephone number, project location, scope requirements, and professional certifications.

3. How We Use Your Information
Your information is used strictly to:
• Evaluate and respond to construction, fencing, surveillance, MEP, civil, or manpower tender inquiries.
• Assess candidate qualifications for open engineering, safety, technical, and operational roles.
• Maintain vendor registration, commercial correspondence, and regulatory compliance records.

4. Data Security & Retention
All inquiry and application records are stored in access-restricted Firebase Firestore collections protected by verified administrator authentication. We never sell, rent, or disclose personal contact records to third-party marketers.

5. Your Rights & Contact
You may request access, correction, or deletion of your submitted contact or recruitment records at any time by contacting Bakhtiarkhan@injazbuilders.com or calling +966 53 549 4399 (4674 Prince Nayif Street, Al Merqab Dist, Al Jubail 35514, KSA).`,
    contentAr: `1. نظرة عامة والالتزام التنظيمي
تلتزم مؤسسة إنجاز المتفوقين للمقاولات العامة ("إنجاز للمقاولات"، سجل تجاري رقم 2031111153) بحماية خصوصية زوارها وعملائها والتعامل مع البيانات الشخصية وفقاً لنظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية.

2. البيانات التي نجمعها
عند إرسال طلب عرض أسعار أو استفسار مشروع أو طلب توظيف عبر الموقع، نجمع فقط البيانات التي تزودنا بها طواعية مثل: الاسم الكامل، اسم الشركة، البريد الإلكتروني، رقم الهاتف، موقع المشروع، ونطاق العمل أو الشهادات المهنية.

3. أغراض استخدام البيانات
تُستخدم البيانات حصرياً من أجل:
• دراسة والرد على طلبات المشاريع والمناقصات في السياج الأمني والمراقبة والأعمال المدنية والميكانيكية والقوى العاملة.
• تقييم طلبات التوظيف والكفاءات الهندسية والفنية للوظائف الشاغرة.
• حفظ سجلات التواصل التجاري ومتطلبات التأهيل والامتثال.

4. أمن البيانات والاحتفاظ بها
تُحفظ جميع طلبات العملاء والمتقدمين في قواعد بيانات مقيدة الصلاحية ومحمية بتوثيق إداري معتمد، ولا نبيع أو نؤجر أو نشارك بياناتكم لأي أغراض تسويقية خارجية.

5. حقوقكم والتواصل معنا
يحق لكم طلب الاطلاع على بياناتكم أو تصحيحها أو حذفها عبر البريد الإلكتروني Bakhtiarkhan@injazbuilders.com أو الهاتف +966535494399 (4674 شارع الأمير نايف، حي المرقاب، الجبيل 35514).`,
  },
  {
    id: 'terms-of-use',
    slug: 'terms-of-use',
    titleEn: 'Terms & Conditions',
    titleAr: 'الشروط والأحكام',
    effectiveDate: '2026-01-01',
    order: 2,
    contentEn: `1. Acceptance of Terms
By accessing injazbuilders.com, you agree to these Terms & Conditions governing the use of corporate portfolio information, downloadable profiles, and inquiry forms provided by Injaz Builders (Achievement of Excellence Foundation for General Contracting).

2. Scope of Portfolio Information
Project photographs, technical division summaries, and capability specifications published on this portal are for informational and pre-qualification reference. Final project pricing, timelines, BOQ specifications, and warranties are governed exclusively by signed commercial contracts and purchase orders.

3. Intellectual Property
The Injaz Builders name, architectural emblem, company profile PDF, and field project photography remain the intellectual property of Injaz Builders and may not be reproduced commercially without written authorization.

4. Official Credentials & Verification
All official documents displayed in the Our CR & Credentials section (Ministry of Commerce CR 2031111153, Asharqia Chamber Certificate #391083, ZATCA VAT Registration 311461995800003, National Address Proof ENAA4674, and SNB IBAN Letter) may be independently verified via their respective Saudi government portals.

5. Governing Law
These terms are governed by the laws and regulations of the Kingdom of Saudi Arabia, with jurisdiction in the Eastern Province courts.`,
    contentAr: `1. قبول الشروط
بدخولك إلى موقع إنجاز للمقاولات، فإنك توافق على هذه الشروط والأحكام التي تنظم استخدام محتوى الموقع والملفات التعريفية ونماذج طلب العروض.

2. نطاق المعلومات المنشورة
تُعرض المشاريع والمواصفات الفنية على الموقع لأغراض التعريف والتأهيل المسبق. تخضع الأسعار النهائية والجداول الزمنية والكميات والضمانات حصراً للعقود وأوامر الشراء الرسمية الموقعة بين الأطراف.

3. الملكية الفكرية
إن شعار مؤسسة إنجاز المتفوقين للمقاولات العامة والاسم التجاري والملف التعريفي وصور المشاريع الميدانية هي حقوق محفوظة للمؤسسة ولا يجوز إعادة استخدامها تجارياً دون إذن خطي مسبق.

4. الوثائق والاعتمادات الرسمية
يمكن التحقق من كافة الوثائق المعروضة في قسم السجل التجاري والاعتمادات (السجل التجاري 2031111153، شهادة غرفة الشرقية 391083، شهادة ضريبة القيمة المضافة 311461995800003، العنوان الوطني ENAA4674، وخطاب الآيبان من البنك الأهلي السعودي) عبر المنصات الرسمية المعتمدة.

5. القانون الواجب التطبيق
تخضع هذه الشروط لأنظمة المملكة العربية السعودية وتختص المحاكم المختصة في المنطقة الشرقية بالنظر في أي نزاع.`,
  },
  {
    id: 'hse-quality-policy',
    slug: 'hse-quality-policy',
    titleEn: 'HSE & Quality Policy',
    titleAr: 'سياسة الصحة والسلامة والبيئة والجودة',
    effectiveDate: '2026-01-01',
    order: 3,
    contentEn: `1. Zero-Harm Safety Commitment
Injaz Builders operates under an uncompromising "Safety for Men, Materials & Machinery" mandate across all Saudi Aramco, Royal Commission, SABIC, Sea Port, and industrial job sites.

2. International Standards Alignment
Our Quality Management and Operational Continuity systems align with:
• ISO 9001: Quality Management Systems
• ISO 27001: Information Security Management
• ISO 22301: Business Continuity Management
• ISO 10002: Customer Satisfaction & Complaint Handling

3. Site Controls & Workforce Readiness
All field engineers, safety officers, 6G/3G welders, riggers, and TUV heavy equipment operators undergo safety induction, work-permit compliance verification, and daily toolbox talks before mobilization.`,
    contentAr: `1. الالتزام بالسلامة الصفرية
تعمل إنجاز للمقاولات وفق مبدأ "سلامة الأفراد والمواد والمعدات" في جميع مواقع أرامكو السعودية والهيئة الملكية وسابك والموانئ البحرية والمشاريع الصناعية.

2. المعايير الدولية المعتمدة
تتوافق أنظمة إدارة الجودة واستمرارية الأعمال لدينا مع المعايير التالية:
• ISO 9001: نظام إدارة الجودة
• ISO 27001: نظام إدارة أمن المعلومات
• ISO 22301: نظام إدارة استمرارية الأعمال
• ISO 10002: نظام رضا العملاء ومعالجة الشكاوى

3. الرقابة الميدانية وتأهيل الكوادر
يخضع جميع مهندسي الموقع وضباط السلامة واللحامين ومشغلي المعدات المعتمدة لدورات السلامة وتصاريح العمل والاجتماعات اليومية للسلامة قبل بدء التنفيذ.`,
  },
  {
    id: 'compliance-ethics',
    slug: 'compliance-ethics',
    titleEn: 'Compliance & Anti-Bribery Policy',
    titleAr: 'سياسة الامتثال ومكافحة الفساد',
    effectiveDate: '2026-01-01',
    order: 4,
    contentEn: `1. Ethical Contracting Standards
Injaz Builders conducts all tendering, procurement, subcontracting, and manpower deployment with complete integrity, fairness, and transparency in accordance with Saudi Vision 2030 governance standards.

2. Zero Tolerance for Bribery & Conflict of Interest
No employee, representative, or subcontractor may offer, solicit, or accept improper payments, kickbacks, or undisclosed favors in connection with any public or private contract.

3. Reporting Concerns
Any compliance questions or ethics concerns may be directed confidentially to executive leadership at Bakhtiarkhan@injazbuilders.com.`,
    contentAr: `1. معايير النزاهة في المقاولات
تلتزم إنجاز للمقاولات بأعلى معايير النزاهة والشفافية والعدالة في جميع المناقصات والمشتريات وعقود الباطن وتوريد القوى العاملة بما يتوافق مع حوكمة رؤية السعودية 2030.

2. عدم التسامح مطلقاً مع الرشوة وتضارب المصالح
يُحظر تماماً على أي موظف أو ممثل أو مقاول باطن تقديم أو قبول أي مدفوعات غير مشروعة أو عمولات خفية تتعلق بأي عقد حكومي أو خاص.

3. الإبلاغ عن المخالفات
يمكن التواصل بسرية تامة مع الإدارة التنفيذية بشأن أي استفسارات تتعلق بالامتثال عبر البريد Bakhtiarkhan@injazbuilders.com.`,
  },
  {
    id: 'cookie-policy',
    slug: 'cookie-policy',
    titleEn: 'Cookie & Storage Policy',
    titleAr: 'سياسة ملفات الارتباط والتخزين المحلي',
    effectiveDate: '2026-01-01',
    order: 5,
    contentEn: `1. Minimal Functional Storage
Injaz Builders does not use invasive third-party advertising trackers. We use essential browser storage solely to remember your selected display language (English or Arabic RTL) and to secure administrator authentication sessions via Firebase Auth.

2. Managing Preferences
You may clear or disable browser storage at any time via your browser settings. Language preferences can also be switched instantly from the top bar on every page.`,
    contentAr: `1. استخدام محدود للتخزين الوظيفي
لا يستخدم موقع إنجاز للمقاولات أي ملفات تتبع إعلانية. يقتصر التخزين المحلي للمتصفح على حفظ تفضيل اللغة (العربية أو الإنجليزية) وتأمين جلسة دخول الإدارة المعتمدة.

2. إدارة التفضيلات
يمكنك مسح بيانات المتصفح في أي وقت من إعدادات متصفحك، كما يمكنك تبديل اللغة فوراً من الشريط العلوي في جميع الصفحات.`,
  },
];
