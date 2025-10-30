import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMockApi } from "../../hooks/useMockApi"
import { siteConfig } from "../../config/siteConfig"

interface PortfolioItem {
  title: string
  desc: string
  image: string
}

export default function PortfolioTeaser() {
  const [projects, setProjects] = useState<PortfolioItem[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await useMockApi(siteConfig.endpoints.mock.portfolio)
      setProjects(data)
    }
    load()
  }, [])

  return (
    <section className="relative py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-semibold text-secondary text-center mb-14"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white text-xl font-semibold"
                >
                  {p.title}
                </motion.h3>
                <p className="text-white/90 text-sm">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
