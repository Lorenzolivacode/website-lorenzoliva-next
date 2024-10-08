import React from "react";
import "./BtnClose.css";

interface BtnProps {
  onClose?: () => void;
  widthPx?: number;
  color?: "dark" | "light";
  className?: string;
}
function BtnClose({
  onClose,
  widthPx = 20,
  color = "dark",
  className,
}: BtnProps) {
  const colorX =
    color === "dark" ? "bg-primary-very-dark" : "bg-secondary-light";
  return (
    <button
      className={`btn-close absolute reset-default ratio-1 ${`w-${widthPx}px`} ${
        color === "dark" ? "dark" : "light"
      } flex ${className ? className : ""}`}
      onClick={onClose}
    >
      <span
        className={`${colorX} ${`h-${widthPx}px`}  w-3px display-inline-block radius-3px`}
      />
      <span
        className={`${colorX} ${`h-${widthPx}px`}  w-3px display-inline-block radius-3px`}
      />
    </button>
  );
}

export default BtnClose;
