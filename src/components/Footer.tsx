import { siteConfig } from "../config/siteConfig"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* === BRAND === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <h3 className="font-display text-xl font-semibold text-secondary">
            Nebula Freelance Collective
          </h3>
          <p className="text-sm text-text-secondary max-w-xs">
            The silent engine behind modern brands — automation, creativity, and precision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <h4 className="text-secondary font-semibold mb-2">Navigation</h4>
          {siteConfig.routes.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              {r.label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <h4 className="text-secondary font-semibold mb-2">Connect</h4>
          {siteConfig.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              {s.name}
            </a>
          ))}
        </motion.div>
      </div>

      <div className="border-t border-border py-4 text-center text-sm text-text-secondary">
        © {year} Nebula Freelance Collective. All rights reserved.
      </div>
    </footer>
  )
}
