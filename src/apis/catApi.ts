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

const deleteCatFromFavourites = async (favouriteId: string) => {
  try {
    await api.delete(`/favourites/${favouriteId}`);
  } catch (error) {
    console.error(error);
  }
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

const getFavouriteCats = async (): Promise<Cat[]> => {
  let cats: Cat[];

  try {
    const { data }: { data: { id: string; image_id: string; }[] } = await api.get("/favourites");
    const catsWithNulls = await Promise.all(data.map((cat) => getCatById(cat.image_id)));
    const catsWithoutNulls = catsWithNulls.filter(
      (cat): cat is Exclude<typeof cat, null> => cat !== null
    );
    cats = catsWithoutNulls.map((cat) => ({
      ...cat,
      favouriteId: data.find(({ image_id }) => image_id === cat.id )?.id
    }))
  } catch (error) {
    cats = [];
    console.error(error);
  }

  return cats;
};

export {
  getCats,
  useAddCatToFavourites,
  deleteCatFromFavourites,
  getCatById,
  getCatBreeds,
  getCatsByBreedId,
  getFavouriteCats
};
