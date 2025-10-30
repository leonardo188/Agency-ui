import { useEffect } from "react"
import { siteConfig } from "../config/siteConfig"

export const usePageSEO = (
  title?: string,
  description?: string,
  image?: string
) => {
  useEffect(() => {
    const metaTitle = title
      ? `${title} | ${siteConfig.seo.defaultTitle}`
      : siteConfig.seo.defaultTitle
    const metaDesc = description || siteConfig.seo.description
    const metaImage = image || siteConfig.seo.ogImage

    document.title = metaTitle

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute("name", name)
        document.head.appendChild(tag)
      }
      tag.setAttribute("content", content)
    }

    const setProperty = (prop: string, content: string) => {
      let tag = document.querySelector(`meta[property="${prop}"]`)
      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute("property", prop)
        document.head.appendChild(tag)
      }
      tag.setAttribute("content", content)
    }

    setMeta("description", metaDesc)
    setMeta("keywords", siteConfig.seo.keywords.join(", "))

    setProperty("og:title", metaTitle)
    setProperty("og:description", metaDesc)
    setProperty("og:image", metaImage)
    setProperty("og:type", "website")

    setMeta("twitter:card", "summary_large_image")
    setMeta("twitter:title", metaTitle)
    setMeta("twitter:description", metaDesc)
    setMeta("twitter:image", metaImage)
  }, [title, description, image])
}
