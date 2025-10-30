import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { siteConfig } from "../../config/siteConfig"
import { useMockApi } from "../../hooks/useMockApi"

interface Testimonial {
  quote: string
  author: string
  video: string
}

export default function VideoTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const load = async () => {
      const data = await useMockApi(siteConfig.endpoints.mock.testimonials)
      setTestimonials(data)
    }
    load()
  }, [])

  useEffect(() => {
    if (testimonials.length === 0) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials])

  if (!testimonials.length) return null

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-semibold text-secondary mb-12"
        >
          What Our Partners Say
        </motion.h2>

        <div className="relative flex items-center justify-center">
          <button
            onClick={prev}
            className="absolute left-2 md:left-8 text-success hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="w-full md:w-2/3 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-10 text-left"
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
                  <iframe
                    src={testimonials[index].video}
                    title={testimonials[index].author}
                    allow="autoplay; fullscreen"
                    className="w-full h-full rounded-xl border border-border"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <Play className="text-white w-12 h-12 opacity-50" />
                  </div>
                </div>

                <p className="text-lg text-secondary italic mb-4">
                  “{testimonials[index].quote}”
                </p>
                <p className="font-medium text-primary">
                  — {testimonials[index].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="absolute right-2 md:right-8 text-success hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  )
}
