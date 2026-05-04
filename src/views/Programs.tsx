"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  ChevronDown,
  X,
  CheckCircle,
  Send,
  BookOpen,
  Award,
  IndianRupee,
  Star,
} from "lucide-react";
import { programsData } from "../data/constants";
import type { Program, DegreeLevel } from "../data/constants";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const accentFor = (id: string) => {
  if (id === "bachelors")
    return { color: "#d4920a", bg: "#fff4cc", border: "#f0d060" };
  if (id === "masters")
    return { color: "#12113a", bg: "#e8e8f2", border: "#c0c0d8" };
  return { color: "#0f6e56", bg: "#e6f7f0", border: "#9fd4c0" };
};

// ─── MultiSelect ──────────────────────────────────────────────────────────────

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (opt: string) =>
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt],
    );

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <div
        className="w-full min-h-[48px] px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
        style={{
          border: `1.5px solid ${error ? "#f5a0a0" : open ? "#d4920a" : "#d0cdc2"}`,
          background: "#fafaf8",
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {selected.length === 0 ? (
          <span className="text-sm" style={{ color: "#9a9aaa" }}>
            Select one or more programs…
          </span>
        ) : (
          <div className="flex flex-wrap gap-1.5 pr-6">
            {selected.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: "#fff4cc",
                  color: "#8a6200",
                  border: "1px solid #f0d060",
                }}
              >
                {s}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(s);
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            style={{ color: "#9a9aaa" }}
          />
        </div>
      </div>

      {/* Dropdown list */}
      {open && (
        <div
          className="absolute z-50 w-full mt-1.5 rounded-xl shadow-xl max-h-56 overflow-y-auto"
          style={{
            background: "#ffffff",
            border: "1px solid #ece9e0",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          }}
        >
          {options.map((opt) => {
            const checked = selected.includes(opt);
            return (
              <label
                key={opt}
                className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors duration-100"
                style={{ background: checked ? "#fff8e6" : "transparent" }}
                onMouseEnter={(e) => {
                  if (!checked)
                    (e.currentTarget as HTMLElement).style.background =
                      "#f7f5f0";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = checked
                    ? "#fff8e6"
                    : "transparent";
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(opt)}
                  className="rounded flex-shrink-0 h-4 w-4"
                  style={{ accentColor: "#d4920a" }}
                />
                <span style={{ color: "#12113a" }}>{opt}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Application Modal ────────────────────────────────────────────────────────

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  allOptions: string[];
  preSelected: string[];
}

const ApplicationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  allOptions,
  preSelected,
}) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [courses, setCourses] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCourses([...preSelected]);
      setForm({ name: "", phone: "", email: "", message: "" });
      setErrors({});
      setSuccess(false);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[\d\s+\-(]{10,}/.test(form.phone))
      e.phone = "Enter a valid phone number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (courses.length === 0) e.courses = "Select at least one course";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(), // or custom ID
          Name: form.name,
          "Phone Number": form.phone,
          Email: form.email,
          Courses: courses.join(", "),
          Message: form.message,
        }),
      });
    } catch {
      /* show success regardless */
    }
    setSubmitting(false);
    setSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(18,17,58,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: "1px solid #ece9e0",
          maxHeight: "90vh",
        }}
      >
        <div className="overflow-y-auto" style={{ maxHeight: "90vh" }}>
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
            style={{ background: "#f7f5f0", color: "#5a5a72" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#ece9e0")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#f7f5f0")
            }
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-7">
            {success ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "#e6f7f0" }}
                >
                  <CheckCircle
                    className="h-8 w-8"
                    style={{ color: "#0f6e56" }}
                  />
                </div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#12113a",
                  }}
                >
                  Thank You!
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#5a5a72" }}
                >
                  We have received your application.
                  <br />
                  <span className="font-medium" style={{ color: "#12113a" }}>
                    We will get back to you soon.
                  </span>
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200"
                  style={{ background: "#d4920a" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#b87c06")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#d4920a")
                  }
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6 pr-8">
                  <div
                    className="w-1 h-7 rounded-full flex-shrink-0"
                    style={{ background: "#d4920a" }}
                  />
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#12113a",
                      }}
                    >
                      Apply Now
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: "#9a9aaa" }}>
                      Fill in your details and we'll reach out to you
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: "#9a9aaa" }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, name: e.target.value }));
                        setErrors((p) => ({ ...p, name: "" }));
                      }}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{
                        border: `1.5px solid ${errors.name ? "#f5a0a0" : "#d0cdc2"}`,
                        color: "#12113a",
                        background: "#fafaf8",
                      }}
                      onFocus={(e) => {
                        if (!errors.name)
                          e.currentTarget.style.borderColor = "#d4920a";
                      }}
                      onBlur={(e) => {
                        if (!errors.name)
                          e.currentTarget.style.borderColor = "#d0cdc2";
                      }}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1 text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: "#9a9aaa" }}
                      >
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, phone: e.target.value }));
                          setErrors((p) => ({ ...p, phone: "" }));
                        }}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{
                          border: `1.5px solid ${errors.phone ? "#f5a0a0" : "#d0cdc2"}`,
                          color: "#12113a",
                          background: "#fafaf8",
                        }}
                        onFocus={(e) => {
                          if (!errors.phone)
                            e.currentTarget.style.borderColor = "#d4920a";
                        }}
                        onBlur={(e) => {
                          if (!errors.phone)
                            e.currentTarget.style.borderColor = "#d0cdc2";
                        }}
                      />
                      {errors.phone && (
                        <p className="text-xs mt-1 text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: "#9a9aaa" }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, email: e.target.value }));
                          setErrors((p) => ({ ...p, email: "" }));
                        }}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{
                          border: `1.5px solid ${errors.email ? "#f5a0a0" : "#d0cdc2"}`,
                          color: "#12113a",
                          background: "#fafaf8",
                        }}
                        onFocus={(e) => {
                          if (!errors.email)
                            e.currentTarget.style.borderColor = "#d4920a";
                        }}
                        onBlur={(e) => {
                          if (!errors.email)
                            e.currentTarget.style.borderColor = "#d0cdc2";
                        }}
                      />
                      {errors.email && (
                        <p className="text-xs mt-1 text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Courses multi-select */}
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: "#9a9aaa" }}
                    >
                      Courses Interested In *
                    </label>
                    <MultiSelect
                      options={allOptions}
                      selected={courses}
                      onChange={setCourses}
                      error={errors.courses}
                    />
                    {errors.courses && (
                      <p className="text-xs mt-1 text-red-500">
                        {errors.courses}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: "#9a9aaa" }}
                    >
                      Message{" "}
                      <span
                        className="normal-case font-normal"
                        style={{ color: "#b0b0c0" }}
                      >
                        (optional)
                      </span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      rows={3}
                      placeholder="Any specific queries or requirements…"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none transition-all duration-200"
                      style={{
                        border: "1.5px solid #d0cdc2",
                        color: "#12113a",
                        background: "#fafaf8",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#d4920a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#d0cdc2")
                      }
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "#d4920a" }}
                    onMouseEnter={(e) => {
                      if (!submitting)
                        (e.currentTarget as HTMLElement).style.background =
                          "#b87c06";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "#d4920a";
                    }}
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? "Submitting…" : "Submit Application"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Program Card ─────────────────────────────────────────────────────────────

