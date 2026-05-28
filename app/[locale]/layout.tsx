import "./globals.css";
import "./layout.css";
import "./(css-library-utilities)/library-import.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import Header from "./(components)/(organisms)/Header/Header";
import Footer from "./(components)/(organisms)/Footer/Footer";
import { routing } from "../../i18n/routing";

export const metadata = {
  title: "Lorenzoliva",
  icons: {
    icon: "/LO-img-3.3.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="main-w-screen min-h-screen flex-center m-auto p-t-110px p-b-20px">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
