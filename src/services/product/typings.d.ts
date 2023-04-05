export interface RawProductData {
  name: string;
  productImage: import("contentful").Asset[];
  price: number;
  contentDescription: import("@contentful/rich-text-types").Document;
  category: string;
}

export interface ProductData
  extends Omit<RawProductData, "contentDescription" | "productImage"> {
  productImages: PickedProductImageData[];
  id: string;
}

export interface FormattedProductData {
  [x: string]: ProductData[];
}

export interface PickedProductImageData {
  url: string;
  filename: string;
}

export interface GetAllProductsPayload {
  sortId: number;
  search: string;
}

export interface RawGalleryData {
  name: string;
  productPhoto1: import("contentful").Asset[];
  row: number;
  column: number;
}

export interface GalleryData {
  image: {
    filename: string;
    url: string;
  };
  row: number;
  column: number;
}