interface CardProps {
  program: Program;
  level: DegreeLevel;
  onApply: () => void;
}

const ProgramCard: React.FC<CardProps> = ({ program, level, onApply }) => {
  const [expanded, setExpanded] = useState(false);
  const ac = accentFor(level.id);

  const totalFee = program.fees.reduce(
    (sum, s) => sum + s.tuitionFee + s.examFee + s.miscFee,
    0,
  );

  return (
    <div
      className="rounded-2xl overflow-hidden transition-shadow duration-300"
      style={{
        background: "#ffffff",
        border: "1px solid #ece9e0",
        boxShadow: expanded
          ? "0 8px 32px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Card header */}
      <div
        className="px-5 pt-5 pb-4"
        style={{
          background: `linear-gradient(135deg, ${ac.bg} 0%, #ffffff 80%)`,
          borderBottom: `1px solid ${ac.border}`,
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: ac.bg, border: `1px solid ${ac.border}` }}
            >
              <BookOpen className="h-5 w-5" style={{ color: ac.color }} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className="text-xl font-bold leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#12113a",
                  }}
                >
                  {program.name}
                </h3>
                {program.popular && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: ac.bg,
                      color: ac.color,
                      border: `1px solid ${ac.border}`,
                    }}
                  >
                    <Star className="h-2.5 w-2.5" />
                    Popular
                  </span>
                )}
              </div>
              <p className="text-sm mt-0.5" style={{ color: "#5a5a72" }}>
                {program.fullName}
              </p>
            </div>
          </div>
          <span
            className="flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: ac.bg,
              color: ac.color,
              border: `1px solid ${ac.border}`,
            }}
          >
            {program.duration}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed mt-3"
          style={{ color: "#5a5a72" }}
        >
          {program.description}
        </p>
      </div>

      {/* Expandable section */}
      {expanded && (
        <div className="px-5 py-5 space-y-6">
          {/* Benefits */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4" style={{ color: ac.color }} />
              <h4
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#12113a" }}
              >
                Program Benefits
              </h4>
            </div>
            <ul className="space-y-2">
              {program.benefits.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: "#5a5a72" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                    style={{ background: ac.color }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Fee table */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee className="h-4 w-4" style={{ color: ac.color }} />
              <h4
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#12113a" }}
              >
                Semester-wise Fee Breakdown
              </h4>
            </div>
            <div
              className="overflow-x-auto rounded-xl"
              style={{ border: "1px solid #ece9e0" }}
            >
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr
                    style={{
                      background: ac.bg,
                      borderBottom: `1px solid ${ac.border}`,
                    }}
                  >
                    {["Semester", "Tuition", "Exam Fee", "Misc", "Total"].map(
                      (h, i) => (
                        <th
                          key={h}
                          className={`px-4 py-2.5 font-semibold text-xs uppercase tracking-wide ${i === 0 ? "text-left" : "text-right"}`}
                          style={{ color: ac.color }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {program.fees.map((row, i) => {
                    const rowTotal = row.tuitionFee + row.examFee + row.miscFee;
                    return (
                      <tr
                        key={i}
                        style={{
                          background: i % 2 === 0 ? "#fafaf8" : "#ffffff",
                          borderBottom:
                            i < program.fees.length - 1
                              ? "1px solid #ece9e0"
                              : "none",
                        }}
                      >
                        <td
                          className="px-4 py-2.5 font-medium"
                          style={{ color: "#12113a" }}
                        >
                          {row.semester}
                        </td>
                        <td
                          className="px-4 py-2.5 text-right tabular-nums"
                          style={{ color: "#5a5a72" }}
                        >
                          {fmt(row.tuitionFee)}
                        </td>
                        <td
                          className="px-4 py-2.5 text-right tabular-nums"
                          style={{ color: "#5a5a72" }}
                        >
                          {fmt(row.examFee)}
                        </td>
                        <td
                          className="px-4 py-2.5 text-right tabular-nums"
                          style={{ color: "#5a5a72" }}
                        >
                          {fmt(row.miscFee)}
                        </td>
                        <td
                          className="px-4 py-2.5 text-right tabular-nums font-semibold"
                          style={{ color: "#12113a" }}
                        >
                          {fmt(rowTotal)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr
                    style={{
                      background: ac.bg,
                      borderTop: `2px solid ${ac.border}`,
                    }}
                  >
                    <td
                      className="px-4 py-2.5 font-bold text-xs uppercase tracking-wide"
                      style={{ color: ac.color }}
                    >
                      Total Program Fee
                    </td>
                    <td colSpan={3} />
                    <td
                      className="px-4 py-2.5 text-right font-bold tabular-nums"
                      style={{ color: ac.color }}
                    >
                      {fmt(totalFee)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Card footer */}
      <div
        className="px-5 py-4 flex items-center justify-between gap-3 flex-wrap"
        style={{ borderTop: "1px solid #ece9e0", background: "#fafaf8" }}
      >
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200"
          style={{ color: ac.color }}
        >
          {expanded ? "Hide Details" : "View Details"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
        <button
          onClick={onApply}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200"
          style={{ background: "#d4920a" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#b87c06")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#d4920a")
          }
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Programs: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = pathname.split("/")[2] || "bachelors";
  const currentLevel =
    programsData.find((l) => l.id === activeTab) ?? programsData[0];

  const [modalOpen, setModalOpen] = useState(false);
  const [preSelected, setPreSelected] = useState<string[]>([]);

  const allOptions = programsData.flatMap((lvl) =>
    lvl.programs.map((p) => `${p.name} – ${p.fullName} (${lvl.shortLabel})`),
  );

  const openModal = (optionStr?: string) => {
    setPreSelected(optionStr ? [optionStr] : []);
    setModalOpen(true);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f7f5f0", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Hero */}
      <div
        className="py-14 px-4 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(135deg, #12113a 0%, #1e1c58 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(212,146,10,0.15)",
              color: "#f0c040",
              border: "1px solid rgba(212,146,10,0.3)",
            }}
          >
            Academic Programs
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shape Your Future
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ color: "#c8c8d8" }}
          >
            Explore our comprehensive range of bachelor's, master's, and
            doctoral programs — designed to equip you for a fulfilling,
            impactful career.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => openModal()}
              className="px-6 py-3 rounded-xl font-medium text-white text-sm transition-all duration-200"
              style={{ background: "#d4920a" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#b87c06")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#d4920a")
              }
            >
              Apply Now
            </button>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.15)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.08)")
              }
            >
              Get Involved
            </button>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="sticky top-16 z-30 px-4 sm:px-6 lg:px-8"
        style={{
          background: "rgba(247,245,240,0.96)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #ece9e0",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="flex overflow-x-auto gap-1 py-2"
            style={{ scrollbarWidth: "none" }}
          >
            {programsData.map((lvl) => {
              const active = lvl.id === activeTab;
              const ac = accentFor(lvl.id);
              return (
                <button
                  key={lvl.id}
                  onClick={() => router.push(lvl.path)}
                  className="flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: active ? ac.bg : "transparent",
                    color: active ? ac.color : "#5a5a72",
                    border: active
                      ? `1.5px solid ${ac.border}`
                      : "1.5px solid transparent",
                  }}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Program grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold mb-1.5"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#12113a",
            }}
          >
            {currentLevel.label}
          </h2>
          <p className="text-sm" style={{ color: "#5a5a72" }}>
            {currentLevel.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {currentLevel.programs.map((program) => {
            const optionStr = `${program.name} – ${program.fullName} (${currentLevel.shortLabel})`;
            return (
              <ProgramCard
                key={program.id}
                program={program}
                level={currentLevel}
                onApply={() => openModal(optionStr)}
              />
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        allOptions={allOptions}
        preSelected={preSelected}
      />
    </div>
  );
};

export default Programs;
