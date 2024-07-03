import { useState } from "react";
import { Book } from "./Book";
import useBooks from "../hook/useBooks";

export const BookList = () => {
  const [showAll, setShowAll] = useState(false);
  const { books } = useBooks(
    new URLSearchParams(window.location.search).get("keyword")
  );

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {books.length > 0 ? (
        <>
          {books.map((book) => <Book {...book} />)}
          {books.length > 8 && !showAll && (
            <a
              href="#"
              onClick={() => setShowAll(true)}
              className="font-medium text-blue-600 hover:underline"
            >
              Read more
            </a>
          )}
        </>
      ) : (
        <div className="text-center text-2xl">書籍は見つかりませんでした。</div>
      )}
    </div>
  );
};