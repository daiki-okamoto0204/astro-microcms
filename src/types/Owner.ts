import type { MicroCMSDate } from "microcms-js-sdk";

export type Image = {
  url: string;
  height: number;
  width: number;
}

export type Owner = {
	id: string;
	name: string;
	name_hira: string;
	position: string;
	image: Image;
}& MicroCMSDate