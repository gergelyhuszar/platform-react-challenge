import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import { Cat } from "types/cat";

interface CatContextValue {
  selectedCat: Cat | null;
  setSelectedCat: (cat: Cat | null) => void;
  selectedBreedCats: Cat[];
  setSelectedBreedCats: (catList: Cat[]) => void;
}

const CatContext = createContext<CatContextValue>(null!);
const useCatContext = () => useContext(CatContext);

const CatContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [selectedBreedCats, setSelectedBreedCats] = useState<Cat[]>([]);

  return (
    <CatContext.Provider
      value={{
        selectedCat,
        setSelectedCat,
        selectedBreedCats,
        setSelectedBreedCats
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export default CatContextProvider;
export { useCatContext };
