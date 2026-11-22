import React, { useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Save,
  Mail,
  Send,
  Copy,
  Check,
  ArrowLeft,
  Menu as MenuIcon,
  Image as ImageIcon,
  Briefcase,
  FolderKanban,
  Wrench,
  Scale,
  Settings,
  Inbox,
  FileText,
  Users,
  RefreshCw,
} from 'lucide-react';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';
import { useCms, DEFAULT_SITE_SETTINGS, SiteSettings } from '../context/CmsContext';
import { DEFAULT_EMAIL_TEMPLATES, EmailTemplateItem } from '../data/emailTemplatesData';

const BOOTSTRAPPED_ADMINS = [
  'shafiq.rehman31@gmail.com',
  'bakhtiarkhan@injazbuilders.com',
];

const GALLERY_PRESET_IMAGES = [
  '/images/pdf_extracted/img_493_768x576.jpg',
  '/images/pdf_extracted/img_494_468x624.jpg',
  '/images/pdf_extracted/img_497_546x728.jpg',
  '/images/pdf_extracted/flate_507_480x640.png',
  '/images/pdf_extracted/img_505_547x610.jpg',
  '/images/pdf_extracted/flate_397_1024x683.png',
  '/images/pdf_extracted/flate_395_677x506.png',
  '/images/pdf_extracted/flate_405_1440x735.png',
  '/images/pdf_extracted/img_332_576x768.jpg',
  '/images/pdf_extracted/img_334_694x925.jpg',
  '/images/pdf_extracted/img_345_480x640.jpg',
  '/images/pdf_extracted/img_421_840x630.jpg',
  '/images/pdf_extracted/img_420_700x700.jpg',
  '/images/pdf_extracted/img_433_747x497.jpg',
  '/images/pdf_extracted/img_729_2818x1879.jpg',
  '/images/pdf_extracted/img_702_2074x1556.jpg',
];

type AdminTab =
  | 'inbox'
  | 'templates'
  | 'menu'
  | 'gallery'
  | 'career'
  | 'projects'
  | 'services'
  | 'clients'
  | 'legal'
  | 'settings';

interface ContactInquiryDoc {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  division?: string;
  location?: string;
  message: string;
  status: 'new' | 'replied' | 'archived';
  replyNotes?: string;
  createdAt?: any;
}

interface CareerAppDoc {
  id: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  experience?: string;
  certification?: string;
  summary?: string;
  status: 'new' | 'replied' | 'shortlisted' | 'archived';
  replyNotes?: string;
  createdAt?: any;
}

