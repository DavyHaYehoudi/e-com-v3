export type VisualPage = "homePage" | "createrPage"; // extensible si besoin

export interface VisualImages {
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
}

export interface VisualDBType {
  _id: string; // ID Mongo
  page: VisualPage;
  images: VisualImages;
  createdAt: string; // ISO string
  updatedAt: string;
  __v: number;
}
