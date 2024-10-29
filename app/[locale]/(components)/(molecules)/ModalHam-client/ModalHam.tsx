"use client";

import SwitchLanguageInline from "../../(atoms)/SwitchLanguageInline-client/SwitchLanguageInline";
import ModalDocs from "../ModalDocs-client/ModalDocs";
import { createPortal } from "react-dom";

import "./ModalHam.css";

function ModalHam({ className }: { className?: string }) {
  return createPortal(
    <>
      <div className="fixed top-0 left-0 min-h-screen modal-ham-w to-backd-blur-4px"></div>
      <div
        className={`${className} ${"fixed appear-to-left overflow-auto top-0 left-0 flex-column gap-30px mt-70px shadow-t-inset-p-medium p-20px min-h-screen modal-ham-w opacity-8 bg-primary-very-light"}`}
      >
        <ModalDocs tipology="list" />
        <div className="p-l-30px">
          <SwitchLanguageInline />
        </div>
      </div>
    </>,
    document.body
  );
}

export default ModalHam;