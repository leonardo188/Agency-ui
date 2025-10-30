import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useMockApi } from "../../hooks/useMockApi"
import { siteConfig } from "../../config/siteConfig"

interface HeroData {
  headline: string
  subheadline: string
  videoUrl: string
  ctaPrimary: { label: string; link: string }
  ctaSecondary: { label: string; link: string }
}

export default function Hero() {
  const [hero, setHero] = useState<HeroData | null>(null)

  useEffect(() => {
    const load = async () => {
      const data = await useMockApi(siteConfig.endpoints.mock.hero)
      setHero(data)
    }
    load()
  }, [])

  if (!hero) return null

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      <iframe
        className="absolute inset-0 w-full h-full object-cover"
        src={hero.videoUrl}
        title="Hero Background"
        allow="autoplay; fullscreen"
      />

      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl font-semibold text-secondary leading-tight"
        >
          {hero.headline.split("Digital")[0]}
          <span className="bg-linear-to-r from-primary to-soft-violet bg-clip-text text-transparent">
            Digital Execution
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-text-secondary mt-6 text-lg md:text-xl leading-relaxed"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(74,108,247,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={hero.ctaPrimary.link}
              className="px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-glow transition-all"
            >
              {hero.ctaPrimary.label}
            </Link>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(160,124,255,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={hero.ctaSecondary.link}
              className="px-8 py-3 rounded-full border border-primary text-primary font-semibold bg-white hover:bg-hover-bg transition-all"
            >
              {hero.ctaSecondary.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
