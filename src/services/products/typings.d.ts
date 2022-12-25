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
}

export interface PickedProductImageData {
  title: string;
  description: string;
  file: {
    url: string;
    details: {
      size: number;
      image?: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

export interface GetAllProductsPayload {
  sortId:number
  search:string
}