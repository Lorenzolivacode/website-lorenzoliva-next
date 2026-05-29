import React from "react";

function ArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="art-bg art-clearance min-h-screen flex-center">{children}</div>
  );
}

export default ArtLayout;
