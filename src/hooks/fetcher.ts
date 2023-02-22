import { useEffect, useRef, useState } from "react";

const useFetch = (fetch: () => void) => {
  const isFetching = useRef(false);
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(true);

  useEffect(() => {
    if (!isFetching.current && refetchTrigger) {
      fetch();
      isFetching.current = true;
      setRefetchTrigger(false);
    }
  }, [isFetching, refetchTrigger, fetch]);

  const refetch = () => {
    isFetching.current = false;
    setRefetchTrigger(true);
  }

  return {
    refetch
  }
};

export { useFetch };
