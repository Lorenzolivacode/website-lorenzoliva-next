import React from "react";

function SubtitlePortfolio({ label }: { label: string }) {
  return (
    <h2 className="txt-start w-full border-b-1-s-l radius-10px-1s4-3">
      {label}
    </h2>
  );
}

export default SubtitlePortfolio;
