import Hero from "../components/Home/Hero";
import AboutSnapshot from "../components/Home/AboutSnapshot";
import DefaultLayout from "../layouts/DefaultLayouts";
import ServicesPreview from "../components/Home/ServicesPreview";
import EscrowWorkflow from "../components/Home/EscrowWorkflow";
import PortfolioTeaser from "../components/Home/PortfolioTeaser";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import VideoTestimonials from "../components/Home/VideoTestimonials";
import CTABanner from "../components/Home/CTABanner";

export default function HomePage() {
  return (
    <>
      <DefaultLayout title="Home" description="Nebula Freelance Collective — blending design, automation, and global creativity.">
        <div className="no-select">
          <Hero />
          <AboutSnapshot/>
          <ServicesPreview/>
          <EscrowWorkflow />
          <PortfolioTeaser />
          <WhyChooseUs />
          <VideoTestimonials />
          <CTABanner />
        </div>
      </DefaultLayout>
    </>
  )
}