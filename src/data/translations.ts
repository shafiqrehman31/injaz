export interface NavItem {
  path: string;
  en: string;
  ar: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/', en: 'Home', ar: 'الرئيسية' },
  { path: '/about', en: 'About Us', ar: 'من نحن' },
  { path: '/projects', en: 'Projects', ar: 'المشاريع' },
  { path: '/services', en: 'Services', ar: 'الخدمات' },
  { path: '/clients', en: 'Clients', ar: 'عملاؤنا' },
  { path: '/gallery', en: 'Gallery', ar: 'المعرض' },
  { path: '/career', en: 'Career', ar: 'الوظائف' },
  { path: '/contact', en: 'Contact', ar: 'تواصل معنا' },
];

export const COMPANY_INFO = {
  brandEn: 'INJAZ BUILDERS',
  brandAr: 'إنجاز للمقاولات',
  legalEn: 'Achievement of Excellence Foundation for General Contracting',
  legalAr: 'مؤسسة إنجاز المتفوقين للمقاولات العامة',
  ceoEn: 'Bakhtiar Khan',
  ceoAr: 'بختيار خان',
  phone: '+966 53 549 4399',
  phoneRaw: '+966535494399',
  email: 'Bakhtiarkhan@injazbuilders.com',
  website: 'www.injazbuilders.com',
  addressEn: '4674 Prince Nayif Street, Al Merqab Dist, Al Jubail 35514, KSA',
  addressAr: '4674 شارع الأمير نايف، حي المرقاب، الجبيل 35514، المملكة العربية السعودية',
  crNumber: '2031111153',
  unifiedNumber: '7031668077',
  chamberNo: '391083',
  classificationEn: 'Fifth Class Classification',
  classificationAr: 'التصنيف: الدرجة الخامسة',
  profilePdfPath: '/assets/aistudio/Profile_b46bcd8b.pdf',
};
