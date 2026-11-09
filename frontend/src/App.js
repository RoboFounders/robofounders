import "@/App.css";
import "@/styles/site.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ROICalculator from "@/pages/ROICalculator";
import Home from "@/pages/Home";
import ProductCatalog from "@/pages/ProductCatalog";
import ProductDetail from "@/pages/ProductDetail";
import Labo from "@/pages/Labo";
import Partnerships from "@/pages/Partnerships";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import NewsArticle from "@/pages/NewsArticle";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BackToTop from "@/components/shared/BackToTop";
import ScrollToTopOnNavigate from "@/components/ScrollToTopOnNavigate";

export default function App() {
  return (
    <div className="App bg-white" data-testid="app-root">
      <BrowserRouter>
        <LanguageProvider>
          <ScrollToTopOnNavigate />
          <Routes>
            <Route path="/ja?">
              <Route index element={<Home />} />
              <Route path="products" element={<ProductCatalog />} />
              <Route path="products/:productId" element={<ProductDetail />} />
              <Route path="labo" element={<Labo />} />
              <Route path="partnerships" element={<Partnerships />} />
              <Route path="news" element={<NewsArticle />} />
              <Route path="news/:slug" element={<NewsArticle />} />
              <Route path="roi-calculator" element={<ROICalculator />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <BackToTop />
        </LanguageProvider>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}
