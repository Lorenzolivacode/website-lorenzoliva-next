import "./Freedihare.css";

import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import {
  LayoutDashboard,
  LineChart,
  Database,
  Heart,
  UserRound,
  Users,
} from "lucide-react";

import { buildMetadata } from "../../../seo";
import BlurBlue from "../../../(components)/(atoms)/BlurBlue/BlurBlue";
import BrandIcon from "../../../(components)/(atoms)/BrandIcon/BrandIcon";
import { getIcon } from "../../../(components)/(organisms)/PortfolioList/PortfolioList";
import { personalProjects } from "../../../(data)/personalProjects";

// og:url + canonical propri della pagina di approfondimento
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return buildMetadata(locale, "/dev/freedihare");
}

// Scheda di approfondimento del progetto personale Freedihare.
// Chassis = stile lorenzoliva (tema scuro, utility, BlurBlue, .btn); identità Freedihare
// come accento scoped (.freedihare-page tiene le custom property --fh-*). Niente <header>
// (regola globale lo schiaccerebbe); blocchi in <div> per non interferire col SectionObserver di /dev.
function FreedipharePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Freedihare");

  const logo = "/assets/projects-img/freedihare/freedihare-logo.svg";
  const freedihare = personalProjects.find((p) => p.id === "freedihare");

  const pills = [
    { label: "pillDashboard", sub: "pillDashboardSub" },
    { label: "pillDiary", sub: "pillDiarySub" },
    { label: "pillFoods", sub: "pillFoodsSub" },
    { label: "pillMeals", sub: "pillMealsSub" },
    { label: "pillProfile", sub: "pillProfileSub" },
  ];

  const sections = [
    { Icon: LayoutDashboard, title: "dashboardTitle", text: "dashboardText" },
    { Icon: LineChart, title: "diaryTitle", text: "diaryText" },
    { Icon: Database, title: "foodsTitle", text: "foodsText" },
    { Icon: Heart, title: "mealsTitle", text: "mealsText" },
    { Icon: UserRound, title: "profileTitle", text: "profileText" },
    { Icon: Users, title: "sharingTitle", text: "sharingText" },
  ];

  const macros = [
    { label: "macroKcal", cls: "fh-macro-kcal" },
    { label: "macroProteins", cls: "fh-macro-proteins" },
    { label: "macroFats", cls: "fh-macro-fats" },
    { label: "macroSaturated", cls: "fh-macro-saturated" },
    { label: "macroCarbs", cls: "fh-macro-carbs" },
    { label: "macroSugars", cls: "fh-macro-sugars" },
    { label: "macroFiber", cls: "fh-macro-fiber" },
    { label: "macroSalt", cls: "fh-macro-salt" },
  ];

  const day = ["dayMorning", "dayLunch", "dayDinner", "dayTrend"];

  // screenshot reali (verticali) dell'app, resi in cornici "finestra" nella vetrina
  const shots = [
    { src: "/assets/projects-img/freedihare/dashboard.webp", w: 571, h: 773, cap: "pillDashboard" },
    { src: "/assets/projects-img/freedihare/diary.webp", w: 592, h: 853, cap: "pillDiary" },
    { src: "/assets/projects-img/freedihare/profile.webp", w: 571, h: 874, cap: "pillProfile" },
  ];

  return (
    <div className="freedihare-page w-full">
      <BlurBlue classPosition={"fixed top-0 left-0"} width={"200"} height={"200"} />
      <BlurBlue classPosition={"fixed right-0 bottom-0"} width={"100"} height={"200"} />

      {/* HERO (div, non header: regola globale header{height} lo schiaccerebbe) */}
      <div className="fh-hero">
        <div className="fh-hero-text">
          <p className="fh-eyebrow">{t("eyebrow")}</p>
          <h1 className="fh-title f-bold">Freedihare</h1>
          <p className="fh-wordmark">{t("wordmark")}</p>
          <p className="fh-tagline f-size-1d25-1d5">{t("heroTagline")}</p>
          <span className="fh-status f-size-0d875 f-bold">{t("statusBadge")}</span>
          <p className="f-size-0d95-1d05">{t("heroLead")}</p>
          <p className="f-size-0d95-1d05">{t("heroIntro")}</p>
        </div>

        <div className="fh-hero-aside">
          <Image src={logo} alt="Freedihare" width={150} height={150} />
          {/* anello calorie: grafica CSS che richiama il bilancio in tempo reale dell'app */}
          <div className="fh-ring" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <circle className="fh-ring-track" cx="60" cy="60" r="52" />
              <circle className="fh-ring-value" cx="60" cy="60" r="52" />
            </svg>
            <div className="fh-ring-center">
              <span className="fh-ring-num">1850</span>
              <span className="fh-ring-unit">kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* VETRINA: screenshot reali dell'app (verticali) in cornici "finestra" */}
      <div className="fh-section">
        <h2 className="fh-section-title f-bold f-size-1d35-1d65">
          {t("showcaseTitle")}
        </h2>
        <ul className="fh-showcase">
          {shots.map((s) => (
            <li key={s.cap} className="fh-shot">
              <div className="fh-shot-frame">
                <Image
                  src={s.src}
                  alt={t(s.cap)}
                  width={s.w}
                  height={s.h}
                  sizes="(max-width: 768px) 90vw, 30vw"
                />
              </div>
              <span className="fh-shot-cap">{t(s.cap)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PANORAMICA: le 5 sezioni */}
      <div className="fh-section">
        <h2 className="fh-section-title f-bold f-size-1d35-1d65">
          {t("overviewTitle")}
        </h2>
        <p className="f-size-0d95-1d05">{t("overviewLead")}</p>
        <ul className="fh-pills">
          {pills.map((p) => (
            <li key={p.label} className="fh-pill">
              <span className="fh-pill-label f-bold">{t(p.label)}</span>
              <span className="fh-pill-sub f-size-0d875">{t(p.sub)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* BLOCCHI SEZIONE: card con icona lucide */}
      <div className="fh-section">
        <ul className="fh-grid">
          {sections.map(({ Icon, title, text }) => (
            <li key={title} className="fh-card">
              <span className="fh-card-icon flex-center radius-50p">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="f-bold f-size-1d25-1d5">{t(title)}</h3>
              <p className="f-size-0d95-1d05">{t(text)}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* MACRO: chip coi colori reali dell'app */}
      <div className="fh-section">
        <h2 className="fh-section-title f-bold f-size-1d35-1d65">
          {t("macrosTitle")}
        </h2>
        <p className="f-size-0d95-1d05">{t("macrosText")}</p>
        <ul className="fh-macros">
          {macros.map((m) => (
            <li key={m.label} className={`fh-macro ${m.cls} f-size-0d875 f-bold`}>
              {t(m.label)}
            </li>
          ))}
        </ul>
      </div>

      {/* GIORNATA TIPO: flusso numerato */}
      <div className="fh-section">
        <h2 className="fh-section-title f-bold f-size-1d35-1d65">
          {t("dayTitle")}
        </h2>
        <ol className="fh-flow">
          {day.map((k, i) => (
            <li key={k} className="fh-flow-step">
              <span className="fh-flow-num flex-center radius-50p f-bold">
                {i + 1}
              </span>
              <span className="f-size-0d95-1d05">{t(k)}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* SOTTO IL COFANO: stack + CTA */}
      <div className="fh-section">
        <h2 className="fh-section-title f-bold f-size-1d35-1d65">
          {t("closingTitle")}
        </h2>
        <p className="f-size-0d95-1d05">{t("closingText")}</p>
        <ul className="fh-tech">
          {freedihare?.tech.map((req) => {
            const icon = getIcon(req);
            if (!icon) return null;
            return (
              <li key={req}>
                <BrandIcon
                  icon={icon}
                  size={28}
                  className="txt-c-primary-medium-light"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default FreedipharePage;
