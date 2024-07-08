import type { MicroCMSDate } from "microcms-js-sdk";

export type Category = {
	id: string;
	name: string;
	slug: string;
}& MicroCMSDate