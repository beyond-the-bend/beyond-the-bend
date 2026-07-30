/**
 * Resources Page — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat
 * Content: Laura's recommended tools, books, and affiliate products
 */

import { useReveal } from "@/hooks/useReveal";

const MEDITATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484335839/m9YoMQjwgG7bCQr4upECMr/btb_meditation-DETV9R4CBXWfcJVNstpox8.webp";

const categories = [
  {
    name: "Yoga Props & Equipment",
    items: [
      {
        name: "Manduka PRO Yoga Mat",
        desc: "The mat Laura has used for years. Dense, durable, and supportive — especially important for restorative and somatic practices where you're on the floor for longer periods.",
        tag: "Equipment",
        note: "Laura's personal choice",
      },
      {
        name: "Halfmoon Yoga Bolster",
        desc: "A firm, well-made bolster that holds its shape. Essential for restorative yoga. Laura uses this in her studio classes and recommends it for home practice.",
        tag: "Equipment",
        note: "Studio favourite",
      },
      {
        name: "Hugger Mugger Cork Block Set",
        desc: "Cork blocks are more stable and grounding than foam. These are the ones Laura uses in class and recommends for home practice.",
        tag: "Equipment",
        note: "Recommended",
      },
    ],
  },
  {
    name: "Books Laura Loves",
    items: [
      {
        name: "The Body Keeps the Score — Bessel van der Kolk",
        desc: "A foundational text for understanding how trauma lives in the body and how somatic practices can support healing. Deeply relevant to the work we do together.",
        tag: "Book",
        note: "Essential reading",
      },
      {
        name: "Waking the Tiger — Peter Levine",
        desc: "Peter Levine's introduction to Somatic Experiencing. Accessible, compassionate, and full of practical insight into how the body processes stress and trauma.",
        tag: "Book",
        note: "Highly recommended",
      },
      {
        name: "Burnout — Emily & Amelia Nagoski",
        desc: "A practical, science-based guide to understanding and completing the stress cycle. Especially relevant for women navigating the demands of midlife.",
        tag: "Book",
        note: "Transformative",
      },
      {
        name: "The Wisdom of Menopause — Christiane Northrup",
        desc: "A comprehensive and empowering guide to the physical and emotional changes of midlife. Laura returns to this book again and again.",
        tag: "Book",
        note: "Midlife essential",
      },
    ],
  },
  {
    name: "Wellness & Self-Care",
    items: [
      {
        name: "Insight Timer App",
        desc: "Laura's favourite app for guided meditations and sleep support. Free to use with thousands of high-quality guided practices.",
        tag: "App",
        note: "Free",
      },
      {
        name: "Organic Lavender Eye Pillow",
        desc: "A simple, beautiful addition to your restorative practice. The gentle weight and lavender scent help signal the nervous system to soften.",
        tag: "Wellness",
        note: "Restorative essential",
      },
    ],
  },
];

export default function Resources() {
  useReveal([]);

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "45vh",
          minHeight: "350px",
          overflow: "hidden",
        }}
      >
        <img
          src={MEDITATION_IMG}
          alt="Resources"
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
            Laura's Recommendations
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
            Resources
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: "80px 0 40px", textAlign: "center" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="reveal">
            <span className="eyebrow">Things I Love</span>
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
              These are the tools, books, and resources I genuinely use and recommend. Some of these links are affiliate links — if you purchase through them, I receive a small commission at no extra cost to you. I only share things I truly believe in.
            </p>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      {categories.map((cat, ci) => (
        <section
          key={ci}
          style={{
            padding: "60px 0",
            background: ci % 2 === 0 ? "var(--cream)" : "var(--sand)",
          }}
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="reveal" style={{ marginBottom: "40px" }}>
              <span className="eyebrow">{cat.name}</span>
              <div className="section-rule" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.items.map((item, ii) => (
                <div
                  key={ii}
                  className="reveal"
                  style={{
                    background: "white",
                    padding: "32px",
                    borderLeft: "3px solid var(--sage)",
                    transitionDelay: `${ii * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                      gap: "12px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 400,
                        fontSize: "1.1rem",
                        color: "var(--dark-olive)",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.name}
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
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
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
                    {item.desc}
                  </p>
                  <span
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--rosewood)",
                    }}
                  >
                    ✦ {item.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── DISCLAIMER ── */}
      <section style={{ padding: "60px 40px", background: "var(--sand)", textAlign: "center" }}>
        <div className="max-w-2xl mx-auto">
          <div className="reveal">
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              Some links on this page are affiliate links. This means I may earn a small commission if you make a purchase — at no additional cost to you. I only recommend products I personally use and believe in. Thank you for supporting my work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
