import React, { FC } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RandomCats from "./pages/RandomCats";
import CatBreeds from "./pages/CatBreeds";
import FavouriteCats from "./pages/FavouriteCats";
import Bootstrapper from "components/Bootstrapper/Bootstrapper";

const App: FC = () => {
  return (
    <Bootstrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RandomCats />} />
          <Route path="/cat-breeds" element={<CatBreeds />} />
          <Route path="/favourite-cats" element={<FavouriteCats />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Bootstrapper>
  );
}

export default App;
