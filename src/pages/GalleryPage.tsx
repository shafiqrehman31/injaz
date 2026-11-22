import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { GalleryPhoto } from '../data/companyData';
import { PageHero } from '../components/PageHero';
import { ResilientImage } from '../components/ResilientImage';

export const GalleryPage: React.FC = () => {
  const { dir, t } = useLanguage();
  const { gallery, navItems } = useCms();
  const navMeta = navItems.find((n) => n.path === '/gallery');
  const [category, setCategory] = useState<'all' | GalleryPhoto['category']>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    category === 'all' ? gallery : gallery.filter((g) => g.category === category);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + (dir === 'rtl' ? -1 : 1) + filtered.length) % filtered.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + (dir === 'rtl' ? 1 : -1) + filtered.length) % filtered.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filtered.length, dir]);

  const activePhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div>
      <PageHero
        title={t(
          navMeta?.pageTitleEn || 'Site Operations & Project Gallery',
          navMeta?.pageTitleAr || 'معرض الصور والأعمال الميدانية'
        )}
        subtitle={t(
          navMeta?.pageSubtitleEn ||
            'On-site photography from Injaz Builders civil corridors, Saudi Aramco & Sea Port fencing installations, steel erection, asphalt paving, and security masts.',
          navMeta?.pageSubtitleAr ||
            'صور حقيقية من مواقع عمل إنجاز للمقاولات تشمل السياج الأمني، الأعمال المدنية، سفلتة الطرق، تركيب الهياكل الحديدية، وأنظمة المراقبة.'
        )}
        breadcrumb={t(navMeta?.en || 'Gallery', navMeta?.ar || 'المعرض')}
        image="/images/pdf_extracted/img_421_840x630.jpg"
      />

      <section className="py-14 lg:py-20 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Interactive Category Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200">
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/75 rounded-lg">
              {[
                { key: 'all' as const, en: 'All Photos', ar: 'الكل' },
                { key: 'fencing' as const, en: 'Fencing', ar: 'السياج الأمني' },
                { key: 'security' as const, en: 'Security Systems', ar: 'الأنظمة الأمنية' },
                { key: 'mechanical' as const, en: 'Mechanical & Steel', ar: 'الميكانيكا والحديد' },
                { key: 'civil' as const, en: 'Civil Works', ar: 'الأعمال المدنية' },
                { key: 'asphalt' as const, en: 'Asphalt Work', ar: 'السفلتة' },
                { key: 'earthwork' as const, en: 'Earth Works', ar: 'الأعمال الترابية' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setCategory(tab.key);
                    setLightboxIndex(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    category === tab.key
                      ? 'bg-white text-[#0B323D] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-[#0B323D]'
                  }`}
                >
                  {t(tab.en, tab.ar)}
                </button>
              ))}
            </div>

            <p className="text-xs font-medium text-slate-500 tabular-nums">
              {t(`Showing ${filtered.length} field photos`, `عرض ${filtered.length} صورة ميدانية`)}
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group text-start bg-white border border-slate-200 hover:border-[#1A6FA8] rounded-lg overflow-hidden transition-all duration-200 flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1A6FA8]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0B323D]">
                  <ResilientImage
                    src={photo.src}
                    alt={t(photo.title.en, photo.title.ar)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-full bg-white/95 text-[#0B323D] flex items-center justify-center shadow">
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-1.5">
                  <p className="text-xs font-medium text-[#1A6FA8]">
                    {t(photo.categoryLabel.en, photo.categoryLabel.ar)}
                  </p>
                  <h2 className="text-base font-bold text-[#0B323D] group-hover:text-[#1A6FA8] transition-colors">
                    {t(photo.title.en, photo.title.ar)}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {t(photo.caption.en, photo.caption.ar)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Lightbox */}
      {activePhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#062028]/92 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0B323D] border border-white/15 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 text-white">
              <div className="text-xs text-[#7AB8E5] font-medium flex items-center gap-2 tabular-nums">
                <span>{t(activePhoto.categoryLabel.en, activePhoto.categoryLabel.ar)}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label={t('Close lightbox', 'إغلاق المعرض')}
                className="w-9 h-9 inline-flex items-center justify-center rounded border border-white/20 text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-[#062028] flex items-center justify-center max-h-[70vh] min-h-[320px]">
              <ResilientImage
                src={activePhoto.src}
                alt={t(activePhoto.title.en, activePhoto.title.ar)}
                className="max-h-[70vh] w-auto object-contain"
              />

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
                }
                aria-label={t('Previous photo', 'الصورة السابقة')}
                className="absolute start-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#062028]/80 border border-white/20 text-white hover:bg-[#7AB8E5] hover:text-[#062028] flex items-center justify-center transition-colors cursor-pointer"
              >
                {dir === 'rtl' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % filtered.length)}
                aria-label={t('Next photo', 'الصورة التالية')}
                className="absolute end-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#062028]/80 border border-white/20 text-white hover:bg-[#7AB8E5] hover:text-[#062028] flex items-center justify-center transition-colors cursor-pointer"
              >
                {dir === 'rtl' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>

            <div className="px-6 py-4 bg-[#0B323D] text-white border-t border-white/10">
              <h3 className="text-base sm:text-lg font-bold">
                {t(activePhoto.title.en, activePhoto.title.ar)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {t(activePhoto.caption.en, activePhoto.caption.ar)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
