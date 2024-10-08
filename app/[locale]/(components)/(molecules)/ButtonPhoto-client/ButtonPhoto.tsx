"use client";

import Image from "next/image";
import React, { useState } from "react";

import "./ButtonPhoto.css";
import ModalHello from "../ModalHello-client/ModalHello";

function ButtonPhoto() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="img-container" onClick={() => setIsModalOpen(true)}>
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
    </div>
  );
}

export default ButtonPhoto;
