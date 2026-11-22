import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { EPC_CONTRACTORS, ClientLogo } from '../data/companyData';
import { PageHero } from '../components/PageHero';
import { ResilientImage } from '../components/ResilientImage';

export const ClientsPage: React.FC = () => {
  const { dir, t } = useLanguage();
  const { clients, navItems } = useCms();
  const navMeta = navItems.find((n) => n.path === '/clients');
  const [sector, setSector] = useState<'all' | ClientLogo['sector']>('all');
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const filteredClients =
    sector === 'all' ? clients : clients.filter((c) => c.sector === sector);

  return (
    <div>
      <PageHero
        title={t(
          navMeta?.pageTitleEn || 'Our Major Clients & Partners',
          navMeta?.pageTitleAr || 'عملاؤنا وشركاء النجاح'
        )}
        subtitle={t(
          navMeta?.pageSubtitleEn ||
            'Trusted across Saudi Arabia’s energy, petrochemical, industrial, and Vision 2030 giga-project ecosystems.',
          navMeta?.pageSubtitleAr ||
            'ثقة كبرى شركات الطاقة والبتروكيماويات والصناعة ومشاريع رؤية السعودية 2030.'
        )}
        breadcrumb={t(navMeta?.en || 'Clients', navMeta?.ar || 'عملاؤنا')}
        image="/images/pdf_extracted/img_222_1703x1133.jpg"
      />

      <section className="py-14 lg:py-20 bg-[#0B323D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#7AB8E5] tracking-wide mb-2">
                {t('Client Ecosystem', 'منظومة العملاء')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t(`${clients.length}+ Enterprise & Government Entities`, `أكثر من ${clients.length} جهة حكومية وصناعية كبرى`)}
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5 p-1 bg-[#062028] border border-white/10 rounded-lg self-start md:self-auto">
              {[
                { key: 'all' as const, en: 'All Sectors', ar: 'جميع القطاعات' },
                { key: 'energy' as const, en: 'Energy & Petrochemical', ar: 'الطاقة والبتروكيماويات' },
                { key: 'vision2030' as const, en: 'Vision 2030', ar: 'مشاريع رؤية 2030' },
                { key: 'industrial' as const, en: 'Industrial & Steel', ar: 'الصناعة والحديد' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSector(tab.key)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    sector === tab.key
                      ? 'bg-[#7AB8E5] text-[#062028] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t(tab.en, tab.ar)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-[#062028] border border-white/10 hover:border-[#7AB8E5]/60 rounded-lg p-5 flex flex-col items-center justify-between gap-3 h-36 transition-colors"
              >
                <div className="flex-1 flex items-center justify-center w-full">
                  <ResilientImage
                    src={client.logo}
                    alt={t(client.name.en, client.name.ar)}
                    fallbackTitle={t(client.name.en, client.name.ar)}
                    className="max-h-14 max-w-full object-contain"
                  />
                </div>
                <span className="text-xs text-slate-300 text-center font-medium truncate w-full">
                  {t(client.name.en, client.name.ar)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Engagement & EPC Partners */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide">
              {t('How We Partner', 'منهجية الشراكة')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
              {t('Client Engagement Principles', 'التزاماتنا تجاه عملائنا')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t(
                'We serve government agencies, real estate developers, commercial owners, and Tier-1 EPC contractors with transparent project communication and dedicated after-service support.',
                'نخدم الجهات الحكومية والمطورين العقاريين والملاك التجاريين وكبرى شركات المقاولات بشفافية تامة ودعم مستمر بعد التسليم.'
              )}
            </p>
            <ul className="space-y-3 pt-2">
              {[
                {
                  en: 'Tailored engineering & BOQ solutions calibrated to site constraints',
                  ar: 'حلول هندسية وتسعير مخصص وفق متطلبات وظروف الموقع',
                },
                {
                  en: 'Transparent progress reporting & live camera monitoring access',
                  ar: 'تقارير تقدم شفافة وإمكانية متابعة حية عبر كاميرات الموقع',
                },
                {
                  en: 'Responsive after-service warranty & preventive maintenance support',
                  ar: 'ضمان ما بعد التنفيذ وخدمات الصيانة الوقائية السريعة',
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t(item.en, item.ar)}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors"
              >
                <span>{t('Pre-Qualify Injaz Builders', 'اطلب ملف التأهيل المسبق')}</span>
                <Arrow className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F7FAFC] border border-slate-200 rounded-lg p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#0B323D] mb-4">
              {t('Direct EPC Subcontracting Partners', 'شركاء المقاولات الرئيسيون')}
            </h3>
            <div className="divide-y divide-slate-200">
              {EPC_CONTRACTORS.map((item, idx) => (
                <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-semibold text-[#0B323D]">
                    {t(item.nameEn, item.nameAr)}
                  </span>
                  <span className="text-xs text-slate-600">{t(item.projectEn, item.projectAr)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
