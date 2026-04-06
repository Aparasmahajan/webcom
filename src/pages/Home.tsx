import React from 'react';
import Carousel from '../components/Carousel';
import { GraduationCap, Users, Award, Heart } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Webcom Technologies, Batala
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Empowering students with industry-relevant education through certified programs and career-focused training across multiple disciplines.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                <GraduationCap className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Education</h3>
              <p className="text-gray-600 text-sm">Providing world-class educational programs and resources</p>
            </div>
            <div className="text-center group">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors duration-200">
                <Users className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Focus</h3>
              <p className="text-gray-600 text-sm">Building stronger communities through collaborative efforts</p>
            </div>
            <div className="text-center group">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-200">
                <Award className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">Committed to maintaining highest standards in all initiatives</p>
            </div>
            <div className="text-center group">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors duration-200">
                <Heart className="h-8 w-8 text-red-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Impact</h3>
              <p className="text-gray-600 text-sm">Creating positive change in society through our programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed about our latest initiatives, achievements, and upcoming events
            </p>
          </div>
          <Carousel />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Be part of our mission to transform lives through education and community development
          </p>
          <div className="space-x-4">
            <button className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Get Involved
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-700 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;