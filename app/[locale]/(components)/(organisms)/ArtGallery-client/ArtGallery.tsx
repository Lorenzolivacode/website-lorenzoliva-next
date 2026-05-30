"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import "./ArtGallery.css";
import ArtworkModal from "../../(molecules)/ArtworkModal-client/ArtworkModal";
import { IArtwork } from "../../../Interface/IArtwork";

// Griglia delle opere su sfondo chiaro; al click apre la lightbox (ArtworkModal)
// con navigazione circolare fra le opere. Riceve i dati via props.
function ArtGallery({ artworks }: { artworks: IArtwork[] }) {
  const t = useTranslations("ArtSection");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const total = artworks.length;
  const handlePrev = () =>
    setOpenIndex((i) => (i === null ? i : (i - 1 + total) % total));
  const handleNext = () =>
    setOpenIndex((i) => (i === null ? i : (i + 1) % total));

  // reveal progressivo delle celle quando entrano nel viewport (micro-interazione).
  // Se IntersectionObserver non c'è (o reduce-motion), le celle restano visibili.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cells = Array.from(
      list.querySelectorAll<HTMLElement>(".art-gallery-cell")
    );
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      cells.forEach((c) => c.classList.add("art-gallery-cell-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("art-gallery-cell-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    cells.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ul ref={listRef} className="art-gallery">
        {artworks.map((artwork, index) => (
          <li key={artwork.id} className="art-gallery-cell">
            <button
              type="button"
              aria-label={`${t("openArtworkLabel")} ${artwork.title}`}
              onClick={() => setOpenIndex(index)}
              className="art-gallery-item reset-default pointer relative"
            >
              <Image
                fill
                sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 220px"
                src={artwork.thumb}
                alt={artwork.title}
                className="art-gallery-img"
              />
              <span className="art-gallery-caption flex-center txt-center">
                {artwork.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <ArtworkModal
          artworks={artworks}
          index={openIndex}
          onSelect={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}

export default ArtGallery;
