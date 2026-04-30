import React from 'react';
import { GraduationCap, Users, Award, Lightbulb, ArrowRight } from 'lucide-react';
import Carousel from '../components/Carousel';
import {stats} from '../data/constants'

const features = [
  {
    icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
    bg: 'bg-blue-50',
    title: 'Quality Education',
    desc: 'World-class programs and certified curriculum designed with direct industry input.',
  },
  {
    icon: <Users className="h-5 w-5 text-emerald-600" />,
    bg: 'bg-emerald-50',
    title: 'Community Focus',
    desc: 'Building stronger communities through collaborative, student-first efforts.',
  },
  {
    icon: <Award className="h-5 w-5 text-amber-600" />,
    bg: 'bg-amber-50',
    title: 'Excellence',
    desc: 'Committed to the highest standards in every program and initiative we run.',
  },
  {
    icon: <Lightbulb className="h-5 w-5 text-rose-500" />,
    bg: 'bg-rose-50',
    title: 'Social Impact',
    desc: 'Creating real, measurable change in society through the power of education.',
  },
];

const news = [
  {
    tag: 'Achievement',
    tagStyle: 'bg-amber-100 text-amber-800',
    bar: 'from-amber-400 to-yellow-300',
    title: 'New batch of 60 students completes advanced web development certification.',
    date: 'March 2025',
  },
  {
    tag: 'Event',
    tagStyle: 'bg-blue-100 text-blue-800',
    bar: 'from-blue-500 to-blue-300',
    title: 'Industry expert workshop on AI & machine learning — open registration.',
    date: 'April 2025',
  },
  {
    tag: 'Placement',
    tagStyle: 'bg-emerald-100 text-emerald-800',
    bar: 'from-emerald-500 to-emerald-300',
    title: '15 students placed at top Punjab-based tech firms this quarter.',
    date: 'February 2025',
  },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ background: '#f7f5f0', fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section
        className="relative bg-white border-b overflow-hidden"
        style={{ borderColor: '#ece9e0' }}
      >
        {/* Soft radial glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 20% 55%, #fff8e6 0%, transparent 52%), radial-gradient(ellipse at 80% 30%, #eef4ff 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <span
            className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ background: '#fff4cc', color: '#8a6200', border: '1px solid #f0d060' }}
          >
            Batala's leading tech institute
          </span>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
          >
            Webcom{' '}
            <span style={{ color: '#c47f00' }}>Technologies</span>
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: '#5a5a72' }}>
            Empowering students with industry-relevant education through certified programs
            and career-focused training across multiple disciplines.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#d4920a' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#b87c06')}
              onMouseLeave={e => (e.currentTarget.style.background = '#d4920a')}
            >
              Get Involved <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="px-7 py-3 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'transparent',
                color: '#12113a',
                border: '1.5px solid #d0cdc2',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#d4920a';
                e.currentTarget.style.background = '#fff8e6';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#d0cdc2';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Explore Programs
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="flex justify-center" style={{ background: '#12113a' }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex-1 text-center py-5 px-3"
            style={{
              maxWidth: 160,
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
          >
            <div
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: '#f0c040' }}
            >
              {s.num}
            </div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Features ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: '#f7f5f0' }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="text-center text-xs font-medium uppercase tracking-widest mb-2"
            style={{ color: '#c47f00' }}
          >
            Why choose us
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold mb-10"
            style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
          >
            Built for your future
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(f => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 transition-all duration-200 cursor-default group"
                style={{ border: '1px solid #ece9e0' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#d4920a';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(212,146,10,0.10)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#ece9e0';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.bg}`}>
                  {f.icon}
                </div>
                <h3 className="font-medium text-sm mb-2" style={{ color: '#12113a' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#7a7a90' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        style={{ borderTop: '1px solid #ece9e0', borderBottom: '1px solid #ece9e0' }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-center text-xs font-medium uppercase tracking-widest mb-2"
            style={{ color: '#c47f00' }}
          >
            Latest updates
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold mb-10"
            style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
          >
            News & highlights
          </h2>

          <Carousel />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center" style={{ background: '#12113a' }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#fff' }}
          >
            Join us in making a{' '}
            <span style={{ color: '#f0c040' }}>difference</span>
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Be part of our mission to transform lives through education and community development.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-200"
              style={{ background: '#d4920a' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#b87c06')}
              onMouseLeave={e => (e.currentTarget.style.background = '#d4920a')}
            >
              Apply Now
            </button>
            <button
              className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-200"
              style={{ border: '1.5px solid rgba(255,255,255,0.25)', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;