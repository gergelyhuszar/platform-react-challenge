interface Breed {
  id: string;
  description: string;
}

interface Cat {
  id: string;
  url: string;
  breeds: Breed[];
  height: number;
  width: number;
}

export type { Cat };
