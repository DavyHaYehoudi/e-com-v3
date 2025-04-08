export type VisualPage = "homePage" | "createrPage"; // extensible si besoin

export interface VisualImages {
  visual1: string | null;
  visual2: string | null;
  visual3: string | null;
  visual4: string | null;
}

export interface VisualDBType {
  _id: string; // ID Mongo
  page: VisualPage;
  images: VisualImages;
  createdAt: string; // ISO string
  updatedAt: string;
  __v: number;
}
