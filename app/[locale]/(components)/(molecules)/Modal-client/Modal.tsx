"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// durata dell'animazione di uscita (deve combaciare con i keyframes *-out del CSS)
const EXIT_MS = 450;

// API passata ai figli quando `children` è una funzione: permette di chiudere
// la modale con l'animazione di uscita (es. dal bottone X) invece di smontarla secca.
export interface ModalApi {
  requestClose: () => void;
}

// Modale base riusabile: incapsula createPortal, overlay, focus-trap, chiusura
// con Esc/overlay, ripristino del focus e animazione di entrata/uscita.
// È behavior-only: lo stile di overlay e dialog arriva dal consumer via props.
// Lo stato di chiusura è esposto col data-attribute `data-closing` su overlay e
// dialog → il CSS del consumer ci attacca i keyframes di uscita.
interface ModalProps {
  onClose: () => void;
  // ReactNode classico, oppure una funzione che riceve { requestClose }
  children: React.ReactNode | ((api: ModalApi) => React.ReactNode);
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
  const [closing, setClosing] = useState(false);
  const closingRef = useRef(false);

  // avvia la fase di uscita (anima) e propaga onClose a fine animazione.
  // protetto contro doppie chiamate (overlay + Esc + X insieme).
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    window.setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  // chiusura con Esc (opzionale)
  useEffect(() => {
    if (!closeOnEsc) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, requestClose]);

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

  const content =
    typeof children === "function" ? children({ requestClose }) : children;

  return createPortal(
    <div
      className={overlayClassName}
      data-closing={closing || undefined}
      onClick={closeOnOverlayClick ? requestClose : undefined}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        data-closing={closing || undefined}
        onClick={(e) => e.stopPropagation()}
        className={className}
      >
        {content}
      </div>
    </div>,
    target
  );
}

export default Modal;
