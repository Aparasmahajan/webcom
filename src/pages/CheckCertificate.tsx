import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, FileText } from 'lucide-react';
import { mockCertificates } from '../data/constants';

interface CertificateResult {
  found: boolean;
  certificate?: {
    number: string;
    name: string;
    course: string;
    issued: string;
  };
}

const CheckCertificate: React.FC = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [result, setResult] = useState<CertificateResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!certificateNumber.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const certificate = mockCertificates.find(
      cert => cert.number.toLowerCase() === certificateNumber.toLowerCase().trim()
    );

    if (certificate) {
      setResult({
        found: true,
        certificate
      });
    } else {
      setResult({
        found: false
      });
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-blue-700" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Check Certificate</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity of your HRDS certificate by entering the certificate number below
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-8">
          <div className="max-w-md mx-auto">
            <label htmlFor="certificate-number" className="block text-sm font-medium text-gray-700 mb-2">
              Certificate Number
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="text"
                id="certificate-number"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter certificate number (e.g., HRDS2024001)"
                className="w-full flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleCheck}
                disabled={isLoading || !certificateNumber.trim()}
                className="w-full sm:w-auto px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>{isLoading ? 'Checking...' : 'Check'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
            {result.found ? (
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-6">Certificate Verified!</h2>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-left max-w-md mx-auto">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Certificate Number:</span>
                      <p className="text-lg font-semibold text-gray-900">{result.certificate?.number}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Student Name:</span>
                      <p className="text-lg font-semibold text-gray-900">{result.certificate?.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Course:</span>
                      <p className="text-lg font-semibold text-gray-900">{result.certificate?.course}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Issue Date:</span>
                      <p className="text-lg font-semibold text-gray-900">{result.certificate?.issued}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="h-8 w-8 text-red-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-red-800 mb-4">Certificate Not Found</h2>
                <p className="text-gray-600">
                  The certificate number you entered could not be found in our records. 
                  Please check the number and try again, or contact us for assistance.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sample Certificates Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Sample Certificate Numbers for Testing:</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-sm">
            {mockCertificates.map((cert) => (
              <div key={cert.number} className="bg-white p-3 rounded border">
                <p className="font-medium text-blue-700">{cert.number}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckCertificate;