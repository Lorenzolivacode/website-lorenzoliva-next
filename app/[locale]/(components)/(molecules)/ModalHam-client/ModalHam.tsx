"use client";

import { useEffect, useRef } from "react";
import SwitchLanguageInline from "../../(atoms)/SwitchLanguageInline-client/SwitchLanguageInline";
import ModalDocs from "../ModalDocs-client/ModalDocs";
import { createPortal } from "react-dom";

import "./ModalHam.css";
import Navbar from "../Navbar-client/Navbar";

function ModalHam({ className }: { className?: string }) {
  const header = document.body.querySelector("header");
  const panelRef = useRef<HTMLDivElement>(null);

  // focus trap: porto il focus nel pannello, intrappolo il Tab, lo ripristino alla chiusura
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

    // focus iniziale sul contenitore (pattern dialog: non mette l'anello gold su un link del menu)
    panel.focus();

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", handleTab);
    return () => {
      panel.removeEventListener("keydown", handleTab);
      previouslyFocused?.focus();
    };
  }, []);

  return createPortal(
    <>
      <div className="fixed top-0 left-0 min-h-screen modal-ham-w to-backd-blur-4px z-i--1"></div>
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`${className} ${"modal-ham-panel fixed appear-to-left overflow-auto top-0 left-0 flex-column gap-30px shadow-t-inset-p-medium p-20px min-h-screen modal-ham-w opacity-8 bg-primary-very-light z-i--1"}`}
      >
        <Navbar isDirectionY={true} />
        <ModalDocs typology="list" />
        <div className="p-l-30px">
          <SwitchLanguageInline />
        </div>
      </div>
    </>,
    header
  );
}

export default ModalHam;
