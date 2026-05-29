import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// dominio canonico del sito (deciso: lorenzoliva.it)
export const SITE_URL = "https://lorenzoliva.it";
// mappatura locale → og:locale (it_IT / en_GB come deciso)
const OG_LOCALE: Record<string, string> = { it: "it_IT", en: "en_GB" };

// Costruisce i metadata per-locale e per-pagina.
// `path` è il percorso DOPO il locale: "" (home), "/dev", "/art".
// Centralizza title/description/OG/twitter/canonical così ogni pagina espone
// la PROPRIA url (og:url + canonical) senza duplicare la logica.
export async function buildMetadata(
  locale: string,
  path: string = ""
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Seo" });
  const title = t("siteTitle");
  const description = t("siteDescription");
  const url = `${SITE_URL}/${locale}${path}`;
  const ogLocale = OG_LOCALE[locale] ?? "it_IT";
  const alternateLocale = locale === "it" ? "en_GB" : "it_IT";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    icons: { icon: "/LO-img-3.3.png" },
    alternates: {
      canonical: url,
      languages: {
        it: `${SITE_URL}/it${path}`,
        en: `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Lorenzo Oliva",
      title,
      description,
      url,
      locale: ogLocale,
      alternateLocale,
      images: [
        {
          url: "/assets/og-image.png",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-image.png"],
    },
  };
}
