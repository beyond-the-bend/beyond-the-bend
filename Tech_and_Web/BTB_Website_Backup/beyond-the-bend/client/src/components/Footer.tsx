/**
 * Footer Component — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat — Deep sage background, warm cream text,
 * elegant wordmark, minimal links, grounded and unhurried.
 */

import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--darker-sage)",
        color: "var(--cream)",
        padding: "80px 40px 60px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "20px",
                fontWeight: 400,
              }}
            >
              Beyond the Bend
            </div>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.9rem",
                lineHeight: 1.8,
                color: "rgba(247,244,239,0.7)",
                maxWidth: "260px",
              }}
            >
              Yoga, meditation, and somatic movement for women navigating the beautiful complexity of midlife.
            </p>
          </div>

          {/* Links */}
          <div>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--sage)",
                marginBottom: "20px",
                fontWeight: 700,
              }}
            >
              Navigate
            </div>
            <nav className="flex flex-col gap-3">
              {[
                { label: "About Laura", href: "/about" },
                { label: "Studio Classes", href: "/classes" },
                { label: "Live Stream", href: "/livestream" },
                { label: "The Sanctuary", href: "/sanctuary" },
                { label: "A Quiet Return", href: "/courses" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="cursor-pointer transition-opacity duration-300 hover:opacity-60"
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.9rem",
                      color: "rgba(247,244,239,0.75)",
                      display: "block",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Location */}
          <div>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--sage)",
                marginBottom: "20px",
                fontWeight: 700,
              }}
            >
              Find Us
            </div>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.9rem",
                lineHeight: 1.8,
                color: "rgba(247,244,239,0.7)",
              }}
            >
              Rising Moon Studio<br />
              52219 Range Road 231<br />
              Sherwood Park, Alberta<br />
              Canada
            </p>
            <div style={{ marginTop: "20px" }}>
              <Link href="/contact">
                <span
                  className="cursor-pointer transition-opacity duration-300 hover:opacity-60"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--blush)",
                    display: "block",
                  }}
                >
                  Get in Touch
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(168,181,162,0.2)",
            paddingTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: "rgba(247,244,239,0.45)",
              textAlign: "center",
            }}
          >
            May all beings find their way home to peace.
          </p>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              color: "rgba(247,244,239,0.35)",
            }}
          >
            Beyond the Bend Yoga &copy; {new Date().getFullYear()} &middot; Sherwood Park, Alberta
          </p>
        </div>
      </div>
    </footer>
  );
}
