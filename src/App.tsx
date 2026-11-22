import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CmsProvider, useCms } from './context/CmsContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ClientsPage } from './pages/ClientsPage';
import { GalleryPage } from './pages/GalleryPage';
import { CareerPage } from './pages/CareerPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { CustomCmsPage } from './pages/CustomCmsPage';
import { AdminPortal } from './pages/AdminPortal';

const CORE_PATHS = new Set([
  '/',
  '/about',
  '/projects',
  '/services',
  '/clients',
  '/gallery',
  '/career',
  '/contact',
]);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const PublicAppRoutes: React.FC = () => {
  const { navItems } = useCms();
  const customNavItems = navItems.filter(
    (item) => item.visible !== false && item.path && !CORE_PATHS.has(item.path)
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F7FAFC] text-[#0B222A]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/legal/:slug" element={<LegalPage />} />
            {customNavItems.map((item) => (
              <Route
                key={item.id || item.path}
                path={item.path.startsWith('/') ? item.path : `/${item.path}`}
                element={<CustomCmsPage navItem={item} />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

const AppShell: React.FC = () => {
  const [isAdminHash, setIsAdminHash] = useState<boolean>(() => {
    const h = window.location.hash.toLowerCase();
    return h === '#admin' || h.startsWith('#admin/');
  });

  useEffect(() => {
    const onHashChange = () => {
      const h = window.location.hash.toLowerCase();
      setIsAdminHash(h === '#admin' || h.startsWith('#admin/'));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (isAdminHash) {
    return (
      <AdminPortal
        onExitAdmin={() => {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
          setIsAdminHash(false);
        }}
      />
    );
  }

  return <PublicAppRoutes />;
};

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <CmsProvider>
          <AppShell />
        </CmsProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
