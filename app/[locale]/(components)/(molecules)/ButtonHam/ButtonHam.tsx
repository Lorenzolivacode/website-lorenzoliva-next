"use client";
import React, { useEffect, useState } from "react";

import "./ButtonHam.css";

import ModalHam from "../ModalHam-client/ModalHam";
import { usePathname } from "next/navigation";

function ButtonDocs() {
  const [hambActive, setHambActive] = useState(false);
  const [modalOn, setModalOn] = useState(false);

  const pathname = usePathname();

  const handleDocsMenu = () => {
    setHambActive(!hambActive);
    modalOn
      ? setTimeout(() => {
          setModalOn(false);
        }, 400)
      : setModalOn(true);
  };

  useEffect(() => {
    if (modalOn) handleDocsMenu();
  }, [pathname]);

  return (
    <>
      <button
        className={`btn-hamb hamburgher relative ${
          hambActive ? "ham-modalon" : ""
        }`}
        onClick={handleDocsMenu}
      >
        <div />
        <div />
        <div />
      </button>
      {modalOn && <ModalHam className={!hambActive ? "delete-up" : ""} />}
    </>
  );
}

export default ButtonDocs;
