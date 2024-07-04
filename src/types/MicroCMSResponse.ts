import type { Book } from "./Book";

export type BookResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Book[];
};