import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import DefaultLayout from "../layouts/DefaultLayouts"

export default function NotFound() {
  return (
    <DefaultLayout
      title="404 Not Found"
      description="The page you're looking for does not exist."
    >
      <section className="flex flex-col items-center justify-center text-center py-32 bg-background">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-7xl font-display font-bold bg-linear-to-r from-primary to-soft-violet bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-text-secondary mt-4 mb-8"
        >
          Oops... the page you’re looking for doesn’t exist or has been moved.
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-gradient-accent text-white font-semibold shadow-glow transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </section>
    </DefaultLayout>
  )
}
