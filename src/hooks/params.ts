import { getCatById } from "apis/catApi";
import { useSearchParams } from "react-router-dom";
import { useCatContext } from "context/CatContext";
import { useFetch } from "hooks/fetcher";

const useCatIdParam = () => {
  const [params, setParams] = useSearchParams();
  const { setSelectedCat } = useCatContext();

  useFetch(() => {
    const catId = params.get("catId");
    if (catId) {
      (async () => {
        const cat = await getCatById(catId);
        setSelectedCat(cat);
      })();
    }
  }, [params]);

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
