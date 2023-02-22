import {getCatById, getCatsByBreedId} from "apis/catApi";
import { useSearchParams } from "react-router-dom";
import { useCatContext } from "context/CatContext";
import { useFetch } from "hooks/fetcher";

const useCatIdParam = () => {
  const [params, setParams] = useSearchParams();
  const { setSelectedCat } = useCatContext();
  const paramName = "catId";

  const { refetch } = useFetch(() => {
    const catId = params.get(paramName);
    if (catId) {
      (async () => {
        const cat = await getCatById(catId);
        setSelectedCat(cat);
      })();
    }
  });

  const setCatIdParam = (catId?: string) => {
    if (catId) {
      params.set(paramName, catId);
      setParams(params.toString());
      refetch();
    } else {
      params.delete(paramName);
      setParams(params.toString());
      setSelectedCat(null);
    }
  };

  return {
    setCatIdParam
  };
};

const useBreedIdParam = () => {
  const [params, setParams] = useSearchParams();
  const { setSelectedBreedCats } = useCatContext();
  const paramName = "breedId";

  const { refetch } = useFetch(() => {
    const breedId = params.get(paramName);
    if (breedId) {
      (async () => {
        const cats = await getCatsByBreedId(breedId);
        setSelectedBreedCats(cats);
      })();
    }
  });

  const setBreedIdParam = (breedId?: string) => {
    if (breedId) {
      params.set(paramName, breedId);
      setParams(params.toString());
      refetch();
    } else {
      params.delete(paramName);
      setParams(params.toString());
      setSelectedBreedCats([]);
    }
  };

  return {
    setBreedIdParam
  };
};

export { useCatIdParam, useBreedIdParam };
