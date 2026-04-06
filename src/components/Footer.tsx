import React from "react";
import { Copyright } from "lucide-react";
const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            {/* <Copyright className="h-4 w-4" /> */}
            <span className="text-sm text-gray-300">
              © {currentYear} Webcom Technologies, Batala. All rights
              reserved.{" "}
            </span>
          </div>
          <div className="text-sm text-gray-300">
            Developed by{" "}
            <span className="font-semibold text-white">
              <a
                href="https://parasmahajan.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:underline"
              >
                Paras Mahajan
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
