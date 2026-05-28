import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !routing.locales.includes(locale as "en" | "it")) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
