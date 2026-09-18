import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import PageMeta from "@/components/shared/PageMeta";
import {
  Bot,
  Calculator,
  RotateCcw,
  Send,
  ArrowLeft,
  TrendingUp,
  Clock,
  PiggyBank,
  Home,
  Languages,
} from "lucide-react";
import { Reveal, SectionLabel } from "@/components/shared/Reveal";

/* =====================================================================
   ADMIN / CONFIGURABLE VALUES — edit these to tune the calculator
   ===================================================================== */

// Labor reduction percentage (default 50%)
const LABOR_REDUCTION_PCT = 0.5;

// Display currency: "JPY" | "USD" | "MYR"
const CURRENCY = "JPY";
const CURRENCIES = {
  JPY: { symbol: "¥", rate: 1 },
  USD: { symbol: "$", rate: 1 / 150 }, // ¥150 = $1
  MYR: { symbol: "RM", rate: 1 / 32 }, // ¥32 = RM1
};

// Robot prices (in JPY) — editable
const ROBOT_PRICES = {
  "Robot Arm": 8_000_000,
  AMR: 7_000_000,
  Humanoid: 12_000_000,
  "Vision AI": 4_000_000,
};

// Task → recommendation mapping (per founder spec)
// `robots`: which priced robots make up the solution (used for payback math)
const TASK_ROBOT_MAP = {
  Manufacturing: { label: "Robot Arm + Robot OS", labelJa: "ロボットアーム + Robot OS", robots: ["Robot Arm"] },
  Inspection: { label: "Vision AI + Robot Arm", labelJa: "ビジョンAI + ロボットアーム", robots: ["Vision AI", "Robot Arm"] },
  "Material Handling": { label: "AMR", labelJa: "AMR（自律走行搬送ロボット）", robots: ["AMR"] },
  Warehouse: { label: "AMR + Robot OS", labelJa: "AMR + Robot OS", robots: ["AMR"] },
  "Customer Service": { label: "Humanoid Robot", labelJa: "ヒューマノイドロボット", robots: ["Humanoid"] },
  Other: { label: "Contact RoboFounders", labelJa: "RoboFoundersにご相談ください", robots: ["Robot Arm"] },
};

// Option midpoints used for the estimate math (values in JPY)
const EMPLOYEE_OPTIONS = [
  { label: "1", value: 1 },
  { label: "2–5", value: 3.5 },
  { label: "6–10", value: 8 },
  { label: "10+", value: 12 },
];

const COST_OPTIONS = [
  { label: "Under ¥200,000", labelJa: "¥200,000未満", value: 180_000 },
  { label: "¥200,000–300,000", value: 250_000 },
  { label: "¥300,000–500,000", value: 400_000 },
  { label: "Over ¥500,000", labelJa: "¥500,000以上", value: 600_000 },
];
/* ===================================================================== */

