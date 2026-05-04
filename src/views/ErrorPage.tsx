"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: '#f7f5f0', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Big 404 */}
      <p
        className="font-bold leading-none mb-4 select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(6rem, 20vw, 10rem)',
          color: '#ece9e0',
          letterSpacing: '-0.04em',
        }}
      >
        404
      </p>

      <span
        className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
        style={{ background: '#fff4cc', color: '#8a6200', border: '1px solid #f0d060' }}
      >
        Page not found
      </span>

      <h1
        className="text-2xl sm:text-3xl font-bold mb-3"
        style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
      >
        Oops! Wrong turn.
      </h1>

      <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 px-7 py-3 rounded-xl font-medium text-white text-sm transition-all duration-200 hover:-translate-y-0.5"
        style={{ background: '#d4920a' }}
        onMouseEnter={e => (e.currentTarget.style.background = '#b87c06')}
        onMouseLeave={e => (e.currentTarget.style.background = '#d4920a')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
