import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import TabBar from './TabBar';
import Footer from './Footer';

const Layout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    const heading = document.querySelector('main h1');
    heading?.focus();
  }, [location.pathname]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
        if (!isMobile) setSidebarCollapsed(true);
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isMobile]);

  const toggleNavigation = () => {
    if (isMobile) {
      setSidebarOpen((open) => !open);
      return;
    }
    setSidebarCollapsed((collapsed) => !collapsed);
  };

  return (
    <div
      className={`portal-shell${sidebarCollapsed ? ' nav-collapsed' : ''}${sidebarOpen ? ' nav-open' : ''}`}
      style={{ '--campus-background-image': `url("${import.meta.env.BASE_URL}img/UP-Min-Admin.png")` }}
    >
      <Header
        onMenu={toggleNavigation}
        menuExpanded={isMobile ? sidebarOpen : !sidebarCollapsed}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />
      <main id="main-content" className="portal-main">
        <Outlet />
      </main>
      <TabBar onMore={() => setSidebarOpen(true)} />
      <Footer />
    </div>
  );
};

export default Layout;
