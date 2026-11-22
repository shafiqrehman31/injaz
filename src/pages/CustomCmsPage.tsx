import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CmsNavItem } from '../context/CmsContext';
import { PageHero } from '../components/PageHero';

export const CustomCmsPage: React.FC<{ navItem: CmsNavItem }> = ({ navItem }) => {
  const { dir, t } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const title = t(
    navItem.pageTitleEn || navItem.en,
    navItem.pageTitleAr || navItem.ar
  );
  const subtitle = t(
    navItem.pageSubtitleEn ||
      'Injaz Builders — General Contracting, Infrastructure & Certified Manpower Across Saudi Arabia.',
    navItem.pageSubtitleAr ||
      'إنجاز للمقاولات — المقاولات العامة والبنية التحتية وتوريد الكوادر المعتمدة في المملكة العربية السعودية.'
  );

  return (
    <div>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={t(navItem.en, navItem.ar)}
        image="/images/pdf_extracted/img_729_2818x1879.jpg"
      />

      <section className="py-16 lg:py-20 bg-[#F7FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-[#0B323D]">{title}</h2>
            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {subtitle}
            </p>
            <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors"
              >
                <span>{t('Contact Our Team', 'تواصل مع فريقنا')}</span>
                <Arrow className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B323D] border border-slate-300 hover:border-[#0B323D] rounded transition-colors"
              >
                <span>{t('Explore Services', 'استعراض الخدمات')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
