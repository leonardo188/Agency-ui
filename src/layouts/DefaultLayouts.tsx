import Header from "../components/Header"
import Footer from "../components/Footer"
import { motion } from "framer-motion"

interface Props {
  children: ReactNode
  title?: string
  description?: string
}

import { usePageSEO } from "../hooks/usePageSEO"
import type { ReactNode } from "react"

export default function DefaultLayout({ children, title, description }: Props) {
  usePageSEO(title, description)

  return (
    <div className="min-h-screen flex flex-col bg-baseColor text-foreground">
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex-1 pt-20"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  )
}
