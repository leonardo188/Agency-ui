import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMockApi } from "../hooks/useMockApi"
import { usePageSEO } from "../hooks/usePageSEO"
import DefaultLayout from "../layouts/DefaultLayouts"

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

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setStatus("loading")
    await new Promise((r) => setTimeout(r, 1200))
    setStatus("success")
  }

  if (!data) return null

  return (
    <DefaultLayout title="Work With Us" description={data.hero.subheadline}>
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary to-(--color-accent-purple) animate-gradient-move opacity-80" />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-display font-semibold mb-4 z-10"
        >
          {data.hero.headline}
        </motion.h1>
        <p className="text-white/80 text-lg z-10">{data.hero.subheadline}</p>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {data.benefits.map((b: string, i: number) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,92,255,0.3)" }}
              className="bg-white/40 backdrop-blur-md border border-border rounded-xl text-center p-8 shadow-md transition-all"
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
            className="bg-white p-10 rounded-2xl shadow-md border border-border text-left"
          >
            {["name", "email", "role", "portfolio", "bio", "availability", "contact"].map((f, i) => (
              <div key={i} className="mb-6">
                <label className="block mb-2 font-medium text-secondary capitalize">
                  {f === "contact" ? "Contact Method" : f}
                </label>
                {f === "role" ? (
                  <select
                    name={f}
                    onChange={handleChange}
                    required
                    className="w-full border border-border rounded-lg p-3 focus:ring-2 focus:ring-primary"
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
                    className="w-full border border-border rounded-lg p-3 focus:ring-2 focus:ring-primary"
                  />
                )}
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {status === "loading" ? "Submitting..." : "Submit Application"}
            </motion.button>
            {status === "success" && (
              <p className="text-green-600 mt-4 font-medium">Thanks for applying!</p>
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
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-4 border border-border rounded-lg bg-white p-5 cursor-pointer"
            >
              <summary className="font-semibold text-secondary">
                {f.q}
              </summary>
              <p className="mt-2 text-text-secondary">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      <section className="py-24 text-center bg-linear-to-r from-primary to-(--color-accent-purple) text-white">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
          {data.cta.text}
        </h2>
        <motion.a
          href="#apply"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full bg-white text-primary font-semibold shadow-md hover:shadow-xl transition-all"
        >
          {data.cta.button.label}
        </motion.a>
      </section>
    </DefaultLayout>
  )
}
