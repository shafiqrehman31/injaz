import React, { useState } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { EPC_CONTRACTORS, ProjectItem } from '../data/companyData';
import { PageHero } from '../components/PageHero';
import { ResilientImage } from '../components/ResilientImage';
import { ProjectDetailModal } from '../components/ProjectDetailModal';

export const ProjectsPage: React.FC = () => {
  const { t } = useLanguage();
  const { projects, navItems } = useCms();
  const navMeta = navItems.find((n) => n.path === '/projects');
  const [filter, setFilter] = useState<'all' | ProjectItem['category']>('all');
  const [query, setQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filtered = projects.filter((p) => {
    const matchesCat = filter === 'all' || p.category === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.title.en.toLowerCase().includes(q) ||
      p.title.ar.includes(q) ||
      p.client.en.toLowerCase().includes(q) ||
      p.location.en.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div>
      <PageHero
        title={t(
          navMeta?.pageTitleEn || 'Completed & Ongoing Projects',
          navMeta?.pageTitleAr || 'سجل المشاريع المنجزة والجارية'
        )}
        subtitle={t(
          navMeta?.pageSubtitleEn ||
            'Proven subcontracting and turnkey delivery for Saudi Aramco, Royal Commission, SABIC, Marafiq, YASREF, and major international EPC contractors.',
          navMeta?.pageSubtitleAr ||
            'سجل حافل بالتنفيذ المباشر والباطن لصالح أرامكو السعودية والهيئة الملكية وسابك ومرافق وياسرف وكبرى شركات المقاولات العالمية.'
        )}
        breadcrumb={t(navMeta?.en || 'Projects', navMeta?.ar || 'المشاريع')}
        image="/images/pdf_extracted/img_334_694x925.jpg"
      />

      <section className="py-14 lg:py-20 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/75 rounded-lg">
              {[
                { key: 'all' as const, en: 'All Projects', ar: 'جميع المشاريع' },
                { key: 'civil' as const, en: 'Civil Works', ar: 'الأعمال المدنية' },
                { key: 'fencing' as const, en: 'Fencing', ar: 'السياج الأمني' },
                { key: 'mechanical' as const, en: 'Mechanical & Steel', ar: 'الميكانيكا والحديد' },
                { key: 'earthwork' as const, en: 'Earthwork & Asphalt', ar: 'الترابية والسفلتة' },
                { key: 'security' as const, en: 'Surveillance', ar: 'الأنظمة الأمنية' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    filter === tab.key
                      ? 'bg-white text-[#0B323D] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-[#0B323D]'
                  }`}
                >
                  {t(tab.en, tab.ar)}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('Search client, city, scope...', 'ابحث عن عميل أو مدينة...')}
                className="w-full ps-9 pe-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1A6FA8]"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3">
              <p className="text-base font-semibold text-[#0B323D]">
                {t('No projects matched your search criteria.', 'لم يتم العثور على مشاريع مطابقة لبحثك.')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter('all');
                  setQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded cursor-pointer"
              >
                {t('Reset Filters', 'إعادة ضبط البحث')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group text-start bg-white border border-slate-200 hover:border-[#1A6FA8] rounded-lg overflow-hidden transition-all duration-200 flex flex-col cursor-pointer"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#0B323D]">
                    <ResilientImage
                      src={project.image}
                      alt={t(project.title.en, project.title.ar)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between w-full space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-[#1A6FA8]">
                          {t(project.categoryLabel.en, project.categoryLabel.ar)}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{t(project.status.en, project.status.ar)}</span>
                      </div>
                      <h2 className="text-lg font-bold text-[#0B323D] group-hover:text-[#1A6FA8] transition-colors">
                        {t(project.title.en, project.title.ar)}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {t(project.summary.en, project.summary.ar)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-[#1A6FA8] shrink-0" aria-hidden="true" />
                        <span className="truncate">{t(project.client.en, project.client.ar)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#1A6FA8] shrink-0" aria-hidden="true" />
                        <span>{t(project.location.en, project.location.ar)}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EPC Track Record Table */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide mb-2">
              {t('Contracting Track Record', 'سجل عقود الباطن والإنشاء')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
              {t('Major EPC Contractors & Executed Programs', 'أبرز المقاولين الرئيسيين والمشاريع المنفذة')}
            </h2>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-[#0B323D] text-white text-xs sm:text-sm">
                  <th className="py-3.5 px-5 text-start font-semibold tabular-nums">#</th>
                  <th className="py-3.5 px-5 text-start font-semibold">
                    {t('Main Contractor / Client', 'الشركة / المقاول الرئيسي')}
                  </th>
                  <th className="py-3.5 px-5 text-start font-semibold">
                    {t('Program / Facility', 'المشروع / المنشأة')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {EPC_CONTRACTORS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F7FAFC] transition-colors">
                    <td className="py-3.5 px-5 text-slate-500 font-medium tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-[#0B323D]">
                      {t(row.nameEn, row.nameAr)}
                    </td>
                    <td className="py-3.5 px-5 text-slate-600">{t(row.projectEn, row.projectAr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
