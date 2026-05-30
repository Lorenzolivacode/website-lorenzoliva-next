"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Modale base riusabile: incapsula createPortal, overlay, focus-trap,
// chiusura con Esc/overlay e ripristino del focus. È behavior-only: lo stile
// di overlay e dialog arriva dal consumer via props (overlayClassName/className),
// così ogni variante (lightbox, centrata, laterale) resta libera nel suo CSS.
// Le singole modali del progetto possono migrare qui in modo retroattivo.
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  // dove montare il portal: il body (default) oppure l'<header> (es. menu mobile)
  portalTarget?: "body" | "header";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  ariaLabel?: string;
  // classi dello strato overlay (sfondo) e del dialog (contenitore)
  overlayClassName?: string;
  className?: string;
}

function Modal({
  onClose,
  children,
  portalTarget = "body",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  ariaLabel,
  overlayClassName = "",
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // chiusura con Esc (opzionale)
  useEffect(() => {
    if (!closeOnEsc) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, onClose]);

  // focus trap: porto il focus nel dialog, intrappolo il Tab, lo ripristino alla chiusura
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const getFocusable = () =>
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

    // focus iniziale sul contenitore (pattern dialog: non sul primo bottone)
    dialog.focus();

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", handleTab);
    return () => {
      dialog.removeEventListener("keydown", handleTab);
      previouslyFocused?.focus();
    };
  }, []);

  // risolvo il target del portal lato client (qui document esiste: monta solo da aperta)
  const target =
    portalTarget === "header"
      ? document.body.querySelector("header")
      : document.body;
  if (!target) return null;

  return createPortal(
    <div
      className={overlayClassName}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
        className={className}
      >
        {children}
      </div>
    </div>,
    target
  );
}

export default Modal;
