import axios from "axios";
import { Cat } from "types/cat";

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

export { getCats };
