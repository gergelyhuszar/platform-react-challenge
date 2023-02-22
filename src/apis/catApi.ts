import axios from "axios";
import { Cat } from "types/cat";
import { useEffect, useState } from "react";

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

const useGetCatById = (catId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Cat | null>(null);

  const getCatById = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/images/${catId}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCatById();
  }, []);

  return {
    isLoading,
    data
  };
};

export {
  getCats,
  useAddCatToFavourites,
  useGetCatById
};
