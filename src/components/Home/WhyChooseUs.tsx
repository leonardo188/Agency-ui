import { motion } from "framer-motion"
import AnimatedCounter from "../../components/Effects/Counter"
import { useMockApi } from "../../hooks/useMockApi"
import { useEffect, useState } from "react"
import { siteConfig } from "../../config/siteConfig"

interface Stat {
  value: number
  suffix: string
  label: string
}
interface WhyData {
  stats: Stat[]
  partners: string[]
}

export default function WhyChooseUs() {
  const [data, setData] = useState<WhyData | null>(null)

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi(siteConfig.endpoints.mock.whychoose)
      setData(res)
    }
    load()
  }, [])

  if (!data) return null

  return (
    <section
      className="relative py-24 text-white"
      style={{ background: "linear-gradient(90deg, #005CFF, #00FFA3)" }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-semibold mb-14"
        >
          Why Choose Us
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {data.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <AnimatedCounter
                to={s.value}
                suffix={s.suffix}
                className="text-5xl md:text-6xl font-bold text-white drop-shadow-md"
              />
              <p className="mt-2 text-lg font-medium text-white/90">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {data.partners.map((logo, idx) => (
            <motion.img
              key={idx}
              src={logo}
              alt="Partner"
              className="h-10 grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
