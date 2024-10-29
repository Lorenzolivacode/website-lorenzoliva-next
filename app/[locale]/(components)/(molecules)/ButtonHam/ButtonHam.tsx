"use client";
import React, { useState } from "react";

import "./ButtonHam.css";

import ModalHam from "../ModalHam-client/ModalHam";

function ButtonDocs() {
  const [hambActive, setHambActive] = useState(false);
  const [modalOn, setModalOn] = useState(false);

  const handleDocsMenu = () => {
    hambActive ? setHambActive(false) : setHambActive(true);
    modalOn
      ? setTimeout(() => {
          setModalOn(false);
        }, 400)
      : setModalOn(true);
  };
  return (
    <>
      <button
        className={`btn-hamb hamburgher relative ${
          hambActive ? "ham-modalon" : ""
        }`}
        onClick={handleDocsMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      {modalOn && <ModalHam className={!hambActive ? "delete-up" : ""} />}
    </>
  );
}

export default ButtonDocs;
