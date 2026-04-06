import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Show loader on initial mount and briefly on route changes
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm space-y-3">
  <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
  <p className="text-blue-700 font-semibold">Loading...</p>
</div>


      )}
    </div>
  );
};

export default Layout;