// UI strings — English first, Japanese support
const STRINGS = {
  en: {
    sectionLabel: "Robot COO Tools",
    title1: "30-Second Robot",
    title2: "ROI Assessment",
    subtitle: "Answer 4 quick questions to see how much a robot could save your business.",
    q1: "1. Number of Employees Performing the Task",
    q1Hint: "How many people perform this task?",
    q2: "2. Monthly Labor Cost per Employee",
    q2Hint: "Monthly labor cost per employee (JPY)",
    q3: "3. Task Type",
    q3Hint: "What task would you like to automate?",
    q4: "4. Automation Interest",
    q4Hint: "Are you interested in automation?",
    calculate: "Calculate My ROI",
    calculating: "Calculating...",
    reset: "Reset",
    fillAll: "Please answer all four questions first.",
    resultsLabel: "Instant Estimate",
    resultsTitle1: "Your",
    resultsTitle2: "Results",
    annualCost: "Estimated Annual Labor Cost",
    annualSavings: (pct) => `Estimated Annual Savings (${pct}% reduction)`,
    recommended: "Recommended Solution",
    payback: "Estimated Payback Period",
    months: "months",
    leadTitle: "Receive a Free Customized Robot ROI Report",
    leadSub: "Our Robot COO team will prepare a detailed report for your exact use case.",
    name: "Name *",
    company: "Company *",
    email: "Email *",
    phone: "Phone (optional)",
    sendReport: "Send My Free Report",
    sending: "Sending...",
    leadRequired: "Please fill in your name, company and email.",
    leadSuccess: "Report request received! We'll send your customized ROI report shortly.",
    leadError: "Something went wrong. Please try again.",
    backHome: "Back to Home",
    footer: "Estimates only. Actual results vary by implementation. © RoboFounders",
    tasks: {},
    interests: { Yes: "Yes", Considering: "Considering", "Just Exploring": "Just Exploring" },
  },
  ja: {
    sectionLabel: "Robot COOツール",
    title1: "30秒ロボット",
    title2: "ROI診断",
    subtitle: "4つの質問に答えるだけで、ロボット導入による削減額がすぐわかります。",
    q1: "1. この作業を行う従業員数",
    q1Hint: "この作業を何名で行っていますか？",
    q2: "2. 従業員1人あたりの月間人件費",
    q2Hint: "1人あたりの月間人件費（円）",
    q3: "3. 作業の種類",
    q3Hint: "どの作業を自動化したいですか？",
    q4: "4. 自動化への関心",
    q4Hint: "自動化に興味はありますか？",
    calculate: "ROIを計算する",
    calculating: "計算中...",
    reset: "リセット",
    fillAll: "4つの質問すべてにお答えください。",
    resultsLabel: "即時見積り",
    resultsTitle1: "診断",
    resultsTitle2: "結果",
    annualCost: "推定年間人件費",
    annualSavings: (pct) => `推定年間削減額（${pct}%削減）`,
    recommended: "おすすめソリューション",
    payback: "推定投資回収期間",
    months: "ヶ月",
    leadTitle: "無料カスタマイズROIレポートを受け取る",
    leadSub: "Robot COOチームが御社向けの詳細レポートを作成します。",
    name: "お名前 *",
    company: "会社名 *",
    email: "メールアドレス *",
    phone: "電話番号（任意）",
    sendReport: "無料レポートを送信",
    sending: "送信中...",
    leadRequired: "お名前・会社名・メールアドレスをご入力ください。",
    leadSuccess: "リクエストを受け付けました。カスタマイズレポートをお送りします。",
    leadError: "エラーが発生しました。もう一度お試しください。",
    backHome: "ホームに戻る",
    footer: "概算値です。実際の結果は導入内容により異なります。© RoboFounders",
    tasks: {
      Manufacturing: "製造",
      Inspection: "検査",
      "Material Handling": "マテハン",
      Warehouse: "倉庫",
      "Customer Service": "接客",
      Other: "その他",
    },
    interests: { Yes: "はい", Considering: "検討中", "Just Exploring": "情報収集中" },
  },
};

const TASK_OPTIONS = Object.keys(TASK_ROBOT_MAP);
const INTEREST_OPTIONS = ["Yes", "Considering", "Just Exploring"];

const money = (jpy) => {
  const c = CURRENCIES[CURRENCY];
  return c.symbol + Math.round(jpy * c.rate).toLocaleString("en-US");
};

