import React from "react";
import "./Header.css";
import ButtonDocs from "../../(molecules)/ButtonDocs-client/ButtonDocs";
import Navbar from "../../(molecules)/Navbar-client/Navbar";
import SelectLanguage from "../../(atoms)/SelectLanguage-client/SelectLanguage";
import SwitchLanguageInline from "../../(atoms)/SwitchLanguageInline-client/SwitchLanguageInline";
import ModalHam from "../../(molecules)/ModalHam-client/ModalHam";
import ButtonHam from "../../(molecules)/ButtonHam/ButtonHam";

function Header() {
  return (
    <header className="flex-around flex-cross-center h-70px p-12px p-fixed-top w-full bg-primary-very-light shadow-light-minus10">
      <ButtonHam></ButtonHam>
      {/* <ButtonDocs /> */}
      <Navbar />
      {/* <SwitchLanguageInline /> */}
      {/* <SelectLanguage /> */}
    </header>
  );
}

export default Header;
