import { motion } from "framer-motion"
import { Sparkles, Eye, Shield, Target } from "lucide-react"
import { useEffect, useState } from "react"
import { useMockApi } from "../hooks/useMockApi"
import { usePageSEO } from "../hooks/usePageSEO"
import DefaultLayout from "../layouts/DefaultLayouts"
import { Link } from "react-router-dom"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 }
  }
}

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.15 } }
}

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="w-8 h-8 text-primary" />,
  eye: <Eye className="w-8 h-8 text-primary" />,
  shield: <Shield className="w-8 h-8 text-primary" />,
  target: <Target className="w-8 h-8 text-primary" />
}

export default function AboutPage() {
  const [data, setData] = useState<any>(null)
  usePageSEO("About", "Learn more about Nebula Studio — our people, mission, and values.")

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi("/data/about-page.json")
      setData(res)
    }
    load()
  }, [])

  if (!data) return null

  return (
    <DefaultLayout title="About Nebula" description={data.hero.subtext}>
      <section className="relative py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2563EB_0%,#3D5AFE_50%,#60A5FA_100%)] opacity-80 animate-gradient-move" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(167,139,250,0.3),transparent_70%)]" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-4 sm:px-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-white drop-shadow-[0_2px_20px_rgba(37,99,235,0.35)] leading-tight">
            Built by creators, for creators.
          </h1>
          <p className="text-base sm:text-lg md:text-xl mt-6 text-white/80 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            We’re a forward-thinking studio dedicated to blending creativity and technology
            into scalable digital solutions.
          </p>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 text-center bg-background px-4">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xl sm:text-2xl italic max-w-3xl mx-auto text-text-secondary leading-relaxed"
        >
          “{data.mission}”
        </motion.p>
      </section>

      <section className="py-16 md:py-24 bg-surface relative">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-secondary mb-10 md:mb-14 px-4">
          Meet the Team
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto px-4 sm:px-6"
        >
          {data.team.map((member: any, i: number) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-surface border border-border rounded-2xl overflow-hidden 
                group shadow-soft hover:shadow-glow transition-all duration-500"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-56 sm:h-64 object-cover rounded-t-2xl brightness-[1.05] contrast-[1.05] saturate-[1.15] group-hover:scale-[1.04] transition-all duration-700"
              />
              <div className="p-5 sm:p-6 text-center">
                <h3 className="font-semibold text-base sm:text-lg text-secondary">{member.name}</h3>
                <p className="text-sm text-text-secondary">{member.role}</p>
              </div>
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-primary/90 text-white opacity-0 group-hover:opacity-100 transition-all duration-700">
                <p className="italic text-center text-sm sm:text-base px-4 sm:px-6">“{member.quote}”</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-16 md:py-24 bg-background px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-secondary mb-10 md:mb-14">
          Our Values
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {data.values.map((v: any, i: number) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-surface rounded-xl shadow-soft p-6 sm:p-8 text-center border border-border transition-all"
            >
              <div className="flex justify-center mb-3 sm:mb-4">{iconMap[v.icon]}</div>
              <h3 className="text-base sm:text-lg font-semibold text-secondary">{v.title}</h3>
              <p className="text-text-secondary mt-2 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 md:py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-accent animate-gradient-move opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.15),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold mb-6 max-w-2xl mx-auto">
            {data.cta.text}
          </h2>
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={data.cta.button.link}
              className="inline-block px-6 sm:px-8 py-3 rounded-full bg-white text-primary font-semibold shadow-md hover:shadow-glow transition-all"
            >
              {data.cta.button.label}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </DefaultLayout>
  )
}
