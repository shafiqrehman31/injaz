import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
  writeBatch,
  query,
  orderBy,
  getDoc,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { COMPANY_INFO, NAV_ITEMS, NavItem } from '../data/translations';
import {
  SERVICE_DIVISIONS,
  PROJECTS_DATA,
  GALLERY_PHOTOS,
  CLIENTS_DATA,
  JOB_OPENINGS,
  ServiceDivision,
  ProjectItem,
  GalleryPhoto,
  ClientLogo,
  JobOpening,
} from '../data/companyData';
import { DEFAULT_LEGAL_PAGES, LegalPageItem } from '../data/legalData';
import { DEFAULT_EMAIL_TEMPLATES } from '../data/emailTemplatesData';

export interface SiteSettings {
  brandEn: string;
  brandAr: string;
  phone: string;
  email: string;
  addressEn: string;
  addressAr: string;
  ceoEn: string;
  ceoAr: string;
  linkedinUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  whatsappNumber: string;
  heroTitleEn: string;
  heroTitleAr: string;
  heroSubtitleEn: string;
  heroSubtitleAr: string;
}

export interface CmsNavItem extends NavItem {
  id: string;
  order: number;
  visible: boolean;
  pageTitleEn?: string;
  pageTitleAr?: string;
  pageSubtitleEn?: string;
  pageSubtitleAr?: string;
}

export interface CmsCareerItem extends JobOpening {
  isOpen: boolean;
  order: number;
}

export interface CmsServiceItem extends ServiceDivision {
  order: number;
}

export interface CmsProjectItem extends ProjectItem {
  order: number;
}

export interface CmsGalleryItem extends GalleryPhoto {
  order: number;
}

export interface CmsClientItem extends ClientLogo {
  order: number;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandEn: COMPANY_INFO.brandEn,
  brandAr: COMPANY_INFO.brandAr,
  phone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  addressEn: COMPANY_INFO.addressEn,
  addressAr: COMPANY_INFO.addressAr,
  ceoEn: COMPANY_INFO.ceoEn,
  ceoAr: COMPANY_INFO.ceoAr,
  linkedinUrl: 'https://www.linkedin.com',
  instagramUrl: 'https://www.instagram.com',
  facebookUrl: 'https://www.facebook.com',
  twitterUrl: 'https://x.com',
  whatsappNumber: COMPANY_INFO.phoneRaw,
  heroTitleEn: 'Trusted General Contracting & Infrastructure Across Saudi Arabia',
  heroTitleAr: 'شريككم الموثوق في المقاولات العامة والبنية التحتية بالمملكة',
  heroSubtitleEn:
    'Injaz Builders delivers Saudi Aramco-grade security fencing, site surveillance systems, civil & RCC construction, MEP & steel works, earthworks, and 500+ certified manpower for industrial and Vision 2030 developments.',
  heroSubtitleAr:
    'تنفذ مؤسسة إنجاز المتفوقين للمقاولات العامة السياج الأمني بمواصفات أرامكو، وأنظمة المراقبة الذكية، والأعمال المدنية والخرسانية، والميكانيكا والحديد، والأعمال الترابية، وتوريد أكثر من 500 كادر معتمد.',
};

interface CmsContextValue {
  settings: SiteSettings;
  navItems: CmsNavItem[];
  services: CmsServiceItem[];
  projects: CmsProjectItem[];
  gallery: CmsGalleryItem[];
  careers: CmsCareerItem[];
  clients: CmsClientItem[];
  legalPages: LegalPageItem[];
  isSeededInDb: boolean;
  seedInitialCmsData: () => Promise<void>;
  submitContactInquiry: (payload: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    division?: string;
    location?: string;
    message: string;
  }) => Promise<string>;
  submitCareerApplication: (payload: {
    role: string;
    fullName: string;
    email: string;
    phone: string;
    experience?: string;
    certification?: string;
    summary?: string;
  }) => Promise<string>;
}

const CmsContext = createContext<CmsContextValue | undefined>(undefined);

