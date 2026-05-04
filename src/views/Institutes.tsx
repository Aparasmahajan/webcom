"use client";

import React from 'react';
import { ExternalLink, GraduationCap, Clock } from 'lucide-react';

const Institutes: React.FC = () => {
  const handleSSRClick = () => {
    window.open('https://www.google.com', '_blank');
  };

  return (
    <div className="min-h-screen py-12" style={{ background: '#f7f5f0', fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: '#fff4cc', border: '1px solid #f0d060' }}
          >
            <GraduationCap className="h-7 w-7" style={{ color: '#c47f00' }} />
          </div>
          <span
            className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: '#fff4cc', color: '#8a6200', border: '1px solid #f0d060' }}
          >
            Our network
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
          >
            Our Institutes
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Explore the educational institutions affiliated with Webcom, providing quality education
            and skill development.
          </p>
        </div>

        <div className="space-y-6">
          {/* SSR Gurukul */}
          <div
            className="bg-white rounded-2xl overflow-hidden transition-all duration-200"
            style={{ border: '1px solid #ece9e0' }}
          >
            <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #d4920a, #f0c040)' }} />
            <div className="p-7 sm:p-8">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span
                    className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3"
                    style={{ background: '#fff4cc', color: '#8a6200' }}
                  >
                    Active institute
                  </span>
                  <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
                  >
                    SSR Gurukul School
                  </h2>
                </div>
                <ExternalLink className="h-5 w-5 mt-1 flex-shrink-0" style={{ color: '#d0cdc2' }} />
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                SSR Gurukul School represents our commitment to providing holistic education that combines
                traditional values with modern teaching methodologies. Our institute focuses on character
                building, academic excellence, and practical skill development.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-7">
                {[
                  {
                    title: 'Educational Focus',
                    items: ['Holistic curriculum development', 'Character and value-based education', 'Modern teaching methodologies'],
                  },
                  {
                    title: 'Key Features',
                    items: ['Experienced and certified faculty', 'State-of-the-art facilities', 'Comprehensive student support'],
                  },
                ].map(col => (
                  <div
                    key={col.title}
                    className="rounded-xl p-4"
                    style={{ background: '#f7f5f0', border: '1px solid #ece9e0' }}
                  >
                    <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9a9aaa' }}>
                      {col.title}
                    </h4>
                    <ul className="space-y-1.5">
                      {col.items.map(item => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#d4920a' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSSRClick}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-white text-sm transition-all duration-200"
                style={{ background: '#d4920a' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#b87c06')}
                onMouseLeave={e => (e.currentTarget.style.background = '#d4920a')}
              >
                Visit SSR Gurukul School
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Coming soon */}
          <div
            className="bg-white rounded-2xl p-7 text-center"
            style={{ border: '1px solid #ece9e0' }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: '#f7f5f0', border: '1px solid #ece9e0' }}
            >
              <Clock className="h-5 w-5" style={{ color: '#9a9aaa' }} />
            </div>
            <h3 className="text-base font-semibold mb-2" style={{ color: '#12113a' }}>
              More Institutes Coming Soon
            </h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
              We are continuously expanding our network of educational institutions. Stay tuned
              for announcements about new affiliations and partnerships.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Institutes;
