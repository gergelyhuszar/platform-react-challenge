import { useEffect } from "react";
import { getCatById } from "apis/catApi";
import { useSearchParams } from "react-router-dom";
import { useCatContext } from "context/CatContext";

const useCatIdParam = () => {
  const [params, setParams] = useSearchParams();
  const { setSelectedCat } = useCatContext();

  useEffect(() => {
    const catId = params.get("catId");
    if (catId) {
      (async () => {
        const cat = await getCatById(catId);
        setSelectedCat(cat);
      })();
    }
  }, []);

  const setCatIdParam = (catId?: string) => {
    if (catId) {
      setParams({ catId: catId });
    } else {
      setParams();
    }
  };

  return {
    setCatIdParam
  };
};

export { useCatIdParam };
