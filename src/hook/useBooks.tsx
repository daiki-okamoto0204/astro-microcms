import { useState, useEffect } from "react";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSDate } from "microcms-js-sdk";

// TODO:/types/以下に型情報はまとめる。普通に汚い
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

// Book の state と更新ロジックを持つフック
const useBooks = (keyword: string | null) => {
  const [books, setBooks] = useState<Book[]>([]);

  // このカスタムフックを利用しているコンポーネントがマウントされたら書籍を取得する。
  useEffect(() => {
    console.log("search keyword: %s", keyword);

    const fetchAll = async () => {
      // この関数内でクライアントを作成しないとエラーになる。CSRでページを作る影響？
      const client = createClient({
        serviceDomain: 'nuxt3-bridge-sample',
        apiKey: 'yG2jv5A7f4mB9RxnpuKUNhJH11DeJXOKCPkU',
      });
      // コンテンツに対して全文検索を行う
      // https://document.microcms.io/content-api/get-list-contents#ha8abec0b2f
      const { contents: data } = await client.get<BookResponse>({ endpoint: "books", queries: { fields: ["id", "title", "image"], q: keyword } });
      console.log(keyword, data);
      setBooks(data);
    };

    fetchAll();
  }, [keyword]);

  return { books };
};

export default useBooks;