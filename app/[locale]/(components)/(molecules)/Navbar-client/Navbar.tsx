"use client";

import { Link, usePathname } from "../../../../../i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

import "./Navbar.css";

export function Navbar({ isDirectionY = false }: { isDirectionY?: boolean }) {
  const pathname = usePathname();
  const t = useTranslations("Layout");

  const navSections = [
    {
      name: t("nameCode"),
      path: "/dev",
      icon: "/assets/nav-icon/icon-code.svg",
      id: "s-C",
    },
    {
      name: t("nameHome"),
      path: "/",
      icon: "/assets/nav-icon/icon-home.svg",
      id: "s-H",
    },
    {
      name: t("nameArt"),
      path: "/art",
      icon: "/assets/nav-icon/icon-art.svg",
      id: "s-A",
    },
  ];
  return (
    <nav className={`${isDirectionY ? "nav-y" : "nav-x"}`}>
      <ul
        className={`${
          isDirectionY ? "flex-column border-b-1-p-m-l p-10px" : "flex-center"
        } section-list gap-30px`}
      >
        {navSections.map((section) => {
          const isActive = pathname === section.path;
          return (
            <li
              key={section.id}
              className={`${
                isDirectionY
                  ? "w-50p min-w-150px hover-trx20px-scale105"
                  : "list-item flex-center ratio-1 w-30px"
              }`}
              title={section.name}
            >
              <Link
                href={section.path}
                className={`${
                  isDirectionY ? "flex-reverse" : "flex-column"
                } reset-default flex-between flex-cross-center`}
              >
                <div
                  className={`flex-center ${
                    !isDirectionY && isActive ? "item-active" : ""
                  }`}
                >
                  <Image
                    width={25}
                    height={25}
                    src={section.icon}
                    alt={section.name}
                    /* className={`w-30px `} */
                  />
                </div>
                <p
                  className={`${
                    isDirectionY && isActive ? "border-b-3-p-m-l" : ""
                  } txt-c-primary-dark f-bold txt-center`}
                >
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
