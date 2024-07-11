import { useState, useEffect, useCallback } from "react";
import useStores from "../../hook/useStores";
import Map from "./Map";
import { useSearchParams } from '../../hook/useSearchParams';

const KYOTO_STATION_LOCATION = { lat: 34.985109, lng: 135.758829 };

export const Result = () => {
  const { searchParams } = useSearchParams();
  const [searchState, setSearchState] = useState({
    q: searchParams.get('q') || '',
    area: searchParams.get('area') || '',
    categories: searchParams.get('categories')?.split(',') || [],
    currentLat: searchParams.get('currentLat') || KYOTO_STATION_LOCATION.lat.toString(),
    currentLng: searchParams.get('currentLng') || KYOTO_STATION_LOCATION.lng.toString(),
  });

  const { stores, isLoading, error } = useStores(searchState.q, searchState.area, searchState.categories);

  const updateSearchState = useCallback(() => {
    setSearchState({
      q: searchParams.get('q') || '',
      area: searchParams.get('area') || '',
      categories: searchParams.get('categories')?.split(',') || [],
      currentLat: searchParams.get('currentLat') || KYOTO_STATION_LOCATION.lat.toString(),
      currentLng: searchParams.get('currentLng') || KYOTO_STATION_LOCATION.lng.toString(),
    });
  }, [searchParams]);

  useEffect(() => {
    updateSearchState();
  }, [updateSearchState]);

  useEffect(() => {
    const handlePopState = () => {
      updateSearchState();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [updateSearchState]);

  const markerPositions = stores?.map((store) => {
    return { lat: store.lat, lng: store.lng };
  });

  const center = { lat: Number(searchState.currentLat), lng: Number(searchState.currentLng) };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-full">
      <section className="h-full w-1/3 overflow-scroll p-8">
        <div className="grid gap-6 ">
          <h2 className="text-lg font-bold">検索結果</h2>
          {stores.length === 0 ? (
            <p className="">検索結果がありません</p>
          ) : (
            <ul className="grid  gap-3 ">
              {stores.map((store) => (
                <li key={store.id} className="grid gap-2 rounded-md border p-4 transition hover:bg-gray-50">
                  <a href={`/stores/${store.id}`}>
                    <p className="font-bold">{store.name}</p>
                    <p className="text-sm">{store.address}</p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <div className="relative h-full w-2/3">
        <Map positions={markerPositions} center={center} />
      </div>
    </div>
  );
};