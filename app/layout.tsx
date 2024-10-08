import Head from "next/head";
import React from "react";
import "./[locale]/globals.css";
import "./[locale]/(css-library-utilities)/library-import.css";

export const metadata = {
  title: "Lorenzoliva",
  icons: {
    icon: "/LO-img-3.3.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <>
      {/* <html>
        <Head>
          <link rel="icon" href="" />
          <title>Lorenzo Oliva</title>
        </Head>
        <body> */}
      {children}

      {/* </body>
      </html> */}
    </>
  );
}
