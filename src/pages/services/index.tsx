import { useEffect, useState } from "react"
import { motion, easeOut } from "framer-motion"
import { useMockApi } from "../../hooks/useMockApi"
import { usePageSEO } from "../../hooks/usePageSEO"
import DefaultLayout from "../../layouts/DefaultLayouts"
import { Link } from "react-router-dom"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export default function ServicesPage() {
  const [data, setData] = useState<any>(null)
  usePageSEO("Services", "Explore our creative and automation services.")

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi("/data/services.json")
      setData(res)
    }
    load()
  }, [])

  if (!data) return null

  return (
    <DefaultLayout title="Services" description={data.hero.subtext}>
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2563EB_0%,#3D5AFE_50%,#60A5FA_100%)] opacity-90 animate-gradient-move" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(167,139,250,0.25),transparent_70%)]" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-white drop-shadow-[0_2px_18px_rgba(61,90,254,0.3)] mb-4">
            {data.hero.headline}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            {data.hero.subtext}
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {data.services.map((s: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/80 backdrop-blur-md border border-border rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all text-center"
            >
              <div className="text-primary text-4xl mb-4">
                <i className={s.icon}></i>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {s.title}
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                {s.shortDesc}
              </p>
              <Link
                to={`/services/${s.slug}`}
                className="inline-block px-6 py-2 rounded-full bg-gradient-accent text-white text-sm font-semibold shadow-md hover:shadow-glow transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-accent animate-gradient-move opacity-90" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            Ready to start your next project?
          </h2>
          <Link
            to="/contact"
            className="px-8 py-3 rounded-full bg-white text-primary font-semibold shadow-md hover:shadow-glow transition-all"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </DefaultLayout>
  )
}
