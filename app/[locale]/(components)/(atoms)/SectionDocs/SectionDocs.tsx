import { useTranslations } from "next-intl";
import { IObjDoc } from "../../(molecules)/ModalDocs-client/ModalDocs";
import Image from "next/image";

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
      <div className="flex-between gap-10px flex-cross-center">
        <p className="f-bold f-size-1 txt-star">
          {t("docsLabel")} {section}
        </p>
        <button
          onClick={onClick}
          className="w-20px h-20px relative flex-center reset-default"
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw"
            src={
              !flagDoc
                ? "/assets/nav-icon/icon-arrow-down.png"
                : "/assets/nav-icon/icon-arrow-up.png"
            }
            alt={t("altTxtDocsLabel")}
          />
        </button>
      </div>
      {flagDoc &&
        objDoc.map((doc: IObjDoc) => (
          <a
            key={doc.id}
            href={doc.doc}
            download
            className="reset-default txt-star p-l-20px"
          >
            {doc.label()}
          </a>
        ))}
    </section>
  );
}

export default SectionDocs;
