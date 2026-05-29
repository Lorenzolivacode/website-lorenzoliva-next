"use client";
import React, { useState } from "react";
import Image from "next/image";

import "./ButtonDocs.css";

import ModalDocs from "../ModalDocs-client/ModalDocs";

function ButtonDocs() {
  const [modalOn, setModalOn] = useState(false);

  const handleDocsMenu = () => {
    modalOn ? setModalOn(false) : setModalOn(true);
  };
  return (
    <div className="relative">
      <button
        className={`btn-docs relative ${modalOn ? "btn-modalon" : ""}`}
        onClick={handleDocsMenu}
      >
        <Image
          width={24}
          height={24}
          src={"/assets/nav-icon/icon-docs.png"}
          alt="Documents"
        />
      </button>
      {modalOn && <ModalDocs />}
    </div>
  );
}

export default ButtonDocs;
