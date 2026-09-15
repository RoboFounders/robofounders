import { Boxes, Bot, Cpu, Database, Factory, Orbit } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
const icons = [Boxes, Bot, Cpu, Database, Factory, Orbit];
export default function Ecosystem() {
  const { t } = useLanguage();
  return (
    <div
      className="ecosystem"
      role="img"
      aria-label={`${t.hero.diagram}: ${t.hero.nodes.join(", ")}`}
    >
      <div className="eco-topline">
        <span>{t.hero.diagram}</span>
        <span className="status-dot" />
      </div>
      <div className="eco-system">
        <div className="eco-ring ring-one" />
        <div className="eco-ring ring-two" />
        <div className="eco-core">
          <span className="eco-mark">R</span>
          <strong>
            PHYSICAL
            <br />
            AI
          </strong>
        </div>
        {t.hero.nodes.map((label, i) => {
          const Icon = icons[i];
          return (
            <div key={label} className={`eco-node node-${i}`}>
              <Icon size={19} strokeWidth={1.4} />
              <span>{label}</span>
            </div>
          );
        })}
      </div>
      <div className="eco-bottom">
        <span>JPN</span>
        <i />
        <span>ASEAN</span>
        <i />
        <span>USA</span>
      </div>
    </div>
  );
}
