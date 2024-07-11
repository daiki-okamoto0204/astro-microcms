'use client'
import { useState, useEffect } from "react";
import { PrefectureSelect } from "./PrefectureSelect";
import { KeyWord } from "./KeyWord";
import { CategoryCheckBox } from "./CategoryCheckBox";
import { useSearchParams } from '../../hook/useSearchParams';
import { usePrefectures } from "../../hook/usePrefectures";
import { useCategories } from "../../hook/useCategories";

export const StoreSearch = () => {
  const { searchParams, setParams } = useSearchParams();
  const { prefectures } = usePrefectures();
  const [area, setArea] = useState(searchParams.get('area') || '');
  const { categories } = useCategories();

  useEffect(() => {
    const handlePopState = () => {
      setArea(new URLSearchParams(window.location.search).get('area') || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleAreaChange = (newArea: string) => {
    setArea(newArea);
    const selectedPrefecture = prefectures.find((pref) => pref.id === newArea);
    setParams({
      area: newArea,
      currentLat: selectedPrefecture ? selectedPrefecture.lat.toString() : null,
      currentLng: selectedPrefecture ? selectedPrefecture.lng.toString() : null,
    });
  };

  return (
    <section className="h-full w-full border-r border-gray-200 p-8">
      <div className="grid gap-8">
        <h2 className="text-lg font-bold">店舗検索</h2>
        <PrefectureSelect value={area} onChange={handleAreaChange} />
        <KeyWord />
        <CategoryCheckBox categories={categories} />
      </div>
    </section>
  )
};