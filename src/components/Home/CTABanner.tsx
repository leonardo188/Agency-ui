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
    <section
      className="relative py-24 text-center overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #005CFF 0%, #00FFA3 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-semibold text-white mb-10"
        >
          {cta.text}
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-5 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {cta.buttons.map((btn, i) => (
            <motion.div
              key={i}
              whileHover={
                i === 0
                  ? {
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(255,255,255,0.6)",
                    }
                  : {
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(0,255,163,0.6)",
                    }
              }
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={btn.link}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  i === 0
                    ? "text-primary bg-white shadow-md hover:shadow-lg"
                    : "text-white border-2 border-white hover:bg-white/10"
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
      </div>
    </section>
  )
}
