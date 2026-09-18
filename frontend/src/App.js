import "@/App.css";
import "@/styles/site.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ROICalculator from "@/pages/ROICalculator";
import Home from "@/pages/Home";
import ProductCatalog from "@/pages/ProductCatalog";
import ProductDetail from "@/pages/ProductDetail";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import NewsArticle from "@/pages/NewsArticle";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BackToTop from "@/components/shared/BackToTop";
import ScrollToTopOnNavigate from "@/components/ScrollToTopOnNavigate";

export default function App() {
  return (
    <div className="App bg-white" data-testid="app-root">
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTopOnNavigate />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/news" element={<NewsArticle />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BackToTop />
        </BrowserRouter>
      </LanguageProvider>
      <Toaster position="top-center" richColors />
    </div>
  );
}
