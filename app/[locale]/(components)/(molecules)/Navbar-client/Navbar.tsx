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
                className="reset-default flex-column flex-between flex-cross-center"
              >
                <div className={`flex-center ${isActive ? "item-active" : ""}`}>
                  <Image
                    width={25}
                    height={25}
                    src={section.icon}
                    alt={section.name}
                    /* className={`w-30px `} */
                  />
                </div>
                <p className="txt-c-primary-dark f-bold txt-center">
                  {section.name}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default Navbar;
