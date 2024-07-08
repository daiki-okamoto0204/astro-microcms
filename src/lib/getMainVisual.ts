import { createClient } from "microcms-js-sdk";
import type { MainVisual } from "../types/MainVisual";
import type { MicroCMSResponse } from "../types/MicroCMSResponse";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_MV_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_MV_API_KEY,
});

export const getMainVisual = async () => {
  return await client.get<MainVisual>({ endpoint: "main-visual" });
};