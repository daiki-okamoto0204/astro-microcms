import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { Book } from "../types/Book";
import type { BookResponse } from "../types/MicroCMSResponse";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

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