const sanitizeId = (raw: string) => raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120) || 'item';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [isSeededInDb, setIsSeededInDb] = useState(false);

  const [dbNavItems, setDbNavItems] = useState<CmsNavItem[] | null>(null);
  const [dbServices, setDbServices] = useState<CmsServiceItem[] | null>(null);
  const [dbProjects, setDbProjects] = useState<CmsProjectItem[] | null>(null);
  const [dbGallery, setDbGallery] = useState<CmsGalleryItem[] | null>(null);
  const [dbCareers, setDbCareers] = useState<CmsCareerItem[] | null>(null);
  const [dbClients, setDbClients] = useState<CmsClientItem[] | null>(null);
  const [dbLegal, setDbLegal] = useState<LegalPageItem[] | null>(null);

  useEffect(() => {
    const unsubSettings = onSnapshot(
      doc(db, 'site_settings', 'main'),
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          setIsSeededInDb(true);
          setSettings({
            ...DEFAULT_SITE_SETTINGS,
            brandEn: d.brandEn || DEFAULT_SITE_SETTINGS.brandEn,
            brandAr: d.brandAr || DEFAULT_SITE_SETTINGS.brandAr,
            phone: d.phone || DEFAULT_SITE_SETTINGS.phone,
            email: d.email || DEFAULT_SITE_SETTINGS.email,
            addressEn: d.addressEn || DEFAULT_SITE_SETTINGS.addressEn,
            addressAr: d.addressAr || DEFAULT_SITE_SETTINGS.addressAr,
            ceoEn: d.ceoEn || DEFAULT_SITE_SETTINGS.ceoEn,
            ceoAr: d.ceoAr || DEFAULT_SITE_SETTINGS.ceoAr,
            linkedinUrl: d.linkedinUrl ?? DEFAULT_SITE_SETTINGS.linkedinUrl,
            instagramUrl: d.instagramUrl ?? DEFAULT_SITE_SETTINGS.instagramUrl,
            facebookUrl: d.facebookUrl ?? DEFAULT_SITE_SETTINGS.facebookUrl,
            twitterUrl: d.twitterUrl ?? DEFAULT_SITE_SETTINGS.twitterUrl,
            whatsappNumber: d.whatsappNumber ?? DEFAULT_SITE_SETTINGS.whatsappNumber,
            heroTitleEn: d.heroTitleEn || DEFAULT_SITE_SETTINGS.heroTitleEn,
            heroTitleAr: d.heroTitleAr || DEFAULT_SITE_SETTINGS.heroTitleAr,
            heroSubtitleEn: d.heroSubtitleEn || DEFAULT_SITE_SETTINGS.heroSubtitleEn,
            heroSubtitleAr: d.heroSubtitleAr || DEFAULT_SITE_SETTINGS.heroSubtitleAr,
          });
        } else {
          setIsSeededInDb(false);
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, 'site_settings/main')
    );

    const unsubNav = onSnapshot(
      query(collection(db, 'cms_nav_items'), orderBy('order', 'asc')),
      (snap) => {
        if (snap.empty) {
          setDbNavItems(null);
        } else {
          setDbNavItems(
            snap.docs.map((docSnap) => {
              const d = docSnap.data();
              return {
                id: docSnap.id,
                en: d.en,
                ar: d.ar,
                path: d.path,
                order: d.order ?? 0,
                visible: d.visible !== false,
                pageTitleEn: d.pageTitleEn,
                pageTitleAr: d.pageTitleAr,
                pageSubtitleEn: d.pageSubtitleEn,
                pageSubtitleAr: d.pageSubtitleAr,
              };
            })
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cms_nav_items')
    );

    const unsubServices = onSnapshot(
      query(collection(db, 'cms_services'), orderBy('order', 'asc')),
      (snap) => {
        if (snap.empty) {
          setDbServices(null);
        } else {
          setDbServices(
            snap.docs.map((docSnap) => {
              const d = docSnap.data();
              return {
                id: docSnap.id,
                number: d.number || '01',
                title: { en: d.titleEn, ar: d.titleAr },
                shortDesc: { en: d.shortDescEn, ar: d.shortDescAr },
                fullDesc: { en: d.fullDescEn || d.shortDescEn, ar: d.fullDescAr || d.shortDescAr },
                highlights: {
                  en: Array.isArray(d.highlightsEn) ? d.highlightsEn : [],
                  ar: Array.isArray(d.highlightsAr) ? d.highlightsAr : [],
                },
                standards:
                  d.standardsEn || d.standardsAr
                    ? { en: d.standardsEn || '', ar: d.standardsAr || '' }
                    : undefined,
                image: d.image,
                gallery: [d.image],
                order: d.order ?? 0,
              };
            })
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cms_services')
    );

    const unsubProjects = onSnapshot(
      query(collection(db, 'cms_projects'), orderBy('order', 'asc')),
      (snap) => {
        if (snap.empty) {
          setDbProjects(null);
        } else {
          setDbProjects(
            snap.docs.map((docSnap) => {
              const d = docSnap.data();
              return {
                id: docSnap.id,
                title: { en: d.titleEn, ar: d.titleAr },
                client: { en: d.clientEn, ar: d.clientAr },
                location: { en: d.locationEn || 'KSA', ar: d.locationAr || 'السعودية' },
                category: d.category,
                categoryLabel: {
                  en: d.categoryLabelEn || d.category,
                  ar: d.categoryLabelAr || d.category,
                },
                status: { en: d.statusEn || 'Completed', ar: d.statusAr || 'مكتمل' },
                summary: { en: d.summaryEn, ar: d.summaryAr },
                scope: {
                  en: Array.isArray(d.scopeEn) ? d.scopeEn : [],
                  ar: Array.isArray(d.scopeAr) ? d.scopeAr : [],
                },
                image: d.image,
                gallery: [d.image],
                order: d.order ?? 0,
              };
            })
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cms_projects')
    );

    const unsubGallery = onSnapshot(
      query(collection(db, 'cms_gallery'), orderBy('order', 'asc')),
      (snap) => {
        if (snap.empty) {
          setDbGallery(null);
        } else {
          setDbGallery(
            snap.docs.map((docSnap) => {
              const d = docSnap.data();
              return {
                id: docSnap.id,
                src: d.src,
                title: { en: d.titleEn, ar: d.titleAr },
                category: d.category,
                categoryLabel: {
                  en: d.categoryLabelEn || d.category,
                  ar: d.categoryLabelAr || d.category,
                },
                caption: { en: d.captionEn || '', ar: d.captionAr || '' },
                order: d.order ?? 0,
              };
            })
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cms_gallery')
    );

    const unsubCareers = onSnapshot(
      query(collection(db, 'cms_careers'), orderBy('order', 'asc')),
      (snap) => {
        if (snap.empty) {
          setDbCareers(null);
        } else {
          setDbCareers(
            snap.docs.map((docSnap) => {
              const d = docSnap.data();
              return {
                id: docSnap.id,
                title: { en: d.titleEn, ar: d.titleAr },
                department: { en: d.departmentEn, ar: d.departmentAr },
                location: { en: d.locationEn, ar: d.locationAr },
                type: { en: d.typeEn || 'Full-Time', ar: d.typeAr || 'دوام كامل' },
                requirements: { en: d.requirementsEn, ar: d.requirementsAr },
                isOpen: d.isOpen !== false,
                order: d.order ?? 0,
              };
            })
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cms_careers')
    );

    const unsubClients = onSnapshot(
      query(collection(db, 'cms_clients'), orderBy('order', 'asc')),
      (snap) => {
        if (snap.empty) {
          setDbClients(null);
        } else {
          setDbClients(
            snap.docs.map((docSnap) => {
              const d = docSnap.data();
              return {
                id: docSnap.id,
                name: { en: d.nameEn, ar: d.nameAr },
                sector: d.sector,
                logo: d.logo,
                order: d.order ?? 0,
              };
            })
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cms_clients')
    );

    const unsubLegal = onSnapshot(
      query(collection(db, 'cms_legal_pages'), orderBy('order', 'asc')),
      (snap) => {
        if (snap.empty) {
          setDbLegal(null);
        } else {
          setDbLegal(
            snap.docs.map((docSnap) => {
              const d = docSnap.data();
              return {
                id: docSnap.id,
                slug: d.slug,
                titleEn: d.titleEn,
                titleAr: d.titleAr,
                contentEn: d.contentEn,
                contentAr: d.contentAr,
                effectiveDate: d.effectiveDate || '2026-01-01',
                order: d.order ?? 0,
              };
            })
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cms_legal_pages')
    );

    return () => {
      unsubSettings();
      unsubNav();
      unsubServices();
      unsubProjects();
      unsubGallery();
      unsubCareers();
      unsubClients();
      unsubLegal();
    };
  }, []);

  const defaultNavItems: CmsNavItem[] = NAV_ITEMS.map((item, idx) => ({
    id: `nav_${idx + 1}`,
    ...item,
    order: idx + 1,
    visible: true,
  }));

  const navItems = dbNavItems ?? defaultNavItems;
  const services: CmsServiceItem[] =
    dbServices ?? SERVICE_DIVISIONS.map((s, idx) => ({ ...s, order: idx + 1 }));
  const projects: CmsProjectItem[] =
    dbProjects ?? PROJECTS_DATA.map((p, idx) => ({ ...p, order: idx + 1 }));
  const gallery: CmsGalleryItem[] =
    dbGallery ?? GALLERY_PHOTOS.map((g, idx) => ({ ...g, order: idx + 1 }));
  const careers: CmsCareerItem[] =
    dbCareers ?? JOB_OPENINGS.map((j, idx) => ({ ...j, isOpen: true, order: idx + 1 }));
  const clients: CmsClientItem[] =
    dbClients ?? CLIENTS_DATA.map((c, idx) => ({ ...c, order: idx + 1 }));
  const legalPages: LegalPageItem[] = dbLegal ?? DEFAULT_LEGAL_PAGES;

  const seedInitialCmsData = async () => {
    try {
      const existingSettings = await getDoc(doc(db, 'site_settings', 'main'));
      if (existingSettings.exists()) return;

      const batch = writeBatch(db);

      batch.set(doc(db, 'site_settings', 'main'), {
        ...DEFAULT_SITE_SETTINGS,
        updatedAt: serverTimestamp(),
      });

      NAV_ITEMS.forEach((nav, idx) => {
        batch.set(doc(db, 'cms_nav_items', `nav_${idx + 1}`), {
          en: nav.en,
          ar: nav.ar,
          path: nav.path,
          order: idx + 1,
          visible: true,
          updatedAt: serverTimestamp(),
        });
      });

      SERVICE_DIVISIONS.forEach((srv, idx) => {
        batch.set(doc(db, 'cms_services', sanitizeId(srv.id)), {
          number: srv.number,
          titleEn: srv.title.en,
          titleAr: srv.title.ar,
          shortDescEn: srv.shortDesc.en,
          shortDescAr: srv.shortDesc.ar,
          fullDescEn: srv.fullDesc.en,
          fullDescAr: srv.fullDesc.ar,
          highlightsEn: srv.highlights.en,
          highlightsAr: srv.highlights.ar,
          standardsEn: srv.standards?.en || '',
          standardsAr: srv.standards?.ar || '',
          image: srv.image,
          order: idx + 1,
          updatedAt: serverTimestamp(),
        });
      });

      PROJECTS_DATA.forEach((proj, idx) => {
        batch.set(doc(db, 'cms_projects', sanitizeId(proj.id)), {
          titleEn: proj.title.en,
          titleAr: proj.title.ar,
          clientEn: proj.client.en,
          clientAr: proj.client.ar,
          locationEn: proj.location.en,
          locationAr: proj.location.ar,
          category: proj.category,
          categoryLabelEn: proj.categoryLabel.en,
          categoryLabelAr: proj.categoryLabel.ar,
          statusEn: proj.status.en,
          statusAr: proj.status.ar,
          summaryEn: proj.summary.en,
          summaryAr: proj.summary.ar,
          scopeEn: proj.scope.en,
          scopeAr: proj.scope.ar,
          image: proj.image,
          order: idx + 1,
          updatedAt: serverTimestamp(),
        });
      });

      GALLERY_PHOTOS.forEach((g, idx) => {
        batch.set(doc(db, 'cms_gallery', sanitizeId(g.id)), {
          titleEn: g.title.en,
          titleAr: g.title.ar,
          category: g.category,
          categoryLabelEn: g.categoryLabel.en,
          categoryLabelAr: g.categoryLabel.ar,
          captionEn: g.caption.en,
          captionAr: g.caption.ar,
          src: g.src,
          order: idx + 1,
          updatedAt: serverTimestamp(),
        });
      });

      JOB_OPENINGS.forEach((job, idx) => {
        batch.set(doc(db, 'cms_careers', sanitizeId(job.id)), {
          titleEn: job.title.en,
          titleAr: job.title.ar,
          departmentEn: job.department.en,
          departmentAr: job.department.ar,
          locationEn: job.location.en,
          locationAr: job.location.ar,
          typeEn: job.type.en,
          typeAr: job.type.ar,
          requirementsEn: job.requirements.en,
          requirementsAr: job.requirements.ar,
          isOpen: true,
          order: idx + 1,
          updatedAt: serverTimestamp(),
        });
      });

      CLIENTS_DATA.forEach((client, idx) => {
        batch.set(doc(db, 'cms_clients', sanitizeId(client.id)), {
          nameEn: client.name.en,
          nameAr: client.name.ar,
          sector: client.sector,
          logo: client.logo,
          order: idx + 1,
          updatedAt: serverTimestamp(),
        });
      });

      DEFAULT_LEGAL_PAGES.forEach((legal) => {
        batch.set(doc(db, 'cms_legal_pages', sanitizeId(legal.id)), {
          slug: legal.slug,
          titleEn: legal.titleEn,
          titleAr: legal.titleAr,
          contentEn: legal.contentEn,
          contentAr: legal.contentAr,
          effectiveDate: legal.effectiveDate,
          order: legal.order,
          updatedAt: serverTimestamp(),
        });
      });

      DEFAULT_EMAIL_TEMPLATES.forEach((tpl) => {
        batch.set(doc(db, 'email_templates', sanitizeId(tpl.id)), {
          name: tpl.name,
          category: tpl.category,
          subjectEn: tpl.subjectEn,
          subjectAr: tpl.subjectAr,
          bodyEn: tpl.bodyEn,
          bodyAr: tpl.bodyAr,
          updatedAt: serverTimestamp(),
        });
      });

      await batch.commit();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'cms_seed');
    }
  };

  const submitContactInquiry: CmsContextValue['submitContactInquiry'] = async (payload) => {
    const id = `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const path = `contact_inquiries/${id}`;
    try {
      await setDoc(doc(db, 'contact_inquiries', id), {
        name: payload.name.trim().slice(0, 120),
        company: (payload.company || '').trim().slice(0, 160),
        email: payload.email.trim().slice(0, 160),
        phone: payload.phone.trim().slice(0, 40),
        division: (payload.division || '').trim().slice(0, 100),
        location: (payload.location || '').trim().slice(0, 160),
        message: payload.message.trim().slice(0, 3000),
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const submitCareerApplication: CmsContextValue['submitCareerApplication'] = async (payload) => {
    const id = `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const path = `career_applications/${id}`;
    try {
      await setDoc(doc(db, 'career_applications', id), {
        role: payload.role.trim().slice(0, 200),
        fullName: payload.fullName.trim().slice(0, 120),
        email: payload.email.trim().slice(0, 160),
        phone: payload.phone.trim().slice(0, 40),
        experience: (payload.experience || '').trim().slice(0, 40),
        certification: (payload.certification || '').trim().slice(0, 120),
        summary: (payload.summary || '').trim().slice(0, 2000),
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  return (
    <CmsContext.Provider
      value={{
        settings,
        navItems,
        services,
        projects,
        gallery,
        careers,
        clients,
        legalPages,
        isSeededInDb,
        seedInitialCmsData,
        submitContactInquiry,
        submitCareerApplication,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within a CmsProvider');
  return ctx;
}
