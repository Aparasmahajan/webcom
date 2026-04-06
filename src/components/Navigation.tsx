import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, GraduationCap } from "lucide-react";
import { navigationItems } from "../data/constants";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click + ESC
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInstituteClick = (url: string) => {
    window.open(url, "_blank");
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur"
      style={{
        background: "rgba(255,255,255,0.85)",
        borderBottom: "1px solid #ece9e0",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => (window.location.href = "/")}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <GraduationCap className="h-8 w-8" style={{ color: "#c47f00" }} />
            <span
              className="text-xl font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#12113a",
              }}
            >
              Webcom
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                {/* Parent → navigation */}
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-[#fff4cc] text-[#c47f00]"
                      : "text-[#5a5a72] hover:text-[#12113a] hover:bg-[#f7f5f0]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown */}
                {item.dropdown && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    style={{
                      background: "#ffffff",
                      border: "1px solid #ece9e0",
                    }}
                  >
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.path}
                          className="block px-4 py-2 text-sm rounded-lg transition-all duration-200"
                          style={{ color: "#5a5a72" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#fff8e6")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg"
              style={{ color: "#12113a" }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden border-t"
            style={{
              borderColor: "#ece9e0",
              background: "#ffffff",
            }}
          >
            <div className="px-2 py-3 space-y-2">
  {navigationItems.map((item) => (
    <div key={item.label}>
      
      {item.dropdown ? (
        <>
          {/* Parent row */}
          <div className="flex items-center justify-between w-full">
            
            {/* LEFT → Navigation */}
            <Link
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-base font-medium ${
                location.pathname === item.path
                  ? "bg-[#fff4cc] text-[#c47f00]"
                  : "text-[#5a5a72]"
              }`}
            >
              {item.label}
            </Link>

            {/* RIGHT → Toggle */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="pl-4 space-y-1">
              {item.dropdown.map((dropdownItem) => (
                <Link
                  key={dropdownItem.label}
                  to={dropdownItem.path}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsDropdownOpen(false);
                  }}
                  className="block px-3 py-2 text-sm rounded-lg"
                  style={{ color: "#5a5a72" }}
                >
                  {dropdownItem.label}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          to={item.path}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`block px-4 py-2 rounded-lg text-base font-medium transition-all ${
            location.pathname === item.path
              ? "bg-[#fff4cc] text-[#c47f00]"
              : "text-[#5a5a72]"
          }`}
        >
          {item.label}
        </Link>
      )}
    </div>
  ))}
</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
