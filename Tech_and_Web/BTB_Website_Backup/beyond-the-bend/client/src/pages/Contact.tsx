/**
 * Contact Page — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat
 * Content: Contact form, location, social links
 */

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const SANCTUARY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_sanctuary-B7RiUFGS49Hx6Ehi3Nef26.webp";

export default function Contact() {
  useReveal([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 300,
    fontSize: "0.95rem",
    border: "1.5px solid rgba(168,181,162,0.4)",
    background: "white",
    color: "var(--dark-olive)",
    outline: "none",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "40vh",
          minHeight: "300px",
          overflow: "hidden",
        }}
      >
        <img
          src={SANCTUARY_IMG}
          alt="Contact"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(30,42,28,0.3) 0%, rgba(30,42,28,0.65) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "center",
            paddingBottom: "60px",
            paddingTop: "120px",
          }}
        >
          <span
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Let's Connect
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "white",
              lineHeight: 1.1,
            }}
          >
            Get in Touch
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div className="reveal-left">
              <span className="eyebrow">Reach Out</span>
              <div className="section-rule" />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  color: "var(--dark-olive)",
                  marginTop: "24px",
                  marginBottom: "24px",
                  lineHeight: 1.2,
                }}
              >
                Questions are always welcome.
              </h2>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.9,
                  marginBottom: "40px",
                }}
              >
                Whether you're wondering which class is right for you, curious about the Sanctuary, or just want to say hello — please reach out. Laura reads and responds to every message personally.
              </p>

              {/* Location */}
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--deep-sage)",
                    marginBottom: "12px",
                  }}
                >
                  Studio Location
                </div>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    color: "var(--dark-olive)",
                    lineHeight: 1.8,
                  }}
                >
                  Rising Moon Studio<br />
                  52219 Range Road 231<br />
                  Sherwood Park, Alberta<br />
                  Canada
                </p>
              </div>

              {/* Social */}
              <div>
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--deep-sage)",
                    marginBottom: "12px",
                  }}
                >
                  Find Laura Online
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { label: "Instagram", handle: "@beyondthebend", href: "https://instagram.com/beyondthebend" },
                    { label: "Facebook", handle: "Beyond the Bend Yoga", href: "https://facebook.com/beyondthebend" },
                    { label: "YouTube", handle: "Beyond the Bend", href: "https://youtube.com/@beyondthebend" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textDecoration: "none",
                        transition: "opacity 0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <span
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--deep-sage)",
                          width: "80px",
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.9rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {s.handle}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="reveal-right">
              {submitted ? (
                <div
                  style={{
                    background: "var(--sand)",
                    padding: "60px 48px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "1px",
                      height: "50px",
                      background: "var(--sage)",
                      margin: "0 auto 30px",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "1.8rem",
                      color: "var(--dark-olive)",
                      marginBottom: "16px",
                    }}
                  >
                    Thank you, {form.name}.
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      fontSize: "1rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.8,
                    }}
                  >
                    Laura will be in touch soon. In the meantime, take a breath.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.65rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--deep-sage)",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "var(--deep-sage)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(168,181,162,0.4)")}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.65rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--deep-sage)",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "var(--deep-sage)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(168,181,162,0.4)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--deep-sage)",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      What brings you here?
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--deep-sage)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(168,181,162,0.4)")}
                    >
                      <option value="">Select a topic...</option>
                      <option value="studio">Studio Classes</option>
                      <option value="livestream">Live Stream Classes</option>
                      <option value="sanctuary">The Sanctuary Membership</option>
                      <option value="course">A Quiet Return Course</option>
                      <option value="general">General Question</option>
                      <option value="other">Something Else</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--deep-sage)",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--deep-sage)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(168,181,162,0.4)")}
                    />
                  </div>

                  <button type="submit" className="btn-sage" style={{ alignSelf: "flex-start" }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
