import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ROICalculator from "@/pages/ROICalculator";
import Navbar from "@/components/landing/Navbar";
import HeroScroll from "@/components/landing/HeroScroll";
import StatsBar from "@/components/landing/StatsBar";
import GlobalReach from "@/components/landing/GlobalReach";
import RobotShowcase from "@/components/landing/RobotShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import ValueProp from "@/components/landing/ValueProp";
import Updates from "@/components/landing/Updates";
import Gallery from "@/components/landing/Gallery";
import Works from "@/components/landing/Works";
import ForFounders from "@/components/landing/ForFounders";
import Founder from "@/components/landing/Founder";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import ScrollToTop from "@/components/landing/ScrollToTop";

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroScroll />
        <StatsBar />
        <GlobalReach />
        <HowItWorks />
        <ValueProp />
        <RobotShowcase />
        <Gallery />
        <Works />
        <ForFounders />
        <Updates />
        <Founder />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <div className="App bg-white" data-testid="app-root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}
