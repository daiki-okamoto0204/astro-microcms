import { useState, useEffect } from "react";
import { createClient } from "microcms-js-sdk";
import type { Prefectures } from "../types/Prefectures";
import type { MicroCMSResponse } from "../types/MicroCMSResponse";

export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefectures[]>([]);
  const PREFECTURES_LIMIT = 47;

  useEffect(() => {

    const fetchAll = async () => {
      const client = createClient({
        serviceDomain: import.meta.env.PUBLIC_MICROCMS_SHOP_SERVICE_DOMAIN,
        apiKey: import.meta.env.PUBLIC_MICROCMS_SHOP_API_KEY,
      });

      const { contents: data } = await client.get<MicroCMSResponse<Prefectures>>({ endpoint: "prefectures", queries: { orders: 'code', limit: PREFECTURES_LIMIT } });
      console.log(data);
      setPrefectures(data);
    };

    fetchAll();
  }, []);

  return { prefectures };
};