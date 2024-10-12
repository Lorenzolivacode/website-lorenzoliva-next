import React from "react";

interface BlurBLueProps {
  classPosition: string;
  width: string;
  height: string;
}
function BlurBlue({ classPosition, width, height }: BlurBLueProps) {
  return (
    <div
      className={`${classPosition} w-${width}px h-${height}px bg-primary-sat-medium blur-200px z-i--1`}
    >
      <div className="absolute top-50p left-50p w-50p h-50p bg-primary-sat-medium-light blur-5px" />
    </div>
  );
}

export default BlurBlue;
