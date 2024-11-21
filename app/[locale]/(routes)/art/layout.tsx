import React from "react";

function ArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="art-bg min-h-screen p-t-70px flex-center">{children}</div>
  );
}

export default ArtLayout;