const makeSafeId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const AdminPortal: React.FC<{ onExitAdmin: () => void }> = ({ onExitAdmin }) => {
  const {
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
  } = useCms();

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<AdminTab>('inbox');
  const [toast, setToast] = useState('');
  const [seeding, setSeeding] = useState(false);

  // Private admin collections (only loaded AFTER verified admin check)
  const [inquiries, setInquiries] = useState<ContactInquiryDoc[]>([]);
  const [applications, setApplications] = useState<CareerAppDoc[]>([]);
  const [templates, setTemplates] = useState<EmailTemplateItem[]>(DEFAULT_EMAIL_TEMPLATES);

  // Reply Composer state
  const [replyTarget, setReplyTarget] = useState<{
    type: 'inquiry' | 'application';
    item: ContactInquiryDoc | CareerAppDoc;
  } | null>(null);
  const [replyLang, setReplyLang] = useState<'en' | 'ar'>('en');
  const [selectedTplId, setSelectedTplId] = useState<string>('');
  const [replySubject, setReplySubject] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [copiedReply, setCopiedReply] = useState(false);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // 1. Auth & Admin Verification Gate
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setAuthLoading(true);
      setAuthError('');
      if (!currentUser) {
        setUser(null);
        setIsAuthorizedAdmin(false);
        setAuthLoading(false);
        return;
      }

      setUser(currentUser);
      const emailLower = (currentUser.email || '').toLowerCase();
      if (!currentUser.emailVerified) {
        setIsAuthorizedAdmin(false);
        setAuthError('Your account email is not verified.');
        setAuthLoading(false);
        return;
      }

      if (BOOTSTRAPPED_ADMINS.includes(emailLower)) {
        setIsAuthorizedAdmin(true);
        setAuthLoading(false);
        return;
      }

      try {
        const adminSnap = await getDoc(doc(db, 'admins', currentUser.uid));
        if (adminSnap.exists()) {
          setIsAuthorizedAdmin(true);
        } else {
          setIsAuthorizedAdmin(false);
          setAuthError(`Access Denied: ${currentUser.email} is not an authorized administrator.`);
        }
      } catch {
        setIsAuthorizedAdmin(false);
        setAuthError('Access Denied: Unable to verify administrator privileges.');
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // 2. Auto-seed Firestore on first verified admin login
  useEffect(() => {
    if (isAuthorizedAdmin && !isSeededInDb && !seeding) {
      setSeeding(true);
      seedInitialCmsData()
        .then(() => notify('Database initialized with Injaz Builders Profile data.'))
        .catch(() => {})
        .finally(() => setSeeding(false));
    }
  }, [isAuthorizedAdmin, isSeededInDb]);

  // 3. Attach private admin listeners ONLY when isAuthorizedAdmin is true
  useEffect(() => {
    if (!isAuthorizedAdmin) {
      setInquiries([]);
      setApplications([]);
      return;
    }

    const unsubInq = onSnapshot(
      query(collection(db, 'contact_inquiries'), orderBy('createdAt', 'desc')),
      (snap) => {
        setInquiries(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ContactInquiryDoc, 'id'>) }))
        );
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'contact_inquiries')
    );

    const unsubApp = onSnapshot(
      query(collection(db, 'career_applications'), orderBy('createdAt', 'desc')),
      (snap) => {
        setApplications(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<CareerAppDoc, 'id'>) }))
        );
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'career_applications')
    );

    const unsubTpl = onSnapshot(
      collection(db, 'email_templates'),
      (snap) => {
        if (!snap.empty) {
          setTemplates(
            snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<EmailTemplateItem, 'id'>) }))
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'email_templates')
    );

    return () => {
      unsubInq();
      unsubApp();
      unsubTpl();
    };
  }, [isAuthorizedAdmin]);

  const handleGoogleSignIn = async () => {
    setAuthError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setAuthError(err?.message || 'Sign-in cancelled or failed.');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setIsAuthorizedAdmin(false);
  };

  // --- Email Template Interpolation Helper ---
  const applyTemplateToReply = (
    tplId: string,
    langChoice: 'en' | 'ar',
    target: { type: 'inquiry' | 'application'; item: ContactInquiryDoc | CareerAppDoc }
  ) => {
    const tpl = templates.find((t) => t.id === tplId) || templates[0];
    if (!tpl) return;
    setSelectedTplId(tpl.id);
    setReplyLang(langChoice);

    let subj = langChoice === 'ar' ? tpl.subjectAr || tpl.subjectEn : tpl.subjectEn;
    let body = langChoice === 'ar' ? tpl.bodyAr || tpl.bodyEn : tpl.bodyEn;

    const vars: Record<string, string> =
      target.type === 'inquiry'
        ? {
            name: (target.item as ContactInquiryDoc).name || '',
            company: (target.item as ContactInquiryDoc).company || 'your organization',
            division: (target.item as ContactInquiryDoc).division || 'Contracting',
            location: (target.item as ContactInquiryDoc).location || 'Saudi Arabia',
            role: '',
            certification: '',
          }
        : {
            name: (target.item as CareerAppDoc).fullName || '',
            company: 'Injaz Builders',
            division: 'Recruitment',
            location: 'Al Jubail, KSA',
            role: (target.item as CareerAppDoc).role || '',
            certification: (target.item as CareerAppDoc).certification || 'Technical Credentials',
          };

    Object.entries(vars).forEach(([k, v]) => {
      const rx = new RegExp(`{{\\s*${k}\\s*}}`, 'g');
      subj = subj.replace(rx, v);
      body = body.replace(rx, v);
    });

    setReplySubject(subj);
    setReplyBody(body);
  };

  const openReplyComposer = (
    type: 'inquiry' | 'application',
    item: ContactInquiryDoc | CareerAppDoc
  ) => {
    const target = { type, item };
    setReplyTarget(target);
    const preferred =
      templates.find((t) => t.category === (type === 'inquiry' ? 'inquiry' : 'career')) ||
      templates[0];
    if (preferred) {
      applyTemplateToReply(preferred.id, 'en', target);
    }
  };

  const markReplied = async (notes?: string) => {
    if (!replyTarget) return;
    const col = replyTarget.type === 'inquiry' ? 'contact_inquiries' : 'career_applications';
    const path = `${col}/${replyTarget.item.id}`;
    try {
      await updateDoc(doc(db, col, replyTarget.item.id), {
        status: 'replied',
        replyNotes: (notes || `Replied via template (${new Date().toLocaleDateString()})`).slice(0, 2000),
      });
      notify('Status updated to Replied in Firebase.');
      setReplyTarget(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  // --- SECURITY GATE VIEW (Rendered BEFORE Login / Verification) ---
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#062028] text-white flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <ShieldCheck className="w-10 h-10 text-[#7AB8E5] mx-auto animate-pulse" />
          <p className="text-sm text-slate-300">Verifying Administrator Security Session...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-[#062028] text-white flex items-center justify-center p-4 bg-architectural-grid">
        <div className="w-full max-w-md bg-[#0B323D] border border-white/15 rounded-lg p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <img
              src="/images/logo-white.png"
              alt="Injaz Builders"
              className="h-14 w-auto object-contain"
            />
            <span className="text-xs font-semibold text-[#7AB8E5] border border-[#7AB8E5]/30 px-2.5 py-1 rounded">
              #admin Portal
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Restricted CMS Login</h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sign in with your verified Injaz Builders administrator Google account to manage menu pages, projects, gallery, careers, email templates, and contact settings.
            </p>
          </div>

          {authError && (
            <div role="alert" className="p-3.5 text-xs font-medium text-red-200 bg-red-950/60 border border-red-400/30 rounded">
              {authError}
            </div>
          )}

          {!user ? (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-semibold text-[#062028] bg-[#7AB8E5] hover:bg-[#95C9EE] rounded transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In with Google (Admin)</span>
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                Signed in as <strong className="text-white">{user.email}</strong>
              </p>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out & Switch Account</span>
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 text-[#7AB8E5] hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
            <span>Firebase Secured</span>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD ---
  const tabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'inbox', label: `Inbox (${inquiries.length + applications.length})`, icon: Inbox },
    { id: 'templates', label: 'Email Templates', icon: FileText },
    { id: 'menu', label: 'Menu & Pages', icon: MenuIcon },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'legal', label: 'Legal Pages', icon: Scale },
    { id: 'settings', label: 'Contact & Social', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0B222A]">
      {/* Admin Top Header */}
      <header className="bg-[#062028] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/logo-mark-white.png" alt="Injaz" className="h-8 w-auto" />
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white">Injaz Builders CMS (#admin)</h1>
              <p className="text-[11px] text-[#7AB8E5] truncate max-w-[220px] sm:max-w-none">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {toast && (
              <span className="hidden md:inline-block text-xs font-medium bg-[#7AB8E5] text-[#062028] px-3 py-1 rounded">
                {toast}
              </span>
            )}
            <button
              type="button"
              onClick={async () => {
                setSeeding(true);
                await seedInitialCmsData();
                setSeeding(false);
                notify('Firestore data synced.');
              }}
              disabled={seeding}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
              <span>Sync DB</span>
            </button>
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Site</span>
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-600/90 hover:bg-red-600 rounded cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {toast && (
        <div className="md:hidden bg-[#7AB8E5] text-[#062028] text-xs font-semibold text-center py-2 px-4">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Horizontal Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0B323D] text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B323D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: INBOX & REPLY */}
        {activeTab === 'inbox' && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#0B323D]">
                Contact & RFP Inquiries ({inquiries.length})
              </h2>
              {inquiries.length === 0 ? (
                <p className="text-sm text-slate-500">No inquiries submitted yet.</p>
              ) : (
                <div className="divide-y divide-slate-200">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="py-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-bold text-[#0B323D] text-sm">{inq.name}</span>
                          {inq.company && <span className="text-slate-500">· {inq.company}</span>}
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              inq.status === 'replied'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-sky-100 text-sky-900'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 tabular-nums">
                          {inq.email} · {inq.phone} {inq.division ? `· Division: ${inq.division}` : ''}{' '}
                          {inq.location ? `· ${inq.location}` : ''}
                        </p>
                        <p className="text-sm text-slate-700 pt-1">{inq.message}</p>
                        {inq.replyNotes && (
                          <p className="text-xs text-emerald-700 pt-1">Note: {inq.replyNotes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => openReplyComposer('inquiry', inq)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply with Template</span>
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await deleteDoc(doc(db, 'contact_inquiries', inq.id));
                              notify('Inquiry deleted.');
                            } catch (err) {
                              handleFirestoreError(err, OperationType.DELETE, `contact_inquiries/${inq.id}`);
                            }
                          }}
                          aria-label="Delete inquiry"
                          className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#0B323D]">
                Career Applications ({applications.length})
              </h2>
              {applications.length === 0 ? (
                <p className="text-sm text-slate-500">No job applications submitted yet.</p>
              ) : (
                <div className="divide-y divide-slate-200">
                  {applications.map((app) => (
                    <div key={app.id} className="py-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-bold text-[#0B323D] text-sm">{app.fullName}</span>
                          <span className="text-[#1A6FA8] font-medium">· {app.role}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              app.status === 'replied'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-sky-100 text-sky-900'
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 tabular-nums">
                          {app.email} · {app.phone} · Exp: {app.experience || 'N/A'} · Cert: {app.certification || 'N/A'}
                        </p>
                        {app.summary && <p className="text-sm text-slate-700 pt-1">{app.summary}</p>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => openReplyComposer('application', app)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply with Template</span>
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await deleteDoc(doc(db, 'career_applications', app.id));
                              notify('Application deleted.');
                            } catch (err) {
                              handleFirestoreError(err, OperationType.DELETE, `career_applications/${app.id}`);
                            }
                          }}
                          aria-label="Delete application"
                          className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: EMAIL TEMPLATES */}
        {activeTab === 'templates' && (
          <EmailTemplatesManager templates={templates} notify={notify} />
        )}

        {/* TAB 3: MENU & PAGES */}
        {activeTab === 'menu' && (
          <MenuManager navItems={navItems} notify={notify} />
        )}

        {/* TAB 4: GALLERY */}
        {activeTab === 'gallery' && (
          <GalleryManager gallery={gallery} notify={notify} />
        )}

        {/* TAB 5: CAREER */}
        {activeTab === 'career' && (
          <CareerManager careers={careers} notify={notify} />
        )}

        {/* TAB 6: PROJECTS */}
        {activeTab === 'projects' && (
          <ProjectsManager projects={projects} notify={notify} />
        )}

        {/* TAB 7: SERVICES */}
        {activeTab === 'services' && (
          <ServicesManager services={services} notify={notify} />
        )}

        {/* TAB 8: CLIENTS */}
        {activeTab === 'clients' && (
          <ClientsManager clients={clients} notify={notify} />
        )}

        {/* TAB 9: LEGAL PAGES */}
        {activeTab === 'legal' && (
          <LegalManager legalPages={legalPages} notify={notify} />
        )}

        {/* TAB 10: CONTACT, SOCIAL URLS & SITE SETTINGS */}
        {activeTab === 'settings' && (
          <SettingsManager settings={settings} notify={notify} />
        )}
      </div>

      {/* Email Reply Composer Modal */}
      {replyTarget && (
        <div
          className="fixed inset-0 z-50 bg-[#062028]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setReplyTarget(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-lg border border-slate-200 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#0B323D]">Reply Using Email Template</h3>
                <p className="text-xs text-slate-500">To: {replyTarget.item.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setReplyTarget(null)}
                className="text-xs text-slate-500 hover:text-[#0B323D] px-2 py-1 border border-slate-200 rounded cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0B323D] mb-1">Template</label>
                <select
                  value={selectedTplId}
                  onChange={(e) => applyTemplateToReply(e.target.value, replyLang, replyTarget)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
                >
                  {templates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.name} ({tpl.category})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0B323D] mb-1">Language</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => applyTemplateToReply(selectedTplId, 'en', replyTarget)}
                    className={`flex-1 py-2 text-xs font-semibold rounded border cursor-pointer ${
                      replyLang === 'en' ? 'bg-[#0B323D] text-white border-[#0B323D]' : 'bg-white border-slate-300'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplateToReply(selectedTplId, 'ar', replyTarget)}
                    className={`flex-1 py-2 text-xs font-semibold rounded border cursor-pointer ${
                      replyLang === 'ar' ? 'bg-[#0B323D] text-white border-[#0B323D]' : 'bg-white border-slate-300'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B323D] mb-1">Subject</label>
              <input
                type="text"
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                dir={replyLang === 'ar' ? 'rtl' : 'ltr'}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B323D] mb-1">Email Body</label>
              <textarea
                rows={10}
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                dir={replyLang === 'ar' ? 'rtl' : 'ltr'}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded font-sans"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`Subject: ${replySubject}\n\n${replyBody}`);
                  setCopiedReply(true);
                  setTimeout(() => setCopiedReply(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-slate-300 rounded hover:bg-slate-50 cursor-pointer"
              >
                {copiedReply ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedReply ? 'Copied!' : 'Copy Email'}</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${replyTarget.item.email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`}
                  onClick={() => markReplied(`Sent via mailto (${selectedTplId})`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1A6FA8] hover:bg-[#145B8B] rounded"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open Email App & Mark Replied</span>
                </a>
                <button
                  type="button"
                  onClick={() => markReplied(`Marked replied (${selectedTplId})`)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded cursor-pointer"
                >
                  Mark Replied
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------------- SUB-MANAGERS ----------------

const EmailTemplatesManager: React.FC<{
  templates: EmailTemplateItem[];
  notify: (m: string) => void;
}> = ({ templates, notify }) => {
  const [editing, setEditing] = useState<EmailTemplateItem>({
    id: '',
    name: '',
    category: 'inquiry',
    subjectEn: '',
    subjectAr: '',
    bodyEn: '',
    bodyAr: '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editing.id || makeSafeId('tpl');
    try {
      await setDoc(doc(db, 'email_templates', id), {
        name: editing.name.trim(),
        category: editing.category,
        subjectEn: editing.subjectEn.trim(),
        subjectAr: editing.subjectAr.trim(),
        bodyEn: editing.bodyEn.trim(),
        bodyAr: editing.bodyAr.trim(),
        updatedAt: serverTimestamp(),
      });
      notify('Email template saved to Firebase.');
      setEditing({ id: '', name: '', category: 'inquiry', subjectEn: '', subjectAr: '', bodyEn: '', bodyAr: '' });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `email_templates/${id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <form onSubmit={handleSave} className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0B323D]">
          {editing.id ? 'Edit Email Template' : 'Add Email Template'}
        </h2>
        <p className="text-xs text-slate-500">
          Placeholders supported: {'{{name}}'}, {'{{company}}'}, {'{{division}}'}, {'{{location}}'}, {'{{role}}'}, {'{{certification}}'}
        </p>
        <input
          required
          placeholder="Template Name (e.g. Tender Quote Follow-up)"
          value={editing.name}
          onChange={(e) => setEditing({ ...editing, name: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
        />
        <select
          value={editing.category}
          onChange={(e) => setEditing({ ...editing, category: e.target.value as any })}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
        >
          <option value="inquiry">Inquiry / RFP</option>
          <option value="career">Career / Candidate</option>
          <option value="general">General</option>
        </select>
        <input
          required
          placeholder="Subject (English)"
          value={editing.subjectEn}
          onChange={(e) => setEditing({ ...editing, subjectEn: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
        />
        <input
          dir="rtl"
          placeholder="الموضوع (بالعربية)"
          value={editing.subjectAr}
          onChange={(e) => setEditing({ ...editing, subjectAr: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
        />
        <textarea
          required
          rows={5}
          placeholder="Email Body (English)"
          value={editing.bodyEn}
          onChange={(e) => setEditing({ ...editing, bodyEn: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
        />
        <textarea
          rows={5}
          dir="rtl"
          placeholder="نص الرسالة (بالعربية)"
          value={editing.bodyAr}
          onChange={(e) => setEditing({ ...editing, bodyAr: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
        />
        <div className="flex gap-2">
          <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded cursor-pointer">
            <Save className="w-3.5 h-3.5" />
            <span>Save Template</span>
          </button>
          {editing.id && (
            <button
              type="button"
              onClick={() => setEditing({ id: '', name: '', category: 'inquiry', subjectEn: '', subjectAr: '', bodyEn: '', bodyAr: '' })}
              className="px-3 py-2 text-xs border border-slate-300 rounded cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">Saved Email Templates ({templates.length})</h2>
        <div className="divide-y divide-slate-200">
          {templates.map((tpl) => (
            <div key={tpl.id} className="py-3.5 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-sm text-[#0B323D]">{tpl.name} <span className="text-xs text-[#1A6FA8]">({tpl.category})</span></p>
                <p className="text-xs text-slate-600 mt-0.5">{tpl.subjectEn}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditing(tpl)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteDoc(doc(db, 'email_templates', tpl.id));
                      notify('Template deleted.');
                    } catch (err) {
                      handleFirestoreError(err, OperationType.DELETE, `email_templates/${tpl.id}`);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuManager: React.FC<{ navItems: any[]; notify: (m: string) => void }> = ({ navItems, notify }) => {
  const [form, setForm] = useState({
    id: '',
    en: '',
    ar: '',
    path: '/',
    order: navItems.length + 1,
    visible: true,
    pageTitleEn: '',
    pageTitleAr: '',
    pageSubtitleEn: '',
    pageSubtitleAr: '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id || makeSafeId('nav');
    try {
      await setDoc(doc(db, 'cms_nav_items', id), {
        en: form.en.trim(),
        ar: form.ar.trim(),
        path: form.path.trim(),
        order: Number(form.order) || 1,
        visible: form.visible,
        pageTitleEn: form.pageTitleEn.trim(),
        pageTitleAr: form.pageTitleAr.trim(),
        pageSubtitleEn: form.pageSubtitleEn.trim(),
        pageSubtitleAr: form.pageSubtitleAr.trim(),
        updatedAt: serverTimestamp(),
      });
      notify('Menu item saved to Firebase.');
      setForm({ id: '', en: '', ar: '', path: '/', order: navItems.length + 1, visible: true, pageTitleEn: '', pageTitleAr: '', pageSubtitleEn: '', pageSubtitleAr: '' });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `cms_nav_items/${id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <form onSubmit={handleSave} className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">
          {form.id ? 'Edit Menu Item & Page Content' : 'Add New Menu Item / Page'}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Label (English)" value={form.en} onChange={(e) => setForm({ ...form, en: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
          <input required dir="rtl" placeholder="الاسم (بالعربية)" value={form.ar} onChange={(e) => setForm({ ...form, ar: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Route Path (e.g. /projects)" value={form.path} onChange={(e) => setForm({ ...form, path: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
          <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <input placeholder="Custom Page Title (English, optional)" value={form.pageTitleEn} onChange={(e) => setForm({ ...form, pageTitleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <input dir="rtl" placeholder="عنوان الصفحة (بالعربية - اختياري)" value={form.pageTitleAr} onChange={(e) => setForm({ ...form, pageTitleAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea rows={2} placeholder="Page Subtitle / Intro (English)" value={form.pageSubtitleEn} onChange={(e) => setForm({ ...form, pageSubtitleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea rows={2} dir="rtl" placeholder="وصف الصفحة (بالعربية)" value={form.pageSubtitleAr} onChange={(e) => setForm({ ...form, pageSubtitleAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
          <span>Visible in Header Navigation</span>
        </label>
        <div className="flex gap-2">
          <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded cursor-pointer">
            <Save className="w-3.5 h-3.5" />
            <span>Save Menu Item</span>
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm({ id: '', en: '', ar: '', path: '/', order: navItems.length + 1, visible: true, pageTitleEn: '', pageTitleAr: '', pageSubtitleEn: '', pageSubtitleAr: '' })} className="px-3 py-2 text-xs border border-slate-300 rounded cursor-pointer">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">Navigation Menu Items ({navItems.length})</h2>
        <div className="divide-y divide-slate-200">
          {navItems.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#0B323D]">
                  #{item.order} · {item.en} / {item.ar}{' '}
                  {!item.visible && <span className="text-xs text-amber-700">(Hidden)</span>}
                </p>
                <p className="text-xs text-slate-500">{item.path}</p>
              </div>
              <div className="flex gap-1.5">
                <button type="button" onClick={() => setForm({ ...item, pageTitleEn: item.pageTitleEn || '', pageTitleAr: item.pageTitleAr || '', pageSubtitleEn: item.pageSubtitleEn || '', pageSubtitleAr: item.pageSubtitleAr || '' })} className="p-2 text-slate-600 hover:bg-slate-100 rounded cursor-pointer">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteDoc(doc(db, 'cms_nav_items', item.id));
                      notify('Menu item deleted.');
                    } catch (err) {
                      handleFirestoreError(err, OperationType.DELETE, `cms_nav_items/${item.id}`);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GalleryManager: React.FC<{ gallery: any[]; notify: (m: string) => void }> = ({ gallery, notify }) => {
  const [form, setForm] = useState({
    id: '',
    titleEn: '',
    titleAr: '',
    category: 'fencing',
    categoryLabelEn: 'Fencing',
    categoryLabelAr: 'السياج الأمني',
    captionEn: '',
    captionAr: '',
    src: GALLERY_PRESET_IMAGES[0],
    order: gallery.length + 1,
  });

  const catLabels: Record<string, { en: string; ar: string }> = {
    fencing: { en: 'Fencing', ar: 'السياج الأمني' },
    security: { en: 'Security Systems', ar: 'الأنظمة الأمنية' },
    mechanical: { en: 'Mechanical & Steel', ar: 'الميكانيكا والحديد' },
    civil: { en: 'Civil Works', ar: 'الأعمال المدنية' },
    asphalt: { en: 'Asphalt Work', ar: 'أعمال السفلتة' },
    earthwork: { en: 'Earth Works', ar: 'الأعمال الترابية' },
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id || makeSafeId('gal');
    const lbl = catLabels[form.category] || catLabels.fencing;
    try {
      await setDoc(doc(db, 'cms_gallery', id), {
        titleEn: form.titleEn.trim(),
        titleAr: form.titleAr.trim(),
        category: form.category,
        categoryLabelEn: lbl.en,
        categoryLabelAr: lbl.ar,
        captionEn: form.captionEn.trim(),
        captionAr: form.captionAr.trim(),
        src: form.src.trim(),
        order: Number(form.order) || 1,
        updatedAt: serverTimestamp(),
      });
      notify('Gallery project photo saved.');
      setForm({ id: '', titleEn: '', titleAr: '', category: 'fencing', categoryLabelEn: 'Fencing', categoryLabelAr: 'السياج الأمني', captionEn: '', captionAr: '', src: GALLERY_PRESET_IMAGES[0], order: gallery.length + 1 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `cms_gallery/${id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <form onSubmit={handleSave} className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">
          {form.id ? 'Edit Gallery Item' : 'Add New Project to Gallery'}
        </h2>
        <input required placeholder="Title (English)" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <input required dir="rtl" placeholder="العنوان (بالعربية)" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <div className="grid grid-cols-2 gap-3">
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded">
            <option value="fencing">Fencing</option>
            <option value="security">Security Systems</option>
            <option value="mechanical">Mechanical & Steel</option>
            <option value="civil">Civil Works</option>
            <option value="asphalt">Asphalt Work</option>
            <option value="earthwork">Earth Works</option>
          </select>
          <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <input required placeholder="Image URL (/images/... or https://...)" value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <select value={GALLERY_PRESET_IMAGES.includes(form.src) ? form.src : ''} onChange={(e) => e.target.value && setForm({ ...form, src: e.target.value })} className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-slate-50">
          <option value="">-- Or Pick Extracted Site Photo --</option>
          {GALLERY_PRESET_IMAGES.map((p) => (
            <option key={p} value={p}>{p.split('/').pop()}</option>
          ))}
        </select>
        <textarea rows={2} placeholder="Caption (English)" value={form.captionEn} onChange={(e) => setForm({ ...form, captionEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea rows={2} dir="rtl" placeholder="الوصف (بالعربية)" value={form.captionAr} onChange={(e) => setForm({ ...form, captionAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <div className="flex gap-2">
          <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>{form.id ? 'Update Gallery Item' : 'Add to Gallery'}</span>
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm({ id: '', titleEn: '', titleAr: '', category: 'fencing', categoryLabelEn: 'Fencing', categoryLabelAr: 'السياج الأمني', captionEn: '', captionAr: '', src: GALLERY_PRESET_IMAGES[0], order: gallery.length + 1 })} className="px-3 py-2 text-xs border border-slate-300 rounded cursor-pointer">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">Gallery Items ({gallery.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
          {gallery.map((item) => (
            <div key={item.id} className="border border-slate-200 rounded p-3 flex gap-3 items-center">
              <img src={item.src} alt={item.title.en} className="w-16 h-14 object-cover rounded shrink-0 bg-slate-100" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#0B323D] truncate">{item.title.en}</p>
                <p className="text-[11px] text-[#1A6FA8]">{item.category}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setForm({
                    id: item.id,
                    titleEn: item.title.en,
                    titleAr: item.title.ar,
                    category: item.category,
                    categoryLabelEn: item.categoryLabel.en,
                    categoryLabelAr: item.categoryLabel.ar,
                    captionEn: item.caption.en,
                    captionAr: item.caption.ar,
                    src: item.src,
                    order: item.order || 1,
                  })}
                  className="p-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteDoc(doc(db, 'cms_gallery', item.id));
                      notify('Gallery item deleted.');
                    } catch (err) {
                      handleFirestoreError(err, OperationType.DELETE, `cms_gallery/${item.id}`);
                    }
                  }}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CareerManager: React.FC<{ careers: any[]; notify: (m: string) => void }> = ({ careers, notify }) => {
  const [form, setForm] = useState({
    id: '',
    titleEn: '',
    titleAr: '',
    departmentEn: '',
    departmentAr: '',
    locationEn: 'Al Jubail, KSA',
    locationAr: 'الجبيل، السعودية',
    typeEn: 'Full-Time · Site Based',
    typeAr: 'دوام كامل · ميداني',
    requirementsEn: '',
    requirementsAr: '',
    isOpen: true,
    order: careers.length + 1,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id || makeSafeId('job');
    try {
      await setDoc(doc(db, 'cms_careers', id), {
        titleEn: form.titleEn.trim(),
        titleAr: form.titleAr.trim(),
        departmentEn: form.departmentEn.trim(),
        departmentAr: form.departmentAr.trim(),
        locationEn: form.locationEn.trim(),
        locationAr: form.locationAr.trim(),
        typeEn: form.typeEn.trim(),
        typeAr: form.typeAr.trim(),
        requirementsEn: form.requirementsEn.trim(),
        requirementsAr: form.requirementsAr.trim(),
        isOpen: form.isOpen,
        order: Number(form.order) || 1,
        updatedAt: serverTimestamp(),
      });
      notify('Career opportunity saved.');
      setForm({ id: '', titleEn: '', titleAr: '', departmentEn: '', departmentAr: '', locationEn: 'Al Jubail, KSA', locationAr: 'الجبيل، السعودية', typeEn: 'Full-Time · Site Based', typeAr: 'دوام كامل · ميداني', requirementsEn: '', requirementsAr: '', isOpen: true, order: careers.length + 1 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `cms_careers/${id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <form onSubmit={handleSave} className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">
          {form.id ? 'Edit Career Opportunity' : 'Add New Career Opportunity'}
        </h2>
        <input required placeholder="Job Title (English)" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <input required dir="rtl" placeholder="المسمى الوظيفي (بالعربية)" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Department (EN)" value={form.departmentEn} onChange={(e) => setForm({ ...form, departmentEn: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
          <input required dir="rtl" placeholder="القسم (AR)" value={form.departmentAr} onChange={(e) => setForm({ ...form, departmentAr: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Location (EN)" value={form.locationEn} onChange={(e) => setForm({ ...form, locationEn: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
          <input required dir="rtl" placeholder="الموقع (AR)" value={form.locationAr} onChange={(e) => setForm({ ...form, locationAr: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Type (EN)" value={form.typeEn} onChange={(e) => setForm({ ...form, typeEn: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
          <input dir="rtl" placeholder="نوع الدوام (AR)" value={form.typeAr} onChange={(e) => setForm({ ...form, typeAr: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <textarea required rows={3} placeholder="Requirements (English)" value={form.requirementsEn} onChange={(e) => setForm({ ...form, requirementsEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea required rows={3} dir="rtl" placeholder="المتطلبات (بالعربية)" value={form.requirementsAr} onChange={(e) => setForm({ ...form, requirementsAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isOpen} onChange={(e) => setForm({ ...form, isOpen: e.target.checked })} />
          <span>Position Open for Applications</span>
        </label>
        <div className="flex gap-2">
          <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>{form.id ? 'Update Role' : 'Publish Opportunity'}</span>
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm({ id: '', titleEn: '', titleAr: '', departmentEn: '', departmentAr: '', locationEn: 'Al Jubail, KSA', locationAr: 'الجبيل، السعودية', typeEn: 'Full-Time · Site Based', typeAr: 'دوام كامل · ميداني', requirementsEn: '', requirementsAr: '', isOpen: true, order: careers.length + 1 })} className="px-3 py-2 text-xs border border-slate-300 rounded cursor-pointer">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">Career Openings ({careers.length})</h2>
        <div className="divide-y divide-slate-200">
          {careers.map((job) => (
            <div key={job.id} className="py-3.5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#0B323D]">
                  {job.title.en} {!job.isOpen && <span className="text-xs text-red-600">(Closed)</span>}
                </p>
                <p className="text-xs text-slate-500">{job.department.en} · {job.location.en}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setForm({
                    id: job.id,
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
                    isOpen: job.isOpen !== false,
                    order: job.order || 1,
                  })}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteDoc(doc(db, 'cms_careers', job.id));
                      notify('Career opening deleted.');
                    } catch (err) {
                      handleFirestoreError(err, OperationType.DELETE, `cms_careers/${job.id}`);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsManager: React.FC<{ projects: any[]; notify: (m: string) => void }> = ({ projects, notify }) => {
  const [form, setForm] = useState({
    id: '',
    titleEn: '',
    titleAr: '',
    clientEn: '',
    clientAr: '',
    locationEn: 'Al Jubail, KSA',
    locationAr: 'الجبيل، السعودية',
    category: 'civil',
    statusEn: 'Completed',
    statusAr: 'مكتمل',
    summaryEn: '',
    summaryAr: '',
    scopeTextEn: '',
    scopeTextAr: '',
    image: GALLERY_PRESET_IMAGES[8],
    order: projects.length + 1,
  });

  const catLabels: Record<string, { en: string; ar: string }> = {
    civil: { en: 'Civil Works', ar: 'الأعمال المدنية' },
    fencing: { en: 'High-Security Fencing', ar: 'السياج الأمني' },
    mechanical: { en: 'Mechanical & Steel', ar: 'الأعمال الميكانيكية' },
    earthwork: { en: 'Earthwork & Trenching', ar: 'الأعمال الترابية والخنادق' },
    security: { en: 'Security & Civil', ar: 'الأمن والإنشاءات' },
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id || makeSafeId('proj');
    const lbl = catLabels[form.category] || catLabels.civil;
    try {
      await setDoc(doc(db, 'cms_projects', id), {
        titleEn: form.titleEn.trim(),
        titleAr: form.titleAr.trim(),
        clientEn: form.clientEn.trim(),
        clientAr: form.clientAr.trim(),
        locationEn: form.locationEn.trim(),
        locationAr: form.locationAr.trim(),
        category: form.category,
        categoryLabelEn: lbl.en,
        categoryLabelAr: lbl.ar,
        statusEn: form.statusEn.trim(),
        statusAr: form.statusAr.trim(),
        summaryEn: form.summaryEn.trim(),
        summaryAr: form.summaryAr.trim(),
        scopeEn: form.scopeTextEn.split('\n').map((s) => s.trim()).filter(Boolean).slice(0, 10),
        scopeAr: form.scopeTextAr.split('\n').map((s) => s.trim()).filter(Boolean).slice(0, 10),
        image: form.image.trim(),
        order: Number(form.order) || 1,
        updatedAt: serverTimestamp(),
      });
      notify('Project saved to Firebase.');
      setForm({ id: '', titleEn: '', titleAr: '', clientEn: '', clientAr: '', locationEn: 'Al Jubail, KSA', locationAr: 'الجبيل، السعودية', category: 'civil', statusEn: 'Completed', statusAr: 'مكتمل', summaryEn: '', summaryAr: '', scopeTextEn: '', scopeTextAr: '', image: GALLERY_PRESET_IMAGES[8], order: projects.length + 1 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `cms_projects/${id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <form onSubmit={handleSave} className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">{form.id ? 'Edit Project' : 'Add New Project'}</h2>
        <input required placeholder="Project Title (EN)" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <input required dir="rtl" placeholder="اسم المشروع (AR)" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Client (EN)" value={form.clientEn} onChange={(e) => setForm({ ...form, clientEn: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
          <input required dir="rtl" placeholder="العميل (AR)" value={form.clientAr} onChange={(e) => setForm({ ...form, clientAr: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded">
            <option value="civil">Civil Works</option>
            <option value="fencing">Fencing</option>
            <option value="mechanical">Mechanical & Steel</option>
            <option value="earthwork">Earthwork</option>
            <option value="security">Security</option>
          </select>
          <input placeholder="Location (EN)" value={form.locationEn} onChange={(e) => setForm({ ...form, locationEn: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <input required placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea required rows={3} placeholder="Summary (EN)" value={form.summaryEn} onChange={(e) => setForm({ ...form, summaryEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea required rows={3} dir="rtl" placeholder="ملخص المشروع (AR)" value={form.summaryAr} onChange={(e) => setForm({ ...form, summaryAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea rows={2} placeholder="Scope Deliverables (EN, 1 per line)" value={form.scopeTextEn} onChange={(e) => setForm({ ...form, scopeTextEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <div className="flex gap-2">
          <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded cursor-pointer">
            <Save className="w-3.5 h-3.5" />
            <span>Save Project</span>
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm({ id: '', titleEn: '', titleAr: '', clientEn: '', clientAr: '', locationEn: 'Al Jubail, KSA', locationAr: 'الجبيل، السعودية', category: 'civil', statusEn: 'Completed', statusAr: 'مكتمل', summaryEn: '', summaryAr: '', scopeTextEn: '', scopeTextAr: '', image: GALLERY_PRESET_IMAGES[8], order: projects.length + 1 })} className="px-3 py-2 text-xs border border-slate-300 rounded cursor-pointer">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">Projects ({projects.length})</h2>
        <div className="divide-y divide-slate-200">
          {projects.map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img src={p.image} alt={p.title.en} className="w-14 h-12 object-cover rounded shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#0B323D] truncate">{p.title.en}</p>
                  <p className="text-xs text-slate-500 truncate">{p.client.en}</p>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setForm({
                    id: p.id,
                    titleEn: p.title.en,
                    titleAr: p.title.ar,
                    clientEn: p.client.en,
                    clientAr: p.client.ar,
                    locationEn: p.location.en,
                    locationAr: p.location.ar,
                    category: p.category,
                    statusEn: p.status.en,
                    statusAr: p.status.ar,
                    summaryEn: p.summary.en,
                    summaryAr: p.summary.ar,
                    scopeTextEn: (p.scope?.en || []).join('\n'),
                    scopeTextAr: (p.scope?.ar || []).join('\n'),
                    image: p.image,
                    order: p.order || 1,
                  })}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteDoc(doc(db, 'cms_projects', p.id));
                      notify('Project deleted.');
                    } catch (err) {
                      handleFirestoreError(err, OperationType.DELETE, `cms_projects/${p.id}`);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServicesManager: React.FC<{ services: any[]; notify: (m: string) => void }> = ({ services, notify }) => {
  const [form, setForm] = useState({
    id: '',
    number: '08',
    titleEn: '',
    titleAr: '',
    shortDescEn: '',
    shortDescAr: '',
    fullDescEn: '',
    fullDescAr: '',
    highlightsTextEn: '',
    highlightsTextAr: '',
    image: GALLERY_PRESET_IMAGES[0],
    order: services.length + 1,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id || makeSafeId('srv');
    try {
      await setDoc(doc(db, 'cms_services', id), {
        number: form.number.trim(),
        titleEn: form.titleEn.trim(),
        titleAr: form.titleAr.trim(),
        shortDescEn: form.shortDescEn.trim(),
        shortDescAr: form.shortDescAr.trim(),
        fullDescEn: (form.fullDescEn || form.shortDescEn).trim(),
        fullDescAr: (form.fullDescAr || form.shortDescAr).trim(),
        highlightsEn: form.highlightsTextEn.split('\n').map((s) => s.trim()).filter(Boolean).slice(0, 10),
        highlightsAr: form.highlightsTextAr.split('\n').map((s) => s.trim()).filter(Boolean).slice(0, 10),
        image: form.image.trim(),
        order: Number(form.order) || 1,
        updatedAt: serverTimestamp(),
      });
      notify('Service division saved.');
      setForm({ id: '', number: String(services.length + 2).padStart(2, '0'), titleEn: '', titleAr: '', shortDescEn: '', shortDescAr: '', fullDescEn: '', fullDescAr: '', highlightsTextEn: '', highlightsTextAr: '', image: GALLERY_PRESET_IMAGES[0], order: services.length + 1 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `cms_services/${id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <form onSubmit={handleSave} className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">{form.id ? 'Edit Service Division' : 'Add Service Division'}</h2>
        <div className="grid grid-cols-3 gap-3">
          <input required placeholder="No. (01)" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
          <input required placeholder="Title (EN)" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className="col-span-2 px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <input required dir="rtl" placeholder="اسم الخدمة (AR)" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea required rows={2} placeholder="Short Description (EN)" value={form.shortDescEn} onChange={(e) => setForm({ ...form, shortDescEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea required rows={2} dir="rtl" placeholder="وصف مختصر (AR)" value={form.shortDescAr} onChange={(e) => setForm({ ...form, shortDescAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea rows={3} placeholder="Key Highlights (EN, 1 per line)" value={form.highlightsTextEn} onChange={(e) => setForm({ ...form, highlightsTextEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <input required placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <div className="flex gap-2">
          <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded cursor-pointer">
            <Save className="w-3.5 h-3.5" />
            <span>Save Service</span>
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm({ id: '', number: '08', titleEn: '', titleAr: '', shortDescEn: '', shortDescAr: '', fullDescEn: '', fullDescAr: '', highlightsTextEn: '', highlightsTextAr: '', image: GALLERY_PRESET_IMAGES[0], order: services.length + 1 })} className="px-3 py-2 text-xs border border-slate-300 rounded cursor-pointer">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">Service Divisions ({services.length})</h2>
        <div className="divide-y divide-slate-200">
          {services.map((s) => (
            <div key={s.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#0B323D]">{s.number}. {s.title.en}</p>
                <p className="text-xs text-slate-500 line-clamp-1">{s.shortDesc.en}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setForm({
                    id: s.id,
                    number: s.number,
                    titleEn: s.title.en,
                    titleAr: s.title.ar,
                    shortDescEn: s.shortDesc.en,
                    shortDescAr: s.shortDesc.ar,
                    fullDescEn: s.fullDesc.en,
                    fullDescAr: s.fullDesc.ar,
                    highlightsTextEn: (s.highlights?.en || []).join('\n'),
                    highlightsTextAr: (s.highlights?.ar || []).join('\n'),
                    image: s.image,
                    order: s.order || 1,
                  })}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteDoc(doc(db, 'cms_services', s.id));
                      notify('Service deleted.');
                    } catch (err) {
                      handleFirestoreError(err, OperationType.DELETE, `cms_services/${s.id}`);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClientsManager: React.FC<{ clients: any[]; notify: (m: string) => void }> = ({ clients, notify }) => {
  const [form, setForm] = useState({
    id: '',
    nameEn: '',
    nameAr: '',
    sector: 'energy',
    logo: '/images/clients/aramco.png',
    order: clients.length + 1,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id || makeSafeId('cli');
    try {
      await setDoc(doc(db, 'cms_clients', id), {
        nameEn: form.nameEn.trim(),
        nameAr: form.nameAr.trim(),
        sector: form.sector,
        logo: form.logo.trim(),
        order: Number(form.order) || 1,
        updatedAt: serverTimestamp(),
      });
      notify('Client saved.');
      setForm({ id: '', nameEn: '', nameAr: '', sector: 'energy', logo: '/images/clients/aramco.png', order: clients.length + 1 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `cms_clients/${id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <form onSubmit={handleSave} className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">{form.id ? 'Edit Client' : 'Add Client'}</h2>
        <input required placeholder="Client Name (EN)" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <input required dir="rtl" placeholder="اسم العميل (AR)" value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <select value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded">
          <option value="energy">Energy & Petrochemical</option>
          <option value="vision2030">Vision 2030</option>
          <option value="industrial">Industrial & Steel</option>
        </select>
        <input required placeholder="Logo URL" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded cursor-pointer">
          <Save className="w-3.5 h-3.5" />
          <span>Save Client</span>
        </button>
      </form>

      <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">Clients ({clients.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto">
          {clients.map((c) => (
            <div key={c.id} className="border border-slate-200 rounded p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-10 bg-[#062028] rounded flex items-center justify-center p-1.5 shrink-0">
                  <img src={c.logo} alt={c.name.en} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#0B323D] truncate">{c.name.en}</p>
                  <p className="text-[11px] text-slate-500">{c.sector}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => setForm({ id: c.id, nameEn: c.name.en, nameAr: c.name.ar, sector: c.sector, logo: c.logo, order: c.order || 1 })} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteDoc(doc(db, 'cms_clients', c.id));
                      notify('Client deleted.');
                    } catch (err) {
                      handleFirestoreError(err, OperationType.DELETE, `cms_clients/${c.id}`);
                    }
                  }}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LegalManager: React.FC<{ legalPages: any[]; notify: (m: string) => void }> = ({ legalPages, notify }) => {
  const [form, setForm] = useState({
    id: '',
    slug: '',
    titleEn: '',
    titleAr: '',
    contentEn: '',
    contentAr: '',
    effectiveDate: '2026-01-01',
    order: legalPages.length + 1,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSlug = form.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const id = form.id || cleanSlug || makeSafeId('legal');
    try {
      await setDoc(doc(db, 'cms_legal_pages', id), {
        slug: cleanSlug || id,
        titleEn: form.titleEn.trim(),
        titleAr: form.titleAr.trim(),
        contentEn: form.contentEn.trim(),
        contentAr: form.contentAr.trim(),
        effectiveDate: form.effectiveDate.trim(),
        order: Number(form.order) || 1,
        updatedAt: serverTimestamp(),
      });
      notify('Legal page saved.');
      setForm({ id: '', slug: '', titleEn: '', titleAr: '', contentEn: '', contentAr: '', effectiveDate: '2026-01-01', order: legalPages.length + 1 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `cms_legal_pages/${id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <form onSubmit={handleSave} className="lg:col-span-6 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">{form.id ? 'Edit Legal Page' : 'Add Legal Page'}</h2>
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Slug (e.g. privacy-policy)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
          <input placeholder="Effective Date" value={form.effectiveDate} onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <input required placeholder="Title (EN)" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <input required dir="rtl" placeholder="العنوان (AR)" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea required rows={5} placeholder="Policy Content (EN)" value={form.contentEn} onChange={(e) => setForm({ ...form, contentEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <textarea required rows={5} dir="rtl" placeholder="محتوى السياسة (AR)" value={form.contentAr} onChange={(e) => setForm({ ...form, contentAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        <div className="flex gap-2">
          <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded cursor-pointer">
            <Save className="w-3.5 h-3.5" />
            <span>Save Legal Page</span>
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm({ id: '', slug: '', titleEn: '', titleAr: '', contentEn: '', contentAr: '', effectiveDate: '2026-01-01', order: legalPages.length + 1 })} className="px-3 py-2 text-xs border border-slate-300 rounded cursor-pointer">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-6 bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#0B323D]">Legal Pages ({legalPages.length})</h2>
        <div className="divide-y divide-slate-200">
          {legalPages.map((lp) => (
            <div key={lp.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#0B323D]">{lp.titleEn} / {lp.titleAr}</p>
                <p className="text-xs text-slate-500">/legal/{lp.slug}</p>
              </div>
              <div className="flex gap-1.5">
                <button type="button" onClick={() => setForm(lp)} className="p-2 text-slate-600 hover:bg-slate-100 rounded cursor-pointer">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteDoc(doc(db, 'cms_legal_pages', lp.id));
                      notify('Legal page deleted.');
                    } catch (err) {
                      handleFirestoreError(err, OperationType.DELETE, `cms_legal_pages/${lp.id}`);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SettingsManager: React.FC<{ settings: SiteSettings; notify: (m: string) => void }> = ({ settings, notify }) => {
  const [form, setForm] = useState<SiteSettings>(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'site_settings', 'main'), {
        ...DEFAULT_SITE_SETTINGS,
        ...form,
        updatedAt: serverTimestamp(),
      });
      notify('Contact & social media URLs updated in Firebase.');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'site_settings/main');
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0B323D]">Contact Info, Social Media URLs & Hero Copy</h2>
          <p className="text-xs text-slate-500">Updates reflect immediately across the top bar, footer, contact page, and home hero.</p>
        </div>
        <button type="submit" className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded cursor-pointer">
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Phone Number</label>
          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Business Email</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Address (English)</label>
          <input required value={form.addressEn} onChange={(e) => setForm({ ...form, addressEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Address (Arabic)</label>
          <input required dir="rtl" value={form.addressAr} onChange={(e) => setForm({ ...form, addressAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">LinkedIn URL</label>
          <input value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Instagram URL</label>
          <input value={form.instagramUrl} onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Facebook URL</label>
          <input value={form.facebookUrl} onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">X (Twitter) / Website URL</label>
          <input value={form.twitterUrl} onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Hero Headline (English)</label>
          <input value={form.heroTitleEn} onChange={(e) => setForm({ ...form, heroTitleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Hero Headline (Arabic)</label>
          <input dir="rtl" value={form.heroTitleAr} onChange={(e) => setForm({ ...form, heroTitleAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Hero Subtitle (English)</label>
          <textarea rows={3} value={form.heroSubtitleEn} onChange={(e) => setForm({ ...form, heroSubtitleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B323D] mb-1">Hero Subtitle (Arabic)</label>
          <textarea rows={3} dir="rtl" value={form.heroSubtitleAr} onChange={(e) => setForm({ ...form, heroSubtitleAr: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded" />
        </div>
      </div>
    </form>
  );
};
