import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/shared/PageMeta";
import { useLanguage } from "@/contexts/LanguageContext";
export default function NotFound() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <PageMeta title={t.ui.notFound} noIndex />
      <main id="main-content" className="page-main">
        <section className="section wrap">
          <p className="eyebrow">404</p>
          <h1>{t.ui.notFound}</h1>
          <p className="section-lead">{t.ui.notFoundBody}</p>
          <Link to="/" className="button primary">
            {t.ui.backHome}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
