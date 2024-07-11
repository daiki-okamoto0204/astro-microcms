'use client'
import { useState, useEffect } from "react";
import { PrefectureSelect } from "./PrefectureSelect";
import { useSearchParams } from '../../hook/useSearchParams';
import usePrefectures from "../../hook/usePrefectures";

export const StoreSearch = () => {
  const { searchParams, setParam } = useSearchParams();
  const { prefectures } = usePrefectures();
  const [area, setArea] = useState(searchParams.get('area') || '');

  useEffect(() => {
    const handlePopState = () => {
      setArea(new URLSearchParams(window.location.search).get('area') || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleAreaChange = (newArea: string) => {
    setArea(newArea);
    let newURL = setParam(['area', newArea]);
    if (newArea) {
      const selectedPrefecture = prefectures.find((pref) => pref.id === area);
      if (!selectedPrefecture) return
      newURL = setParam([
          'area', newArea,
          'currentLat', selectedPrefecture.lat.toString(),
          'currentLng', selectedPrefecture.lng.toString()
        ]);
    } else {

    }
    alert(newURL);
    window.location.href = newURL;
  };

  return (
    <section className="h-full w-full border-r border-gray-200 p-8">
      <div className="grid gap-8">
        <h2 className="text-lg font-bold">店舗検索</h2>
        <PrefectureSelect value={area} onChange={handleAreaChange} />
        {/* <KeyWord />
        <CategoryCheckBox categories={categories} /> */}
      </div>
    </section>
  )
};