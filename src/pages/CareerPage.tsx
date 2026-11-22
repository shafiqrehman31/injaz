import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, CheckCircle2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { PageHero } from '../components/PageHero';

export const CareerPage: React.FC = () => {
  const { t } = useLanguage();
  const { careers, submitCareerApplication, navItems } = useCms();
  const navMeta = navItems.find((n) => n.path === '/career');
  const openCareers = careers.filter((j) => j.isOpen !== false);

  const [selectedRole, setSelectedRole] = useState(openCareers[0]?.title.en || 'Civil Site Engineer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('3-5');
  const [certification, setCertification] = useState('Aramco Approved');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!selectedRole && openCareers.length > 0) {
      setSelectedRole(openCareers[0].title.en);
    }
  }, [openCareers, selectedRole]);

  const handleApplyClick = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    const formEl = document.getElementById('career-application-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError(
        t(
          'Please enter your full name, email address, and phone number.',
          'يرجى إدخال الاسم الكامل والبريد الإلكتروني ورقم الهاتف.'
        )
      );
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      setError(t('Please enter a valid email address.', 'يرجى إدخال بريد إلكتروني صحيح.'));
      return;
    }

    setSubmitting(true);
    try {
      await submitCareerApplication({
        role: selectedRole,
        fullName,
        email,
        phone,
        experience,
        certification,
        summary,
      });
      setSubmitted(true);
    } catch {
      setError(
        t(
          'Unable to submit application right now. Please try again.',
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
          navMeta?.pageTitleEn || 'Careers & Manpower Recruitment',
          navMeta?.pageTitleAr || 'الوظائف واستقطاب الكفاءات'
        )}
        subtitle={t(
          navMeta?.pageSubtitleEn ||
            'Join our 500+ team of Aramco-certified engineers, safety officers, welders, civil crews, and heavy equipment operators across Saudi Arabia.',
          navMeta?.pageSubtitleAr ||
            'انضم إلى فريقنا الذي يضم أكثر من 500 مهندس وضابط سلامة وفني لحام ومشغلي معدات معتمدين في مشاريع المملكة.'
        )}
        breadcrumb={t(navMeta?.en || 'Career', navMeta?.ar || 'الوظائف')}
        image="/images/pdf_extracted/img_332_576x768.jpg"
      />

      <section className="py-14 lg:py-20 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Open Positions */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide mb-2">
                {t('Active Opportunities', 'الشواغر المتاحة')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
                {t('Open Positions', 'الفرص الوظيفية الحالية')}
              </h2>
            </div>

            <div className="space-y-4">
              {openCareers.map((job) => {
                const roleName = t(job.title.en, job.title.ar);
                const isSelected = selectedRole === job.title.en || selectedRole === job.title.ar;
                return (
                  <div
                    key={job.id}
                    className={`bg-white border rounded-lg p-6 transition-colors ${
                      isSelected ? 'border-[#1A6FA8]' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-[#1A6FA8]">
                            {t(job.department.en, job.department.ar)}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{t(job.type.en, job.type.ar)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B323D]">{roleName}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {t(job.requirements.en, job.requirements.ar)}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#1A6FA8]" aria-hidden="true" />
                          <span>{t(job.location.en, job.location.ar)}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleApplyClick(roleName)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors whitespace-nowrap shrink-0 self-start cursor-pointer"
                      >
                        {t('Apply Now', 'تقدم الآن')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Form */}
          <div
            id="career-application-form"
            className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 sm:p-8"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <Briefcase className="w-5 h-5 text-[#1A6FA8]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[#0B323D]">
                {t('Candidate Application', 'نموذج التقديم للوظيفة')}
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              {t(
                'Submit your details and certifications to our HR & Mobilization desk in Al Jubail.',
                'أرسل بياناتك واعتماداتك المهنية إلى قسم الموارد البشرية في الجبيل.'
              )}
            </p>

            {submitted ? (
              <div className="bg-[#EEF4F8] border border-[#1A6FA8]/30 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-[#0B323D]">
                  <CheckCircle2 className="w-6 h-6 text-[#1A6FA8] shrink-0" aria-hidden="true" />
                  <h3 className="text-lg font-bold">
                    {t('Application Received', 'تم استلام طلبك بنجاح')}
                  </h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {t(
                    `Thank you, ${fullName}. Your application for "${selectedRole}" has been recorded for review by our HR & Project Mobilization team.`,
                    `شكراً لك ${fullName}. تم تسجيل طلب التوظيف الخاص بك لوظيفة "${selectedRole}" وسيتم مراجعته من قبل فريق التوظيف.`
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setSummary('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded hover:bg-[#124857] cursor-pointer"
                >
                  {t('Submit Another Application', 'تقديم طلب آخر')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {error && (
                  <div
                    role="alert"
                    className="p-3 text-xs font-medium text-red-800 bg-red-50 border border-red-200 rounded"
                  >
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                    {t('Target Position / Trade', 'الوظيفة أو التخصص المطلوب')}
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#F7FAFC] border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                  >
                    {openCareers.map((j) => {
                      const label = t(j.title.en, j.title.ar);
                      return (
                        <option key={j.id} value={label}>
                          {label}
                        </option>
                      );
                    })}
                    <option value={t('General Manpower / Operator', 'قوى عاملة / مشغل معدات')}>
                      {t('General Manpower / Operator', 'قوى عاملة / مشغل معدات')}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                    {t('Full Name *', 'الاسم الكامل *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('e.g. Tariq Al-Qahtani', 'مثال: طارق القحطاني')}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Email Address *', 'البريد الإلكتروني *')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Mobile Number *', 'رقم الجوال *')}
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8] tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Years of Experience', 'سنوات الخبرة')}
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                    >
                      <option value="1-3">{t('1–3 Years', '1–3 سنوات')}</option>
                      <option value="3-5">{t('3–5 Years', '3–5 سنوات')}</option>
                      <option value="5-10">{t('5–10 Years', '5–10 سنوات')}</option>
                      <option value="10+">{t('10+ Years', 'أكثر من 10 سنوات')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                      {t('Key Certification', 'الاعتماد المهني')}
                    </label>
                    <select
                      value={certification}
                      onChange={(e) => setCertification(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                    >
                      <option value="Aramco Approved">{t('Saudi Aramco Approved', 'معتمد أرامكو السعودية')}</option>
                      <option value="TUV Certified">{t('TUV Certified', 'معتمد TUV')}</option>
                      <option value="NEBOSH / OSHA">{t('NEBOSH / OSHA', 'NEBOSH / OSHA')}</option>
                      <option value="SCE / Other">{t('SCE / Technical Diploma', 'الهيئة السعودية للمهندسين / دبلوم')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B323D] mb-1.5">
                    {t('Experience Summary / Iqama Status', 'نبذة عن الخبرة')}
                  </label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder={t(
                      'Briefly describe your past KSA projects, certifications, and availability...',
                      'اذكر باختصار مشاريعك السابقة في المملكة، الشهادات، والجاهزية للعمل...'
                    )}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1A6FA8]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] disabled:opacity-60 rounded transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {submitting
                      ? t('Submitting...', 'جاري الإرسال...')
                      : t('Submit Application', 'إرسال طلب التوظيف')}
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
