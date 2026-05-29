import "./globals.css";
import "./layout.css";
import "./(css-library-utilities)/library-import.css";

import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import Header from "./(components)/(organisms)/Header/Header";
import Footer from "./(components)/(organisms)/Footer/Footer";
import { routing } from "../../i18n/routing";
import { socialNetwork } from "./(data)/socialNetwork";
import { links } from "./(data)/portfolioProjects";
import { buildMetadata, SITE_URL } from "./seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// metadata per-locale della home (le sottopagine usano buildMetadata con il proprio path)
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return buildMetadata(locale, "");
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: "Seo" });

  // structured data (Person + WebSite) per i rich snippet Google.
  // sameAs raccoglie i profili esterni già presenti nei dati (no duplicazione)
  const sameAs = [
    ...links.map((l) => l.url),
    ...socialNetwork.map((s) => s.url),
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Lorenzo Oliva",
        url: SITE_URL,
        image: `${SITE_URL}/assets/og-image.png`,
        jobTitle:
          locale === "it"
            ? "Web Developer Full Stack"
            : "Full Stack Web Developer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Palermo",
          addressCountry: "IT",
        },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Lorenzo Oliva",
        description: t("siteDescription"),
        inLanguage: locale === "it" ? "it-IT" : "en-GB",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <html lang={locale}>
      <body>
        {/* JSON-LD: iniettato come script statico, valido per static export */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="main-w-screen min-h-screen flex-center m-auto p-b-20px">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
