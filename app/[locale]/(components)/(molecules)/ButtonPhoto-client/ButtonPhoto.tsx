"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

import "./ButtonPhoto.css";
import ModalHello from "../ModalHello-client/ModalHello";

function ButtonPhoto() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("Layout");

  const modalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <button
      className="img-container reset-default pointer"
      onClick={() => setIsModalOpen(true)}
      aria-label={t("photoButtonLabel")}
    >
      {isModalOpen && <ModalHello isOpen={isModalOpen} onClose={modalClose} />}
      <div className="img">
        <Image
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 33vw"
          src="/assets/Lorenzo-Oliva-2.jpg"
          alt="Lorenzo Oliva"
        />
      </div>
    </button>
  );
}

export default ButtonPhoto;
