"use client";

import React from 'react';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { servicesData, serviceStats, mainServiceSite } from '../data/constants';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen py-12" style={{ background: '#f7f5f0', fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ background: '#fff4cc', color: '#8a6200', border: '1px solid #f0d060' }}
          >
            What we build
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: '#12113a' }}
          >
            Our Services & Products
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            A portfolio of production-grade platforms we have designed, built, and deployed across
            enterprise, mobility, education, and government sectors.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {serviceStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl text-center px-4 py-7"
              style={{ border: '1px solid #ece9e0' }}
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ fontFamily: "'Playfair Display', serif", color: '#c47f00' }}
              >
                {stat.num}
              </div>
              <div className="text-sm" style={{ color: '#7a7a90' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {servicesData.map((project) => (
            <div
              key={project.name}
              className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-200"
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
              {/* Coloured header */}
              <div className="relative p-6" style={{ background: project.gradient }}>
                <div className="flex items-start justify-between mb-6">
                  <span className="text-4xl leading-none">{project.icon}</span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.22)', color: '#ffffff' }}
                  >
                    {project.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {project.name}
                </h2>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  {project.tagline}
                </p>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#5a5a72' }}>
                  {project.description}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#c47f00' }} />
                      <span className="text-sm font-medium" style={{ color: '#12113a' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                      style={{ color: '#c47f00' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#8a6200')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#c47f00')}
                    >
                      View Live Project
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#9a9aaa' }}>
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — redirect to main service site */}
        <div
          className="rounded-2xl text-center px-6 py-12"
          style={{ background: '#12113a' }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Have a project in mind? Let's build something great together.
          </h2>
          <p className="text-base mb-7 max-w-2xl mx-auto" style={{ color: '#b8b8cc' }}>
            Explore our full range of software solutions and services at 365 IT Solution — our flagship
            technology services company.
          </p>
          <a
            href={mainServiceSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#c47f00', color: '#ffffff' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#a86c00')}
            onMouseLeave={e => (e.currentTarget.style.background = '#c47f00')}
          >
            Visit 365 IT Solution
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Services;
