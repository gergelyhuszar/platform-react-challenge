interface Breed {
  id: string;
  description: string;
  image?: Cat;
}

interface Cat {
  id: string;
  url: string;
  height: number;
  width: number;
  breeds?: Breed[];
}

export type { Cat, Breed };
