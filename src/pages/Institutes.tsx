import React from 'react';
import { ExternalLink, GraduationCap } from 'lucide-react';

const Institutes: React.FC = () => {
  const handleSSRClick = () => {
    window.open('https://www.google.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-8 w-8 text-blue-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Institutes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the educational institutions affiliated with HRDS, providing quality education and skill development
          </p>
        </div>

        {/* Institutes Grid */}
        <div className="grid gap-8">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">SSR Gurukul School</h2>
                <ExternalLink className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  SSR Gurukul School represents our commitment to providing holistic education that combines traditional values with modern teaching methodologies. Our institute focuses on character building, academic excellence, and practical skill development.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Educational Focus</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Holistic curriculum development</li>
                      <li>• Character and value-based education</li>
                      <li>• Modern teaching methodologies</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Experienced faculty</li>
                      <li>• State-of-the-art facilities</li>
                      <li>• Comprehensive student support</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSSRClick}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-900 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Visit SSR Gurukul School</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">More Institutes Coming Soon</h3>
              <p className="text-gray-600">
                We are continuously expanding our network of educational institutions. 
                Stay tuned for announcements about new affiliations and partnerships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institutes;