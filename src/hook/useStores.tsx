import { useState, useEffect } from "react";
import { createClient } from "microcms-js-sdk";
import type { Store } from "../types/Store";
import type { MicroCMSResponse } from "../types/MicroCMSResponse";

const useStores = (q?: string, area?: string, categories?: string[]) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const client = createClient({
          serviceDomain: import.meta.env.PUBLIC_MICROCMS_SHOP_SERVICE_DOMAIN,
          apiKey: import.meta.env.PUBLIC_MICROCMS_SHOP_API_KEY,
        });

        const filters = [];
        if (area) filters.push(`prefectures[equals]${area}`);
        if (categories && categories.length > 0) {
          const categoryFilter = categories
            .map(category => `categories[contains]${category}`)
            .join('[or]');
          filters.push(`(${categoryFilter})`);
        }

        const filtersQuery = filters.length > 0 ? filters.join('[and]') : '';

        const { contents: data } = await client.get<MicroCMSResponse<Store>>({ 
          endpoint: "stores", 
          queries: { 
            q,
            filters: filtersQuery
          } 
        });
        setStores(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching stores'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, [q, area, categories]);

  return { stores, isLoading, error };
};

export default useStores;