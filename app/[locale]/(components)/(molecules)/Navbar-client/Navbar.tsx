"use client";

import { Link, usePathname } from "../../../../../i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

import "./Navbar.css";

export function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("Layout");

  const navSections = [
    {
      name: t("nameCode"),
      path: "/dev",
      icon: "/assets/nav-icon/icon-code.png",
      id: "s-C",
    },
    {
      name: t("nameHome"),
      path: "/",
      icon: "/assets/nav-icon/icon-home.png",
      id: "s-H",
    },
    {
      name: t("nameArt"),
      path: "/art",
      icon: "/assets/nav-icon/icon-art.png",
      id: "s-A",
    },
  ];
  return (
    <nav>
      <ul className="section-list flex-center gap-30px">
        {navSections.map((section) => {
          const isActive = pathname === section.path;
          return (
            <li key={section.id} className="list-item" title={section.name}>
              <Link
                href={section.path}
                className={`${isActive ? "item-active" : ""}`}
              >
                <Image
                  width={30}
                  height={30}
                  src={section.icon}
                  alt={section.name}
                  className="w-30px"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default Navbar;
