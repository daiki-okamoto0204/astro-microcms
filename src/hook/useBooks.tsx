import { useState, useEffect } from "react";
import { createClient } from "microcms-js-sdk";
import type { Book } from "../types/Book";
import type { MicroCMSResponse } from "../types/MicroCMSResponse";

// Book の state と更新ロジックを持つフック
const useBooks = (keyword: string | null) => {
  const [books, setBooks] = useState<Book[]>([]);

  // このカスタムフックを利用しているコンポーネントがマウントされたら書籍を取得する。
  useEffect(() => {
    console.log("search keyword: %s", keyword);

    const fetchAll = async () => {
      const client = createClient({
        serviceDomain: import.meta.env.PUBLIC_MICROCMS_SERVICE_DOMAIN,
        apiKey: import.meta.env.PUBLIC_MICROCMS_API_KEY,
      });
      // コンテンツに対して全文検索を行う
      // https://document.microcms.io/content-api/get-list-contents#ha8abec0b2f
      const { contents: data } = await client.get<MicroCMSResponse<Book>>({ endpoint: "books", queries: { fields: ["id", "title", "image"], q: keyword } });
      console.log(keyword, data);
      setBooks(data);
    };

    fetchAll();
  }, [keyword]);

  return { books };
};

export default useBooks;