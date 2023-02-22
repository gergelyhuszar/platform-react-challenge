import axios from "axios";
import { Breed, Cat } from "types/cat";
import { useState } from "react";

const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": "live_bmkDVOnAzL5lyaqfJyObwATnKfBPyA3u2k1clOeTENerKpVJPPV6hUQKEvwhDB9l"
  }
});

const getCats = async (): Promise<Cat[]> => {
  let cats: Cat[];

  try {
    const { data } = await api.get("/images/search?limit=10");
    cats = data;
  } catch (error) {
    cats = [];
    console.error(error);
  }

  return cats;
};

const useAddCatToFavourites = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addCatToFavourites = async (catId: string) => {
    try {
      setIsLoading(true);
      await api.post("/favourites", {
        "image_id": catId
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addCatToFavourites,
    isLoading
  };
};


const getCatById = async (catId: string): Promise<Cat | null> => {
  let cat: Cat | null;

  try {
    const { data } = await api.get(`/images/${catId}`);
    cat = data;
  } catch (error) {
    cat = null;
    console.error(error);
  }

  return cat;
};

const getCatBreeds = async (): Promise<Breed[]> => {
  let breeds: Breed[];

  try {
    const { data } = await api.get("/breeds?limit=10");
    breeds = data;
  } catch (error) {
    breeds = [];
    console.error(error);
  }

  return breeds;
};

const getCatsByBreedId = async (breedId: string): Promise<Cat[]> => {
  let cats: Cat[];

  try {
    const queryParams = {
      breed_ids: breedId,
      limit: 10
    }
    const { data } = await api.get("/images/search", { params: queryParams });
    cats = data;
  } catch (error) {
    cats = [];
    console.error(error);
  }

  return cats;
};

export {
  getCats,
  useAddCatToFavourites,
  getCatById,
  getCatBreeds,
  getCatsByBreedId
};
