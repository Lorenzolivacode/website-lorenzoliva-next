// Button-link verso una risorsa esterna (GitHub/live) con stato "disabilitato".
// Fonte unica del pattern prima duplicato 3 volte (PortfolioList ×2, dev/page "Questo sito").
// Link esterno → <a> nativo (non Link i18n). Riceve testi già tradotti via props.
// `enabled` = href valorizzato (>= 2 caratteri); se assente il button è inerte e non focusabile.
interface ProjectLinkButtonProps {
  href: string;
  label: string;
  title: string;
  iconClass: string; // classe dell'icona-immagine (es. "img-git-30", "img-link-30")
}

function ProjectLinkButton({
  href,
  label,
  title,
  iconClass,
}: ProjectLinkButtonProps) {
  const enabled = href.length >= 2;
  return (
    <a
      href={enabled ? href : "#"}
      target={enabled ? "_blank" : "_self"}
      rel="noopener noreferrer"
      title={title}
      aria-disabled={enabled ? undefined : true}
      tabIndex={enabled ? undefined : -1}
      className={`${
        enabled ? "" : "opacity-4 pointer-events-none"
      } btn change-img-link p-4px radius-8px f-size-0d95-1d05 txt-decoration-none txt-c-inherit p-l-20px flex-cross-center gap-10px`}
    >
      <div className={`${iconClass} w-30px ratio-1`} />
      {label}
    </a>
  );
}

export default ProjectLinkButton;
