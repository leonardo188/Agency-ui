import { motion } from "framer-motion"
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
  socials: { label: string; url: string }[]
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-display font-semibold text-secondary mb-4"
          >
            {data.headline}
          </motion.h1>
          <p className="text-secondary mb-10">{data.description}</p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-md p-10 border border-border max-w-2xl mx-auto"
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
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required
                      onChange={handleChange}
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  )}
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Send Message
              </motion.button>
            </form>
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

          <div className="mt-16 flex justify-center gap-8">
            {data.socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-primary hover:text-secondary font-medium"
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}
