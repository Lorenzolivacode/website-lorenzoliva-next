"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import "./ArtworkModal.css";
import Modal from "../Modal-client/Modal";
import BtnClose from "../../(atoms)/BtnClose/BtnClose";
import { IArtwork } from "../../../Interface/IArtwork";

interface ArtworkModalProps {
  artworks: IArtwork[];
  index: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

// quante anteprime mostrare per "pagina" della striscia (no scroll: si pagina con frecce)
const STRIP_PAGE = 7;

// Lightbox dell'opera: usa la modale base (Modal) per portal/overlay/focus-trap/Esc
// e aggiunge ciò che è suo — layout museale a due colonne (opera + dettagli),
// frecce prev/next, contatore, descrizione con scroll, striscia anteprime paginata.
function ArtworkModal({
  artworks,
  index,
  onSelect,
  onClose,
  onPrev,
  onNext,
}: ArtworkModalProps) {
  const t = useTranslations("ArtSection");
  const locale = useLocale();
  const isItalian = locale === "it";

  const total = artworks.length;
  const artwork = artworks[index];
  const technique = isItalian
    ? artwork.technique.italian
    : artwork.technique.english;
  const description = isItalian
    ? artwork.description.italian
    : artwork.description.english;
  const hasDescription = description.trim().length > 0;

  // pagina corrente della striscia anteprime (no scroll orizzontale: si pagina)
  const pageCount = Math.ceil(total / STRIP_PAGE);
  const [stripPage, setStripPage] = useState(0);

  // accordion descrizione: rilevante solo su mobile (su desktop il CSS la mostra
  // sempre). Parte chiusa; si riapre richiusa quando cambio opera.
  const [descOpen, setDescOpen] = useState(false);

  // seconda modale: opera sola a schermo intero, sopra la lightbox
  const [fullscreen, setFullscreen] = useState(false);

  // tengo l'opera corrente visibile nella striscia quando cambio con le frecce
  useEffect(() => {
    setStripPage(Math.floor(index / STRIP_PAGE));
    setDescOpen(false);
  }, [index]);

  const stripStart = stripPage * STRIP_PAGE;
  const stripItems = artworks.slice(stripStart, stripStart + STRIP_PAGE);

  // tastiera propria della lightbox: frecce per navigare fra le opere
  // (Esc e focus-trap sono gestiti dalla modale base)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onPrev();
      else if (event.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  return (
    <Modal
      onClose={onClose}
      ariaLabel={artwork.title}
      // quando il fullscreen è aperto, l'Esc deve chiudere PRIMA quello: qui lo disattivo
      closeOnEsc={!fullscreen}
      overlayClassName="artwork-modal-overlay fixed top-0 left-0 w-full h-full flex-center"
      className="artwork-modal relative flex-column gap-20px radius-8px p-20px txt-c-secondary-light"
    >
      <BtnClose onClose={onClose} color="light" className="artwork-modal-close" />

      {/* corpo a due colonne su desktop: a sx l'opera, a dx i dettagli */}
      <div className="artwork-modal-body">
        {/* colonna opera: immagine "incorniciata" + frecce + contatore */}
        <div className="artwork-stage relative flex-center">
          <button
            type="button"
            aria-label={t("prevLabel")}
            onClick={onPrev}
            className="artwork-nav-btn artwork-nav-prev reset-default pointer flex-center"
          >
            <span aria-hidden="true">&#8249;</span>
          </button>

          <div className="artwork-frame relative flex">
            <Image
              key={artwork.id}
              src={artwork.full}
              width={artwork.width}
              height={artwork.height}
              sizes="(max-width: 768px) 90vw, 50vw"
              alt={artwork.title}
              className="artwork-modal-img"
            />
            {/* solo l'occhio è cliccabile: apre la vista a schermo intero */}
            <button
              type="button"
              aria-label={t("viewFullscreenLabel")}
              title={t("viewFullscreenLabel")}
              onClick={() => setFullscreen(true)}
              className="artwork-zoom-hint reset-default pointer flex-center"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <span className="artwork-counter">
              {index + 1} / {total}
            </span>
          </div>

          <button
            type="button"
            aria-label={t("nextLabel")}
            onClick={onNext}
            className="artwork-nav-btn artwork-nav-next reset-default pointer flex-center"
          >
            <span aria-hidden="true">&#8250;</span>
          </button>
        </div>

        {/* colonna dettagli */}
        <div className="artwork-meta flex-column gap-15px">
          <h3 className="artwork-title f-bold">{artwork.title}</h3>
          <ul className="artwork-pills flex-wrap gap-10px">
            <li className="artwork-pill">{technique}</li>
            <li className="artwork-pill">{artwork.year}</li>
            <li className="artwork-pill">{artwork.dimensions}</li>
          </ul>

          {hasDescription && (
            <div className="artwork-desc flex-column gap-10px">
              {/* toggle: su desktop è solo un titolo (icona nascosta, sempre
                  aperta via CSS); su mobile funge da accordion */}
              <button
                type="button"
                aria-expanded={descOpen}
                onClick={() => setDescOpen((prev) => !prev)}
                className="artwork-desc-toggle reset-default flex-between gap-10px w-full f-bold"
              >
                <span>{t("descriptionLabel")}</span>
                <span aria-hidden="true" className="artwork-desc-icon">
                  {descOpen ? "−" : "+"}
                </span>
              </button>
              {/* desktop: il box riempie l'altezza e scrolla internamente solo se
                  lungo. mobile: nascosto finché chiuso; aperto va a flusso naturale */}
              <div
                className={`artwork-desc-scroll relative ${
                  descOpen ? "artwork-desc-open" : ""
                }`}
              >
                <p className="artwork-desc-body">{description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* striscia di anteprime paginata (niente scroll: si naviga con le frecce) */}
      <div className="artwork-strip-wrap flex-cross-center gap-10px">
        <button
          type="button"
          aria-label={t("stripPrevLabel")}
          onClick={() => setStripPage((p) => Math.max(0, p - 1))}
          disabled={stripPage === 0}
          className="artwork-strip-nav reset-default pointer flex-center"
        >
          <span aria-hidden="true">&#8249;</span>
        </button>

        <ul className="artwork-strip flex gap-10px">
          {stripItems.map((a) => {
            const realIndex = artworks.indexOf(a);
            return (
              <li key={a.id}>
                <button
                  type="button"
                  aria-label={`${t("openArtworkLabel")} ${a.title}`}
                  aria-current={realIndex === index ? "true" : undefined}
                  onClick={() => onSelect(realIndex)}
                  className={`artwork-strip-item reset-default pointer relative ${
                    realIndex === index ? "artwork-strip-item-active" : ""
                  }`}
                >
                  <Image
                    fill
                    sizes="64px"
                    src={a.thumb}
                    alt={a.title}
                    className="artwork-strip-img"
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label={t("stripNextLabel")}
          onClick={() => setStripPage((p) => Math.min(pageCount - 1, p + 1))}
          disabled={stripPage >= pageCount - 1}
          className="artwork-strip-nav reset-default pointer flex-center"
        >
          <span aria-hidden="true">&#8250;</span>
        </button>
      </div>

      {/* seconda modale: opera sola a schermo intero, sopra la lightbox */}
      {fullscreen && (
        <Modal
          onClose={() => setFullscreen(false)}
          ariaLabel={artwork.title}
          overlayClassName="artwork-fs-overlay fixed top-0 left-0 w-full h-full flex-center"
          className="artwork-fs relative flex-center"
        >
          <BtnClose
            onClose={() => setFullscreen(false)}
            color="light"
            className="artwork-fs-close"
          />
          <Image
            src={artwork.full}
            width={artwork.width}
            height={artwork.height}
            sizes="100vw"
            alt={artwork.title}
            className="artwork-fs-img"
          />
        </Modal>
      )}
    </Modal>
  );
}

export default ArtworkModal;
