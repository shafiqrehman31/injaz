import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, ExternalLink, FileDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { COMPANY_INFO } from '../data/translations';
import { PageHero } from '../components/PageHero';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { settings, services, submitContactInquiry, navItems } = useCms();
  const navMeta = navItems.find((n) => n.path === '/contact');
  const phoneClean = settings.phone.replace(/\s+/g, '');

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState(services[0]?.id || 'fencing');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setError(
        t(
          'Please fill in your name, email, phone number, and project details.',
          'يرجى تعبئة الاسم والبريد الإلكتروني ورقم الهاتف وتفاصيل المشروع.'
        )
      );
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      setError(t('Please provide a valid email address.', 'يرجى إدخال بريد إلكتروني صحيح.'));
      return;
    }

    setSubmitting(true);
    try {
      await submitContactInquiry({
        name,
        company,
        email,
        phone,
        division,
        location,
        message,
      });
      setSubmitted(true);
    } catch {
      setError(
        t(
          'Unable to submit your inquiry right now. Please try again.',
          'تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى.'
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        title={t(
          navMeta?.pageTitleEn || 'Contact Injaz Builders',
          navMeta?.pageTitleAr || 'تواصل مع إنجاز للمقاولات'
        )}
        subtitle={t(
          navMeta?.pageSubtitleEn ||
            'Reach our Al Jubail headquarters for tender inquiries, BOQ estimation, security fencing surveys, and certified manpower supply.',
          navMeta?.pageSubtitleAr ||
            'تواصل مع مقرنا الرئيسي في الجبيل لطلبات العروض الفنية والمالية، معاينة مواقع السياج الأمني، وتوريد القوى العاملة المعتمدة.'
        )}
        breadcrumb={t(navMeta?.en || 'Contact', navMeta?.ar || 'تواصل معنا')}
        image="/images/pdf_extracted/img_222_1703x1133.jpg"
      />

      <section className="py-14 lg:py-20 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B323D] text-white rounded-lg p-8 space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#7AB8E5] tracking-wide mb-1">
                  {t('Headquarters — Kingdom of Saudi Arabia', 'المقر الرئيسي — المملكة العربية السعودية')}
                </p>
                <h2 className="text-2xl font-bold text-white">
                  {t('Direct Contact Details', 'بيانات الاتصال المباشر')}
                </h2>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#7AB8E5] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">{t('Office Address', 'عنوان المكتب')}</p>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {t(settings.addressEn, settings.addressAr)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#7AB8E5] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">{t('Phone & WhatsApp', 'الهاتف والواتساب')}</p>
                    <a
                      href={`tel:${phoneClean || COMPANY_INFO.phoneRaw}`}
                      dir="ltr"
                      className="text-[#7AB8E5] hover:text-white transition-colors tabular-nums mt-0.5 inline-block"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#7AB8E5] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">{t('Direct Email', 'البريد الإلكتروني')}</p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-[#7AB8E5] hover:text-white transition-colors break-all mt-0.5 inline-block"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#7AB8E5] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">{t('Business Hours', 'ساعات العمل')}</p>
                    <p className="text-slate-300 mt-0.5">
                      {t('Sunday – Thursday: 8:00 AM – 5:00 PM', 'الأحد – الخميس: 8:00 صباحاً – 5:00 مساءً')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=4674+Prince+Nayif+Street+Al+Jubail+35514+Saudi+Arabia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#062028] bg-[#7AB8E5] hover:bg-[#93C7ED] rounded transition-colors"
                >
                  <span>{t('Open in Google Maps', 'فتح الموقع في خرائط جوجل')}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href={COMPANY_INFO.profilePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white border border-white/25 hover:border-[#7AB8E5] rounded transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t('Profile PDF', 'الملف التعريفي')}</span>
                </a>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-2">
              <h3 className="text-sm font-bold text-[#0B323D]">
                {t('Executive Leadership & Registration', 'القيادة والسجل التجاري')}
              </h3>
              <p className="text-xs text-slate-600">
                {t(
                  `CEO: ${settings.ceoEn} · CR: ${COMPANY_INFO.crNumber} · Unified No: ${COMPANY_INFO.unifiedNumber}`,
                  `المدير التنفيذي: ${settings.ceoAr} · السجل التجاري: ${COMPANY_INFO.crNumber} · الرقم الموحد: ${COMPANY_INFO.unifiedNumber}`
                )}
              </p>
            </div>
          </div>

          {/* Interactive Proposal & Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-10">
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide mb-1">
                {t('Request For Proposal (RFP)', 'طلب عرض أسعار')}
              </p>
              <h2 className="text-2xl font-bold text-[#0B323D]">
                {t('Send Project Inquiry', 'أرسل استفسارك أو طلب التسعير')}
              </h2>
            </div>

            {submitted ? (
              <div className="bg-[#EEF4F8] border border-[#1A6FA8]/30 rounded-lg p-8 space-y-4">
                <div className="flex items-center gap-3 text-[#0B323D]">
                  <CheckCircle2 className="w-7 h-7 text-[#1A6FA8] shrink-0" aria-hidden="true" />
                  <h3 className="text-xl font-bold">
                    {t('Inquiry Submitted Successfully', 'تم إرسال طلبك بنجاح')}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {t(
                    `Thank you, ${name}. Your inquiry has been logged for our estimation desk (${settings.email}). For urgent tender deadlines, you may also call ${settings.phone} directly.`,
                    `شكراً لتواصلك، ${name}. تم تسجيل طلبك لدى قسم التسعير والمشاريع (${settings.email}). للمشاريع العاجلة يمكنكم الاتصال مباشرة على ${settings.phone}.`
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setCompany('');
                      setEmail('');
                      setPhone('');
                      setLocation('');
                      setMessage('');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded cursor-pointer"
                  >
                    {t('Send Another Inquiry', 'إرسال طلب جديد')}
                  </button>
                  <a
                    href={`mailto:${settings.email}?subject=${encodeURIComponent(
                      `Project Inquiry from ${name}${company ? ` (${company})` : ''}`
                    )}`}
                    className="px-4 py-2 text-xs font-semibold text-[#0B323D] border border-slate-300 rounded hover:border-[#0B323D]"
                  >
                    {t('Open in Email Client', 'فتح عبر البريد الإلكتروني')}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {error && (
                  <div
                    role="alert"
                    className="p-3.5 text-xs sm:text-sm font-medium text-red-800 bg-red-50 border border-red-200 rounded"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Full Name *', 'الاسم الكامل *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('Your name', 'الاسم الكامل')}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Company / Organization', 'اسم الشركة / الجهة')}
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t('Company name', 'اسم المؤسسة أو الشركة')}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Email Address *', 'البريد الإلكتروني *')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Phone Number *', 'رقم الهاتف *')}
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8] tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Service Division', 'القسم المطلوب')}
                    </label>
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.number}. {t(s.title.en, s.title.ar)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Project City / Region', 'مدينة / موقع المشروع')}
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t('e.g. Jubail, Yanbu, Dammam, Riyadh', 'مثال: الجبيل، ينبع، الدمام، الرياض')}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                    {t('Scope & Project Requirements *', 'تفاصيل المشروع ونطاق العمل *')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t(
                      'Share scope details, fencing type, linear meters, manpower headcount, or target timeline...',
                      'شاركنا تفاصيل نطاق العمل، نوع السياج أو الأعمال المدنية، الكميات التقديرية، والجدول الزمني...'
                    )}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] disabled:opacity-60 rounded transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {submitting
                      ? t('Sending...', 'جاري الإرسال...')
                      : t('Submit Project Inquiry', 'إرسال الطلب')}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
