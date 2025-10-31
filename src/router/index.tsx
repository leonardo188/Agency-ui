import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/HomePage"
import NotFound from "../pages/not-found"
import ContactPage from "../pages/contact"
import AboutPage from "../pages/about"
import PortofolioPage from "../pages/portfolio"
import WorkWithUsPage from "../pages/work-with-us"

export const router = createBrowserRouter([
  { path: "/", element: ( <Home />), },
  { path: "/contact", element: ( <ContactPage /> ), },
  { path: "/about", element: ( <AboutPage /> ), },
  { path: "/portfolio", element: ( <PortofolioPage /> ), },
  { path: "/work-with-us", element: ( <WorkWithUsPage /> ), },
  { path: "*", element: ( <NotFound /> ),
  },
])
