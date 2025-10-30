import { motion } from "framer-motion"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { siteConfig } from "../config/siteConfig"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-display font-semibold text-secondary hover:text-primary transition-colors"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            NEBULA<span className="text-primary">.</span>
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {siteConfig.routes.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              className={`relative group ${
                location.pathname === r.path
                  ? "text-primary font-semibold"
                  : "text-text-secondary hover:text-primary"
              } transition-all`}
            >
              {r.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-soft-violet group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-secondary focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* === MOBILE NAV === */}
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-surface border-t border-border px-6 py-4 flex flex-col gap-3 shadow-lg"
        >
          {siteConfig.routes.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm ${
                location.pathname === r.path
                  ? "text-primary font-semibold"
                  : "text-text-secondary hover:text-primary"
              }`}
            >
              {r.label}
            </Link>
          ))}
        </motion.nav>
      )}
    </header>
  )
}
