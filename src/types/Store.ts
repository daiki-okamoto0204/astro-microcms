import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';
import type { Prefectures } from "./Prefectures";
import type { StoreCategories } from "./StoreCategories";

export type Store = {
  id: string;
  name: string
  tel: string
  prefecture: Prefectures
  address: string
  lat: number
  lng: number
  categories: StoreCategories[]
  image?: MicroCMSImage
  content: string
} & MicroCMSDate