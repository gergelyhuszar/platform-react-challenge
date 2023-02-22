import { useEffect, useRef } from "react";

const useFetch = (fetch: () => void, deps: any[] = []) => {
  const isFetching = useRef(false);

  useEffect(() => {
    if (!isFetching.current) {
      fetch();
      isFetching.current = true;
    }
  }, [isFetching, ...deps]);
};

export { useFetch };
