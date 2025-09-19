export interface BrandesData {
  results: number;
  metadata: Metadata;
  data: Brandes[];
}

export interface Brandes {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
