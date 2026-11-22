import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  image?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  breadcrumb,
  image = '/images/pdf_extracted/img_158_3000x1688.jpg',
}) => {
  const { dir, t } = useLanguage();
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#0B323D] text-white py-16 sm:py-20 lg:py-24 border-b border-[#7AB8E5]/20"
    >
      {/* Parallax Image Layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none will-change-transform"
        aria-hidden="true"
      >
        <img
          src={image}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-[125%] -top-[10%] relative object-cover opacity-25"
        />
      </motion.div>

      {/* Subtle Profile.pdf Gradient & Architectural Grid Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#062028]/95 via-[#0B323D]/88 to-[#124857]/80 pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-architectural-grid opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#7AB8E5] font-medium mb-4">
          <Link to="/" className="hover:text-white transition-colors">
            {t('Home', 'الرئيسية')}
          </Link>
          <Chevron className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
          <span className="text-white/90">{breadcrumb}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
