export type Product = {
  readonly id: string;
  readonly name: string;
  readonly brand: string;
  readonly category: string;
  description: string;
  specs: {
    display: string;
    processor: string;
    storage: string;
    battery: string;
    connectivity: string[];
  };
  images: string[];
  price: {
    base: number;
    discount?: number;
  };
  readonly releaseDate: string;
  stock: number;
  rating: number;
  reviews: {
    readonly user: string;
    readonly comment: string;
    readonly rating: number;
    readonly date: string;
  }[];
};
