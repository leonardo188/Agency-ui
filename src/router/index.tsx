import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/HomePage"
import NotFound from "../pages/not-found"
import ContactPage from "../pages/contact"
import AboutPage from "../pages/about"

export const router = createBrowserRouter([
  { path: "/", element: ( <Home />), },
  { path: "/contact", element: ( <ContactPage /> ), },
  { path: "/about", element: ( <AboutPage /> ), },
  { path: "*", element: ( <NotFound /> ),
  },
])
