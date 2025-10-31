import { siteConfig } from "../config/siteConfig"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden text-white mt-20">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#2563EB_0%,#3D5AFE_40%,#A78BFA_80%,#00FFC6_100%)] animate-gradient-move opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.12),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-3 gap-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            Nebula Freelance Collective
          </h3>
          <p className="text-sm md:text-base text-white/80 max-w-xs leading-relaxed">
            The silent engine behind modern brands — automation, creativity, and precision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col gap-2 sm:items-start"
        >
          <h4 className="text-white font-semibold mb-2 text-lg">Navigation</h4>
          {siteConfig.routes.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              className="text-sm md:text-base text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300"
            >
              {r.label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <h4 className="text-white font-semibold mb-2 text-lg">Connect</h4>
          <div className="flex items-center gap-4 mt-1">
            {siteConfig.socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  textShadow: "0 0 12px rgba(255,255,255,0.9)",
                }}
                className="text-xl text-white/80 hover:text-white transition-all duration-300"
              >
                <i className={s.icon}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/20 py-5 text-center text-sm text-white/80 backdrop-blur-sm">
        <p>
          © {year} <span className="font-semibold text-white">Nebula Freelance Collective</span>. All rights reserved.
        </p>
      </div>

      <div className="absolute top-0 left-1/2 w-[300px] h-[300px] bg-white/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </footer>
  )
}
