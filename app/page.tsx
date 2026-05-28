"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "it";
    router.replace(`/${savedLocale}`);
  }, [router]);

  return null;
}