function OptionGroup({ label, hint, options, selected, onSelect, cols = 2, testId, display }) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#0a0f1a]">{label}</p>
      {hint && <p className="mt-0.5 mb-2.5 text-xs text-[#5b6b7e]">{hint}</p>}
      <div className={`grid gap-2.5 ${cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2"}`}>
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.label;
          const active = selected === value;
          return (
            <button
              key={value}
              type="button"
              data-testid={`${testId}-${value}`}
              onClick={() => onSelect(value)}
              className={`min-h-[56px] rounded-xl border px-3 py-3 text-sm font-medium transition-all sm:text-base ${
                active
                  ? "border-[#4d6bff] bg-[#eef1ff] text-[#4d6bff] rf-glow"
                  : "border-[#e4ecf2] bg-white text-[#0a0f1a] hover:border-[#b9c2ff]"
              }`}
            >
              {display ? display(opt) : value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({ icon: Icon, label, value, highlight, delay = 0 }) {
  return (
    <Reveal delay={delay} y={16}>
      <div
        className={`h-full rounded-2xl border p-5 transition-all sm:p-6 ${
          highlight
            ? "border-[#4d6bff] bg-[#eef1ff] rf-glow"
            : "border-[#e4ecf2] bg-white hover:border-[#b9c2ff] hover:rf-glow"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef1ff] text-[#4d6bff]">
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5b6b7e]">
            {label}
          </span>
        </div>
        <p className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          <span className={highlight ? "rf-text-gradient" : "text-[#0a0f1a]"}>{value}</span>
        </p>
      </div>
    </Reveal>
  );
}

export default function ROICalculator() {
  const { lang, setLang } = useLanguage();
  const t = STRINGS[lang];

  const [employees, setEmployees] = useState(null);
  const [cost, setCost] = useState(null);
  const [task, setTask] = useState(null);
  const [interest, setInterest] = useState(null);

  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState(null);

  const [lead, setLead] = useState({ name: "", company: "", email: "", phone: "" });
  const [sending, setSending] = useState(false);

  const updateLead = (k) => (e) => setLead((f) => ({ ...f, [k]: e.target.value }));

  const calculate = () => {
    if (!employees || !cost || !task || !interest) {
      toast.error(t.fillAll);
      return;
    }
    setCalculating(true);

    const empValue = EMPLOYEE_OPTIONS.find((o) => o.label === employees).value;
    const costValue = COST_OPTIONS.find((o) => o.label === cost).value;

    // Annual Labor Cost = Employees × Monthly Salary × 12
    const annualLaborCost = empValue * costValue * 12;
    // Estimated Savings = Annual Labor Cost × reduction %
    const annualSavings = annualLaborCost * LABOR_REDUCTION_PCT;

    const rec = TASK_ROBOT_MAP[task];
    const solutionPrice = rec.robots.reduce((sum, r) => sum + ROBOT_PRICES[r], 0);

    // Payback = Robot Cost ÷ Annual Savings (shown as a range in months)
    const paybackLow = Math.max(1, Math.ceil((solutionPrice / annualSavings) * 12));
    const paybackHigh = Math.max(paybackLow + 2, Math.ceil(paybackLow * 1.3));

    setTimeout(() => {
      setResults({ annualLaborCost, annualSavings, rec, solutionPrice, paybackLow, paybackHigh });
      setCalculating(false);
      setTimeout(() => {
        document.getElementById("roi-results")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }, 800);
  };

  const reset = () => {
    setEmployees(null);
    setCost(null);
    setTask(null);
    setInterest(null);
    setResults(null);
    setLead({ name: "", company: "", email: "", phone: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendReport = async (e) => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.company.trim() || !lead.email.trim()) {
      toast.error(t.leadRequired);
      return;
    }
    setSending(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/rofi@robofounders.net", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Name": lead.name,
          "Company": lead.company,
          "Email": lead.email,
          "Phone": lead.phone || "(not provided)",
          "Language Used": lang === "ja" ? "Japanese" : "English",
          "Employees Performing Task": employees,
          "Monthly Labor Cost per Employee": cost,
          "Task Type": task,
          "Automation Interest": interest,
          "Estimated Annual Labor Cost": money(results.annualLaborCost),
          "Estimated Annual Savings": `${money(results.annualSavings)} (${LABOR_REDUCTION_PCT * 100}% reduction)`,
          "Recommended Solution": `${results.rec.label} (approx. ${money(results.solutionPrice)})`,
          "Estimated Payback Period": `${results.paybackLow}–${results.paybackHigh} months`,
          _subject: "New ROI Assessment Lead — RoboFounders",
          _cc: "marieasami7@gmail.com,rofi@robofounders.ai",
          _template: "table",
        }),
      });
      if (!response.ok) throw new Error("send failed");
      toast.success(t.leadSuccess);
      setLead({ name: "", company: "", email: "", phone: "" });
    } catch {
      toast.error(t.leadError);
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-[#e4ecf2] bg-white px-4 py-3.5 text-[#0a0f1a] placeholder:text-[#9aa9b8] outline-none transition-all focus:border-[#4d6bff] focus:ring-2 focus:ring-[#4d6bff]/30";

  return (
    <div className="relative min-h-screen bg-white overflow-x-clip max-w-[100vw]" id="main-content">
      <PageMeta title={`${t.title1} ${t.title2}`} />
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 rf-grid-bg opacity-40 overflow-hidden" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] max-w-[100vw] -translate-x-1/2 rf-radial-glow blur-2xl" />

      <div className="relative mx-auto max-w-2xl px-5 py-10 sm:py-14">
        {/* Header row: back link + language toggle */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5b6b7e] transition-colors hover:text-[#4d6bff]"
          >
            <ArrowLeft className="h-4 w-4" /> RoboFounders
          </Link>
          <button
            type="button"
            data-testid="roi-lang-toggle"
            onClick={() => setLang(lang === "en" ? "ja" : "en")}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#e4ecf2] bg-white px-4 text-sm font-semibold text-[#0a0f1a] transition-all hover:border-[#b9c2ff] hover:text-[#4d6bff]"
          >
            <Languages className="h-4 w-4 text-[#4d6bff]" />
            {lang === "en" ? "日本語" : "English"}
          </button>
        </div>

        <Reveal className="mt-4 text-center">
          <div className="relative mx-auto mb-2 w-fit">
            <div className="pointer-events-none absolute inset-0 scale-125 rf-radial-glow blur-xl" />
            <img
              src="/images/home/rofi-3d.png"
              alt="Rofi — your Robot COO"
              className="rf-float relative mx-auto h-36 w-36 object-contain drop-shadow-xl sm:h-44 sm:w-44"
              loading="eager"
            />
          </div>
          <SectionLabel>{t.sectionLabel}</SectionLabel>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#0a0f1a] sm:text-5xl">
            {t.title1} <span className="rf-text-gradient">{t.title2}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-[#5b6b7e]">
            {t.subtitle}
          </p>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.12}>
        <div className="mt-9 space-y-7 rounded-3xl border border-[#e4ecf2] bg-[#f6f9fb] p-6 sm:p-9">
          <OptionGroup
            label={t.q1}
            hint={t.q1Hint}
            options={EMPLOYEE_OPTIONS}
            selected={employees}
            onSelect={setEmployees}
            testId="roi-employees"
          />
          <OptionGroup
            label={t.q2}
            hint={t.q2Hint}
            options={COST_OPTIONS}
            selected={cost}
            onSelect={setCost}
            testId="roi-cost"
            display={(o) => (lang === "ja" && o.labelJa ? o.labelJa : o.label)}
          />
          <OptionGroup
            label={t.q3}
            hint={t.q3Hint}
            options={TASK_OPTIONS}
            selected={task}
            onSelect={setTask}
            testId="roi-task"
            display={(o) => (lang === "ja" ? t.tasks[o] || o : o)}
          />
          <OptionGroup
            label={t.q4}
            hint={t.q4Hint}
            options={INTEREST_OPTIONS}
            selected={interest}
            onSelect={setInterest}
            cols={3}
            testId="roi-interest"
            display={(o) => t.interests[o] || o}
          />

          <div className="flex gap-3">
            <button
              type="button"
              data-testid="roi-calculate"
              onClick={calculate}
              disabled={calculating}
              className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-full rf-cyan-gradient px-7 text-base font-semibold text-white transition-all duration-300 hover:rf-glow-strong hover:-translate-y-0.5 disabled:opacity-70"
            >
              {calculating ? (
                <>
                  <Bot className="h-5 w-5 animate-bounce" /> {t.calculating}
                </>
              ) : (
                <>
                  <Calculator className="h-5 w-5" /> {t.calculate}
                </>
              )}
            </button>
            <button
              type="button"
              data-testid="roi-reset"
              onClick={reset}
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-[#e4ecf2] bg-white px-5 text-sm font-semibold text-[#5b6b7e] transition-all hover:border-[#b9c2ff] hover:text-[#4d6bff]"
            >
              <RotateCcw className="h-4 w-4" /> {t.reset}
            </button>
          </div>
        </div>
        </Reveal>

        {/* Results */}
        {results && (
          <div
            id="roi-results"
            className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="text-center">
              <SectionLabel>{t.resultsLabel}</SectionLabel>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0a0f1a] sm:text-4xl">
                {t.resultsTitle1} <span className="rf-text-gradient">{t.resultsTitle2}</span>
              </h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ResultCard
                icon={TrendingUp}
                label={t.annualCost}
                value={money(results.annualLaborCost)}
              />
              <ResultCard
                icon={PiggyBank}
                label={t.annualSavings(LABOR_REDUCTION_PCT * 100)}
                value={money(results.annualSavings)}
                highlight
                delay={0.06}
              />
              <ResultCard
                icon={Bot}
                label={t.recommended}
                value={lang === "ja" ? results.rec.labelJa : results.rec.label}
                delay={0.12}
              />
              <ResultCard
                icon={Clock}
                label={t.payback}
                value={`${results.paybackLow}–${results.paybackHigh} ${t.months}`}
                highlight
                delay={0.18}
              />
            </div>

            {/* Lead capture */}
            <form
              onSubmit={sendReport}
              data-testid="roi-lead-form"
              className="mt-8 rounded-3xl border border-[#e4ecf2] bg-[#f6f9fb] p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-bold text-[#0a0f1a]">
                {t.leadTitle}
              </h3>
              <p className="mt-1.5 text-sm text-[#5b6b7e]">{t.leadSub}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input
                  data-testid="roi-lead-name"
                  className={inputCls}
                  placeholder={t.name}
                  value={lead.name}
                  onChange={updateLead("name")}
                />
                <input
                  data-testid="roi-lead-company"
                  className={inputCls}
                  placeholder={t.company}
                  value={lead.company}
                  onChange={updateLead("company")}
                />
                <input
                  data-testid="roi-lead-email"
                  type="email"
                  className={inputCls}
                  placeholder={t.email}
                  value={lead.email}
                  onChange={updateLead("email")}
                />
                <input
                  data-testid="roi-lead-phone"
                  type="tel"
                  className={inputCls}
                  placeholder={t.phone}
                  value={lead.phone}
                  onChange={updateLead("phone")}
                />
              </div>
              <button
                type="submit"
                data-testid="roi-lead-submit"
                disabled={sending}
                className="mt-6 inline-flex min-h-[60px] w-full items-center justify-center gap-2 rounded-full rf-cyan-gradient px-7 text-lg font-semibold text-white transition-all duration-300 hover:rf-glow-strong hover:-translate-y-0.5 disabled:opacity-70"
              >
                {sending ? t.sending : t.sendReport}
                <Send className={`h-5 w-5 ${sending ? "animate-pulse" : ""}`} />
              </button>
            </form>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/"
            data-testid="roi-back-home"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#e4ecf2] bg-white px-7 text-base font-semibold text-[#0a0f1a] transition-all hover:border-[#b9c2ff] hover:rf-glow"
          >
            <Home className="h-4 w-4 text-[#4d6bff]" /> {t.backHome}
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-[#9aa9b8]">{t.footer}</p>
      </div>
    </div>
  );
}
