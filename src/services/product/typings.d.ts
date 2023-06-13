export interface RawProductData {
  name: import('contentful').EntryFieldTypes.Text;
  productImage: import('contentful').EntryFieldTypes.Array<
  import('contentful').EntryFieldTypes.AssetLink
  >;
  price: import('contentful').EntryFieldTypes.Number;
  contentDescription: import('contentful').EntryFieldTypes.RichText;
  category: import('contentful').EntryFieldTypes.Text;
}

export interface ProductData
  extends Omit<RawProductData, 'contentDescription' | 'productImage'> {
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
  name: import('contentful').EntryFieldTypes.Text;
  productPhoto1: import('contentful').EntryFieldTypes.Array<
  import('contentful').EntryFieldTypes.AssetLink
  >;
  row: import('contentful').EntryFieldTypes.Number;
  column: import('contentful').EntryFieldTypes.Number;
}

export interface GalleryData {
  image: {
    filename: string;
    url: string;
  };
  row: number;
  column: number;
}
