/**
 * Studio Classes Page — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat
 * Content: Spring 2026 schedule, class descriptions, pricing
 */

import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";

const CLASSES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_classes-areTNpki8JjoGeEXFqcUiH.webp";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_hero-ertyDaSGk9mQrWv2PFyE9M.webp";

const schedule = [
  { day: "Monday", time: "9:30 – 10:45 am", class: "Somatic Vinyasa", style: "Flow" },
  { day: "Tuesday", time: "6:00 – 7:15 pm", class: "Restorative Yoga", style: "Restore" },
  { day: "Wednesday", time: "9:30 – 10:45 am", class: "Somatic Hatha", style: "Hatha" },
  { day: "Thursday", time: "6:00 – 7:15 pm", class: "Embodied Flow", style: "Flow" },
  { day: "Friday", time: "9:30 – 10:45 am", class: "Gentle Yoga", style: "Gentle" },
  { day: "Saturday", time: "9:00 – 10:30 am", class: "Weekend Restorative", style: "Restore" },
];

const classDescriptions = [
  {
    name: "Somatic Vinyasa",
    tag: "Flow",
    desc: "A mindful, body-led flow class that blends somatic awareness with the breath-linked movement of Vinyasa. We move from the inside out — noticing sensation, releasing held tension, and finding freedom in the body. Suitable for all levels.",
  },
  {
    name: "Restorative Yoga",
    tag: "Restore",
    desc: "Deeply nourishing and completely supported. Using bolsters, blankets, and blocks, we hold gentle poses for extended periods to invite the nervous system into a state of profound rest. No flexibility required — just willingness to be still.",
  },
  {
    name: "Somatic Hatha",
    tag: "Hatha",
    desc: "Traditional Hatha yoga approached through a somatic lens. We slow down, tune in, and explore each pose as an opportunity for self-inquiry. Emphasis on breath, alignment, and the felt sense of the body.",
  },
  {
    name: "Embodied Flow",
    tag: "Flow",
    desc: "A creative, intuitive flow class that honours the wisdom of the body. Movement is guided by sensation and breath rather than a fixed sequence. Expect to be surprised, moved, and gently challenged.",
  },
  {
    name: "Gentle Yoga",
    tag: "Gentle",
    desc: "A slow, accessible practice for anyone who needs to move gently. Perfect for beginners, those recovering from injury, or anyone who simply needs a softer approach. All bodies welcome, no experience necessary.",
  },
];

const pricing = [
  { name: "Single Drop-In", price: "$22", desc: "One class, no commitment." },
  { name: "5-Class Pass", price: "$95", desc: "Valid for 3 months. Best for occasional practitioners." },
  { name: "10-Class Pass", price: "$175", desc: "Valid for 6 months. Great value for regular students." },
  { name: "Monthly Unlimited", price: "$120/mo", desc: "Unlimited studio classes. Best value for committed practitioners." },
];

export default function Classes() {
  useReveal([]);

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "55vh",
          minHeight: "400px",
          overflow: "hidden",
        }}
      >
        <img
          src={CLASSES_IMG}
          alt="Rising Moon Studio"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
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
            Rising Moon Studio &nbsp;&middot;&nbsp; Sherwood Park, Alberta
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
            Studio Classes
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: "80px 0 60px", textAlign: "center" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="reveal">
            <span className="eyebrow">Spring 2026</span>
            <div className="section-rule-center" />
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                marginTop: "24px",
              }}
            >
              All classes are held at Rising Moon Studio, 52219 Range Road 231, Sherwood Park. Classes run in 6-week sessions. New students are always welcome — just bring yourself and a willingness to slow down.
            </p>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ marginBottom: "40px" }}>
            <span className="eyebrow">Weekly Schedule</span>
            <div className="section-rule" />
          </div>
          <div className="reveal" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--sage)",
                  }}
                >
                  {["Day", "Time", "Class", "Style"].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--deep-sage)",
                        textAlign: "left",
                        padding: "12px 16px 12px 0",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(168,181,162,0.25)",
                      background: i % 2 === 0 ? "transparent" : "rgba(168,181,162,0.06)",
                    }}
                  >
                    <td
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 400,
                        fontSize: "1rem",
                        color: "var(--dark-olive)",
                        padding: "18px 16px 18px 0",
                      }}
                    >
                      {row.day}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        padding: "18px 16px 18px 0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.time}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 400,
                        fontSize: "0.95rem",
                        color: "var(--dark-olive)",
                        padding: "18px 16px 18px 0",
                      }}
                    >
                      {row.class}
                    </td>
                    <td style={{ padding: "18px 0" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          background: "rgba(168,181,162,0.2)",
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.65rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--deep-sage)",
                        }}
                      >
                        {row.style}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CLASS DESCRIPTIONS ── */}
      <section style={{ background: "var(--sand)", padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ marginBottom: "50px" }}>
            <span className="eyebrow">Class Descriptions</span>
            <div className="section-rule" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                color: "var(--dark-olive)",
                marginTop: "24px",
              }}
            >
              What to Expect
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classDescriptions.map((c, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: "white",
                  padding: "32px",
                  borderLeft: "3px solid var(--sage)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontSize: "1.25rem",
                      color: "var(--dark-olive)",
                    }}
                  >
                    {c.name}
                  </h3>
                  <span
                    style={{
                      padding: "3px 10px",
                      background: "rgba(168,181,162,0.2)",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--deep-sage)",
                    }}
                  >
                    {c.tag}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.92rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.85,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: "80px 0", background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "50px" }}>
            <span className="eyebrow">Pricing</span>
            <div className="section-rule-center" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                color: "var(--dark-olive)",
                marginTop: "24px",
              }}
            >
              Choose What Works for You
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricing.map((p, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: "white",
                  padding: "32px 24px",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(63,74,60,0.06)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "2.2rem",
                    color: "var(--deep-sage)",
                    marginBottom: "10px",
                  }}
                >
                  {p.price}
                </div>
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--dark-olive)",
                    marginBottom: "10px",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    width: "25px",
                    height: "1px",
                    background: "var(--sage)",
                    margin: "0 auto 14px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: "center", marginTop: "50px" }}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                marginBottom: "28px",
              }}
            >
              Registration is through Rising Moon Studio. Questions? Reach out before your first class.
            </p>
            <Link href="/contact">
              <span className="btn-sage" style={{ cursor: "pointer" }}>Register or Ask a Question</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
