/**
 * About Page — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat — Laura's story, philosophy, and values.
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";

const LAURA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_laura_about-SuTQY3etzHwQxcffvP7tPK.webp";
const MEDITATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_meditation-DETV9R4CBXWfcJVNstpox8.webp";

export default function About() {
  useReveal([]);

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* ── HERO ── */}
      <section
        style={{
          paddingTop: "160px",
          paddingBottom: "80px",
          background: "var(--sand)",
          textAlign: "center",
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <span className="eyebrow">About Laura</span>
          <div className="section-rule-center" />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "var(--dark-olive)",
              marginTop: "24px",
              lineHeight: 1.15,
            }}
          >
            Coming Home to Yourself
          </h1>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              marginTop: "20px",
              lineHeight: 1.85,
            }}
          >
            Yoga teacher, somatic practitioner, and student of stillness.
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <img
                src={LAURA_IMG}
                alt="Laura Harvey"
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  display: "block",
                  objectFit: "cover",
                  boxShadow: "0 20px 60px rgba(63,74,60,0.12)",
                }}
              />
            </div>

            <div className="reveal-right">
              <span className="eyebrow">My Story</span>
              <div className="section-rule" />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "2rem",
                  color: "var(--dark-olive)",
                  marginTop: "24px",
                  marginBottom: "28px",
                  lineHeight: 1.2,
                }}
              >
                I know what it's like to feel like a stranger in your own body.
              </h2>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--dark-olive)",
                  lineHeight: 1.9,
                  marginBottom: "18px",
                }}
              >
                I've spent the better part of the last decade exploring what it means to truly inhabit our bodies. To be present with the messiness of being human. To find a sense of ease that isn't dependent on everything being perfect.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--dark-olive)",
                  lineHeight: 1.9,
                  marginBottom: "18px",
                }}
              >
                I'm a yoga teacher and a somatic practitioner, but more than that, I'm a student of stillness. I know what it's like to live in a body that feels like a battleground. I know the exhaustion of trying to fix yourself, of waiting for the day you'll finally feel ready.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--dark-olive)",
                  lineHeight: 1.9,
                  marginBottom: "18px",
                }}
              >
                My work is about helping you stop the fight. It's about creating a space where you can actually listen to what your body is trying to tell you, and finding the tools to support it.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--dark-olive)",
                  lineHeight: 1.9,
                  marginBottom: "18px",
                }}
              >
                I teach at Rising Moon Studio in Sherwood Park, Alberta, and online to students around the world. My classes blend mindfulness, restorative movement, and somatic awareness to support your whole self: body, mind, and spirit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ background: "var(--sand)", padding: "100px 0" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "70px" }}>
            <span className="eyebrow">The Philosophy</span>
            <div className="section-rule-center" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--dark-olive)",
                marginTop: "24px",
              }}
            >
              What This Work Is About
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                number: "01",
                title: "Nervous System First",
                body: "Everything in this practice begins with the nervous system. When we feel safe, we can actually learn, heal, and grow. Before we ask the body to do anything, we ask it how it feels.",
              },
              {
                number: "02",
                title: "Presence Over Performance",
                body: "This is not about doing yoga correctly. It's about noticing what's actually happening inside you. No pretzels, no perfect poses. Just honest attention and permission to soften.",
              },
              {
                number: "03",
                title: "Embodied Self Trust",
                body: "Your body already knows things your mind hasn't caught up to yet. This practice is about learning to listen to that wisdom, and trusting what you hear.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="reveal"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "3rem",
                    color: "rgba(107,128,99,0.2)",
                    lineHeight: 1,
                    marginBottom: "16px",
                  }}
                >
                  {item.number}
                </div>
                <div
                  style={{
                    width: "30px",
                    height: "1px",
                    background: "var(--sage)",
                    marginBottom: "20px",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: "1.3rem",
                    color: "var(--dark-olive)",
                    marginBottom: "14px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.85,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section
        style={{
          background: "var(--darker-sage)",
          padding: "100px 40px",
          textAlign: "center",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="reveal">
            <div
              style={{
                width: "1px",
                height: "60px",
                background: "rgba(168,181,162,0.4)",
                margin: "0 auto 40px",
              }}
            />
            <blockquote
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                color: "rgba(247,244,239,0.9)",
                lineHeight: 1.5,
                marginBottom: "40px",
              }}
            >
              "You don't need to fix yourself. You need to come home to yourself."
            </blockquote>
            <div
              style={{
                width: "1px",
                height: "60px",
                background: "rgba(168,181,162,0.4)",
                margin: "0 auto 40px",
              }}
            />
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--sage)",
              }}
            >
              Laura Harvey
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT I OFFER ── */}
      <section style={{ padding: "100px 0", background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="eyebrow">Ways to Practice</span>
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
              There's a Place for You Here
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Studio Classes",
                desc: "In-person classes at Rising Moon Studio in Sherwood Park. Somatic Vinyasa, Restorative, Somatic Hatha, and Embodied Flow.",
                href: "/classes",
                cta: "View Schedule",
              },
              {
                title: "Live Stream",
                desc: "Join the community from wherever you are. Real-time guidance via Zoom, with the warmth of a live class.",
                href: "/livestream",
                cta: "View Options",
              },
              {
                title: "The Sanctuary",
                desc: "A private membership library of recorded classes, meditations, and courses. Your ongoing place to practice.",
                href: "/sanctuary",
                cta: "Explore",
              },
              {
                title: "A Quiet Return",
                desc: "A standalone guided course: three embodied reflections to help you find your way back to yourself.",
                href: "/courses",
                cta: "Learn More",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: "white",
                  padding: "40px",
                  borderLeft: "3px solid var(--sage)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: "1.4rem",
                    color: "var(--dark-olive)",
                    marginBottom: "14px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                    marginBottom: "20px",
                  }}
                >
                  {item.desc}
                </p>
                <Link href={item.href}>
                  <span
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--deep-sage)",
                      cursor: "pointer",
                    }}
                  >
                    {item.cta} &rarr;
                  </span>
                </Link>
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
              Ready to Begin?
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
              Whether you're brand new to yoga or returning after years away, there is space for you here. No experience required. No perfection expected.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/classes">
                <span className="btn-sage" style={{ cursor: "pointer" }}>View Classes</span>
              </Link>
              <Link href="/contact">
                <span className="btn-outline-sage" style={{ cursor: "pointer" }}>Get in Touch</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
