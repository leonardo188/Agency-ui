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

export default function PortfolioDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState<any>(null)
  usePageSEO("Project Detail", "View our detailed case studies and creative results.")

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi("/data/portfolio-page.json")
      const found = res.projects.find((p: any) => p.slug === slug)
      setProject(found)
    }
    load()
  }, [slug])

  if (!project) return null

  return (
    <DefaultLayout title={project.title} description={project.desc}>
      <section className="relative py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2563EB_0%,#3D5AFE_50%,#60A5FA_100%)] opacity-90 animate-gradient-move" />
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl font-display font-semibold text-white drop-shadow-[0_2px_18px_rgba(61,90,254,0.35)]">
            {project.title}
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            {project.category}
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-5xl mx-auto px-6 text-left">
          <motion.img
            src={project.image}
            alt={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-2xl shadow-soft border border-border mb-10"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-text-secondary leading-relaxed mb-10"
          >
            {project.desc}
          </motion.p>

          <Link
            to="/portfolio"
            className="inline-block px-6 py-3 rounded-full bg-gradient-accent text-white font-semibold shadow-glow hover:shadow-xl transition-all"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    </DefaultLayout>
  )
}
