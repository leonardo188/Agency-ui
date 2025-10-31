import { motion } from "framer-motion"
import { Sparkles, Eye, Shield, Target } from "lucide-react"
import { useEffect, useState } from "react"
import { useMockApi } from "../hooks/useMockApi"
import { usePageSEO } from "../hooks/usePageSEO"
import DefaultLayout from "../layouts/DefaultLayouts"
import { Link } from "react-router-dom"

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
      console.log('About Page Data:', res);
      setData(res)
    }
    load()
  }, [])

  if (!data) return null

  return (
    <DefaultLayout title="About Nebula" description={data.hero.subtext}>
        <section className="relative py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#fefeff] via-[#eaf0ff] to-[#dfe4ff]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(120,180,255,0.4),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(200,160,255,0.25),transparent_70%)]" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl md:text-6xl font-display font-semibold bg-linear-to-r from-electric-blue via-[#6A82FB] to-soft-violet bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(100,120,255,0.25)]">
            Built by creators, for creators.
          </h1>
          <p className="text-lg md:text-xl mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We’re a forward-thinking studio dedicated to blending creativity and technology
            into scalable digital solutions.
          </p>
        </motion.div>
      </section>

      <section className="py-24 text-center bg-background">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xl italic max-w-3xl mx-auto text-secondary"
        >
          “{data.mission}”
        </motion.p>
      </section>

      <section className="py-24 bg-surface">
        <h2 className="text-center text-3xl md:text-4xl font-display font-semibold text-secondary mb-14">
          Meet the Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {data.team.map((member: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white shadow-md rounded-2xl overflow-hidden group border border-gray-100 hover:shadow-xl transition-all"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg text-secondary">
                  {member.name}
                </h3>
                <p className="text-text-secondary">{member.role}</p>
              </div>

              <div className="absolute inset-0 flex flex-col justify-center items-center bg-electric-blue/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="italic text-center px-6">“{member.quote}”</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-background">
        <h2 className="text-center text-3xl md:text-4xl font-display font-semibold text-secondary mb-14">
          Our Values
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {data.values.map((v: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-xl shadow p-8 text-center border border-border"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-center mb-4"
              >
                {iconMap[v.icon]}
              </motion.div>
              <h3 className="text-lg font-semibold text-secondary">{v.title}</h3>
              <p className="text-text-secondary mt-2 text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 text-center bg-linear-to-r from-primary to-(--color-accent-purple) text-white">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">{data.cta.text}</h2>
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
