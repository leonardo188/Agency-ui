import { useMemo } from "react"
import { siteConfig } from "../config/siteConfig"

export const useTheme = () => {
  const getCSSVar = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim()

  const theme = useMemo(() => {
    const base = siteConfig.theme.base
    return {
      ...base,
      currentAccent:
        getCSSVar("--color-accent") || "rgb(59, 130, 246)", 
    }
  }, [])

  return {
    theme,
    motion: siteConfig.theme.motion,
    typography: siteConfig.theme.typography,
  }
}
