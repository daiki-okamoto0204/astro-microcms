'use client'
import usePrefectures from "../../hook/usePrefectures";
import { useState, useEffect } from "react";
import CategoryCheckBox from './CategoryCheckBox';
import KeyWord from './KeyWord';
import { PrefectureSelect } from "./PrefectureSelect";

export const StoreSearch = () => {
  // const [{ contents: prefectures }, { contents: categories }] = await Promise.all([getPrefectures(), getCategories()]);
  return (
    <section className="h-full w-full border-r border-gray-200 p-8">
      <div className="grid gap-8">
        <h2 className="text-lg font-bold">店舗検索</h2>
        <PrefectureSelect />
        {/* <KeyWord />
        <CategoryCheckBox categories={categories} /> */}
      </div>
    </section>
  )
};
