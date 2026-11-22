export interface EmailTemplateItem {
  id: string;
  name: string;
  category: 'inquiry' | 'career' | 'general';
  subjectEn: string;
  subjectAr: string;
  bodyEn: string;
  bodyAr: string;
}

export const DEFAULT_EMAIL_TEMPLATES: EmailTemplateItem[] = [
  {
    id: 'rfp-acknowledgement',
    name: 'Tender / RFP Acknowledgement',
    category: 'inquiry',
    subjectEn: 'Re: Your Project Inquiry with Injaz Builders — {{division}}',
    subjectAr: 'رد: استفساركم حول المشروع مع مؤسسة إنجاز للمقاولات — {{division}}',
    bodyEn: `Dear {{name}},

Thank you for reaching out to Injaz Builders (Achievement of Excellence Foundation for General Contracting) regarding your {{division}} requirement in {{location}}.

Our engineering and estimation team is reviewing your scope details. To prepare an accurate technical and commercial proposal, could you please share any available BOQ, IFC drawings, or target mobilization schedule?

For immediate coordination, please feel free to reply to this email or contact us directly at +966 53 549 4399.

Best regards,
Bakhtiar Khan
Chief Executive Officer — Injaz Builders
4674 Prince Nayif Street, Al Merqab Dist, Al Jubail 35514, KSA
CR: 2031111153 | VAT: 311461995800003 | www.injazbuilders.com`,
    bodyAr: `الأخ/الأخت {{name}} المحترم،

تحية طيبة وبعد،،

نشكر لكم تواصلكم مع مؤسسة إنجاز المتفوقين للمقاولات العامة بخصوص متطلباتكم في قسم {{division}} بموقع {{location}}.

يقوم فريق الهندسة والتسعير لدينا حالياً بمراجعة تفاصيل الطلب. ولإعداد عرض فني ومالي دقيق، نرجو مشاركة جدول الكميات (BOQ) أو المخططات الهندسية المتوفرة والجدول الزمني المستهدف.

للتنسيق السريع، يسعدنا تواصلكم عبر هذا البريد أو الاتصال مباشرة على +966535494399.

وتفضلوا بقبول فائق الاحترام،
بختيار خان — المدير التنفيذي
مؤسسة إنجاز المتفوقين للمقاولات العامة
الجبيل 35514، المملكة العربية السعودية | سجل تجاري: 2031111153`,
  },
  {
    id: 'site-survey-invite',
    name: 'Site Survey & Technical Meeting',
    category: 'inquiry',
    subjectEn: 'Site Survey Schedule — Injaz Builders ({{company}})',
    subjectAr: 'تحديد موعد المعاينة الميدانية — إنجاز للمقاولات',
    bodyEn: `Dear {{name}},

Following our review of your project requirements for {{company}}, our technical supervisor is ready to conduct an on-site inspection in {{location}}.

Please confirm your preferred date and site gate access instructions so we can dispatch our engineering team promptly.

Warm regards,
Injaz Builders Estimation & Engineering Desk
+966 53 549 4399 | Bakhtiarkhan@injazbuilders.com`,
    bodyAr: `الأخ/الأخت {{name}} المحترم،

بناءً على مراجعة متطلبات المشروع، يسر فريقنا الهندسي تحديد موعد للمعاينة الميدانية في موقع {{location}}.

يرجى تأكيد الموعد المناسب وتزويدنا بتعليمات الدخول للموقع.

مع أطيب التحيات،
فريق الهندسة والتسعير — مؤسسة إنجاز للمقاولات`,
  },
  {
    id: 'career-interview',
    name: 'Candidate Interview / Mobilization',
    category: 'career',
    subjectEn: 'Injaz Builders Recruitment — Application for {{role}}',
    subjectAr: 'التوظيف في إنجاز للمقاولات — بخصوص وظيفة {{role}}',
    bodyEn: `Dear {{name}},

Thank you for applying for the {{role}} position at Injaz Builders.

Our HR & Project Mobilization team has reviewed your profile and certifications ({{certification}}). We would like to schedule a brief technical interview. Please reply with your availability and attach copies of your valid Iqama/ID and Aramco/TUV/SCE certificates.

Best regards,
HR & Mobilization Desk — Injaz Builders
Al Jubail, KSA | +966 53 549 4399`,
    bodyAr: `الأخ/الأخت {{name}} المحترم،

نشكر لكم التقديم على وظيفة {{role}} لدى مؤسسة إنجاز للمقاولات.

تمت مراجعة طلبكم وشهاداتكم، ويسرنا دعوتكم لإجراء مقابلة فنية مبدئية. يرجى الرد بمواعيدكم المناسبة وإرفاق نسخة من الهوية/الإقامة والشهادات المهنية السارية.

مع التحية،
قسم الموارد البشرية — إنجاز للمقاولات`,
  },
];
