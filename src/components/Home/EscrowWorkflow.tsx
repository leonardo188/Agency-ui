import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useMockApi } from "../../hooks/useMockApi"
import { siteConfig } from "../../config/siteConfig"
import {
  User,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  user: <User className="w-8 h-8" />,
  shieldcheck: <ShieldCheck className="w-8 h-8" />,
  briefcase: <Briefcase className="w-8 h-8" />,
  checkcircle2: <CheckCircle2 className="w-8 h-8" />,
}

interface EscrowData {
  steps: { label: string; icon: string }[]
  copy: { client: string; freelancer: string }
}

export default function EscrowWorkflow() {
  const [data, setData] = useState<EscrowData | null>(null)

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi(siteConfig.endpoints.mock.escrow)
      setData(res)
    }
    load()
  }, [])

  if (!data) return null

  return (
    <section className="relative py-24 bg-electric-blue text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-semibold mb-20"
        >
          Escrow Workflow
        </motion.h2>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-16">
          <motion.div
            className="hidden md:block absolute top-1/2 left-0 w-full h-[3px] bg-linear-to-r from-white via-white/60 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />

          {data.steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.6 }}
            >
              <motion.div
                className="relative flex items-center justify-center w-24 h-24 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm text-white"
                initial={{ opacity: 0.5, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  boxShadow: "0 0 20px rgba(255,255,255,0.4)",
                }}
                transition={{ delay: i * 0.3 + 0.3, duration: 0.6 }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(255,255,255,0.6)",
                }}
              >
                {iconMap[step.icon]}
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: [0.2, 0.6, 0],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    delay: i * 0.4,
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              </motion.div>

              <p className="mt-4 text-base font-medium">{step.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-20 max-w-2xl mx-auto text-center"
        >
          <p className="text-lg font-semibold mb-2">
            <strong>Clients:</strong> “{data.copy.client}”
          </p>
          <p className="text-lg font-semibold">
            <strong>Freelancers:</strong> “{data.copy.freelancer}”
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
    </section>
  )
}
