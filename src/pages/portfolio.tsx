import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMockApi } from "../hooks/useMockApi"
import { usePageSEO } from "../hooks/usePageSEO"
import DefaultLayout from "../layouts/DefaultLayouts"
import { Link } from "react-router-dom"

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null)
  const [filter, setFilter] = useState("All")
  usePageSEO("Portfolio", "Explore our creative work and case studies.")

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi("/data/portfolio-page.json")
      setData(res)
    }
    load()
  }, [])

  if (!data) return null

  const filtered =
    filter === "All"
      ? data.projects
      : data.projects.filter((p: any) => p.category === filter)

  return (
    <DefaultLayout title="Portfolio" description={data.hero.subtext}>
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-primary to-(--color-accent-purple) animate-gradient-move opacity-80"
        />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-display font-semibold text-white mb-4 z-10"
        >
          {data.hero.headline}
        </motion.h1>
        <p className="text-white/80 mb-6 z-10">{data.hero.subtext}</p>
        <Link
          to={data.hero.cta.link}
          className="px-8 py-3 rounded-full bg-white text-primary font-semibold shadow hover:scale-105 transition-all z-10"
        >
          {data.hero.cta.label}
        </Link>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center flex-wrap gap-4 mb-10">
            {["All", ...data.filters].map((f, i) => (
              <button
                key={i}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  f === filter
                    ? "bg-primary text-white"
                    : "border-border text-secondary hover:bg-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((p: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group rounded-2xl overflow-hidden shadow-md"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-opacity duration-500">
                  <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                  <p className="text-white/80 text-sm">{p.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 space-y-20">
          {data.caseStudies.map((c: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-full md:w-1/2 rounded-2xl shadow-md"
              />
              <div className="md:w-1/2">
                <h3 className="text-2xl font-display font-semibold text-secondary mb-3">
                  {c.title}
                </h3>
                <p className="text-text-secondary">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 text-center bg-linear-to-r from-primary to-(--color-accent-purple) text-white">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
          {data.cta.text}
        </h2>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={data.cta.button.link}
            className="px-8 py-3 rounded-full bg-white text-primary font-semibold shadow-md hover:shadow-xl transition-all"
          >
            {data.cta.button.label}
          </Link>
        </motion.div>
      </section>
    </DefaultLayout>
  )
}
