// Contenuto statico della pagina /dev/freedihare: solo chiavi i18n + config (dati puri, niente UI).
// L'icona delle sezioni è una chiave-stringa (iconKey), mappata a un componente lucide nella pagina.

export const fhPills = [
  { label: "pillDashboard", sub: "pillDashboardSub" },
  { label: "pillDiary", sub: "pillDiarySub" },
  { label: "pillFoods", sub: "pillFoodsSub" },
  { label: "pillMeals", sub: "pillMealsSub" },
  { label: "pillProfile", sub: "pillProfileSub" },
];

export const fhSections = [
  { iconKey: "dashboard", title: "dashboardTitle", text: "dashboardText" },
  { iconKey: "diary", title: "diaryTitle", text: "diaryText" },
  { iconKey: "foods", title: "foodsTitle", text: "foodsText" },
  { iconKey: "meals", title: "mealsTitle", text: "mealsText" },
  { iconKey: "profile", title: "profileTitle", text: "profileText" },
  { iconKey: "sharing", title: "sharingTitle", text: "sharingText" },
];

export const fhMacros = [
  { label: "macroKcal", cls: "fh-macro-kcal" },
  { label: "macroProteins", cls: "fh-macro-proteins" },
  { label: "macroFats", cls: "fh-macro-fats" },
  { label: "macroSaturated", cls: "fh-macro-saturated" },
  { label: "macroCarbs", cls: "fh-macro-carbs" },
  { label: "macroSugars", cls: "fh-macro-sugars" },
  { label: "macroFiber", cls: "fh-macro-fiber" },
  { label: "macroSalt", cls: "fh-macro-salt" },
];

export const fhDay = ["dayMorning", "dayLunch", "dayDinner", "dayTrend"];

export const fhShots = [
  { src: "/assets/projects-img/freedihare/dashboard.webp", w: 571, h: 773, cap: "pillDashboard" },
  { src: "/assets/projects-img/freedihare/diary.webp", w: 592, h: 853, cap: "pillDiary" },
  { src: "/assets/projects-img/freedihare/profile.webp", w: 571, h: 874, cap: "pillProfile" },
];
