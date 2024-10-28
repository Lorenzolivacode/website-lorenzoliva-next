import { useTranslations } from "next-intl";
import "./home.css";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import ButtonPhoto from "./(components)/(molecules)/ButtonPhoto-client/ButtonPhoto";

export default function Home() {
  const t = useTranslations("Home");
  const tLay = useTranslations("Layout");

  const classNameBaseBtn = "btn w-full p-12px txt-center txt-decoration-none";
  return (
    <div className="home-main-direction-screen w-full flex-between flex-center gap-80px">
      <div className="img-bg">
        <Image
          fill
          src="/assets/LO-img-3.2.png"
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw"
          alt=""
        />
      </div>
      <ButtonPhoto />
      <div className="text-container flex-column flex-center gap-10px">
        <h1 className="f-bold">{t("myName").toUpperCase()}</h1>
        <h2 className="f-bold">{t("webDev")}</h2>
        <h2 className="f-bold">{t("artist")}</h2>
        <p className="f-size-1d5 w-full">{t("presentationTxt1")}</p>
        <p className="f-size-1d5 w-full">{t("presentationTxt2")}</p>
        <div className="w-full flex mt-30px btn-container">
          <Link href={"/dev"} className={`${classNameBaseBtn} radius-btn-code`}>
            {tLay("nameCode")}
          </Link>
          <Link href={"/art"} className={`${classNameBaseBtn} radius-btn-art`}>
            {tLay("nameArt")}
          </Link>
        </div>
      </div>
    </div>
  );
}
