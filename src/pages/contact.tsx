import { motion, easeOut } from "framer-motion"
import { useState, useEffect } from "react"
import { useMockApi } from "../hooks/useMockApi"
import { usePageSEO } from "../hooks/usePageSEO"
import DefaultLayout from "../layouts/DefaultLayouts"

interface ContactField {
  name: string
  label: string
  type: string
}

interface ContactData {
  headline: string
  description: string
  formFields: ContactField[]
  socials: { icon: string; url: string }[]
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export default function ContactPage() {
  const [data, setData] = useState<ContactData | null>(null)
  const [form, setForm] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  usePageSEO("Contact", "Get in touch with our creative and automation team.")

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi("/data/contact.json")
      setData(res)
    }
    load()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Mock form data:", form)
    setSubmitted(true)
  }

  if (!data) return null

  return (
    <DefaultLayout title="Contact" description={data.description}>
      <section className="relative py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2563EB_0%,#3D5AFE_50%,#60A5FA_100%)] opacity-90 animate-gradient-move" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(167,139,250,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(0,255,198,0.15),transparent_70%)]" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-white drop-shadow-[0_2px_18px_rgba(61,90,254,0.35)]">
            {data.headline}
          </h1>
          <p className="text-white/80 text-lg mt-6 max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(61,90,254,0.08),transparent_80%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft border border-border p-10 max-w-2xl mx-auto"
            >
              {data.formFields.map((field, i) => (
                <div key={i} className="mb-6 text-left">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-secondary mb-2"
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      required
                      onChange={handleChange}
                      rows={4}
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-surface"
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required
                      onChange={handleChange}
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-surface"
                    />
                  )}
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-accent text-white font-semibold shadow-glow hover:shadow-xl transition-all mt-4"
              >
                Send Message
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-semibold text-secondary mb-4">
                Thanks for reaching out!
              </h3>
              <p className="text-text-secondary">
                We’ll review your message and respond shortly.
              </p>
            </motion.div>
          )}

          <div className="mt-16 flex justify-center flex-wrap gap-8">
            {data.socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  color: "#3D5AFE",
                  textShadow: "0 0 12px rgba(61,90,254,0.6)",
                }}
                className="text-secondary text-2xl transition-all"
              >
                <i className={s.icon}></i>
              </motion.a>
            ))}
          </div>
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
            Let’s create something amazing together.
          </h2>
          <motion.a
            href="#"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-white text-primary font-semibold shadow-md hover:shadow-glow transition-all"
          >
            Start a Project
          </motion.a>
        </motion.div>
      </section>
    </DefaultLayout>
  )
}
