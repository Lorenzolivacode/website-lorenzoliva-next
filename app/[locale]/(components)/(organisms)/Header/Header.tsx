import React from "react";
import "./Header.css";
import Navbar from "../../(molecules)/Navbar-client/Navbar";
import ButtonHam from "../../(molecules)/ButtonHam/ButtonHam";
import NavbarDev from "../../(molecules)/NavbarDev-client/NavbarDev";

function Header() {
  return (
    <div className="p-fixed-top flex flex-cross-center w-full z-i-110">
      <header className="flex-cross-center radius-20px-1s4-3 h-70px p-x-20px p-y-10px grow-1 bg-primary-very-light shadow-light-minus10">
        <ButtonHam />
        <Navbar />
      </header>
      <NavbarDev />
    </div>
  );
}

export default Header;
