import { useEffect, useState } from "react"
import { motion, easeOut } from "framer-motion"
import { Link } from "react-router-dom"
import { useMockApi } from "../../hooks/useMockApi"
import { usePageSEO } from "../../hooks/usePageSEO"
import DefaultLayout from "../../layouts/DefaultLayouts"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function BlogPage() {
  const [data, setData] = useState<any>(null)
  usePageSEO("Blog", "Insights and creative updates from our studio.")

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi("/data/blogs.json")
      setData(res)
    }
    load()
  }, [])

  if (!data) return null

  return (
    <DefaultLayout title="Blog" description={data.hero.subtext}>
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2563EB_0%,#3D5AFE_50%,#60A5FA_100%)] opacity-90 animate-gradient-move" />
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl font-display font-semibold text-white mb-4 drop-shadow-[0_2px_20px_rgba(61,90,254,0.3)]">
            {data.hero.headline}
          </h1>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {data.hero.subtext}
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {data.posts.map((p: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-glow transition-all"
            >
              <Link to={`/blog/${p.slug}`}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="p-6">
                  <p className="text-sm text-text-secondary mb-2">
                    {p.date} • {p.category}
                  </p>
                  <h3 className="font-semibold text-lg text-secondary line-clamp-2 mb-3">
                    {p.title}
                  </h3>
                  <p className="text-text-secondary text-sm line-clamp-3">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 text-primary text-sm font-medium hover:underline">
                    Read More →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === CTA === */}
      <section className="py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-accent animate-gradient-move opacity-90" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            Join thousands of creators reading our updates.
          </h2>
          <Link
            to="/contact"
            className="px-8 py-3 rounded-full bg-white text-primary font-semibold shadow-md hover:shadow-glow transition-all"
          >
            Subscribe Now
          </Link>
        </motion.div>
      </section>
    </DefaultLayout>
  )
}
