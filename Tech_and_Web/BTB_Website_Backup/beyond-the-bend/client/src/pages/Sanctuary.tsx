/**
 * The Sanctuary Page — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat
 * Content: Membership library description, what's inside, pricing
 */

import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";

const SANCTUARY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_sanctuary-B7RiUFGS49Hx6Ehi3Nef26.webp";
const MEDITATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_meditation-DETV9R4CBXWfcJVNstpox8.webp";
const CLASSES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_classes-areTNpki8JjoGeEXFqcUiH.webp";

const libraryItems = [
  {
    category: "Movement",
    title: "Peaceful Restorative Morning",
    duration: "75 mins",
    img: CLASSES_IMG,
    desc: "A gentle arrival into your day. Soften the nervous system and come home to your breath.",
  },
  {
    category: "Meditation",
    title: "A Quiet Return",
    duration: "20 mins",
    img: MEDITATION_IMG,
    desc: "Three guided embodied reflections to help you find your way back to yourself.",
  },
  {
    category: "Movement",
    title: "Somatic Floor Flow",
    duration: "60 mins",
    img: SANCTUARY_IMG,
    desc: "A slow, grounded practice entirely on the floor. Release held tension and restore ease.",
  },
  {
    category: "Rest",
    title: "Yoga Nidra for Deep Rest",
    duration: "35 mins",
    img: MEDITATION_IMG,
    desc: "A guided Yoga Nidra practice for profound rest and nervous system restoration.",
  },
];

const included = [
  "Unlimited access to the full class library",
  "New classes added every month",
  "Guided meditations and Yoga Nidra recordings",
  "Somatic practices and body-based reflections",
  "Access to A Quiet Return course",
  "Community connection and seasonal offerings",
  "Cancel anytime",
];

export default function Sanctuary() {
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
          src={SANCTUARY_IMG}
          alt="The Sanctuary"
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
            background: "linear-gradient(to bottom, rgba(30,42,28,0.2) 0%, rgba(30,42,28,0.7) 100%)",
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
            Membership Library
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
            The Sanctuary
          </h1>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "560px",
            }}
          >
            Your ongoing place to practice, rest, and return to yourself.
          </p>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <span className="eyebrow">About the Sanctuary</span>
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
                A private library for your ongoing practice.
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
                The Sanctuary is a growing library of recorded yoga classes, guided meditations, somatic practices, and short courses — all designed to support women in midlife who are ready to come home to themselves.
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
                This is not a place for hustle or performance. It's a place to slow down, to listen, to rest. New content is added every month, and everything is available to you whenever you need it.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.9,
                }}
              >
                Whether you have 20 minutes or 90, whether you want to move or simply be still — there is something here for you.
              </p>
            </div>

            {/* What's included */}
            <div className="reveal-right">
              <div
                style={{
                  background: "var(--sand)",
                  padding: "48px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: "1.4rem",
                    color: "var(--dark-olive)",
                    marginBottom: "28px",
                  }}
                >
                  What's Included
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {included.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        marginBottom: "16px",
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.95rem",
                        color: "var(--dark-olive)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          height: "1px",
                          background: "var(--deep-sage)",
                          marginTop: "11px",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIBRARY PREVIEW ── */}
      <section style={{ background: "var(--sand)", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="eyebrow">A Taste of What's Inside</span>
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
              Sample Classes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {libraryItems.map((item, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: "white",
                  overflow: "hidden",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    height: "180px",
                    backgroundImage: `url(${item.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      background: "rgba(63,74,60,0.75)",
                      color: "white",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.7rem",
                      padding: "4px 10px",
                    }}
                  >
                    {item.duration}
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <span
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--deep-sage)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {item.category}
                  </span>
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontSize: "1.05rem",
                      color: "var(--dark-olive)",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.82rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: "80px 0", background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "50px" }}>
            <span className="eyebrow">Membership</span>
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
              Join the Sanctuary
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="reveal"
              style={{
                background: "white",
                padding: "48px 36px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(63,74,60,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "2.8rem",
                  color: "var(--deep-sage)",
                  marginBottom: "8px",
                }}
              >
                $27
              </div>
              <div
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--dark-olive)",
                  marginBottom: "8px",
                }}
              >
                Monthly
              </div>
              <div style={{ width: "25px", height: "1px", background: "var(--sage)", margin: "0 auto 16px" }} />
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                Full access to the library. Cancel anytime.
              </p>
              <Link href="/contact">
                <span className="btn-outline-sage" style={{ cursor: "pointer" }}>Join Monthly</span>
              </Link>
            </div>

            <div
              className="reveal"
              style={{
                background: "var(--darker-sage)",
                padding: "48px 36px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(63,74,60,0.2)",
                position: "relative",
                transitionDelay: "0.1s",
              }}
            >
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
                Best Value
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "2.8rem",
                  color: "white",
                  marginBottom: "8px",
                }}
              >
                $270
              </div>
              <div
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(247,244,239,0.8)",
                  marginBottom: "8px",
                }}
              >
                Annual
              </div>
              <div style={{ width: "25px", height: "1px", background: "rgba(168,181,162,0.5)", margin: "0 auto 16px" }} />
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.88rem",
                  color: "rgba(247,244,239,0.7)",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                Two months free. Full access for the whole year.
              </p>
              <Link href="/contact">
                <span className="btn-ghost-white" style={{ cursor: "pointer" }}>Join Annually</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section
        style={{
          background: "var(--blush)",
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="reveal">
            <blockquote
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                color: "var(--dark-olive)",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              "You don't need more willpower. You need a place that feels safe enough to let go."
            </blockquote>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--rosewood)",
              }}
            >
              Laura Harvey
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
