import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { siteConfig } from "../../config/siteConfig"
import { useMockApi } from "../../hooks/useMockApi"

interface CTAData {
  text: string
  buttons: { label: string; link: string }[]
}

export default function CTABanner() {
  const [cta, setCta] = useState<CTAData | null>(null)

  useEffect(() => {
    const load = async () => {
      const data = await useMockApi(siteConfig.endpoints.mock.cta)
      setCta(data)
    }
    load()
  }, [])

  if (!cta) return null

  return (
    <section className="relative py-24 text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-primary via-electric-blue to-neon-green animate-gradient-move opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(255,255,255,0.25),transparent_70%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-semibold leading-snug mb-10"
        >
          {cta.text}
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {cta.buttons.map((btn, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.07,
                boxShadow:
                  i === 0
                    ? "0 0 35px rgba(255,255,255,0.7)"
                    : "0 0 25px rgba(0,255,163,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-auto"
            >
              <Link
                to={btn.link}
                className={`block w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-center transition-all duration-300 ${
                  i === 0
                    ? "bg-white text-primary shadow-md hover:shadow-xl"
                    : "border-2 border-white text-white hover:bg-white/10"
                }`}
              >
                {btn.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-white/20 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 left-[60%] w-[250px] h-[250px] bg-neon-green/20 blur-[90px] rounded-full animate-floatPulse" />
      </div>
    </section>
  )
}
