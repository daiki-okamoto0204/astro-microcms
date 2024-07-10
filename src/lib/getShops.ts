import { createClient } from "microcms-js-sdk";
import type { StoreCategories } from "../types/StoreCategories";
import type { Prefectures } from "../types/Prefectures";

const PREFECTURES_LIMIT = 47;

const client = createClient({
  serviceDomain: import.meta.env.PUBLIC_MICROCMS_SHOP_SERVICE_DOMAIN,
  apiKey: import.meta.env.PUBLIC_MICROCMS_SHOP_API_KEY,
});

export const getCategories = async () => {
  return await client.getList<StoreCategories>({
    endpoint: 'categories'
  })
};

export const getPrefectures = async () => {
  return await client.getList<Prefectures>({
    endpoint: 'prefectures',
    queries: { orders: 'code', limit: PREFECTURES_LIMIT }
  })
};