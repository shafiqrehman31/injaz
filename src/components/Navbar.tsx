import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  Globe,
  Menu,
  X,
  Linkedin,
  Instagram,
  Facebook,
  Share2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { COMPANY_INFO } from '../data/translations';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { settings, navItems } = useCms();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const visibleNavItems = navItems.filter((item) => item.visible !== false);
  const phoneClean = settings.phone.replace(/\s+/g, '');

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: settings.linkedinUrl || 'https://www.linkedin.com',
      icon: Linkedin,
    },
    {
      label: 'Instagram',
      href: settings.instagramUrl || 'https://www.instagram.com',
      icon: Instagram,
    },
    {
      label: 'Facebook',
      href: settings.facebookUrl || 'https://www.facebook.com',
      icon: Facebook,
    },
    {
      label: 'Website',
      href: settings.twitterUrl || 'https://www.injazbuilders.com',
      icon: Share2,
    },
  ].filter((s) => Boolean(s.href));

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_0_0_rgba(11,50,61,0.08)]">
      {/* Top Bar: Language Switcher & Social Media Icons + Quick Contact */}
      <div className="bg-[#062028] text-white/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 min-w-0">
            <a
              href={`tel:${phoneClean || COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-white/90 hover:text-[#7AB8E5] transition-colors whitespace-nowrap shrink-0 tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#7AB8E5]" aria-hidden="true" />
              <span dir="ltr">{settings.phone}</span>
            </a>
            <span className="hidden sm:inline text-white/25" aria-hidden="true">
              |
            </span>
            <a
              href={`mailto:${settings.email}`}
              className="hidden sm:flex items-center gap-1.5 text-white/85 hover:text-[#7AB8E5] transition-colors truncate"
            >
              <Mail className="w-3.5 h-3.5 text-[#7AB8E5] shrink-0" aria-hidden="true" />
              <span className="truncate">{settings.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Social Media Icons */}
            <div className="flex items-center gap-2" aria-label={t('Social media links', 'روابط التواصل الاجتماعي')}>
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-7 h-7 flex items-center justify-center rounded text-white/80 hover:text-[#7AB8E5] hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <span className="text-white/25" aria-hidden="true">
              |
            </span>

            {/* Language Switcher */}
            <div
              className="flex items-center bg-[#0B323D] border border-white/15 rounded p-0.5"
              role="group"
              aria-label={t('Language selector', 'تبديل اللغة')}
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#7AB8E5] text-[#062028] font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('ar')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                  lang === 'ar'
                    ? 'bg-[#7AB8E5] text-[#062028] font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-4 lg:gap-6">
        {/* Zone 1: Brand Mark + Title */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-[#1A6FA8] rounded"
        >
          <img
            src="/images/logo-mark-dark.png"
            alt={t('Injaz Builders Logo', 'شعار إنجاز للمقاولات')}
            className="h-9 w-auto object-contain shrink-0"
            referrerPolicy="no-referrer"
          />
          <span className="text-base sm:text-lg font-bold tracking-tight text-[#0B323D] whitespace-nowrap">
            {t(settings.brandEn, settings.brandAr)}
          </span>
        </Link>

        {/* Zone 2: Desktop Navigation Menu */}
        <nav
          className="hidden lg:flex items-center gap-4 xl:gap-6"
          aria-label={t('Main navigation', 'القائمة الرئيسية')}
        >
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.id || item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#1A6FA8] font-semibold'
                    : 'text-slate-700 hover:text-[#0B323D]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{t(item.en, item.ar)}</span>
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#1A6FA8] transition-transform duration-200 origin-center ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A6FA8]"
          >
            {t('Request Quote', 'اطلب عرض سعر')}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={t('Toggle navigation menu', 'فتح أو إغلاق القائمة')}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded border border-slate-200 text-[#0B323D] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 gap-1" aria-label="Mobile menu">
            {visibleNavItems.map((item) => {
              const active =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.id || item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#EEF4F8] text-[#1A6FA8] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B323D]'
                  }`}
                >
                  <span>{t(item.en, item.ar)}</span>
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors"
              >
                {t('Request Quote', 'اطلب عرض سعر')}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setLang(lang === 'en' ? 'ar' : 'en');
                  setMobileOpen(false);
                }}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#0B323D] border border-slate-200 rounded hover:bg-slate-50 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-[#1A6FA8]" aria-hidden="true" />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
