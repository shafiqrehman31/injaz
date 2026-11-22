import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, FileDown, Linkedin, Instagram, Facebook, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { COMPANY_INFO } from '../data/translations';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { settings, navItems, legalPages } = useCms();

  const visibleNavItems = navItems.filter((item) => item.visible !== false);
  const phoneClean = settings.phone.replace(/\s+/g, '');

  const socialItems = [
    { name: 'LinkedIn', icon: Linkedin, href: settings.linkedinUrl || 'https://www.linkedin.com' },
    { name: 'Instagram', icon: Instagram, href: settings.instagramUrl || 'https://www.instagram.com' },
    { name: 'Facebook', icon: Facebook, href: settings.facebookUrl || 'https://www.facebook.com' },
    { name: 'Website', icon: Share2, href: settings.twitterUrl || 'https://www.injazbuilders.com' },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="bg-[#062028] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Official Stacked Logo & About */}
          <div className="lg:col-span-3 space-y-5">
            <Link to="/" className="inline-block focus-visible:outline-2 focus-visible:outline-[#7AB8E5] rounded">
              <img
                src="/images/logo-white.png"
                alt={t('Injaz Builders Logo', 'شعار إنجاز للمقاولات')}
                className="h-20 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t(
                'Achievement of Excellence Foundation for General Contracting — delivering Saudi Aramco-grade fencing, surveillance, civil, mechanical, and earthwork infrastructure across Saudi Arabia.',
                'مؤسسة إنجاز المتفوقين للمقاولات العامة — شريككم الموثوق في تنفيذ مشاريع السياج الأمني وأنظمة المراقبة والأعمال المدنية والميكانيكية والبنية التحتية في المملكة العربية السعودية.'
              )}
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {socialItems.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded border border-white/15 flex items-center justify-center text-white/80 hover:text-[#062028] hover:bg-[#7AB8E5] hover:border-[#7AB8E5] transition-colors"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation Pages */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-[#7AB8E5] tracking-wide mb-4">
              {t('Explore Pages', 'روابط الموقع')}
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5 text-sm">
              {visibleNavItems.map((item) => (
                <li key={item.id || item.path}>
                  <Link
                    to={item.path}
                    className="text-slate-300 hover:text-[#7AB8E5] transition-colors inline-block"
                  >
                    {t(item.en, item.ar)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Compliance Pages */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-[#7AB8E5] tracking-wide mb-4">
              {t('Legal & Compliance', 'السياسات القانونية')}
            </h2>
            <ul className="space-y-2.5 text-sm">
              {legalPages.map((lp) => (
                <li key={lp.id}>
                  <Link
                    to={`/legal/${lp.slug}`}
                    className="text-slate-300 hover:text-[#7AB8E5] transition-colors inline-block"
                  >
                    {t(lp.titleEn, lp.titleAr)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Credentials & Profile Download */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-[#7AB8E5] tracking-wide mb-4">
              {t('Credentials', 'الاعتمادات الرسمية')}
            </h2>
            <dl className="space-y-3 text-sm text-slate-300">
              <div>
                <dt className="text-xs text-slate-400">{t('Commercial Reg. (CR)', 'السجل التجاري')}</dt>
                <dd className="font-medium text-white tabular-nums">{COMPANY_INFO.crNumber}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t('Unified / VAT No.', 'الرقم الضريبي')}</dt>
                <dd className="font-medium text-white tabular-nums">311461995800003</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t('Asharqia Chamber', 'غرفة الشرقية')}</dt>
                <dd className="font-medium text-white tabular-nums">#{COMPANY_INFO.chamberNo}</dd>
              </div>
            </dl>
            <a
              href={COMPANY_INFO.profilePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#062028] bg-[#7AB8E5] hover:bg-[#95C9EE] rounded transition-colors"
            >
              <FileDown className="w-4 h-4" aria-hidden="true" />
              <span>{t('Company Profile PDF', 'تحميل الملف التعريفي')}</span>
            </a>
          </div>

          {/* Column 5: Head Office Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-[#7AB8E5] tracking-wide mb-4">
              {t('Head Office', 'المقر الرئيسي')}
            </h2>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7AB8E5] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t(settings.addressEn, settings.addressAr)}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7AB8E5] shrink-0" aria-hidden="true" />
                <a href={`tel:${phoneClean || COMPANY_INFO.phoneRaw}`} className="hover:text-[#7AB8E5] tabular-nums" dir="ltr">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7AB8E5] shrink-0" aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#7AB8E5] break-all">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {t(settings.brandEn, settings.brandAr)} —{' '}
            {t(COMPANY_INFO.legalEn, COMPANY_INFO.legalAr)}. {t('All rights reserved.', 'جميع الحقوق محفوظة.')}
          </p>
          <p className="text-slate-400">
            {t('ISO 9001 · ISO 27001 · ISO 22301 · ISO 10002', 'ISO 9001 · ISO 27001 · ISO 22301 · ISO 10002')}
          </p>
        </div>
      </div>
    </footer>
  );
};
