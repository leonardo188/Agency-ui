import { useEffect, useState } from "react"
import { motion, easeOut } from "framer-motion"
import { useMockApi } from "../hooks/useMockApi"
import { usePageSEO } from "../hooks/usePageSEO"
import DefaultLayout from "../layouts/DefaultLayouts"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export default function WorkWithUs() {
  const [data, setData] = useState<any>(null)
  const [form, setForm] = useState({})
  const [status, setStatus] = useState<string | null>(null)
  usePageSEO("Work With Us", "Join our network of global creators.")

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi("/data/workwithus-page.json")
      setData(res)
    }
    load()
  }, [])

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setStatus("loading")
    await new Promise((r) => setTimeout(r, 1200))
    setStatus("success")
  }

  if (!data) return null

  return (
    <DefaultLayout title="Work With Us" description={data.hero.subheadline}>
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2563EB_0%,#3D5AFE_50%,#60A5FA_100%)] opacity-90 animate-gradient-move" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(167,139,250,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(0,255,198,0.15),transparent_70%)]" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-white drop-shadow-[0_2px_20px_rgba(61,90,254,0.35)]">
            {data.hero.headline}
          </h1>
          <p className="text-white/80 text-lg mt-6 max-w-2xl mx-auto">
            {data.hero.subheadline}
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(61,90,254,0.08),transparent_80%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 relative z-10">
          {data.benefits.map((b: string, i: number) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(61,90,254,0.25)",
              }}
              className="bg-surface border border-border rounded-xl text-center p-8 shadow-soft backdrop-blur-md transition-all"
            >
              <h3 className="text-lg font-semibold text-secondary">{b}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="apply" className="py-24 bg-surface">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-semibold text-secondary mb-10">
            Apply Now
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-soft border border-border text-left"
          >
            {[
              "name",
              "email",
              "role",
              "portfolio",
              "bio",
              "availability",
              "contact",
            ].map((f, i) => (
              <div key={i} className="mb-6">
                <label className="block mb-2 font-medium text-secondary capitalize">
                  {f === "contact" ? "Contact Method" : f}
                </label>
                {f === "role" ? (
                  <select
                    name={f}
                    onChange={handleChange}
                    required
                    className="w-full border border-border rounded-lg p-3 focus:ring-2 focus:ring-primary bg-surface"
                  >
                    <option>Designer</option>
                    <option>Developer</option>
                    <option>Strategist</option>
                    <option>Engineer</option>
                  </select>
                ) : (
                  <input
                    name={f}
                    onChange={handleChange}
                    required
                    className="w-full border border-border rounded-lg p-3 focus:ring-2 focus:ring-primary bg-surface"
                  />
                )}
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === "loading"}
              className="w-full px-8 py-3 rounded-full bg-gradient-accent text-white font-semibold shadow-glow hover:shadow-xl transition-all"
            >
              {status === "loading" ? "Submitting..." : "Submit Application"}
            </motion.button>
            {status === "success" && (
              <p className="text-success mt-4 font-medium">
                Thanks for applying!
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-display font-semibold text-center text-secondary mb-10">
            FAQs
          </h2>
          {data.faqs.map((f: any, i: number) => (
            <motion.details
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.1 }}
              className="mb-4 border border-border rounded-lg bg-surface p-5 cursor-pointer shadow-soft"
            >
              <summary className="font-semibold text-secondary">
                {f.q}
              </summary>
              <p className="mt-2 text-text-secondary">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      <section className="py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-accent animate-gradient-move opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.15),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            {data.cta.text}
          </h2>
          <motion.a
            href="#apply"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-white text-primary font-semibold shadow-md hover:shadow-glow transition-all"
          >
            {data.cta.button.label}
          </motion.a>
        </motion.div>
      </section>
    </DefaultLayout>
  )
}
