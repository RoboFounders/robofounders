import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/shared/PageMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import { contacts } from "@/content/media";

const copy = {
  en: {
    title: "Privacy notice",
    intro: "How RoboFounders handles information submitted through this website.",
    updated: "Last updated: September 15, 2026",
    sections: [
      [
        "Information we collect",
        "When you contact us, we collect the information you choose to provide, including your name, work email, company or organization, area of interest, product, and message. We also receive the language selected for the inquiry.",
      ],
      [
        "Purpose of use",
        "We use inquiry information to review and respond to your request, communicate about relevant technology, products, partnerships, or business opportunities, and maintain necessary business records. We do not use it for unrelated marketing without your consent.",
      ],
      [
        "Form processing",
        "The inquiry form is processed by FormSubmit and delivered to authorized RoboFounders email inboxes. FormSubmit may process information outside your country and states that form submissions can be retained for up to 30 days. Please avoid submitting confidential technical information unless requested by our team.",
      ],
      [
        "Sharing and retention",
        "We limit access to people who need the information to respond to your inquiry. We may disclose information when required by law or when necessary for the service providers that deliver the form. RoboFounders retains inquiry records only for as long as reasonably necessary for these purposes.",
      ],
      [
        "Your choices",
        "You may ask about, correct, or request deletion of inquiry information held by RoboFounders. Contact us using the address below. The website stores your English or Japanese preference locally in your browser so it can remember your selection.",
      ],
    ],
    provider: "Read FormSubmit’s privacy policy",
    contact: "Privacy inquiries",
    back: "Return to the homepage",
  },
  ja: {
    title: "個人情報保護方針",
    intro: "本ウェブサイトを通じて送信される情報の取り扱いについてご案内します。",
    updated: "最終更新日：2026年9月15日",
    sections: [
      [
        "取得する情報",
        "お問い合わせの際に、お名前、メールアドレス、会社名・組織名、ご関心のある分野、製品名、お問い合わせ内容など、お客様が入力した情報を取得します。また、お問い合わせ時に選択された言語情報を取得します。",
      ],
      [
        "利用目的",
        "取得した情報は、お問い合わせ内容の確認と回答、関連する技術・製品・パートナーシップ・事業機会についての連絡、および必要な業務記録の管理に利用します。ご本人の同意なく、これらと関係のないマーケティングには利用しません。",
      ],
      [
        "フォームの送信処理",
        "お問い合わせフォームはFormSubmitを通じて処理され、RoboFoundersの権限を付与されたメール受信先へ送信されます。情報がお客様の所在国以外で処理される場合があります。FormSubmitは、フォーム送信内容を最大30日間保持する場合があると説明しています。当社から依頼がない限り、機密性の高い技術情報は入力しないでください。",
      ],
      [
        "第三者提供と保管",
        "お問い合わせへの対応に必要な担当者に限って情報へアクセスします。法令に基づく場合、またはフォーム送信に必要なサービス提供者への取り扱いを除き、情報を第三者へ提供しません。お問い合わせ情報は、上記の目的に必要な期間に限って保管します。",
      ],
      [
        "お問い合わせとご本人の権利",
        "RoboFoundersが保有するお問い合わせ情報について、確認、訂正、削除をご希望の場合は、以下のメールアドレスまでご連絡ください。本サイトでは、英語・日本語の選択を記憶するため、言語設定をお客様のブラウザ内に保存します。",
      ],
    ],
    provider: "FormSubmitのプライバシーポリシー",
    contact: "個人情報に関するお問い合わせ",
    back: "トップページへ戻る",
  },
};

export default function Privacy() {
  const { lang } = useLanguage();
  const content = copy[lang];

  return (
    <>
      <PageMeta
        title={content.title}
        description={content.intro}
        path="/privacy"
      />
      <Navbar />
      <main id="main-content" className="page-main">
        <section className="section legal-page">
          <div className="wrap legal-wrap">
            <p className="eyebrow">RoboFounders</p>
            <h1>{content.title}</h1>
            <p className="section-lead">{content.intro}</p>
            <p className="legal-updated">{content.updated}</p>
            <div className="legal-sections">
              {content.sections.map(([title, body]) => (
                <section key={title}>
                  <h2>{title}</h2>
                  <p>{body}</p>
                </section>
              ))}
            </div>
            <div className="legal-contact">
              <h2>{content.contact}</h2>
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
              <a
                href="https://formsubmit.co/privacy.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.provider}
              </a>
            </div>
            <Link className="button outline" to="/">
              {content.back}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
