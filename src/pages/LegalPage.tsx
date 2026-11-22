import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Scale, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { PageHero } from '../components/PageHero';

export const LegalPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { dir, t } = useLanguage();
  const { legalPages } = useCms();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const activePage =
    legalPages.find((p) => p.slug === slug) || legalPages[0];

  if (!activePage) {
    return null;
  }

  return (
    <div>
      <PageHero
        title={t(activePage.titleEn, activePage.titleAr)}
        subtitle={t(
          'Corporate Governance, Regulatory Compliance, Privacy & Safety Policies — Injaz Builders (CR 2031111153).',
          'السياسات القانونية والحوكمة والخصوصية والسلامة — مؤسسة إنجاز المتفوقين للمقاولات العامة.'
        )}
        breadcrumb={t('Legal & Compliance', 'السياسات القانونية')}
      />

      <section className="py-14 lg:py-20 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Legal Navigation Sidebar */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A6FA8] px-3 pb-2 border-b border-slate-100">
              <Scale className="w-4 h-4" aria-hidden="true" />
              <span>{t('Legal & Policy Documents', 'الوثائق والسياسات القانونية')}</span>
            </div>
            <nav className="space-y-1 pt-1" aria-label={t('Legal documents', 'الوثائق القانونية')}>
              {legalPages.map((page) => {
                const isActive = page.slug === activePage.slug;
                return (
                  <Link
                    key={page.id}
                    to={`/legal/${page.slug}`}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0B323D] text-white font-semibold'
                        : 'text-slate-700 hover:bg-[#EEF4F8] hover:text-[#0B323D]'
                    }`}
                  >
                    <span>{t(page.titleEn, page.titleAr)}</span>
                    <Arrow className="w-3.5 h-3.5 opacity-70 shrink-0" aria-hidden="true" />
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Legal Document Content */}
          <article className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 sm:p-10 space-y-6">
            <div className="pb-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
                {t(activePage.titleEn, activePage.titleAr)}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-[#1A6FA8]" aria-hidden="true" />
                <span>
                  {t(`Effective: ${activePage.effectiveDate}`, `تاريخ السريان: ${activePage.effectiveDate}`)}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {t(activePage.contentEn, activePage.contentAr)}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
