import React, { useState } from 'react';
import {
  Award,
  FileDown,
  ZoomIn,
  X,
  FileText,
  Landmark,
  MapPin,
  ShieldCheck,
  Receipt,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { COMPANY_INFO } from '../data/translations';
import { ResilientImage } from './ResilientImage';

interface ZoomModalState {
  type: 'image' | 'pdf';
  src: string;
  title: string;
}

const VAT_PDF_PATH = '/assets/aistudio/__________________________________________2__004cf69d.PDF';
const IBAN_IMG_PATH = '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.50.53_PM_876a54dc.jpeg';
const ADDRESS_IMG_PATH = '/assets/aistudio/injaz_proof-of-address__1__46a832ab.png';
const CR_QR_IMG_PATH = '/images/pdf_extracted/flate_162_1051x730.png';
const CHAMBER_IMG_PATH = '/images/chamber-cert.png';

export const CredentialsSection: React.FC = () => {
  const { t } = useLanguage();
  const [zoomDoc, setZoomDoc] = useState<ZoomModalState | null>(null);

  return (
    <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#1A6FA8] tracking-wide mb-2">
              {t('Our CR & Verified Compliance Dossier', 'السجل التجاري والوثائق الرسمية المعتمدة')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B323D]">
              {t(
                'Commercial Registration, ZATCA VAT, National Address & IBAN',
                'السجل التجاري، شهادة الضريبة، العنوان الوطني والآيبان البنكي'
              )}
            </h2>
          </div>
          <a
            href={COMPANY_INFO.profilePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors self-start md:self-auto"
          >
            <FileDown className="w-4 h-4" aria-hidden="true" />
            <span>{t('Download Full Profile PDF', 'تحميل الملف التعريفي الكامل')}</span>
          </a>
        </div>

        {/* 1. Ministry of Commerce CR + Asharqia Chamber */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Ministry of Commerce CR QR */}
          <div className="bg-[#F7FAFC] border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B323D]">
                    {t('Saudi Ministry of Commerce — Commercial QR', 'وزارة التجارة — الرمز التجاري الموحد')}
                  </h3>
                  <p className="text-xs text-slate-500 tabular-nums mt-0.5">
                    {t(`CR Number: ${COMPANY_INFO.crNumber} · مؤسسة إنجاز المتفوقين للمقاولات العامة`, `السجل التجاري: ${COMPANY_INFO.crNumber}`)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setZoomDoc({
                    type: 'image',
                    src: CR_QR_IMG_PATH,
                    title: t('Ministry of Commerce CR Verification (2031111153)', 'التحقق من السجل التجاري — وزارة التجارة'),
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1A6FA8] border border-slate-300 bg-white rounded hover:border-[#1A6FA8] shrink-0 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('View', 'عرض')}</span>
              </button>
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded border border-slate-200 bg-white">
              <ResilientImage
                src={CR_QR_IMG_PATH}
                alt={t('Ministry of Commerce Commercial Registration QR Code 2031111153', 'الرمز التجاري من وزارة التجارة')}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Asharqia Chamber Membership */}
          <div className="bg-[#F7FAFC] border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B323D]">
                    {t('Asharqia Chamber Membership Certificate', 'شهادة اشتراك غرفة الشرقية')}
                  </h3>
                  <p className="text-xs text-slate-500 tabular-nums mt-0.5">
                    {t(
                      `Unified No: ${COMPANY_INFO.unifiedNumber} · Membership: ${COMPANY_INFO.chamberNo} · Fifth Class`,
                      `الرقم الموحد: ${COMPANY_INFO.unifiedNumber} · اشتراك: ${COMPANY_INFO.chamberNo} · الدرجة الخامسة`
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setZoomDoc({
                    type: 'image',
                    src: CHAMBER_IMG_PATH,
                    title: t('Asharqia Chamber Membership Certificate (#391083)', 'شهادة اشتراك الغرفة التجارية بالمنطقة الشرقية'),
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1A6FA8] border border-slate-300 bg-white rounded hover:border-[#1A6FA8] shrink-0 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('View', 'عرض')}</span>
              </button>
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded border border-slate-200 bg-white">
              <ResilientImage
                src={CHAMBER_IMG_PATH}
                alt={t('Asharqia Chamber Membership Certificate #391083', 'شهادة عضوية غرفة الشرقية 391083')}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* 2. ZATCA VAT Certificate (PDF) + National Address Proof + SNB IBAN Letter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ZATCA VAT Registration Certificate (Attached PDF) */}
          <div className="bg-[#F7FAFC] border border-slate-200 rounded-lg p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <Receipt className="w-5 h-5 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-bold text-[#0B323D]">
                      {t('ZATCA VAT Registration Certificate', 'شهادة التسجيل في ضريبة القيمة المضافة')}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {t('Zakat, Tax and Customs Authority', 'هيئة الزكاة والضريبة والجمارك')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded p-4 space-y-2.5 text-xs">
                <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500">{t('Taxpayer', 'اسم المكلف')}</span>
                  <span className="font-semibold text-[#0B323D] text-end">مؤسسة إنجاز المتفوقين للمقاولات العامة</span>
                </div>
                <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500">{t('VAT Registration No.', 'الرقم الضريبي')}</span>
                  <span className="font-bold text-[#0B323D] tabular-nums" dir="ltr">311461995800003</span>
                </div>
                <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500">{t('TIN', 'الرقم المميز')}</span>
                  <span className="font-semibold text-[#0B323D] tabular-nums" dir="ltr">3114619958</span>
                </div>
                <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500">{t('Certificate No.', 'رقم الشهادة')}</span>
                  <span className="font-semibold text-[#0B323D] tabular-nums" dir="ltr">100231087336872</span>
                </div>
                <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500">{t('Effective Date', 'تاريخ النفاذ')}</span>
                  <span className="font-semibold text-[#0B323D] tabular-nums" dir="ltr">2023/10/01</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">{t('Tax Period', 'الفترة الضريبية')}</span>
                  <span className="font-semibold text-[#0B323D]">{t('Quarterly', 'ربع سنوي')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() =>
                  setZoomDoc({
                    type: 'pdf',
                    src: VAT_PDF_PATH,
                    title: t('ZATCA VAT Registration Certificate (PDF)', 'شهادة التسجيل في ضريبة القيمة المضافة (PDF)'),
                  })
                }
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#0B323D] hover:bg-[#124857] rounded transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('Preview VAT PDF', 'معاينة الشهادة')}</span>
              </button>
              <a
                href={VAT_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B323D] bg-white border border-slate-300 hover:border-[#0B323D] rounded transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('Download', 'تحميل')}</span>
              </a>
            </div>
          </div>

          {/* National Address Proof (Attached PNG) */}
          <div className="bg-[#F7FAFC] border border-slate-200 rounded-lg p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-bold text-[#0B323D]">
                      {t('National Address Proof (SPL)', 'إثبات العنوان الوطني المعتمد')}
                    </h3>
                    <p className="text-xs text-slate-500 tabular-nums mt-0.5">
                      {t('Short Address: ENAA4674 · Proof #1097392267', 'العنوان المختصر: ENAA4674 · رقم الإثبات: 1097392267')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setZoomDoc({
                      type: 'image',
                      src: ADDRESS_IMG_PATH,
                      title: t('Saudi National Address Proof (ENAA4674)', 'إثبات العنوان الوطني — مؤسسة إنجاز المتفوقين'),
                    })
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#1A6FA8] border border-slate-300 bg-white rounded hover:border-[#1A6FA8] shrink-0 cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t('View', 'عرض')}</span>
                </button>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded border border-slate-200 bg-white">
                <ResilientImage
                  src={ADDRESS_IMG_PATH}
                  alt={t('Injaz Builders Saudi National Address Proof ENAA4674', 'إثبات العنوان الوطني لمؤسسة إنجاز')}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-slate-600">
              {t(
                '4674 Prince Naif, Al Merqab Dist., Al Jubail 35514, KSA',
                '4674 الأمير نايف، حي المرقاب، الجبيل 35514، المملكة العربية السعودية'
              )}
            </p>
          </div>

          {/* SNB IBAN Letter (Attached JPEG) */}
          <div className="bg-[#F7FAFC] border border-slate-200 rounded-lg p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <Landmark className="w-5 h-5 text-[#1A6FA8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-bold text-[#0B323D]">
                      {t('Saudi National Bank (SNB) IBAN Letter', 'خطاب الآيبان — البنك الأهلي السعودي')}
                    </h3>
                    <p className="text-xs text-slate-500 tabular-nums mt-0.5">
                      {t('IBAN: SA3010000001400022304800', 'الآيبان: SA3010000001400022304800')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setZoomDoc({
                      type: 'image',
                      src: IBAN_IMG_PATH,
                      title: t('Saudi National Bank (SNB) Official IBAN Letter', 'خطاب الآيبان الرسمي — البنك الأهلي السعودي'),
                    })
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#1A6FA8] border border-slate-300 bg-white rounded hover:border-[#1A6FA8] shrink-0 cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t('View', 'عرض')}</span>
                </button>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded border border-slate-200 bg-white">
                <ResilientImage
                  src={IBAN_IMG_PATH}
                  alt={t('Saudi National Bank Official IBAN Letter for Injaz Builders', 'خطاب الآيبان من البنك الأهلي السعودي')}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-slate-600 tabular-nums" dir="ltr">
              Acct: 01400022304800 · SWIFT: NCBKSAJE · ID: 7031668077
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#1A6FA8]" aria-hidden="true" />
            <span>
              {t(
                'ISO 9001 · ISO 27001 · ISO 22301 · ISO 10002 Compliant Contracting Operations',
                'عمليات متوافقة مع معايير الجودة وأمن المعلومات ISO 9001 · 27001 · 22301 · 10002'
              )}
            </span>
          </div>
          <span className="text-xs text-slate-500 tabular-nums">
            {t('Verified Entity ID: 7031668077', 'الرقم الموحد للمنشأة: 7031668077')}
          </span>
        </div>
      </div>

      {/* Document Lightbox / PDF Modal */}
      {zoomDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#062028]/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomDoc(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-lg p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-[#0B323D]">{zoomDoc.title}</h3>
              <button
                type="button"
                onClick={() => setZoomDoc(null)}
                aria-label={t('Close', 'إغلاق')}
                className="w-9 h-9 inline-flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {zoomDoc.type === 'pdf' ? (
              <div className="space-y-3">
                <iframe
                  src={zoomDoc.src}
                  title={zoomDoc.title}
                  className="w-full h-[70vh] rounded border border-slate-200"
                />
                <div className="flex justify-end">
                  <a
                    href={zoomDoc.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0B323D] rounded hover:bg-[#124857]"
                  >
                    <FileDown className="w-4 h-4" aria-hidden="true" />
                    <span>{t('Open / Download Original PDF', 'فتح / تحميل ملف PDF الأصلي')}</span>
                  </a>
                </div>
              </div>
            ) : (
              <ResilientImage
                src={zoomDoc.src}
                alt={zoomDoc.title}
                className="w-full max-h-[75vh] object-contain mx-auto"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};
