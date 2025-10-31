import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion, easeOut } from "framer-motion"
import { useMockApi } from "../../hooks/useMockApi"
import { usePageSEO } from "../../hooks/usePageSEO"
import DefaultLayout from "../../layouts/DefaultLayouts"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState<any>(null)
  usePageSEO("Blog Detail", "Read the latest insights from our studio.")

  useEffect(() => {
    const load = async () => {
      const res = await useMockApi("/data/blogs.json")
      const found = res.posts.find((b: any) => b.slug === slug)
      setPost(found)
    }
    load()
  }, [slug])

  if (!post) return null

  return (
    <DefaultLayout title={post.title} description={post.excerpt}>
      <section className="relative py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2563EB_0%,#3D5AFE_50%,#60A5FA_100%)] opacity-90 animate-gradient-move" />
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6"
        >
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-white drop-shadow-[0_2px_18px_rgba(61,90,254,0.35)] max-w-3xl mx-auto">
            {post.title}
          </h1>
          <p className="text-white/80 mt-4 text-sm">
            {post.date} • {post.category}
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          <motion.img
            src={post.image}
            alt={post.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-2xl shadow-soft border border-border mb-10"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none text-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Link
            to="/blog"
            className="inline-block mt-12 px-6 py-3 rounded-full bg-gradient-accent text-white font-semibold shadow-glow hover:shadow-xl transition-all"
          >
            ← Back to Blog
          </Link>
        </div>
      </section>
    </DefaultLayout>
  )
}
