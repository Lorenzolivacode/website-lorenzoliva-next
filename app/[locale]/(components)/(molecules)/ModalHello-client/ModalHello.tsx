"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";

import "./ModalHello.css";
import "./../../../(css-library-utilities)/library-import.css";
import "./../../../layout.css";
import BtnClose from "../../(atoms)/BtnClose/BtnClose";

interface ModalHelloProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalHello({ isOpen, onClose }: ModalHelloProps) {
  const t = useTranslations("Home");
  const [displayedLetters, setDisplayedLetters] = useState("");
  const modalHelloLabel = t("modalHelloLabel");

  useEffect(() => {
    /* console.log("open"); */

    let currentIndex = 0;

    setDisplayedLetters("");

    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < modalHelloLabel.length) {
          const nextLetter = modalHelloLabel[currentIndex];

          setDisplayedLetters((prev) => prev + nextLetter);
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 100);

      return () => clearInterval(intervalId);
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.key === "Escape" && onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBtnClose = () => {
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="bg-blur-modal fixed backd-blur-5px top-0 w-full h-full bg-primary-very-dark-0d5"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="effect-modal absolute-center shadow-10xy-black8 flex-modal-hello-screen gap-20px main-w-screen radius-8px p-10px p-b-20px bg-secondary-light txt-c-primary-medium"
        >
          <BtnClose onClose={handleBtnClose} className="absolute-tr-10px" />
          <div className="relative w-40p ratio-6-7 shadow-rb-p-light radius-5px border3-p-sat-l">
            <Image
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw"
              src="/assets/img-hello-2.jpg"
              alt="Lorenzo Oliva"
            />
          </div>
          <div className="display-inline flex-center w-full f-size-1d5">
            <p className="txt-center f-bold">
              {displayedLetters.split("").map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default ModalHello;
