import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle, XCircle } from "lucide-react";
import { contactInfo } from "../data/constants";

interface FormData {
  name: string;
  email: string;
  query: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    query: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!showSuccess) return;
    const t = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(t);
  }, [showSuccess]);

  useEffect(() => {
    if (!showError) return;
    const t = setTimeout(() => setShowError(false), 3000);
    return () => clearTimeout(t);
  }, [showError]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.query.trim()) newErrors.query = "Query is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setErrors({});
    setIsSubmitting(false);
    setShowError(true);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass = (field: keyof FormData) => `
    w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200
    ${errors[field] ? "border-red-400" : ""}
  `;

  const inputStyle = (field: keyof FormData): React.CSSProperties => ({
    border: `1.5px solid ${errors[field] ? "#f5a0a0" : "#d0cdc2"}`,
    color: "#12113a",
    background: "#fafaf8",
  });

  return (
    <div
      className="min-h-screen py-12"
      style={{ background: "#f7f5f0", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Toast notifications */}
      {showSuccess && (
        <div
          className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white"
          style={{ background: "#0f6e56" }}
        >
          <CheckCircle className="h-4 w-4" />
          Query submitted successfully!
        </div>
      )}
      {showError && (
        <div
          className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white"
          style={{ background: "#a32d2d" }}
        >
          <XCircle className="h-4 w-4" />
          Something went wrong. Please try again.
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "#fff4cc",
              color: "#8a6200",
              border: "1px solid #f0d060",
            }}
          >
            Reach out
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#12113a",
            }}
          >
            Contact Us
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Get in touch for any inquiries, support, or collaboration
            opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left — map + contact details */}
          <div className="space-y-6">
            {/* Google Maps embed */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #ece9e0" }}
            >
              <iframe
                title="Webcom Technologies Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.0!2d75.2!3d31.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391bc3df17b9cc5d%3A0xa734ce4f589aa746!2sWEBCOM%20TECHNOLOGIES%2F%20MITS%20EDCUATION%2C%20Master%20Market%2C%20opposite%20Eye%20Hospital%20O%2FS%2C%20Khajuri%20Gate%2C%20Batala%2C%20Punjab%20143505!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="224"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact details */}
            <div
              className="bg-white rounded-2xl p-7"
              style={{ border: "1px solid #ece9e0" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1 h-7 rounded-full"
                  style={{ background: "#d4920a" }}
                />
                <h2
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#12113a",
                  }}
                >
                  Get in Touch
                </h2>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: (
                      <MapPin
                        className="h-5 w-5"
                        style={{ color: "#b87c06" }}
                      />
                    ),
                    bg: "#fff4cc",
                    label: "Address",
                    content: (
                      <div
                        className="mt-1 p-4 rounded-xl shadow-sm"
                        style={{
                          background: "#fff9e6",
                          border: "1px solid #f0d060",
                        }}
                      >
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#5c4400" }}
                        >
                          {contactInfo.address}
                        </p>
                      </div>
                    ),
                  },
                  {
                    icon: <Phone className="h-4 w-4 text-emerald-600" />,
                    bg: "#e6f7f0",
                    label: "Call Us",
                    content: (
                      <a
                        href={`tel:${contactInfo.mobile}`}
                        className="text-sm font-medium hover:underline mt-0.5 block"
                        style={{ color: "#0f6e56" }}
                      >
                        {contactInfo.mobile}
                      </a>
                    ),
                  },
                  {
                    icon: (
                      <Mail className="h-4 w-4" style={{ color: "#c47f00" }} />
                    ),
                    bg: "#fff4cc",
                    label: "Write Us",
                    content: (
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm font-medium hover:underline mt-0.5 block"
                        style={{ color: "#0f6e56" }}
                      >
                        {contactInfo.email}
                      </a>
                    ),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.bg }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "#9a9aaa" }}
                      >
                        {item.label}
                      </p>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            className="bg-white rounded-2xl p-7"
            style={{ border: "1px solid #ece9e0" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-1 h-7 rounded-full"
                style={{ background: "#d4920a" }}
              />
              <h2
                className="text-xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#12113a",
                }}
              >
                Send a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {(["name", "email"] as const).map((field) => (
                <div key={field}>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: "#9a9aaa" }}
                  >
                    {field === "name" ? "Full Name" : "Email Address"} *
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={
                      field === "name"
                        ? "Enter your full name"
                        : "Enter your email"
                    }
                    className={inputClass(field)}
                    style={inputStyle(field)}
                    onFocus={(e) => {
                      if (!errors[field])
                        e.currentTarget.style.borderColor = "#d4920a";
                    }}
                    onBlur={(e) => {
                      if (!errors[field])
                        e.currentTarget.style.borderColor = "#d0cdc2";
                    }}
                  />
                  {errors[field] && (
                    <p className="text-xs mt-1 text-red-500">{errors[field]}</p>
                  )}
                </div>
              ))}

              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "#9a9aaa" }}
                >
                  Your Query *
                </label>
                <textarea
                  value={formData.query}
                  onChange={(e) => handleInputChange("query", e.target.value)}
                  rows={5}
                  placeholder="Describe your query or message..."
                  className={`${inputClass("query")} resize-none`}
                  style={inputStyle("query")}
                  onFocus={(e) => {
                    if (!errors.query)
                      e.currentTarget.style.borderColor = "#d4920a";
                  }}
                  onBlur={(e) => {
                    if (!errors.query)
                      e.currentTarget.style.borderColor = "#d0cdc2";
                  }}
                />
                {errors.query && (
                  <p className="text-xs mt-1 text-red-500">{errors.query}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#d4920a" }}
                onMouseEnter={(e) => {
                  if (!isSubmitting)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#b87c06";
                }}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#d4920a")
                }
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Submit Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
