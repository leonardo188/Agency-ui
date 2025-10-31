import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/HomePage"
import NotFound from "../pages/not-found"
import ContactPage from "../pages/contact"
import AboutPage from "../pages/about"
import PortofolioPage from "../pages/Portofolio"
import PortofolioDetail from "../pages/Portofolio/[slug]"
import BlogPage from "../pages/blog"
import BlogDetail from "../pages/blog/[slug]"
import ServicesPage from "../pages/services"
import ServicesDetail from "../pages/services/[slug]"
import WorkWithUsPage from "../pages/work-with-us"

export const router = createBrowserRouter([
  { path: "/", element: ( <Home />), },
  { path: "/contact", element: ( <ContactPage /> ), },
  { path: "/about", element: ( <AboutPage /> ), },
  { path: "/portfolio", element: ( <PortofolioPage /> ), },
  { path: "/portfolio/:slug", element: <PortofolioDetail /> },
  { path: "/blog", element: ( <BlogPage /> ), },
  { path: "/blog/:slug", element: <BlogDetail /> },
  { path: "/services", element: ( <ServicesPage /> ), },
  { path: "/services/:slug", element: <ServicesDetail /> },
  { path: "/work-with-us", element: ( <WorkWithUsPage /> ), },
  { path: "*", element: ( <NotFound /> ),
  },
])
