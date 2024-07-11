import { useState, useEffect } from "react";
import useStores from "../../hook/useStores";
import Map from "./Map";
import { useSearchParams } from '../../hook/useSearchParams';

const KYOTO_STATION_LOCATION = { lat: 34.985109, lng: 135.758829 };

export const Result = () => {
  const { searchParams } = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [area, setArea] = useState(searchParams.get('area') || '');
  const [categories, setCategories] = useState(searchParams.getAll('categories'));
  const [currentLat, setCurrentLat] = useState(searchParams.get('currentLat') || KYOTO_STATION_LOCATION.lat.toString());
  const [currentLng, setCurrentLng] = useState(searchParams.get('currentLng') || KYOTO_STATION_LOCATION.lng.toString());

  const { stores } = useStores(q, area, categories);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setQ(params.get('q') || '');
      setArea(params.get('area') || '');
      setCategories(params.getAll('categories'));
      setCurrentLat(params.get('currentLat') || KYOTO_STATION_LOCATION.lat.toString());
      setCurrentLng(params.get('currentLng') || KYOTO_STATION_LOCATION.lng.toString());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const markerPositions = stores?.map((store) => {
    return { lat: store.lat, lng: store.lng };
  });

  const center = { lat: Number(currentLat), lng: Number(currentLng) };

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
  )
};