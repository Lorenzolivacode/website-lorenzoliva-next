import React from "react";
import "./[locale]/globals.css";
import "./[locale]/(css-library-utilities)/library-import.css";

// Root layout minimale: i metadata (per-locale) e <html>/<body> vivono in
// app/[locale]/layout.tsx, unica fonte di verità.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
