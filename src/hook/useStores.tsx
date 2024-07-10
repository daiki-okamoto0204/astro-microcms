import { useState, useEffect } from "react";
import { createClient } from "microcms-js-sdk";
import type { Store } from "../types/Store";
import type { MicroCMSResponse } from "../types/MicroCMSResponse";

const useStores = (q?: string, area?: string, categories?: string[]) => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {

    const fetchAll = async () => {
      const client = createClient({
        serviceDomain: import.meta.env.PUBLIC_MICROCMS_SHOP_SERVICE_DOMAIN,
        apiKey: import.meta.env.PUBLIC_MICROCMS_SHOP_API_KEY,
      });

      const areaFilter = area ? `prefectures[equals]${area}` : '';
      const categoriesFilter = categories?.length ? `categories[contains]${categories.join(',')}` : '';
    
      if (areaFilter && categoriesFilter) {
        return `${areaFilter}[and]${categoriesFilter}`;
      }

      const filters = areaFilter || categoriesFilter || '';

      const { contents: data } = await client.get<MicroCMSResponse<Store>>({ endpoint: "stores", queries: { q, filters } });
      setStores(data);
    };

    fetchAll();
  }, [q, area, categories]);

  return { stores };
};

export default useStores;