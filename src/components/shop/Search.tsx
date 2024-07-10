import { getPrefectures, getCategories } from "../../lib/getShops";
import CategoryCheckBox from '../shop/CategoryCheckBox';
import KeyWord from '../shop/KeyWord';
import PrefectureSelect from '../shop/PrefectureSelect';

const Search = async () => {
  const [{ contents: prefectures }, { contents: categories }] = await Promise.all([getPrefectures(), getCategories()]);
  return (
    <section className="h-full w-full border-r border-gray-200 p-8">
      <div className="grid gap-8">
        <h2 className="text-lg font-bold">店舗検索</h2>
        <PrefectureSelect prefectures={prefectures} />
        {/* <KeyWord />
        <CategoryCheckBox categories={categories} /> */}
      </div>
    </section>
  )
}

export default Search
