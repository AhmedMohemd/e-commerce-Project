export interface CategoryData {
  results: number;
  metadata: Metadata;
  data: CategoryItem[];
}

export interface CategoryItem {
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
}
