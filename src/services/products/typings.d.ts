export interface RawProductData {
  name: string;
  productImage: import('contentful').Asset[];
  price: number;
  contentDescription: import('@contentful/rich-text-types').Document;
  category: string;
}

export interface ProductData
  extends Omit<RawProductData, 'contentDescription' | 'productImage'> {
  contentDescription: string;
  productImage: PickedProductImageData[];
  id: string;
}

export interface PickedProductImageData {
  url: string;
  fileName: string;
}

export interface GetAllProductsPayload {
  sortId: number;
  search: string;
}

export interface RawGalleryData {
  name: string;
  productPhoto1: import('contentful').Asset[];
  row: number;
  column: number;
}

export interface GalleryData {
  images: FormattedImages[];
  row: number;
  column: number;
}

interface FormattedImages {
  fileName: string;
  url: string;
}
