import { useState, useEffect } from "react";
import { createClient } from "microcms-js-sdk";
import type { StoreCategories } from "../types/StoreCategories";
import type { MicroCMSResponse } from "../types/MicroCMSResponse";

export const useCategories = () => {
  const [categories, setCategories] = useState<StoreCategories[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const client = createClient({
          serviceDomain: import.meta.env.PUBLIC_MICROCMS_SHOP_SERVICE_DOMAIN,
          apiKey: import.meta.env.PUBLIC_MICROCMS_SHOP_API_KEY,
        });

        const { contents } = await client.get<MicroCMSResponse<StoreCategories>>({ endpoint: "categories" });
        setCategories(contents);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return { categories };
};