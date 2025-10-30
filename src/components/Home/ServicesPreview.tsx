import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Code2,
  Bot,
  BarChart3,
  Palette,
  Cpu,
  Mic2,
} from "lucide-react"
import { siteConfig } from "../../config/siteConfig"
import { useMockApi } from "../../hooks/useMockApi"

const iconMap: Record<string, React.ReactNode> = {
  code2: <Code2 className="w-8 h-8 text-primary" />,
  bot: <Bot className="w-8 h-8 text-primary" />,
  barchart3: <BarChart3 className="w-8 h-8 text-primary" />,
  palette: <Palette className="w-8 h-8 text-primary" />,
  cpu: <Cpu className="w-8 h-8 text-primary" />,
  mic2: <Mic2 className="w-8 h-8 text-primary" />,
}

interface ServiceItem {
  icon: string
  title: string
  desc: string
}

export default function ServicesPreview() {
  const [services, setServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await useMockApi(siteConfig.endpoints.mock.services)
      setServices(data)
    }
    load()
  }, [])

  return (
    <section className="relative py-24 bg-surface overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #E5E7EB 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-semibold text-secondary text-center mb-14"
        >
          Our Services
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{
                y: -6,
                boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
              }}
              className="bg-white rounded-xl p-8 text-center border border-border shadow-sm group transition-all"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center justify-center mb-6"
              >
                {iconMap[s.icon]}
              </motion.div>
              <h3 className="font-display text-lg font-semibold text-secondary mb-2">
                {s.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
