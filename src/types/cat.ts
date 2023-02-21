interface Breed {
  description: string;
}

interface Cat {
  id: string;
  url: string;
  breeds: Breed[];
}

export type { Cat };
