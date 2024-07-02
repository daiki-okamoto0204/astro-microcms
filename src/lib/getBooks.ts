import { createClient } from "microcms-js-sdk";
import type { MicroCMSDate, MicroCMSQueries } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type Category = {
	id: string;
	name: string;
}& MicroCMSDate

export type Owner = {
	id: string;
	name: string;
}& MicroCMSDate

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

export type BookResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Book[];
};

export const getBooks = async (queries?: MicroCMSQueries) => {
  return await client.get<BookResponse>({ endpoint: "books", queries });
};

export const getBookDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Book>({
    endpoint: "books",
    contentId,
    queries,
  });
};