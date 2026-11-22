import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileDown,
  ShieldCheck,
  Building2,
  Users,
  Award,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { COMPANY_INFO } from '../data/translations';
import { ProjectItem } from '../data/companyData';
import { ResilientImage } from '../components/ResilientImage';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { CredentialsSection } from '../components/CredentialsSection';

export const HomePage: React.FC = () => {
  const { dir, t } = useLanguage();
  const { settings, services, projects, clients, gallery } = useCms();
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectItem['category']>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transform for hero background photography and subtle gradient layer
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featuredClients = clients.slice(0, 12);

  return (
    <div>
      {/* 1. HERO SECTION WITH PARALLAX SUBTLE GRADIENT */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-[#062028] text-white min-h-[560px] lg:min-h-[640px] flex items-center"
      >
        {/* Parallax Architectural Photography Layer */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none will-change-transform"
          aria-hidden="true"
        >
          <img
            src="/images/pdf_extracted/img_729_2818x1879.jpg"
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-[125%] -top-[8%] relative object-cover opacity-35"
          />
        </motion.div>

        {/* Subtle Gradient Overlay with Parallax Shift */}
        <motion.div
          style={{ y: gradientY }}
          className="absolute inset-0 bg-gradient-to-br from-[#062028]/95 via-[#0B323D]/88 to-[#124857]/70 pointer-events-none will-change-transform"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-architectural-grid opacity-55 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <p className="text-sm font-medium text-[#7AB8E5] tracking-wide">
                {t(
                  'Al Jubail, Kingdom of Saudi Arabia · CR 2031111153 · ISO 9001 & 27001 Certified',
                  'الجبيل، المملكة العربية السعودية · سجل تجاري 2031111153 · معتمدون بشهادات ISO 9001 و 27001'
                )}
              </p>

              <h1 className="text-[clamp(2.25rem,4.2vw,3.75rem)] font-bold leading-[1.12] rtl:leading-[1.35] tracking-tight text-white max-w-3xl">
                {t(settings.heroTitleEn, settings.heroTitleAr)}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                {t(settings.heroSubtitleEn, settings.heroSubtitleAr)}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#062028] bg-[#7AB8E5] hover:bg-[#93C7ED] rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{t('Explore Our Projects', 'استعرض مشاريعنا')}</span>
                  <Arrow className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white border border-white/30 hover:border-[#7AB8E5] hover:bg-white/5 rounded transition-colors"
                >
                  <span>{t('Request a Tender Proposal', 'اطلب عرض أسعار')}</span>
                </Link>

                <a
                  href={COMPANY_INFO.profilePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#7AB8E5] hover:text-white transition-colors"
                >
                  <FileDown className="w-4 h-4" aria-hidden="true" />
                  <span>{t('Company Profile (PDF)', 'الملف التعريفي (PDF)')}</span>
                </a>
              </div>
            </div>

            {/* Right Architectural Identity Frame */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="w-full max-w-xs bg-[#062028]/75 backdrop-blur-sm border border-[#7AB8E5]/25 rounded-lg p-8 text-center space-y-5">
                <img
                  src="/images/logo-white.png"
                  alt={t('Injaz Builders Official Logo', 'الشعار الرسمي لإنجاز للمقاولات')}
                  className="h-28 w-auto mx-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="pt-4 border-t border-white/10 space-y-1">
                  <p className="text-xs text-[#7AB8E5] font-medium">
                    {t('Leadership & Accountability', 'القيادة التنفيذية')}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {t(`CEO: ${settings.ceoEn}`, `المدير التنفيذي: ${settings.ceoAr}`)}
                  </p>
                  <p className="text-xs text-slate-300 tabular-nums" dir="ltr">
                    {settings.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-COLUMN KEY METRICS BAND (Full-width row immediately below hero) */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-start gap-3.5">
              <Users className="w-6 h-6 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#0B323D] tabular-nums">500+</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {t('Aramco, TUV & SAP Certified Workers', 'كادر معتمد من أرامكو وTUV وSAP')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Building2 className="w-6 h-6 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#0B323D] tabular-nums">{services.length}</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {t('Core Contracting & Rental Divisions', 'أقسام مقاولات وتأجير متكاملة')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#0B323D] tabular-nums">Type 1–5</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {t('Saudi Aramco & Sea Port Security Fencing', 'سياج أرامكو والموانئ البحرية الأمني')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Award className="w-6 h-6 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#0B323D] tabular-nums">ISO 9001</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {t('Asharqia Chamber Fifth-Class Contractor', 'تصنيف الدرجة الخامسة · غرفة الشرقية')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROPOSITION: ABOUT OUR COMPANY & VISION */}
      <section className="py-16 lg:py-24 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide mb-2">
                  {t('About Injaz Builders', 'نبذة عن إنجاز للمقاولات')}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B323D] tracking-tight">
                  {t(
                    'Single-Point Contracting Partner for Industrial & Urban Projects',
                    'شريك مقاولات متكامل للمشاريع الصناعية والحضرية'
                  )}
                </h2>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                {t(
                  'Injaz Builders holds a diverse portfolio of completed and ongoing projects spanning iconic structures, Royal Commission corridors, petrochemical plants, and perimeter security systems. Since our establishment, we have prioritized quality engineering, workplace safety, sustainability, and on-time delivery.',
                  'تمتلك مؤسسة إنجاز المتفوقين سجلاً متنوعاً من المشاريع المنجزة والجارية التي تشمل المباني الحديثة وممرات الهيئة الملكية والمنشآت البتروكيماوية وأنظمة السياج الأمني، مع التزام راسخ بجودة الهندسة وسلامة الموقع والالتزام بالمواعيد.'
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
                <div>
                  <h3 className="text-sm font-bold text-[#0B323D] mb-1.5">
                    {t('Our Vision', 'رؤيتنا')}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t(
                      'To be a leading Construction Business House in Saudi Arabia recognized for engineering quality, safety, and client satisfaction.',
                      'أن نكون من أنجح مؤسسات المقاولات في المملكة عبر تطوير معايير الجودة الهندسية والسلامة وتحقيق رضا العملاء.'
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B323D] mb-1.5">
                    {t('Our Mission', 'رسالتنا')}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t(
                      'To serve as a single-point industrial service provider adopting modern technology with uncompromising safety for Men, Materials & Machinery.',
                      'العمل كمزود خدمات متكامل للقطاع الصناعي بتبني التقنيات الحديثة وأعلى معايير السلامة للأفراد والمعدات.'
                    )}
                  </p>
                </div>
              </div>

              <div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A6FA8] hover:text-[#0B323D] transition-colors"
                >
                  <span>{t('Read Full Profile & Credentials', 'اقرأ الملف الكامل والاعتمادات')}</span>
                  <Arrow className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[340px] rounded-lg overflow-hidden border border-slate-200 bg-[#0B323D]">
                <ResilientImage
                  src="/images/pdf_extracted/img_702_2074x1556.jpg"
                  alt={t('Modern commercial skyscrapers representing Injaz Builders construction standards', 'أبراج حديثة تعكس معايير البناء في إنجاز')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MECHANISM / CAPABILITIES: ASYMMETRIC BENTO SERVICES */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide mb-2">
                {t('Core Capabilities', 'قدراتنا التنفيذية')}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B323D] tracking-tight max-w-2xl">
                {t(
                  'Specialized Contracting Divisions Under One Roof',
                  'أقسام مقاولات متخصصة تحت سقف واحد'
                )}
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0B323D] border border-slate-300 hover:border-[#0B323D] rounded transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>{t('View All 7 Divisions', 'عرض جميع الأقسام السبعة')}</span>
              <Arrow className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => {
              const isWide = index === 0 || index === 5;
              return (
                <Link
                  key={service.id}
                  to={`/services?division=${service.id}`}
                  className={`group flex flex-col justify-between bg-[#F7FAFC] hover:bg-white border border-slate-200 hover:border-[#1A6FA8]/60 rounded-lg overflow-hidden transition-all duration-200 ${
                    isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  <div className={`grid ${isWide ? 'grid-cols-1 sm:grid-cols-12' : 'grid-cols-1'} h-full`}>
                    <div className={`${isWide ? 'sm:col-span-5 h-56 sm:h-full' : 'h-48'} overflow-hidden bg-[#0B323D]`}>
                      <ResilientImage
                        src={service.image}
                        alt={t(service.title.en, service.title.ar)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className={`${isWide ? 'sm:col-span-7' : ''} p-6 flex flex-col justify-between`}>
                      <div>
                        <h3 className="text-lg font-bold text-[#0B323D] group-hover:text-[#1A6FA8] transition-colors">
                          {service.number}. {t(service.title.en, service.title.ar)}
                        </h3>
                        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                          {t(service.shortDesc.en, service.shortDesc.ar)}
                        </p>
                        {isWide && (
                          <ul className="mt-4 space-y-1.5">
                            {t(service.highlights.en, service.highlights.ar)
                              .slice(0, 3)
                              .map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
                                  <span>{h}</span>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-[#1A6FA8]">
                        <span>{t('Inspect Specifications', 'استعراض المواصفات')}</span>
                        <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROOF / EVIDENCE: INTERACTIVE PROJECTS PORTFOLIO */}
      <section className="py-16 lg:py-24 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide mb-2">
                {t('Executed Portfolio', 'سجل المشاريع المنفذة')}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B323D] tracking-tight">
                {t('Featured Projects Across Saudi Arabia', 'أبرز مشاريعنا في المملكة')}
              </h2>
            </div>

            {/* Interactive Segmented Filter Controls */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto">
              {[
                { key: 'all' as const, en: 'All Projects', ar: 'الكل' },
                { key: 'civil' as const, en: 'Civil', ar: 'مدني' },
                { key: 'fencing' as const, en: 'Fencing', ar: 'سياج' },
                { key: 'mechanical' as const, en: 'Mechanical', ar: 'ميكانيكا' },
                { key: 'earthwork' as const, en: 'Earthwork', ar: 'ترابية' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === tab.key
                      ? 'bg-white text-[#0B323D] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-[#0B323D]'
                  }`}
                >
                  {t(tab.en, tab.ar)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProject(project)}
                className="group text-start bg-white border border-slate-200 hover:border-[#1A6FA8]/60 rounded-lg overflow-hidden transition-all duration-200 flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1A6FA8]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#0B323D]">
                  <ResilientImage
                    src={project.image}
                    alt={t(project.title.en, project.title.ar)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-medium text-[#1A6FA8]">
                        {t(project.categoryLabel.en, project.categoryLabel.ar)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{t(project.location.en, project.location.ar)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0B323D] group-hover:text-[#1A6FA8] transition-colors">
                      {t(project.title.en, project.title.ar)}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {t(project.summary.en, project.summary.ar)}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate max-w-[75%]">{t(project.client.en, project.client.ar)}</span>
                    <span className="font-semibold text-[#1A6FA8] shrink-0">
                      {t('Details', 'التفاصيل')}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              {t(
                'Browse field photography across fencing, rebar channels, asphalt paving, and steel erection.',
                'تصفح صور الأعمال الميدانية من السياج الأمني والقنوات الخرسانية وأعمال السفلتة والهياكل الحديدية.'
              )}
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#0B323D] bg-white border border-slate-300 hover:border-[#0B323D] rounded transition-colors"
              >
                <span>{t(`Site Gallery (${gallery.length})`, `معرض الصور (${gallery.length})`)}</span>
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors"
              >
                <span>{t('All Projects', 'كافة المشاريع')}</span>
                <Arrow className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLIENTS & GIGA-PROJECT PARTNERS */}
      <section className="py-16 lg:py-20 bg-[#0B323D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#7AB8E5] tracking-wide mb-2">
                {t('Trusted By Industry Leaders', 'شركاء النجاح في المملكة')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t('Major Clients & Kingdom Vision 2030 Projects', 'أبرز العملاء ومشاريع رؤية السعودية 2030')}
              </h2>
            </div>
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7AB8E5] hover:text-white transition-colors whitespace-nowrap"
            >
              <span>{t('View All 25+ Clients & EPC Track Record', 'عرض جميع العملاء وسجل المقاولات')}</span>
              <Arrow className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredClients.map((client) => (
              <div
                key={client.id}
                className="bg-[#062028] border border-white/10 rounded-md p-4 h-24 flex items-center justify-center hover:border-[#7AB8E5]/50 transition-colors"
              >
                <ResilientImage
                  src={client.logo}
                  alt={t(client.name.en, client.name.ar)}
                  fallbackTitle={t(client.name.en, client.name.ar)}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5B. OFFICIAL CR, VAT, NATIONAL ADDRESS & IBAN DOSSIER */}
      <CredentialsSection />

      {/* 6. CONVERSION CTA SECTION */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EEF4F8] border border-slate-200 rounded-lg p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
                {t(
                  'Planning a Civil, Security Fencing, or Industrial Package?',
                  'هل تخططون لمشروع مدني أو سياج أمني أو أعمال صناعية؟'
                )}
              </h2>
              <p className="text-base text-slate-600">
                {t(
                  'Connect directly with our engineering and estimation team in Al Jubail for BOQ pricing, manpower mobilization, or site surveys.',
                  'تواصلوا مباشرة مع فريق الهندسة والتسعير لدينا في الجبيل لدراسة الكميات أو توفير الكوادر المعتمدة أو المعاينة الميدانية.'
                )}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors"
              >
                <span>{t('Contact Estimation Team', 'تواصل مع فريق التسعير')}</span>
                <Arrow className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/career"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#0B323D] bg-white border border-slate-300 hover:border-[#0B323D] rounded transition-colors"
              >
                <span>{t('Careers & Manpower', 'الوظائف والتوظيف')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
