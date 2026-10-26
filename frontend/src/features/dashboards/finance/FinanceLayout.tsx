import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FinanceSidebar from './components/FinanceSidebar';
import FinanceTopbar from './components/FinanceTopbar';

const FinanceLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`${isMobile ? `fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}` : 'relative'}`}>
        <FinanceSidebar isOpen={isMobile ? true : sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <FinanceTopbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FinanceLayout;