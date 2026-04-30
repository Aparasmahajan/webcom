import React, { useState } from "react";
import { Search, CheckCircle, XCircle, FileText } from "lucide-react";
import { mockCertificates } from "../data/constants";

// interface CertificateResult {
//   found: boolean;
//   certificate?: {
//     certificate_number: string;
//     name: string;
//     course: string;
//     issued: string;
//   };
// }

interface CertificateResult {
  found: boolean;
  certificate?: Record<string, any>;
}

const CheckCertificate: React.FC = () => {
  const [certificateNumber, setCertificateNumber] = useState("");
  const [result, setResult] = useState<CertificateResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!certificateNumber.trim()) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const certificate = mockCertificates.find(
      (cert) => cert.certificate_number === certificateNumber,
    );
    setResult(certificate ? { found: true, certificate } : { found: false });
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCheck();
  };

  return (
    <div
      className="min-h-screen py-10 md:py-16"
      style={{ background: "#f7f5f0", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "#fff4cc", border: "1px solid #f0d060" }}
          >
            <FileText className="h-7 w-7" style={{ color: "#c47f00" }} />
          </div>
          <span
            className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{
              background: "#fff4cc",
              color: "#8a6200",
              border: "1px solid #f0d060",
            }}
          >
            Verification portal
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#12113a",
            }}
          >
            Check Certificate
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Verify the authenticity of your certificate by entering the
            certificate number below.
          </p>
        </div>

        {/* Search card */}
        <div
          className="bg-white rounded-2xl p-6 sm:p-8 mb-6"
          style={{ border: "1px solid #ece9e0" }}
        >
          <label
            htmlFor="certificate-number"
            className="block text-sm font-medium mb-2"
            style={{ color: "#12113a" }}
          >
            Certificate Number
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              id="certificate-number"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. Webcom2024001"
              className="flex-1 px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
              style={{
                border: "1.5px solid #d0cdc2",
                color: "#12113a",
                background: "#fafaf8",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#d4920a")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#d0cdc2")}
            />
            <button
              onClick={handleCheck}
              disabled={isLoading || !certificateNumber.trim()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "#d4920a", minWidth: 110 }}
              onMouseEnter={(e) => {
                if (!isLoading)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#b87c06";
              }}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#d4920a")
              }
            >
              <Search className="h-4 w-4" />
              {isLoading ? "Checking..." : "Verify"}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 mb-6"
            style={{
              border: `1px solid ${result.found ? "#b6e5cf" : "#f5c0c0"}`,
            }}
          >
            {result.found ? (
              <div className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#e6f7f0" }}
                >
                  <CheckCircle className="h-7 w-7 text-emerald-600" />
                </div>
                <h2
                  className="text-xl font-bold mb-6"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#0f6e56",
                  }}
                >
                  Certificate Verified
                </h2>
                <div
                  className="rounded-xl p-5 text-left max-w-sm mx-auto space-y-4"
                  style={{ background: "#f7f5f0", border: "1px solid #ece9e0" }}
                >
                  {/* {[
                    { label: 'Certificate Number', value: result.certificate?.certificate_number },
                    { label: 'Student Name', value: result.certificate?.name },
                    { label: 'Course', value: result.certificate?.course },
                    { label: 'Issue Date', value: result.certificate?.issued },
                  ].map(row => (
                    <div key={row.label}>
                      <span className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9a9aaa' }}>
                        {row.label}
                      </span>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: '#12113a' }}>{row.value}</p>
                    </div>
                  ))} */}
                  {Object.entries(result.certificate || {})
                    .filter(([key]) => key !== "id") // ❌ exclude id
                    .map(([key, value]) => (
                      <div key={key}>
                        <span
                          className="text-xs font-medium uppercase tracking-wide"
                          style={{ color: "#9a9aaa" }}
                        >
                          {key
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                        <p
                          className="text-sm font-semibold mt-0.5"
                          style={{ color: "#12113a" }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#fdf0f0" }}
                >
                  <XCircle className="h-7 w-7 text-red-500" />
                </div>
                <h2
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#a32d2d",
                  }}
                >
                  Certificate Not Found
                </h2>
                <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                  The certificate number entered could not be found in our
                  records. Please double-check and try again, or contact us for
                  assistance.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sample numbers */}
        {/* <div
          className="rounded-2xl p-5 sm:p-6"
          style={{ background: "#fff8e6", border: "1px solid #f0d060" }}
        >
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: "#8a6200" }}
          >
            Sample certificate numbers for testing
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {mockCertificates.map((cert) => (
              <button
                key={cert.certificate_number}
                onClick={() => setCertificateNumber(cert.certificate_number)}
                className="text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150"
                style={{
                  background: "#fff",
                  border: "1px solid #f0d060",
                  color: "#c47f00",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#fff4cc")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#fff")
                }
              >
                {cert.certificate_number}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CheckCertificate;
