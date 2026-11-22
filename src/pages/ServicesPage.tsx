import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft, Truck, Utensils, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import {
  MANPOWER_CATEGORIES,
  HEAVY_EQUIPMENT_FLEET,
} from '../data/companyData';
import { PageHero } from '../components/PageHero';
import { ResilientImage } from '../components/ResilientImage';

export const ServicesPage: React.FC = () => {
  const { dir, t } = useLanguage();
  const { services, navItems } = useCms();
  const navMeta = navItems.find((n) => n.path === '/services');
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDiv = searchParams.get('division') || services[0]?.id || '';
  const [activeDivisionId, setActiveDivisionId] = useState<string>(initialDiv);
  const [activeManpowerId, setActiveManpowerId] = useState<string>('all');

  useEffect(() => {
    const param = searchParams.get('division');
    if (param && services.some((d) => d.id === param)) {
      setActiveDivisionId(param);
    }
  }, [searchParams, services]);

  const activeDivision =
    services.find((s) => s.id === activeDivisionId) || services[0];

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const selectDivision = (id: string) => {
    setActiveDivisionId(id);
    setSearchParams({ division: id });
  };

  const filteredManpower =
    activeManpowerId === 'all'
      ? MANPOWER_CATEGORIES
      : MANPOWER_CATEGORIES.filter((m) => m.id === activeManpowerId);

  return (
    <div>
      <PageHero
        title={t(
          navMeta?.pageTitleEn || 'Our Contracting Services',
          navMeta?.pageTitleAr || 'خدمات المقاولات والحلول المتكاملة'
        )}
        subtitle={t(
          navMeta?.pageSubtitleEn ||
            'Seven specialized divisions delivering Saudi Aramco-compliant fencing, smart surveillance, MEP & steel works, trenching, earthwork, asphalt paving, and certified manpower.',
          navMeta?.pageSubtitleAr ||
            'سبعة أقسام متخصصة تشمل السياج الأمني بمواصفات أرامكو، أنظمة المراقبة الذكية، الأعمال الميكانيكية والحديد، الحفر، السفلتة، الأعمال المدنية، وتوريد الكوادر المعتمدة.'
        )}
        breadcrumb={t(navMeta?.en || 'Services', navMeta?.ar || 'الخدمات')}
        image="/images/pdf_extracted/flate_397_1024x683.png"
      />

      {/* Interactive Division Explorer */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide mb-2">
              {t('Technical Divisions', 'الأقسام الفنية')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
              {t('Select a Division to Inspect Scope', 'اختر القسم لاستعراض نطاق العمل')}
            </h2>
          </div>

          {/* Division Tabs */}
          <div className="flex flex-wrap gap-2 pb-8 border-b border-slate-200">
            {services.map((div) => (
              <button
                key={div.id}
                type="button"
                onClick={() => selectDivision(div.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                  activeDivision.id === div.id
                    ? 'bg-[#0B323D] text-white border-[#0B323D] font-semibold'
                    : 'bg-[#F7FAFC] text-slate-700 border-slate-200 hover:border-[#1A6FA8] hover:text-[#0B323D]'
                }`}
              >
                {div.number}. {t(div.title.en, div.title.ar)}
              </button>
            ))}
          </div>

          {/* Active Division Detail Panel */}
          {activeDivision && (
          <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#1A6FA8] tabular-nums">
                  {t(`Division ${activeDivision.number}`, `القسم ${activeDivision.number}`)}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B323D] mt-1">
                  {t(activeDivision.title.en, activeDivision.title.ar)}
                </h3>
                {activeDivision.standards && (
                  <p className="text-xs font-medium text-[#1A6FA8] mt-2">
                    {t(activeDivision.standards.en, activeDivision.standards.ar)}
                  </p>
                )}
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                {t(activeDivision.fullDesc.en, activeDivision.fullDesc.ar)}
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0B323D]">
                  {t('Key Capabilities & Deliverables', 'المهام والمخرجات الرئيسية')}
                </h4>
                <ul className="space-y-2.5">
                  {t(activeDivision.highlights.en, activeDivision.highlights.ar).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors"
                >
                  <span>{t('Request Technical Quote for This Division', 'طلب عرض سعر لهذا القسم')}</span>
                  <Arrow className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Active Division Photo Grid */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-[16/10] w-full rounded-lg overflow-hidden border border-slate-200 bg-[#0B323D]">
                <ResilientImage
                  src={activeDivision.image}
                  alt={t(activeDivision.title.en, activeDivision.title.ar)}
                  className="w-full h-full object-cover"
                />
              </div>
              {activeDivision.gallery.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {activeDivision.gallery.slice(1, 4).map((img, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] rounded-md overflow-hidden border border-slate-200 bg-[#0B323D]"
                    >
                      <ResilientImage
                        src={img}
                        alt={`${t(activeDivision.title.en, activeDivision.title.ar)} ${i + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Complete 500+ Manpower Supply Directory */}
      <section className="py-16 lg:py-20 bg-[#F7FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1A6FA8] mb-2">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>{t('Aramco, SAP & TUV Approved Workforce', 'قوى عاملة معتمدة من أرامكو وSAP وTUV')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
                {t('500+ Skilled Manpower Supply Categories', 'توريد أكثر من 500 كادر مؤهل في 7 تخصصات')}
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setActiveManpowerId('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeManpowerId === 'all' ? 'bg-white text-[#0B323D] shadow-sm font-semibold' : 'text-slate-600'
                }`}
              >
                {t('All 7 Categories', 'جميع التخصصات')}
              </button>
              {MANPOWER_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveManpowerId(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    activeManpowerId === cat.id
                      ? 'bg-white text-[#0B323D] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-[#0B323D]'
                  }`}
                >
                  {cat.number}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredManpower.map((cat) => (
              <div key={cat.id} className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-[#0B323D]">
                    {cat.number}. {t(cat.title.en, cat.title.ar)}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {t(cat.roles.en, cat.roles.ar).map((role, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#1A6FA8] font-bold" aria-hidden="true">·</span>
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heavy Equipment Rental & Camp Catering */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0B323D] text-white rounded-lg p-8 space-y-5">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-[#7AB8E5]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-white">
                {t('Heavy Equipment & Utility Fleet Rental', 'تأجير المعدات الثقيلة ومركبات الخدمة')}
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t(
                'Well-maintained heavy earthmoving machinery, cranes, and support vehicles available with certified operators for short- and long-term mobilization.',
                'أسطول حديث من المعدات الثقيلة والرافعات ومركبات الخدمة متاح للتأجير مع مشغلين معتمدين للمشاريع القصيرة والطويلة.'
              )}
            </p>
            <ul className="space-y-2 text-sm text-slate-200 pt-2">
              {HEAVY_EQUIPMENT_FLEET.map((eq, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7AB8E5] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t(eq.en, eq.ar)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#EEF4F8] border border-slate-200 rounded-lg p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Utensils className="w-6 h-6 text-[#1A6FA8]" aria-hidden="true" />
                <h2 className="text-xl font-bold text-[#0B323D]">
                  {t('Industrial & Workforce Catering Services', 'خدمات التموين والإعاشة للمشاريع')}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {t(
                  'From hard hats to white collars—uniting nutrition with excellence. Injaz Builders operates hygienic camp management and industrial catering tailored to the hearty appetites of site crews and the discerning expectations of management staff.',
                  'خدمات إعاشة وتموين غذائي متكاملة لمخيمات العمل والمواقع الصناعية، توفر وجبات صحية ومتوازنة تلبي احتياجات القوى العاملة والفرق الإدارية وفق أعلى معايير السلامة الغذائية.'
                )}
              </p>
              <p className="text-sm text-slate-600">
                {t(
                  'Supported by full camp coordination, warehouse management, and temporary site facility mobilization.',
                  'مدعومة بإدارة المخيمات والمستودعات وتجهيز المرافق المؤقتة للمشاريع.'
                )}
              </p>
            </div>
            <div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors"
              >
                <span>{t('Inquire About Fleet or Catering', 'استفسر عن المعدات أو التموين')}</span>
                <Arrow className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
