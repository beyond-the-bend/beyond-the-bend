/**
 * Home Page — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat
 * Sections: Hero, Featured Offerings, Meet Laura, Testimonials, Sanctuary Teaser, Newsletter
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_hero-ertyDaSGk9mQrWv2PFyE9M.webp";
const LAURA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_laura_about-SuTQY3etzHwQxcffvP7tPK.webp";
const SANCTUARY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_sanctuary-B7RiUFGS49Hx6Ehi3Nef26.webp";
const CLASSES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_classes-areTNpki8JjoGeEXFqcUiH.webp";
const MEDITATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_meditation-DETV9R4CBXWfcJVNstpox8.webp";

const testimonials = [
  {
    quote: "When I started practicing with Laura, I was still dealing with a serious shoulder injury from a ski accident. Through her gentle, mindful approach to movement, my shoulder fully healed, something I honestly did not think was possible. I am so grateful for her guidance.",
    name: "Lorna",
    title: "Yoga Student",
  },
  {
    quote: "Laura's restorative yoga sessions are wonderful and leave me feeling relaxed, refreshed and ready to take on my hectic week. Her sessions also have a personal touch that make the class feel like a community.",
    name: "Rachel",
    title: "Yoga Student",
  },
  {
    quote: "Laura's gentle approach, soothing voice and non-judgmental presence provides the perfect invitation into restorative work. Her knowledge and experience are evident as she guides you through poses and processes that will open you to healing.",
    name: "Maureen",
    title: "Online Yoga Student",
  },
];

export default function Home() {
  useReveal([]);

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "650px",
          overflow: "hidden",
        }}
      >
        <img
          src={HERO_IMG}
          alt="A woman practicing gentle yoga in a serene studio"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            animation: "heroZoom 16s ease forwards",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(30,42,28,0.25) 0%, rgba(30,42,28,0.55) 60%, rgba(30,42,28,0.75) 100%)",
          }}
        />
        {/* Hero content — asymmetric, right-aligned */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "0 8% 12%",
          }}
        >
          <div style={{ maxWidth: "600px", textAlign: "right" }}>
            <span
              style={{
                display: "block",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "20px",
              }}
            >
              Rising Moon Studio &nbsp;&middot;&nbsp; Sherwood Park, Alberta
            </span>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
                color: "white",
                marginBottom: "22px",
                textShadow: "0 2px 30px rgba(0,0,0,0.25)",
              }}
            >
              Take a Breath.<br />Feel What's Real.<br />Live What's True.
            </h1>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.8)",
                marginBottom: "36px",
                letterSpacing: "0.02em",
              }}
            >
              Yoga, meditation, and somatic movement for women navigating the beautiful complexity of midlife.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end", flexWrap: "wrap" }}>
              <Link href="/sanctuary">
                <span className="btn-sage" style={{ cursor: "pointer" }}>Join The Sanctuary</span>
              </Link>
              <Link href="/classes">
                <span className="btn-ghost-white" style={{ cursor: "pointer" }}>View Classes</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'Lato', sans-serif",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "44px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
          Scroll
        </div>
      </section>

      {/* ── FEATURED OFFERINGS ── */}
      <section style={{ padding: "120px 0", background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "70px" }}>
            <span className="eyebrow">What We Offer</span>
            <div className="section-rule-center" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--dark-olive)",
                marginTop: "24px",
              }}
            >
              Find Your Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Studio Classes */}
            <Link href="/classes">
              <div
                className="reveal"
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  background: "white",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(63,74,60,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    height: "260px",
                    backgroundImage: `url(${CLASSES_IMG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: "30px" }}>
                  <span className="eyebrow" style={{ color: "var(--deep-sage)" }}>In Studio</span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontSize: "1.5rem",
                      color: "var(--dark-olive)",
                      marginBottom: "12px",
                    }}
                  >
                    Studio Classes
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                    }}
                  >
                    Gentle, grounded classes at Rising Moon Studio in Sherwood Park. Somatic Vinyasa, Restorative, and Embodied Flow.
                  </p>
                  <div style={{ marginTop: "20px" }}>
                    <span
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--deep-sage)",
                      }}
                    >
                      View Schedule &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2: Live Stream */}
            <Link href="/livestream">
              <div
                className="reveal"
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  background: "white",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  transitionDelay: "0.1s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(63,74,60,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    height: "260px",
                    backgroundImage: `url(${MEDITATION_IMG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: "30px" }}>
                  <span className="eyebrow" style={{ color: "var(--deep-sage)" }}>Online</span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontSize: "1.5rem",
                      color: "var(--dark-olive)",
                      marginBottom: "12px",
                    }}
                  >
                    Live Stream
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                    }}
                  >
                    Practice from anywhere in the world. Real-time guidance, real community. All you need is your mat and a Zoom link.
                  </p>
                  <div style={{ marginTop: "20px" }}>
                    <span
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--deep-sage)",
                      }}
                    >
                      View Options &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 3: The Sanctuary */}
            <Link href="/sanctuary">
              <div
                className="reveal"
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  background: "white",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  transitionDelay: "0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(63,74,60,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    height: "260px",
                    backgroundImage: `url(${SANCTUARY_IMG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: "30px" }}>
                  <span className="eyebrow" style={{ color: "var(--deep-sage)" }}>Membership</span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontSize: "1.5rem",
                      color: "var(--dark-olive)",
                      marginBottom: "12px",
                    }}
                  >
                    The Sanctuary
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                    }}
                  >
                    A private library of classes, meditations, and courses. Your ongoing place to practice, rest, and return to yourself.
                  </p>
                  <div style={{ marginTop: "20px" }}>
                    <span
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--deep-sage)",
                      }}
                    >
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MEET LAURA ── */}
      <section style={{ background: "var(--sand)", padding: "120px 0", overflow: "hidden" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            {/* Image — left, slightly offset */}
            <div
              className="reveal-left"
              style={{
                position: "relative",
                paddingRight: "0",
              }}
            >
              <img
                src={LAURA_IMG}
                alt="Laura Harvey, yoga teacher"
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  display: "block",
                  objectFit: "cover",
                }}
              />
              {/* Decorative rule */}
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "-20px",
                  width: "1px",
                  height: "120px",
                  background: "var(--sage)",
                  display: "none",
                }}
              />
            </div>

            {/* Text — right */}
            <div
              className="reveal-right"
              style={{ padding: "0 0 0 60px" }}
            >
              <span className="eyebrow">The Teacher</span>
              <div className="section-rule" />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  color: "var(--dark-olive)",
                  marginBottom: "28px",
                  marginTop: "24px",
                  lineHeight: 1.2,
                }}
              >
                Hi, I'm Laura.
              </h2>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--dark-olive)",
                  lineHeight: 1.85,
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
                  lineHeight: 1.85,
                  marginBottom: "18px",
                }}
              >
                I'm a yoga teacher and a somatic practitioner, but more than that, I'm a student of stillness. I know what it's like to live in a body that feels like a battleground. I know the exhaustion of trying to fix yourself, of waiting for the day you'll finally feel ready.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "var(--dark-olive)",
                  lineHeight: 1.85,
                  marginBottom: "36px",
                }}
              >
                <em>My work is about helping you stop the fight.</em> It's about creating a space where you can actually listen to what your body is trying to tell you, and finding the tools to support it.
              </p>
              <Link href="/about">
                <span className="btn-outline-sage" style={{ cursor: "pointer" }}>Read My Full Story</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        style={{
          background: "var(--darker-sage)",
          padding: "120px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Large background word */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(8rem, 18vw, 20rem)",
            color: "rgba(255,255,255,0.025)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Presence
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12" style={{ position: "relative", zIndex: 1 }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "70px" }}>
            <span className="eyebrow" style={{ color: "var(--sage)" }}>What Students Say</span>
            <div className="section-rule-center" style={{ background: "rgba(168,181,162,0.4)" }} />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "white",
                marginTop: "24px",
              }}
            >
              Real Words from Real Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(168,181,162,0.15)",
                  padding: "40px",
                  transitionDelay: `${i * 0.12}s`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "1rem",
                    color: "rgba(247,244,239,0.85)",
                    lineHeight: 1.85,
                    marginBottom: "28px",
                  }}
                >
                  "{t.quote}"
                </p>
                <div
                  style={{
                    width: "30px",
                    height: "1px",
                    background: "var(--sage)",
                    marginBottom: "16px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--sage)",
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "rgba(247,244,239,0.45)",
                    marginTop: "4px",
                  }}
                >
                  {t.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SANCTUARY TEASER ── */}
      <section style={{ background: "var(--cream)", padding: "120px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "70px" }}>
            <span className="eyebrow">Presence Over Performance</span>
            <div className="section-rule-center" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--dark-olive)",
                marginTop: "24px",
              }}
            >
              The Sanctuary Library
            </h2>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                maxWidth: "600px",
                margin: "20px auto 0",
                lineHeight: 1.85,
              }}
            >
              No pressure. No perfect poses. We're not here for performance, we're here for presence. Helping your body shift out of survival mode and back into a state of calm.
            </p>
          </div>

          {/* Two featured cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div
              className="reveal"
              style={{
                background: "white",
                overflow: "hidden",
                boxShadow: "0 4px 30px rgba(63,74,60,0.06)",
              }}
            >
              <div
                style={{
                  height: "220px",
                  backgroundImage: `url(${CLASSES_IMG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ padding: "28px" }}>
                <span
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--deep-sage)",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Movement &middot; 75 mins
                </span>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: "1.3rem",
                    color: "var(--dark-olive)",
                    marginBottom: "10px",
                  }}
                >
                  Peaceful Restorative Morning
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                  }}
                >
                  A gentle arrival into your day. Focus on softening the nervous system and coming home to your breath.
                </p>
              </div>
            </div>

            <div
              className="reveal"
              style={{
                background: "white",
                overflow: "hidden",
                boxShadow: "0 4px 30px rgba(63,74,60,0.06)",
                transitionDelay: "0.1s",
              }}
            >
              <div
                style={{
                  height: "220px",
                  backgroundImage: `url(${MEDITATION_IMG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ padding: "28px" }}>
                <span
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--deep-sage)",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Meditation &middot; 20 mins
                </span>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: "1.3rem",
                    color: "var(--dark-olive)",
                    marginBottom: "10px",
                  }}
                >
                  A Quiet Return
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                  }}
                >
                  Three guided embodied reflections to help you find your way back to yourself. Gentle, unhurried, and deeply restorative.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ textAlign: "center" }}>
            <Link href="/sanctuary">
              <span className="btn-sage" style={{ cursor: "pointer" }}>Explore the Full Library</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section
        style={{
          background: "var(--blush)",
          padding: "100px 40px",
          textAlign: "center",
        }}
      >
        <div className="max-w-xl mx-auto">
          <div className="reveal">
            <span className="eyebrow" style={{ color: "var(--rosewood)" }}>Stay Connected</span>
            <div className="section-rule-center" style={{ background: "var(--rosewood)", opacity: 0.4 }} />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                color: "var(--dark-olive)",
                marginTop: "24px",
                marginBottom: "16px",
              }}
            >
              Letters from the Studio
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
              Occasional notes on movement, stillness, and the wisdom of slowing down. No noise, no hustle. Just warmth from the studio.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! You'll hear from Laura soon.");
              }}
              style={{ display: "flex", gap: "0", maxWidth: "440px", margin: "0 auto" }}
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  border: "1.5px solid rgba(63,74,60,0.2)",
                  borderRight: "none",
                  background: "rgba(247,244,239,0.8)",
                  color: "var(--dark-olive)",
                  outline: "none",
                }}
              />
              <button type="submit" className="btn-sage">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.06); }
          to { transform: scale(1.0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
      `}</style>
    </div>
  );
}
