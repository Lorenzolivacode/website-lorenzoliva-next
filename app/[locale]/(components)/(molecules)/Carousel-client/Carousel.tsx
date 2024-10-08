"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import React from "react";

// Definiamo il tipo per i figli che riceveranno la prop "language"
interface ChildProps {
  language: string;
}

function Carousel({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={carouselRef} className="carousel">
      <h2>{locale}</h2>
      {React.Children.map(children, (child) => {
        // Controlla se il child è un elemento React valido
        if (React.isValidElement<ChildProps>(child)) {
          // Clona l'elemento e passa il locale come language
          return React.cloneElement(child, { language: locale });
        }
        return child;
      })}
    </div>
  );
}

export default Carousel;
