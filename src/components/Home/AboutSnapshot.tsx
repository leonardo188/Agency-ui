import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Zap, Cpu, Globe2, Eye } from "lucide-react"
import { siteConfig } from "../../config/siteConfig"
import { useMockApi } from "../../hooks/useMockApi"

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap className="w-8 h-8 text-primary" />,
  cpu: <Cpu className="w-8 h-8 text-primary" />,
  globe2: <Globe2 className="w-8 h-8 text-primary" />,
  eye: <Eye className="w-8 h-8 text-primary" />,
}

interface AboutItem {
  icon: string
  title: string
  subtitle: string
  desc: string
}

export default function AboutSnapshot() {
  const [items, setItems] = useState<AboutItem[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await useMockApi(siteConfig.endpoints.mock.about)
      setItems(data)
    }
    load()
  }, [])

  return (
    <section className="py-24 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg p-8 text-center border border-border transition-all group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 16px rgba(0,92,255,0.3)",
            }}
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className="flex items-center justify-center mb-6"
            >
              {iconMap[item.icon]}
            </motion.div>

            <h3 className="font-display text-lg font-semibold text-secondary">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-sm text-primary mt-1 font-medium">
                {item.subtitle}
              </p>
            )}
            <p className="text-text-secondary mt-3">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
