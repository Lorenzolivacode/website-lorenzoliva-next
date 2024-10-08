import React from "react";
import "./Header.css";
import ButtonDocs from "../../(atoms)/ButtonDocs-client/ButtonDocs";
import Navbar from "../../(molecules)/Navbar-client/Navbar";
import SelectLanguage from "../../(atoms)/SelectLanguage-client/SelectLanguage";

function Header() {
  return (
    <header className="flex-around flex-cross-center h-70px p-12px p-fixed-top w-full bg-primary-very-light shadow-light-minus10">
      <ButtonDocs />
      <Navbar />
      <SelectLanguage />
    </header>
  );
}

export default Header;
