import React from 'react';
import {
  Target,
  Compass,
  TrendingUp,
  Cpu,
  Users,
  Leaf,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { COMPANY_INFO } from '../data/translations';
import { PageHero } from '../components/PageHero';
import { ResilientImage } from '../components/ResilientImage';
import { CredentialsSection } from '../components/CredentialsSection';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const { settings, navItems } = useCms();
  const navMeta = navItems.find((n) => n.path === '/about');

  const goals = [
    {
      num: '01',
      title: { en: 'Excellence in Delivery', ar: 'التميز في التنفيذ' },
      desc: {
        en: 'Complete every project on time, within budget, and to the highest engineering standards while continuously improving our methods and efficiency.',
        ar: 'إنجاز كل مشروع في وقته المحدد وضمن الميزانية المعتمدة وبأعلى المعايير الهندسية مع التطوير المستمر لأساليب العمل.',
      },
    },
    {
      num: '02',
      title: { en: 'Client Satisfaction', ar: 'رضا العملاء' },
      desc: {
        en: 'Build strong, lasting relationships through trust, transparency, and reliable execution, ensuring every client requirement is understood and met.',
        ar: 'بناء علاقات طويلة الأمد قائمة على الثقة والشفافية والموثوقية وضمان تلبية كافة متطلبات العميل.',
      },
    },
    {
      num: '03',
      title: { en: 'Sustainable Growth', ar: 'النمو المستدام' },
      desc: {
        en: 'Expand our capabilities while promoting site safety, smart innovation, and environmental responsibility across the Kingdom.',
        ar: 'توسيع قدراتنا التشغيلية مع تعزيز السلامة المهنية والابتكار والمسؤولية البيئية في جميع أنحاء المملكة.',
      },
    },
  ];

  const roadmap = [
    {
      icon: TrendingUp,
      title: { en: 'Service Expansion', ar: 'توسيع نطاق الخدمات' },
      desc: { en: 'Broader multi-discipline industrial contracting & turnkey security packages.', ar: 'توسيع باقات المقاولات الصناعية وأنظمة الأمان المتكاملة.' },
    },
    {
      icon: Cpu,
      title: { en: 'Technology Integration', ar: 'دمج التقنيات الحديثة' },
      desc: { en: 'AI-assisted site surveillance, cloud progress tracking, and modern equipment.', ar: 'أنظمة مراقبة ذكية، وتتبع التقدم سحابياً، وأحدث المعدات.' },
    },
    {
      icon: Users,
      title: { en: 'Workforce Development', ar: 'تطوير القوى العاملة' },
      desc: { en: 'Continuous Aramco, TUV, and safety certification across 500+ personnel.', ar: 'تأهيل مستمر واعتمادات أرامكو وTUV والسلامة لأكثر من 500 موظف.' },
    },
    {
      icon: Leaf,
      title: { en: 'Sustainability Commitment', ar: 'الالتزام بالاستدامة' },
      desc: { en: 'Eco-conscious excavation, waste control, and energy-efficient MEP systems.', ar: 'ممارسات بناء صديقة للبيئة وأنظمة كهروميكانيكية موفرة للطاقة.' },
    },
    {
      icon: MapPin,
      title: { en: 'Geographic Growth', ar: 'التوسع الجغرافي' },
      desc: { en: 'Serving Eastern Province, Yanbu, Riyadh, and Vision 2030 Giga-Projects.', ar: 'تغطية المنطقة الشرقية وينبع والرياض ومشاريع رؤية 2030 الكبرى.' },
    },
  ];

  return (
    <div>
      <PageHero
        title={t(
          navMeta?.pageTitleEn || 'About Injaz Builders',
          navMeta?.pageTitleAr || 'من نحن — إنجاز للمقاولات'
        )}
        subtitle={t(
          navMeta?.pageSubtitleEn ||
            'Achievement of Excellence Foundation for General Contracting — combining technical expertise, certified manpower, and strict safety standards across Saudi Arabia.',
          navMeta?.pageSubtitleAr ||
            'مؤسسة إنجاز المتفوقين للمقاولات العامة — نجمع بين الخبرة الفنية والكوادر المعتمدة وأعلى معايير السلامة في المملكة العربية السعودية.'
        )}
        breadcrumb={t(navMeta?.en || 'About Us', navMeta?.ar || 'من نحن')}
        image="/images/pdf_extracted/img_702_2074x1556.jpg"
      />

      {/* Company Overview & CEO Leadership */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide">
                {t('Company Profile', 'الملف التعريفي للمؤسسة')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
                {t(
                  'Delivering World-Class Infrastructure & Security Contracting',
                  'تنفيذ مشاريع البنية التحتية والحلول الأمنية وفق أرقى المعايير'
                )}
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                {t(
                  'Injaz Builders is a trusted Saudi construction contracting company dedicated to delivering world-class infrastructure, civil works, perimeter security fencing, smart camera solutions, and MEP packages. With a strong track record across Royal Commission, Saudi Aramco, SABIC, and Yanbu petrochemical corridors, we combine experienced engineering supervision with modern machinery.',
                  'تُعد إنجاز للمقاولات (مؤسسة إنجاز المتفوقين للمقاولات العامة) شركة مقاولات سعودية موثوقة متخصصة في مشاريع البنية التحتية والأعمال المدنية والسياج الأمني وكاميرات المراقبة والأعمال الكهروميكانيكية، بسجل حافل في مشاريع الهيئة الملكية وأرامكو وسابك والجبيل وينبع.'
                )}
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                {t(
                  'Guided by our philosophy—"Customer satisfaction through delivery of quality services"—every project is executed with strict adherence to international safety regulations, cost efficiency, and scheduled handover.',
                  'انطلاقاً من مبدئنا "رضا العميل من خلال تقديم خدمات عالية الجودة"، ننفذ كل مشروع بالتزام تام بلوائح السلامة الدولية والكفاءة الاقتصادية والتسليم في الموعد.'
                )}
              </p>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-slate-500">{t('Chief Executive Officer', 'الرئيس التنفيذي')}</p>
                  <p className="text-base font-bold text-[#0B323D] mt-0.5">
                    {t(settings.ceoEn, settings.ceoAr)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t('Commercial Registration', 'السجل التجاري')}</p>
                  <p className="text-base font-bold text-[#0B323D] mt-0.5 tabular-nums">
                    {COMPANY_INFO.crNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t('Chamber Classification', 'تصنيف الغرفة')}</p>
                  <p className="text-base font-bold text-[#0B323D] mt-0.5">
                    {t('Fifth Class · #391083', 'الدرجة الخامسة · #391083')}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full min-h-[300px] rounded-lg overflow-hidden border border-slate-200 bg-[#0B323D]">
                <ResilientImage
                  src="/images/pdf_extracted/img_657_1771x1181.jpg"
                  alt={t('Urban architectural skyline at dusk', 'أفق عمراني حديث عند الغروب')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-[#0B323D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#062028] border border-white/10 rounded-lg p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Compass className="w-6 h-6 text-[#7AB8E5]" aria-hidden="true" />
                <h2 className="text-xl font-bold text-[#7AB8E5]">{t('Our Vision', 'رؤيتنا')}</h2>
              </div>
              <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                {t(
                  'To provide quality, efficient, effective, and competitive services across industries throughout the Kingdom of Saudi Arabia—building upon our engineering philosophy to adapt safety and quality standards to complex projects and become a leading Construction Business House in the Kingdom.',
                  'تقديم خدمات عالية الجودة والكفاءة والتنافسية لمختلف القطاعات في المملكة العربية السعودية، والارتقاء بمعايير الهندسة والسلامة لمواكبة تعقيد المشاريع الحديثة لنكون من أنجح مؤسسات المقاولات في المملكة.'
                )}
              </p>
            </div>

            <div className="bg-[#062028] border border-white/10 rounded-lg p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-[#7AB8E5]" aria-hidden="true" />
                <h2 className="text-xl font-bold text-[#7AB8E5]">{t('Our Mission', 'رسالتنا')}</h2>
              </div>
              <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                {t(
                  'To serve as a comprehensive single-point service provider for the industrial, commercial, and residential sectors—delivering tailored construction, fencing, and surveillance projects powered by high-grade technology and uncompromised safety for Men, Materials, and Machinery.',
                  'أن نكون مزود خدمات متكامل وشامل للقطاع الصناعي والتجاري والسكني، من خلال تنفيذ المشاريع الفريدة وتبني أحدث التقنيات مع إعطاء الأولوية القصوى لسلامة الأفراد والمواد والمعدات.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="py-16 lg:py-20 bg-[#F7FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide mb-2">
              {t('Strategic Objectives', 'أهدافنا الاستراتيجية')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
              {t('Our Three Core Pillars', 'الركائز الثلاث لأدائنا')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.map((g) => (
              <div key={g.num} className="bg-white border border-slate-200 rounded-lg p-7 space-y-3">
                <span className="text-xs font-bold text-[#1A6FA8] tabular-nums">{g.num}</span>
                <h3 className="text-lg font-bold text-[#0B323D]">{t(g.title.en, g.title.ar)}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t(g.desc.en, g.desc.ar)}</p>
              </div>
            ))}
          </div>

          {/* Future Roadmap */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-xl font-bold text-[#0B323D] mb-6">
              {t('Future Growth Roadmap', 'خارطة طريق التوسع المستقبلي')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {roadmap.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5 space-y-2.5">
                    <Icon className="w-5 h-5 text-[#1A6FA8]" aria-hidden="true" />
                    <h4 className="text-sm font-bold text-[#0B323D]">{t(item.title.en, item.title.ar)}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{t(item.desc.en, item.desc.ar)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Complete Official CR, Chamber, ZATCA VAT, National Address & SNB IBAN Credentials */}
      <CredentialsSection />
    </div>
  );
};
