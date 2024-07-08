export type Image = {
  url: string;
  height: number;
  width: number;
}

export type CustomFirld = {
  fieldId: string;
  image: Image;
  link: string;
}

export type MainVisual = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  mainVisual: CustomFirld[];
};