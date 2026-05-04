"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f7f5f0" }}
    >
      <Navigation />

      <main className="flex-1 relative">
        {isLoading && (
          <div
            className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4"
            style={{
              background: "rgba(247,245,240,0.85)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div className="relative w-12 h-12">
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  border: "3px solid #f0d060",
                  borderTopColor: "#d4920a",
                }}
              />
            </div>
            <p className="text-sm font-medium" style={{ color: "#8a6200" }}>
              Loading...
            </p>
          </div>
        )}

        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
