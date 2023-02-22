import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import { Cat } from "types/cat";

interface CatContextValue {
  selectedCat: Cat | null;
  setSelectedCat: (cat: Cat | null) => void;
}

const CatContext = createContext<CatContextValue>(null!);
const useCatContext = () => useContext(CatContext);

const CatContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  return (
    <CatContext.Provider
      value={{
        selectedCat,
        setSelectedCat
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export default CatContextProvider;
export { useCatContext };
