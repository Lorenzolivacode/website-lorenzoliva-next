import "./globals.css";
import "./layout.css";
import "./(css-library-utilities)/library-import.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
/* import { unstable_setRequestLocale } from "next-intl/server"; */
import Header from "./(components)/(organisms)/Header/Header";
import Footer from "./(components)/(organisms)/Footer/Footer";

export const metadata = {
  title: "Lorenzoliva",
  icons: {
    icon: "/LO-img-3.3.png",
  },
};
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  console.log("Current locale:", locale);
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
