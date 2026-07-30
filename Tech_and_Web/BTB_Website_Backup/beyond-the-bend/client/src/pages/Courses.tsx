/**
 * Courses Page — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat
 * Content: A Quiet Return course sales page
 */

import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";

const SANCTUARY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_sanctuary-B7RiUFGS49Hx6Ehi3Nef26.webp";
const MEDITATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_meditation-DETV9R4CBXWfcJVNstpox8.webp";

const modules = [
  {
    num: "01",
    title: "Finding Ground",
    desc: "A somatic practice for coming back into your body when the world feels too loud. We begin with the breath, with the weight of your body on the earth, and with the simple act of noticing.",
    duration: "25 mins",
  },
  {
    num: "02",
    title: "Listening Inward",
    desc: "A guided embodied reflection for tuning into the quiet signals your body has been sending. This is not about fixing — it's about listening with curiosity rather than judgment.",
    duration: "30 mins",
  },
  {
    num: "03",
    title: "Coming Home",
    desc: "A gentle closing practice that integrates everything. We soften, we rest, and we make a quiet commitment to keep returning — to this practice, to this body, to ourselves.",
    duration: "20 mins",
  },
];

const isFor = [
  "Women who feel disconnected from their bodies",
  "Anyone who has been running on empty for too long",
  "Those navigating the transitions of midlife",
  "Anyone who has tried yoga before but found it too fast, too hard, or too focused on performance",
  "Those who want to feel at home in their body — not just flexible or strong",
];

export default function Courses() {
  useReveal([]);

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "65vh",
          minHeight: "450px",
          overflow: "hidden",
        }}
      >
        <img
          src={MEDITATION_IMG}
          alt="A Quiet Return"
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
            background: "linear-gradient(to bottom, rgba(30,42,28,0.2) 0%, rgba(30,42,28,0.75) 100%)",
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
            paddingBottom: "80px",
            paddingTop: "120px",
            paddingLeft: "24px",
            paddingRight: "24px",
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
            A Guided Course
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "white",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            A Quiet Return
          </h1>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "520px",
            }}
          >
            Three guided embodied reflections to help you find your way back to yourself.
          </p>
        </div>
      </section>

      {/* ── ABOUT THE COURSE ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <span className="eyebrow">The Course</span>
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
                For when you've forgotten the way back to yourself.
              </h2>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.9,
                  marginBottom: "18px",
                }}
              >
                A Quiet Return is a short, self-paced course made up of three guided somatic practices. It's designed for women who feel like they've lost the thread — who are busy, exhausted, or simply disconnected from the body they live in.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.9,
                  marginBottom: "18px",
                }}
              >
                Each practice is gentle, unhurried, and completely accessible. No yoga experience required. No special equipment. Just you, a quiet space, and a willingness to listen.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "var(--dark-olive)",
                  lineHeight: 1.9,
                }}
              >
                This course is also included with every Sanctuary membership.
              </p>
            </div>

            <div className="reveal-right">
              <img
                src={SANCTUARY_IMG}
                alt="A quiet, peaceful space"
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

      {/* ── MODULES ── */}
      <section style={{ background: "var(--sand)", padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="eyebrow">What's Inside</span>
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
              Three Practices, One Journey
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modules.map((m, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: "white",
                  padding: "40px 32px",
                  transitionDelay: `${i * 0.12}s`,
                }}
              >
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
                  {m.num}
                </div>
                <div
                  style={{
                    width: "25px",
                    height: "1px",
                    background: "var(--sage)",
                    marginBottom: "18px",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: "1.3rem",
                    color: "var(--dark-olive)",
                    marginBottom: "12px",
                  }}
                >
                  {m.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                    marginBottom: "16px",
                  }}
                >
                  {m.desc}
                </p>
                <span
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--deep-sage)",
                  }}
                >
                  {m.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IS THIS FOR YOU ── */}
      <section style={{ padding: "80px 0", background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <span className="eyebrow">Is This for You?</span>
              <div className="section-rule" />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  color: "var(--dark-olive)",
                  marginTop: "24px",
                  marginBottom: "28px",
                }}
              >
                This course is for you if...
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {isFor.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                      marginBottom: "18px",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      fontSize: "1rem",
                      color: "var(--dark-olive)",
                      lineHeight: 1.7,
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "1px",
                        background: "var(--deep-sage)",
                        marginTop: "12px",
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div className="reveal-right">
              <div
                style={{
                  background: "var(--darker-sage)",
                  padding: "56px 48px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--sage)",
                    display: "block",
                    marginBottom: "20px",
                  }}
                >
                  Self-Paced Course
                </span>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "4rem",
                    color: "white",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  $47
                </div>
                <div
                  style={{
                    width: "30px",
                    height: "1px",
                    background: "rgba(168,181,162,0.4)",
                    margin: "16px auto",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "rgba(247,244,239,0.7)",
                    lineHeight: 1.75,
                    marginBottom: "32px",
                  }}
                >
                  Lifetime access to all three practices. Work through them at your own pace, return to them whenever you need.
                </p>
                <Link href="/contact">
                  <span className="btn-ghost-white" style={{ cursor: "pointer" }}>Enroll Now</span>
                </Link>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "rgba(247,244,239,0.45)",
                    marginTop: "20px",
                  }}
                >
                  Also included with Sanctuary membership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
