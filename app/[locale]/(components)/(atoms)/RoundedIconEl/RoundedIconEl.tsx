import React from "react";
import Image from "next/image";
import { Link } from "../../../../../i18n/routing";

interface RoundedElProps {
  isActive: boolean;
  alt: string;
  title: string;
  src: string;
  href?: string;
  onClick?: () => void;
  pointerClass?: boolean;
}
function RoundedIconEl({
  isActive,
  alt,
  title,
  src,
  href,
  onClick,
  pointerClass = true,
}: RoundedElProps) {
  const roundedElClass = `radius-50p flex-center ratio-1 hover-scale-1d1 ${
    pointerClass ? "pointer" : ""
  } ${
    isActive ? " shadow-light-ms bg-radial-p-sat-ml-l" : "bg-primary-medium"
  }`;
  return (
    <div className="flex-column gap-10px p-10px p-x-24px w-100px h-70px">
      {!href ? (
        <div onClick={onClick} title={title} className={roundedElClass}>
          <Image alt={alt} width={30} height={30} src={src} />
        </div>
      ) : (
        <Link title={title} href={href} className={roundedElClass}>
          <Image alt={alt} width={30} height={30} src={src} />
        </Link>
      )}
      <div className=" flex-center radius-5px bg-primary-very-dark-0d6">
        <p className="txt-center">{title}</p>
      </div>
    </div>
  );
}

export default RoundedIconEl;
