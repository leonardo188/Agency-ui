import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion, easeOut } from "framer-motion"
import { useMockApi } from "../../hooks/useMockApi"
import { usePageSEO } from "../../hooks/usePageSEO"
import DefaultLayout from "../../layouts/DefaultLayouts"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState<any>(null)
  usePageSEO("Service Detail", "Explore our detailed service offerings.")

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi("/data/services.json")
      const found = res.services.find((s: any) => s.slug === slug)
      setService(found)
    }
    load()
  }, [slug])

  if (!service) return null

  return (
    <DefaultLayout title={service.title} description={service.shortDesc}>
      <section className="relative py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2563EB_0%,#3D5AFE_50%,#60A5FA_100%)] opacity-90 animate-gradient-move" />
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl font-display font-semibold text-white drop-shadow-[0_2px_18px_rgba(61,90,254,0.35)] mb-4">
            {service.title}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {service.shortDesc}
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-5xl mx-auto px-6 text-left">
          <motion.img
            src={service.image}
            alt={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-2xl shadow-soft border border-border mb-10"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg text-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: service.detail }}
          />

          <Link
            to="/services"
            className="inline-block mt-12 px-6 py-3 rounded-full bg-gradient-accent text-white font-semibold shadow-glow hover:shadow-xl transition-all"
          >
            ← Back to Services
          </Link>
        </div>
      </section>
    </DefaultLayout>
  )
}
