import React from "react";

function ArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="art-bg min-h-screen-wo-header flex-center">{children}</div>
  );
}

export default ArtLayout;
