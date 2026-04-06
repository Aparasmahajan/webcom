import React from 'react';

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#12113a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col items-center gap-1.5 md:flex-row md:justify-between md:gap-0">

          <span className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
            © {currentYear} Webcom Technologies, Batala. All rights reserved.
          </span>

          <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Developed by{' '}
            <a
              href="https://parasmahajan.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors duration-150"
              style={{ color: '#f0c040' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              Paras Mahajan
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;