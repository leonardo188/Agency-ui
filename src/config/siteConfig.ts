export const siteConfig = {
  name: "Nebula Freelance Collective",
  domain: "https://nebula-agency.vercel.app",
  description:
    "A creative and automation studio delivering design, technology, and global execution with elegance.",

  // 🎨 THEME (Linked to Tailwind @theme)
  theme: {
    base: {
      background: "var(--color-background)",
      surface: "var(--color-surface)",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      gradient: "var(--color-gradient-accent)",
      foreground: "var(--color-text-primary)",
      muted: "var(--color-text-secondary)",
      border: "var(--color-border)",
      glow: "var(--shadow-glow)",
    },
    typography: {
      fontSans: "var(--font-sans)",
      fontDisplay: "var(--font-display)",
      fontMono: "var(--font-mono)",
    },
    breakpoints: {
      xs: "var(--breakpoint-xs)",
      xl: "var(--breakpoint-3xl)",
    },
    motion: {
      transition: "0.4s ease-in-out",
      hoverGlow: "0 0 12px rgba(74,108,247,0.4)",
    },
  },

  // ROUTES
  routes: [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/work-with-us", label: "Work With Us" },
    { path: "/contact", label: "Contact" },
  ],

  // ENDPOINTS
 endpoints: {
    mock: {
      hero: "/data/hero.json",
      about: "/data/about.json",
      services: "/data/services.json",
      escrow: "/data/escrow.json",
      portfolio: "/data/portfolio.json",
      whychoose: "/data/whychoose.json",
      testimonials: "/data/testimonials.json",
      cta: "/data/cta.json",
      contact: "/data/contact.json",
      aboutPage: "/data/about-page.json",
    },
  },

  // PARTNER SECTION
  partner: {
    title: "In Collaboration With",
    subtitle: "Trusted brands building the creative future with us.",
    cta: "View Partners",
  },

  // SOCIALS
  socials: [
   { name: "LinkedIn", url: "https://linkedin.com/company/nebulaagency" },
    { name: "Facebook", url: "https://facebook.com/@nebulaagency" },
    { name: "X (Twitter)", url: "https://x.com/nebulaagency" },
    { name: "Instagram", url: "https://instagram.com/nebulaagency" },
    { name: "YouTube", url: "https://youtube.com/@nebulaagency" },
    { name: "Tiktok", url: "https://tiktok.com/@nebulaagency" },
  ],

  // SEO
  seo: {
    titleTemplate: "%s | Nebula Freelance Collective",
    defaultTitle: "Nebula Freelance Collective",
    description:
      "A next-generation creative studio combining automation, AI, and design with clarity and precision.",
    keywords: [
      "digital agency",
      "creative automation",
      "branding",
      "web design",
      "marketing studio",
    ],
    ogImage: "/assets/og-cover.jpg",
    twitterCard: "summary_large_image",
  },
};
