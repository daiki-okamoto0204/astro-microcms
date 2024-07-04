import type { Category } from "./Category";
import type { Owner } from "./Owner";

export type Image = {
  url: string;
  height: number;
  width: number;
}

export type Book = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  image: Image;
  categories: Category[];
  owner: Owner;
};