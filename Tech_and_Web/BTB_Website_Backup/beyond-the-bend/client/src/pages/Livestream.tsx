/**
 * Live Stream Page — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat
 * Content: Virtual class schedule, pass options, how it works
 */

import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";

const MEDITATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_meditation-DETV9R4CBXWfcJVNstpox8.webp";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_hero-ertyDaSGk9mQrWv2PFyE9M.webp";

const liveSchedule = [
  { day: "Monday", time: "9:30 – 10:45 am MT", class: "Somatic Vinyasa" },
  { day: "Wednesday", time: "9:30 – 10:45 am MT", class: "Somatic Hatha" },
  { day: "Thursday", time: "6:00 – 7:15 pm MT", class: "Embodied Flow" },
  { day: "Saturday", time: "9:00 – 10:30 am MT", class: "Weekend Restorative" },
];

const passes = [
  {
    name: "Single Class",
    price: "$18",
    desc: "One live-stream class. Perfect for trying it out.",
    highlight: false,
  },
  {
    name: "Monthly Pass",
    price: "$75/mo",
    desc: "Unlimited live-stream classes for one month. Cancel anytime.",
    highlight: true,
  },
  {
    name: "10-Class Pass",
    price: "$150",
    desc: "10 live-stream classes, valid for 6 months.",
    highlight: false,
  },
];

const steps = [
  {
    num: "01",
    title: "Register & Pay",
    desc: "Purchase your pass or single class. You'll receive a confirmation email with your Zoom link.",
  },
  {
    num: "02",
    title: "Set Up Your Space",
    desc: "Find a quiet corner with enough room to stretch out. A yoga mat, a blanket, and a bolster or firm pillow are all you need.",
  },
  {
    num: "03",
    title: "Join the Class",
    desc: "Click your Zoom link a few minutes early. Laura will welcome you, and the class begins.",
  },
  {
    num: "04",
    title: "Practice Together",
    desc: "You'll see and hear Laura in real time. You can keep your camera on or off — whatever feels right for you.",
  },
];

export default function Livestream() {
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
          src={HERO_IMG}
          alt="Live stream yoga"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
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
            Practice From Anywhere
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
            Live Stream Classes
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <span className="eyebrow">Online Practice</span>
              <div className="section-rule" />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  color: "var(--dark-olive)",
                  marginTop: "24px",
                  marginBottom: "24px",
                }}
              >
                The warmth of a live class, from wherever you are.
              </h2>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  marginBottom: "18px",
                }}
              >
                Live streaming is not a compromise — it's a genuine community. You'll practice in real time with Laura and other students from across Canada and beyond. You'll be seen, guided, and held, even through a screen.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                }}
              >
                All classes are held via Zoom. All levels are welcome. All you need is a mat, a little space, and a willingness to show up.
              </p>
            </div>
            <div className="reveal-right">
              <img
                src={MEDITATION_IMG}
                alt="Meditation practice"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  boxShadow: "0 20px 60px rgba(63,74,60,0.12)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section style={{ background: "var(--sand)", padding: "80px 0" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ marginBottom: "40px" }}>
            <span className="eyebrow">Spring 2026 Schedule</span>
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
              Weekly Live Classes
            </h2>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                marginTop: "10px",
              }}
            >
              All times are Mountain Time (MT). Classes run approximately 75 minutes.
            </p>
          </div>
          <div className="reveal">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--sage)" }}>
                  {["Day", "Time (MT)", "Class"].map((h) => (
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
                {liveSchedule.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(168,181,162,0.25)",
                      background: i % 2 === 0 ? "transparent" : "rgba(168,181,162,0.08)",
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
                        padding: "18px 0",
                      }}
                    >
                      {row.class}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Choose Your Pass
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {passes.map((p, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: p.highlight ? "var(--darker-sage)" : "white",
                  padding: "40px 30px",
                  textAlign: "center",
                  boxShadow: p.highlight ? "0 20px 50px rgba(63,74,60,0.2)" : "0 4px 20px rgba(63,74,60,0.06)",
                  transitionDelay: `${i * 0.1}s`,
                  position: "relative",
                }}
              >
                {p.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--rosewood)",
                      color: "white",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "5px 16px",
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "2.5rem",
                    color: p.highlight ? "white" : "var(--deep-sage)",
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
                    color: p.highlight ? "rgba(247,244,239,0.8)" : "var(--dark-olive)",
                    marginBottom: "10px",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    width: "25px",
                    height: "1px",
                    background: p.highlight ? "rgba(168,181,162,0.5)" : "var(--sage)",
                    margin: "0 auto 16px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.88rem",
                    color: p.highlight ? "rgba(247,244,239,0.7)" : "var(--text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  {p.desc}
                </p>
                <Link href="/contact">
                  <span
                    className={p.highlight ? "btn-ghost-white" : "btn-outline-sage"}
                    style={{ cursor: "pointer", fontSize: "0.65rem" }}
                  >
                    Register
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "var(--sand)", padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="eyebrow">Getting Started</span>
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
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "3rem",
                    color: "rgba(107,128,99,0.2)",
                    lineHeight: 1,
                    marginBottom: "12px",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    width: "25px",
                    height: "1px",
                    background: "var(--sage)",
                    marginBottom: "16px",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: "1.15rem",
                    color: "var(--dark-olive)",
                    marginBottom: "10px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--blush)", padding: "80px 40px", textAlign: "center" }}>
        <div className="max-w-xl mx-auto">
          <div className="reveal">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                color: "var(--dark-olive)",
                marginBottom: "20px",
              }}
            >
              Ready to Practice from Home?
            </h2>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "var(--dark-olive)",
                lineHeight: 1.85,
                marginBottom: "36px",
                opacity: 0.8,
              }}
            >
              Questions about the technology, the schedule, or what to expect? Reach out — Laura is happy to help you get started.
            </p>
            <Link href="/contact">
              <span className="btn-sage" style={{ cursor: "pointer" }}>Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
