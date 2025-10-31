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
      // HOME SECTION DATA
      hero: "/data/Home/hero.json",
      about: "/data/Home/about.json",
      services: "/data/Home/services.json",
      escrow: "/data/Home/escrow.json",
      portfolio: "/data/Home/portfolio.json",
      whychoose: "/data/Home/whychoose.json",
      testimonials: "/data/Home/testimonials.json",
      cta: "/data/Home/cta.json",

      // OTHER PAGES
      portfolioPage: "/data/portfolio-page.json",
      workwithusPage: "/data/workwithus-page.json",
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
    { icon: "fa-brands fa-linkedin-in", url: "https://linkedin.com" },
    { icon: "fa-brands fa-facebook-f", url: "https://facebook.com" },
    { icon: "fa-brands fa-x-twitter", url: "https://twitter.com" },
    { icon: "fa-brands fa-instagram", url: "https://instagram.com/moderncontenthub" },
    { icon: "fa-brands fa-youtube", url: "https://youtube.com" },
    { icon: "fa-brands fa-tiktok", url: "https://tiktok.com" }
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
