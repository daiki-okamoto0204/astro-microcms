import { Book } from "./Book";
import useBooks from "../hook/useBooks";

export const BookList = () => {
  const { books } = useBooks(
    new URLSearchParams(window.location.search).get("keyword")
  );

  return (
    <>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {books.map((book) => <Book {...book} />)}
        </div>
      ) : (
        <div className="text-center text-2xl">書籍は見つかりませんでした。</div>
      )}
    </>
  );
};