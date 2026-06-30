import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
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

export default function App() {
  return (
    <div className="App bg-white" data-testid="app-root">
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
      <Toaster position="top-center" richColors />
    </div>
  );
}
