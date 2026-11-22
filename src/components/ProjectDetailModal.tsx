import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, MapPin, Building2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { ProjectItem } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { ResilientImage } from './ResilientImage';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { dir, t } = useLanguage();
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    setActivePhoto(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const photos = project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#062028]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur border-b border-slate-200">
          <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
            <span>{t(project.categoryLabel.en, project.categoryLabel.ar)}</span>
            <span aria-hidden="true">·</span>
            <span>{t(project.status.en, project.status.ar)}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Close modal', 'إغلاق النافذة')}
            className="w-10 h-10 inline-flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:text-[#0B323D] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Active Photo + Thumbnails */}
          <div className="space-y-3">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-[#0B323D]">
              <ResilientImage
                src={photos[activePhoto]}
                alt={t(project.title.en, project.title.ar)}
                className="w-full h-full object-cover"
              />
            </div>

            {photos.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {photos.map((src, idx) => (
                  <button
                    key={src + idx}
                    type="button"
                    onClick={() => setActivePhoto(idx)}
                    className={`aspect-[4/3] overflow-hidden rounded border-2 transition-all cursor-pointer ${
                      activePhoto === idx
                        ? 'border-[#1A6FA8] ring-2 ring-[#7AB8E5]/40'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ResilientImage
                      src={src}
                      alt={`${t(project.title.en, project.title.ar)} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
              {t(project.title.en, project.title.ar)}
            </h2>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 pb-4 border-b border-slate-100">
              <span className="inline-flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#1A6FA8]" aria-hidden="true" />
                <span>{t(project.client.en, project.client.ar)}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1A6FA8]" aria-hidden="true" />
                <span>{t(project.location.en, project.location.ar)}</span>
              </span>
            </div>

            <p className="text-base text-slate-700 leading-relaxed">
              {t(project.summary.en, project.summary.ar)}
            </p>

            <div>
              <h3 className="text-sm font-semibold text-[#0B323D] mb-3">
                {t('Executed Scope & Deliverables', 'نطاق العمل والتنفيذ')}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t(project.scope.en, project.scope.ar).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              {t('Need a similar scope executed?', 'هل تحتاجون لتنفيذ نطاق عمل مماثل؟')}
            </span>
            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors"
            >
              <span>{t('Request Tender Proposal', 'طلب عرض فني ومالي')}</span>
              <Arrow className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
