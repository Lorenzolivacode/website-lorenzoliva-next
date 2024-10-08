/* import icoADown from "/assets/nav-icon/icon-arrow-down.png";
import icoAUp from "/assets/nav-icon/icon-arrow-up.png"; */
import { useTranslations } from "next-intl";
import { IObjDoc } from "../../(molecules)/ModalDocs-client/ModalDocs";

interface SectionProps {
  section: string;
  onClick: () => void;
  flagDoc: boolean;
  objDoc: IObjDoc[];
}
export function SectionDocs({
  section,
  onClick,
  flagDoc,
  objDoc,
}: SectionProps) {
  const t = useTranslations("ModalDoc");
  return (
    <section className="flex-column border-b-1-p-m-l p-10px">
      <div className="flex-between gap-10px">
        <p className="f-bold f-size-1 txt-star">
          {t("docsLabel")} {section}
        </p>
        <button
          onClick={onClick}
          className="w-30px h-30px flex-center reset-default"
        >
          <img
            src={
              !flagDoc
                ? "/assets/nav-icon/icon-arrow-down.png"
                : "/assets/nav-icon/icon-arrow-up.png"
            }
            alt={t("altTxtDocsLabel")}
            className="w-70p"
          />
        </button>
      </div>
      {flagDoc &&
        objDoc.map((doc: IObjDoc) => (
          <a
            key={doc.id}
            href={doc.doc}
            download
            className="reset-default txt-star"
          >
            {doc.label()}
          </a>
        ))}
    </section>
  );
}

export default SectionDocs;
