/**
 * Navigation Component — Beyond the Bend Yoga
 * Design: Wabi-Sabi Retreat — Sticky header, warm cream background,
 * Playfair Display wordmark, Lato nav links, minimal and grounded.
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Studio Classes", href: "/classes" },
  { label: "Live Stream", href: "/livestream" },
  { label: "The Sanctuary", href: "/sanctuary" },
  { label: "Courses", href: "/courses" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === "/";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || !isHome
            ? "rgba(247, 244, 239, 0.97)"
            : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          boxShadow: scrolled ? "0 1px 20px rgba(63,74,60,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/">
            <span
              className="font-serif text-lg tracking-widest uppercase cursor-pointer transition-opacity duration-300 hover:opacity-70"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: scrolled || !isHome ? "var(--dark-olive)" : "white",
                letterSpacing: "0.2em",
                fontWeight: 400,
                fontSize: "1rem",
              }}
            >
              Beyond the Bend
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="text-xs tracking-widest uppercase cursor-pointer transition-all duration-300 hover:opacity-60"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: scrolled || !isHome ? "var(--dark-olive)" : "rgba(255,255,255,0.9)",
                    textDecoration: location === link.href ? "underline" : "none",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: scrolled || !isHome ? "var(--dark-olive)" : "white" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-500"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          background: "rgba(247, 244, 239, 0.98)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Link key={link.href} href={link.href}>
              <span
                className="text-2xl cursor-pointer transition-opacity duration-300 hover:opacity-60"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--dark-olive)",
                  fontWeight: 400,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
