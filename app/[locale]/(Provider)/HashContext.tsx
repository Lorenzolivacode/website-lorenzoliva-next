import React, { createContext, useContext, useState } from "react";

const HashContext = createContext({
  currentHash: "",
  setCurrentHash: (hash: string) => {},
});
function HashProvider({ children }) {
  const [currentHash, setCurrentHash] = useState("");
  return (
    <HashContext.Provider value={{ currentHash, setCurrentHash }}>
      {children}
    </HashContext.Provider>
  );
}

export const useHash = () => useContext(HashContext);

export default HashProvider;
