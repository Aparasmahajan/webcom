"use client";

import React from 'react';
import { aboutUsData } from '../data/constants';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-12" style={{ background: '#f7f5f0', fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ background: '#fff4cc', color: '#8a6200', border: '1px solid #f0d060' }}
          >
            Who we are
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
          >
            About Webcom Technologies
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Webcom Technologies, Batala is a leading educational institute dedicated to providing quality
            education and professional training across various fields. We collaborate with recognized
            universities and institutions to offer diploma, undergraduate, and postgraduate programs.
            Our mission is to bridge the gap between education and employment by delivering practical
            knowledge, skill-based learning, and globally relevant qualifications.
          </p>
        </div>

        {/* History */}
        <section className="mb-16">
          <div
            className="bg-white rounded-2xl p-8 md:p-10"
            style={{ border: '1px solid #ece9e0' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{ background: '#d4920a' }} />
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
              >
                Our History
              </h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4 text-base">
              {aboutUsData.history.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section>
          <div className="text-center mb-10">
            <span
              className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
              style={{ background: '#fff4cc', color: '#8a6200', border: '1px solid #f0d060' }}
            >
              The team
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
            >
              Our Leadership Team
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Meet the dedicated professionals who guide our organisation towards excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutUsData.members.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden transition-all duration-200"
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
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span
                    className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3"
                    style={{ background: '#fff4cc', color: '#8a6200' }}
                  >
                    {member.position}
                  </span>
                  <h3 className="text-base font-semibold mb-1.5" style={{ color: '#12113a' }}>
                    {member.name}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#7a7a90' }}>
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
